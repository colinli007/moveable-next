## MODIFIED Requirements

### Requirement: 受支持的框架包集合
仓库 SHALL 只包含以下工作区包，并以 `@moveable-next` 作用域下的名字发布：

| 目录 | 包名 | 用途 |
|---|---|---|
| `packages/react-moveable` | `@moveable-next/react` | React 组件，全部核心逻辑 |
| `packages/croact-moveable` | `@moveable-next/croact` | 用 croact 代替 React 的构建，供原生 JS 版使用 |
| `packages/moveable` | `@moveable-next/vanilla` | 原生 JS 版 |
| `packages/vue3-moveable` | `@moveable-next/vue3` | Vue 3 组件 |
| `packages/helper` | `@moveable-next/helper` | 工具包 |

各 spec 中以目录名（react-moveable、croact-moveable、moveable、vue3-moveable、helper）指代对应的包；写出模块名、import 路径或 npm 包名时，用上表中的包名。仓库不支持 Preact、Lit、Svelte，不提供它们的框架包。

#### Scenario: 工作区包清单
- **WHEN** 列出 pnpm 工作区中的所有包
- **THEN** 结果恰好是上述 5 个包（外加私有的根包），名字都是上表中的包名，不包含 preact-moveable、lit-moveable、svelte-moveable、vue-moveable、ngx-moveable、snappable 或独立的 storybook 包

### Requirement: Storybook 代码面板展示经过测试的 React 示例
Storybook 中 story 的代码面板 SHALL 只有 React 和 CSS 两个 tab。React tab 的代码 SHALL 就是这个 story 实际渲染、参与交互测试的 App 源码，只做三处转换：仓库内部的路径别名（如 `@/react-moveable`）换成发布的包名（如 `@moveable-next/react`），`props.xxx` 换成 story 当前的参数值，App 函数的 props 参数去掉（参数已经换成具体的值）。CSS tab SHALL 包含示例的默认样式，以及 App 从自己目录中 import 的样式文件。代码 tab 中展示的参数值 SHALL 与 story 当前的参数（controls）保持一致。

仓库 MUST NOT 把 React story 自动翻译成其他框架的示例代码：启动 Storybook、构建 Storybook 和执行测试之前都不需要生成步骤，story 目录中也不存在生成出来的代码。

#### Scenario: 查看 story 的代码面板
- **WHEN** 在 Storybook 中打开任意带代码预览的 story
- **THEN** 代码面板中只有 React 和 CSS 两个 tab，没有 Script、Vue3、Svelte、Lit、Vue2、Angular

#### Scenario: React 代码就是渲染的代码
- **WHEN** 对比某个 story 的 React tab 和这个 story 渲染的 App 源文件
- **THEN** 两者只在三处不同：仓库内部的路径别名（如 `@/react-moveable`）换成了发布的包名（如 `@moveable-next/react`），`props.xxx` 换成了当前的参数值，`App(props: Record<string, any>)` 变成了 `App()`

#### Scenario: 示例引用的样式
- **WHEN** 打开一个 App 从自己目录中 import 了样式文件（如 `import "./snap.css"`）的 story
- **THEN** CSS tab 中除了默认样式，还有这个样式文件的内容

#### Scenario: 代码随参数更新
- **WHEN** 在 controls 中修改某个 story 的参数（例如切换 `draggable`、修改 `throttleDrag`）
- **THEN** React 代码 tab 中对应的参数值同步变为新值，复制得到的代码也是新值

#### Scenario: 不生成其他框架的示例
- **WHEN** 在干净检出上执行 Storybook 启动、Storybook 静态构建或测试命令
- **THEN** 这些命令不执行代码翻译，执行后 story 目录中没有 script、vue3、svelte、lit 子目录；依赖树中没有代码翻译工具及其独有的依赖
