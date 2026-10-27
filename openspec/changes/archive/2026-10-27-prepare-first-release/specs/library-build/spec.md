## ADDED Requirements

### Requirement: 原生版与 Vue 3 版的类型声明不依赖 React 类型
moveable（`@moveable-next/vanilla`）和 vue3-moveable（`@moveable-next/vue3`）的公开类型声明，以及 react-moveable 的子路径 `@moveable-next/react/types`，在被使用方的 TypeScript 引用时 MUST NOT 引入 `react` 的类型：从这些入口出发，类型检查涉及的文件中 MUST NOT 有 `@types/react` 或 react-moveable 的 React 组件声明（如 `InitialMoveable`）。使用方没有安装 `@types/react` 时，无论是否开启 `skipLibCheck`，引用这些包都 SHALL 能通过类型检查。

react-moveable 的主入口 `@moveable-next/react` 是 React 组件，不受这条约束；croact-moveable 的类型声明是 react-moveable 主入口的重新导出，也不受这条约束。

这条约束 SHALL 有自动化测试：编译一段只使用 moveable 公开 API 的使用方代码（`skipLibCheck: false`），断言没有类型错误，并且参与编译的文件中没有 `@types/react`。这个测试 SHALL 在 moveable 的构建中执行。

#### Scenario: 只装原生版的项目
- **WHEN** 在一个没有安装 `@types/react` 的项目中安装 `@moveable-next/vanilla`，用 `skipLibCheck: false` 对使用它的代码做类型检查
- **THEN** 类型检查通过，没有 `Cannot find module 'react'` 错误

#### Scenario: 只装 Vue 3 版的项目
- **WHEN** 在一个没有安装 `@types/react` 的 Vue 3 项目中安装 `@moveable-next/vue3`，用 `skipLibCheck: false` 对使用它的代码做类型检查
- **THEN** 类型检查通过，没有 `Cannot find module 'react'` 错误

#### Scenario: 类型依赖回到包入口
- **WHEN** react-moveable 的某个 able 改动后，生成的声明中某个类型又经由 react-moveable 的入口（`..`）引用
- **THEN** moveable 的构建因类型测试失败而失败，并能看到 `@types/react` 被引入
