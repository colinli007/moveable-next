## MODIFIED Requirements

### Requirement: Storybook 交互测试可在受支持的运行时运行
react-moveable 的 Storybook 开发服务、静态构建与交互测试 SHALL 能在 Node 22.20.0 下运行，且 MUST NOT 依赖任何旧版 OpenSSL 兼容参数。交互测试 SHALL 覆盖所有 story 在 React 和 Vue 两种框架下的渲染：每个 story 在每种框架下都在真实浏览器中以固定视口尺寸完整渲染，并各自作为一个测试计入结果；带交互脚本（play）的 story 还 SHALL 在两种框架下执行同一组断言。只有 React 版的 story（framework-packages 中列出的例外）在 Vue 下不计入。

Vue 模式依赖可发布包的构建产物，交互测试 SHALL 在全部包构建之后执行。React 模式 MUST NOT 依赖任何包的构建产物：在没有构建过的检出上启动 Storybook，React 模式下的 story SHALL 能正常渲染。

#### Scenario: 本地启动 Storybook
- **WHEN** 开发者在根目录执行 Storybook 启动命令
- **THEN** Storybook 在 6006 端口启动，启动过程中没有 preset 或 addon 加载失败的错误，也不需要设置 legacy OpenSSL 参数

#### Scenario: 未构建时 React 模式可用
- **WHEN** 在没有执行过任何包构建的干净检出上安装依赖并启动 Storybook，以 React 模式浏览 story
- **THEN** story 正常渲染，浏览器中没有模块解析失败的错误

#### Scenario: 所有 story 都真实渲染
- **WHEN** 执行交互测试
- **THEN** 每个 story 在 React 下、每个有 Vue 版的 story 在 Vue 下都被完整渲染，并各自作为一个测试计入结果，不存在为了测试而渲染为空的 story；测试结果中能区分是哪种框架下的测试

#### Scenario: 交互断言不减少
- **WHEN** 执行交互测试
- **THEN** 迁移前所有带 play 的 story 仍然带有等价的断言，并且在 React 和 Vue 下都全部通过

#### Scenario: 只有 React 版的 story
- **WHEN** 执行交互测试
- **THEN** framework-packages 中列为例外的 story 只在 React 下计入结果，在 Vue 下既不计为通过也不计为失败

#### Scenario: CI 跑交互测试
- **WHEN** CI 执行 Storybook 测试任务
- **THEN** 所有测试通过；迁移前就存在、经用户确认后逐条登记在本场景中的 story 渲染问题除外。登记的问题在测试结果中显示为跳过，不计为通过：
  - 「Snap & Bound / Snap Elements (group)」在 Vue 下：原生版用选择器指定多个目标时，先按单目标渲染再切换为组，第一次渲染的控制框隐藏后留在 DOM 中且排在最前，play 取到的是这个控制框。原生版修复后删除这一条。

#### Scenario: 测试失败时保留截图
- **WHEN** CI 中有测试失败
- **THEN** 每个失败测试对应的浏览器截图都输出到同一个目录，并作为流水线产物上传，可供下载比对；能从截图的路径或文件名区分是哪种框架下的测试

### Requirement: CI 执行全部自动化检查
CI SHALL 在每次推送和 pull request 时执行仓库中全部自动化检查：库包源码的代码检查、所有可发布包的全量构建、react-moveable 的 story 交互测试（React 和 Vue 两种框架）、helper 的单元测试、框架包装的浏览器测试、story 代码的类型检查（包括 Vue 示例的单文件组件）、API 文档的生成。其中任何一项失败，流水线 SHALL 失败。

#### Scenario: 单元测试失败
- **WHEN** helper 的某个单元测试失败
- **THEN** CI 流水线失败，并能在日志中看到失败的测试名称

#### Scenario: story 类型错误
- **WHEN** 某个 story 文件存在 TypeScript 类型错误
- **THEN** CI 流水线失败，即使这个 story 在浏览器中仍然能够渲染

#### Scenario: Vue 示例类型错误
- **WHEN** 某个 Vue 示例存在类型错误，例如给 moveable 组件传入类型不符的 prop，或在事件监听函数中访问事件参数上不存在的属性
- **THEN** CI 流水线失败，并能在日志中看到出错的 `.vue` 文件和位置，即使这个示例在浏览器中仍然能够渲染

#### Scenario: 构建失败
- **WHEN** 任一可发布包的构建或类型声明生成失败
- **THEN** CI 流水线失败，并能在日志中看到失败的包名

#### Scenario: 代码检查失败
- **WHEN** 任一库包的源码存在 lint 错误或警告
- **THEN** CI 流水线失败，并能在日志中看到对应的文件路径和规则名

#### Scenario: 框架包装测试失败
- **WHEN** vue3-moveable 的某个测试失败
- **THEN** CI 流水线失败，并能在日志中看到失败的测试名称

#### Scenario: Vue 模式的交互测试失败
- **WHEN** 某个 story 在 React 下通过、在 Vue 下 play 断言失败
- **THEN** CI 流水线失败，并能在日志中看到失败的 story 以及它是 Vue 下的测试

#### Scenario: API 文档生成失败
- **WHEN** 源码注释使 `pnpm doc` 产生警告或错误
- **THEN** CI 流水线失败，并能在日志中看到出错的声明或文件位置，以及原因
