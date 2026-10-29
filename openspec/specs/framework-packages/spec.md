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
