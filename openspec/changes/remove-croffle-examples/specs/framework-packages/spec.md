## REMOVED Requirements

### Requirement: Storybook 示例代码只覆盖受支持框架
**Reason**: 本 change 去掉了从 React story 自动翻译生成多框架示例的做法，代码面板只展示经过测试的 React 示例，由新的「Storybook 代码面板展示经过测试的 React 示例」取代。
**Migration**: 无需迁移：story 和 React 代码 tab 不变，Script、Vue3、Svelte、Lit tab 被删除；各框架包的用法见各自的 README。

### Requirement: svelte-moveable 的行为
**Reason**: 去掉 `on:` 指令的支持后，原来的「Storybook 示例的写法」场景不再成立。MODIFIED 不能删除场景，同名要求也不能同时删除和新增，所以整条由新的「svelte-moveable 的组件行为」取代，其余内容不变。
**Migration**: 用回调 prop 代替 `on:` 指令：`on:drag={({ detail: e }) => ...}` 改为 `onDrag={e => ...}`。

## ADDED Requirements

### Requirement: Storybook 代码面板展示经过测试的 React 示例
Storybook 中 story 的代码面板 SHALL 只有 React 和 CSS 两个 tab。React tab 的代码 SHALL 就是这个 story 实际渲染、参与交互测试的 App 源码，只做三处转换：仓库内部的路径别名（如 `@/react-moveable`）换成发布的包名，`props.xxx` 换成 story 当前的参数值，App 函数的 props 参数去掉（参数已经换成具体的值）。CSS tab SHALL 包含示例的默认样式，以及 App 从自己目录中 import 的样式文件。代码 tab 中展示的参数值 SHALL 与 story 当前的参数（controls）保持一致。

仓库 MUST NOT 把 React story 自动翻译成其他框架的示例代码：启动 Storybook、构建 Storybook 和执行测试之前都不需要生成步骤，story 目录中也不存在生成出来的代码。

#### Scenario: 查看 story 的代码面板
- **WHEN** 在 Storybook 中打开任意带代码预览的 story
- **THEN** 代码面板中只有 React 和 CSS 两个 tab，没有 Script、Vue3、Svelte、Lit、Vue2、Angular

#### Scenario: React 代码就是渲染的代码
- **WHEN** 对比某个 story 的 React tab 和这个 story 渲染的 App 源文件
- **THEN** 两者只在三处不同：仓库内部的路径别名（如 `@/react-moveable`）换成了发布的包名（如 `react-moveable`），`props.xxx` 换成了当前的参数值，`App(props: Record<string, any>)` 变成了 `App()`

#### Scenario: 示例引用的样式
- **WHEN** 打开一个 App 从自己目录中 import 了样式文件（如 `import "./snap.css"`）的 story
- **THEN** CSS tab 中除了默认样式，还有这个样式文件的内容

#### Scenario: 代码随参数更新
- **WHEN** 在 controls 中修改某个 story 的参数（例如切换 `draggable`、修改 `throttleDrag`）
- **THEN** React 代码 tab 中对应的参数值同步变为新值，复制得到的代码也是新值

#### Scenario: 不生成其他框架的示例
- **WHEN** 在干净检出上执行 Storybook 启动、Storybook 静态构建或测试命令
- **THEN** 这些命令不执行代码翻译，执行后 story 目录中没有 script、vue3、svelte、lit 子目录；依赖树中没有代码翻译工具及其独有的依赖

### Requirement: svelte-moveable 的组件行为
svelte-moveable SHALL 以默认导出提供一个 Svelte 组件，把原生 moveable 的选项、事件和方法暴露给 Svelte：
- 选项是组件的 prop（如 `draggable={true}`、`target={el}`）。
- 事件 SHALL 只通过回调 prop 监听：名字是 `on` 加首字母大写的事件名（如 `onDrag`），参数是 moveable 的事件参数。组件 MUST NOT 派发组件事件，`on:` 指令（如 `on:drag`）不再收到事件。
- 组件引用上可以直接调用 moveable 的方法，`bind:this` 得到的引用和 `mount()` 的返回值都是这样；另有 `getInstance()` 返回内部的原生 moveable 实例。

组件的根元素就是 moveable 的控制框。svelte-moveable SHALL 同时重新导出原生 moveable 的全部具名导出，SHALL 把 Svelte 5 声明为 peerDependency，它的类型声明 SHALL 让使用者对 prop、回调 prop 的参数和组件引用上的方法得到类型检查。组件 SHALL 能在服务端渲染中正常渲染。

#### Scenario: 渲染控制框
- **WHEN** 挂载一个设置了 `target` 的组件
- **THEN** 组件的根元素渲染为指向该目标的 moveable 控制框，包含围绕目标的连线

#### Scenario: 挂载后修改 prop
- **WHEN** 组件挂载之后，再修改一个选项 prop
- **THEN** 内部的 moveable 使用新的值：例如把 `rotatable` 改为 `true` 后出现旋转控制点，把 `draggable` 改为 `false` 后拖动目标不再触发拖动事件

#### Scenario: 回调 prop 收到事件
- **WHEN** `draggable` 为 `true`、传入了 `onDragStart`、`onDrag`、`onDragEnd` 时用鼠标拖动目标
- **THEN** 三个回调依次被调用，`onDrag` 的参数中有表示新位置的 `transform`

#### Scenario: 在组件中通过 bind:this 使用
- **WHEN** 在一个使用 runes 的组件中用 `bind:this` 绑定组件引用、用 `onDrag` 监听事件，然后拖动目标
- **THEN** `onDrag` 收到的参数中有表示新位置的 `transform`；绑定得到的组件引用上可以调用 `getRect()`

#### Scenario: 调用方法
- **WHEN** 目标没有 transform 时，在 `mount()` 返回的组件引用上调用 moveable 的方法 `getRect()`，以及调用 `getInstance()`
- **THEN** `getRect()` 返回目标的矩形信息，其中 `offsetWidth`、`offsetHeight` 等于目标元素的尺寸；`getInstance()` 返回原生 moveable 实例，在它上面调用 `getRect()` 得到相同的尺寸

#### Scenario: 卸载时销毁
- **WHEN** 挂载组件后马上卸载
- **THEN** 内部的 moveable 被销毁，控制框中不再有连线和控制点，之后也没有抛出错误

#### Scenario: 服务端渲染
- **WHEN** 在服务端渲染一个使用了该组件的页面
- **THEN** 渲染成功，输出中包含组件的根元素

#### Scenario: 类型声明
- **WHEN** 使用者在 TypeScript 或带类型检查的 Svelte 组件中，以包的类型声明为准使用组件：传入 prop 和回调 prop、用 `bind:this` 或 `mount()` 取得组件引用并调用方法
- **THEN** prop 按 moveable 的选项类型检查（类型不符时报错），回调 prop 的参数是对应的 moveable 事件类型，组件引用上有 moveable 的方法

#### Scenario: 发布内容
- **WHEN** 构建后列出 svelte-moveable 的 `dist/`，并读取 `package.json` 的入口字段
- **THEN** 组件以 `.svelte` 源码和对应的类型声明发布，由使用者的 Svelte 编译；入口重新导出原生 moveable 的全部具名导出；`svelte`、`types` 和 `exports` 指向的文件都存在

#### Scenario: 依赖 Svelte 5
- **WHEN** 查看 svelte-moveable 的 `package.json`
- **THEN** `peerDependencies` 中声明了 `svelte: ^5.0.0`，测试运行在 Svelte 5 上
