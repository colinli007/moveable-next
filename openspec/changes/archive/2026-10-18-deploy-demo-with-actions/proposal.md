## Why

demo 站点（落地页、Storybook、API 文档、moveable / helper 的 UMD 产物）现在由本地脚本发布：`pnpm deploy` 先把产物复制进 `demo/`，再用 gh-pages 2 把这个目录以增量方式推送到 origin 的 gh-pages 分支。这个做法有几个问题：

- 发布的是本地目录中的东西，本地残留的旧产物也会被推送出去。提出本 change 时，一次误操作执行了 `pnpm deploy`，就把本地一份旧的 Storybook 推送到了 gh-pages 分支。
- 一条本地命令就会写远程分支。在 pnpm 11 中，`pnpm deploy` 执行的是根目录的同名脚本，不是 pnpm 内置的 `deploy` 命令，带上 `--help` 也照样执行。
- gh-pages 2 经 globby 6 依赖已弃用的 glob 7。仓库中剩下 3 个已弃用的包：glob 7、glob 8、inflight，其中 glob 7 只来自 gh-pages；glob 8 和 inflight 来自 @croffle/bakery（inflight 也经 glob 7 被 gh-pages 引入）。
- 「增量推送」是为了在分支上保留每个历史版本的 `release/<版本>/` 目录。但这个仓库的 gh-pages 分支中都是上游的旧内容，本仓库没有需要保留的历史版本。

站点的本质是「把仓库某个提交构建出的文档和示例发布出去」。所以构建应该在 CI 中从干净的检出进行，再由 GitHub Pages 的官方 Actions 发布，不需要本地推送，也不需要 gh-pages 分支和 gh-pages 工具。这是 ROADMAP 第 5 步「文档与部署」拆分出的第一个 change：先把发布通道搭好，后面 TypeDoc 和 Svelte 示例两个 change 的成果都通过它发布。

前提限制：仓库目前是私有的，免费账号的私有仓库不能开启 GitHub Pages。按用户的决定，本 change 写好完整的发布 workflow，用 CI 实际运行来验证构建和上传；真正的发布（部署那一步成功）等仓库公开或开通 Pro、开启 Pages 后再做，记入 ROADMAP。

## What Changes

- 新增 GitHub Actions workflow `.github/workflows/deploy-demo.yml`，只能手动触发（`workflow_dispatch`）。分两个 job：
  - build：干净检出，安装依赖，执行 `pnpm demo:build`，把 `demo/` 作为 Pages 产物上传（`actions/upload-pages-artifact`）。
  - deploy：用 `actions/deploy-pages` 发布到 GitHub Pages。
- `pnpm demo:build` 包含组装站点的全部步骤：在构建包、文档、Storybook 之后，把 moveable / helper 的 dist 和 `doc/` 复制进 `demo/`。复制脚本 `config/deploy.mjs` 改名为 `config/copy-demo-files.mjs`，它不再负责部署。
- 复制规则只保留 `latest`：`demo/release/latest/{dist,doc}`、`demo/helper/release/latest/dist`。删除按版本号命名的副本：每次发布都会整体替换站点，`release/<版本>/` 只会是 latest 的重复，起不到固定版本链接的作用。**BREAKING**（只影响站点路径）：站点上不再有 `release/<版本>/` 目录。
- 删除根目录的 `deploy`、`demo:deploy` 脚本和 `gh-pages` 依赖。本地不再有任何会推送远程的命令。
- `CLAUDE.md` 的常用命令改为 `pnpm demo:build`，并说明发布方式；`openspec/ROADMAP.md` 更新第 5 步。

不在本次范围：
- 开启 GitHub Pages、实际发布站点：等仓库公开或开通 Pro。开启后要做的事（设置 Pages 的来源为 GitHub Actions、手动运行一次 workflow、检查站点）记入 ROADMAP。
- 清理或删除 origin 上已有的 gh-pages 分支：改用 Actions 后它不再被使用。是否删除由用户决定，本 change 不动它。
- 站点内容：TypeDoc（第 5 步的下一个 change）、Svelte 示例（再下一个）。
- 落地页（`demo/index.html` 是上游预先构建好的页面，源码不在仓库中）和 README 中指向上游 `daybrush.com` 的链接：随第 6 步的包名、站点地址一起调整。

## Capabilities

### New Capabilities

（无）

### Modified Capabilities

- `monorepo-tooling`：「demo 站点构建与部署到自有仓库」改为由 GitHub Actions 从干净检出构建并发布到本仓库的 GitHub Pages；复制规则只保留 `latest`；本地不提供推送远程的命令。

## Impact

- 根目录：`package.json`（`demo:build` 加上复制步骤；删除 `deploy`、`demo:deploy`、`gh-pages`）、`config/deploy.mjs` → `config/copy-demo-files.mjs`、新增 `.github/workflows/deploy-demo.yml`
- `pnpm-lock.yaml`：删除 gh-pages 2 及其独有的间接依赖（globby 6、glob 7 等）；已弃用的包从 3 个降到 2 个，剩下的 glob 8 和 inflight 都来自 @croffle/bakery，随 croffle 一起处理
- 文档：`CLAUDE.md`、`openspec/ROADMAP.md`
- 现有的 CI workflow（`run-e2e.yml`）、各包的构建和产物、Storybook 和文档的内容都不变
