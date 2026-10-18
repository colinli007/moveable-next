## 1. 基线

- [x] 1.1 在 HEAD（React 16）上执行 `pnpm packages:build`，把 5 个包的 `dist/` 和 `declaration/` 复制到 scratchpad 作为基线；记录 `pnpm test` 的用例数。结果写入本 change 目录的 `baseline.md`。验证：`baseline.md` 中有用例数，scratchpad 中有 5 个包的副本

## 2. 依赖和构建配置（design：peer 范围、可选 peer、删除 neverBundle、开发依赖的版本）

- [x] 2.1 `pnpm-workspace.yaml` 的 catalog 中 `@types/react` 改为 `^19.3.0`；react-moveable 的 `package.json` 中 `react`、`react-dom` 改为 `^19.3.1`，`@types/react-dom` 改为 `^19.3.0`，增加 `peerDependencies.react: "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"` 和 `peerDependenciesMeta.react.optional: true`。执行 `pnpm install`。验证：`pnpm install` 没有 peer 警告；`pnpm --filter @moveable-next/react ls react react-dom @types/react @types/react-dom` 都是 19.x
- [x] 2.2 react-moveable 的 `tsdown.config.mts` 删除 `deps.neverBundle` 和它的注释，保留 `onlyBundle: []`。验证：`pnpm packages:build` 成功，构建输出中没有依赖被内联的报错

## 3. stories 的类型（design：stories 的类型修正）

- [x] 3.1 `stories/99-Tests/ReactCustomElementApp.tsx`、`ReactCustomElementBoundsApp.tsx` 中 `JSX.IntrinsicElements` 的声明改为 `declare module "react"` 的模块扩充，`HTMLElementTagNameMap` 留在 `declare global`；`stories/9A-Components/ReactSelectoMultipleGroupApp.tsx` 的 `React.useRef<GroupManager>()` 改为 `React.useRef<GroupManager>(null)`。验证：`pnpm --filter @moveable-next/react typecheck:stories` 通过

## 4. 文档

- [x] 4.1 `CLAUDE.md` 构建一节中「react 暂时在配置中用 `deps.neverBundle` 保持 external，发布步骤再改成 peerDependency」改为说明 react 是 react-moveable 的可选 peer（tsdown 自动当作外部模块），以及为什么是可选；`openspec/ROADMAP.md` 第 6 步记录本 change，删除「确定 React peer 范围」一项和 React 16 下 `act(...)` 警告的遗留项，增加两条遗留项：测试只在 React 19 上运行；croact-moveable、moveable 的类型声明依赖 `@moveable-next/react` 和 `react` 的类型。验证：`CLAUDE.md` 中搜不到 `neverBundle`；ROADMAP 第 6 步的表格和正文中有本 change

## 5. 全量检查

- [x] 5.1 在根目录依次执行 `pnpm lint`、`pnpm doc`、`pnpm packages:build`、`pnpm test`、`pnpm --filter @moveable-next/react typecheck:stories`、`pnpm build:storybook`，结果写入 `baseline.md`。验证：
  - 全部成功，`pnpm test` 的用例数与 1.1 相同，测试输出中没有 `act(...)` 警告；
  - 5 个包的 `dist/`、`declaration/` 与基线逐字节相同
- [x] 5.2 验证发布后的 peer 行为，结果写入 `baseline.md`：对 5 个包执行 `pnpm pack`，在 scratchpad 的临时 npm 项目中用 `overrides` 把 `@moveable-next/*` 指向这些 tarball：
  - 只安装 `@moveable-next/vanilla`：成功，`node_modules` 中没有 `react`，没有 peer 警告；
  - 安装 `@moveable-next/react` 和 `react@18`：没有 peer 警告；
  - 安装 `@moveable-next/react` 和 `react@15`：npm 报出 peer 冲突。
