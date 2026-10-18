# 基线与验证记录

## 1.1 改动前

### demo 站点的文件

删除本地的 `demo/storybook`、`demo/release`、`demo/helper`，再执行 `pnpm demo:build && node config/deploy.mjs`。两条命令都成功，`demo:build` 用时约 18 秒。

`demo/` 中共 241 个文件（不含 `.DS_Store`），没有其它以 `.` 开头的文件：

| 位置 | 文件数 | 来源 |
|---|---|---|
| 根目录（`index.html`） | 1 | git 管理的落地页 |
| `images/` | 22 | git 管理的落地页 |
| `static/` | 9 | git 管理的落地页 |
| `storybook/` | 77 | `build:storybook` |
| `release/0.53.0/dist/` | 8 | 复制自 `packages/moveable/dist` |
| `release/latest/dist/` | 8 | 同上 |
| `release/0.53.0/doc/` | 50 | 复制自 `doc/`（39 个 html + `scripts/` 7 + `styles/` 4） |
| `release/latest/doc/` | 50 | 同上 |
| `helper/release/0.53.0/dist/` | 8 | 复制自 `packages/helper/dist` |
| `helper/release/latest/dist/` | 8 | 同上 |

（按版本号命名的目录与 `latest` 内容相同。）

### 已弃用的包

npm 上标记为已弃用、并且出现在锁文件中的包有 3 个：

| 包 | 来源（`pnpm why glob inflight`） |
|---|---|
| `glob@7.2.3` | gh-pages 2.2.0 → globby 6.1.0 → glob 7 |
| `glob@8.1.0` | @croffle/bakery 0.0.25 → glob 8 |
| `inflight@1.0.6` | 两条路径：经 glob 7 来自 gh-pages，经 glob 8 来自 @croffle/bakery |

ROADMAP 原来说 gh-pages 带来了其中 2 个（glob 7 和 inflight），这是错的：inflight 也经 glob 8 被 @croffle/bakery 引入。删除 gh-pages 后只少 glob 7，剩下 glob 8 和 inflight。proposal 和 tasks 已经按这个事实改正。

## 2.2 删除 gh-pages 之后

`pnpm install` 删除了 28 个包，锁文件少了 224 行，其中搜不到 `gh-pages`、`globby@6`、`glob@7`。`pnpm why glob inflight` 中已弃用的包只剩 glob 8 和 inflight，都来自 @croffle/bakery。`pnpm lint` 通过。

## 2.3 新的 `demo:build`

删除本地的 `demo/storybook`、`demo/release`、`demo/helper`，执行 `pnpm demo:build`，成功，最后三行是复制脚本的输出。

`demo/` 中共 175 个文件，等于基线的 241 个减去 `release/0.53.0/`（8 + 50）和 `helper/release/0.53.0/`（8）。对比文件清单：
- Storybook 以外的文件与基线去掉版本号目录后完全相同；
- `storybook/` 同样是 77 个文件，把文件名中的内容哈希替换掉之后，清单与基线相同。

## 3.1 workflow 检查

actionlint 1.7.12（从 rhysd/actionlint 的 release 下载到 scratchpad，校验了 checksum，没有加入仓库依赖）检查 `deploy-demo.yml` 和 `run-e2e.yml`：没有错误。`deploy-demo.yml` 中只有 `workflow_dispatch` 触发。

## 3.2 CI 运行（临时的 push 触发）

- 提交 `42603e37`（本 change 的实现）推送后，`Tests` 通过。
- 临时提交 `d28593a5` 给 workflow 加上 `push: { branches: [refactor] }`，触发了 run 39098221140：
  - build job 成功，用时 1 分 35 秒；产物 `github-pages` 已上传（`artifact.tar` 23 MB）。
  - deploy job 失败，与预期一致：`Error: Failed to create deployment (status: 404) ... Ensure GitHub Pages has been enabled: https://github.com/colinli007/moveable-next/settings/pages`（`HttpError: Not Found`，出自 `createPagesDeployment`）。这一步在请求创建 Pages 部署之前已经找到了产物（`Found 1 artifact(s)`）。
  - 同一提交的 `Tests` 通过。
- revert 提交 `02592038` 推送后，workflow 中又只有 `workflow_dispatch`。
- 两个 job 都带有 GitHub 的通知：`ubuntu-latest` 从 2026-10-19 起迁移到 Ubuntu 26。这与本 change 无关，`run-e2e.yml` 同样使用 `ubuntu-latest`。

## 3.3 产物检查

用 `gh run download` 下载产物，把 `artifact.tar` 解开到 scratchpad 的 `site/moveable-next/`，用 `python3 -m http.server` 提供，模拟 `https://<用户>.github.io/moveable-next/`，在 Chrome 中检查：

| 项目 | 结果 |
|---|---|
| 文件清单 | 175 个文件，把内容哈希替换掉之后与 2.3 本地 `demo/` 的清单相同，没有遗漏 |
| 落地页 `/moveable-next/` | 正常显示；页面自身的资源都是 200。`/favicon.ico` 404，是浏览器默认去域名根目录请求的，与站点无关 |
| Storybook `/moveable-next/storybook/?path=/story/basic--basic-draggable` | manager、iframe、`index.json` 和全部 `assets/` 都是 200；story 渲染出 1 个 `.moveable-control-box`、4 条 `.moveable-line`。控制台只有 Storybook 自身的 3 条弃用警告（`setConfig({ panelPosition })`、`IconButton`、`PopoverProvider` 的 `ariaLabel`），与部署无关 |
| API 文档首页 `/moveable-next/release/latest/doc/` | 10 个脚本和样式都是 200；17 个站内链接中只有 `CONTRIBUTING.md` 是 404：这是改动前就有的问题，README 链接了一个仓库中不存在的文件 |
| `Moveable.Draggable.html` | 正常显示，有 6 个事件条目，19 个站内链接都是 200 |
| `release/latest/dist/moveable.min.js` | 200，229008 字节 |
| `helper/release/latest/dist/helper.min.js` | 200，7771 字节 |

## 5.1 全量验证

在 `02592038` 的全新克隆中依次执行 `pnpm install --frozen-lockfile`、`pnpm lint`、`pnpm packages:build`、`playwright install chromium`、`typecheck:stories`、`pnpm test`、`pnpm demo:build`，全部成功：
- 安装时有几次 registry 的 `ECONNRESET` 重试，都是网络问题，重试后成功；
- 测试结果 `Test Files 26 passed | 1 skipped (27)`，`Tests 162 passed (162)`；
- `demo:build` 最后输出复制脚本的三行。

推送后 `02592038` 的 `Tests` 通过，`openspec validate deploy-demo-with-actions --strict` 通过。
