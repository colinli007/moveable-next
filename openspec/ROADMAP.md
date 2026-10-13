# 路线图

目标：把 daybrush/moveable 的 fork 现代化到可长期维护，最终以 `@moveable-next` 作用域发布。原则是**替换老的配置和不再维护的包，而不是在老版本上打补丁**。Node 固定为 22.20.0，pnpm 固定为 11.28.2。

每一步对应一个 OpenSpec change，按顺序进行：前面的步骤会为后面的步骤提供安全网（测试）或基础（工具链）。完成一步后在这里更新状态和 change 名。

| # | 步骤 | 状态 | change |
|---|---|---|---|
| 1 | 迁移到 pnpm workspace，Node 22 | 已完成 | `archive/2026-10-11-migrate-to-pnpm-monorepo` |
| 2 | Storybook 10 + Vite 8，测试改为 Vitest 5 | 已完成 | `archive/2026-10-11-upgrade-storybook-10-vitest` |
| 3 | 库构建工具替换 | 已完成 | `archive/2026-10-12-replace-build-with-tsdown`，`migrate-eslint-flat-config` |
| 4 | 框架包装升级 | 未开始 | |
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

## 待进行

### 4. 框架包装升级
- Vue 工具链（vue-tsc 1.8 依赖 TS 4.x，需要随 TS 一起升级）。
- Svelte 5 / SvelteKit。
- Lit 3。
- 这些包目前仍声明 TS `^4.8 <4.9`，在这一步各自升级（svelte-moveable 依赖的 `svelte2tsx` 0.6.16 要求 TS `^4.9.4`，`pnpm install` 会报这一条 unmet peer）。

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
