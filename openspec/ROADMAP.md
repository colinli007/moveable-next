# 路线图

目标：把 daybrush/moveable 的 fork 现代化到可长期维护，最终以 `@moveable-next` 作用域发布。原则是**替换老的配置和不再维护的包，而不是在老版本上打补丁**。Node 固定为 22.20.0，pnpm 固定为 11.28.2。

每一步对应一个 OpenSpec change，按顺序进行：前面的步骤会为后面的步骤提供安全网（测试）或基础（工具链）。完成一步后在这里更新状态和 change 名。

| # | 步骤 | 状态 | change |
|---|---|---|---|
| 1 | 迁移到 pnpm workspace，Node 22 | 已完成 | `archive/2026-10-11-migrate-to-pnpm-monorepo` |
| 2 | Storybook 10 + Vite 8，测试改为 Vitest 5 | 已完成 | `archive/2026-10-11-upgrade-storybook-10-vitest` |
| 3 | 库构建工具替换 | 已完成 | `archive/2026-10-12-replace-build-with-tsdown`，`archive/2026-10-13-migrate-eslint-flat-config` |
| 4 | 框架包装升级与依赖升级 | 已完成 | `archive/2026-10-13-upgrade-lit-3`、`archive/2026-10-15-migrate-vue3-to-tsdown`、`archive/2026-10-16-upgrade-svelte-5`、`archive/2026-10-18-bump-dependencies` |
| 5 | 文档与部署 | 未开始 | |
| 6 | 以 `@moveable-next` 发布 | 未开始 | |

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
- TypeDoc 替换 `@daybrush/jsdoc`。
- Storybook 生成的 Svelte 示例改为 Svelte 5 写法（`$state`、`onDrag` 等回调 prop 代替顶层 `let` 和 `on:drag`）：`on:` 是 croffle 的 SvelteWaffle 内部固定输出的，要改 croffle 的输出。同时修复 3 个编译失败的生成示例（两个 `<input>` 写了闭合标签，`ReactSelectoNestedGroupApp` 的 JS 语法错误，见 `upgrade-svelte-5` 的 baseline）。示例改完后，svelte-moveable 去掉对已弃用的 `on:` 指令的支持（`createEventDispatcher`）。
- gh-pages 2 → 6，demo 部署流程整理。gh-pages 2 经 globby 6 依赖已弃用的 glob 7 和 inflight，是 `bump-dependencies` 之后剩下的 3 个已弃用警告中的 2 个；验证要真正推送 gh-pages 分支。

### 6. 以 `@moveable-next` 发布
- 包名改为 `@moveable-next/*`，补齐 `exports`。
- 确定 React peer 范围（当前 story 和测试仍用 React 16，是库支持的最低版本），同时决定开发依赖是否升到 React 19 和 @types/react、@types/react-dom 19。
- 确定 preact peer 范围，同时决定是否升到 preact 11（现在是 10.29.8）。preact-moveable 没有运行时测试，升级前要先补上。
- 引入 changesets 管理版本和发布。

## 已知遗留
- croffle 0.0.21 依赖 TS 4.5，只能处理 TS 4 的 AST；如果以后要升级或替换 croffle，需要单独评估。
- preact-css-styled 1.1.9 import 了 `preact/compat`，但没有声明 preact，从它自己的位置解析不到 preact（pnpm 默认的私有提升会掩盖这个问题，`--config.hoist=false` 时加载失败）；`pnpm-workspace.yaml` 中用 `packageExtensions` 给它补上 preact 的 peer 声明，上游修复后可删除。
- react-keycon 0.3.0 的依赖声明会装出两份 `@cfcs/core`，目前用 `pnpm-workspace.yaml` 中限定范围的 override 让它们共用一份；上游修复后可删除。
- eslint-plugin-react 7.37.5 的 peer 范围还不包含 ESLint 10，`pnpm-workspace.yaml` 中用 `peerDependencyRules.allowedVersions` 只对它放行；它的推荐集在 ESLint 10 下能正常运行，但推荐集以外有规则（如 `jsx-filename-extension`、`forward-ref-uses-ref`）调用了 ESLint 10 已删除的 API，所以配置只启用推荐集，额外启用 react 规则前要先确认它在 ESLint 10 下能运行。上游发布支持 ESLint 10 的版本后删除放行。
- typescript-eslint 8 支持的 TypeScript 是 `<6.1`，以后升级到 TS 7 需要等它支持（npm 上已有 7.0.2）。
- @croffle/bakery 0.0.25 依赖已弃用的 glob 8，是 `bump-dependencies` 之后剩下的已弃用警告之一，随 croffle 一起处理。
- Storybook 10 在 React 16 下测试时会打印 `act(...)` 警告，不影响结果；升级 React 后会消失。
