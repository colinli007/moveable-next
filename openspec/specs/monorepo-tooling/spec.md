# monorepo-tooling Specification

## Purpose

定义本仓库开发工具链对开发者与 CI 的契约：用什么运行时、如何安装、如何按依赖顺序构建、如何运行交互测试，以及 demo 站点如何构建与部署。

## Requirements

### Requirement: 固定的 Node 运行时版本
仓库 SHALL 以 Node 22.20.0 作为唯一受支持的开发与 CI 运行时，并在仓库根目录以机器可读的方式声明该版本，使版本管理工具与包管理器能自动识别。

#### Scenario: 版本管理工具自动切换
- **WHEN** 开发者在仓库根目录执行 `nvm use`
- **THEN** 切换到 Node 22.20.0，无需手动指定版本号

#### Scenario: CI 使用相同版本
- **WHEN** CI 流水线启动
- **THEN** 使用与仓库声明一致的 Node 22.20.0

### Requirement: 单一 pnpm 工作区安装
仓库 SHALL 使用 pnpm 作为唯一包管理器，并且只有一份位于根目录的锁文件；在根目录执行一次安装 MUST 为所有工作区包装好依赖并链接内部包。

#### Scenario: 根目录一次安装
- **WHEN** 开发者在干净的克隆中于根目录执行 `pnpm install --frozen-lockfile`
- **THEN** 安装成功，所有工作区包的依赖就绪，无需进入子目录再次安装

#### Scenario: 不存在其它锁文件
- **WHEN** 检查仓库被版本控制的文件
- **THEN** 只存在根目录的 `pnpm-lock.yaml`，不存在任何 `yarn.lock` 或 `package-lock.json`

#### Scenario: 指定 pnpm 版本
- **WHEN** 启用了 Corepack 的开发者在根目录执行 pnpm 命令
- **THEN** 使用根 `package.json` 声明的 pnpm 版本

### Requirement: 依赖显式声明
每个工作区包 MUST 在自己的 `package.json` 中声明它直接使用的所有第三方包，包括：源码、构建配置、Storybook 配置中 import / require 的包，以及自身脚本直接调用的可执行文件所属的包。根目录脚本和根目录配置文件（如 `jsdoc.json`）用到的包 MUST 在根 `package.json` 中声明。在 pnpm 默认的非提升（isolated）布局下，任何包都 MUST NOT 依赖依赖提升才能解析模块或找到可执行文件。

#### Scenario: 严格布局下构建与测试
- **WHEN** 在 pnpm 默认布局（未开启 `shamefully-hoist`、未改为 `node-linker=hoisted`、未配置 `public-hoist-pattern`）下执行构建与 Storybook 测试
- **THEN** 不出现因未声明依赖导致的 "Cannot find module" 错误

#### Scenario: 脚本调用的可执行文件可用
- **WHEN** 任一工作区包执行自己的 `build` / `declaration` 脚本，或在根目录执行代码检查命令
- **THEN** 不出现 `command not found`，且调用的是脚本所属的包（根目录脚本为根 `package.json`）自己声明的版本，而不是靠其它位置兜底

#### Scenario: 配置文件引用的路径有效
- **WHEN** 在根目录执行文档生成（`doc`）
- **THEN** `jsdoc.json` 中引用的 `node_modules` 路径都存在，文档正常生成

### Requirement: 内部包使用本地源
工作区包之间的依赖 MUST 解析到仓库内对应包，而不是 npm 上同名的已发布版本。

#### Scenario: 修改上游包后下游可见
- **WHEN** 修改并重新构建 react-moveable，然后构建 moveable
- **THEN** moveable 的产物基于本地刚构建的 react-moveable，而不是 npm 上的 react-moveable

### Requirement: 按依赖顺序构建全部包
仓库 SHALL 提供一条根命令，按包之间的依赖拓扑顺序构建所有可发布的工作区包：被依赖的包先于依赖它的包完成构建。

#### Scenario: 全量构建
- **WHEN** 开发者在根目录执行全量构建命令
- **THEN** react-moveable 先构建，croact-moveable 与 preact-moveable 在其后，moveable 在 croact-moveable 之后，lit-moveable、vue3-moveable、svelte-moveable 在 moveable 之后，helper 独立构建，且全部成功产出 `dist`

#### Scenario: 构建产物与迁移前一致
- **WHEN** 替换构建工具或升级 TypeScript 之后执行全量构建，并与替换前保存的产物基线比较
- **THEN** 以下各项与基线一致：每个产物的导出名集合，CJS 产物 `require` 后的形状，外部模块清单，UMD 产物内联的包和全局变量名，头部注释，`declaration/` 的文件列表。不一致的地方必须逐项说明原因并记录在对应 change 中，比如语法目标改变、新增 sourcemap、修正依赖声明

#### Scenario: 构建过程中没有未解析的模块
- **WHEN** 执行全量构建
- **THEN** 构建输出中不出现「无法解析的 import」或「依赖未声明、被当作外部模块」之类的警告，没有例外

#### Scenario: moveable 的 UMD 产物自包含
- **WHEN** 检查 `packages/moveable/dist/moveable.js` 与 `moveable.min.js`
- **THEN** 满足 `library-build` 中「UMD 产物自包含」的要求：croact 与 react-moveable 的代码已被内联，产物中不存在对外部模块或依赖全局变量的引用

### Requirement: 代码检查
仓库 SHALL 提供一条根命令，对 6 个库包（react-moveable、helper、croact-moveable、preact-moveable、moveable、lit-moveable）`src` 下的全部 TypeScript 源码执行静态检查（lint）。检查只在没有错误、也没有警告时通过；检查 MUST NOT 依赖构建产物，也 MUST NOT 被任何包的构建命令隐式执行。

#### Scenario: 检查范围
- **WHEN** 开发者在根目录执行代码检查命令
- **THEN** 6 个库包 `src` 下的 `.ts`、`.tsx` 文件都被检查；`dist`、`declaration`、stories 和其它包的文件不被检查

#### Scenario: 当前代码通过检查
- **WHEN** 在没有改动的代码上执行代码检查命令
- **THEN** 命令以 0 退出，输出中没有错误和警告，也没有关于配置或插件本身的提示（例如未指定 React 版本）

#### Scenario: 发现问题时失败
- **WHEN** 任一库包的源码中出现违反规则的代码（例如未使用的 import，或缩进不是 4 个空格）
- **THEN** 命令以非 0 退出，输出中能看到文件路径、行号和规则名

#### Scenario: 不需要先构建
- **WHEN** 在全新克隆中安装依赖后，不执行任何构建就执行代码检查命令
- **THEN** 检查正常完成，结果与构建之后执行相同

### Requirement: 包的构建不包含代码检查
各库包的构建命令 SHALL 只负责生成产物和类型声明，MUST NOT 执行代码检查；代码检查由「代码检查」requirement 中的根命令单独负责。

#### Scenario: 存在 lint 问题时构建
- **WHEN** 某个库包的源码存在 lint 问题但能正常编译，执行该包的构建命令
- **THEN** 构建成功并产出 `dist` 和 `declaration`

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

### Requirement: demo 站点构建与部署到自有仓库
仓库 SHALL 保留 demo 站点的构建与部署能力，复制规则与迁移前一致；部署 MUST 只推送到本仓库自己的 `origin` 远程。

#### Scenario: 部署时复制产物
- **WHEN** 执行 deploy 命令
- **THEN** 先清空并重建每个目标目录，再复制：`packages/moveable/dist` 到 `demo/release/<moveable 版本>/dist` 和 `demo/release/latest/dist`，`packages/helper/dist` 到 `demo/helper/release/<moveable 版本>/dist` 和 `demo/helper/release/latest/dist`，`doc` 到 `demo/release/<moveable 版本>/doc` 和 `demo/release/latest/doc`（三条规则都使用 moveable 包的版本号，与迁移前一致）

#### Scenario: 推送目标
- **WHEN** deploy 命令完成复制后推送 demo，或单独执行 demo 推送命令
- **THEN** `demo` 目录以增量方式（不清空分支已有文件）推送到 `origin` 远程的 gh-pages 分支根目录，不会推送到 `upstream`

### Requirement: 本阶段不提供 npm 发布入口
在发布到 `@moveable-next` 作用域的方案确定之前，仓库 MUST NOT 提供任何会以现有（属于上游作者的）包名执行 npm 发布的脚本。

#### Scenario: 根脚本中没有发布命令
- **WHEN** 查看根与各包的 `package.json` 脚本
- **THEN** 不存在执行 `npm publish`、`pnpm publish`、lerna 发布或 lerna-helper 发布的脚本

### Requirement: CI 执行全部自动化检查
CI SHALL 在每次推送和 pull request 时执行仓库中全部自动化检查：库包源码的代码检查、所有可发布包的全量构建、react-moveable 的 story 交互测试、helper 的单元测试、story 代码的类型检查。其中任何一项失败，流水线 SHALL 失败。

#### Scenario: 单元测试失败
- **WHEN** helper 的某个单元测试失败
- **THEN** CI 流水线失败，并能在日志中看到失败的测试名称

#### Scenario: story 类型错误
- **WHEN** 某个 story 文件存在 TypeScript 类型错误
- **THEN** CI 流水线失败，即使这个 story 在浏览器中仍然能够渲染

#### Scenario: 构建失败
- **WHEN** 任一可发布包的构建或类型声明生成失败
- **THEN** CI 流水线失败，并能在日志中看到失败的包名

#### Scenario: 代码检查失败
- **WHEN** 任一库包的源码存在 lint 错误或警告
- **THEN** CI 流水线失败，并能在日志中看到对应的文件路径和规则名

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
