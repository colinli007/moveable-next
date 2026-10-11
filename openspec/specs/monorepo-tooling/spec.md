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
- **WHEN** 任一工作区包执行自己的 `build` / `lint` / `declaration` 脚本
- **THEN** 不出现 `command not found`，且调用的是该包自己声明的版本，而不是靠根目录兜底

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
- **WHEN** 在迁移完成后执行全量构建
- **THEN** 各包 `dist` 与 `declaration` 的文件列表与迁移前基线一致，体积差异可以解释（如依赖版本解析不同），没有缺失的入口文件

#### Scenario: 构建过程中没有未解析的模块
- **WHEN** 执行全量构建
- **THEN** rollup 输出中不出现「无法解析的 import、被当作外部依赖处理」的警告（`UNRESOLVED_IMPORT` / "Unresolved dependencies"），迁移前基线中已存在的例外除外：react-moveable、helper、lit-moveable 的 ESM / CJS 构建会把各自已声明的运行时依赖当作 external 并产生此警告，这些例外的模块清单 MUST NOT 扩大，UMD 构建 MUST NOT 出现此警告

#### Scenario: moveable 的 UMD 产物自包含
- **WHEN** 检查 `packages/moveable/dist/moveable.js` 与 `moveable.min.js`
- **THEN** croact 与 react-moveable 的代码已被内联，产物中不存在对外部 `croact` 模块或全局变量的引用，行为与基线相同

### Requirement: Storybook 交互测试可在受支持的运行时运行
react-moveable 的 Storybook 开发服务与 play 交互测试 SHALL 能在 Node 22.20.0 下运行，测试结果与迁移前基线一致。

#### Scenario: 本地启动 Storybook
- **WHEN** 开发者在根目录执行 Storybook 启动命令
- **THEN** Storybook 在 6006 端口启动，没有 OpenSSL 摘要算法相关错误

#### Scenario: CI 跑交互测试
- **WHEN** CI 执行 Storybook 测试任务
- **THEN** 通过的 story 集合与迁移前基线一致

#### Scenario: 测试失败时保留截图
- **WHEN** CI 中 Storybook 测试失败
- **THEN** 失败快照目录作为流水线产物上传，可供下载比对

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
