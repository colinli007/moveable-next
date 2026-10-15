## Context

动机见 proposal.md 的 Why。下面只列影响方案的现状事实（2026-10-13）。

**vue3-moveable 的结构**
- 库代码只有两处：
  - `src/components/Moveable.vue`（约 80 行）：模板只有 `<div ref="moveableElement"></div>`，`<script lang="ts">` 中用 `defineComponent` 的选项对象定义组件。
  - `src/components/index.ts`：默认导出组件，具名导出 `VueMoveable`，并 `export * from "moveable"`。
- `src/components/index.umd.ts` 没有被 JS 构建使用，只被 vite-plugin-dts 拿来输出一份没有用处的 `index.umd.d.ts`。
- `src/` 下的 `App.vue`、`main.ts`、`style.css`、`vite-env.d.ts` 和根目录的 `index.html` 是 Vite 的开发演示。

**组件的逻辑**（全部在选项对象中，与模板无关）
- `props: PROPERTIES`。
- `watch` 把每个 prop 的变化写到原生 moveable 实例上。
- `methods` 把 `METHODS` 代理到实例上。
- `mounted` 用 `$refs.moveableElement` 和 `warpSelf: true` 创建原生 moveable，并把 `EVENTS` 中的每个事件转成 `this.$emit(name, { ...e })`。
- `beforeUnmount` 调用 `destroy()`。

**构建**
- `vite build && vue-tsc`：
  - Vite 4 lib 模式输出 `dist/moveable.js`（ESM）和 `dist/moveable.cjs`（CJS），没有 sourcemap 和头部注释。
  - vite-plugin-dts 输出 `dist/index.d.ts`、`dist/Moveable.vue.d.ts`、`dist/index.umd.d.ts`。
  - `vue-tsc` 因为 tsconfig 中 `noEmit: true`，只做类型检查。
- 产物的外部模块是 `moveable`、`vue`、`@daybrush/utils`。
- `framework-utils` 在 `dependencies` 中，但源码没有使用。

**入口字段**
- `"type": "module"`，`main` 指向不存在的 `dist/moveable.cjs.js`。
- 已发布的 0.28.0 包中同样只有 `dist/moveable.cjs`（已下载 tarball 确认），所以 `require("vue3-moveable")` 一直失败。
- 直接加载 `moveable.cjs` 文件得到的是一个对象：`default` 和 `VueMoveable` 是组件，另外包含 moveable 的全部具名导出。

**模板编译的结果**
- 现在 `dist/moveable.js` 中模板编译成 `createElementBlock("div", { ref: "moveableElement" }, null, 512)`。
- 组件除此之外没有任何依赖 SFC 编译器的东西（没有 `<style>`、指令、插槽）。

**依赖版本**
- vue 3.3.4（开发依赖，没有 peer）、vite 4.3.9、@vitejs/plugin-vue 4.2.3、vite-plugin-dts 3.0.0-beta.3、vue-tsc 1.8.2、TypeScript 4.8.4。
- `vue-template-compiler`（Vue 2 的包）只作为 vue-tsc 1.8 → `@vue/language-core` 的传递依赖出现在锁文件中（`pnpm why` 确认）。

**Vue 3.5 的类型变化**（在 scratchpad 中用 vue 3.5.44 + TS 6.0.3 原型验证）
- 源码的 `defineComponent<Props, {}, {}, {}, Methods, {}, {}, Emits>({...} as any)` 在 Vue 3.3 中匹配选项对象的重载。
- Vue 3.5 的选项对象重载换了类型参数：第 3 个是 `RuntimePropsKeys extends string`，我们传的 `{}` 不满足约束，报 `TS2344: Type '{}' does not satisfy the constraint 'string'`。
- `DefineComponent` 类型本身前 8 个参数的含义没有变。

**原型的验证结果**
- 把 `.vue` 改成 `.ts`、模板换成 `render() { return h("div", { ref: "moveableElement" }) }`、保留原来的类型写法，在 vue 3.3.4 + TS 6 下用 tsc 生成声明：与现在的 `Moveable.vue.d.ts` 只有 TS 打印格式上的差异（如可选参数不再写 `| undefined`）。
- 升到 vue 3.5.44 后，改为 `defineComponent({...} as any) as DefineComponent<同样 8 个参数>`：编译通过。生成的声明写法不同（3.3 展开了全部类型参数，3.5 引用类型别名），但前 8 个类型参数相同、其余为默认值，类型等价。
- 一段使用方代码（`h(Moveable, { draggable: true, onDrag })`、错误类型的 prop 用 `@ts-expect-error` 标注、`InstanceType<typeof Moveable>` 上调用 `getRect()`）在新旧声明上都通过类型检查。

**现有约定**（来自 `upgrade-lit-3`）
- 框架包装的浏览器测试针对 `dist`，每个包一个 `vitest.config.mts`，依赖与 react-moveable 同版本。
- 根目录 `vitest.config.mts` 用通配符汇总，不需要改。
- lit design 中约定：拖动辅助代码等出现第二个使用者时再决定是否抽取。

## Goals / Non-Goals

**Goals:**
- vue3-moveable 的构建与另外 6 个库包一致：tsdown + tsc，共用 `config/build.mjs`，产物受 `library-build` spec 约束，不再依赖任何 Vue 构建工具。
- 用浏览器测试和类型测试锁定对外行为（spec「vue3-moveable 的行为」），在迁移前的 Vite 产物和迁移后的产物上各跑一次，证明一致。
- 按 `main` 加载 CJS 产物可以使用；vue 成为 peerDependency（3.5）。

**Non-Goals:**
- 不改 vue3-moveable 的其它已有行为。调查中发现以下几处（第一条已在审核时用原型实测），记在这里，本次不改：
  - 组件没有声明 `emits`。Vue 会把使用者写的事件监听（如 `@click`）同时作为原生事件监听透传到根元素上。透传时监听名会转成连字符形式（`onDragStart` → `drag-start`），只有单个单词、又与 DOM 事件同名的 moveable 事件会被原生事件误触发。实际会发生的是 `click`：点击控制框时，`@click` 的监听函数也会收到原生 `MouseEvent`（`drag` 只在原生 HTML 拖拽时触发，控制框不是 `draggable` 元素）。加上 `emits: EVENTS` 可以修正，但会改变透传行为，留给单独的修正。
  - `props: PROPERTIES` 是字符串数组，没有类型。所以布尔 prop 的简写（`<Moveable draggable>`）得到的是 `""`，而不是 `true`。示例和 README 都用 `:draggable="true"`。
  - `package.json` 的 `files: ["./*", "src/*", ...]` 会把配置文件和 `test/` 以外的根文件一起发布。第 6 步发布前统一整理 `files` 和 `exports`。
- 不保证类型声明在 Vue 3.5 以下的使用方项目中可用（见决策 5）。
- 不新增 UMD 产物：现在就没有，Vue 生态的使用者通过打包工具或 ESM 使用。
- 不改用 `<script setup>` 或组合式 API 重写组件。

## Decisions

### 1. 源码改为 `.ts`，删除 Vue 的构建工具链

`src/components/Moveable.vue` 改为 `src/VueMoveable.ts`（与 lit-moveable 的 `src/LitMoveable.ts` 对应），`src/components/index.ts` 移为 `src/index.ts`。`<script>` 的内容原样保留，只在选项对象中加一个渲染函数：

```ts
render() {
    return h("div", { ref: "moveableElement" });
},
```

理由：这个包需要编译 SFC，只是因为那一行模板写在 `.vue` 中，而 SFC 编译器、vite、vite-plugin-dts、vue-tsc 都只为这一点存在。换成渲染函数后：
- 产物几乎不变：模板编译出来本来就是同样的 `div` 加字符串 ref。
- 选项式组件的渲染函数中，字符串 ref 按当前渲染的组件实例解析，`$refs.moveableElement` 照常可用。
- 构建和类型声明可以完全复用其它库包的做法。
- 以后升级 Vue 时只需要升级 `vue` 本身。

备选方案（用户已选定本方案）：
- 保留 SFC，用 tsdown + unplugin-vue 构建，vue-tsc 输出声明：构建入口一致，但仍要维护两个只为一行模板存在的依赖。
- 原地升级 Vite 工具链：仍然是仓库中唯一不用 tsdown 的库包，仍然没有 sourcemap 和头部注释。

### 2. 产物文件、入口字段、CJS 形状

`tsdown.config.mts` 照 lit-moveable 的 ESM/CJS 两份配置写（`deps.onlyBundle: []`，`entryFileNames` 分别为 `moveable.esm.js`、`moveable.cjs.js`，CJS 用 `exports: "named"`），不写 UMD 配置。

`package.json`：
- `main` 保持 `dist/moveable.cjs.js`，现在它存在了。
- `module` 改为 `dist/moveable.esm.js`。
- `types` 改为 `declaration/index.d.ts`。
- 删除 `"type": "module"`：保留它的话，`.js` 后缀的 CJS 产物会被 Node 当作 ESM 加载。另外，其它库包都没有这个字段，配置文件统一用 `.mts`。

CJS 形状：`exports: "named"` 得到的对象包含全部具名导出和 `default`，与现在 `moveable.cjs` 文件的形状相同，也与 lit-moveable 一致。

备选方案：像 react-moveable 那样用 `index.umd.ts` 把具名导出挂到组件上再 `export default`，`require` 直接得到组件。没有选它，原因有两个：
- 这会把 moveable 的几十个具名导出（`PROPERTIES`、`makeAble` 等）挂到 Vue 组件的选项对象上，Vue 会把它们当作自定义选项保留在 `$options` 中。
- 现在 `moveable.cjs` 文件的形状本来就是对象。

所以 `index.umd.ts` 删除。

### 3. 组件类型改为对 `DefineComponent` 的类型断言

升级到 Vue 3.5 时，把

```ts
const VueMoveable = defineComponent<Props, {}, {}, {}, Methods, {}, {}, Emits>({...} as any);
```

改为

```ts
type VueMoveableComponent = DefineComponent<Props, {}, {}, {}, Methods, {}, {}, Emits>;

const VueMoveable = defineComponent({...} as any) as VueMoveableComponent;
```

类型参数和现在完全相同，`interface VueMoveable` 的声明合并也保留。

理由：
- props、methods、emits 都是运行时从 `PROPERTIES`、`METHODS`、`EVENTS` 生成的，`defineComponent` 本来就推断不出类型，源码原来也是用 `as any` 加显式类型参数。
- Vue 3.5 的 `defineComponent` 重载不再接受这组类型参数（见 Context），而 `DefineComponent` 类型的参数含义没有变。把显式类型从函数的类型参数挪到结果的类型上，表达的是同一件事。
- 原型验证生成的声明与现在类型等价，使用方类型检查通过。

为了每一步只有一个变量，换构建工具时（Vue 仍是 3.3）先不动这段代码，升级 Vue 时再改。

### 4. 测试：浏览器测试加类型测试

**浏览器测试**沿用 `upgrade-lit-3` 的做法：
- `vitest.config.mts`：project 名 `vue3-moveable`，浏览器模式，playwright，chromium，headless，`include: ["test/**/*.spec.ts"]`。
- 依赖 `vitest 5.0.3`、`@vitest/browser-playwright 5.0.3`、`playwright ^1.64.0`，与其它包同版本，共用 CI 已安装的 chromium。
- 测试 import 产物 `../dist/moveable.esm.js`。迁移前的 Vite 产物在 1.1 时保存到 scratchpad，测试写好后临时复制到包内的 `dist-vite/`、把 import 临时指向它跑一遍，再改回新产物。
- 用 Vue 的公开 API `createApp` + `h` 挂载组件，不引入 `@vue/test-utils`：这里只需要挂载、改 prop、拿 ref、卸载，`createApp` 都能做到，不值得多一个依赖。
- 用响应式状态驱动 prop 变化。

每条 spec 场景对应一个测试：

| 场景 | 断言 |
|---|---|
| 渲染控制框 | 组件根元素带有 `moveable-control-box` 类，其中有 4 条 `.moveable-line` |
| 挂载后修改 prop | 改 `rotatable = true` 后出现 `.moveable-rotation`；改 `draggable = false`，等 `getManager().props.draggable` 变为 `false` 后拖动目标，不再收到 `drag`。原生 moveable 的 setter 经 croact `setState` 异步生效，要先等这一步 |
| 拖动时 emit 事件 | `onDragStart`、`onDrag`、`onDragEnd` 依次被调用，`onDrag` 的参数 `transform` 含 `translate(50px, 30px)` |
| 调用方法 | 通过组件 ref 调用 `getRect()`，`offsetWidth`、`offsetHeight` 等于目标尺寸 |
| 卸载时销毁 | 卸载前记下根元素，`app.unmount()` 后其中不再有 `.moveable-line`、`.moveable-control` |

**共用的测试辅助**：lit 和 vue 的测试都要创建目标元素（200×100，绝对定位于 50,50）和模拟鼠标拖动，这是第二个使用者出现了。把这两段从 lit 的测试中抽到根目录 `config/testing/browser.ts`（只用 DOM API，不 import 任何包），两个测试都从这里 import；各自的清理逻辑仍留在各自的测试文件中（lit 移除元素，vue 卸载应用）。它和各包的 `test/` 一样不在 lint 和 tsc 的检查范围内（「代码检查」spec 只覆盖 `src`），由使用它的浏览器测试间接验证。

**类型测试**：
- `test/types.ts` 以使用者的方式使用包的类型声明：
  - 正确的 prop 和事件监听可以通过检查。
  - 类型错误的 prop 用 `@ts-expect-error` 标注。
  - `InstanceType<typeof Moveable>` 上可以调用方法。
- 由 `tsconfig.test.json` 用 tsc 检查（`noEmit`），脚本是 `test:type`。
- 迁移后放在 `build` 的最后：`tsdown && pnpm run declaration && pnpm run test:type`。它检查的是刚生成的 `declaration/`，CI 的 `packages:build` 自然覆盖。react-moveable 也是在 `build` 中执行 `test:type`。
- `skipLibCheck: true`：与其它库包的 tsconfig 一致；迁移前的基线也必须开，因为 Vue 3.3 的全局 JSX 声明与 moveable 声明链中引用到的 `@types/react` 冲突（原型确认，Vue 3.5 已不再有这个冲突）。使用方代码中的类型错误不受这个选项影响。

### 5. vue 的 peer 范围是 `^3.5.0`

开发依赖写 `^3.5.44`（当前最新）。

理由与 lit 的决策 5 相同：测试只在一个版本上跑，声明了不测的版本等于没有保证。

运行时只用了选项式 API，在更早的 Vue 3 上大概率能运行。但类型声明引用的 `DefineComponent` 在 3.3、3.5 都改过泛型，在更早的版本上不保证。第 6 步以新包名发布，不影响现有使用者。

### 6. TypeScript 与 lint

- vue3-moveable 的 TypeScript 改为 `~6.0.3`。
- `tsconfig.json` 改为与其它库包一致的 `target: es2022`、`moduleResolution: bundler`，保留现有的 `strict`、`noUnusedLocals`、`noUnusedParameters`、`noFallthroughCasesInSwitch`。
- `tsconfig.declaration.json` 照 lit-moveable 写，显式 `rootDir: ./src`。
- 源码变成普通的 `.ts` 后没有理由不检查，根目录 `eslint.config.mjs` 的 `files` 加入 `vue3-moveable`。

## Risks / Trade-offs

- [直接引用 `dist/moveable.js` 或 `dist/*.d.ts` 路径的使用者会失效] → proposal 标为 BREAKING；通过 `main`/`module`/`types` 使用的不受影响；第 6 步以新包名发布。
- [渲染函数和模板编译结果在细节上不同（编译器会加 patch flag、静态提升）] → 对外可见的 DOM 和 ref 相同；浏览器测试的「渲染控制框」「卸载时销毁」覆盖。
- [声明文件的文件名变化（`Moveable.vue.d.ts` → `VueMoveable.d.ts`，删除 `index.umd.d.ts`），且由 tsc 而不是 vite-plugin-dts 生成] → 类型测试在迁移前后的声明上执行同一份代码；`declaration/` 的文件列表变化记入基线对比。
- [vitest 5 把 vite（`^6.4.0` 以上）声明为必需的 peer，而 vue3-moveable 在迁移前依赖 vite 4，pnpm 会把它交给 vitest，加载配置时报 `ERR_PACKAGE_PATH_NOT_EXPORTED`（实施 2.2 时发现）] → 不能在删掉 vite 4 之前运行 vue3-moveable 的测试。所以先迁移构建，再写测试，测试在保存下来的 Vite 产物和新产物上各跑一次，仍然能证明换构建工具前后行为一致。
- [`pnpm test` 多一组需要构建产物的测试] → 与 lit-moveable 相同，CI 已经先构建。
- [Vitest 中 Vue 的 esm-bundler 版本可能打印 feature flag 未定义的警告（`__VUE_OPTIONS_API__` 等）] → 实施时在 Vue 3.3 和 3.5 上运行测试，输出中都没有出现；即使以后出现也只是提示，不影响测试结果，不为它加 `define` 配置。
- [peer 改为 `^3.5.0`，用 Vue 3.4 及以下的使用者升级时会看到 peer 警告] → proposal 标为 BREAKING。

## Migration Plan

1. 保存现有 Vite 产物的基线：
   - ESM 的导出（具名导出和 `export *`）
   - 直接 `require` `dist/moveable.cjs` 得到的形状
   - ESM/CJS 的外部模块清单
   - 类型声明文件列表

   方法与 `archive/2026-10-13-upgrade-lit-3` 的基线相同。
   同时把 Vite 产物（`dist/` 整个目录）保存到 scratchpad。
2. 抽出共用的测试辅助，加上测试依赖和配置。
3. 换构建工具（Vue 仍是 3.3，类型写法不动），重新构建，与基线对比。删掉 vite 4 之后 vitest 才能运行（见 Risks）。
4. 写浏览器测试和类型测试，先在保存的 Vite 产物上、再在新产物上全部通过。
5. 升级 Vue 3.5 并修改类型写法（决策 3），测试和类型测试都通过。
6. lint 范围、文档。
7. 推送后确认 CI 通过，再用一个让 vue3-moveable 测试失败的临时提交确认 CI 在测试步骤失败，验证完 revert。

回滚：整个 change 是一组提交，revert 即可。
