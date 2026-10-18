## ADDED Requirements

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
- **THEN** `pnpm doc` 失败，并指出文件位置

#### Scenario: 文档到 Storybook 的链接
- **WHEN** 文档部署在 demo 站点的 `release/latest/doc/` 中，点击某个选项说明中指向示例的链接
- **THEN** 打开同一站点 `storybook/` 中对应的 story；所有这类链接引用的 story 都存在于 Storybook 中

#### Scenario: Storybook 到文档的链接
- **WHEN** 在部署后的 Storybook 中点击控件说明里的「See API」
- **THEN** 打开同一站点 `release/latest/doc/` 中对应的选项或类型说明，而不是上游 `daybrush.com` 的页面

## MODIFIED Requirements

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

### Requirement: CI 执行全部自动化检查
CI SHALL 在每次推送和 pull request 时执行仓库中全部自动化检查：库包源码的代码检查、所有可发布包的全量构建、react-moveable 的 story 交互测试、helper 的单元测试、框架包装的浏览器测试和服务端渲染测试、story 代码的类型检查、API 文档的生成。其中任何一项失败，流水线 SHALL 失败。

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
- **WHEN** lit-moveable、vue3-moveable 或 svelte-moveable 的某个测试失败（包括 svelte-moveable 的服务端渲染测试）
- **THEN** CI 流水线失败，并能在日志中看到失败的测试名称

#### Scenario: API 文档生成失败
- **WHEN** 源码注释使 `pnpm doc` 产生警告或错误
- **THEN** CI 流水线失败，并能在日志中看到对应的文件位置和原因
