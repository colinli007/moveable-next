## Why

ROADMAP 第 6 步在第一次发布前要定下 `@moveable-next/react` 支持的 React 版本。现在 react-moveable 没有把 react 声明为 peerDependency，只在构建配置中用 `deps.neverBundle` 让它保持外部模块；使用者装包时，包管理器不知道它需要 React、需要哪个版本。开发依赖还停在 React 16 和 `@types/react` 16：Storybook 和测试只在 React 16 上运行，React 19 用户实际拿到的行为没有被测试过，测试时还会打印 `act(...)` 警告。

试升级的结果：React 19.3 下库源码不需要改（没有用到 React 19 删除的 API，class 组件的 `defaultProps` 仍然支持），全部 148 个测试通过、没有警告；4 个包的 `dist/` 和 `declaration/` 与 React 16 下构建的逐字节相同。需要改的只有 stories 中 3 个文件的类型写法。

## What Changes

- react-moveable 的开发依赖升到 React 19：`react`、`react-dom` 改为 `^19.3.1`，`@types/react-dom` 改为 `^19.3.0`；catalog 中的 `@types/react`（react-moveable、croact-moveable、moveable 共用）改为 `^19.3.0`。Storybook、story 测试和类型检查都在 React 19 上运行。
- react-moveable 增加 `peerDependencies.react: "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"`（用户决定），并用 `peerDependenciesMeta` 标为可选：croact-moveable 和 moveable 的类型声明引用了 `@moveable-next/react`，所以它在它们的 `dependencies` 中；peer 必需时，npm 7+ 会给只用原生版或 Vue 3 版的人装上 React。
- react-moveable 的 `tsdown.config.mts` 删除 `deps.neverBundle`：react 成为 peer 后由 tsdown 自动当作外部模块；`react-dom` 没有被源码 import，本来就不需要。
- stories 中按 `@types/react` 19 修正类型：自定义元素的 JSX 声明从全局 `JSX` 命名空间改为 `declare module "react"`（2 个文件），`useRef<GroupManager>()` 补上初始值。
- `CLAUDE.md` 改写构建一节中「react 暂时用 neverBundle 保持外部」的说明；`openspec/ROADMAP.md` 第 6 步记录本 change，删除已完成的「确定 React peer 范围」一项和「React 16 下 `act(...)` 警告」的遗留项。

不在本次范围：

- 在 React 16 / 17 / 18 上运行测试（CI 矩阵）：peer 范围包含它们，但测试只在 React 19 上运行，需要时单独评估。
- croact-moveable、moveable 的类型声明依赖 `@moveable-next/react` 和 `react` 的类型（moveable 的声明直接 import `react`，而它没有声明 `@types/react`）：是现有状况，与本次升级无关，记入 ROADMAP 遗留项。
- `react-dom` 的 peer：库源码不 import `react-dom`，不声明。

## Capabilities

### New Capabilities

（无）

### Modified Capabilities

- `framework-packages`：新增 react-moveable 支持的 React 版本要求（peer 范围、可选 peer、在 React 19 上测试）。
- `library-build`：「外部依赖与声明一致」去掉 react-moveable 的 `react` 尚未声明为 peer 的例外。

## Impact

- `pnpm-workspace.yaml`（catalog 的 `@types/react`）、`packages/react-moveable/package.json`、`pnpm-lock.yaml`
- `packages/react-moveable/tsdown.config.mts`
- `packages/react-moveable/stories/99-Tests/ReactCustomElementApp.tsx`、`ReactCustomElementBoundsApp.tsx`、`stories/9A-Components/ReactSelectoMultipleGroupApp.tsx`
- `CLAUDE.md`、`openspec/ROADMAP.md`
- 各包的产物和类型声明不变；发布后 `@moveable-next/react` 的 `package.json` 多出 react peer。
