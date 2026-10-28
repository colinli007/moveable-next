## Context

动机见 proposal.md。与方案有关的现状：

- **Storybook**：只有 react-moveable 一份（`@storybook/react-vite`，Vite 8）。20 个 story 文件、137 个 story，每个 story 渲染一个 App（136 个 `React*App.tsx`，加 `TreeShakingApp.tsx`）。story 由 `stories/utils/story.tsx` 的 `appStory(App, { apps, sources, argTypes, args })` 生成：`apps` 是本目录 `./*App.tsx` 的 eager glob，用来找到 App 对应的文件；`sources` 是 `./{*App.tsx,*.css}` 的 `?raw` glob，用来生成代码 tab。26 个 play 只通过 `canvasElement` 查询 DOM（`.target`、`.moveable-control-box`、控制点），再断言 `style.transform`，不涉及 React。
- **代码面板**：本地 addon `.storybook/addons/code-preview/`，在 manager 端读取 story 的 `parameters.preview`（`Preview[]`：`tab`、`template`、`language`……），用当前参数渲染模板（`renderTemplate` 对参数值做 `JSON.stringify`），按 `tab` 分组显示。React 模板由 `stories/utils.ts` 的 `convertReactTemplate` 生成：替换包名别名，把 `props.xxx` 切成模板的值。
- **测试**：`vitest.config.mts` 中 `storybook` project 用 `storybookTest({ configDir, initialGlobals: { viewport: { value: "test" } } })` 把每个 story 变成一个浏览器测试。`storybookTest` 支持 `initialGlobals` 和 `tags`（include / exclude）选项。
- **路径别名**：react-moveable 的 `tsconfig.json` 中 `paths` 把 `@/react-moveable` 指向 `./src/`、`@moveable-next/helper` 指向 `../helper/src/`，Vite 通过 `resolve.tsconfigPaths` 使用同一份配置。helper 没有写进 react-moveable 的依赖，是先例。
- **包之间的依赖**：react-moveable ← croact-moveable ← moveable ← vue3-moveable。vue3-moveable 的源码 import `@moveable-next/vanilla`，后者的入口是构建产物；croact 的产物又内联了 react-moveable 的产物。所以 Vue 包装运行时用到的核心逻辑一定来自构建产物。
- **vue3-moveable**：`src/VueMoveable.ts` 用 `defineComponent` 定义组件，`props: PROPERTIES`，方法从 `METHODS` 生成，事件在 `mounted` 中逐个 `moveable.on(name, e => this.$emit(name, { ...e }))`，没有声明 `emits`。Vue 会把没有声明的 `onXxx` 监听器当作透传属性挂到根元素上，与原生 DOM 事件同名的（`@click`、`@drag`）就同时成了根元素的原生事件监听器（`@dragStart` 这类会被转成 `drag-start`，没有对应的原生事件，不受影响）。React 示例中 Moveable 上有 1 处 `onClick`、4 处 `onClickGroup`、61 处 `onDrag`。`test/VueMoveable.spec.ts` 针对 `dist` 测试 prop、事件、方法和卸载。
- **示例用到的周边包**：react-selecto（5 个 App）、react-infinite-viewer（1）、react-keycon（2）、keycon（1）、react-dom 的 `createPortal`（2）、`makeMoveable`（1，TreeShaking）、通过 ref 调用 moveable 方法（33）。对应的 vue3-selecto 1.12.3、vue3-infinite-viewer 0.17.1 都是 2023 年发布的，`package.json` 中都没有声明 `vue`。

## Goals / Non-Goals

**Goals:**
- story 的定义只有一份，切换框架时只换 App 和代码，不复制 argTypes 和 play。
- Vue 示例与 React 示例接受同一组断言，Vue 示例的类型检查与 stories 的类型检查放在同一个 CI 步骤中。
- React 模式的开发体验不变：不需要先构建，修改 react-moveable 源码后立即生效。

**Non-Goals:**
- 在 Vue 模式下热更新 react-moveable 的源码改动：Vue 模式用的是原生版的构建产物，改核心逻辑后要重新构建（见 Risks）。
- 让 play 断言更多行为：断言维持现有的 26 个 play，不为 Vue 增加或改动断言内容。
- 原生 JS（vanilla）示例。
- 用 ESLint 检查 stories 或 Vue 示例：现在的 lint 范围只有库包的 `src`。

## Decisions

### 1. 一个 story，两种渲染，由 Storybook 的 global 切换

`preview.tsx` 增加 global `framework`（工具栏选项 React / Vue，`initialGlobals` 为 `react`）。`appStory` 生成的 `render` 读取 `context.globals.framework`：React 下照旧渲染 `<App {...args} />`，Vue 下渲染一个挂载 Vue 应用的 React 组件（决策 2）。story 的 id、argTypes、args、play 都不变。

考虑过的其它做法：
- 另建 `@storybook/vue3-vite` 的 Storybook，再用 Composition 合并：20 个 story 文件的 argTypes 和 play 要复制一份并保持同步；多一套 Storybook 配置、Vitest project 和构建产物；开发时两个服务都要开着，合并才有内容。否决。
- 同一个 Storybook 中为 Vue 另加 story（比如 `title: "Vue/Basic"`）：侧边栏翻倍，137 个 story 定义和 play 引用都要重复。否决。

### 2. 在 React 渲染器中挂载 Vue 应用

一个 Storybook 只能有一个渲染器。Vue 模式下 `render` 返回一个 React 组件，它在 effect 中执行 `createApp({ render: () => h(VueApp, state) }).mount(div)`，其中 `state = shallowReactive({ ...args })`；参数变化时 `Object.assign(state, args)`，组件卸载时 `app.unmount()`。这与使用者在 `main.ts` 中 `createApp(App).mount(...)`、在模板中给组件传响应式 prop 是同样的行为，vue3-moveable 的测试中 `mount` 也是这样写的。

### 3. Vue App 的查找、配对和懒加载

- Vue 示例命名为 `Vue<Name>App.vue`，与 `React<Name>App.tsx` 放在同一目录。`appStory` 根据 React App 的文件名找到对应的 Vue 文件，找不到就抛出错误，错误中写明期望的文件名（framework-packages「缺少 Vue 版」）。按命名配对，story 文件中不需要逐个 import Vue App，只需要把两个 glob 扩展到 `.vue`。
- 每个 story 文件对本目录的 Vue App 做非 eager 的 glob（`import.meta.glob("./*App.vue")`），`appStory` 生成 story 的 `loaders`：只在 `framework` 为 `vue` 时加载对应的 Vue App，`render` 从 `context.loaded` 中取用。loaders 在渲染和 play 之前完成，所以 play 不需要等待 Vue App 加载。React 模式不会加载任何 `.vue` 文件，也就不会解析到 vue3-moveable 和原生版的构建产物（monorepo-tooling「未构建时 React 模式可用」）。
- Vue 源码的 `?raw` glob 保持 eager：`?raw` 只读取文本，不编译、不解析依赖。
- 唯一的例外 TreeShaking：story 写 `tags: ["react-only"]`，并给 `appStory` 传 `vue: false`。两处都要写，因为 Storybook 的索引器只读取字面量的 `tags`，`appStory` 读不到 tags。`vue: false` 时 Vue 模式渲染一段说明文字，不生成 Vue tab。Vue 的测试 project 用 `tags: { exclude: ["react-only"] }` 排除它。

### 4. 代码面板按框架筛选

`Preview` 增加 `framework` 字段（`"react" | "vue"`），`appStory` 为两种框架各生成一组 tab：React + CSS、Vue + CSS（默认样式在两组中各出现一次，App import 的样式文件按各自的源码提取）。manager 端用 `useGlobals()` 读取 `framework`，只显示当前框架的那一组。

Vue 模板由新的 `convertVueTemplate` 生成：`"@/vue3-moveable"` 换成 `"@moveable-next/vue3"`，去掉 `const props = defineProps<...>()` 语句（泛型可能跨多行），再用现有的 `convertTemplate` 把 `props.xxx` 切成模板的值。

参数值插入 Vue 模板时有一个 React 没有的问题：`props.xxx` 写在双引号包住的属性值中（`:throttleDrag="props.throttleDrag"`），`JSON.stringify` 得到的字符串、数组、对象带双引号，会提前结束属性值。所以 `Preview` 增加一个值的格式选项，Vue tab 把参数值写成单引号的 JavaScript 字面量（`'.target'`、`['.a', '.b']`）。单引号字面量在 `<script setup>` 中同样合法，所以 Vue 源码的两部分不需要区分。

### 5. Vue 包装通过路径别名引用源码，不写成 workspace 依赖

react-moveable 的 `tsconfig.json` 增加 `@/vue3-moveable` → `../vue3-moveable/src/`，Vue 示例写 `import Moveable from "@/vue3-moveable"`，与 React 示例的 `@/react-moveable` 对应。

- 不把 `@moveable-next/vue3` 写进 react-moveable 的 devDependencies：那样会形成 react-moveable → vue3-moveable → moveable → croact-moveable → react-moveable 的循环。`pnpm -r build` 遇到循环时顺序不确定，croact 可能在 react-moveable 之前构建，内联到旧的产物或找不到产物。
- 指向 vue3-moveable 的源码而不是 `dist`：包装的修复不需要重新构建就能在 Storybook 中看到；`dist` 由 vue3-moveable 自己的浏览器测试检查（framework-packages「框架包装的浏览器测试」不变）。vue3-moveable 源码 import 的 `@moveable-next/vanilla`、`vue`、`@daybrush/utils` 从它自己的目录解析，用的是它自己声明的依赖。
- `vue` 改为 catalog 依赖，react-moveable 和 vue3-moveable 解析到同一个版本、同一个真实路径，Vite 只会加载一份 Vue。这一点在第 1 组任务中验证；如果出现两份，再加 `resolve.dedupe`。

### 6. 测试：第二个 storybookTest project

`vitest.config.mts` 中现有的 `storybook` project 改名为 `storybook-react`，增加 `storybook-vue`：同样的 `storybookTest`，`initialGlobals` 中加 `framework: "vue"`，`tags: { exclude: ["react-only"] }`。play 不知道当前是哪个框架，也不允许按框架分支：Vue 下失败，要改的是 Vue App（或者是包装的 bug，见决策 8），不是 play。

退路：如果同一个配置中的两个 `storybookTest` 实例互相影响，就只保留一个 project，由环境变量决定 `framework`，`pnpm test` 依次以两个值各执行一次 Vitest。

两个 project 的测试文件和测试名相同。Vitest 内置的失败截图保存在 `<attachmentsDir>/failure-screenshots/<测试文件名>/<测试名>.png`，路径中没有 project；`attachmentsDir` 只能全局设置，写在单个 project 中不生效（任务 3.7 中验证：同一个 story 在两个 project 中都失败时，两张截图写到同一个文件）。所以两个 story project 关掉内置的失败截图（`screenshotFailures: false`），改由共用的 `.storybook/vitest.setup.ts` 在 `onTestFailed` 中用 `page.screenshot` 截图，保存到 `<attachmentsDir>/failure-screenshots/<project>/<测试文件名>/<测试名>.png`；project 名由 vitest 配置的 `provide`（`storybookProject`）传入，不依赖从包目录还是根目录运行。截图仍在 `.vitest/attachments/failure-screenshots/` 下，CI 的上传路径不变。

### 7. Vue 示例的写法

- SFC，`<script setup lang="ts">` + `<template>`，不写 `<style>`：样式与 React 示例共用全局的默认样式，App 自己的样式文件在 `<script setup>` 顶部 `import "./xxx.css"`，CSS tab 用现有的正则提取。
- 参数：`const props = defineProps<{ draggable: boolean; throttleDrag: number }>()`，模板和脚本中都写 `props.xxx`（代码 tab 的转换依赖这个写法）。
- 模板中的 prop 和事件名使用 moveable 的原名（`:throttleDrag`、`@dragStart`），与 React 示例、API 文档中的名字一一对应，便于对照和搜索。
- 目标用模板 ref（`const targetRef = ref<HTMLElement | null>(null)`，`:target="targetRef"`）；调用方法用组件 ref（`ref<InstanceType<typeof Moveable>>()`）；React 的 state 改为 `ref` / `reactive`；`createPortal` 改为 `<Teleport>`；自定义 able 的 `render` 中用参数里的 `React.createElement` 创建元素（SFC 中没有 JSX，原生版的自定义 able 也是这样写的）。
- 周边包：用 vue3-selecto、vue3-infinite-viewer。任务 1.3 的验证结果：两个包的产物都 import 了 `vue` 和 `@daybrush/utils`，但 `package.json` 中都没有声明，pnpm 严格布局下 Vite 报 `Failed to resolve import "@daybrush/utils"`；用 `packageExtensions` 给两个包补上 `dependencies: { "@daybrush/utils" }` 和 `peerDependencies: { vue }` 后，在 Vue 3.5.44 + Vite 8 中框选能选中元素、滚轮能滚动视图，没有运行时错误。vue3-selecto 的类型声明还 import 了没有声明的 `framework-utils`（`MethodInterface`），影响通过 ref 调用 selecto 方法时的类型；移植 9A-Components 时如果 vue-tsc 因此报错或方法类型变成 `any`，同样用 `packageExtensions` 补上。每条都按仓库规则写注释（哪个包、什么问题、什么时候可以删除）。react-keycon 改为 keycon。
- 类型检查：`stories/tsconfig.json` 的 `include` 加上 `./**/*.vue`，`typecheck:stories` 改为 `vue-tsc -p stories`（vue-tsc 是 tsc 的超集，同时检查 `.ts`、`.tsx` 和 `.vue`），CI 的步骤名和命令不变。不另建 `tsconfig.vue.json`：Vite 的 `resolve.tsconfigPaths` 只对被某个 `tsconfig.json` 的 `include` 覆盖的文件应用 `paths`，`.vue` 不在 `stories/tsconfig.json` 中时，Vite 解析不到 `.vue` 里的 `@/vue3-moveable`（任务 3.8 中遇到）。

### 8. 包装的修复随移植进行

移植中 Vue 示例的行为与 React 不一致时，先判断原因：示例写错就改示例；包装的问题（比如 `emits`）就修 `src/VueMoveable.ts`，同时在 `test/VueMoveable.spec.ts` 中补一个先失败、修复后通过的用例。示例中不为包装的问题写绕过代码，因为示例展示的就是使用者应该怎样写。已知的修复是 `emits: EVENTS`，放在第一个目录移植之前完成。全部修复合为一份 `@moveable-next/vue3` 的 patch changeset。

## Risks / Trade-offs

- [Vue 模式用的是原生版的构建产物，修改 react-moveable 源码后，Vue 模式要重新执行 `pnpm packages:build` 才能看到] → React 模式仍是主要的开发环境；CLAUDE.md 中写明。CI 和 `demo:build` 本来就先构建全部包。
- [Vue 的 prop 更新经过 watch 和 croact 的异步 `setState`，可能比 React 晚一拍，play 中紧接着的断言可能失败] → play 开头已有 `await wait()`。如果仍然不够，改为等待 DOM 达到预期状态，不允许按框架分支；需要改 play 时在任务中逐条记录。
- [Vue 示例与 React 示例在 play 没有断言的方面不一致] → 每个目录移植完后，在 Storybook 中逐个对照两种模式的画面和交互；play 是底线，不是全部。
- [测试数量从 137 增加到 273，CI 耗时大约翻倍] → 完成后记录 CI 中测试步骤的耗时；如果不能接受，再考虑分片。
- [vue3-selecto、vue3-infinite-viewer 在 Vue 3.5 下不能用，或者需要 `packageExtensions`] → 第 1 组任务中验证，退路是原生的 selecto、infinite-viewer（决策 7）。
- [vue-tsc 与 TypeScript 6.0 不兼容] → 第 1 组任务中验证。不兼容时，Vue 示例的类型检查改为用 vue-tsc 自带的 TypeScript 版本，前提是不影响 catalog 中 TypeScript 的统一版本；两者都不行时停下来与用户确认。
- [TreeShaking 例外需要在 story 中写两处（`tags` 和 `vue: false`），漏写 tag 时 Vue 下会把说明文字当作通过的测试] → 只有一个例外，写在 framework-packages spec 中；CLAUDE.md 的 story 写法约定中写明两处都要写。

- [移植中发现原生版的问题：单目标和组之间切换时，旧的控制框不会从 DOM 中删除] → 原因有两处：react-moveable 的 `InitialMoveable._updateRefs` 在第一次渲染时遍历的是上一次的 `refTargets`（空），所以选择器总要先按单目标渲染、挂载后再切换为组；croact 的 `renderSelf` 把 self 模式下的所有根节点都标为 `_sel`，卸载时不删除，第一次复用的元素和之后新建的控制框都会留下，来回切换会越积越多。React 版不受影响，Vue 3 版只是暴露了它。用户决定（2026-10-27）另开 change 修原生版；本 change 中受影响的「Snap & Bound / Snap Elements (group)」打 `vue-known-issue` 标签，Vue 的测试 project 用 `tags.skip` 跳过（结果中显示为 skipped），登记在 monorepo-tooling「CI 跑交互测试」场景和 ROADMAP。
- [原生版和 Vue 3 版没有导出 `DIRECTIONS`（React 版有）] → 两个 Vue 示例（RotateWithControls、RotateWithResize）在本地写方向数组常量。用户决定（2026-10-27）不在本 change 增加导出，记入 ROADMAP 的已知遗留。

## Migration Plan

对使用者只有 vue3-moveable 的修复，以 patch 版本发布（四个 fixed 包一起升版本）；`emits` 修复后，原来同时收到原生 click 的 `@click` 只会收到 moveable 的事件，这是修 bug，不是 API 变化。Storybook 的改动随 demo 站点的下一次手动发布上线。回滚就是回退本 change 的提交。
