## Why

仓库同时维护 8 个包，覆盖 React、Preact、原生 JS、Vue 3、Svelte、Lit 六种用法。每多一个框架包，就多一套构建、测试、类型检查和依赖声明，第 6 步改包名、补 `exports`、定 peer 范围、接入 changesets 时也都要逐个包处理。用户决定 moveable-next 只支持 React、原生 JS 和 Vue 3，不再支持 Preact、Lit 和 Svelte。上游这三个包最近一周的下载量分别是 201、31、843，而 react-moveable 是 30.6 万、moveable（原生）4.9 万、vue3-moveable 7114。

在第 6 步之前删掉这三个包，后面各项工作就只需要覆盖剩下的 5 个包。preact-moveable 原本还要先补运行时测试，才能决定 peer 范围和要不要升级 preact 11，这项工作也不用做了。

## What Changes

- **BREAKING**：删除 `packages/preact-moveable`、`packages/lit-moveable`、`packages/svelte-moveable` 三个包及其源码、测试和构建配置。仓库保留 react-moveable、croact-moveable、moveable（原生）、vue3-moveable 和 @moveable/helper。npm 上已经发布的上游同名包不受影响；moveable-next 从来没有发布过这三个包。
- 依赖：删除只为这三个包存在的依赖，包括 preact、preact-css-styled、lit、svelte、svelte-check、@sveltejs/*、publint。删除 `pnpm-workspace.yaml` 中给 preact-css-styled 补 peer 声明的 `packageExtensions`。删除后只剩一个包使用的 catalog 依赖（`vite`，只有 react-moveable 使用）移回那个包自己的 `package.json`。
- 工具配置：`eslint.config.mjs` 的检查范围去掉这三个包；`.editorconfig` 删除 `*.svelte` 一节；CI 中描述检查范围的注释同步修改。
- 文档：根目录和 `packages/moveable` 的 README 删除 Preact、Lit、Svelte 的徽章和包介绍；`handbook/handbook.md` 删除 Preact、Svelte 示例；根目录和 moveable 的 `package.json` 关键词删除 `preact`；`CLAUDE.md` 的包依赖链、构建、测试说明同步修改；`openspec/ROADMAP.md` 记录本 change，第 6 步删除 preact 相关事项，「已知遗留」删除 preact-css-styled 一条。

不在本次范围：

- `demo/` 中上游预先构建的落地页（其中提到 Svelte 等框架）：源码不在仓库中，随第 6 步的站点调整一起处理。
- `CHANGELOG-1.0.0.md` 等历史记录：保持原样。
- vue3-moveable 的去留：保留。

## Capabilities

### New Capabilities

（无）

### Modified Capabilities

- `framework-packages`：受支持的包集合从 8 个减到 5 个；删除「lit-moveable 的行为」和「svelte-moveable 的组件行为」；框架包装的浏览器测试只覆盖 vue3-moveable。
- `library-build`：产物文件、外部依赖、CJS 导出形状、UMD、类型声明等要求去掉 preact-moveable 和 lit-moveable；「croact 与 preact 包不引用 React」改为只约束 croact-moveable；只针对这两个包的场景删除。
- `monorepo-tooling`：全量构建顺序、代码检查范围、CI 中框架包装测试的要求去掉这三个包。

## Impact

- 删除目录：`packages/preact-moveable`、`packages/lit-moveable`、`packages/svelte-moveable`
- 配置：`pnpm-workspace.yaml`、`pnpm-lock.yaml`、`eslint.config.mjs`、`.editorconfig`、`.github/workflows/run-e2e.yml`（注释）、根目录和 `packages/moveable`、`packages/react-moveable` 的 `package.json`、`packages/react-moveable/tsdown.config.mts`（注释）
- 文档：`README.md`、`packages/moveable/README.md`、`handbook/handbook.md`、`CLAUDE.md`、`openspec/ROADMAP.md`
- 保留：`config/testing/browser.ts`（vue3-moveable 的测试仍在使用）、`react-moveable/types` 子路径（moveable 仍在使用）
- 剩下 5 个包的源码和产物都不变
