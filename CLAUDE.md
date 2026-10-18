# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 仓库概况

Moveable（daybrush/moveable 的 fork）：给 DOM/SVG 元素提供拖拽、缩放、旋转、变形、吸附、分组等交互的库，同一套核心逻辑发布为 React / Preact / 原生 JS / Vue 3 / Svelte / Lit 多个包。

- 运行时：Node **22.20.0**（根目录 `.nvmrc`，`nvm use` 即可切换；CI 读取同一个文件）。
- 包管理：**pnpm workspace**（版本见根 `package.json` 的 `packageManager`，corepack 或全局 pnpm 会自动切换），只有一份根目录的 `pnpm-lock.yaml`，内部依赖写成 `workspace:~`。workspace 设置、catalog、overrides、`allowBuilds` 都在 `pnpm-workspace.yaml` 中。
- 依赖布局是 pnpm 默认的严格（isolated）布局，不开公开提升：包里用到的模块、脚本调用的可执行文件都必须在**这个包自己的** `package.json` 里声明，不能依赖根目录兜底；也不声明没有用到的依赖（被使用的包要求的 peer、包自己 peer 的开发版本除外）。pnpm 默认的私有提升（`node_modules/.pnpm/node_modules`）会让第三方包漏声明的依赖碰巧也能解析，所以判断第三方包的声明是否有问题时要用 `--config.hoist=false` 干净安装。依赖的构建脚本默认被拦截，新增需要构建的依赖时要写进 `allowBuilds`（目前只有 esbuild）。
- 依赖版本：被两个及以上的包声明的第三方依赖（dependencies / devDependencies）只在 `pnpm-workspace.yaml` 的 `catalog` 中写版本，各包写 `catalog:`；只有一个包用的依赖写在那个包里；第二个包开始用某个依赖时，把它移进 catalog。`pnpm lint` 会执行 `config/check-dependency-ranges.mjs`，出现重复的版本范围时失败。peerDependencies 不进 catalog。升级用 `pnpm update -r`，它会改 catalog 和各包的范围下限；vitest 和 @vitest/browser-playwright 在 catalog 中写的是同一个确切版本，`pnpm update -r` 不会动它们，要手动同时改。要让间接依赖也按现在的声明重新解析，删除锁文件时要连根目录和各包的 `node_modules` 一起删，否则 pnpm 会沿用 `node_modules/.pnpm/lock.yaml`。pnpm 默认不选发布不满一天的版本。
- overrides、packageExtensions、peerDependencyRules 只用来修正上游包的错误声明，每条都要有注释，写明针对哪个包、什么问题、什么时候可以删除。
- `@types/node` 与 Node 运行时同一个大版本（22.x），目前只有 react-moveable 的 stories 用到（`stories/tsconfig.json` 的 `types`）；间接依赖中 `@types/node: *` 的声明也会复用这个版本，所以没有包声明它时，`*` 会解析到最新的大版本。
- TypeScript 由 catalog 统一声明，不用全局 override：全部包（react-moveable、croact、preact、moveable、lit、vue3、svelte、helper）和根目录都用 `~6.0.3`（`moduleResolution: bundler`，声明文件的 tsconfig 必须显式写 `rootDir`，否则 TS 6 会把它们输出到 `declaration/src/`；TS 6 的 `types` 默认是 `[]`，不会自动加载 `@types/*`）；根目录的 TS 供 typescript-eslint 解析源码。svelte-moveable 的 `Moveable.svelte` 以 `<script lang="ts">` 源码发布，由使用者的 Svelte 5 直接编译，而 Svelte 只支持类型标注一类的 TS 语法，所以其中不能写 `enum`、装饰器等需要转换的语法。croffle 使用它自己依赖的 TS 4.5，`croffle.config.js` 必须从 croffle 所在目录解析 typescript，与它共用同一个实例。
- Lint：根目录一份 `eslint.config.mjs`（ESLint 10 flat config + typescript-eslint 8 + `@stylistic/eslint-plugin`），eslint 和插件只在根 `package.json` 中声明。检查范围写在配置的 `files` 中（7 个库包的 `src/**/*.{ts,tsx}`，以及 svelte-moveable 的 `src/**/*.ts`；`.svelte` 文件不在范围内，其中的 TS 由构建中的 svelte-check 检查），所以 `pnpm lint` 不带路径，编辑器插件和命令行的范围一致。各包的构建不执行 lint，CI 单独执行。eslint-plugin-react 只启用推荐集：推荐集以外有规则在 ESLint 10 下会报错。
- 需求/设计走 OpenSpec 工作流（`openspec/`、`.claude/skills/openspec-*`、`/opsx:*` 命令）。整体的现代化步骤和进度见 `openspec/ROADMAP.md`，每完成一个 change 就更新它。

## 常用命令

几乎所有开发都在 `packages/react-moveable` 里进行（根脚本基本是转发过去的）：

```bash
# 根目录
pnpm install               # 安装依赖（根目录一次装好所有包）
pnpm storybook             # = react-moveable 的 Storybook（先 bake，端口 6006），主要的开发/调试环境
pnpm test                  # 先 bake，再跑所有包的 Vitest（react-moveable 的 story 测试 + 各包单元测试 + 框架包装的浏览器测试；后者读构建产物，要先 pnpm packages:build）
pnpm build                 # 只构建 react-moveable
pnpm lint                  # ESLint 检查库包的 src（警告也算失败），再检查各包有没有重复的依赖版本范围；不需要先构建
pnpm packages:build        # pnpm -r build：按依赖拓扑构建所有包（react-moveable → croact/preact → moveable → lit/vue3/svelte，helper 独立）；vue3-moveable 的构建最后执行类型测试；svelte-moveable 的构建依次执行 svelte-check（警告也算失败）、svelte-package、publint 和类型测试
pnpm build:storybook       # 先 bake，再构建静态 Storybook 到 demo/storybook
pnpm doc                   # TypeDoc 从源码生成 moveable 的 API 文档到 doc/（typedoc.json + config/typedoc/，警告视为错误；不需要先构建，CI 会跑）
pnpm demo:build            # 构建所有包、文档和 Storybook，再由 config/copy-demo-files.mjs 把 moveable/helper 的 dist 和 doc/ 复制进 demo/；完成后 demo/ 就是站点根目录

# packages/react-moveable（或在根目录用 pnpm --filter react-moveable <script>）
pnpm test:type             # tsc -p tsconfig.test.json，对 tests/types.ts 做类型断言检查
pnpm typecheck:stories     # tsc -p stories：stories 和 .storybook 的类型检查（CI 会跑）
pnpm build                 # test:type + tsdown + declaration（不含 lint）
pnpm exec playwright install chromium   # 首次跑测试前安装浏览器（不靠 postinstall）
pnpm test                  # 先 bake，再跑本包的 Vitest
pnpm exec vitest run stories/1-Basic    # 只跑某个目录 / 文件的 story 测试
```

demo 站点只能在 GitHub Actions 中手动运行 `Deploy demo`（`.github/workflows/deploy-demo.yml`）发布：CI 从干净检出执行 `pnpm demo:build`，把 `demo/` 整体发布到本仓库的 GitHub Pages（来源设为「GitHub Actions」，不使用 gh-pages 分支）。本地没有发布命令。在 pnpm 11 中 `pnpm deploy` 执行的是根目录的同名脚本（不是 pnpm 内置命令，加 `--help` 也照样执行），所以根目录不要定义会写远程的 `deploy` 脚本。

Storybook 10（`@storybook/react-vite`，Vite 8），测试是 `@storybook/addon-vitest`（Vitest 5 浏览器模式，Playwright 驱动 chromium）。Vitest 配置按包分开：根目录 `vitest.config.mts` 只汇总 `packages/*/vitest.config.mts`；react-moveable 有 `storybook`（浏览器）和 `unit`（node，code-preview 的单元测试）两个 project，helper 一个（happy-dom），lit-moveable、vue3-moveable 各一个（浏览器），svelte-moveable 有 `browser`（浏览器）和 `ssr`（node，服务端渲染）两个 project（显示为 `svelte-moveable (browser)` 等，`--project "svelte-moveable (*)"` 同时选中）。配置文件用 `.mts`，因为包的 `package.json` 不是 `"type": "module"`。

测试：每个 story 都在 1280×720 视口下真实渲染并算作一个测试，带 `play` 的再执行断言（`stories/**/*.stories.tsx`，用 `stories/utils/testing.tsx` 的 `pan`/`pinch`/`rotate` 模拟手势，再断言 `style.transform`）。失败截图在根目录 `.vitest/attachments/failure-screenshots/`。本地调试单个用例：开着 `pnpm storybook`，在 Interactions 面板看对应 story 的 play 的每一步。

框架包装的浏览器测试（lit-moveable、vue3-moveable、svelte-moveable，在各包的 `test/` 下）：Vitest 浏览器模式，import 的是包的 `dist` 产物而不是源码（检查的就是使用者拿到的代码），所以要先构建。原生 moveable 的属性赋值经 croact 的 `setState` 异步生效，断言内部状态前用 `expect.poll` 等待（如 `getManager().props`）。同一个 `<lit-moveable>` 只能移除一次：再次移除会第二次 `destroy()` 并抛错。vue3-moveable 的测试用 `createApp` + `h` 挂载，不依赖 `@vue/test-utils`。创建目标元素和模拟鼠标拖动的辅助函数在根目录 `config/testing/browser.ts`（只用 DOM API），清理逻辑留在各自的测试文件中。vue3-moveable 另有类型测试 `test/types.ts`（`pnpm --filter vue3-moveable test:type`，检查的是 `declaration/`）。svelte-moveable：
- `dist/` 中的 `.svelte` 由 vite-plugin-svelte 编译，与使用者的打包方式相同。
- 测试文件名带 `.svelte.`（`SvelteMoveable.svelte.spec.ts`），可以用 `$state` 作为 prop、修改后组件随之更新；`$state` 会深层代理传入的数组和对象，组件写入的是代理，所以要让组件把数据交回测试时用回调 prop。
- `test/LegacyUsage.svelte` 按 Storybook 生成的 Svelte 示例的写法（不用 runes、`bind:this`、`on:drag`）使用组件。
- `*.ssr.spec.ts` 在 node 中用 `svelte/server` 渲染。
- 类型测试用 svelte-check 检查 `test/types.ts` 和 `test/TypesUsage.svelte`（`pnpm --filter svelte-moveable test:type`，检查的是 `dist/`）。

story 的写法约定（CSF3，见 `stories/utils/story.tsx`）：
- 每个 story 文件静态 import 自己的 App，并对**本目录**做两次 `import.meta.glob`（`apps` 和 `?raw` 的 `sources`），交给 `appStory(App, { apps, sources, argTypes, args })` 生成 `render`、`args`、`argTypes` 和代码 tab；`name`、`tags` 必须写成字面量（索引器只读静态值），export 名就是 story id，不要改。
- `play` 用 `devPlay(...)` 包一层：开发模式和测试中执行，发布的 Storybook 中不执行。`userEvent` 等来自 `storybook/test`，是异步的，要 `await`。
- 只为测试存在的 story 打 `tags: ["hidden-test"]`：侧边栏默认隐藏（可在标签筛选中显示），照常参与测试。
- 公共样式 `stories/common.css`、`stories/templates/default.css` 在 `.storybook/preview.tsx` 中全局引入；`.storybook/vitest.setup.ts` 给测试页面补上 Storybook 默认的 padded 布局。
- 代码 tab（React / CSS / Script / Vue3 / Svelte / Lit，随 Controls 实时替换参数）是本地 addon `.storybook/addons/code-preview/`，读取 story 的 `parameters.preview`。
- 控件说明中的「See API」用 `stories/utils.ts` 的 `makeLink(属性名)`（`Moveable` 类页面的锚点）或 `makeTypeLink(类型名, 成员名)` 生成，是指向同一站点 `release/latest/doc/` 的相对链接：部署后和本地 `demo/` 中可用，单独运行 `pnpm storybook` 时是 404。

`pnpm bake`（croffle）会把 React story 自动转译成 script（vanilla）/vue3/svelte/lit 版本的示例代码，生成在各 story 目录的子文件夹里（已 git 忽略），不要手改这些生成目录；`storybook`、`build:storybook`、`test` 都会先执行它。

## 架构

### 包依赖链

```
react-moveable  ← 全部核心逻辑（React class 组件）
 ├─ preact-moveable   内联 react-moveable 的产物，react → preact/compat，换 preact-css-styled
 ├─ croact-moveable   内联 react-moveable 的产物，react → croact（轻量 React 兼容运行时）
 │    └─ moveable     原生 JS 版：croact 的 renderSelf 渲染 InnerMoveable，
 │         │          @Properties 装饰器按 MOVEABLE_PROPS / EVENTS / METHODS 自动生成 getter/setter/方法代理
 │         └─ vue3-moveable / svelte-moveable / lit-moveable   包装原生 moveable
helper              独立工具包（@moveable/helper）
```

因此：**改行为只改 `react-moveable`**，其它包自动继承；新增 prop/事件必须登记在对应 able 的 `props` / `events` 数组里，才会进入 `MOVEABLE_PROPS` / `MOVEABLE_EVENTS`，进而被原生版和各框架包装自动暴露。

### 构建（tsdown）

7 个库包（react-moveable、croact、preact、moveable、lit、vue3、helper）用 tsdown（Rolldown）构建，每个包一份 `tsdown.config.mts`，共用选项（`target: "es2022"`、sourcemap、banner、`dts: false`）在根目录 `config/build.mjs`；类型声明由各包的 `declaration` 脚本（tsc）输出到 `declaration/`。产物文件名、CJS 的 `require()` 形状、UMD 全局名对外不变，改动后可以用 `openspec/changes/archive/*replace-build-with-tsdown/baseline.md` 中的方法对比。约束：
- 产物语法目标是 ES2022，tsconfig 中的 `useDefineForClassFields: false` 不能去掉：`@Properties`、`@withMethods`、Lit 的 `@property` 定义在原型上的访问器会被实例字段遮住。
- JSX 必须是经典转换（`jsx: react`，输出 `React.createElement`）：croact 没有 `jsx-runtime`。react-moveable 的构建读 `tsconfig.build.json`，因为 `tsconfig.json` 为了 Storybook 是 `jsx: preserve`。
- 产物运行时 import 的包必须在该包 `package.json` 中声明；ESM/CJS 配置都设了 `deps.onlyBundle: []`，有 node_modules 包被打进产物时构建直接报错。react、preact 暂时在配置中用 `deps.neverBundle` 保持 external，发布步骤再改成 peerDependencies；lit-moveable 的 lit（Lit 3，`^3.0.0`）、vue3-moveable 的 vue（`^3.5.0`）已经是 peerDependency，tsdown 会自动把 peer 当作外部模块。
- croact、preact 内联 react-moveable 的 ESM 产物（`deps.alwaysBundle` + `mainFields: ["module", "main"]`），用 `outputOptions.paths` 把输出中的 `react` / `react-css-styled` 改名为 croact / preact 的对应包；moveable 的 ESM/CJS 同样把 `react-moveable` 改名为 `croact-moveable`。这些是输出改名，不能换成 alias（已声明的依赖会先被判定为 external，alias 不生效）。
- moveable 的 UMD 要真正内联 croact：alias 指向 moveable 自己 `node_modules/croact` 的绝对路径（被内联的 react-moveable 产物从它自己的位置找不到 croact）。UMD 配置都是 `platform: "browser"`，否则会解析到 `node` 条件下的版本（如 lit 的 SSR 版本）。
- CJS/UMD 入口（`src/index.umd.ts`）只把具名导出挂到 default 上再 `export default`，由 `outputOptions.exports: "default"` 生成 `module.exports = Moveable`；不要在源码里写 `module.exports`，也不要在这个入口里加 `export *`。

### Able 插件体系（核心）

所有功能（Draggable、Resizable、Rotatable、Snappable、Groupable……）都是 `src/ables/` 下的 Able 对象，不是组件。接口与自定义示例见 `src/ables/README.md`。

- `src/ables/consts.ts` 的 `MOVEABLE_ABLES` 定义默认 able 及**顺序**（顺序即事件执行顺序：`BeforeRenderable` 最先，`Snappable` 在 `Draggable`/`Resizable` 等之前以便修正位移，`Renderable` 最后）。`MOVEABLE_PROPS/EVENTS` 由它归约得出。
- `makeMoveable(ables)` 可只组合部分 able（tree-shaking），默认 `Moveable` 即 `InitialMoveable` + 全部 able。
- Able 钩子按「操作 × 作用对象 × 阶段」命名：`drag` / `dragControl` / `dragGroup` / `dragGroupControl`（以及 pinch 对应）× `Start` / `` / `End`，可选 `*Condition` 决定是否参与、`render` 渲染控件、`request` 支持程序化调用（`moveable.request(...)`）。

### 渲染与事件流

1. `InitialMoveable`（`src/InitialMoveable.tsx`）解析 `target`/`targets`（含选择器、ref），按情况渲染：
   - 单目标 → `MoveableManager`
   - 多目标/`groupable` → `MoveableGroup`（内部为每个子目标挂一个 `MoveableManager`，组 rect 由子 rect 计算）
   - `individualGroupable` → `MoveableIndividualGroup`（多个独立 manager）
   切换单/组时会把旧 manager 的 state 作为 `firstRenderState` 传递。
2. `MoveableManager` 负责测量（`updateRect`，矩阵栈计算见 `src/utils/calculateMatrixStack.ts`、`getMatrixStackInfo.ts`）、渲染控制框并创建两个 Gesto：`targetGesto`（拖目标）和 `controlGesto`（拖控制点）。
3. `src/gesto/getAbleGesto.ts` 的 `triggerAble` 把 Gesto 事件分发到所有带对应钩子的 able：每个 able 有独立的 `datas`，able 回调里通过 `fillParams`/`triggerEvent`（`src/utils.tsx`）触发用户事件（如 `onDrag`）。拖动中事件后还会再触发一轮 `*After`，结束后 `updateRect` + `forceUpdate`。
4. 样式通过 `react-css-styled` 注入（croact/preact 版替换成对应实现），类名统一加 `moveable-` 前缀（`src/utils.tsx` 的 `prefix`）。

### 类型

`src/types.ts`（数千行）是所有 props、事件参数、`MoveableManagerInterface` 的唯一来源；`tests/types.ts` 用于编译期类型断言（`pnpm test:type`）。

API 文档（`pnpm doc`）由 TypeDoc 从这些声明的注释生成，入口 `config/typedoc/index.ts` 把 moveable 的默认导出命名为 `Moveable`，并写各分组的 `@categoryDescription`。注释约定：
- 注释写在它描述的声明上（TSDoc），不要用 `@typedef`、`@memberof`、`@name`、`@event`、`@namespace`、`@method` 这类结构标签把注释「挂」到别处：TypeDoc 只读声明上的注释，`pnpm doc` 会因未知标签失败。
- 选项的说明和示例写在 `XxxOptions` 的字段上；事件写在 `XxxEvents` 的 `onX` 成员上（`moveable.on("x")` 的说明也在这里）；方法写在 `MoveableInterface` 上，原生类自己实现、含义相同的方法用 `{@inheritDoc MoveableInterface.x}` 引用（`setState`、`forceUpdate` 在原生类和 React 组件上含义不同，说明直接写在原生类上）；`moveable.request(able, param)` 的参数写在 `XxxRequestParam` 上。
- 属于某个 able 的类型加 `@category <Able>`，其余默认归入 Core（`typedoc.json` 的 `defaultCategory`）。标为 `@private` 的选项不出现在文档中。
- `@param 参数名 - 说明`、`@returns 说明`；`@example` 单独一行，后面接代码（同一行的文字会被当成示例标题）；链接用 `{@link 符号}`；指向 Storybook 的链接写成 `@see [Storybook](../../../../storybook/?path=/story/<id>)`（文档页面在站点的 `release/latest/doc/<kind>/` 下）。
- `MoveableProperties` 必须保持基于 `Pick` 的同态映射，否则 `Moveable` 类页面上的选项会丢失注释。
