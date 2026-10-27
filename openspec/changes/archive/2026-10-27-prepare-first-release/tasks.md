## 1. 类型声明不再依赖 React（design 决策 1、2）

- [x] 1.1 记录基线：全量构建（`pnpm packages:build`）后，把 5 个包的 `dist/` 和 `declaration/` 复制到临时目录，供 1.5 比较
- [x] 1.2 moveable 新增 `test/types.ts`（按使用者写法引用 `../declaration`，覆盖构造、选项、`on("drag")` 事件参数、从 `@moveable-next/react/types` 重新导出的类型）、`tsconfig.test.json`（`noEmit`、`skipLibCheck: false`、`types: []`）和 `test/checkTypes.mjs`（TypeScript API 建 program；有诊断就失败，参与编译的文件含 `/@types/react/` 就列出并失败），`package.json` 增加 `test:type` 并接在 `build` 最后；在当前代码上执行 `pnpm --filter @moveable-next/vanilla test:type`，确认它因 `@types/react` 失败（记下列出的文件）
- [x] 1.3 react-moveable：`src/ables/consts.ts` 的 `MOVEABLE_ABLES` 改为显式元组类型 `readonly [typeof BeforeRenderable, ...]`；`edgeDraggable.tsx` 的 5 个转发方法写上返回类型；`Resizable.ts`、`Scalable.ts` 的 `render` 用 `RenderDirections`、`Renderer` 写出类型（不用类型断言）；重新生成声明后 `declaration/` 中 `import("..")` 出现 0 次
- [x] 1.4 再执行 moveable 的 `test:type` 并确认通过；临时把 1.3 的某一处改回去，确认测试又失败并列出 `@types/react`，然后还原
- [x] 1.5 回归：`pnpm lint`、`pnpm packages:build`（含 react-moveable 的 `test:type`、vue3-moveable 的类型测试）、`pnpm test`、`pnpm doc`、`pnpm --filter @moveable-next/react typecheck:stories` 全部通过；与 1.1 的基线比较：`dist/` 逐字节相同，`declaration/` 只有 `ables/consts.d.ts`、`ables/edgeDraggable.d.ts`、`ables/Resizable.d.ts`、`ables/Scalable.d.ts` 有变化
- [x] 1.6 使用方验证：用 `pnpm pack` 打出 react、croact、vanilla、vue3 四个 tarball，在临时目录中用 npm 安装（不装 `@types/react`），分别用 `skipLibCheck: false` 检查一段使用 `@moveable-next/vanilla` 和 `@moveable-next/vue3` 的代码，确认没有 `Cannot find module 'react'`（对应 library-build 新增 requirement 的两个场景）

## 2. changesets 与首个版本（design 决策 3、4）

- [x] 2.1 实现前查证：pnpm 11 的 `pnpm publish` 是否支持 npm 可信发布（OIDC），以及 changesets/action 当前版本在没有 `NPM_TOKEN` 时的行为。把结论写进 design 的 Risks；如果需要改用「`pnpm pack` 后用 npm 发布」，先更新 design 决策 3 中的 `release` 脚本再继续
- [x] 2.2 根目录增加 devDependencies `@changesets/cli`、`@changesets/changelog-github`，新增 `.changeset/config.json`（fixed 组、`access: public`、`baseBranch: main`、`updateInternalDependencies: patch`、`privatePackages` 不参与、changelog-github 指向 `colinli007/moveable-next`）和 `.changeset/README.md`，根脚本增加 `"release": "pnpm packages:build && changeset publish"`（`pnpm changeset` 由 pnpm 直接执行依赖中的可执行文件，不需要脚本）；`pnpm install` 成功，`pnpm lint`（含依赖范围检查）通过，`pnpm changeset status` 能运行
- [x] 2.3 删除 6 个上游 CHANGELOG（根目录和 5 个包），5 个包的 `version` 改为 `0.0.0`；为每个包写一份 minor changeset，说明基于的上游包名、版本和上游 CHANGELOG 链接（react-moveable 0.56.0、croact-moveable 0.9.0、moveable 0.53.0、vue3-moveable 0.28.0、@moveable/helper 0.1.3）；`pnpm changeset status` 显示四个 fixed 包和 helper 都将升到 0.1.0
- [x] 2.4 验证版本规则（不提交结果）：在临时分支上加一份只改 `@moveable-next/react` 的 patch changeset 并执行 `pnpm changeset version`，确认 react、croact、vanilla、vue3 都升到同一版本、helper 不变；再单独验证只改 helper 的情况；完成后丢弃这个分支

## 3. 文档（design 决策 7）

- [x] 3.1 根 README，以及 react-moveable、moveable、vue3-moveable 的 README，增加「Node ESM」一节，写明限制和绕过方法；`Contribute` 链接改为本仓库 `main` 上的 `CONTRIBUTING.md`（根 README 保持相对链接）
- [x] 3.2 新增 `CONTRIBUTING.md`：环境、检查命令、`pnpm changeset` 的用法、版本 PR 和 CI 发布流程（包括版本 PR 上不显示检查结果的原因）；README 中的链接能在 GitHub 上打开
- [x] 3.3 更新 CLAUDE.md：常用命令加上 `pnpm changeset` 和 `pnpm release`（说明后者只用于新包的第一次本地发布）、发布流程概述、版本规则（四包锁版 + helper 独立）

## 4. 首个版本和首次发布（design 决策 6，需要维护者操作）

- [x] 4.1 推送第 1–3 组的提交（含 changeset）后，执行 `GITHUB_TOKEN=$(gh auth token) pnpm changeset version`：5 个包都是 0.1.0，各包 CHANGELOG 只有 0.1.0 一条且带 PR 或提交链接，`.changeset/` 中的 changeset 被消耗；`pnpm install` 后锁文件没有意外变化；提交并合并到 `main`
- [x] 4.2 发布前检查：`pnpm packages:build` 后对每个包执行 `pnpm pack --dry-run` 和 publint，文件清单符合 library-build「包名、入口与发布内容」，`package.json` 中的内部依赖是 `~0.1.0`，不是 `workspace:`
- [x] 4.3 【维护者】在本地 `main` 上 `npm login`，执行 `pnpm release`（输入 OTP）；`npm view @moveable-next/<包> version` 对 5 个包都返回 0.1.0；推送 `changeset publish` 创建的 5 个 git 标签
- [x] 4.4 【维护者】在 npmjs.com 上为 react、croact、vanilla、vue3 添加可信发布：仓库 `colinli007/moveable-next`、工作流 `release.yml`、环境 `npm`，勾选「Allow npm publish」、不勾 dist-tag；5 个包的发布权限都设为「需要 2FA 并禁止 token」。helper 暂不配置可信发布（design 决策 6）。配置在 2 天内要由 5.3 的发布验证

## 5. CI 发布流程（design 决策 5）

- [x] 5.1 【维护者确认后执行】仓库设置：用 `gh api` 允许 Actions 创建 PR（`can_approve_pull_request_reviews: true`，`default_workflow_permissions` 保持 `read`）；新建环境 `npm`，部署分支只允许 `main`；再用 API 读取这两项设置，确认已生效
- [x] 5.2 `run-e2e.yml` 增加 `workflow_call`，`push` 改为 `branches-ignore: [main]`；新增 `release.yml`（`checks` 调用 `run-e2e.yml`；`release` 需要 `checks`，使用环境 `npm`，权限 `contents: write`、`pull-requests: write`、`id-token: write`，`concurrency: release`；安装依赖后运行 changesets/action，`publish: pnpm release`）；工作流里没有 npm token；用 actionlint 检查语法（或在推送后看 Actions 页面没有解析错误）
- [x] 5.3 端到端验证：合并 5.2 后，确认 `main` 上的运行中 `checks` 通过、`release` 没有可发布的内容，并正常结束；再用一个真实的小改动验证（4.4 的配置创建后 2 天内）：react、vanilla、vue3 的 README 中指向上游 `daybrush.com/moveable`、`github.com/daybrush/moveable` 的链接改为本仓库和 demo 站点，加一份四个 fixed 包的 patch changeset；合并后 CI 打开版本 PR；合并版本 PR 后，CI 发布四个 fixed 包的 0.1.1，npm 页面显示 provenance，仓库中有对应的标签和 GitHub Release（2026-10-27：第一次开版本 PR 时失败，vue3-moveable 的 `package.json`、`.gitignore` 是上游带来的可执行文件，GitHub API 拒绝提交，改为 `100644` 后通过；0.1.1 四个包都带 SLSA provenance，vanilla 的内部依赖是 `~0.1.1`，4 个标签和 GitHub Release 都已创建）
- [x] 5.4 在一个非 `main` 的分支上手动推送并确认 `release.yml` 不会运行发布，或者在环境限制下被拒绝（对应 spec 的「其它分支不能发布」）；检查仓库和环境的 secrets 中没有 npm token（推送 `docs/readme-links` 只触发了 `Tests`；仓库和 `npm` 环境的 secrets 都是 0 个）

## 6. 收尾

- [x] 6.1 更新 `openspec/ROADMAP.md`：第 6 步改为已完成并写明本 change，移除已解决的「类型声明 import react」和「CONTRIBUTING.md 不存在」两条遗留，保留 ESM 双格式一条并注明 README 已写明限制
- [x] 6.2 `openspec validate prepare-first-release --strict` 通过
