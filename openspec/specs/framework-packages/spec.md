# framework-packages Specification

## Purpose

定义本仓库对外提供哪些框架包，以及 Storybook 中示例代码覆盖哪些框架，作为后续新增或下线框架支持时的依据。

## Requirements

### Requirement: 受支持的框架包集合
仓库 SHALL 只包含以下工作区包：react-moveable、preact-moveable、croact-moveable、moveable（原生 JS）、lit-moveable、vue3-moveable、svelte-moveable，以及工具包 @moveable/helper。

#### Scenario: 工作区包清单
- **WHEN** 列出 pnpm 工作区中的所有包
- **THEN** 结果恰好是上述 8 个包（外加私有的根包），不包含 vue-moveable、ngx-moveable、snappable 或独立的 storybook 包

### Requirement: 不支持 Vue 2 与 Angular
仓库 MUST NOT 包含 Vue 2 或 Angular 的包装包、构建步骤、依赖或生成产物，构建流程也 MUST NOT 依赖任何仅为 Angular 服务的代码生成步骤。

#### Scenario: 构建不依赖 Angular 常量生成
- **WHEN** 执行全量构建
- **THEN** 流程中不包含从 react-moveable 产物生成 Angular inputs / outputs 常量的步骤，且构建成功

#### Scenario: 依赖树中没有 Angular 与 Vue 2 工具链
- **WHEN** 检查锁文件
- **THEN** 不存在 `@angular/*`、`@vue/cli-service`、`ng-packagr`、`vue-template-compiler` 等仅为 Vue 2 / Angular 服务的依赖

### Requirement: Storybook 示例代码只覆盖受支持框架
由 React story 自动转译生成的多框架示例代码，以及 Storybook 中展示的代码 tab，SHALL 只覆盖 React、原生 Script、Vue 3、Svelte、Lit（外加 CSS tab）。代码 tab 中展示的参数值 SHALL 与 story 当前的参数（controls）保持一致。

#### Scenario: 生成示例代码
- **WHEN** 开发者执行示例代码转译命令（bake）
- **THEN** 只生成 script、vue3、svelte、lit 目录，不生成 vue2 或 angular 目录

#### Scenario: 查看 story 的代码面板
- **WHEN** 在 Storybook 中打开任意带代码预览的 story
- **THEN** 代码 tab 中没有 "Vue2" 或 "Angular"，且其余 tab 正常显示

#### Scenario: 代码随参数更新
- **WHEN** 在 controls 中修改某个 story 的参数（例如切换 `draggable`、修改 `throttleDrag`）
- **THEN** React、Script、Vue3、Svelte、Lit 各个代码 tab 中对应的参数值同步变为新值，复制得到的代码也是新值

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
仓库 SHALL 为框架包装包提供在真实浏览器中运行的自动化测试。测试 SHALL 针对包的构建产物，也就是使用者实际安装的代码，并由根目录的测试命令和其它测试一起执行。目前覆盖 lit-moveable 和 vue3-moveable。

#### Scenario: 根目录统一执行
- **WHEN** 在根目录构建全部包之后执行测试命令
- **THEN** lit-moveable、vue3-moveable 的浏览器测试和 react-moveable、helper 的测试一起执行，并全部通过

#### Scenario: 包装失效时失败
- **WHEN** lit-moveable 或 vue3-moveable 的产物中，属性（prop）、事件或方法的转发有一项失效
- **THEN** 测试失败，并能看到失败的测试名称

#### Scenario: 失败时保留截图
- **WHEN** 从根目录执行测试时有框架包装的浏览器测试失败
- **THEN** 失败测试的浏览器截图输出到与 story 测试相同的目录，CI 中作为流水线产物一并上传
