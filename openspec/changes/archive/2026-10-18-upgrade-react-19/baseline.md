# 基线与验证记录

## 1.1 基线（HEAD，React 16.14、`@types/react` 16）

- `pnpm packages:build` 成功；5 个包的 `dist/*.js` 和 `declaration/` 复制到 scratchpad（`r19/old/`）。
- `pnpm test`：23 个测试文件通过、1 个跳过，148 个用例全部通过。

## 5.1 全量检查（React 19.3.1、`@types/react` 19.3.0、`@types/react-dom` 19.3.0）

| 命令 | 结果 |
|---|---|
| `pnpm lint` | 通过 |
| `pnpm doc` | 通过 |
| `pnpm packages:build` | 通过，没有依赖被内联的报错 |
| `pnpm test` | 23 个测试文件通过、1 个跳过，148 个用例全部通过；输出中没有 `act(...)` 等警告 |
| `pnpm --filter @moveable-next/react typecheck:stories` | 通过 |
| `pnpm build:storybook` | 通过 |

与基线对比：5 个包的 `dist/*.js`（react 2、croact 2、vanilla 4、vue3 2、helper 4 个文件）逐个 `cmp` 相同，`declaration/` 用 `diff -r` 比较没有差异。删除 `deps.neverBundle` 之后产物也没有变化。

## 5.2 发布后的 peer 行为

对 5 个包执行 `pnpm pack`。`@moveable-next/react` 的 `package.json` 中有 `peerDependencies.react: "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"` 和 `peerDependenciesMeta.react.optional: true`。在 scratchpad 的临时 npm 项目中，用 `overrides` 把 `@moveable-next/react`、`croact`、`vanilla` 指向 tarball，执行 `npm install`（npm 11）：

| 项目 | 结果 |
|---|---|
| 只安装 `@moveable-next/vanilla` | 成功，没有警告；`node_modules` 中没有 `react`、`react-dom`（只有 `@moveable-next/react` 等） |
| `@moveable-next/react` + `react@18.3.1` | 成功，没有 peer 警告 |
| `@moveable-next/react` + `react@15.7.0` | 失败，`ERESOLVE`，提示 `peerOptional react@"^16.8.0 \|\| ^17.0.0 \|\| ^18.0.0 \|\| ^19.0.0"` |

顺带确认了已有的问题：在只装 vanilla 的项目中用 tsc 检查一段使用 `@moveable-next/vanilla` 的代码，`skipLibCheck: false` 时报 `Cannot find module 'react'`（来自 `@moveable-next/react` 的声明），`skipLibCheck: true` 时通过。声明文件与升级前相同，所以这不是本次引入的，记入 ROADMAP 遗留项。
