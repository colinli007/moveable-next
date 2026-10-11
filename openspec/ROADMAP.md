# 路线图

目标：把 daybrush/moveable 的 fork 现代化到可长期维护，最终以 `@moveable-next` 作用域发布。原则是**替换老的配置和不再维护的包，而不是在老版本上打补丁**。Node 固定为 22.20.0，pnpm 固定为 11.28.2。

每一步对应一个 OpenSpec change，按顺序进行：前面的步骤会为后面的步骤提供安全网（测试）或基础（工具链）。完成一步后在这里更新状态和 change 名。

| # | 步骤 | 状态 | change |
|---|---|---|---|
| 1 | 迁移到 pnpm workspace，Node 22 | 已完成 | `archive/2026-10-11-migrate-to-pnpm-monorepo` |
| 2 | Storybook 10 + Vite 8，测试改为 Vitest 5 | 已完成 | `archive/2026-10-11-upgrade-storybook-10-vitest` |
| 3 | 库构建工具替换 | 未开始 | |
| 4 | 框架包装升级 | 未开始 | |
| 5 | 文档与部署 | 未开始 | |
| 6 | 以 `@moveable-next` 发布 | 未开始 | |

## 已完成

### 1. 迁移到 pnpm workspace
yarn 1 + lerna + Node 16 换成 pnpm workspace（严格布局，不开 hoist）+ Node 22.20.0；删除 vue-moveable（Vue 2）、ngx-moveable（Angular）、snappable 和根目录的 storybook 包。

### 2. Storybook 10 + Vitest
Storybook 6.5 + webpack 4 换成 Storybook 10 + Vite 8；`@storybook/test-runner` 换成 `@storybook/addon-vitest`（Vitest 5 浏览器模式），137 个 story 全部真实渲染并作为测试，26 个 play 断言不变；story 改写为 CSF3；代码 tab 移植为本地 addon；helper 测试改为 Vitest；删除全局 TypeScript override，改为各包自己声明（react-moveable、helper 用 5.9，其余包仍是 4.8）。

## 待进行

### 3. 库构建工具替换
- 用 Vite 库模式替换 `@daybrush/builder` 和各个 rollup 插件（包括 croact 的 `rollup-plugin-react-compat`、moveable 的 `resolveOwnCroactPlugin`）。
- lint 改为 ESLint 10 flat config + typescript-eslint 8。
- TypeScript 升到 6：需要处理 `target: es5` 和 `moduleResolution: node`（TS 6 中已报错）。修改 `target` 会改变发布产物的语法，属于产品决定。
- 产物与当前基线逐文件比较，差异逐项说明。

### 4. 框架包装升级
- Vue 工具链（vue-tsc 1.8 依赖 TS 4.x，需要随 TS 一起升级）。
- Svelte 5 / SvelteKit。
- Lit 3。
- 这些包目前仍声明 TS `^4.8 <4.9`，在这一步各自升级。

### 5. 文档与部署
- TypeDoc 替换 `@daybrush/jsdoc`。
- gh-pages 升级，demo 部署流程整理。

### 6. 以 `@moveable-next` 发布
- 包名改为 `@moveable-next/*`，补齐 `exports`。
- 确定 React peer 范围（当前 story 和测试仍用 React 16，是库支持的最低版本）。
- 引入 changesets 管理版本和发布。

## 已知遗留
- croffle 0.0.21 依赖 TS 4.5，只能处理 TS 4 的 AST；如果以后要升级或替换 croffle，需要单独评估。
- react-keycon 0.3.0 的依赖声明会装出两份 `@cfcs/core`，目前用 `pnpm-workspace.yaml` 中限定范围的 override 让它们共用一份；上游修复后可删除。
- Storybook 10 在 React 16 下测试时会打印 `act(...)` 警告，不影响结果；升级 React 后会消失。
