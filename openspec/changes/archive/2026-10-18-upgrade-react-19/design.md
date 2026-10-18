## Context

- react-moveable 是全部核心逻辑，源码只 import `react`（`React.createElement`、`PureComponent` 等 class 组件 API），不 import `react-dom`。它依赖的 react-css-styled 用了 `forwardRef`、`useRef`，所以真实的最低版本是 React 16.8。
- 现在 `react` 只是 react-moveable 的 devDependency（16.14），构建配置用 `deps.neverBundle: ["react", "react-dom"]` 把它留在产物外，注释写着「发布步骤再改成 peerDependency」。
- croact-moveable 内联 react-moveable 的产物，运行时不 import `@moveable-next/react`；但 croact-moveable 和 moveable 的 `declaration/` 都 import `@moveable-next/react`（moveable 还 import `@moveable-next/react/types` 和 `react`），所以 `@moveable-next/react` 在这两个包的 `dependencies` 中，vue3-moveable 又依赖 moveable。
- 试升级（React 19.3.1、`@types/react` 19.3.0）：`pnpm packages:build`、`pnpm test`（148 个）、`test:type`、`declaration`、`pnpm lint` 全部通过，测试输出中没有警告；4 个包的 `dist/`、`declaration/` 与 React 16 下的构建逐字节相同。`typecheck:stories` 有 5 个错误，来自两类 `@types/react` 19 的破坏性变更：全局 `JSX` 命名空间被移除，`useRef` 必须传初始值。
- react-css-styled、react-selecto、react-infinite-viewer、react-keycon、`@cfcs/react` 的产物中没有 React 19 删除的 API（`findDOMNode`、字符串 ref、旧版 context、`createFactory`、内部对象），也都没有声明 react peer；Storybook 10 的 peer 范围包含 React 19。

## Goals / Non-Goals

**Goals:**
- 开发、Storybook 和测试统一在 React 19 上运行。
- `@moveable-next/react` 声明它支持的 React 版本，让包管理器能检查使用者的 React。
- 原生版和 Vue 3 版的使用者不因此被要求安装 React。
- 产物和类型声明不变。

**Non-Goals:**
- 在多个 React 大版本上运行测试。
- 让 croact-moveable、moveable 的类型声明不再依赖 `@moveable-next/react` 和 `react` 的类型。

## Decisions

### peer 范围是 `^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0`

用户决定。16.8 是 react-css-styled 用到 hooks 决定的真实下限；升级前所有测试在 React 16.14 上通过，升级后在 19 上通过，两次构建的产物逐字节相同，所以 React 16 用户换到 `@moveable-next/react` 时不需要升级 React。写成按大版本列出的 `||`，而不是 `>=16.8.0`：未来的 React 20 没有验证过，不应该自动落在范围内。

备选：`^18.0.0 || ^19.0.0`、`^19.0.0`。它们和测试覆盖更一致，但会把现有的 React 16/17（以及 18）用户挡在外面，而这些版本上没有已知问题。

### react peer 标为可选（`peerDependenciesMeta.react.optional: true`）

peer 表达的是「由使用者提供 react，且版本在范围内」。对直接使用 `@moveable-next/react` 的人，react 一定已经安装，可选 peer 照样检查版本：版本不在范围内时，包管理器同样会警告。不同之处只在 react 没有安装的时候：必需 peer 会让 npm 7+ 自动安装 React、让 pnpm 报缺少 peer；可选 peer 什么都不做。

没有安装 react 的只有一种人：通过 croact-moveable / moveable / vue3-moveable 间接装上 `@moveable-next/react` 的原生版和 Vue 3 版用户，他们只用到它的类型声明。所以可选 peer 正好对应实际情况。

备选：
- 必需 peer：原生版和 Vue 3 版用户会被装上（或被提示安装）一份用不到的 React。
- 把 `@moveable-next/react` 从 croact-moveable、moveable 的 `dependencies` 中移走：它们的类型声明会找不到 `@moveable-next/react`，要先把类型内联进各自的声明，属于单独的工作。

### 删除 `deps.neverBundle`，由 peer 决定外部模块

tsdown 把 `peerDependencies` 自动当作外部模块（vue3-moveable 的 vue 已经是这样）。react 成为 peer 后，`neverBundle` 中的 `react` 是重复的；`react-dom` 没有被源码 import，留着没有作用。删除后产物应逐字节不变，以此验证。`onlyBundle: []` 保留，它保证 node_modules 中的包不会被打进产物。

### 开发依赖的版本

`react`、`react-dom` 写 `^19.3.1`，`@types/react`、`@types/react-dom` 写 `^19.3.0`（目前的最新版本）。`@types/react` 由 react-moveable、croact-moveable、moveable 三个包声明，所以只改 catalog；`react`、`react-dom`、`@types/react-dom` 只有 react-moveable 用，写在它的 `package.json` 中。react 同时是 peer 和 devDependency，符合 monorepo-tooling 中「包自己 peer 的开发版本」的例外。

### stories 的类型修正

- 自定义元素：`@types/react` 19 不再提供全局 `JSX` 命名空间，`JSX.IntrinsicElements` 要通过模块扩充 `declare module "react" { namespace JSX { ... } }` 声明。`HTMLElementTagNameMap` 是 DOM 的全局类型，仍留在 `declare global` 中。
- `React.useRef<GroupManager>()`：`@types/react` 19 要求传初始值。改为 `useRef<GroupManager>(null)`，与同一文件中另外两个 ref 的写法一致；使用处已经都用 `!` 断言非空。

这些文件同时是 Storybook 的 React tab，改动后展示的代码也是 React 19 下能通过类型检查的写法。

## Risks / Trade-offs

- [React 16 / 17 / 18 没有测试覆盖] → 本次产物与 React 16 下测试通过的产物逐字节相同；以后改动 react-moveable 时，只有 React 19 上的行为被测试。需要时再加 CI 矩阵，记入 ROADMAP。
- [可选 peer 下，直接使用者忘记安装 react 时不会在安装阶段提示] → 运行时 import `react` 会立即失败，并且 React 组件库的使用者不会不装 React，影响可以忽略。
- [类型声明由 `@types/react` 19 编译] → `declaration/` 与用 16 编译的逐字节相同，使用较旧 `@types/react` 的使用者不受影响。
