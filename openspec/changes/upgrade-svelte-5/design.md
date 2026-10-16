## Context

动机见 proposal.md 的 Why。下面只列影响方案的现状事实（2026-10-15）。

**svelte-moveable 的结构**
- 库代码在 `src/lib/`：
  - `Moveable.svelte`（约 60 行，不用 TS），用的都是 Svelte 4 的写法：
    - `beforeUpdate` 中从 `$$props` 取出 `PROPERTIES` 里的项，`tick()` 之后 `setState` 到原生 moveable。
    - `onMount` 用 `warpSelf: true` 创建原生 moveable，对 `EVENTS` 中的每个事件，先调用 `$$props` 中的 `onXxx` 回调，再 `createEventDispatcher` 派发同名事件（`on:xxx`，参数在 `detail` 中）。
    - `onDestroy` 调用 `destroy()`。
    - 导出 `getInstance()`。
    - 另外 import 了没有用到的 `isUndefined`。
  - `index.js`：把 `METHODS` 中的每个方法挂到 `Moveable.prototype` 上，转发给 `getInstance()`；`export * from "moveable"`。
  - `index.d.ts`：手写的类型声明，`SvelteComponentTyped<MoveableOptions & T, SvelteMoveableEvents>`，再用同名 interface 合并上 `MoveableInterface`。
  - `index.umd.js`：没有被 `exports` 或任何文件引用。
- `src/routes/+page.svelte`、`src/app.html`、`src/app.d.ts`、`vite.config.ts`、`svelte.config.js` 是 SvelteKit 演示应用。

**构建**
- `vite build && pnpm run package`：
  - `vite build` 构建的是 SvelteKit 演示应用，输出到 `.svelte-kit/`，与发布的包无关。
  - `package` 依次执行 `svelte-kit sync`、`svelte-package`、`publint`。
- `svelte-package` 把 `src/lib` 原样复制到 `dist/`：
  - `.svelte` 和 `.js` 原样复制。
  - 手写的 `index.d.ts` 原样复制。
  - 为 `Moveable.svelte` 生成的声明中 props 是 `[x: string]: any`，实际起作用的是手写的 `index.d.ts`。
- `package.json`：`"type": "module"`，`svelte` 和 `types` 字段，`exports["."]` 只有 `types`、`svelte` 两个条件，都指向 `dist/index.*`。
- `framework-utils` 在 `dependencies` 中，但源码没有使用。

**依赖版本**
- svelte 4.2.0（开发依赖；peer 是 `^3.54.0 || ^4.0.0`）
- @sveltejs/kit 1.20.5、@sveltejs/package 2.1.0、@sveltejs/adapter-auto 2.1.0
- svelte-check 3.4.4、vite 4.3.9、publint 0.1.12
- TypeScript 4.8.4：`pnpm peers check` 报 svelte2tsx 0.6.16 要求 `^4.9.4 || ^5.0.0`
- 最新版本：
  - svelte 5.57.2
  - @sveltejs/package 3.0.1（peer typescript `^6.0.0`）
  - @sveltejs/vite-plugin-svelte 7.3.1（peer vite `^8`、svelte `^5.46.4`）
  - svelte-check 4.7.6（peer typescript `^5 || ^6`）
  - publint 0.3.25
- 仓库中其它包的 vite 是 8.3.4（react-moveable 的 Storybook）。

**在 scratchpad 中用 Svelte 5.57.2 验证的结果**
- 现有组件和 `index.js` 不改代码就能编译运行，以下行为都正常：
  - prop 更新
  - `onDrag` 回调 prop
  - `on:drag`（不论父组件是旧语法还是 runes 模式，runes 模式的父组件中写 `on:drag` 也没有编译警告）
  - 卸载销毁

  唯一失效的是方法：组件不再是类，`bind:this` 得到的是组件导出组成的对象，上面只有 `getInstance`，原型上挂的方法不在其中。
- 改写为 runes 模式（`$props()`、`$effect`、`onMount`）后，`createEventDispatcher` 仍可使用，`on:drag` 照常工作，编译没有警告。
- Svelte 5 的组件是函数：`(internals, props) => exports`（`svelte` 的公开类型 `Component` 就是这个签名）。外面包一层函数调用它，在返回的 `exports` 对象上补上方法：
  - `bind:this` 和 `mount()` 得到的引用上都能调用 `getRect()`，dev 模式和生产模式下都一样。
  - 服务端渲染时组件函数没有返回值，包装函数要跳过补方法这一步，否则报错。
- svelte-package 3 + TS 6.0.3：
  - `<script lang="ts">` 的组件原样输出，Svelte 5 编译器本身支持类型标注，不需要预处理。
  - 用 svelte2tsx 生成声明：`$props()` 标注为 `MoveableOptions` 加上 `onXxx` 回调的类型后，生成的 `Moveable.svelte.d.ts` 是 `Component<Props, { getInstance }>`。
  - `index.ts` 的类型声明原样保留。
- 用 svelte-check 4.7.6 按使用者的写法检查：在 runes 模式和旧语法的组件中使用 `on:drag`、`onDrag`、`bind:this` 后调用 `getRect()`，都没有类型错误；`draggable="yes"` 报错。
- Vitest 5 + vite-plugin-svelte 7：
  - 浏览器模式可以直接 import `dist/index.js`，由插件编译其中的 `.svelte`，与使用者的打包方式相同。
  - `.svelte.spec.ts` 中可以用 `$state` 作为 prop，修改后组件随之更新。
  - node 环境中同一个插件编译出服务端版本，`svelte/server` 的 `render` 可以直接使用。
- 原生 moveable 的 20 个方法只是转发内部组件的调用并返回其结果，没有一个返回 moveable 实例自身，所以现在 `index.js` 中「结果是实例时返回组件」的分支从未生效。
- 旧组件在 Svelte 5 上还有一个问题（评审时用 svelte-package 3 打包旧组件实测）：
  - 每次挂载后马上卸载，都会出现一个 unhandled rejection `Cannot read properties of null (reading 'setState')`。
  - 原因：旧语法下 `bind:this={moveableElement}` 的赋值会在挂载后再触发一次 `beforeUpdate`，其中 `tick().then(...)` 的回调晚于 `onDestroy` 的 `destroy()` 执行。
  - Vitest 把 unhandled error 计为失败。
- `moveable` 导出的 `PROPERTIES`、`METHODS`、`EVENTS` 都声明为 `string[]`（`packages/moveable/src/consts.ts`）。react-moveable 中的 `MOVEABLE_PROPS`、`MOVEABLE_EVENTS` 本身就是归约出来的 `string[]`，只有 `MOVEABLE_METHODS` 是 `Array<keyof MoveableInterface>`。
  - 原型组件中有三处因此在 svelte-check 下报错：用 `props[name]` 读 prop、`instance.on(name, ...)`、`dispatch(name, e)`。
- svelte-package 3 的中间文件写在 `.svelte-kit/__package__/` 中，运行后不清理。
- `$state.snapshot` 对普通对象和数组以外的值调用 `structuredClone`，DOM 元素无法克隆，dev 模式下会打印 `state_snapshot_uncloneable` 警告（`svelte/src/internal/shared/clone.js`）。
- croffle 生成的 Svelte 示例共 133 个：
  - 都是旧语法：顶层 `let` 加 `bind:this`、`on:drag={({ detail: e }) => ...}`、DOM 事件 `on:click`。
  - Svelte 5 下 130 个能编译。
  - 失败的 3 个在 Svelte 4.2 下同样失败，是 croffle 已有的问题：两个是 `<input>` 写了闭合标签，一个是 JS 语法错误。
  - Svelte 4.2 下还多 1 个失败：`4-SVG/svelte/ReactOriginFillboxApp`，样式属性中的空值 `transform: ;` 让 Svelte 4.2.0 的编译器内部报错（实施 1.1 时发现）。Svelte 5 能编译它。
  - `on:` 的写法是 croffle 在 SvelteWaffle 内部固定生成的，没有选项可改。

## Goals / Non-Goals

**Goals:**
- 对外的使用方式不变：
  - 选项 prop、`onXxx` 回调 prop、`on:xxx` 指令都照常可用。
  - 组件引用上可以调用方法。
  - `getInstance()` 照常可用。
  - 重新导出 moveable 的全部具名导出。
- 类型声明从源码生成，类型测试按使用者的写法检查。
- 测试先记录「只升级、不改源码」时失效的部分（方法，以及卸载时的 unhandled rejection），改写之后全部通过。

**Non-Goals:**
- 不改 Storybook 生成的 Svelte 示例，也不修 croffle 的已有问题（见 proposal 的「不在本次范围」）。
- 不加入 eslint-plugin-svelte：`.svelte` 中的 TS 由 svelte-check 检查。
- 方法在组件挂载之前（`getInstance()` 还是 `undefined`）被调用时会抛错，与现在相同，不加保护。
- 不改 `package.json` 的 `files`、`svelte` 字段和 `exports` 的结构（第 6 步）。

## Decisions

### 1. 组件改写为 runes 模式加 TypeScript

`src/lib/Moveable.svelte` 移为 `src/Moveable.svelte`，改用 `<script lang="ts">`：
- `const props: Props = $props()`。`Props` 是 `MoveableOptions` 加上每个事件的 `on${Capitalize<事件名>}` 回调，参数类型取自 `MoveableEvents`。
- 创建实例、注册事件、卸载销毁放在 `onMount` 中（返回清理函数）。事件处理照旧：先调用 `props` 中的回调，再 `dispatch`。
- 用 `$effect` 读取 `PROPERTIES` 中出现在 `props` 里的项并 `setState`，替代 `beforeUpdate` + `tick()`。`$effect` 在挂载之后运行，而且只在读取过的 prop 变化时重新运行。
- `getInstance()` 照旧导出。删除没有用到的 `isUndefined`。
- `PROPERTIES`、`EVENTS` 在组件中收窄为 `Array<keyof MoveableOptions>`、`Array<keyof MoveableEvents>`，与 `Props`、`createEventDispatcher<MoveableEvents>()` 对应，svelte-check 才能通过（见 Context）。
  - 不改 moveable 的 `consts.ts`：其中两个常量在 react-moveable 中本身就是 `string[]`，要改就得改 react-moveable 的归约类型，超出本次范围。

`$effect` 的两点语义，按以下方式处理，并写进 README：
- 挂载时会多一次 `setState`：构造函数用一次初始选项，`$effect` 首次运行又用同样的选项 `setState` 一次。
  - 这只多一轮 croact 渲染，对外没有可见差别。
  - 不为跳过这一次加标志变量，否则要多维护一个状态。
- 只有 prop 本身被重新赋值时才 `setState`。父组件对 `$state` 对象的深层修改（如 `bounds.left = 100`、`renderDirections.push("e")`）不会传给 moveable，要整体赋值。
  - 这与 vue3-moveable（`watch` 只检查 prop 本身是否被重新赋值）、react-moveable 一致。
  - 不用 `$state.snapshot` 深读：`target`、`container`、`elementGuidelines` 等选项含有 DOM 元素，无法克隆，dev 模式下会出警告（见 Context）。

改写同时修掉旧组件在 Svelte 5 上卸载时的 unhandled rejection（见 Context）。`setState` 在 `$effect` 中同步执行，卸载后 effect 不再运行。

理由：
- 只升级不改写也能运行（见 Context），但 `beforeUpdate`、`$$props` 是 Svelte 5 中已弃用的旧语法。
- 旧语法下 svelte2tsx 只能生成 `[x: string]: any` 的 props 类型，所以现在要手写 `index.d.ts`。改用 `$props()` 并标注类型后，声明可以从源码生成。

`on:` 指令保留，用 `createEventDispatcher` 派发：
- 它在 Svelte 5 中已弃用但仍然可用（runes 模式中也可以）。
- croffle 生成的 133 个示例全部使用它，而且这是 croffle 内部固定的输出。去掉它会让 Storybook 中给出的 Svelte 代码全部失效。
- 去掉它要等示例改用回调 prop（第 5 步），记入 ROADMAP。

`.svelte` 以 TS 源码发布，使用者的 Svelte 5 直接编译。Svelte 5 只支持类型标注一类的 TS 语法，所以组件脚本中不能写 `enum`、装饰器等需要转换的语法。这一点写进 `CLAUDE.md`。

### 2. 方法由包装组件补到组件引用上

`src/index.ts` 默认导出一个包装组件：调用内部组件，在它返回的 `exports` 对象上，为 `METHODS` 中的每个方法加一个转发给 `getInstance()` 的函数，返回这个对象。服务端渲染时内部组件没有返回值，直接返回。类型断言为：

```ts
Component<ComponentProps<typeof Inner>, ReturnType<typeof Inner> & MoveableInterface>
```

现在的「结果是 moveable 实例时返回组件」分支不再保留：原生 moveable 没有返回实例自身的方法（见 Context）。

备选方案：
- 在 `Moveable.svelte` 中逐个 `export function getRect(...)`：
  - 不依赖组件函数的调用方式。
  - 但要手写 20 个方法，与 `METHODS` 重复。react-moveable 新增方法时 svelte-moveable 不会自动得到，违背「改行为只改 react-moveable」的约定。
- 只保留 `getInstance()`，让使用者写 `ref.getInstance().getRect()`：最简单，但对现在直接调用方法的使用者是 BREAKING，也与 lit、vue3 的包装不一致。

所选方案依赖 Svelte 5 的组件签名 `(internals, props) => exports`。它是 `svelte` 导出的公开类型 `Component` 所描述的签名；`internals` 原样传递，不读取也不修改。风险见 Risks。

### 3. 构建：去掉 SvelteKit，只用 svelte-package

- 删除演示应用和 SvelteKit 配置：`src/routes/`、`src/app.html`、`src/app.d.ts`、`vite.config.ts`、`svelte.config.js`。不需要预处理，所以不需要 `svelte.config.js`。
- 源码从 `src/lib/` 移到 `src/`（与 lit、vue3 一致），删除 `index.umd.js` 和手写的 `index.d.ts`，`index.js` 改为 `index.ts`。
- `tsconfig.json` 不再继承 `.svelte-kit/tsconfig.json`，自己写出：`target: es2022`、`moduleResolution: bundler`、`strict`、`verbatimModuleSyntax`，`include: ["src"]`。svelte-package 和 svelte-check 都读这一份。
- scripts：
  - `build`：`svelte-check --tsconfig ./tsconfig.json --fail-on-warnings && svelte-package -i src && publint && pnpm run test:type`。
    - svelte-package 生成声明时不报类型错误，所以源码的类型检查由 svelte-check 负责。
    - 与 lint 一样，警告也算失败。
    - publint 检查入口字段。
  - `test:type`：`svelte-check --tsconfig ./tsconfig.test.json`。
  - `test`：`vitest run`。
  - 删除 `dev`、`preview`、`package`、`prepublishOnly`、`check`、`check:watch`。
- `dist/` 为 `Moveable.svelte`、`Moveable.svelte.d.ts`、`index.js`、`index.d.ts`，`package.json` 的入口字段不变。
- `.gitignore` 删去只属于 SvelteKit 的 `/build`、`/package`。保留 `/.svelte-kit`：svelte-package 的中间文件写在这里（见 Context），注释改为说明这一点。

### 4. 测试：浏览器测试、服务端渲染测试、类型测试

`vitest.config.mts` 加 `svelte({ configFile: false })` 插件（没有 `svelte.config.js`，不让插件每次去找并打印提示），用 `test.projects` 分为两个 project（写法同 react-moveable，Vitest 显示为 `svelte-moveable (browser)`、`svelte-moveable (ssr)`）：
- `browser`：浏览器模式，`include: ["test/**/*.spec.ts"]`，排除 `*.ssr.spec.ts`。
- `ssr`：node 环境，`include: ["test/**/*.ssr.spec.ts"]`。

都 import `../dist/index.js`。`config/testing/browser.ts` 中的 `createTarget`、`drag` 继续共用。

浏览器测试 `test/SvelteMoveable.svelte.spec.ts`。文件名中的 `.svelte.` 让插件按 runes 模块编译，从而可以用 `$state` 作为 prop。用 `mount` / `unmount`，清理方式同 vue3。各项检查如下：

| 测试 | 检查 |
|---|---|
| 渲染控制框 | 根元素有 `moveable-control-box`，有 4 条 `.moveable-line` |
| 挂载后修改 prop | 改 `rotatable` 后出现旋转控制点；改 `draggable` 为 `false` 后拖动不触发回调。等待 `setState` 生效时用 `getInstance().getManager().props`，不经过补上的方法，这样在旧组件上也能运行 |
| 回调 prop 收到事件 | `onDragStart`、`onDrag`、`onDragEnd` 依次调用，`onDrag` 的 `transform` 含 `translate(50px, 30px)` |
| 调用方法 | `mount()` 返回值上的 `getRect()` 尺寸为 200×100 |
| 卸载时销毁 | 卸载后控制框中没有连线和控制点 |
| 挂载后马上卸载 | 挂载后同步卸载，再等一个宏任务：挂载期间推迟执行的工作不能碰到已销毁的 moveable（否则是 unhandled error，Vitest 计为失败）。这是旧组件在 Svelte 5 上的问题（见 Context），实施 3.2 时补上：其余测试卸载前都等过微任务，检不出它 |
| Storybook 示例的写法 | 旧语法的测试组件 `test/LegacyUsage.svelte`：`bind:this`、`on:drag`；拖动后 `detail.transform` 正确，绑定的引用上 `getRect()` 可用。事件通过回调 prop 记录：`$state` 会代理传入的数组，组件写入的是代理而不是测试中的原数组 |

服务端渲染测试 `test/SvelteMoveable.ssr.spec.ts`：用 `svelte/server` 的 `render` 渲染一个包含组件的测试页面 `test/SsrPage.svelte`，不报错，输出包含组件的根元素。

类型测试由 svelte-check 按 `tsconfig.test.json` 检查，它继承 `tsconfig.json`，只包含以下两个文件：
- `test/types.ts`：
  - 用 `mount(Moveable, { target, props })` 检查正确的 prop 和 `onDrag`，其中 `e.transform` 赋给 `string`。
  - 带 `@ts-expect-error` 的错误 prop。
  - 返回值上的 `getRect()`、`updateRect()`、`getInstance()`。
- `test/TypesUsage.svelte`：runes 模式，`bind:this` 到 `ReturnType<typeof Moveable>` 类型的变量后调用 `getRect()`，同时使用 `onDrag` 和 `on:drag`。

两者都从 `../dist/index.js` 导入。模板中不能写 `@ts-expect-error`，错误类型的检查都放在 `types.ts` 中。

测试顺序：
1. 先只换工具链、升级 Svelte 5（源码只移动，不改内容），在旧组件上运行浏览器测试和服务端渲染测试，记录结果。预期有两类失败：
   - 「调用方法」和「Storybook 示例的写法」中的 `getRect()`。
   - 卸载引起的 unhandled rejection（见 Context），记录其数量和来源。
2. 改写源码后全部通过，也没有 unhandled error；同时加入类型测试。

这样测试本身也得到了验证：它能检出本次要修复的问题。

### 5. svelte 的 peer 范围是 `^5.0.0`

组件只用到 Svelte 5.0 就有的 API（`$props`、`$effect`、`onMount`、`createEventDispatcher`、类型标注），所以 peer 写 `^5.0.0`。开发和测试用最新的 5.57.2。vite-plugin-svelte 要求 `^5.46.4`，只影响本仓库的测试，与使用者无关。

### 6. TypeScript、lint 与依赖

- TypeScript 升到 `~6.0.3`，与其它包相同。之后仓库中不再有 TS 4.8，`CLAUDE.md` 中「moveable 及其上游库不要写 TS 5+ 语法」的限制随之删除。
- 根目录 `eslint.config.mjs` 的 `files` 加入 `packages/svelte-moveable/src/**/*.ts`。
- vite 声明为 `^8.3.4`，与 react-moveable 相同，锁文件中只有一份 vite。vitest、@vitest/browser-playwright、playwright 与 lit、vue3 同版本。
- `pnpm-workspace.yaml` 的 `allowBuilds`：
  - 删除不再存在的 `@sveltejs/kit` 和 `svelte-preprocess`（以 `pnpm install` 后锁文件为准），并改写对应的注释。
  - 新依赖如果有需要拦截的构建脚本，按现有方式补上。

## Risks / Trade-offs

- [包装组件依赖 Svelte 5 组件的调用签名，以后的 Svelte 大版本可能改变它] → 签名来自公开类型 `Component`；浏览器测试的「调用方法」「Storybook 示例的写法」和服务端渲染测试都会在它失效时失败。peer 范围只到 5.x。
- [`on:` 指令和 `createEventDispatcher` 已弃用，未来的 Svelte 大版本会删除] → 本次为了示例保留；ROADMAP 记录「示例改用回调 prop 后去掉 `on:`」。README 推荐回调 prop。
- [使用者用 Svelte 4 时无法升级] → proposal 标为 BREAKING，peer 声明为 `^5.0.0`。
- [组件以 TS 源码发布，使用者必须用 Svelte 5 的编译器] → peer 已要求 Svelte 5；组件中只写类型标注（决策 1）。
- [声明从手写改为生成，类型变化如下] → 回调 prop 的参数仍有精确类型，README 推荐用回调 prop；proposal 中 Svelte 5 本身已是 BREAKING，并写明这几点变化。
  - 组件类型从类变为 `Component`。
  - 不再导出 `SvelteMoveableEvents`。
  - 去掉了旧声明中用来附加 prop 类型的泛型参数 `<T>`。
  - `on:drag` 的 `detail` 变为 `any`，不存在的事件名也不报错。原因是 Svelte 5 的 `Component` 类型中没有描述 `on:` 事件的位置，评审时用 svelte-check 实测确认。
- [Svelte 的 HMR 在热更新时会删掉组件引用上的全部属性，再复制新组件的导出，包装组件补上的方法会丢失] → 只在使用者编辑 `node_modules` 中的 svelte-moveable 时才会触发；仓库中没有 Svelte 的开发服务器。不处理。
- [vite-plugin-svelte 7 要求 vite 8，测试和构建以外的 Vite 用途都已删除] → vite 只作为测试依赖，版本与仓库其它部分一致。
- [服务端渲染测试依赖 Vitest node 环境中插件生成服务端代码] → 已在 scratchpad 中验证。如果以后失效，测试会因为 `render` 不可用或输出不对而失败，不会悄悄通过。
- [`.svelte` 文件不在 ESLint 范围内] → 其中的 TS 由 svelte-check 在构建中检查，格式问题暂不检查。

## Migration Plan

1. 记录基线：
   - 现有 `dist/` 的文件列表和 `index.js` 的导出。
   - `pnpm peers check` 的输出。
   - 用 Svelte 4.2 编译全部生成示例的结果。
2. 换工具链并升级 Svelte 5（决策 3、5、6 的依赖部分），源码只从 `src/lib/` 移到 `src/`，不改内容；构建只有 `svelte-package -i src && publint`。
3. 写浏览器测试和服务端渲染测试，在旧组件上运行，记录失败的测试和 unhandled rejection（决策 4 的测试顺序）。
4. 改写组件和 `index.ts`（决策 1、2），删除手写声明。构建加上 svelte-check 和类型测试，全部测试通过。用 Svelte 5 编译全部生成示例，结果与基线相同。
5. lint、README、`CLAUDE.md`、`pnpm-workspace.yaml`、CI 注释、ROADMAP。
6. 推送后确认 CI 通过。再用一个让 svelte-moveable 测试失败的临时提交确认 CI 在测试步骤失败，验证完 revert。最后做一次全新克隆的完整验证。

回滚：整个 change 是一组提交，revert 即可。
