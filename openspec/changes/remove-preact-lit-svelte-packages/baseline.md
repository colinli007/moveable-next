# 基线与验证记录

## 1.1 改动前的状态

### 保留的 5 个包的产物

`pnpm packages:build` 成功后，计算 react-moveable、croact-moveable、moveable、vue3-moveable、helper 的 `dist/` 中每个文件的 SHA-256，共 28 个文件，保存在 scratchpad 的 `dist-before.sha` 中。

### `pnpm test`

161 个用例全部通过：

| 包 | 用例数 |
|---|---|
| react-moveable | 141 |
| svelte-moveable | 8 |
| lit-moveable | 5 |
| vue3-moveable | 5 |
| helper | 2 |

### 依赖来源（`pnpm why preact preact-css-styled lit svelte -r`）

```
lit@3.3.3                <- lit-moveable (devDependencies)
preact@10.29.8           <- preact-moveable (devDependencies)，以及 preact-css-styled <- preact-moveable
preact-css-styled@1.1.9  <- preact-moveable (dependencies)
svelte@5.57.2            <- svelte-moveable (devDependencies)，以及 @sveltejs/package、@sveltejs/vite-plugin-svelte、svelte-check、svelte2tsx
```

全部只来自这三个包。

## 2. 删除包与依赖

- 2.1：三个目录删除后，`packages/` 下只剩 croact-moveable、helper、moveable、react-moveable、vue3-moveable。
- 2.2：`pnpm install` 移除 33 个包，锁文件净减 416 行。`pnpm why preact preact-css-styled lit svelte -r` 没有结果，锁文件中搜不到 `preact`、`lit-html`、`svelte`。锁文件新增的 8 行是：react-moveable 的 `vite` 不再走 catalog，写成 `specifier: ^8.3.4`；publint 原来是 svelte-moveable 的直接开发依赖，现在只作为 tsdown 的可选 peer 存在，所以它和它独有的依赖（mri、package-manager-detector 等）被标记为 `optional: true`。删除后每个 catalog 依赖都还有至少两个包使用。`pnpm lint` 通过。

## 3. 配置与文档

- 3.1–3.3：修改后的配置和文档中搜不到 `preact`、`lit-moveable`、`svelte`。例外是 `CLAUDE.md` 开头有意写明「仓库不支持 Preact、Lit、Svelte（相应的包已删除，不要再加回来）」，用来提醒以后的维护者。
- 3.4：第 6 步状态改为「进行中」，记录本 change；删除 preact peer 范围那一项和 preact-css-styled 那条已知遗留。

## 4. 全量检查

| 命令 | 结果 |
|---|---|
| `pnpm lint` | 通过 |
| `pnpm doc` | 通过 |
| `pnpm packages:build` | 通过 |
| `pnpm --filter react-moveable typecheck:stories` | 通过 |
| `pnpm build:storybook` | 通过 |
| `pnpm test` | 148 个用例全部通过 |

- 5 个包 `dist/` 中 28 个文件的 SHA-256 与 1.1 完全相同。
- 用例数：react-moveable 141、vue3-moveable 5、helper 2，与 1.1 相同；lit-moveable（5 个）和 svelte-moveable（8 个）不再出现，161 − 13 = 148。
- 仓库中（排除 `openspec/changes/`、ROADMAP 中的历史叙述、各 CHANGELOG、锁文件和 `demo/`）只有两处还提到这些名字：`CLAUDE.md` 开头那句「不支持」的说明，以及 3 份主 spec。主 spec 会在归档时按本 change 的 spec 增量同步。
