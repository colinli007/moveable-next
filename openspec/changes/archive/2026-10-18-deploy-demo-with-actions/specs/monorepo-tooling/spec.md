## MODIFIED Requirements

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
