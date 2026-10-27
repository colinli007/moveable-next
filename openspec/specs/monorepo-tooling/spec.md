# monorepo-tooling Specification

## Purpose

定义本仓库开发工具链对开发者与 CI 的契约：用什么运行时、如何安装、如何按依赖顺序构建、如何运行交互测试，以及 demo 站点如何构建与部署。

## Requirements

### Requirement: 固定的 Node 运行时版本
仓库 SHALL 以 Node 22.20.0 作为唯一受支持的开发与 CI 运行时，并在仓库根目录以机器可读的方式声明该版本，使版本管理工具与包管理器能自动识别。声明 Node 类型定义的包 MUST 使用与该运行时相同大版本的类型定义，使类型检查不会接受运行时中不存在的 API。

#### Scenario: 版本管理工具自动切换
- **WHEN** 开发者在仓库根目录执行 `nvm use`
- **THEN** 切换到 Node 22.20.0，无需手动指定版本号

#### Scenario: CI 使用相同版本
- **WHEN** CI 流水线启动
- **THEN** 使用与仓库声明一致的 Node 22.20.0

#### Scenario: Node 类型定义与运行时一致
- **WHEN** 检查锁文件中解析出的 `@types/node`
- **THEN** 只有 22.x 一个大版本

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
每个工作区包 MUST 在自己的 `package.json` 中声明它直接使用的所有第三方包，包括：源码、构建配置、Storybook 配置中 import / require 的包，以及自身脚本直接调用的可执行文件所属的包。根目录脚本和根目录配置文件（如 `typedoc.json`）用到的包 MUST 在根 `package.json` 中声明。在 pnpm 默认的非提升（isolated）布局下，任何包都 MUST NOT 依赖依赖提升才能解析模块或找到可执行文件。反过来，包 MUST NOT 声明它没有使用的依赖。每个声明的 dependency / devDependency 都要满足下列之一：
- 被这个包的源码、配置、脚本使用（根目录包括 `typedoc.json` 这类配置文件）；
- 是这些被使用的包所要求的 peer；
- 是这个包自己的 peerDependency 在开发时安装的版本。

#### Scenario: 严格布局下构建与测试
- **WHEN** 在 pnpm 默认布局（未开启 `shamefully-hoist`、未改为 `node-linker=hoisted`、未配置 `public-hoist-pattern`）下执行构建与 Storybook 测试
- **THEN** 不出现因未声明依赖导致的 "Cannot find module" 错误

#### Scenario: 脚本调用的可执行文件可用
- **WHEN** 任一工作区包执行自己的 `build` / `declaration` 脚本，或在根目录执行代码检查命令
- **THEN** 不出现 `command not found`，且调用的是脚本所属的包（根目录脚本为根 `package.json`）自己声明的版本，而不是靠其它位置兜底

#### Scenario: 配置文件引用的路径有效
- **WHEN** 在根目录执行文档生成（`doc`）
- **THEN** `typedoc.json` 引用的入口文件和 tsconfig 都存在，入口文件 import 的源码都能解析，文档正常生成

#### Scenario: 没有多余的依赖声明
- **WHEN** 从任一工作区包的 `package.json` 中删除一个不属于后两类（peer）的 dependency 或 devDependency，然后重新安装
- **THEN** 这个包的构建、类型检查、测试、文档生成，或者它的某个脚本至少有一项失败

### Requirement: 共用依赖的版本只声明一处
被两个及以上工作区包声明的第三方依赖（dependencies 或 devDependencies），其版本范围 MUST 只写在工作区的一处共享位置，各包引用这一处，而不是各自写版本范围。peerDependencies 和内部包之间的依赖不在此列。

#### Scenario: 没有重复的版本范围
- **WHEN** 检查所有工作区包的 `package.json`
- **THEN** 不存在同一个第三方依赖在两个包的 dependencies 或 devDependencies 中各写一个版本范围

#### Scenario: 出现重复时检查失败
- **WHEN** 某个第三方依赖在两个包中各写了一个版本范围，然后在根目录执行代码检查命令
- **THEN** 检查失败，并在输出中给出依赖名和对应的包名

#### Scenario: 升级共用依赖
- **WHEN** 修改共享位置中某个依赖的版本范围，然后在根目录安装
- **THEN** 所有声明它的包都解析到新版本，不需要修改任何包的 `package.json`

#### Scenario: 必须一致的版本
- **WHEN** 检查锁文件中的 `vitest` 与 `@vitest/browser-playwright`
- **THEN** 两者是同一个版本，并且各只有一个版本

### Requirement: 依赖覆盖写明理由
仓库 MUST 只在上游包的依赖声明有误、并且影响安装、构建、测试或类型检查时，才覆盖依赖的解析结果或声明（pnpm 的 overrides、packageExtensions、peerDependencyRules 等）。每一条覆盖 MUST 附注释，写明修正的是哪个包的什么问题，以及什么情况下可以删除。

#### Scenario: 每条覆盖都有注释
- **WHEN** 查看 `pnpm-workspace.yaml` 中的覆盖条目
- **THEN** 每一条都有注释，写明针对的包、问题和删除条件

#### Scenario: 覆盖都在起作用
- **WHEN** 删除任意一条覆盖并重新解析依赖
- **THEN** 锁文件的解析结果发生变化，或者注释所写的问题重新出现

### Requirement: 内部包使用本地源
工作区包之间的依赖 MUST 解析到仓库内对应包，而不是 npm 上同名的已发布版本。

#### Scenario: 修改上游包后下游可见
- **WHEN** 修改并重新构建 react-moveable，然后构建 moveable
- **THEN** moveable 的产物基于本地刚构建的 react-moveable，而不是 npm 上的 react-moveable

### Requirement: 按依赖顺序构建全部包
仓库 SHALL 提供一条根命令，按包之间的依赖拓扑顺序构建所有可发布的工作区包：被依赖的包先于依赖它的包完成构建。

#### Scenario: 全量构建
- **WHEN** 开发者在根目录执行全量构建命令
- **THEN** react-moveable 先构建，croact-moveable 在其后，moveable 在 croact-moveable 之后，vue3-moveable 在 moveable 之后，helper 独立构建，且全部成功产出 `dist`

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
仓库 SHALL 提供一条根命令，对 5 个库包（react-moveable、helper、croact-moveable、moveable、vue3-moveable）`src` 下的 `.ts`、`.tsx` 源码执行静态检查（lint）。检查只在没有错误、也没有警告时通过；检查 MUST NOT 依赖构建产物，也 MUST NOT 被任何包的构建命令隐式执行。

#### Scenario: 检查范围
- **WHEN** 开发者在根目录执行代码检查命令
- **THEN** 这 5 个包 `src` 下的 `.ts`、`.tsx` 文件都被检查；`dist`、`declaration`、stories 和其它包的文件不被检查

#### Scenario: 当前代码通过检查
- **WHEN** 在没有改动的代码上执行代码检查命令
- **THEN** 命令以 0 退出，输出中没有错误和警告，也没有关于配置或插件本身的提示（例如未指定 React 版本）

#### Scenario: 发现问题时失败
- **WHEN** 这 5 个包中任一个的 `.ts`、`.tsx` 源码出现违反规则的代码（例如未使用的 import，或缩进不是 4 个空格）
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
仓库 SHALL 提供 demo 站点的构建与发布能力：站点 MUST 在 CI 中从仓库的干净检出构建，并且只发布到本仓库自己的 GitHub Pages。本地 MUST NOT 提供任何会推送远程分支或发布站点的命令。

#### Scenario: 部署时复制产物
- **WHEN** 执行 demo 站点的构建命令（CI 发布前执行的也是这个命令）
- **THEN** 依次构建所有可发布包、API 文档和 Storybook，再先清空并重建每个目标目录，然后复制：`packages/moveable/dist` 到 `demo/release/latest/dist`，`packages/helper/dist` 到 `demo/helper/release/latest/dist`，`doc` 到 `demo/release/latest/doc`；不生成按版本号命名的目录

#### Scenario: 站点内容
- **WHEN** demo 站点构建完成
- **THEN** `demo` 目录就是站点根目录：包含仓库中的落地页文件、`storybook/`、`release/latest/doc/`、`release/latest/dist/`、`helper/release/latest/dist/`；站点部署在子路径（`/<仓库名>/`）下时，Storybook 和 API 文档的页面及其资源都能正常加载

#### Scenario: 推送目标
- **WHEN** 发布 workflow 发布站点
- **THEN** `demo` 目录整体发布到本仓库的 GitHub Pages，替换上一次发布的全部内容；不写入任何 git 分支，也不会发布到 `upstream`

#### Scenario: 手动触发发布
- **WHEN** 在 GitHub 上手动运行发布 workflow
- **THEN** CI 从所选提交的干净检出安装依赖、构建站点，再发布；推送和 pull request 不会触发发布

#### Scenario: 本地没有发布命令
- **WHEN** 查看根与各包的 `package.json` 脚本和依赖
- **THEN** 不存在推送 gh-pages 分支或任何远程分支的脚本，也不再声明 gh-pages 依赖

### Requirement: API 文档由 TypeDoc 从源码生成
仓库 SHALL 在根目录用 TypeDoc 从 TypeScript 源码生成 moveable（原生 JS）包的 API 文档，输出到 `doc/`。文档内容 MUST 来自挂在声明上的注释（TSDoc）和类型本身，源码中 MUST NOT 有只靠 jsdoc 结构标签（`@typedef`、`@memberof`、`@name`、`@event`、`@namespace` 等）才能归属的注释。生成过程中的任何警告 MUST 视为错误。

#### Scenario: 生成文档
- **WHEN** 在根目录执行 `pnpm doc`
- **THEN** `doc/` 中生成 TypeDoc 文档，没有任何警告；入口页面是根目录的 README，主类显示为 `Moveable`

#### Scenario: 选项、方法和事件都有说明
- **WHEN** 查看生成的文档
- **THEN** `Moveable` 类页面列出全部选项（`MOVEABLE_PROPS`，注释中标为 `@private` 的内部选项除外，与迁移前相同）和方法（`MOVEABLE_METHODS`），每一项都有说明；每个事件（`MOVEABLE_EVENTS`）对应的 `on<事件名>` 成员都有说明；迁移前文档中的每一段说明和每一个示例，在新文档中都能找到

#### Scenario: 按 able 分组
- **WHEN** 查看文档的索引
- **THEN** 接口和类型按所属的 able（Draggable、Resizable 等）分组显示，每组有一段说明；不属于某个 able 的归入同一个公共分组

#### Scenario: 注释错误使生成失败
- **WHEN** 源码注释中有指向不存在的符号的 `{@link}`、未声明的标签，或同一个参数名在签名中不存在的 `@param`
- **THEN** `pnpm doc` 失败，并指出出错的声明（如 `DraggableOptions.draggable`）或文件位置

#### Scenario: 文档到 Storybook 的链接
- **WHEN** 文档部署在 demo 站点的 `release/latest/doc/` 中，点击某个选项说明中指向示例的链接
- **THEN** 打开同一站点 `storybook/` 中对应的 story；所有这类链接引用的 story 都存在于 Storybook 中

#### Scenario: Storybook 到文档的链接
- **WHEN** 在部署后的 Storybook 中点击控件说明里的「See API」
- **THEN** 打开同一站点 `release/latest/doc/` 中对应的选项或类型说明，而不是上游 `daybrush.com` 的页面

### Requirement: 版本管理
仓库 SHALL 用变更记录文件管理 5 个可发布包的版本：每个需要发布的改动附带一份记录，写明影响哪些包、版本升级的级别（patch / minor / major）和面向使用者的说明；升级版本时由工具根据这些记录修改 `version` 字段并生成各包的 CHANGELOG。

react-moveable、croact-moveable、moveable、vue3-moveable 四个包 SHALL 始终使用相同的版本号：其中任何一个需要发布时，四个包一起升到同一个新版本。helper SHALL 独立升级版本。根目录的包是私有的，MUST NOT 参与版本管理。

这 5 个包在 `@moveable-next` 作用域下的第一个版本 SHALL 是 0.1.0，每个包 CHANGELOG 的第一条 SHALL 写明它基于上游哪个包的哪个版本。仓库 MUST NOT 保留从上游继承来的 CHANGELOG。

#### Scenario: 只改 react-moveable
- **WHEN** 一份变更记录只把 `@moveable-next/react` 标为 minor，然后执行版本升级
- **THEN** react、croact、vanilla、vue3 四个包的版本升到同一个新的 minor 版本，各自的 CHANGELOG 都增加这一版；helper 的版本和 CHANGELOG 不变

#### Scenario: 只改 helper
- **WHEN** 一份变更记录只把 `@moveable-next/helper` 标为 patch，然后执行版本升级
- **THEN** 只有 helper 的版本和 CHANGELOG 变化

#### Scenario: 首个版本
- **WHEN** 查看首次发布前 5 个包的 `package.json` 和 CHANGELOG
- **THEN** 版本都是 0.1.0，CHANGELOG 只有 0.1.0 一条，其中写明上游的包名和版本

#### Scenario: 发布包中的内部依赖
- **WHEN** 对任一依赖其它工作区包的包执行打包预演
- **THEN** `package.json` 中对其它工作区包的依赖是与被依赖包当前版本相符的具体版本范围，不是 `workspace:` 协议

### Requirement: 在 CI 中发布到 npm
5 个包 SHALL 由本仓库 `main` 分支上的 CI 发布到 npm，并以 npm 可信发布（OIDC）认证：仓库和 CI MUST NOT 保存长期有效的 npm token，发布的每个版本 SHALL 带有指向本仓库构建的来源证明（provenance）。发布 SHALL 只在全部自动化检查（与「CI 执行全部自动化检查」相同的范围）对同一提交通过之后进行；任何一项失败时，MUST NOT 发布。

`main` 上有尚未发布的变更记录时，CI SHALL 创建或更新一个「版本 PR」，内容是执行版本升级之后的结果；这个 PR 合并后，CI SHALL 发布版本号尚未出现在 npm 上的包，并为每个发布的包创建 git 标签和 GitHub Release。

发布任务 SHALL 运行在只允许 `main` 部署的 GitHub 环境中，npm 上每个包的可信发布配置 SHALL 限定为本仓库的这个工作流和这个环境。

尚不存在于 npm 上的新包，第一次发布 SHALL 由维护者在本地手动执行（npm 要求包已存在才能配置可信发布），使用与 CI 相同的根命令：先全量构建，再发布尚未发布的版本。

#### Scenario: 合并带变更记录的 PR
- **WHEN** 一个带变更记录的 PR 合并到 `main`，并且全部检查通过
- **THEN** CI 创建或更新版本 PR，不发布任何包

#### Scenario: 合并版本 PR
- **WHEN** 版本 PR 合并到 `main`，并且全部检查通过
- **THEN** CI 发布版本有变化的包；npm 上这些版本带有 provenance，指向本仓库的这次运行；仓库中出现对应的 git 标签和 GitHub Release

#### Scenario: 检查失败时不发布
- **WHEN** `main` 上的某次提交有测试失败
- **THEN** 发布任务不执行，npm 上没有新版本

#### Scenario: 其它分支不能发布
- **WHEN** 在 `main` 以外的分支上运行发布工作流
- **THEN** 发布任务因环境的分支限制而无法执行

#### Scenario: 没有 npm token
- **WHEN** 查看仓库的 Actions secrets、环境 secrets 和工作流文件
- **THEN** 其中没有 npm token

### Requirement: CI 执行全部自动化检查
CI SHALL 在每次推送和 pull request 时执行仓库中全部自动化检查：库包源码的代码检查、所有可发布包的全量构建、react-moveable 的 story 交互测试、helper 的单元测试、框架包装的浏览器测试、story 代码的类型检查、API 文档的生成。其中任何一项失败，流水线 SHALL 失败。

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

#### Scenario: 框架包装测试失败
- **WHEN** vue3-moveable 的某个测试失败
- **THEN** CI 流水线失败，并能在日志中看到失败的测试名称

#### Scenario: API 文档生成失败
- **WHEN** 源码注释使 `pnpm doc` 产生警告或错误
- **THEN** CI 流水线失败，并能在日志中看到出错的声明或文件位置，以及原因

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
