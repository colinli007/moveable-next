## ADDED Requirements

### Requirement: 按需组合 able
react-moveable（`@moveable-next/react`）、moveable（`@moveable-next/vanilla`）和 vue3-moveable（`@moveable-next/vue3`）SHALL 各自导出 `makeMoveable(ables)`，返回只包含这些 able 的本包 Moveable：React 版返回 React 组件，原生版返回可以 `new Moveable(parentElement, options)` 的类，Vue 3 版返回 Vue 组件。返回值的用法与本包默认导出相同，选项、事件和方法以组合的 able（以及每个 Moveable 都有的默认 able）为准。三个包的 `makeMoveable` SHALL 接受同样的泛型参数：组合的 able 的选项和事件类型（如 `DraggableProps & ResizableProps & RotatableProps`），返回值的选项、事件参数和方法按它做类型检查。

原生版和 Vue 3 版 SHALL 导出与 React 版相同的 able 对象：`Draggable`、`Resizable`、`Scalable`、`Rotatable`、`Warpable`、`Clippable`、`EdgeDraggable`、`Snappable`、`Roundable`、`Pinchable`。Vue 3 版导出的 `makeMoveable` 是返回 Vue 组件的那个，不是原生版的。原生版的 UMD 产物中，`makeMoveable` 和这些 able SHALL 挂在全局的默认导出上。

使用者的打包工具 SHALL 能删掉没有组合的 able：只引入 `makeMoveable` 和部分 able（不引入默认导出）时，打包结果 MUST NOT 包含没有组合的 able。默认导出的行为与之前相同。

#### Scenario: 原生版只组合三个 able
- **WHEN** 用 `makeMoveable([Draggable, Resizable, Rotatable])`（原生版）创建类，`new` 一个实例并以一个元素为目标
- **THEN** 控制框可以拖动、缩放、旋转，对应事件（如 `drag`、`resize`、`rotate`）和 `render` 事件都会触发；没有组合的 able（如 `scalable`）不生效

#### Scenario: Vue 3 版只组合三个 able
- **WHEN** 在 Vue 组件中使用 `makeMoveable([Draggable, Resizable, Rotatable])`（从 `@moveable-next/vue3` 导入）返回的组件
- **THEN** 它像默认组件一样接受 prop、emit 事件、可以通过 ref 调用方法，只有这三个 able 及默认 able 生效

#### Scenario: 打包时删掉没有组合的 able
- **WHEN** 用 esbuild 或 rolldown 打包一段只引入某个包的 `makeMoveable` 和 `Draggable`、`Resizable`、`Rotatable` 的代码
- **THEN** 打包结果中没有 Snappable、Scalable、Warpable 等没有组合的 able，体积明显小于引入默认导出时

#### Scenario: 默认导出仍是类
- **WHEN** 使用者把 React 版或原生版的默认导出用作类型（如 `useRef<Moveable>()`、`InstanceType<typeof Moveable>`）或继承它
- **THEN** 类型检查通过，与之前相同

#### Scenario: UMD
- **WHEN** 在页面中通过 `<script>` 加载原生版的 UMD 产物
- **THEN** 可以使用 `new (Moveable.makeMoveable([Moveable.Draggable]))(parentElement, { target, draggable: true })`

## MODIFIED Requirements

### Requirement: Storybook 示例提供 React 和 Vue 3 两个版本
Storybook SHALL 在工具栏提供框架切换，选项是 React 和 Vue，默认是 React。切换框架 SHALL 只改变 story 渲染的 App 和代码面板显示的代码：story 的 id、侧边栏位置、参数（controls）和交互脚本（play）在两种模式下相同，参数在两种模式下都实时生效。

除下面列出的例外，每个 story SHALL 同时有 React 版和 Vue 3 版的 App。Vue 3 版 SHALL 是使用 `@moveable-next/vue3` 的 Vue 单文件组件，实现与 React 版相同的示例：渲染出与 React 版相同的目标元素结构和 moveable 配置，使同一组 play 断言在两种模式下都成立。缺少 Vue 3 版的 story（例外除外）MUST 使交互测试失败，在 Storybook 中所在的 story 文件 MUST 加载出错；两处的错误信息都 SHALL 写明缺少的是哪个 App。

例外（只有 React 版的 story）：目前没有。

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
- **WHEN** 某个 story 被列为例外（打上 `react-only` 并声明没有 Vue 版），在 Vue 模式下打开它
- **THEN** 画布中显示 Vue 3 版不支持这个示例的说明，没有脚本错误，代码面板中没有 Vue tab；Vue 的测试不计入这个 story

#### Scenario: Tree Shaking 示例有 Vue 版
- **WHEN** Vue 模式下打开「Support Tree Shaking / Use only Draggable, Resizable, Rotatable」
- **THEN** 画布渲染用 `@moveable-next/vue3` 的 `makeMoveable` 组合三个 able 的 Vue 示例，代码面板中有 Vue tab，目标可以拖动、缩放、旋转
