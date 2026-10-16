## ADDED Requirements

### Requirement: svelte-moveable 的行为
svelte-moveable SHALL 以默认导出提供一个 Svelte 组件，把原生 moveable 的选项、事件和方法暴露给 Svelte：
- 选项是组件的 prop（如 `draggable={true}`、`target={el}`）。
- 事件有两种监听方式：
  - 回调 prop，名字是 `on` 加首字母大写的事件名（如 `onDrag`），参数是 moveable 的事件参数。
  - `on:` 指令（如 `on:drag`），moveable 的事件参数在 `detail` 中。
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

#### Scenario: Storybook 示例的写法
- **WHEN** 在不使用 runes 的组件中，像 Storybook 生成的 Svelte 示例那样使用组件：用 `bind:this` 绑定组件引用，用 `on:drag` 监听事件，然后拖动目标
- **THEN** `on:drag` 的监听函数收到事件，`detail` 中有表示新位置的 `transform`；绑定得到的组件引用上可以调用 `getRect()`

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

## MODIFIED Requirements

### Requirement: 框架包装的浏览器测试
仓库 SHALL 为框架包装包提供在真实浏览器中运行的自动化测试。测试 SHALL 针对包的构建产物，也就是使用者实际安装的代码，并由根目录的测试命令和其它测试一起执行。目前覆盖 lit-moveable、vue3-moveable 和 svelte-moveable。

#### Scenario: 根目录统一执行
- **WHEN** 在根目录构建全部包之后执行测试命令
- **THEN** lit-moveable、vue3-moveable、svelte-moveable 的浏览器测试和 react-moveable、helper 的测试一起执行，并全部通过

#### Scenario: 包装失效时失败
- **WHEN** lit-moveable、vue3-moveable 或 svelte-moveable 的产物中，属性（prop）、事件或方法的转发有一项失效
- **THEN** 测试失败，并能看到失败的测试名称

#### Scenario: 失败时保留截图
- **WHEN** 从根目录执行测试时有框架包装的浏览器测试失败
- **THEN** 失败测试的浏览器截图输出到与 story 测试相同的目录，CI 中作为流水线产物一并上传
