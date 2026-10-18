## Context

动机见 proposal.md。和实现有关的现状：

- 三个包都处在依赖链的末端，仓库中没有其他包依赖它们：preact-moveable 内联 react-moveable 的产物；lit-moveable、svelte-moveable 包装原生 moveable。所以删掉它们不会改变剩下 5 个包的源码和构建输入。
- 根目录 `vitest.config.mts` 用 `packages/*/vitest.config.mts` 汇总各包的测试，`config/check-dependency-ranges.mjs` 遍历 `packages/*/package.json`，`pnpm -r build` 按工作区拓扑构建。这三处都按目录发现包，删除目录后不需要再改。
- `eslint.config.mjs` 的 `files` 中显式列出了包名（包括 svelte-moveable 的 `src/**/*.ts`）。
- `pnpm-workspace.yaml`：`packageExtensions` 给 preact-css-styled 补 preact 的 peer 声明，只为 preact-moveable 存在。catalog 中的依赖删除这三个包后仍至少有两个包使用，只有 `vite` 例外：删除后只剩 react-moveable 使用（svelte-moveable 是另一个使用者）。
- `config/testing/browser.ts` 由 lit-moveable 和 vue3-moveable 的测试共用；`react-moveable/types` 子路径除了 preact-moveable，moveable 也在使用。
- 剩下的文字引用：根目录和 `packages/moveable` 的 README（徽章、包介绍）、`handbook/handbook.md`（Preact 注释、Svelte 示例）、两个 `package.json` 的 `preact` 关键词、`.editorconfig` 的 `[*.svelte]`、`run-e2e.yml` 中描述 lint 范围的注释、`react-moveable/tsdown.config.mts` 的一条注释、`CLAUDE.md`。`demo/` 中上游预先构建的落地页和 `CHANGELOG-1.0.0.md` 也提到这些框架。

## Goals / Non-Goals

**Goals:**
- 仓库中不再有这三个包的代码、依赖和配置，文档不再把它们当作支持的框架。
- 剩下 5 个包的构建产物和测试结果不变。

**Non-Goals:**
- 不改上游预先构建的 `demo/` 落地页和历史 CHANGELOG。
- 不处理 npm 上的上游同名包（不属于本仓库）。

## Decisions

### 直接删除，不做弃用过渡

这三个包从来没有以 moveable-next 的名义发布过，仓库里也没有其他包依赖它们。弃用过渡（保留代码、标记 deprecated）只对已有用户有意义，这里没有用户，只会留下要维护的代码。所以整个目录直接删除，git 历史中保留原样。

### `vite` 移出 catalog

按 CLAUDE.md 的规则，只有一个包使用的依赖要写在那个包里。删除后 `vite` 只有 react-moveable 使用，所以从 catalog 移回 react-moveable 的 `package.json`，范围保持 `^8.3.4`。`config/check-dependency-ranges.mjs` 只检查「多个包声明却没用 catalog」，不会发现「catalog 中只剩一个使用者」，所以这一步要手动检查：其余 catalog 依赖删除后都还有至少两个包使用（见 Context）。

### 保留共用的测试辅助文件和类型子路径

`config/testing/browser.ts` 只是去掉了一个使用者（lit-moveable），vue3-moveable 仍在使用；`react-moveable/types` 仍被 moveable 引用。两者都不动，只修改提到已删除包的注释和文档。

### 文档只删除对这三个框架的支持说明

README 删除对应的徽章和包介绍；handbook 删除 Svelte 示例，把「React, Preact Example」改为「React Example」；`CLAUDE.md` 的包依赖链、构建约束、测试说明删掉这三个包相关的段落，例如 preact 的输出改名、lit 的 UMD 平台、svelte-moveable 的测试细节和 `.svelte` 不能写 `enum` 的限制。`demo/` 落地页留给第 6 步，因为它的源码不在仓库中，要整体替换。

### spec 中只针对已删除包的场景用「删除 + 新增」替换

OpenSpec 的 MODIFIED 不能删除场景，同名要求也不能同时删除和新增。`library-build` 中有 3 条要求含有只针对 preact-moveable 或 lit-moveable 的场景，所以用新名字新增：「原生 moveable 的装饰器属性在产物中可用」「croact 包不引用 React」「各包 CJS 产物的导出形状」，除去掉这些场景外，内容不变。其余要求只改文字，用 MODIFIED。`framework-packages` 中的两条框架行为要求直接 REMOVED。`library-build` 的「深路径类型引用」场景原来以 preact-moveable 为例，改为以同样引用 `react-moveable/types` 的 moveable 为例。

## Risks / Trade-offs

- [剩下的包被意外影响] → 实施前后都执行全量构建，对比 5 个包 `dist/` 中每个文件的哈希，应该完全相同；测试数应该恰好减少这两个包原有的用例数（lit-moveable 5 个、svelte-moveable 8 个）。
- [锁文件中残留间接依赖] → `pnpm install` 后用 `pnpm why` 确认 preact、lit、svelte 及其独有的依赖都已不在锁文件中。

## Migration Plan

都是仓库内部的改动，没有部署步骤；回滚只需还原提交并重新 `pnpm install`。本地残留的 `node_modules`（这三个包目录下的）随目录一起删除。
