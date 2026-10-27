## ADDED Requirements

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

## REMOVED Requirements

### Requirement: 本阶段不提供 npm 发布入口
**Reason**: 发布到 `@moveable-next` 作用域的方案已经确定。这条 requirement 本来只是防止在方案确定前以上游作者的包名发布，现在包名已改为 `@moveable-next`。
**Migration**: 由「版本管理」和「在 CI 中发布到 npm」两条 requirement 取代：发布只用 `@moveable-next` 包名，由 `main` 上的 CI 执行；只有新包的第一次发布在本地手动执行。
