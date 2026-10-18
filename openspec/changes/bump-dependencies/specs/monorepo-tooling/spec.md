## MODIFIED Requirements

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

### Requirement: 依赖显式声明
每个工作区包 MUST 在自己的 `package.json` 中声明它直接使用的所有第三方包，包括：源码、构建配置、Storybook 配置中 import / require 的包，以及自身脚本直接调用的可执行文件所属的包。根目录脚本和根目录配置文件（如 `jsdoc.json`）用到的包 MUST 在根 `package.json` 中声明。在 pnpm 默认的非提升（isolated）布局下，任何包都 MUST NOT 依赖依赖提升才能解析模块或找到可执行文件。反过来，包 MUST NOT 声明它没有使用的依赖。每个声明的 dependency / devDependency 都要满足下列之一：
- 被这个包的源码、配置、脚本使用（根目录包括 `jsdoc.json` 这类配置文件）；
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
- **THEN** `jsdoc.json` 中引用的 `node_modules` 路径都存在，文档正常生成

#### Scenario: 没有多余的依赖声明
- **WHEN** 从任一工作区包的 `package.json` 中删除一个不属于后两类（peer）的 dependency 或 devDependency，然后重新安装
- **THEN** 这个包的构建、类型检查、测试、文档生成，或者它的某个脚本至少有一项失败

## ADDED Requirements

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
