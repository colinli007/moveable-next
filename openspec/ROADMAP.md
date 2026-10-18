# 路线图

目标：把 daybrush/moveable 的 fork 现代化到可长期维护，最终以 `@moveable-next` 作用域发布。原则是**替换老的配置和不再维护的包，而不是在老版本上打补丁**。Node 固定为 22.20.0，pnpm 固定为 11.28.2。

每一步对应一个 OpenSpec change，按顺序进行：前面的步骤会为后面的步骤提供安全网（测试）或基础（工具链）。完成一步后在这里更新状态和 change 名。

| # | 步骤 | 状态 | change |
|---|---|---|---|
| 1 | 迁移到 pnpm workspace，Node 22 | 已完成 | `archive/2026-10-11-migrate-to-pnpm-monorepo` |
| 2 | Storybook 10 + Vite 8，测试改为 Vitest 5 | 已完成 | `archive/2026-10-11-upgrade-storybook-10-vitest` |
| 3 | 库构建工具替换 | 已完成 | `archive/2026-10-12-replace-build-with-tsdown`，`archive/2026-10-13-migrate-eslint-flat-config` |
| 4 | 框架包装升级与依赖升级 | 已完成 | `archive/2026-10-13-upgrade-lit-3`、`archive/2026-10-15-migrate-vue3-to-tsdown`、`archive/2026-10-16-upgrade-svelte-5`、`archive/2026-10-18-bump-dependencies` |
| 5 | 文档与部署 | 进行中 | `archive/2026-10-18-deploy-demo-with-actions`、`archive/2026-10-18-replace-jsdoc-with-typedoc`、`archive/2026-10-18-remove-croffle-examples` |
| 6 | 以 `@moveable-next` 发布 | 进行中 | `archive/2026-10-18-remove-preact-lit-svelte-packages` |
| 7 | Storybook 加入 Vue3 示例 | 未开始 | |

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

## 待进行

### 5. 文档与部署
拆成 3 个 change，依次是：`deploy-demo-with-actions`（发布通道）、TypeDoc、删除 croffle 生成的示例。三个 change 都已完成，剩下开启 GitHub Pages 后的发布步骤（见第一项）。

- demo 站点发布：`deploy-demo-with-actions` 把 `pnpm deploy`（gh-pages 2 本地推送 gh-pages 分支）换成 GitHub Actions 手动发布到 GitHub Pages，删除 gh-pages 依赖，站点只保留 `release/latest/`。仓库目前是私有的，开不了 Pages，只验证了构建和上传。开启 Pages 后（仓库公开或开通 Pro）还要做：把这些提交合并到 `main`；Settings → Pages 的 Source 选「GitHub Actions」；在 Actions 中手动运行 `Deploy demo`；检查站点（落地页、Storybook、`release/latest/doc/`、dist）；在 Settings → Environments 中确认 `github-pages` 环境只允许 `main` 部署。
- API 文档：`replace-jsdoc-with-typedoc` 把 `@daybrush/jsdoc` 换成 TypeDoc 0.28（`typedoc.json` + `config/typedoc/`，警告视为错误，CI 中执行）。源码注释改为挂在声明上的 TSDoc：jsdoc 的结构标签全部移除；128 段读不到的选项和事件说明移到 `XxxOptions` / `XxxEvents` 上；方法说明移到 `MoveableInterface`；接口按 able 用 `@category` 分组。`MoveableProperties` 改为同态映射，让 `Moveable` 类页面带上说明。文档和 Storybook 之间的链接改为站内相对链接。
- 示例代码：原计划是改 croffle 的输出，让生成的 Svelte 示例使用 Svelte 5 写法。调研发现生成的示例没有任何检查：用各框架的编译器检查，Svelte 133 个中 3 个编译失败、Vue3 1 个、Lit 1 个、Script 2 个；用到 svelte-selecto、svelte-infinite-viewer（只支持 Svelte 3）的 6 个 Svelte 示例在 Svelte 5 下运行时一定出错；croffle 本身 2023 年 6 月后停更，仓库已无法访问。`remove-croffle-examples` 因此删除 croffle 和 Script / Vue3 / Svelte / Lit 四个代码 tab，只保留 React 和 CSS：React tab 就是被渲染、被测试的 App 源码，删除前后 137 个 story 的 React tab 逐字相同；CSS tab 补上 App import 的样式文件（`snap.css`、`safari.css`）。croffle 带来的 TypeScript 4.5.5、glob 8、inflight 随之移除，仓库中不再有已弃用的依赖，TypeScript 只剩一个版本，`storybook`、`test`、`build:storybook` 不再先执行 bake。svelte-moveable 去掉 `on:` 指令（`createEventDispatcher`），事件只用回调 prop；原来按生成示例写法的测试改为测试 runes 组件中 `bind:this` 得到的引用。

### 6. 以 `@moveable-next` 发布
- 精简包的范围：`remove-preact-lit-svelte-packages` 删除 preact-moveable、lit-moveable、svelte-moveable，只支持 React、原生 JS 和 Vue 3（上游一周下载量：preact 201、lit 31、svelte 843，react 30.6 万、原生 4.9 万、vue3 7114）。仓库剩下 react-moveable、croact-moveable、moveable、vue3-moveable、@moveable/helper 5 个包；只为这三个包存在的依赖（preact、preact-css-styled、lit、svelte 及其工具链）和 preact-css-styled 的 `packageExtensions` 一并删除，`vite` 只剩 react-moveable 使用，移出 catalog。剩下 5 个包的产物逐字节不变。后面各项只需覆盖这 5 个包。
- 包名改为 `@moveable-next/*`，补齐 `exports`。
- 确定 React peer 范围（当前 story 和测试仍用 React 16，是库支持的最低版本），同时决定开发依赖是否升到 React 19 和 @types/react、@types/react-dom 19。
- 引入 changesets 管理版本和发布。
- Storybook React tab 中的包名（`convertPath` 把内部路径换成 `react-moveable`）随包名一起修改。

### 7. Storybook 加入 Vue3 示例
第 5 步删除了 croffle 翻译生成的多框架示例。以后加入 Vue3 示例时，要满足「展示的代码经过测试」：示例要在测试中真实渲染（或至少经过 Vue 编译器检查并挂载），不能再是没有检查的翻译结果。具体方式由那个 change 设计。

## 已知遗留
- react-keycon 0.3.0 的依赖声明会装出两份 `@cfcs/core`，目前用 `pnpm-workspace.yaml` 中限定范围的 override 让它们共用一份；上游修复后可删除。
- eslint-plugin-react 7.37.5 的 peer 范围还不包含 ESLint 10，`pnpm-workspace.yaml` 中用 `peerDependencyRules.allowedVersions` 只对它放行；它的推荐集在 ESLint 10 下能正常运行，但推荐集以外有规则（如 `jsx-filename-extension`、`forward-ref-uses-ref`）调用了 ESLint 10 已删除的 API，所以配置只启用推荐集，额外启用 react 规则前要先确认它在 ESLint 10 下能运行。上游发布支持 ESLint 10 的版本后删除放行。
- typescript-eslint 8 支持的 TypeScript 是 `<6.1`，以后升级到 TS 7 需要等它支持（npm 上已有 7.0.2）。
- origin 上的 gh-pages 分支（上游 2023 年的内容，加上一次误操作推送的提交）已经不再使用：Pages 的来源是 Actions。是否删除由用户决定。
- 落地页（`demo/index.html` 等，上游预先构建好的页面，源码不在仓库中）和 README 中的链接都指向上游的 `daybrush.com`，随第 6 步的包名、站点地址一起调整。
- Storybook 控件说明中的「See API」是指向同一站点 `release/latest/doc/` 的相对链接，单独运行 `pnpm storybook` 开发时会是 404，部署后和本地 `demo/` 中可用。
- README 中「Contribute」链接的 `CONTRIBUTING.md` 不存在（API 文档首页也会显示这个链接）；TypeDoc 关掉了相对路径检查（`validation.invalidPath`，为了指向 Storybook 的相对链接），所以不会报警。
- Storybook 10 在 React 16 下测试时会打印 `act(...)` 警告，不影响结果；升级 React 后会消失。
