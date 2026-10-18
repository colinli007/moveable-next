## 1. 基线

- [x] 1.1 记录改动前的状态，写入本 change 目录的 `baseline.md`：
  - 执行 `pnpm packages:build`，计算 react-moveable、croact-moveable、moveable、vue3-moveable、helper 5 个包 `dist/` 下每个文件的 SHA-256，保存到 scratchpad；
  - `pnpm test` 中各包的用例数；
  - `pnpm why preact preact-css-styled lit svelte -r` 的结果。

  验证：`baseline.md` 中有这三项

## 2. 删除包与依赖（design：直接删除、`vite` 移出 catalog）

- [x] 2.1 删除 `packages/preact-moveable`、`packages/lit-moveable`、`packages/svelte-moveable`（`git rm -r` 删除跟踪的文件，再删除目录中残留的 `node_modules`、`dist`、`declaration` 等未跟踪内容）。验证：`ls packages` 只剩 croact-moveable、helper、moveable、react-moveable、vue3-moveable
- [x] 2.2 `pnpm-workspace.yaml`：删除 preact-css-styled 的 `packageExtensions` 及其注释；`vite` 从 catalog 中删除，在 react-moveable 的 `package.json` 中写成 `^8.3.4`；逐个确认其余 catalog 依赖都还有至少两个包使用；执行 `pnpm install`。验证：
  - `pnpm why preact preact-css-styled lit svelte -r` 没有结果；
  - 锁文件中搜不到 `preact`、`lit-html`、`svelte`；
  - `pnpm install` 没有新的警告；
  - `pnpm lint` 通过（包括依赖范围检查）

## 3. 配置与文档（design：保留共用文件、文档只删除对这三个框架的支持说明）

- [x] 3.1 工具配置：
  - `eslint.config.mjs` 的 `files` 去掉 preact-moveable、lit-moveable，以及 svelte-moveable 的那一项和它的注释；
  - `.editorconfig` 删除 `[*.svelte]` 一节；
  - `.github/workflows/run-e2e.yml` 中描述 lint 范围的注释改为 5 个库包；
  - `packages/react-moveable/tsdown.config.mts` 中提到 preact-moveable 的注释改为只说 croact；
  - 根目录和 `packages/moveable` 的 `package.json` 删除 `preact` 关键词。

  验证：`pnpm lint` 通过；这些文件中搜不到 `preact`、`lit-moveable`、`svelte`
- [x] 3.2 README 和 handbook：根目录 `README.md`、`packages/moveable/README.md` 删除 Preact、Lit、Svelte 的徽章和包介绍；`handbook/handbook.md` 删除 Svelte 示例，「React, Preact Example」改为「React Example」并去掉 preact 注释。验证：这三个文件中搜不到 `preact`、`Preact`、`lit-moveable`、`Lit`（作为框架名）、`svelte`、`Svelte`
- [x] 3.3 `CLAUDE.md`：
  - 仓库概况中的框架列表；
  - TypeScript 一节中的包列表，以及 svelte 的 `<script lang="ts">` 限制；
  - Lint 一节中的检查范围；
  - 常用命令中 `packages:build` 的构建顺序和说明；
  - 测试说明中 lit-moveable、svelte-moveable 的 project 和细节（包括框架包装测试一段中只适用于 lit、svelte 的内容）；
  - 包依赖链图；
  - 构建一节中 preact 的输出改名、lit 的 peer 依赖、UMD 平台等提到这两个包的约束。

  验证：`CLAUDE.md` 中搜不到 `preact`、`lit-moveable`、`Lit`（作为框架名）、`svelte`
- [x] 3.4 `openspec/ROADMAP.md`：表格第 6 步之前记录本 change；第 6 步删除 preact peer 范围和 preact 11 一项；「已知遗留」删除 preact-css-styled 一条。验证：ROADMAP 中除了叙述历史和本 change 的文字，搜不到 preact、lit、svelte 的待办事项

## 4. 全量检查

- [x] 4.1 在根目录依次执行 `pnpm lint`、`pnpm doc`、`pnpm packages:build`、`pnpm test`、`pnpm --filter react-moveable typecheck:stories`、`pnpm build:storybook`，结果写入 `baseline.md`。验证：
  - 全部成功；
  - 5 个包 `dist/` 中每个文件的 SHA-256 与 1.1 完全相同；
  - `pnpm test` 中 react-moveable、vue3-moveable、helper 的用例数与 1.1 相同，lit-moveable、svelte-moveable 的用例不再出现；
  - 仓库中（排除 `openspec/changes/`、`openspec/ROADMAP.md` 的历史叙述、各 CHANGELOG、锁文件和 `demo/`）搜不到 `preact`、`lit-moveable`、`svelte`
