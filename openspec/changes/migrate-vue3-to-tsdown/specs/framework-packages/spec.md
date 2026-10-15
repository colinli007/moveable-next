## ADDED Requirements

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

## MODIFIED Requirements

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

### Requirement: 不支持 Vue 2 与 Angular
仓库 MUST NOT 包含 Vue 2 或 Angular 的包装包、构建步骤、依赖或生成产物，构建流程也 MUST NOT 依赖任何仅为 Angular 服务的代码生成步骤。

#### Scenario: 构建不依赖 Angular 常量生成
- **WHEN** 执行全量构建
- **THEN** 流程中不包含从 react-moveable 产物生成 Angular inputs / outputs 常量的步骤，且构建成功

#### Scenario: 依赖树中没有 Angular 与 Vue 2 工具链
- **WHEN** 检查锁文件
- **THEN** 不存在 `@angular/*`、`@vue/cli-service`、`ng-packagr`、`vue-template-compiler` 等仅为 Vue 2 / Angular 服务的依赖
