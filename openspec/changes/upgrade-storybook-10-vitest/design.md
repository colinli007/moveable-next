## Context

动机见 proposal.md 的 Why，需求见 `specs/monorepo-tooling` 与 `specs/framework-packages`。下面只列影响方案的现状事实：

- story 写法与 webpack 和 SB6 内部实现深度绑定：21 个 story 文件、137 个 story 都通过 `add()` 工厂生成 CSF2 函数，`name`、`args`、`parameters`、`play` 都在运行时设置。webpack 专有写法：story 文件中有 `require("./XxxApp").default` 137 处、`require.resolve` 125 处、`require("!!raw-loader!...")` 11 处；`story.tsx` 中有 6 处动态拼接路径的 raw-loader `require`；`stories/templates/default.ts` 用 `!!raw-loader!` 引入 CSS；`global.d.ts`（react-moveable 和 helper）声明了 `!!raw-loader!*` 模块；`.eslintrc` 中关闭了 `import/no-webpack-loader-syntax`。
- App 组件文件大多叫 `React*App.tsx`，但 `stories/8-TreeShaking/TreeShakingApp.tsx` 例外。croffle 只处理 `React*App.tsx`，所以 TreeShaking 本来就只有 React tab。
- `stories/utils/story.tsx` 运行时会修改 `window.__STORYBOOK_CLIENT_API__.facade`：开发模式下把带 play 的 story 复制成 `(test)` 和 `(original)` 两份；`SKIP_TEST` 模式下隐藏名字以 `Test` 结尾的 story（目前只有 `Scalable keepRatio Test`）。SB7 起这个 facade 已经不存在。另外，test-runner 仍然会按索引去加载被隐藏的 story，这正是 CI 里 `test:fail-ci` 报 `Unable to load story` 的原因。
- `add()` 中有一个 bug：`func.args = { ...makeArgs(argsTypes), args }` 把 `args` 作为一个键嵌套进去，而不是展开。唯一传了 `args` 的 `BasicScalableKeepRatioTest`（`args: { keepRatio: true }`）实际是以默认值 `keepRatio: false` 运行的。
- `EXEC_TEST=true` 时，没有 play 的 story 渲染为空。所以 137 个测试中有 111 个只是空跑，真正检查行为的只有 26 个 play。
- 代码 tab 由 `storybook-addon-preview@2.3.0` 渲染，读取 `parameters.preview`：模板拆成 `[strings, values]` 两部分，渲染时把 `$preview_<arg>` 占位替换为当前参数值。Script / Vue3 / Svelte / Lit 的源码来自 croffle 生成的 `stories/**/{script,vue3,svelte,lit}/` 目录（在 `.gitignore` 中）。按 `croffle.config.js` 的设计，用到 keycon 的 story 不生成 Script 和 Lit，用到 `createPortal` 的 story 完全不生成。`build:storybook` 和 CI 都不会先执行 bake。
- `.storybook/preview-head.html` 中的样式全部针对 `#docs-root`；SB7 起 docs 的根节点改成了 `#storybook-docs`。`preview.jsx` 用到的 `controls.passArgsFirst`（SB8 已删除）和 `viewport.viewports`（SB9 起改为 `viewport.options`）也都失效了。
- 装饰器：`src/InitialMoveable.tsx:118` 使用了 `@withMethods(MOVEABLE_METHODS)` 类装饰器，依赖 `tsconfig.json` 中的 `experimentalDecorators`；`target: es5` 也决定了 `useDefineForClassFields` 为 `false`。
- TypeScript：`pnpm-workspace.yaml` 中的 typescript override（`^4.8 <4.9`）把所有包，包括第三方依赖，都强制成 4.8.4。这个锁定原本是为 Angular 15 设的（提交 `bb608dc0` 里两者同步调整），Angular 包已经删除。以下工具和 TS 版本强相关：
  - `croffle@0.0.21` 在 `dependencies` 中声明 `typescript: ^4.5.0 <4.6.0`，使用的是 TS 4 的 factory 签名；TS 5 改了 `createParameterDeclaration`、`createImportDeclaration` 等函数的参数顺序。`croffle.config.js` 自己也 `require("typescript")` 来构造节点，交给 croffle 使用。
  - `vue-tsc@1.8.2` 通过修改 `typescript/lib/tsc.js` 的内容来工作，而 TS 5.9 的 `lib/tsc.js` 只是一个转发文件，找不到要替换的字符串时会直接 throw。
- `pnpm-workspace.yaml` 中还有 7 条 `@storybook/*: ^6.4.22` 的 override，以及 `@storybook/jest>@storybook/expect` 一条，都只为 Storybook 6 服务。
- helper 的 jest 测试（`test/unit/GroupManager.spec.ts`，2 个用例，用到了 DOM）在严格布局下已经跑不起来：缺少原来靠 hoist 得到的 jest 类型。它也不在 CI 中。
- react-selecto 同时出现在 react-moveable 的 `dependencies`（`^1.25.0`，库的运行时依赖）和 `devDependencies`（`^1.24.0`）中。
- 版本基准（2026-10）：storybook 10.6.1（`@storybook/react-vite` 的 peer 是 `vite ^5 || ^6 || ^7 || ^8`）、vite 8.3.4（转译改用 oxc）、`@vitejs/plugin-react` 6.x（peer 只接受 `vite ^8`）、vitest 5.0.3（engines 要求 `node ^22.12`）、`@vitest/browser-playwright` 5.0.3（peer 是精确的 `vitest: 5.0.3`）、`storybook-dark-mode` 5.0.0、TypeScript 5.9.3（5.x 的最后一版）。

## Goals / Non-Goals

**Goals:**
- story 只使用标准的 ESM 和 CSF3，不依赖任何打包器专有语法，也不依赖 Storybook 的内部对象。
- 每个替换都直接换成当前维护中的最新方案，不保留兼容层：不加 legacy 参数，不加 webpack 兼容插件，不保留全局的版本强制。
- 测试覆盖只增不减：26 个 play 断言等价迁移，另外 111 个 story 从空跑变成真实渲染。

**Non-Goals:**
- 不改变 react-moveable 等库的源码和运行时行为。react-moveable 和 helper 升级 TS 后，产物要与基线一致或差异可以解释；其余包的 TS 版本不变，产物应逐字节一致。
- 不升级 React（仍为 16），不升级各框架包装的依赖（vue3 和 svelte 仍用各自现在的 TS 和 Vite），不替换库的构建工具，也不改 lint。这些都属于 proposal 列出的后续 change。
- 不迁移到 CSF Next / `.test()`（理由见决策 3）。
- 不修改 croffle 的转译规则，不 fork croffle。

## Decisions

### 1. 用 Storybook 10 + `@storybook/react-vite` + Vite 8
选 Vite builder 的理由：它是 SB7 起 React 项目的默认推荐；vue3-moveable 和 svelte-moveable 本来就用 Vite；而且 `@storybook/addon-vitest` 只支持 Vite 系的 framework。Vite 版本选当前最新的 8.x，配套 `@vitejs/plugin-react` 6.x。

Vite 8 的转译从 esbuild 换成了 oxc，所以要确认两件事：装饰器（`@withMethods`）在 oxc 下仍按 `experimentalDecorators` 的语义转译；类字段仍按 `useDefineForClassFields: false` 的语义处理。Vite 对每个文件使用「离它最近、且 include 匹配到它」的 tsconfig 读取这些选项，所以 `src/` 必须仍被 `tsconfig.json` 的 include 覆盖（见决策 7）。这两点在搭骨架时用会调用 Moveable 方法的 story 实测（tasks 3.2）。

React 16.14.0 已经带有 `react/jsx-runtime`，满足 plugin-react 的要求；`@storybook/react` 10 通过 react-dom-shim 在 React 16 下使用 `ReactDOM.render`。docgen 产出对这些 App 组件没有用（props 都是 `Record<string, any>`），关掉（`typescript.reactDocgen: false`）以加快启动。
- 备选方案：webpack5 builder，story 写法基本不用改。弃用原因：只是把迁移 Vite 的工作推迟到以后，而且用不了 Vitest addon。
- 备选方案：Vite 7 + plugin-react 5 + Vitest 4。弃用原因：按「使用当前维护的最新版本」的原则，不选上一代组合。

### 2. 交互测试用 `@storybook/addon-vitest` + Vitest 5，删除 test-runner
每个 story 由 `storybookTest` 插件转成一个 Vitest 测试，在浏览器模式（Playwright 驱动的 chromium）下运行：先完整渲染，有 play 就再执行 play。测试不再需要「先构建 Storybook，再起 http-server，再等端口就绪」，所以 http-server、concurrently、wait-on 都删掉。`vitest` 和 `@vitest/browser-playwright` 精确锁定为同一个版本。

需要显式设置的配置：
- **失败截图**：addon-vitest 在没有显式设置时会把 `browser.screenshotFailures` 设成 `false`；即使打开，默认也会写到每个测试文件（也就是每个 story 文件）旁边的 `__screenshots__`。所以显式设置 `screenshotFailures: true`，并用 `screenshotDirectory` 统一输出到 `packages/react-moveable/.vitest-screenshots/`。这个目录加入 `.gitignore`，CI 按这个固定路径上传。
- **视口**：test-runner 用 Playwright 默认的 1280×720；addon-vitest 在没有设置 viewport 参数时固定用 1200×900。依赖布局的断言可能因此变化，所以显式固定为 1280×720。

Vitest 配置按包分开，各自声明自己的依赖，符合「依赖显式声明」：
- `packages/react-moveable/vitest.config.ts`：story 测试（浏览器模式）+ code-preview 拼接逻辑的单元测试（node 环境）；
- `packages/helper/vitest.config.ts`：helper 的单元测试（DOM 环境，选 happy-dom 或 jsdom 中当前维护更活跃的一个）；
- 根目录 `vitest.config.ts` 只写 `test.projects: ["packages/*/vitest.config.ts"]`，根目录只声明 `vitest`。

原来那套「失败后再构建一次原始 Storybook 截图对比」的流程，也就是 `test:fail*` 脚本和 `test-runner.js` 的 `postRender`，一并删除。
- 备选方案：继续用 test-runner 0.26。弃用原因：SB10 主推的是 Vitest addon；test-runner 需要额外的静态构建和服务进程；它的失败截图也要靠我们自己写的 `postRender` 维护。

### 3. story 用 CSF3，不用 CSF Next
CSF Next 在 SB10 中仍是 preview 状态，它的 `.test()` 还是 experimental。CSF3 到 CSF Next 有官方 codemod，等它稳定后可以自动迁移。

每个 story 文件的形态：
```
import ReactDraggableApp from "./ReactDraggableApp";
const sources = import.meta.glob("./{*App.tsx,script/**,vue3/**,svelte/**,lit/**}",
                                 { query: "?raw", import: "default", eager: true });
const apps = import.meta.glob("./*App.tsx", { eager: true });
export default { title: "Basic" } satisfies Meta;
export const BasicDraggable = {
    name: "Draggable",                   // 字面量，供索引器静态读取
    ...appStory(ReactDraggableApp, { apps, sources, argTypes: DEFAULT_DRAGGABLE_CONTROLS }),
    play: devPlay(async ({ canvasElement }) => { ... }),
} satisfies Story;
```
索引器只从 story 对象的**直接属性**中读取字符串字面量形式的 `name` 和 `tags`。对象展开里的 `render`、`args`、`argTypes`、`parameters` 会被索引器忽略，但运行时正常生效。`play: devPlay(...)` 仍会被识别为带 play，并打上 `play-fn` tag。story 的 export 名保持不变，所以 story id（例如 `basic--basic-draggable`）也不变，可以和基线逐条对照；侧边栏的显示名也和现在一样。

`args` 的 bug 在这里按正确方式修复：`appStory` 用 `{ ...defaults, ...args }` 合并参数。所以 `Scalable keepRatio Test` 改为真正以 `keepRatio: true` 运行。这是**有意的偏离**；如果因此导致断言失败，要报告给用户，而不是改回 bug 的行为。

### 4. 源码在每个 story 文件中用本目录的 `import.meta.glob` 读取，由组件反查路径
每个 story 文件对**自己所在的目录**做两次 eager glob（见决策 3 的示例），把结果交给 `appStory()`。`appStory()` 在 `apps` 中按组件对象反查到它的文件，再从 `sources` 中取出 React 源码，以及 croffle 生成的 Script、Vue3、Svelte、Lit 代码，生成 `parameters.preview`。

- 125 处 `require.resolve` 直接删掉，不需要换成手写的路径字符串，组件本身就是唯一的信息来源。
- glob 只取本目录的文件，所以每个 story 文件只加载自己用到的源码；生成的代码也随 story 文件分块打包；修改某个 App 时，HMR 只会让对应的 story 文件失效，不会整页刷新。
- 模块是同一个实例：Vite 在开发和构建时都按解析后的 id 去重，所以组件对象可以直接用来比较。
- **缺失时的行为**：React 源码反查失败时直接抛错，避免 tab 静默消失，比如 glob 写成 `React*App.tsx` 就会漏掉 `TreeShakingApp.tsx`。croffle 生成的代码缺失时则跳过对应的 tab，因为按 croffle 的配置，部分 story 本来就不生成某些框架的代码。
- 11 处 `!!raw-loader!`，加上 `stories/templates/default.ts` 里的那一处，都改为 `?raw` import；`global.d.ts` 中的 `!!raw-loader!*` 声明改为 `vite/client` 类型；`.eslintrc` 中的 `import/no-webpack-loader-syntax` 规则不再需要，删除。
- 备选方案：在 `story.tsx` 里对整个 stories 目录做全局 glob。弃用原因：每个 story 文件和每个测试都会加载全部 136 个 App 以及约 1200 个生成文件的源码，HMR 时还会引起整页刷新。

### 5. 用 tags 和 `devPlay` 替代 facade hack
- **测试专用 story**：在 `main.ts` 的 `tags` 中定义自定义 tag `hidden-test`，并设置 `defaultFilterSelection: "exclude"`。不用 `test-only` 这个名字，因为它是 SB10 刚删除的内置 tag，容易让人误会。侧边栏筛选只影响显示；Vitest 默认测试所有带 `test` tag 的 story，而 `test` tag 是自动加在每个 story 上的，所以被隐藏的 story 照常被测试。目前只有 `Scalable keepRatio Test` 需要打这个 tag。
- **`(test)` / `(original)` 两份副本**：直接取消。开发模式下 play 会自动执行，可以在交互面板里看每一步，也可以重新运行。
- **发布构建中 play 不执行**：`devPlay(play)` 在 `import.meta.env.MODE === "production"` 时返回 `undefined`，其余情况照常返回原函数。三种模式下 `MODE` 的取值已经从源码中查到：`storybook dev` 为 `development`，`storybook build` 为 `production`（builder-vite 的 `vite-config.ts`），Vitest 默认为 `test`。搭骨架时还会再实测一次（tasks 3.4）。Storybook 没有「静态构建时不执行 play」的官方开关，这是最小的显式实现。
- 删除 `EXEC_TEST` 和 `SKIP_TEST`。
- 备选方案：给测试专用 story 打 SB 内置的 `!dev` tag。弃用原因：那样在开发模式里也完全看不到，而且没法通过筛选打开。

### 6. 代码 tab 移植为本地 addon
目录 `.storybook/addons/code-preview/` 下的结构：
- `preset.ts`（Node 侧）：导出 `managerEntries`，返回 `fileURLToPath(import.meta.resolve("./manager.tsx"))`。SB10 要求 managerEntries 必须是文件路径，不能直接是 URL。
- `manager.tsx`（浏览器的 manager 侧）：注册一个 panel，用 `storybook/manager-api` 的 `useParameter("preview")` 和 `useArgs()` 读取模板和当前参数，用 `storybook/internal/components` 的 `SyntaxHighlighter` 渲染代码，并提供复制按钮。
- `render.ts`：纯函数，输入模板和参数，输出代码字符串。panel 和单元测试共用这个函数。
- `main.ts` 中通过 `addons: [import.meta.resolve("./addons/code-preview/preset.ts")]` 注册。

manager 运行在 Storybook 自带的 React 18 上，和项目里的 React 16 类型不一致，所以 addon 目录使用独立的 tsconfig 做类型检查，不和 stories 共用。

`parameters.preview` 的数据结构保持不变，所以 `stories/utils.ts` 里的 `convertTemplate` 等函数也不用改。原包的 codesandbox 按钮在现有代码里本来就是注释掉的，不移植；它依赖 `@storybook/addon-knobs` 的部分也不移植。

**怎么测试**：「代码随参数更新」的拼接逻辑由 `render.ts` 的单元测试覆盖。Vitest 只渲染 preview，没有 manager，无法操作 Controls 面板，所以 panel 与 Controls 的联动只做手工验证（tasks 4.3）。
- 备选方案：fork 原包，单独发布。弃用原因：只有这一处使用，单独做一个包反而多一份发布和维护负担。

### 7. 去掉全局 typescript override，各包自己声明 TS 版本
`pnpm-workspace.yaml` 中的 typescript override 是 hoist 时代的产物：它让所有包，连同第三方工具，都必须同时升级。删除它之后：
- react-moveable、helper 声明 `typescript: ~5.9.3`（SB10 的 peer 要求 `>= 4.9`，`moduleResolution: bundler` 要求 TS 5.0+）；
- 其余包（croact、preact、moveable、lit、vue3、svelte）以及根目录继续声明 `^4.8 <4.9`，等各自的升级 change 再处理。这样 vue-tsc 1.8.2 仍然跑在它支持的 TS 4.8 上；
- croffle 按它自己的 `dependencies` 使用 TS 4.5.5。`croffle.config.js` 改为从 croffle 所在目录解析 typescript，与 croffle 共用同一个 TS 实例，否则 `SyntaxKind` 的枚举值会对不上。

stories 的类型检查：新增 `tsconfig.stories.json`，使用 `moduleResolution: bundler`、`types: ["vite/client"]`，配置别名路径，并 exclude 掉 croffle 生成的 `**/{script,vue3,svelte,lit}/**`（`allowJs` 打开时，这些生成的 `.js` 文件会被一起检查）。`tsconfig.json` 去掉对 stories 的 include（`src/` 仍然由它覆盖，见决策 1），并通过 `references` 引用 `tsconfig.stories.json`。新增 `typecheck:stories` 脚本，接入 CI。原来是 fork-ts-checker 在 Storybook 运行时顺带做类型检查，现在这项工作要独立出来。

- 备选方案：全局升级到 TS 5.9，同时升级 vue-tsc 等工具，并 fork croffle 改成 TS 5 API。弃用原因：会把框架包装升级提前拉进来，还要长期维护一个 croffle 的 fork。
- 备选方案 TS 6：会把 `target: es5` 和 `moduleResolution: node` 变成错误。前者会改变发布出去的代码语法，属于产品决定。
- 备选方案 TS 7：原生编译器没有传统的 JS API，typescript-eslint、Storybook 的 docgen 等现在都无法运行。

**验证**：沿用上一个 change 的方法，在 scratchpad 中用 git worktree 构建一份对照产物。react-moveable 和 helper 的产物逐文件比较大小，有差异就用 `diff -w -B` 找出原因；其余包的 TS 版本不变，产物应逐字节一致。bake 的结果（文件清单和内容哈希）也要和基线比较，因为 croffle 的 TS 会从 4.8.4 变成它自己声明的 4.5.5。

### 8. 构建和测试都先执行 bake
`storybook`、`build:storybook` 和测试脚本都先执行 croffle bake，保证 Script / Vue3 / Svelte / Lit 这几个 tab 在 CI 和发布的 demo 中稳定存在，「查看 story 的代码面板」这个场景也就能被测试覆盖到。生成目录仍然在 `.gitignore` 中，不纳入版本管理。

### 9. 其余替换
- `pnpm-workspace.yaml`：删除 7 条 `@storybook/*: ^6.4.22` 和 `@storybook/jest>@storybook/expect` 共 8 条 override。这一步必须在安装 SB10 之前完成（tasks 3.1），否则 SB10 的包会被压回 6.x。
- `main.ts`：设置 `core: { disableTelemetry: true, disableWhatsNewNotifications: true }`，删除 GA addon 和 `manager.js` 中的 GA 配置。
- `storybook-dark-mode` 升级到 5.x；viewport 和 controls 由 SB10 core 提供，`INITIAL_VIEWPORTS` 改从 `storybook/viewport` 导入，配置改为 `viewport.options`；删除 `controls.passArgsFirst`；`addon-docs` 保留。
- readme：`.storybook/readme.ts` 改为生成 `stories/0-Introduction/readme.mdx`（`<Meta title="Introduction" />`）；`.gitignore` 中的 `*.stories.mdx` 改为忽略这个生成文件。
- `preview-head.html`：选择器从 `#docs-root` 改为 `#storybook-docs`。
- `preview.tsx`：storySort 改用 SB10 的索引项签名，按 `importPath` 做数字感知排序，保持现在的顺序。docs page 改用 SB10 的 `Title`、`Primary`、`Controls` 块；原来在副标题位置显示的 story 名，改用一个通过 `useOf("story")` 读取名字的小组件实现，因为 `Subtitle` 块显示的是 `parameters.docs.subtitle`，不是 story 名。
- `@storybook/jest`、`@storybook/testing-library` → `storybook/test`；`stories/utils/testing.tsx` 的手势模拟是标准的 DOM 事件派发，不需要修改。play 中的 `canvasElement` 在 Vitest 下是一个挂在 `document.body` 下的容器，`querySelector` 的用法照旧可用。
- 只在 story 中用到的 daybrush 组件（keycon、react-keycon、react-infinite-viewer、@scena/react-guides）升级到最新版；如果新版不支持 React 16，就停在支持 React 16 的最高版本，并记录原因。react-selecto 是库的运行时依赖，不升级，只删除 devDependencies 中重复的那一条。
- react-moveable 的 `@types/node` 升级到 22（vitest 5 的 peer 要求）。

## Risks / Trade-offs

- [111 个 story 第一次被真实渲染，可能暴露原本就有的渲染错误] → 逐个定位：是迁移造成的就修；原本就有的问题，先报告给用户，经确认后才作为例外，**写进 monorepo-tooling 主 spec 的「CI 跑交互测试」场景**（与上一个 change 登记 rollup 警告例外的做法一致），同时在 `baseline.md` 中记录详细信息。
- [play 在 Vitest 浏览器模式和 test-runner 中的时序不同] → 26 个 play 的断言值保持不变；如果因为时序问题失败，只调整等待方式，不改期望值。
- [修复 `args` 的 bug 后，`Scalable keepRatio Test` 的输入变了] → 这是有意的偏离；断言如果因此失败，报告给用户。
- [Vite 8 / oxc 转译装饰器、类字段的语义与 tsc 不一致] → 搭骨架时用会调用 Moveable 方法的 story 实测（tasks 3.2）。如果不一致，先报告，再决定是加转译配置，还是退到 Vite 7。
- [react-moveable 升到 TS 5.9 后，`@daybrush/builder`（rollup-plugin-typescript2）、`tsc` 生成的 declaration、typescript-eslint 5.60 出问题] → typescript-eslint 5.60 预计只会打印「不受支持的 TS 版本」警告。如果出现真正的报错，先确认原因，再决定是升级对应工具，还是把它提前到构建工具替换的 change。不允许把全局 TS override 加回去。
- [croffle 改用自己的 TS 4.5.5 后，生成的代码与用 TS 4.8.4 时不同] → 与 bake 基线逐文件比较；有差异就逐项确认是否只是格式变化。
- [Storybook 6 在 TS 5.9 下可能跑不起来（ts-loader 8、fork-ts-checker 6 能否兼容 TS 5.9 未知）] → TS 升级这一步以 `packages:build`、`test:type`、`lint`、bake 作为硬验收；SB6 的测试只是尽力验证，失败了就记录原因后放行，因为 SB6 很快就会被替换。
- [本地 code-preview addon 用到的 manager API 以后可能变化] → 只使用公开的 `storybook/manager-api` 和 `storybook/internal/components`；拼接逻辑有单元测试覆盖。
- [Vitest 浏览器模式需要 Playwright 浏览器] → 本地和 CI 都显式执行 `playwright install chromium`，不依赖 postinstall。

## Migration Plan

1. **建立基线**（当前工具链，不改仓库文件）：记录 8 个包的产物清单、137 个 story 的 id、显示名和**实际生效的 args**、26 个 play 的断言清单、bake 产物的清单和内容哈希；准备 worktree 对照产物。
2. **TS 改为按包声明**：删除全局 override，react-moveable 和 helper 升到 5.9.3，croffle 使用自己的 TS，与基线比较产物和 bake 结果。这一步单独提交。
3. **搭建 SB10 + Vite 8 + Vitest 5 骨架**：删除 SB6 的 override 和依赖，安装新依赖，先用一两个 story 跑通，并实测装饰器转译、视口尺寸、截图输出和 `MODE` 的取值。
4. **批量改写 story**：改为 CSF3，重写 `story.tsx`；移植 code-preview addon；迁移 readme、preview、docs page 和样式。
5. **跑通全部测试并比较**：26 个 play 全部通过，137 个 story 都能渲染，新暴露的问题逐个登记。
6. **清理旧依赖和旧脚本**，helper 测试迁到 Vitest，修改 CI 和 CLAUDE.md。

回滚：每一步单独提交。依赖关系是单向的：第 3 步及以后依赖第 2 步，因为 SB10 需要 TS 5。所以可以只回滚第 3 到 6 步、保留第 2 步，但不能在保留第 3 到 6 步的同时单独回滚第 2 步。
