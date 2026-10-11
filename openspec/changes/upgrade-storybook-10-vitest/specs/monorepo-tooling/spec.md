## MODIFIED Requirements

### Requirement: Storybook 交互测试可在受支持的运行时运行
react-moveable 的 Storybook 开发服务、静态构建与交互测试 SHALL 能在 Node 22.20.0 下运行，且 MUST NOT 依赖任何旧版 OpenSSL 兼容参数。交互测试 SHALL 覆盖所有 story：每个 story 都在真实浏览器中以固定视口尺寸完整渲染，并作为一个测试计入结果；带交互脚本（play）的 story 还 SHALL 执行其中的断言。

#### Scenario: 本地启动 Storybook
- **WHEN** 开发者在根目录执行 Storybook 启动命令
- **THEN** Storybook 在 6006 端口启动，启动过程中没有 preset 或 addon 加载失败的错误，也不需要设置 legacy OpenSSL 参数

#### Scenario: 所有 story 都真实渲染
- **WHEN** 执行交互测试
- **THEN** 每个 story 都被完整渲染并作为一个测试计入结果，不存在为了测试而渲染为空的 story

#### Scenario: 交互断言不减少
- **WHEN** 执行交互测试
- **THEN** 迁移前所有带 play 的 story 仍然带有等价的断言，并且全部通过

#### Scenario: CI 跑交互测试
- **WHEN** CI 执行 Storybook 测试任务
- **THEN** 所有测试通过；迁移前就存在、经用户确认后逐条登记在本场景中的 story 渲染问题除外（目前没有）

#### Scenario: 测试失败时保留截图
- **WHEN** CI 中有测试失败
- **THEN** 每个失败测试对应的浏览器截图都输出到同一个目录，并作为流水线产物上传，可供下载比对

## ADDED Requirements

### Requirement: CI 执行全部自动化检查
CI SHALL 在每次推送和 pull request 时执行仓库中全部自动化检查：react-moveable 的 story 交互测试、helper 的单元测试、story 代码的类型检查。其中任何一项失败，流水线 SHALL 失败。

#### Scenario: 单元测试失败
- **WHEN** helper 的某个单元测试失败
- **THEN** CI 流水线失败，并能在日志中看到失败的测试名称

#### Scenario: story 类型错误
- **WHEN** 某个 story 文件存在 TypeScript 类型错误
- **THEN** CI 流水线失败，即使这个 story 在浏览器中仍然能够渲染

### Requirement: 发布的 Storybook 不自动执行交互
静态构建并发布的 Storybook SHALL 只展示 story 的初始状态，MUST NOT 在浏览时自动执行 play 中的拖拽、缩放等模拟操作。开发模式下 SHALL 自动执行 play，便于调试。交互测试 SHALL 始终执行 play，不受这一规则影响。

#### Scenario: 浏览发布的 Storybook
- **WHEN** 用户在发布的 Storybook 中打开一个带 play 的 story
- **THEN** story 保持初始状态，目标元素没有被自动拖动或变形，用户可以自己操作

#### Scenario: 开发模式调试交互
- **WHEN** 开发者在本地开发模式中打开一个带 play 的 story
- **THEN** play 自动执行，其每一步和断言结果都可以在交互面板中查看

### Requirement: 测试专用 story 默认不在侧边栏显示
只为测试而存在、不适合作为示例展示的 story SHALL 在开发模式和发布的 Storybook 中都默认不显示在侧边栏，但 SHALL 能通过侧边栏的筛选功能显示出来，并且 SHALL 照常参与交互测试。

#### Scenario: 默认隐藏
- **WHEN** 打开 Storybook，不使用任何筛选
- **THEN** 侧边栏中没有测试专用的 story

#### Scenario: 仍然被测试
- **WHEN** 执行交互测试
- **THEN** 测试专用的 story 与其它 story 一样被渲染并执行 play，不会出现无法加载 story 的错误

### Requirement: Storybook 不向外部统计服务上报
本仓库的 Storybook，包括浏览器中的页面和启动、构建它的命令行工具，MUST NOT 向任何第三方统计、分析或遥测服务发送数据。

#### Scenario: 浏览 Storybook 页面
- **WHEN** 用户打开本仓库构建的 Storybook（开发模式或发布版本）并浏览 story
- **THEN** 页面不会向 Google Analytics 或其它统计服务发出请求

#### Scenario: 启动或构建 Storybook
- **WHEN** 开发者或 CI 执行 Storybook 的启动或构建命令
- **THEN** 命令行工具不发送使用统计或遥测数据
