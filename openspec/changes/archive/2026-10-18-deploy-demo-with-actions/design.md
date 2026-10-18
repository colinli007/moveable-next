## Context

现状（动机见 proposal 的 Why）：

- 根 `package.json`：
  - `demo:build` = `pnpm packages:build && pnpm doc && pnpm build:storybook`；
  - `deploy` = `node config/deploy.mjs && pnpm demo:deploy`；
  - `demo:deploy` = `gh-pages -d ./demo --dest=./ --add --remote origin`。
- `config/deploy.mjs` 先清空、再复制三组产物，每组都复制到 `<版本>` 和 `latest` 两个位置（版本号取自 moveable 包）。
- `demo/` 中，落地页（`index.html`、`static/`、`images/`）是受 git 管理的。其余都是构建产物，已被 `.gitignore` 忽略：
  - `storybook/` 由 react-moveable 的 `build:storybook` 输出；
  - `release/`、`helper/release/` 由复制脚本生成。
- Storybook 和 jsdoc 输出的页面都用相对路径引用资源（例如 `./sb-manager/runtime.js`）。
- 仓库 colinli007/moveable-next 是私有的，默认分支是 `main`。目前的工作在 `refactor` 分支上，比 `main` 多 47 个提交，`main` 没有 `refactor` 以外的提交。
- 现有 CI（`run-e2e.yml`）在每次推送和 PR 时执行。安装方式是 `actions/checkout@v7`、`pnpm/action-setup@v6`（版本读 `packageManager`）、`actions/setup-node@v7`（读 `.nvmrc`，缓存 pnpm），再执行 `pnpm install --frozen-lockfile`。
- 当前 GitHub Pages 官方 Actions 的最新主版本：`actions/upload-pages-artifact@v5`、`actions/deploy-pages@v5`。

## Goals / Non-Goals

**Goals:**
- 站点只能由 CI 从干净检出构建、发布；本地构建和 CI 构建执行的是同一条命令。
- 在 Pages 未开启的前提下，尽可能验证发布流程：CI 构建成功，上传的产物在子路径下能正常浏览。

**Non-Goals:**
- 不调整站点的内容和结构（落地页、Storybook、文档的内容），也不调整除「去掉版本号目录」以外的路径。
- 不在 deploy workflow 中执行 lint 和测试：它们已经在每次推送时由 `run-e2e.yml` 执行，发布的是已经推送过的提交。
- 不处理自定义域名、`CNAME`。

## Decisions

### 1. 用 GitHub Pages 官方 Actions 发布，不再使用 gh-pages 分支

workflow 中 build job 上传 `demo/`（`actions/upload-pages-artifact`），deploy job 用 `actions/deploy-pages` 发布。Pages 的来源设置为「GitHub Actions」，不读取任何分支。

考虑过的替代方案：
- **升级到 gh-pages 6，仍在本地推送**：能消除弃用警告，但「发布本地目录」和「本地命令写远程」这两个问题都还在。
- **在 CI 中用 gh-pages 工具或 peaceiris/actions-gh-pages 推送 gh-pages 分支**：构建环境干净了，但仍然需要维护一个只放构建产物的分支，还要给 workflow 写仓库内容的权限（`contents: write`）。官方方式只需要 `pages: write` 和 `id-token: write`，也没有额外的分支。

### 2. 只手动触发（`workflow_dispatch`）

站点上的 API 文档和 UMD 产物应该对应一个确定的版本。在第 6 步引入发布流程之前，什么时候发布由人决定。另外，Pages 未开启时，任何自动触发的发布都会在每次推送时失败。

以后可以改为在发布版本时自动触发，与第 6 步的 changesets 一起考虑。

### 3. 组装站点并入 `demo:build`，复制脚本改名

`demo:build` 改为 `pnpm packages:build && pnpm doc && pnpm build:storybook && node config/copy-demo-files.mjs`：
- 执行完，`demo/` 就是完整的站点；
- CI 和本地执行同一条命令，本地预览的就是将要发布的内容。

`config/deploy.mjs` 改名为 `config/copy-demo-files.mjs`，因为它只负责复制，不再部署。头部注释同步修改：不再提「推送到 gh-pages」和「沿用 lerna-helper 的 deployFileMap」。

不保留单独的「复制」脚本：复制依赖前面三步的产物，单独执行没有意义。

### 4. 复制规则只保留 `latest`

`release/<版本>/` 的作用是让旧版本的文档和产物继续可以访问，前提是每次发布都在已有站点上追加（`--add`）。Pages 产物每次整体替换站点，版本目录只会是 latest 的重复，所以删除。三组规则改为：
- `packages/moveable/dist` → `demo/release/latest/dist`
- `packages/helper/dist` → `demo/helper/release/latest/dist`
- `doc` → `demo/release/latest/doc`

脚本不再读取 moveable 的版本号。「先清空再复制」保留，目的是本地多次构建时不留下已删除的文件。

如果以后需要保留多个版本的文档，应当由 TypeDoc 的版本化输出或 npm CDN（unpkg / jsdelivr 按版本号提供 dist）解决，不靠站点追加目录。

### 5. workflow 的结构

`.github/workflows/deploy-demo.yml`，名称 `Deploy demo`：
- **触发**：`workflow_dispatch`。
- **并发**：`concurrency: { group: pages, cancel-in-progress: false }`。与 GitHub 的 Pages 模板一致：正在进行的发布不会被取消，后触发的排队等待。
- **build job**：
  - 权限 `contents: read`；
  - checkout、pnpm、Node 的设置与 `run-e2e.yml` 相同；
  - `pnpm install --frozen-lockfile` → `pnpm demo:build` → `actions/upload-pages-artifact@v5`（`path: demo`）。
  - 不安装 Playwright：构建不需要浏览器。
- **deploy job**：
  - `needs: build`，权限 `pages: write`、`id-token: write`；
  - `environment: { name: github-pages, url: ${{ steps.deployment.outputs.page_url }} }`；
  - 只有一步 `actions/deploy-pages@v5`（`id: deployment`）。

权限按 job 分开写，不写在 workflow 顶层：build job 不需要发布权限，deploy job 不需要读代码。

不使用 `actions/configure-pages`：它的用途是给 Next.js、Jekyll 等静态站点生成器注入 base path。这个站点的页面全部使用相对路径，不需要它。

### 6. Pages 未开启时的验证方式

`workflow_dispatch` 只能运行默认分支（`main`）上存在的 workflow，而 `main` 落后 `refactor` 47 个提交。所以验证时用一个临时提交：给 workflow 加上 `push: { branches: [refactor] }` 触发，推送后观察，验证完 revert。这个做法沿用以前用临时提交验证 CI 的做法（例如 `upgrade-svelte-5` 中让 CI 故意失败的提交）。

预期结果：
- build job 成功，产物 `github-pages` 已上传；
- deploy job 失败，原因是 Pages 未开启。失败信息记入 `baseline.md`。

然后下载产物，解开后放在本地 `/moveable-next/` 子路径下用静态服务器提供，模拟 `https://<用户>.github.io/moveable-next/`，在浏览器中检查：
- 落地页能打开；
- Storybook 首页能打开，任意一个 story 能渲染；
- `release/latest/doc/` 能打开，文档页面之间的链接正常；
- `release/latest/dist/moveable.min.js` 和 `helper/release/latest/dist/` 中的文件能下载。

## Risks / Trade-offs

- [deploy job 从来没有真正成功过：Pages 开启后，第一次发布才能确认它可用] → 写法和权限照搬 GitHub 官方模板；build job 和产物已经实际验证。ROADMAP 记录「开启 Pages 后手动运行一次，检查站点」。
- [临时触发的 deploy job 会在仓库中自动创建 `github-pages` 环境] → 开启 Pages 时 GitHub 本来也会创建这个环境，提前创建没有影响。开启 Pages 后在 Settings → Environments 中检查它的部署分支限制（应只允许 `main`），记入 ROADMAP。
- [`upload-pages-artifact` 默认不上传以 `.` 开头的文件] → 站点中没有需要发布的隐藏文件。验证时对比产物的文件清单和本地 `demo/` 的文件清单，确认没有遗漏。
- [站点路径变化：不再有 `release/<版本>/`] → 这个仓库的站点还没有发布过，没有现存的链接会失效。
- [origin 上已有的 gh-pages 分支不再使用] → 留给用户决定是否删除，不影响 Pages（来源是 Actions）。

## Migration Plan

开启 Pages 时（本 change 之后，等仓库公开或开通 Pro）：
1. 把包含本 change 的提交合并到 `main`。
2. Settings → Pages → Build and deployment → Source 选择「GitHub Actions」。
3. Actions → Deploy demo → Run workflow（分支 `main`）。
4. 打开 workflow 给出的站点地址，按决策 6 的清单检查。

回滚：在 Actions 中对之前的提交重新运行 workflow，或者在 Settings → Pages 中停用站点。
