# 路线图

目标：把 daybrush/moveable 的 fork 现代化到可长期维护，最终以 `@moveable-next` 作用域发布。原则是**替换老的配置和不再维护的包，而不是在老版本上打补丁**。Node 固定为 22.20.0，pnpm 固定为 11.28.2。

每一步对应一个 OpenSpec change，按顺序进行：前面的步骤会为后面的步骤提供安全网（测试）或基础（工具链）。完成一步后在这里更新状态和 change 名。

| # | 步骤 | 状态 | change |
|---|---|---|---|
| 1 | 迁移到 pnpm workspace，Node 22 | 已完成 | `archive/2026-10-11-migrate-to-pnpm-monorepo` |
| 2 | Storybook 10 + Vite 8，测试改为 Vitest 5 | 已完成 | `archive/2026-10-11-upgrade-storybook-10-vitest` |
| 3 | 库构建工具替换 | 已完成 | `archive/2026-10-12-replace-build-with-tsdown`，`archive/2026-10-13-migrate-eslint-flat-config` |
| 4 | 框架包装升级与依赖升级 | 已完成 | `archive/2026-10-13-upgrade-lit-3`、`archive/2026-10-15-migrate-vue3-to-tsdown`、`archive/2026-10-16-upgrade-svelte-5`、`archive/2026-10-18-bump-dependencies` |
| 5 | 文档与部署 | 已完成 | `archive/2026-10-18-deploy-demo-with-actions`、`archive/2026-10-18-replace-jsdoc-with-typedoc`、`archive/2026-10-18-remove-croffle-examples` |
| 6 | 以 `@moveable-next` 发布 | 已完成 | `archive/2026-10-18-remove-preact-lit-svelte-packages`、`archive/2026-10-18-rename-to-moveable-next-scope`、`archive/2026-10-18-upgrade-react-19`、`archive/2026-10-27-prepare-first-release` |
| 7 | Storybook 加入 Vue3 示例 | 已完成 | `archive/2026-10-28-add-vue3-storybook-examples` |
| 8 | 原生版在单目标和组之间切换时删除旧的控制框 | 已完成 | `archive/2026-10-28-fix-vanilla-root-switch-leak` |
| 9 | 原生版和 Vue 3 版的 `makeMoveable` | 已完成 | `add-make-moveable-to-vanilla-and-vue`（归档时改为归档路径） |

## 已完成

### 1. 迁移到 pnpm workspace
yarn 1 + lerna + Node 16 换成 pnpm workspace（严格布局，不开 hoist）+ Node 22.20.0；删除 vue-moveable（Vue 2）、ngx-moveable（Angular）、snappable 和根目录的 storybook 包。

### 2. Storybook 10 + Vitest
Storybook 6.5 + webpack 4 换成 Storybook 10 + Vite 8；`@storybook/test-runner` 换成 `@storybook/addon-vitest`（Vitest 5 浏览器模式），137 个 story 全部真实渲染并作为测试，26 个 play 断言不变；story 改写为 CSF3；代码 tab 移植为本地 addon；helper 测试改为 Vitest；删除全局 TypeScript override，改为各包自己声明（react-moveable、helper 用 5.9，其余包仍是 4.8）。

### 3. 库构建工具替换
`replace-build-with-tsdown`：react-moveable、croact、preact、moveable、lit、helper 6 个包的 `@daybrush/builder` 和各个 rollup 插件换成 tsdown（每包一份 `tsdown.config.mts`，共用选项在 `config/build.mjs`），TypeScript 升到 6.0；产物语法目标从 ES5 改为 ES2022（`useDefineForClassFields: false`），产物文件名、CJS 形状、UMD 全局名、`declaration/` 结构不变，用结构对比和浏览器实测验证；ESM/CJS 设 `deps.onlyBundle: []`，补齐了产物实际 import 的依赖声明；删除 preact、lit 的 rollup demo；CI 在测试前执行 `pnpm packages:build`。

`migrate-eslint-flat-config`：ESLint 7 + typescript-eslint 5 的 `.eslintrc`（react-moveable、helper 各一份）换成根目录一份 `eslint.config.mjs`（ESLint 10 flat config + typescript-eslint 8），依赖只在根目录声明，根目录 TypeScript 升到 6.0；检查范围扩大到 6 个库包的 `src`（croact、preact、moveable、lit 第一次被检查）；格式规则等价迁移到 `@stylistic/eslint-plugin`；修正新规则发现的 48 处问题（主要是 38 处无用赋值），不改变行为；lint 从各包的 `build` 中拿出来，CI 增加单独的 Lint 步骤；删除 croact、preact 废弃的 `tslint.json` 和未使用的 `eslint-plugin-import`。

### 4. 框架包装升级与依赖升级
`upgrade-lit-3`：lit-moveable 升到 Lit 3，lit 改为 peerDependency（`^3.0.0`），tsdown 自动把它作为外部模块，删除 `neverBundle`；产物除 UMD 内联的 lit 版本外与升级前一致。新增第一组框架包装的浏览器测试（Vitest 浏览器模式，针对 `dist`，由根目录 `pnpm test` 执行），先在 Lit 2 上通过再升级；修正 `litDraggable` 在首次渲染后修改不生效的 bug；README 示例改为可运行。

`migrate-vue3-to-tsdown`：vue3-moveable 的 SFC 改为普通 `.ts` 加渲染函数，构建从 Vite 4 换成 tsdown + tsc，删除 vue-tsc、vite-plugin-dts、Vite 演示页面；Vue 升到 3.5 并改为 peerDependency（`^3.5.0`），TS 升到 6.0；导出、外部模块、CJS 形状与迁移前一致，`require("vue3-moveable")` 从报错变为可用。新增浏览器测试（`createApp` + `h`，与 lit 共用 `config/testing/browser.ts`）和类型测试（在 `build` 最后执行），两者都先在迁移前的 Vite 产物上通过；vue3-moveable 纳入 lint。

`upgrade-svelte-5`：svelte-moveable 升到 Svelte 5，svelte 改为 peerDependency（`^5.0.0`）。组件改写为 runes 模式加 TS；Svelte 5 的组件是函数，原来挂在原型上的方法失效，改由 `index.ts` 中的包装组件补到组件引用上（服务端渲染时跳过）；`on:` 指令为了 Storybook 生成的示例保留。构建去掉 SvelteKit、演示应用和 Vite 4，改为 svelte-check + svelte-package + publint，类型声明从源码生成；TS 升到 6.0，仓库中不再有 TS 4.8。新增浏览器测试、服务端渲染测试和 svelte-check 类型测试，先在旧组件上运行（只有方法相关的测试和卸载时的 unhandled rejection 失败），改写后全部通过；svelte-moveable 纳入 lint。

`bump-dependencies`：依赖升到最新。删除 20 个未使用的依赖声明，例如 @babel/core、keycon 0.3、各子包的 gh-pages、根目录的 tslib、helper 的 React 全家、3 个包的 `@types/node`。overrides 去掉 14 条从 yarn `resolutions` 迁来的去重条目，剩下的 3 项覆盖都写明理由和删除条件，并逐条验证仍然起作用。被两个及以上包声明的 19 个依赖改由 `pnpm-workspace.yaml` 的 catalog 统一声明，`pnpm lint` 中加入重复范围检查。补丁和小版本统一升级后，连同 node_modules 删除锁文件重新解析：yarn 时代残留的 jsdom 11 等被清掉，已弃用警告从 12 个降到 3 个，锁文件从 8430 行减到 6834 行。大版本只升了 happy-dom 21；React 19、preact 11、gh-pages 6、TypeScript 7 暂缓，`@types/node` 保持 22.x，与运行时一致。每一步都执行全量检查，产物结构和 bake 输出都与升级前一致。

### 5. 文档与部署
拆成 3 个 change，依次是：`deploy-demo-with-actions`（发布通道）、TypeDoc、删除 croffle 生成的示例。

- demo 站点发布：`deploy-demo-with-actions` 把 `pnpm deploy`（gh-pages 2 本地推送 gh-pages 分支）换成 GitHub Actions 手动发布到 GitHub Pages，删除 gh-pages 依赖，站点只保留 `release/latest/`。2026-10-21 仓库改为公开后上线：`refactor` 快进合并到 `main`，Pages 的来源设为「GitHub Actions」，`github-pages` 环境只允许 `main` 部署，首次运行 `Deploy demo` 成功。站点是 https://colinli007.github.io/moveable-next/ ，落地页、Storybook（story 正常渲染）、`release/latest/doc/`、moveable 和 helper 的 UMD 都在浏览器中检查过，没有加载失败的资源和脚本错误。
- API 文档：`replace-jsdoc-with-typedoc` 把 `@daybrush/jsdoc` 换成 TypeDoc 0.28（`typedoc.json` + `config/typedoc/`，警告视为错误，CI 中执行）。源码注释改为挂在声明上的 TSDoc：jsdoc 的结构标签全部移除；128 段读不到的选项和事件说明移到 `XxxOptions` / `XxxEvents` 上；方法说明移到 `MoveableInterface`；接口按 able 用 `@category` 分组。`MoveableProperties` 改为同态映射，让 `Moveable` 类页面带上说明。文档和 Storybook 之间的链接改为站内相对链接。
- 示例代码：原计划是改 croffle 的输出，让生成的 Svelte 示例使用 Svelte 5 写法。调研发现生成的示例没有任何检查：用各框架的编译器检查，Svelte 133 个中 3 个编译失败、Vue3 1 个、Lit 1 个、Script 2 个；用到 svelte-selecto、svelte-infinite-viewer（只支持 Svelte 3）的 6 个 Svelte 示例在 Svelte 5 下运行时一定出错；croffle 本身 2023 年 6 月后停更，仓库已无法访问。`remove-croffle-examples` 因此删除 croffle 和 Script / Vue3 / Svelte / Lit 四个代码 tab，只保留 React 和 CSS：React tab 就是被渲染、被测试的 App 源码，删除前后 137 个 story 的 React tab 逐字相同；CSS tab 补上 App import 的样式文件（`snap.css`、`safari.css`）。croffle 带来的 TypeScript 4.5.5、glob 8、inflight 随之移除，仓库中不再有已弃用的依赖，TypeScript 只剩一个版本，`storybook`、`test`、`build:storybook` 不再先执行 bake。svelte-moveable 去掉 `on:` 指令（`createEventDispatcher`），事件只用回调 prop；原来按生成示例写法的测试改为测试 runes 组件中 `bind:this` 得到的引用。

## 待进行

### 6. 以 `@moveable-next` 发布
- 精简包的范围：`remove-preact-lit-svelte-packages` 删除 preact-moveable、lit-moveable、svelte-moveable，只支持 React、原生 JS 和 Vue 3（上游一周下载量：preact 201、lit 31、svelte 843，react 30.6 万、原生 4.9 万、vue3 7114）。仓库剩下 react-moveable、croact-moveable、moveable、vue3-moveable、@moveable/helper 5 个包；只为这三个包存在的依赖（preact、preact-css-styled、lit、svelte 及其工具链）和 preact-css-styled 的 `packageExtensions` 一并删除，`vite` 只剩 react-moveable 使用，移出 catalog。剩下 5 个包的产物逐字节不变。后面各项只需覆盖这 5 个包。
- 包名与入口：`rename-to-moveable-next-scope` 把包名改为 `@moveable-next/react`、`@moveable-next/croact`、`@moveable-next/vanilla`、`@moveable-next/vue3`、`@moveable-next/helper`（目录名不变，CLAUDE.md 和 spec 中有对照表）；包之间的依赖、源码 import、构建中的内联和改名规则、TypeDoc 和 Storybook 的别名、`pnpm --filter` 都改用新包名。每个包增加 `exports`（`types` / `module` → ESM 给打包工具 / `default` → CJS，Node 的 `import` 和 `require` 都走 CJS），`files` 只发布 `dist`、`declaration`、`src`；`repository`、`homepage`、`bugs` 指向本仓库。产物除头部注释、对其他工作区包的 import 名外与改名前一致。Storybook React tab 显示新包名（顺带删除了从未生效的 `convertPath`）；README 的安装命令、import 和 npm 徽章、文档注释中的 142 处示例改为新包名。版本号未动。
- React 版本：`upgrade-react-19` 把开发依赖升到 React 19（`react`、`react-dom`、`@types/react`、`@types/react-dom` 都是 19.x），Storybook 和测试在 React 19 上运行，React 16 下的 `act(...)` 警告随之消失；库源码不需要改，5 个包的产物和类型声明与升级前逐字节相同，只修正了 stories 中 3 个文件的类型写法（全局 `JSX` 命名空间、无参 `useRef`）。`@moveable-next/react` 把 react 声明为 peer（用户决定 `^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0`，16.8 是 react-css-styled 用到 hooks 决定的下限），并标为可选：原生版和 Vue 3 版因为类型声明间接依赖它，不应被装上 React。构建配置中为 react 写的 `neverBundle` 随之删除。
- 首次发布：`prepare-first-release` 先修掉原生版和 Vue 3 版类型声明对 React 类型的依赖（`MOVEABLE_ABLES` 等写出显式类型，moveable 新增类型测试），再用 changesets 管理版本：react、croact、vanilla、vue3 是 fixed 组，helper 独立，版本从 0.1.0 重新开始，上游 CHANGELOG 删除。2026-10-21 维护者在本地发布 5 个包的 0.1.0。之后由 `release.yml` 发布：push 到 `main` 时先跑全部检查，再由 changesets/action 开版本 PR，合并后在 `npm` 环境中用可信发布（OIDC，不保存 token）发布并带 provenance。2026-10-27 用 README 链接改为本站点的改动发布 0.1.1，验证了整个流程。npm 2026-09 之后新建的可信发布配置默认只允许暂存发布、2 天内必须用一次，所以四个 fixed 包勾选了「Allow npm publish」，helper 等它第一次发新版本时再配置。另外新增 `CONTRIBUTING.md`，README 写明 Node ESM 的限制。

### 7. Storybook 加入 Vue3 示例
`add-vue3-storybook-examples`：Storybook 工具栏增加 Framework（React / Vue）切换。每个 story 只定义一次，Vue 模式下渲染同目录手写的 `Vue<Name>App.vue`（SFC，`<script setup lang="ts">`），代码面板随之显示 Vue 和 CSS tab（`.vue` 源码只做三处转换）；play 断言只看 DOM，两种框架共用，Vitest 分为 `storybook-react`、`storybook-vue` 两个 project，测试从 137 个增加到 273 个，CI 中「Run tests」步骤从 12–15 秒变为 23 秒，「Type-check stories」从 4–7 秒变为 8 秒。137 个 story 中 136 个有 Vue 版，共 135 个 Vue 示例（一个 App 被两个 story 共用）；TreeShaking 是唯一的例外（`react-only`，原生版和 Vue 3 版没有 `makeMoveable`）。Vue 示例通过 `@/vue3-moveable` 别名引用 vue3-moveable 的源码（写成 workspace 依赖会和 react-moveable 成环），只在 Vue 模式下懒加载，React 模式仍不需要构建；Vue 模式用原生版的构建产物。类型检查改为 `vue-tsc -p stories`，同时检查 `.ts`、`.tsx` 和 `.vue`。两个 project 的失败截图由 `.storybook/vitest.setup.ts` 按 project 保存（Vitest 内置的截图路径不含 project，会互相覆盖）。vue3-selecto、vue3-infinite-viewer 漏声明 `vue` 和 `@daybrush/utils`，用 `packageExtensions` 补上。

移植过程中修复了 vue3-moveable 没有声明 `emits` 的问题：`@click`、`@drag` 这类与原生事件同名的监听器会同时挂到根元素上，`@click` 会多收到一次原生 `MouseEvent`（patch changeset）。另外发现原生版的一个已有问题（见第 8 步），受影响的「Snap & Bound / Snap Elements (group)」在 Vue 下标为 `vue-known-issue` 并跳过（第 8 步已修复并删除标签）。

### 8. 原生版在单目标和组之间切换时删除旧的控制框
`fix-vanilla-root-switch-leak`：第 7 步中发现原生版每次在单目标、组之间切换都会留下上一个控制框（子节点清空、元素保留），`destroy()` 后也不删除；用选择器指定多个目标时，最初的控制框以 `display: none` 排在最前。根因是 croact 的 self 模式：原生版用 `renderSelf` 把传入的元素当作渲染树的根元素复用，`InitialMoveable` 切换模式时会替换根元素，而 self 模式下被替换的根节点都标为 `_sel`、卸载时不删除。croact 停更且是 peer 依赖，补丁到不了 npm 使用者，所以不改 croact：原生版改为用 `render` 渲染到一个不挂到页面上的根元素，再用 `createPortal` 把 Moveable 放进 `parentElement`，控制框仍是 `parentElement` 的子元素，DOM 结构和坐标都不变。备选的「把传入的元素当作容器、控制框放在里面」经探针验证会让坐标算错（矩阵栈以控制框的父元素为终点）。Vue 3 版的根元素改为 `display: contents` 的挂载点，`container` 默认是组件的父元素（`$el` 不再是控制框，minor）。私有选项 `warpSelf` 删除。`InitialMoveable._updateRefs` 首次渲染不解析选择器的行为保留：根元素能被正确删除后它只是多一次挂载。全量截图对比还发现了上游已有的 bug：设置 `container` 且首次渲染就有目标时，控制框（以及单独分组的每个子控制框）一直是 `visibility: hidden`。可见性要等挂载后再渲染一次，而 `MoveableManager.componentDidMount` 只在没有 `container` 时这样做（2019 年「坐标只算一次」的条件，2022 年加入可见性逻辑时只照顾了没有 `container` 的分支）；Vue 版改为总是传 `container` 后，3 个单独分组的 story 因此空白。修为挂载后总是重新渲染、只在没有 `container` 时补算坐标，React 版设置 `container` 的使用者也一并修好。原生版新增针对产物的浏览器测试，新增一个只为测试存在的 story 断言设置 `container` 时控制框可见；「Snap Elements (group)」的 `vue-known-issue` 标签删除，story 测试 275 个（React 138、Vue 137）全部通过、没有跳过。两处方案都由 Fable 独立评审（选出 portal 写法并指出容器写法的坐标问题；找出 `!container` 条件的来历并给出只补渲染、不重复计算的修法）。

### 9. 原生版和 Vue 3 版的 `makeMoveable`
`add-make-moveable-to-vanilla-and-vue`：排查时发现 React 版的 `makeMoveable` 本身也已经不裁剪：组合 3 个 able 和默认导出体积相同。原因是第 3 步把产物目标改为 ES2022 后，默认 `Moveable` 的静态字段 `defaultAbles` 被编译成 `static {}` 块，打包工具当作副作用，连同全部 able 一起保留（上游 0.56.0 的 ES5 产物能裁剪）；另有 5 处顶层 `makeAble(...)` 和 able 对象字面量中的 `getRenderDirections(...)` 等调用没有标注。修法是 `static get defaultAbles()`，并给 `makeAble`、`getRenderDirections`、`getDirectionViewClassName`、`getDirectionCondition` 的声明加 `/*#__NO_SIDE_EFFECTS__*/`；默认导出仍是 class，类型用法不变（`defaultAbles` 不能再赋值，minor）。原生版新增 `makeMoveable(ables)` 和与 React 版相同的 10 个 able 导出：选项访问器不再由模块顶层的 `@Properties(PROPERTIES)` 按全部 able 生成，改为类的第一个实例创建时按类的 able 生成（`MoveableManager.getAbleInfo()`，名称来自 React 版新增的 `InitialMoveable.getAllAbles()`）；able 写出 `Able<XxxProps>` 类型，避免类型声明引入 React。Vue 3 版的组件改为工厂生成，默认组件是 `/*#__PURE__*/` 的工厂调用，显式导出自己的 `makeMoveable`。为了让 able 能写出 `Able` 类型，修正了 Snappable、Scrollable、Roundable 推断类型与 `Able` 不符的地方。用 rolldown 压缩打包、第三方依赖外部化，只组合 Draggable、Resizable、Rotatable 时：React 105.8KB / 全量 161.0KB，原生版 107.9KB / 163.0KB，Vue 3 版 108.7KB / 163.8KB（都是 0.66）。三个包的构建最后执行 `config/check-tree-shaking.mjs`：断言没有组合的 able 不出现、体积不超过全量的 75%；临时去掉 `getRenderDirections` 的标注时检查会失败（Scalable 被保留），所以不需要另加 esbuild。TreeShaking story 写了 Vue 版，`react-only` 目前没有使用；story 测试 276 个（React 138、Vue 138）全部通过。方案由 Fable 独立评审（排查出全部 4 类原因，并比较了 PURE 工厂、define 语义等写法）。

## 已知遗留
- 只组合一个 able（如 Draggable）时仍有约 77KB 的固定开销：`InitialMoveable.render` 引用 `MoveableGroup`、`MoveableIndividualGroup`，`getTotalAbles()` 总带 Groupable、IndividualGroupable、DragArea，Draggable 等直接 import snap 的辅助函数。要再缩小需要拆分这些结构，需要时单独评估。
- react-keycon 0.3.0 的依赖声明会装出两份 `@cfcs/core`，目前用 `pnpm-workspace.yaml` 中限定范围的 override 让它们共用一份；上游修复后可删除。
- eslint-plugin-react 7.37.5 的 peer 范围还不包含 ESLint 10，`pnpm-workspace.yaml` 中用 `peerDependencyRules.allowedVersions` 只对它放行；它的推荐集在 ESLint 10 下能正常运行，但推荐集以外有规则（如 `jsx-filename-extension`、`forward-ref-uses-ref`）调用了 ESLint 10 已删除的 API，所以配置只启用推荐集，额外启用 react 规则前要先确认它在 ESLint 10 下能运行。上游发布支持 ESLint 10 的版本后删除放行。
- typescript-eslint 8 支持的 TypeScript 是 `<6.1`，以后升级到 TS 7 需要等它支持（npm 上已有 7.0.2）。
- origin 上的 gh-pages 分支（上游 2023 年的内容，加上一次误操作推送的提交）已经不再使用：Pages 的来源是 Actions。是否删除由用户决定。
- 落地页（`demo/index.html` 等，上游预先构建好的页面，源码不在仓库中）中指向上游 `daybrush.com`、`github.com/daybrush/moveable` 的链接还没改，可以改成指向 https://colinli007.github.io/moveable-next/ 。README 中的这类链接已在 `prepare-first-release` 的验证发版（0.1.1）中改为本仓库和站点；指向其它上游项目（scena、selecto、croact）和作者赞助页的链接保留。
- Storybook 控件说明中的「See API」是指向同一站点 `release/latest/doc/` 的相对链接，单独运行 `pnpm storybook` 开发时会是 404，部署后和本地 `demo/` 中可用。
- 测试只在 React 19 上运行：`@moveable-next/react` 的 peer 范围包含 16.8 到 18，这些版本上的行为以升级时产物逐字节不变为依据，以后改动 react-moveable 时不再被测试。需要时加 CI 矩阵。
- 包不支持 Node 原生 ESM 双格式：`exports` 让 Node 的 `import` 和 `require` 都加载 CJS 产物。在 `moduleResolution: node16` 的 ESM 项目中，`import Moveable from "@moveable-next/react"` 的类型与运行时不符（类型是 `export default`，运行时是 CJS 的 `module.exports`）。要彻底解决，需要把 ESM 产物改为 `.mjs` 并提供 `.d.mts` / `.d.cts` 两套声明，需要时单独评估。根 README 和 react、vanilla、vue3 的 README 中已写明这个限制和绕过方法。
- helper 还没有配置可信发布：它第一次发新版本前，维护者在 npmjs.com 上为它添加（与其它包相同，勾选「Allow npm publish」），并在 2 天内由 CI 发布一次。
- 原生版和 Vue 3 版没有导出 `DIRECTIONS`（React 版有），两个 Vue 示例（RotateWithControls、RotateWithResize）在本地写方向数组常量。以后统一考虑原生版缺少的导出时一起处理。
- Storybook 的 Vue 模式用的是原生版的构建产物：要先 `pnpm packages:build`，修改 react-moveable 的源码后也要重新构建才能在 Vue 模式中看到。
- vue3-selecto 1.12.3、vue3-infinite-viewer 0.17.1 没有声明 `vue` 和 `@daybrush/utils`，`pnpm-workspace.yaml` 中用 `packageExtensions` 补上；上游发布修正后删除。
- 首次渲染就用数组目标（`target={[a, b]}`）并开启 `individualGroupable`、不设置 `container` 时会报错：子 manager 在 `componentDidMount` 中调用 `wrapperMoveable.getContainer()`，而外层控制框的 ref 要等子组件挂载完才赋值。React 版、原生版和上游 0.56.0 都是这样，用选择器或在挂载后再设置目标时不受影响。`MoveableIndividualGroup` 传给子 manager 的 `isWrapperMounted` 从未被读取，像是上游没做完的修复；以后单独修。
