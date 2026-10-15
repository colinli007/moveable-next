# 路线图

目标：把 daybrush/moveable 的 fork 现代化到可长期维护，最终以 `@moveable-next` 作用域发布。原则是**替换老的配置和不再维护的包，而不是在老版本上打补丁**。Node 固定为 22.20.0，pnpm 固定为 11.28.2。

每一步对应一个 OpenSpec change，按顺序进行：前面的步骤会为后面的步骤提供安全网（测试）或基础（工具链）。完成一步后在这里更新状态和 change 名。

| # | 步骤 | 状态 | change |
|---|---|---|---|
| 1 | 迁移到 pnpm workspace，Node 22 | 已完成 | `archive/2026-10-11-migrate-to-pnpm-monorepo` |
| 2 | Storybook 10 + Vite 8，测试改为 Vitest 5 | 已完成 | `archive/2026-10-11-upgrade-storybook-10-vitest` |
| 3 | 库构建工具替换 | 已完成 | `archive/2026-10-12-replace-build-with-tsdown`，`archive/2026-10-13-migrate-eslint-flat-config` |
| 4 | 框架包装升级 | 进行中 | `archive/2026-10-13-upgrade-lit-3`、`archive/2026-10-15-migrate-vue3-to-tsdown`（已完成），`upgrade-svelte-5`、`bump-dependencies`（未开始） |
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

### 4. 框架包装升级（已完成部分）
`upgrade-lit-3`：lit-moveable 升到 Lit 3，lit 改为 peerDependency（`^3.0.0`），tsdown 自动把它作为外部模块，删除 `neverBundle`；产物除 UMD 内联的 lit 版本外与升级前一致。新增第一组框架包装的浏览器测试（Vitest 浏览器模式，针对 `dist`，由根目录 `pnpm test` 执行），先在 Lit 2 上通过再升级；修正 `litDraggable` 在首次渲染后修改不生效的 bug；README 示例改为可运行。

`migrate-vue3-to-tsdown`：vue3-moveable 的 SFC 改为普通 `.ts` 加渲染函数，构建从 Vite 4 换成 tsdown + tsc，删除 vue-tsc、vite-plugin-dts、Vite 演示页面；Vue 升到 3.5 并改为 peerDependency（`^3.5.0`），TS 升到 6.0；导出、外部模块、CJS 形状与迁移前一致，`require("vue3-moveable")` 从报错变为可用。新增浏览器测试（`createApp` + `h`，与 lit 共用 `config/testing/browser.ts`）和类型测试（在 `build` 最后执行），两者都先在迁移前的 Vite 产物上通过；vue3-moveable 纳入 lint。

## 待进行

### 4. 框架包装升级（剩余部分）
按风险从小到大拆成几个 change，已完成 `upgrade-lit-3`、`migrate-vue3-to-tsdown`。框架包装的 change 照它的做法给对应的包加上针对构建产物的浏览器测试（见 `archive/2026-10-13-upgrade-lit-3` 的 design）：
- `upgrade-svelte-5`：Svelte 5 / SvelteKit。现在把方法挂到组件类原型上的做法在 Svelte 5 中失效，需要重新设计方法的暴露方式。svelte-moveable 目前仍声明 TS `^4.8 <4.9`，在这个 change 中升级（它依赖的 `svelte2tsx` 0.6.16 要求 TS `^4.9.4`，`pnpm install` 会报这一条 unmet peer）。
- `bump-dependencies`（排在 `upgrade-svelte-5` 之后）：把全部依赖升到最新，后续开发都基于新版本。先把补丁和小版本统一升到最新，再逐个评估大版本（@babel/core 8、happy-dom 21、@types/node、keycon、preact 11 等），每次升级都跑全量测试，出问题时能定位到是哪个包。
- 暂缓升级、有明确触发条件的两项：React 16 → 19 在第 6 步确定 peer 范围时决定（现在开发和测试用的是库支持的最低版本）；TypeScript 7 要等 typescript-eslint 支持（见「已知遗留」），且 croffle 只能处理 TS 4 的 AST。

### 5. 文档与部署
- TypeDoc 替换 `@daybrush/jsdoc`。
- gh-pages 升级，demo 部署流程整理。

### 6. 以 `@moveable-next` 发布
- 包名改为 `@moveable-next/*`，补齐 `exports`。
- 确定 React peer 范围（当前 story 和测试仍用 React 16，是库支持的最低版本）。
- 引入 changesets 管理版本和发布。

## 已知遗留
- croffle 0.0.21 依赖 TS 4.5，只能处理 TS 4 的 AST；如果以后要升级或替换 croffle，需要单独评估。
- preact-css-styled 1.1.9 import 了 `preact/compat`，但没有声明 preact，严格布局下无法加载；`pnpm-workspace.yaml` 中用 `packageExtensions` 给它补上 preact 的 peer 声明，上游修复后可删除。
- react-keycon 0.3.0 的依赖声明会装出两份 `@cfcs/core`，目前用 `pnpm-workspace.yaml` 中限定范围的 override 让它们共用一份；上游修复后可删除。
- eslint-plugin-react 7.37.5 的 peer 范围还不包含 ESLint 10，`pnpm-workspace.yaml` 中用 `peerDependencyRules.allowedVersions` 只对它放行；它的推荐集在 ESLint 10 下能正常运行，但推荐集以外有规则（如 `jsx-filename-extension`、`forward-ref-uses-ref`）调用了 ESLint 10 已删除的 API，所以配置只启用推荐集，额外启用 react 规则前要先确认它在 ESLint 10 下能运行。上游发布支持 ESLint 10 的版本后删除放行。
- typescript-eslint 8 支持的 TypeScript 是 `<6.1`，以后升级到 TS 7 需要等它支持。
- Storybook 10 在 React 16 下测试时会打印 `act(...)` 警告，不影响结果；升级 React 后会消失。
