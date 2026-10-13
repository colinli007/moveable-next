## ADDED Requirements

### Requirement: lit-moveable 的行为
lit-moveable SHALL 提供 `<lit-moveable>` 自定义元素，把原生 moveable 的选项、事件和方法暴露给 Lit：选项是元素的属性（`draggable` 与 HTML 自带的特性同名，改用 `litDraggable`，`mvDraggable` 是已弃用的别名）；事件以 `lit` 前缀加事件名的 `CustomEvent` 派发（如 `litDrag`），事件参数放在 `detail` 中；moveable 的方法可以直接在元素上调用。lit-moveable SHALL 把 Lit 3 声明为 peerDependency。

#### Scenario: 渲染控制框
- **WHEN** 在页面中插入一个设置了 `target` 的 `<lit-moveable>` 元素
- **THEN** 元素渲染为指向该目标的 moveable 控制框，包含围绕目标的连线

#### Scenario: 首次渲染后修改属性
- **WHEN** 元素渲染完成之后，再修改一个选项属性（包括 `litDraggable`）
- **THEN** 内部的 moveable 使用新的值：例如把 `rotatable` 设为 `true` 后出现旋转控制点，把 `litDraggable` 设为 `false` 后拖动目标不再派发拖动事件

#### Scenario: 拖动时派发事件
- **WHEN** `litDraggable` 为 `true` 时用鼠标拖动目标
- **THEN** 元素依次派发 `litDragStart`、`litDrag`、`litDragEnd`，`litDrag` 的 `detail` 中有表示新位置的 `transform`

#### Scenario: 调用方法
- **WHEN** 目标没有 transform 时，在元素上调用 moveable 的方法 `getRect()`
- **THEN** 返回目标的矩形信息，其中 `offsetWidth`、`offsetHeight` 等于目标元素的尺寸

#### Scenario: 移除时销毁
- **WHEN** 把元素从文档中移除
- **THEN** 内部的 moveable 被销毁，元素中不再有控制框的连线和控制点

#### Scenario: 依赖 Lit 3
- **WHEN** 查看 lit-moveable 的 `package.json`
- **THEN** `peerDependencies` 中声明了 `lit: ^3.0.0`，测试运行在 Lit 3 上

### Requirement: 框架包装的浏览器测试
仓库 SHALL 为框架包装包提供在真实浏览器中运行的自动化测试。测试 SHALL 针对包的构建产物，也就是使用者实际安装的代码，并由根目录的测试命令和其它测试一起执行。目前覆盖 lit-moveable。

#### Scenario: 根目录统一执行
- **WHEN** 在根目录构建全部包之后执行测试命令
- **THEN** lit-moveable 的浏览器测试和 react-moveable、helper 的测试一起执行，并全部通过

#### Scenario: 包装失效时失败
- **WHEN** lit-moveable 的产物中，属性、事件或方法的转发有一项失效
- **THEN** 测试失败，并能看到失败的测试名称

#### Scenario: 失败时保留截图
- **WHEN** 从根目录执行测试时有框架包装的浏览器测试失败
- **THEN** 失败测试的浏览器截图输出到与 story 测试相同的目录，CI 中作为流水线产物一并上传
