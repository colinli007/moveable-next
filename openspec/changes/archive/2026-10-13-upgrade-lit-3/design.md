## Context

动机见 proposal.md 的 Why。下面只列影响方案的现状事实（2026-10-13）：

- **lit-moveable 的结构**：源码只有 `src/LitMoveable.ts`（96 行）、`types.ts`、`index.ts`。`<lit-moveable>` 由三部分组成：
  - `@customElement` 定义元素。
  - `framework-utils` 的 `@Properties` 在类上对 moveable 的每个选项调用 `property()(prototype, name)`。
  - `@withMethods` 把 moveable 的方法代理挂到原型上。
  - 装饰器从下往上执行，所以 `customElements.define` 在 `@Properties` 注册属性之前就已经完成。
- **依赖**：lit 只在 devDependencies 中（`^2.0`，实际 2.6.1）。`tsdown.config.mts` 的 ESM/CJS 配置用 `deps.neverBundle: [/^lit(\/|$)/]` 让它保持外部模块；UMD 配置内联全部依赖（`deps.alwaysBundle: [/./]`，`platform: "browser"`）。产物的外部模块是 `lit`、`lit/decorators.js`、`moveable`、`framework-utils`、`@daybrush/utils`。
- **Lit 3 的兼容性**（读 `@lit/reactive-element` 2.1.2 和 lit 3.3.3 源码确认）：
  - `property()` 的第二个参数不是对象时，走旧版装饰器分支（`legacyProperty`），最终调用 `constructor.createProperty(name, options)`。
  - `createProperty` 在类 finalize 之后调用，仍然会在原型上定义访问器。所以 `@Properties` 在 `define` 之后注册属性，在 Lit 3 下照样能用。这些属性没有对应的 HTML 特性，这一点和 Lit 2 一样，示例中都用 `.prop=${}` 绑定，不受影响。
  - `customElement()` 同时支持新旧两种装饰器。
  - 源码使用 `experimentalDecorators` 和 `useDefineForClassFields: false`，Lit 3 都支持。
- **tsdown 的外部依赖判断**：`getProductionDeps` 包含 `dependencies`、`peerDependencies` 和 `peerDependenciesMeta`，子路径（`lit/decorators.js`）也算外部模块。
- **测试现状**：
  - 根目录 `vitest.config.mts` 汇总 `packages/*/vitest.config.mts`。
  - react-moveable 的 story 测试是浏览器模式：`@vitest/browser-playwright`，chromium，依赖都声明在它自己的 devDependencies 中。
  - helper 是 happy-dom 单元测试。
  - CI 先 `pnpm packages:build`，再用 `pnpm --filter react-moveable exec playwright install chromium` 安装浏览器，最后 `pnpm test`。
- **已有的 bug**：`updated()` 中判断的是 `propName === "mvDraggable" || propName === "litMoveable"`，应为 `litDraggable`。结果是修改 `litDraggable` 时 `litName` 仍然是 `"litDraggable"`，不在 `PROPERTIES` 中，所以修改被忽略。

## Goals / Non-Goals

**Goals:**
- 用一组在真实浏览器中运行的测试锁定 lit-moveable 的对外行为（spec「lit-moveable 的行为」），在 Lit 2 和 Lit 3 上各跑一次，证明升级前后一致。
- 确定框架包装测试的做法：配置放在哪、测什么、测源码还是产物。后面 Vue、Svelte 的 change 直接沿用。
- lit 成为真正的 peerDependency，`library-build` 中不再需要 lit 的例外。

**Non-Goals:**
- 不改 lit-moveable 的其它已有行为。调查中还发现两处，记在这里，不在本次修改：
  - 事件处理中 `if (result === false) e.stop()` 永远不会执行：派发的 `CustomEvent` 没有设置 `cancelable`，`dispatchEvent` 总是返回 `true`。
  - 元素在 `disconnectedCallback` 中销毁 moveable，但重新插入文档时不会重新创建（`firstUpdated` 只执行一次）。再次移除时 `destroy()` 会被第二次调用，抛出 `TypeError: Cannot set properties of null (setting '__CROACT__')`（`packages/moveable/src/MoveableManager.tsx` 的 `destroy` 再次 `renderSelf(null, ...)`）。测试因此每个元素只移除一次，否则 Vitest 会把这个异常算作未处理错误，整次运行失败。
  - 同时设置 `mvDraggable` 和 `litDraggable` 且值不同时，首次渲染用 `mvDraggable ?? litDraggable`，之后的更新按 `changedProperties` 的遍历顺序，后处理的生效。
  - `package.json` 的 `files: ["./*", ...]` 会把新增的 `vitest.config.mts` 一起发布（`test/` 不会）。第 6 步发布前统一整理 `files`。
- 不改用标准装饰器，不去掉 `framework-utils`。
- 不检查 lit 产物的类型声明在使用方项目中的类型兼容性（第 6 步发布前统一处理）。

## Decisions

### 1. 测试针对构建产物，而不是源码

测试 import `dist/moveable.esm.js`（`package.json` 的 `module` 入口），而不是 `src/index.ts`。

理由：这次升级影响的正是产物这一层。lit 是否保持外部模块、tsdown 转换旧版装饰器和 `useDefineForClassFields: false` 之后访问器是否还在（`library-build`「装饰器定义的属性在产物中可用」），都只有测产物才能发现。而且 lit-moveable 依赖的 `moveable` 本身也解析到 moveable 的 `dist`，无论测源码还是测产物，都必须先构建上游包，测源码并不能省掉构建。

代价是 `pnpm test` 之前必须先 `pnpm packages:build`。CI 已经是这个顺序；本地写进 `CLAUDE.md`。产物不存在时，测试会以无法解析模块的错误失败，原因一目了然。审查时实测：删除 `node_modules/.vite` 后从根目录 `vitest run` 一次通过，没有出现 Vite 依赖预构建变化导致的「reloading」首跑失败。测试文件静态 import 产物，Vite 启动时就能扫描到全部依赖；CI 每次都是冷缓存，这一点很重要。

- 备选方案：测源码。Vitest（Vite 8 / Oxc）需要自己按 tsconfig 转换旧版装饰器。这条转换路径和 tsdown 的不同，测试通过也不能说明产物正确。

### 2. 测试的位置与依赖

沿用现有约定：
- lit-moveable 新增 `vitest.config.mts`，一个名为 `lit-moveable` 的浏览器模式 project（`provider: playwright()`、chromium、headless），`include: ["test/**/*.spec.ts"]`（与 helper 的目录约定一致）。根目录的 `projects` 用通配符，不需要改。
- `vitest`、`@vitest/browser-playwright`、`playwright` 声明在 lit-moveable 自己的 devDependencies 中，版本与 react-moveable 相同（`5.0.3`、`5.0.3`、`^1.64.0`）。解析到同一个 playwright 版本，就和 react-moveable 共用 CI 中已经安装的 chromium，CI 不需要再安装浏览器。
- 失败截图：Vitest 浏览器模式默认就会截图（react-moveable 显式写 `screenshotFailures: true` 是因为 addon-vitest 会把它关掉，lit-moveable 没有这个 addon，不写这一项）。从根目录执行时截图写到根目录的 `.vitest/attachments/failure-screenshots/`，和 CI 上传的路径相同，审查时已实测。

拖动用鼠标事件模拟：在目标上派发 `mousedown`，再派发 `mousemove`、`mouseup`，和 react-moveable 的 `stories/utils/testing.tsx` 做法相同。这段辅助代码只有十几行，本次只有一个使用者，直接写在测试文件里。等 Vue 的 change 出现第二个使用者时，再决定是否抽到共用位置，不提前抽象。

### 3. 测试内容

每条 spec 场景对应一个测试，只断言对外可见的结果，不读私有字段（如元素上的 `moveable`）。注意 `warpSelf: true` 时控制框就是 `<lit-moveable>` 元素本身（它获得 `moveable-control-box` 类），控制点、连线是它的子元素：

| 场景 | 断言 |
|---|---|
| 渲染控制框 | 元素带有 `moveable-control-box` 类，元素内有 4 条 `.moveable-line` |
| 首次渲染后修改属性 | 设 `rotatable = true` 后出现 `.moveable-rotation`；设 `litDraggable = false`，等公开方法 `getManager()` 返回的 `props.draggable` 变为 `false` 后，拖动目标不再派发 `litDrag`。要先等这一步，因为原生 moveable 的属性 setter 经 croact 的 `setState` 异步生效，赋值后立即拖动用的还是旧值（实施时发现） |
| 拖动时派发事件 | 依次收到 `litDragStart`、`litDrag`、`litDragEnd`，`litDrag` 的 `detail.transform` 含 `translate` |
| 调用方法 | 目标没有 transform 时，`el.getRect()` 的 `offsetWidth`、`offsetHeight` 等于目标元素的尺寸（`width`/`height` 是变换后的包围盒，有 transform 时不等于元素尺寸） |
| 移除时销毁 | 元素移除后，元素内不再有 `.moveable-line`、`.moveable-control`（控制框就是元素本身，只断言「页面中查不到控制框」是恒真的，测不到 destroy）。每个元素只移除一次，见 Non-Goals |

`litDraggable = false` 那一条在修正 bug 之前会失败。这正是这个 bug 的表现，也是测试有效的证明。

### 4. 先测试，再修 bug，最后升级

顺序是：
1. 在 Lit 2 上加测试：除 `litDraggable` 那一条外全部通过，记下失败信息。
2. 修正 `litMoveable` → `litDraggable`：全部通过。
3. 升级到 Lit 3：同一组测试全部通过。

这样每一步只有一个变量。如果升级后测试失败，可以确定是 Lit 3 引起的。

### 5. peer 范围是 `^3.0.0`，不同时声明 Lit 2

源码在 Lit 2、3 上都能运行，写成 `^2.0.0 || ^3.0.0` 在技术上可行，但测试只在一个版本上跑，声明了不测的版本等于没有保证；ROADMAP 第 4 步的目标也是 Lit 3。开发依赖写 `^3.3.3`，即当前最新版本。

### 6. 删除 `neverBundle`，UMD 不变

lit 进入 `peerDependencies` 后，tsdown 自然把 `lit` 和 `lit/decorators.js` 当作外部模块（见 Context），ESM/CJS 配置中的 `neverBundle` 和它的注释一起删除，只保留 `onlyBundle: []` 作为「不许打包 node_modules 中的包」的检查。

UMD 的行为不变，仍然内联全部依赖，只是内联的 lit 从 2 换成 3。全局变量名 `UMD`、产物文件名都不变。

## Risks / Trade-offs

- [`pnpm test` 现在依赖构建产物，本地直接执行会因为找不到 `dist` 而失败] → `CLAUDE.md` 写明执行顺序；错误信息就是缺少的文件路径，原因明确。react-moveable 和 helper 的测试仍然读源码，不受影响。
- [模拟的鼠标事件和真实输入不完全相同] → 这里只验证包装层的转发，手势本身的正确性由 react-moveable 的 story 测试覆盖，采用和它相同的模拟方式。
- [模拟拖动和断言依赖 moveable 生成的类名（`moveable-control-box`、`moveable-line`、`moveable-rotation`）] → 这些类名由 react-moveable 的 `prefix()` 统一生成，也是 react-moveable 的 story 测试和使用者样式依赖的对外约定；变化时测试会失败，正好提醒。
- [Lit 3 dev 模式在测试中会打印提示（Vite 开发服务器解析 `development` 条件）] → 只是控制台输出，不影响结果；产物本身不受影响，UMD 使用 `platform: "browser"` 下的默认条件，即生产版本。
- [peer 改为 `^3.0.0`，仍在用 Lit 2 的使用者升级 lit-moveable 时会看到 peer 警告] → proposal 标为 BREAKING；第 6 步以 `@moveable-next` 发布时这本来就是新包，不会影响现有 `lit-moveable` 的使用者。

## Migration Plan

1. 保存 Lit 2 下产物的基线：导出名、CJS 形状、外部模块清单、UMD 的全局变量和内联的包、`declaration/` 的文件列表（方法同 `archive/2026-10-12-replace-build-with-tsdown/baseline.md`）。基线要用当前 tsdown 产物重新取，不能直接用归档中的表：那张表是 rollup 时代的，UMD 中还列着 `@lit-labs/ssr-dom-shim`，tsdown 以 `platform: "browser"` 构建时不会内联它。
2. 按决策 4 的顺序加测试、修 bug、升级。
3. 升级后重新构建，对比第 1 步：除了 UMD 中内联的 lit 版本，其余项都应该一致；不一致的地方逐项说明。
4. 推送后确认 CI 通过，再用一个故意让测试失败的临时提交确认 CI 在测试步骤失败，验证完 revert。

回滚：整个 change 是一组提交，revert 即可。
