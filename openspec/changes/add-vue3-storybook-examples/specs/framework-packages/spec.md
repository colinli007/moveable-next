## RENAMED Requirements

- FROM: `### Requirement: Storybook 代码面板展示经过测试的 React 示例`
- TO: `### Requirement: Storybook 代码面板展示经过测试的示例代码`

## MODIFIED Requirements

### Requirement: Storybook 代码面板展示经过测试的示例代码
Storybook 中 story 的代码面板 SHALL 按当前选择的框架显示 tab：React 模式下只有 React 和 CSS 两个 tab，Vue 模式下只有 Vue 和 CSS 两个 tab。只有 React 版的 story（见「Storybook 示例提供 React 和 Vue 3 两个版本」中的例外）在 Vue 模式下不显示代码 tab。

React tab 的代码 SHALL 就是这个 story 在 React 模式下实际渲染、参与交互测试的 App 源码，只做三处转换：仓库内部的路径别名（如 `@/react-moveable`）换成发布的包名（如 `@moveable-next/react`），`props.xxx` 换成 story 当前的参数值，App 函数的 props 参数去掉（参数已经换成具体的值）。

Vue tab 的代码 SHALL 就是这个 story 在 Vue 模式下实际渲染、参与交互测试的 Vue 单文件组件源码，只做三处转换：仓库内部的路径别名换成发布的包名 `@moveable-next/vue3`，`props.xxx` 换成 story 当前的参数值，声明 props 的语句（`const props = defineProps<...>()`）去掉（参数已经换成具体的值）。

CSS tab SHALL 包含示例的默认样式，以及当前框架的 App 从自己目录中 import 的样式文件。代码 tab 中展示的参数值 SHALL 与 story 当前的参数（controls）保持一致。

仓库 MUST NOT 把 React story 自动翻译成其他框架的示例代码：Vue 示例是手写并提交到仓库的源文件；启动 Storybook、构建 Storybook 和执行测试之前都不需要生成步骤，story 目录中也不存在生成出来的代码。

#### Scenario: 查看 story 的代码面板
- **WHEN** 在 Storybook 中打开任意带代码预览的 story，分别在 React 模式和 Vue 模式下查看代码面板
- **THEN** React 模式下只有 React 和 CSS 两个 tab，Vue 模式下只有 Vue 和 CSS 两个 tab；任何模式下都没有 Script、Svelte、Lit、Vue2、Angular

#### Scenario: React 代码就是渲染的代码
- **WHEN** 对比某个 story 的 React tab 和这个 story 在 React 模式下渲染的 App 源文件
- **THEN** 两者只在三处不同：仓库内部的路径别名（如 `@/react-moveable`）换成了发布的包名（如 `@moveable-next/react`），`props.xxx` 换成了当前的参数值，`App(props: Record<string, any>)` 变成了 `App()`

#### Scenario: Vue 代码就是渲染的代码
- **WHEN** 对比某个 story 的 Vue tab 和这个 story 在 Vue 模式下渲染的 `.vue` 源文件
- **THEN** 两者只在三处不同：仓库内部的路径别名换成了 `@moveable-next/vue3`，`props.xxx` 换成了当前的参数值，`const props = defineProps<...>()` 语句被去掉

#### Scenario: 示例引用的样式
- **WHEN** 打开一个 App 从自己目录中 import 了样式文件（如 `import "./snap.css"`）的 story，分别在两种模式下查看
- **THEN** 每种模式的 CSS tab 中除了默认样式，还有该模式下 App import 的样式文件的内容

#### Scenario: 代码随参数更新
- **WHEN** 在 controls 中修改某个 story 的参数（例如切换 `draggable`、修改 `throttleDrag`）
- **THEN** 当前模式的代码 tab（React 或 Vue）中对应的参数值同步变为新值，复制得到的代码也是新值

#### Scenario: 不生成其他框架的示例
- **WHEN** 在干净检出上执行 Storybook 启动、Storybook 静态构建或测试命令
- **THEN** 这些命令不执行代码翻译，执行后 story 目录中没有 script、vue3、svelte、lit 子目录，也没有新增或改动的文件；依赖树中没有代码翻译工具及其独有的依赖

### Requirement: vue3-moveable 的行为
vue3-moveable SHALL 以默认导出（以及具名导出 `VueMoveable`）提供一个 Vue 组件，把原生 moveable 的选项、事件和方法暴露给 Vue：
- 选项是组件的 prop（如 `:draggable`、`:target`）。
- 事件用 moveable 的事件名 emit（如 `@drag`），参数是 moveable 事件参数的副本。组件上监听 moveable 事件名的监听器（如 `@click`、`@drag`）SHALL 只接收 moveable 的事件，MUST NOT 同时被注册为根元素上同名的原生 DOM 事件监听器。
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

#### Scenario: 监听器不接收同名的原生事件
- **WHEN** 组件上设置了 `@click` 监听器，用鼠标在控制框内（例如控制点上）按下并松开、不移动
- **THEN** 监听器收到的每一次调用都是 moveable 的 click 事件参数，没有一次收到原生的 `MouseEvent`

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

## ADDED Requirements

### Requirement: Storybook 示例提供 React 和 Vue 3 两个版本
Storybook SHALL 在工具栏提供框架切换，选项是 React 和 Vue，默认是 React。切换框架 SHALL 只改变 story 渲染的 App 和代码面板显示的代码：story 的 id、侧边栏位置、参数（controls）和交互脚本（play）在两种模式下相同，参数在两种模式下都实时生效。

除下面列出的例外，每个 story SHALL 同时有 React 版和 Vue 3 版的 App。Vue 3 版 SHALL 是使用 `@moveable-next/vue3` 的 Vue 单文件组件，实现与 React 版相同的示例：渲染出与 React 版相同的目标元素结构和 moveable 配置，使同一组 play 断言在两种模式下都成立。缺少 Vue 3 版的 story（例外除外）MUST 使交互测试失败，在 Storybook 中所在的 story 文件 MUST 加载出错；两处的错误信息都 SHALL 写明缺少的是哪个 App。

例外（只有 React 版的 story）：
- 「Support Tree Shaking / Use only Draggable, Resizable, Rotatable」：它演示的按 able 组合（`makeMoveable`）在原生版和 Vue 3 版中没有提供。

只有 React 版的 story 在 Vue 模式下 SHALL 在画布中说明 Vue 3 版不支持这个示例，MUST NOT 渲染为空白或报错。

#### Scenario: 切换到 Vue
- **WHEN** 在 Storybook 中打开「Basic / Draggable」，在工具栏把框架切换为 Vue
- **THEN** 画布渲染这个 story 的 Vue 3 App，拖动目标后目标随之移动；story 的 URL 中的 id 和 controls 与 React 模式下相同

#### Scenario: 参数在 Vue 模式下生效
- **WHEN** Vue 模式下在 controls 中把 `draggable` 改为 `false`
- **THEN** 拖动目标不再移动目标，不需要刷新页面

#### Scenario: 缺少 Vue 版
- **WHEN** 删除某个不在例外中的 story 的 Vue 3 App，然后执行测试，或在 Storybook 中打开这个 story
- **THEN** 测试失败，Storybook 中这个 story 文件加载出错，两处的错误信息中都有缺少的 App 的文件名

#### Scenario: 只有 React 版的 story
- **WHEN** Vue 模式下打开「Support Tree Shaking / Use only Draggable, Resizable, Rotatable」
- **THEN** 画布中显示 Vue 3 版不支持按 able 组合的说明，没有脚本错误，代码面板中没有 Vue tab
