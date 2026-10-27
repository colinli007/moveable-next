## Context

动机见 proposal.md。与方案有关的现状：

- **版本**：5 个包的 `version` 是从上游继承来的，各不相同。npm 上 5 个包名都返回 404，`moveable-next` 组织里没有任何包。包之间的依赖写的是 `workspace:~`，`pnpm publish` 会把它换成 `~<当前版本>`。各包和根目录的 CHANGELOG 共 6332 行，都是上游 lerna 时代的记录，链接指向上游。
- **CI**：`run-e2e.yml` 在每次 push 和 pull_request 时执行全部检查。仓库的 Actions 设置是 `default_workflow_permissions: read`、`can_approve_pull_request_reviews: false`，所以工作流现在不能创建 PR。仓库已公开，`github-pages` 环境只允许 `main` 部署（`deploy-demo-with-actions` 的做法）。
- **运行时**：Node 22.20.0 自带 npm 10.9.3，pnpm 11.28.2。npm 可信发布只能给已经存在的包配置；npm CLI 需要 ≥ 11.5.1 才支持，但 pnpm 11 的 `pnpm publish` 自己实现了 OIDC 可信发布，不经过 npm CLI（见决策 5）。
- **React 类型泄漏的原因**（在临时副本中验证过）：able 对象没有类型注解，类型由 tsc 推断。在 `ables/consts.ts`（`MOVEABLE_ABLES` 的 `as const` 元组把 21 个 able 的类型全部展开）、`edgeDraggable.tsx`（转发 `Draggable` 方法的返回值）、`Resizable.ts` / `Scalable.ts`（`render: getRenderDirections(...)`）中，用到的类型在本文件里没有 import。tsc 只能自己合成一个模块路径，而且它选的是更短的 `".."`（`src/index.ts` 的 `export * from "./types"`），不是 `"../types"`，一共合成了 399 处 `import("..")`。`..` 是 react-moveable 的入口，入口又 import 了 `InitialMoveable` → `react`。因此 `@moveable-next/react/types`（`externalTypes.d.ts` → `types.d.ts` → `ables/consts.d.ts`）、moveable 和 vue3-moveable 的公开类型都会把 `@types/react` 带进来。
  - 去掉入口的 `export * from "./types"` 后，合成路径全部变成 `"../types"`；改成 `export type * from "./types"` 仍然是 `".."`。
  - 给 `MOVEABLE_ABLES` 写上显式的元组类型、给另外 3 个文件补上类型注解后，合成的 `import("..")` 变为 0。用 `skipLibCheck: false` 编译一段只引用 `@moveable-next/react/types` 的代码，没有错误，参与编译的文件中没有 `@types/react`。
- **测试环境的限制**：在工作区里，react-moveable 自己的 `node_modules` 中有 `@types/react`（pnpm 严格布局下，从它的 `declaration/` 解析 `react` 总能找到）。所以在仓库内无法复现使用方的 `Cannot find module 'react'`，只能检查参与编译的文件。

## Goals / Non-Goals

**Goals:**
- 首发之前，原生版和 Vue 3 版的类型不再依赖 React，并有测试防止回归。
- 发布可以重复执行、不需要 token；之后每个版本都由 CI 在检查通过后发布。
- 首次发布的步骤，以及首发后需要的人工设置，都写进任务，并由维护者确认后执行。

**Non-Goals:**
- Node 原生 ESM 双格式（`.mjs` + `.d.mts` / `.d.cts`）：只在 README 中写明限制，以后单独做一个 change。
- croact-moveable 的类型：它的声明就是 react-moveable 主入口（React 组件）的重新导出，这是它本身的定位，不在本次范围内。
- 在 React 16–18 上测试、预发布通道（`next` dist-tag）、发布后自动更新 demo 站点（`Deploy demo` 仍然手动触发）。
- 落地页和 README 中其它指向上游的链接：只改「Contribute」链接。

## Decisions

### 1. 在源码中写出类型，不改入口和声明的生成方式

需要做到的是：从 `@moveable-next/react/types` 出发的类型依赖不经过 react-moveable 的入口。问题出在 tsc 合成的模块路径上，所以修复也放在合成发生的地方：让这些位置引用的类型都是本文件 import 进来的具名类型，tsc 就会直接使用这些名字，不再合成路径。

- `ables/consts.ts`：把 `MOVEABLE_ABLES` 声明为 `readonly [typeof BeforeRenderable, typeof Default, ...]`，声明文件中只有 `typeof X` 加上对各个 able 模块的 import，不再展开每个 able 的类型。展开前后在结构上是同一个类型，`MOVEABLE_PROPS`、`MOVEABLE_EVENTS` 等由它推导出的类型不变。顺带让 `consts.d.ts` 从展开的几百行变为几十行。
- `edgeDraggable.tsx`：给转发的 5 个方法写上返回类型（`false | OnDragStart`、`OnDrag | undefined` 等，与 `Draggable` 中对应方法的返回类型相同）。
- `Resizable.ts`、`Scalable.ts`：给 `render` 写上类型注解，参数类型用 `../types` 中的 `RenderDirections`、`Renderer`。具体写法在实现时选择不需要类型断言的那一种，例如声明一个模块级的、带类型注解的常量。

考虑过的其它做法：
- 去掉入口对 types 的重新导出：会破坏公开 API（`import { OnDrag } from "@moveable-next/react"`），否决。
- 改用合并声明的工具（如 rollup-plugin-dts、api-extractor），或者对生成的 `.d.ts` 做后处理：要替换现有的声明流程和 `declaration/` 的结构（library-build spec 要求按源码逐个输出），改动远大于问题本身，否决。
- 给 21 个 able 都写上显式类型：这 4 处以外的推断结果没有问题，否决。

防止回归靠下一条决策中的测试，不靠约定：以后有人在 able 中新增一个推断出来的类型，测试会失败。

### 2. moveable 的类型测试检查参与编译的文件

moveable 新增：
- `test/types.ts`：按使用者的写法引用 `../declaration`（与 vue3-moveable 的 `test/types.ts` 相同），覆盖构造、选项、事件监听、`@moveable-next/react/types` 中的重新导出类型。
- `tsconfig.test.json`：`noEmit`、`skipLibCheck: false`、`types: []`，只包含 `test/types.ts`。
- `test/checkTypes.mjs`：用 TypeScript 的 API 按 `tsconfig.test.json` 创建 program。有诊断信息时打印并失败；参与编译的文件中出现 `/@types/react/` 时，列出这些文件并失败。
- `test:type` 脚本执行这个检查，并作为 `build` 的最后一步（与 vue3-moveable 相同）。

由于上面「测试环境的限制」，检查的是文件列表而不是 `Cannot find module` 错误。文件列表能更早、更准确地发现问题：只要类型依赖经过 React，就会失败，不管使用方有没有装 `@types/react`。测试要先在当前代码上运行并确认失败，再修改源码。vue3-moveable 的类型依赖经过 moveable，所以不再单独加检查；它现有的 `test:type` 保持 `skipLibCheck: true`。

### 3. changesets 配置

`.changeset/config.json`：
- `fixed: [["@moveable-next/react", "@moveable-next/croact", "@moveable-next/vanilla", "@moveable-next/vue3"]]`。helper 不在任何组中。
- `access: "public"`（作用域包第一次发布默认是 restricted）、`baseBranch: "main"`、`updateInternalDependencies: "patch"`、`privatePackages: { version: false, tag: false }`。
- `changelog: ["@changesets/changelog-github", { "repo": "colinli007/moveable-next" }]`：条目带 PR 链接和作者。它在升级版本时需要 `GITHUB_TOKEN`，CI 中由 changesets/action 提供，本地用 `gh auth token`。

`@changesets/cli`、`@changesets/changelog-github` 只在根 `package.json` 中声明，符合依赖规则。根目录新增脚本 `"release": "pnpm packages:build && changeset publish"`，CI 和本地首次发布都用它。`changeset publish` 在 pnpm 工作区中调用 `pnpm publish`，后者会替换 `workspace:` 协议。

内部依赖保持 `workspace:~`：同组的四个包版本始终相同，发布后的 `~0.1.0` 正好覆盖同一个 minor 下的 patch。

### 4. 首发版本：先改为 0.0.0，再用 changeset 升到 0.1.0

5 个包的 `version` 先改为 `0.0.0`，删除继承来的 CHANGELOG，然后为每个包写一份 minor changeset，说明各包基于上游哪个版本：react-moveable 0.56.0、croact-moveable 0.9.0、moveable 0.53.0、vue3-moveable 0.28.0、@moveable/helper 0.1.3，并附上上游 CHANGELOG 的链接。执行 `changeset version` 后都升到 0.1.0，CHANGELOG 由工具生成。

另一种做法是直接把版本改为 0.1.0，手写 CHANGELOG。否决的原因是：第一条记录会和以后由工具生成的格式不一致，而且没有用工具实际走过一次版本升级，配置是否正确要等到第二个版本才知道。

`changelog-github` 要根据 changeset 的提交在 GitHub 上找 PR 和作者，所以执行 `changeset version` 之前要先把 changeset 的提交推送到远端。

### 5. 发布工作流

新增 `.github/workflows/release.yml`：
- 触发：push 到 `main`。
- `checks` job：`uses: ./.github/workflows/run-e2e.yml`，复用全部检查。`run-e2e.yml` 增加 `workflow_call`；它的 `push` 触发改为 `branches-ignore: [main]`，避免 `main` 上同一提交跑两遍检查。这样每次推送仍然都会执行全部检查（monorepo-tooling 的「CI 执行全部自动化检查」不变）。
- `release` job：`needs: checks`，`environment: npm`，`permissions: contents: write, pull-requests: write, id-token: write`，`concurrency` 组为 `release`，不取消正在运行的任务。依次执行：checkout、pnpm、Node、`pnpm install --frozen-lockfile`，然后运行 changesets/action（`version: pnpm changeset version`，`publish: pnpm release`）。
- 没有 `NPM_TOKEN`：`changeset publish` 对每个包调用 `pnpm publish`。pnpm 11 在 GitHub Actions 中用 `id-token: write` 取得 OIDC 令牌，向 npm 换取发布 token，公开仓库下自动启用 provenance。所以不需要升级 Node 自带的 npm。（实现时查证：pnpm 11.28.2 的 CHANGELOG 和 `releasing/commands/lib/publish/oidc/` 实现；OIDC 成功时会覆盖 `.npmrc` 中的静态 `_authToken`，未设置的 `${NODE_AUTH_TOKEN}` 占位按空值处理，见 pnpm#11513。）

考虑过的其它做法：
- `workflow_run` 在 Tests 完成后触发：要自己处理 `head_sha` 的检出，changesets/action 对这种触发的分支语义也不直观，否决。
- 不调用 `run-e2e.yml`，只在 release job 中执行构建：不满足「检查通过后才发布」，否决。
- 使用 `NPM_TOKEN`：用户已经选择可信发布，不保存长期 token。

需要的仓库设置（由维护者确认后用 `gh api` 执行）：
- 允许 Actions 创建 PR：`PUT repos/{repo}/actions/permissions/workflow`，设置 `can_approve_pull_request_reviews: true`，`default_workflow_permissions` 保持 `read`，写权限由 job 级的 `permissions` 单独授予。
- 新建环境 `npm`，部署分支只允许 `main`。

### 6. 首次发布和可信发布配置的顺序

npm 只能给已经存在的包配置可信发布，所以按以下顺序：
1. 合并类型修复、changesets 配置，以及 `0.0.0` → `0.1.0` 的版本提交（这时还不加 `release.yml`）。
2. 维护者在本地 `main` 上执行 `npm login`，然后运行 `pnpm release`（输入 OTP），并推送 `changeset publish` 创建的标签。
3. 维护者在 npmjs.com 上为每个包添加可信发布：仓库 `colinli007/moveable-next`，工作流 `release.yml`，环境 `npm`，Allowed actions 勾选「Allow npm publish」（不勾 dist-tag），发布权限设为「需要 2FA 并禁止 token」。
4. 再合并 `release.yml` 和上面的仓库设置。
5. 在可信发布配置创建后 2 天内由 CI 完成一次发布，验证配置。

如果先加 `release.yml`，合并版本提交时 CI 会尝试发布，并因为没有可信发布配置而失败。

配置可信发布时查到的 npm 规则（2026-10-27，[npm 文档](https://docs.npmjs.com/trusted-publishers)）：
- 2026-09-03 之后新建的配置默认只允许 `npm stage publish`：版本进入待审队列，要维护者用 2FA 逐个批准后才可安装。`changeset publish` 调用的是 `pnpm publish`（直接发布），所以要勾选「Allow npm publish」。只用暂存发布需要把 `release` 脚本改为 `pnpm pack` 后用 npm ≥ 11.15.0 执行 `npm stage publish`，标签和 GitHub Release 也要另行处理，每次发版还要人工批准 4 个包；用户选择了直接发布，检查通过后才发布的保证由 `release.yml` 提供。
- 新建的配置必须在 2 天内成功发布一次，否则失效，只能删除后重建。helper 不在 fixed 组中，react 组发版时它不会发布，所以只为四个 fixed 包配置；helper 等到它第一次要发新版本时再配置，并在 2 天内由 CI 发布。

### 7. 文档

- 根 README，以及 react、vanilla、vue3 的包 README：增加一节「Node ESM」，说明 Node 的 `import` 加载的是 CJS 产物，以及在 `moduleResolution: node16` / `nodenext` 的 ESM 项目中，默认导入的类型与运行时不符，并给出绕过方法（使用打包工具，或者使用 `moduleResolution: bundler`）。helper 没有 README，不新增。
- `CONTRIBUTING.md`：环境（`nvm use`、`pnpm install`）、常用检查命令，以及添加 changeset（`pnpm changeset`）、版本 PR 和发布流程的简述。根 README 中原有的相对链接因此可以用了；包 README 中指向 `daybrush/moveable/blob/master/CONTRIBUTING.md` 的链接改为本仓库 `main` 上的这个文件。
- CLAUDE.md：在常用命令中补上 `pnpm changeset`，说明发布只在 CI 中进行；删除或改写「发布」相关的过时描述。ROADMAP：第 6 步完成后更新状态，并移除已经解决的「类型声明 import react」遗留项。

## Risks / Trade-offs

- [OIDC 发布依赖 pnpm 自己的实现（已查证 pnpm 11.28.2 支持）] → 第一次 CI 发布后，在 npm 页面上确认有 provenance 标记。如果以后某个 pnpm 版本出现回归，备选是「先 `pnpm pack` 替换 `workspace:` 协议，再用 npm ≥ 11.5.1 发布 tarball」，只影响 `release` 脚本。
- [`.npmrc` 中的 token 占位干扰 OIDC] → changesets/action v2 已不再处理 `.npmrc`（v1 在设置了 `NPM_TOKEN` 时会写入一行），工作流也不给 `setup-node` 传 `registry-url`，所以不会出现占位；即使出现，pnpm 11 在 OIDC 成功时也会用换来的 token 覆盖静态 `_authToken`。工作流和仓库中都不设置 `NPM_TOKEN`、`NODE_AUTH_TOKEN`。
- [`github-actions[bot]` 创建的版本 PR 不会自动运行 `pull_request` 工作流：`Tests` 显示为等待维护者批准（Action required），批准前 PR 上没有检查结果] → 版本 PR 只包含版本号和 CHANGELOG 的改动；合并后 `release.yml` 会先执行全部检查，失败就不发布。想在 PR 上看到结果时可以批准运行。在 CONTRIBUTING.md 中写明这一点。
- [changesets/action v2 通过 GitHub API 提交版本 PR，API 拒绝带可执行权限的文件] → 第一次开版本 PR 时因 vue3-moveable 的 `package.json`、`.gitignore`（上游以 `100755` 加入）失败，改为 `100644` 后通过。以后新增文件不要带可执行权限，脚本文件也不要放进 changeset 会修改的位置。
- [首次发布依赖维护者本地的 npm 登录和 2FA] → 任务中写明命令和顺序；发布前先用 `pnpm pack --dry-run` 和 publint 检查。
- [合并后的元组类型与原来展开的类型如果有细微差异，会影响使用方的类型推断] → react-moveable 的 `test:type`（`tests/types.ts`）、vue3-moveable 的类型测试和 `pnpm doc` 都必须通过；比较修改前后的 `declaration/`，只允许这 4 个文件变化。
- [发布出错的版本无法复用版本号] → 72 小时内可以 `npm unpublish`，否则用 `npm deprecate` 并发布一个 patch。首次发布前的检查清单写进任务。

## Migration Plan

按决策 6 的顺序执行。回退：
- `release.yml` 出问题时，删除或禁用这个工作流不影响已发布的包。
- 可信发布配置可以在 npm 上随时修改或删除。

## Open Questions

- ~~改为可信发布后，是否同时把每个包的发布权限设为「需要 2FA 并禁止 token」~~ → 已决定（2026-10-27）：设置。可信发布不受这个选项影响，本地发布仍可用 `npm login` + OTP。
