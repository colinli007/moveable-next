## ADDED Requirements

### Requirement: 原生版切换目标和销毁时不残留控制框
原生 moveable（moveable）的控制框 SHALL 是创建时传入的父元素（`new Moveable(parentElement, options)` 的 `parentElement`）的子元素，坐标以这个父元素为基准。

一个原生 moveable 实例在 DOM 中 SHALL 只有它当前使用的控制框：单目标或无目标时是一个控制框，组（包括单独分组）时是组的控制框和其中每个目标的控制框。目标在单目标、多个目标、无目标之间切换时，之前使用的控制框 MUST 从 DOM 中移除。调用 `destroy()` 后，这个实例创建的控制框 MUST 全部从 DOM 中移除。父元素中不属于这个实例的子元素 MUST NOT 被移除或修改。

#### Scenario: 来回切换目标
- **WHEN** 创建原生 moveable 后，把 `target` 依次设为空数组、两个元素、空数组、两个元素、一个元素
- **THEN** 每一步之后，父元素中属于这个实例、不在另一个控制框内部的 `.moveable-control-box` 恰好一个，并且它就是当前模式的控制框（组模式下其中包含两个目标各自的控制框）

#### Scenario: 用选择器指定多个目标
- **WHEN** 用匹配多个元素的选择器作为 `target` 创建原生 moveable
- **THEN** 父元素中只有组的控制框（及其中各目标的控制框），没有隐藏的、或没有内容的控制框

#### Scenario: 销毁
- **WHEN** 在单目标和组之间切换过若干次之后调用 `destroy()`
- **THEN** 父元素中没有任何 `.moveable-control-box`，父元素原有的其它子元素仍然存在且没有变化

#### Scenario: 坐标基准不变
- **WHEN** 父元素带有定位偏移、缩放变换或滚动，在其中为父元素内的目标创建原生 moveable
- **THEN** 控制框围绕目标的连线与目标的边界重合，与修改之前相同

### Requirement: 设置 container 时控制框挂载后可见
React 组件、原生版和 Vue 3 组件设置了 `container` 选项时，控制框 SHALL 在挂载后可见，与不设置 `container` 时相同：首次渲染就有目标元素时，单目标的控制框、组的控制框和单独分组（`individualGroupable`）中每个目标的控制框 MUST NOT 停留在 `visibility: hidden`。设置 `container` 不改变控制框的坐标计算。

#### Scenario: React 组件首次渲染就有目标和 container
- **WHEN** React 组件第一次渲染时就传入一个已存在的目标元素和 `container`
- **THEN** 挂载后控制框可见，连线与目标的边界重合

#### Scenario: 单独分组与 container
- **WHEN** 设置 `container`，开启 `individualGroupable`，目标是两个元素（用选择器或元素数组）
- **THEN** 两个目标各自的控制框都可见

#### Scenario: Vue 组件中的单独分组
- **WHEN** Vue 组件开启 `individualGroupable`，以选择器指定多个目标
- **THEN** 每个目标的控制框都可见（Vue 组件总是向原生版传入 `container`）

## MODIFIED Requirements

### Requirement: vue3-moveable 的行为
vue3-moveable SHALL 以默认导出（以及具名导出 `VueMoveable`）提供一个 Vue 组件，把原生 moveable 的选项、事件和方法暴露给 Vue：
- 选项是组件的 prop（如 `:draggable`、`:target`）。
- 事件用 moveable 的事件名 emit（如 `@drag`），参数是 moveable 事件参数的副本。组件上监听 moveable 事件名的监听器（如 `@click`、`@drag`）SHALL 只接收 moveable 的事件，MUST NOT 同时被注册为根元素上同名的原生 DOM 事件监听器。
- 方法可以通过组件 ref 直接调用。

组件的根元素 SHALL 是一个不产生盒子（`display: contents`）的元素，moveable 的控制框渲染在其中；控制框的坐标以组件所在的父元素为基准，与在这个父元素中直接创建原生 moveable 相同，使用者显式设置的 `container` 优先。根元素中 SHALL 只有当前使用的控制框，与「原生版切换目标和销毁时不残留控制框」相同。取得控制框元素的方式是通过组件 ref 调用 `getControlBoxElement()`。vue3-moveable SHALL 同时重新导出原生 moveable 的全部具名导出，SHALL 把 Vue 3.5 声明为 peerDependency，它的类型声明 SHALL 让使用者对 prop、事件参数和实例方法得到类型检查。

#### Scenario: 渲染控制框
- **WHEN** 挂载一个设置了 `target` 的组件
- **THEN** 组件的根元素不产生盒子，其中是指向该目标的 moveable 控制框，包含围绕目标的连线，并且就是 `getControlBoxElement()` 返回的元素

#### Scenario: 坐标以组件的父元素为基准
- **WHEN** 组件所在的父元素带有定位偏移或缩放变换，挂载一个以父元素内的元素为 `target` 的组件
- **THEN** 控制框围绕目标的连线与目标的边界重合

#### Scenario: 切换目标时不残留控制框
- **WHEN** 组件挂载后，把 `target` prop 在一个元素、两个元素、空数组之间来回修改
- **THEN** 每次修改生效后，根元素中不在另一个控制框内部的 `.moveable-control-box` 恰好一个

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
- **THEN** 内部的 moveable 被销毁，DOM 中不再有这个组件的控制框

#### Scenario: 类型声明
- **WHEN** 使用者在 TypeScript 中以包的类型声明为准使用组件：传入 prop、监听事件、通过实例调用方法
- **THEN** prop 按 moveable 的选项类型检查（类型不符时报错），事件监听函数的参数是对应的 moveable 事件类型，实例上有 moveable 的方法

#### Scenario: 依赖 Vue 3.5
- **WHEN** 查看 vue3-moveable 的 `package.json`
- **THEN** `peerDependencies` 中声明了 `vue: ^3.5.0`，测试运行在 Vue 3.5 上

### Requirement: 框架包装的浏览器测试
仓库 SHALL 为框架包装包提供在真实浏览器中运行的自动化测试。测试 SHALL 针对包的构建产物，也就是使用者实际安装的代码，并由根目录的测试命令和其它测试一起执行。目前覆盖 moveable（原生版）和 vue3-moveable。

#### Scenario: 根目录统一执行
- **WHEN** 在根目录构建全部包之后执行测试命令
- **THEN** moveable 和 vue3-moveable 的浏览器测试与 react-moveable、helper 的测试一起执行，并全部通过

#### Scenario: 包装失效时失败
- **WHEN** vue3-moveable 的产物中，属性（prop）、事件或方法的转发有一项失效
- **THEN** 测试失败，并能看到失败的测试名称

#### Scenario: 原生版残留控制框时失败
- **WHEN** moveable 的产物在切换目标或 `destroy()` 后在 DOM 中留下不再使用的控制框
- **THEN** moveable 的浏览器测试失败，并能看到失败的测试名称

#### Scenario: 失败时保留截图
- **WHEN** 从根目录执行测试时有框架包装的浏览器测试失败
- **THEN** 失败测试的浏览器截图输出到与 story 测试相同的目录，CI 中作为流水线产物一并上传
