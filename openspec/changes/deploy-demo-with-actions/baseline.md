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
