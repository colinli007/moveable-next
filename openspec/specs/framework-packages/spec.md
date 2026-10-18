# framework-packages Specification

## Purpose

定义本仓库对外提供哪些框架包、各框架包的行为，以及 Storybook 代码面板展示哪些示例代码，作为后续新增或下线框架支持时的依据。

## Requirements

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

### Requirement: 不支持 Vue 2 与 Angular
仓库 MUST NOT 包含 Vue 2 或 Angular 的包装包、构建步骤、依赖或生成产物，构建流程也 MUST NOT 依赖任何仅为 Angular 服务的代码生成步骤。

#### Scenario: 构建不依赖 Angular 常量生成
- **WHEN** 执行全量构建
- **THEN** 流程中不包含从 react-moveable 产物生成 Angular inputs / outputs 常量的步骤，且构建成功

#### Scenario: 依赖树中没有 Angular 与 Vue 2 工具链
- **WHEN** 检查锁文件
- **THEN** 不存在 `@angular/*`、`@vue/cli-service`、`ng-packagr`、`vue-template-compiler` 等仅为 Vue 2 / Angular 服务的依赖

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

### Requirement: vue3-moveable 的行为
vue3-moveable SHALL 以默认导出（以及具名导出 `VueMoveable`）提供一个 Vue 组件，把原生 moveable 的选项、事件和方法暴露给 Vue：
- 选项是组件的 prop（如 `:draggable`、`:target`）。
- 事件用 moveable 的事件名 emit（如 `@drag`），参数是 moveable 事件参数的副本。
- 方法可以通过组件 ref 直接调用。

组件的根元素就是 moveable 的控制框。vue3-moveable SHALL 同时重新导出原生 moveable 的全部具名导出，SHALL 把 Vue 3.5 声明为 peerDependency，它的类型声明 SHALL 让使用者对 prop、事件参数和实例方法得到类型检查。

#### Scenario: 渲染控制框
- **WHEN** 挂载一个设置了 `target` 的组件
- **THEN** 组件的根元素渲染为指向该目标的 moveable 控制框，包含围绕目标的连线

#### Scenario: 挂载后修改 prop
- **WHEN** 组件挂载之后，再修改一个选项 prop
- **THEN** 内部的 moveable 使用新的值：例如把 `rotatable` 改为 `true` 后出现旋转控制点，把 `draggable` 改为 `false` 后拖动目标不再 emit 拖动事件

#### Scenario: 拖动时 emit 事件
- **WHEN** `draggable` 为 `true` 时用鼠标拖动目标
- **THEN** 组件依次 emit `dragStart`、`drag`、`dragEnd`，`drag` 的参数中有表示新位置的 `transform`

#### Scenario: 调用方法
- **WHEN** 目标没有 transform 时，通过组件 ref 调用 moveable 的方法 `getRect()`
- **THEN** 返回目标的矩形信息，其中 `offsetWidth`、`offsetHeight` 等于目标元素的尺寸

#### Scenario: 卸载时销毁
- **WHEN** 卸载组件
- **THEN** 内部的 moveable 被销毁，控制框中不再有连线和控制点

#### Scenario: 类型声明
- **WHEN** 使用者在 TypeScript 中以包的类型声明为准使用组件：传入 prop、监听事件、通过实例调用方法
- **THEN** prop 按 moveable 的选项类型检查（类型不符时报错），事件监听函数的参数是对应的 moveable 事件类型，实例上有 moveable 的方法

#### Scenario: 依赖 Vue 3.5
- **WHEN** 查看 vue3-moveable 的 `package.json`
- **THEN** `peerDependencies` 中声明了 `vue: ^3.5.0`，测试运行在 Vue 3.5 上

### Requirement: 框架包装的浏览器测试
仓库 SHALL 为框架包装包提供在真实浏览器中运行的自动化测试。测试 SHALL 针对包的构建产物，也就是使用者实际安装的代码，并由根目录的测试命令和其它测试一起执行。目前覆盖 vue3-moveable。

#### Scenario: 根目录统一执行
- **WHEN** 在根目录构建全部包之后执行测试命令
- **THEN** vue3-moveable 的浏览器测试和 react-moveable、helper 的测试一起执行，并全部通过

#### Scenario: 包装失效时失败
- **WHEN** vue3-moveable 的产物中，属性（prop）、事件或方法的转发有一项失效
- **THEN** 测试失败，并能看到失败的测试名称

#### Scenario: 失败时保留截图
- **WHEN** 从根目录执行测试时有框架包装的浏览器测试失败
- **THEN** 失败测试的浏览器截图输出到与 story 测试相同的目录，CI 中作为流水线产物一并上传
