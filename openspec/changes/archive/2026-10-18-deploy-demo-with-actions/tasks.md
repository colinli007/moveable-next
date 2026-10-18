## 1. 基线

- [x] 1.1 记录改动前的状态，写入本 change 目录的 `baseline.md`：
  - 删除本地 `demo/` 中的构建产物（`demo/storybook`、`demo/release`、`demo/helper`），执行 `pnpm demo:build && node config/deploy.mjs`，再记录 `demo/` 的文件清单（按顶层目录汇总文件数）；
  - 现在的 3 个弃用警告是哪几个、分别从哪里来：用 `pnpm why glob inflight` 确认来源（锁文件已是最新时 `pnpm install` 不会再打印弃用警告）。

  验证：`baseline.md` 中有 `demo/` 的清单，包含 `release/<版本>/` 和 `release/latest/` 两份；弃用警告来源为 gh-pages → globby 6 → glob 7 → inflight，以及 @croffle/bakery → glob 8 → inflight

## 2. 脚本与依赖（design 决策 3、4）

- [x] 2.1 `config/deploy.mjs` 用 `git mv` 改名为 `config/copy-demo-files.mjs`，并按决策 4 修改：
  - 复制规则只保留 `latest` 三组；
  - 删除读取 moveable 版本号的代码；
  - 头部注释改为说明它是 `demo:build` 的最后一步，负责把包产物和文档复制进站点目录；不再提 gh-pages 和 lerna-helper。

  验证：`node config/copy-demo-files.mjs` 输出三行 `<源> -> <目标>`，`demo/release` 下只有 `latest`
- [x] 2.2 修改根 `package.json`：
  - `demo:build` 末尾加上 `&& node config/copy-demo-files.mjs`；
  - 删除 `demo:deploy`、`deploy` 脚本和 devDependencies 中的 `gh-pages`；
  - 执行 `pnpm install`。

  验证：
  - 已弃用的包只剩 2 个：`pnpm why glob inflight` 中不再有 glob 7，glob 8 和 inflight 都只来自 @croffle/bakery；
  - 锁文件中搜不到 `gh-pages`、`globby@6`、`glob@7`；
  - 根和各包的 `package.json` 中搜不到 `gh-pages`；
  - `pnpm lint` 通过（包括依赖范围检查）
- [x] 2.3 删除本地的 `demo/release`、`demo/helper`、`demo/storybook`，执行 `pnpm demo:build`。验证：命令成功；`demo/` 的清单与 1.1 相比只少了 `release/<版本>/` 和 `helper/release/<版本>/`，其余文件数相同。结果写入 `baseline.md`

## 3. 发布 workflow（design 决策 1、2、5）

- [x] 3.1 新增 `.github/workflows/deploy-demo.yml`，按决策 5 编写：
  - 只用 `workflow_dispatch` 触发，`concurrency: { group: pages, cancel-in-progress: false }`；
  - build job：权限 `contents: read`；checkout、pnpm、Node 的设置与 `run-e2e.yml` 一致；依次执行 `pnpm install --frozen-lockfile`、`pnpm demo:build`、`actions/upload-pages-artifact@v5`（`path: demo`）；
  - deploy job：`needs: build`，权限 `pages: write` 和 `id-token: write`，`environment` 为 `github-pages` 并带上 `url`，唯一一步是 `actions/deploy-pages@v5`（`id: deployment`）；
  - 注释风格与 `run-e2e.yml` 一致：说明为什么只手动触发、为什么权限按 job 分开。

  验证：用 `actionlint` 检查没有错误（如果本地没有安装，用 `pnpm dlx` 或 `brew` 临时运行，不加入仓库依赖）；文件中没有 `push`、`pull_request` 触发
- [x] 3.2 按决策 6 用 CI 验证：
  - 先推送 3.1 的提交；
  - 再推送一个临时提交，给 workflow 加上 `push: { branches: [refactor] }`；
  - 观察这次运行：build job 成功，产物 `github-pages` 已上传；deploy job 失败，原因是 Pages 未开启；
  - 验证完 revert 临时提交并推送。

  验证：两个 job 的结果和 deploy job 的失败信息记入 `baseline.md`；revert 后 workflow 中又只有 `workflow_dispatch`
- [x] 3.3 用 `gh run download` 下载 3.2 的产物，在 scratchpad 中解开（产物是 zip 里的 `artifact.tar`）。放在 `moveable-next/` 子目录下，用静态服务器提供，按决策 6 的清单在浏览器中检查：
  - 落地页；
  - Storybook 首页和任意一个 story 的渲染；
  - `release/latest/doc/` 首页及其中一个 able 的页面；
  - `release/latest/dist/moveable.min.js` 和 helper 的 dist 能下载。

  另外对比产物与 2.3 本地 `demo/` 的文件清单。验证：清单项全部正常，文件清单一致（`.DS_Store` 这类本地文件除外）。结果写入 `baseline.md`

## 4. 文档

- [x] 4.1 更新 `CLAUDE.md`：
  - 根目录命令中删除 `pnpm deploy` 一行；
  - 新增 `pnpm demo:build`：构建所有包、文档和 Storybook，再把产物复制进 `demo/`，完成后 `demo/` 就是站点根目录；
  - 说明发布只能在 GitHub Actions 中手动运行 `Deploy demo`（`.github/workflows/deploy-demo.yml`），本地没有发布命令；
  - 说明在 pnpm 11 中 `pnpm deploy` 执行的是根目录的同名脚本，所以不要在根目录定义会写远程的 `deploy` 脚本。

  验证：`CLAUDE.md` 中搜不到 `gh-pages` 和 `config/deploy.mjs`
- [x] 4.2 更新 `openspec/ROADMAP.md`：
  - 第 5 步状态改为「进行中」，表格中写入 `deploy-demo-with-actions`；
  - 「待进行」第 5 步中 gh-pages 一条改为：已由本 change 改为 Actions 发布，开启 Pages 后还要做 design Migration Plan 的 4 步，并检查 `github-pages` 环境的部署分支限制；
  - 写明后续 change 的顺序（TypeDoc，然后是 Svelte 示例）；
  - 「已知遗留」中记录：origin 上的 gh-pages 分支已不再使用，是否删除由用户决定；落地页和 README 中指向 `daybrush.com` 的链接随第 6 步调整；
  - `bump-dependencies` 一段中「剩下的 3 个已弃用警告」的后续说明改正：gh-pages 只带来其中的 glob 7，删除后剩 glob 8 和 inflight 两个，都来自 @croffle/bakery；「已知遗留」中 @croffle/bakery 一条加上 inflight。

  验证：表格、「待进行」、「已知遗留」都反映本 change

## 5. 全量验证

- [x] 5.1 在全新克隆中执行 `pnpm install --frozen-lockfile && pnpm lint && pnpm packages:build && pnpm --filter react-moveable exec playwright install chromium && pnpm --filter react-moveable typecheck:stories && pnpm test && pnpm demo:build`。验证：
  - 全部成功；
  - 推送后 `run-e2e.yml` 通过；
  - `openspec validate deploy-demo-with-actions --strict` 通过
