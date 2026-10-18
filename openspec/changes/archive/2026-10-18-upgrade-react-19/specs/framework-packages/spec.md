## ADDED Requirements

### Requirement: react-moveable 支持的 React 版本
react-moveable SHALL 把 `react` 声明为 peerDependency，范围是 `^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0`，并 SHALL 在 `peerDependenciesMeta` 中把它标为可选：croact-moveable、moveable（以及依赖 moveable 的 vue3-moveable）因为类型声明而依赖 react-moveable，它们的使用者 MUST NOT 因此被要求安装 React。react-moveable MUST NOT 把 `react-dom` 声明为 peerDependency，因为源码不使用它。

开发依赖 SHALL 是 React 19（`react`、`react-dom`、`@types/react`、`@types/react-dom` 都是 19.x）：Storybook、story 测试和 stories 的类型检查在 React 19 上运行。

#### Scenario: peer 声明
- **WHEN** 查看 react-moveable 的 `package.json`
- **THEN** `peerDependencies.react` 是 `^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0`，`peerDependenciesMeta.react.optional` 是 `true`，`peerDependencies` 中没有 `react-dom`

#### Scenario: 原生版用户不会被装上 React
- **WHEN** 在一个没有 React 的项目中用 npm 安装 moveable 的发布包
- **THEN** 安装成功，`node_modules` 中没有 `react`，安装过程没有缺少 peer 的警告

#### Scenario: 在 React 19 上测试
- **WHEN** 在根目录执行测试命令和 react-moveable 的 stories 类型检查
- **THEN** 解析到的 `react`、`react-dom` 是 19.x，全部测试通过，测试输出中没有 React 的 `act(...)` 警告，类型检查没有错误
