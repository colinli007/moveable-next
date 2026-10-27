## Why

5 个包已经改为 `@moveable-next` 作用域，npm 上的 `moveable-next` 组织也已建好，但还没有任何版本管理和发布手段：版本号是从上游继承来的，各不相同（react 0.56.0、croact 0.9.0、vanilla 0.53.0、vue3 0.28.0、helper 0.1.3）；现有 spec 也明确禁止发布脚本。另外，原生版和 Vue 3 版的类型声明会间接引用 `react` 的类型：使用者没有装 `@types/react`、又没开 `skipLibCheck` 时，类型检查会报 `Cannot find module 'react'`。这两个包的使用者都会遇到这个问题，应该在首发之前修掉。

## What Changes

- 引入 changesets 管理版本：react、croact、vanilla、vue3 四个包锁定版本（fixed 组，因为核心逻辑都在 react-moveable，改一处四个包都要发布），helper 独立演进；用 `@changesets/changelog-github` 生成 CHANGELOG。
- 首发版本统一为 0.1.0：版本号先改为 0.0.0，再用一个 minor changeset 升到 0.1.0，CHANGELOG 的第一条写明基于上游哪个版本。上游继承来的 CHANGELOG（各包和根目录的）删除，历史保留在 git 和上游仓库中。
- 新增 GitHub Actions 发布流程 `release.yml`：push 到 `main` 时先执行全部测试，通过后由 changesets/action 开「版本 PR」；合并后在 `npm` 环境中用 npm 可信发布（OIDC，自动生成 provenance）发布，不保存 npm token。`run-e2e.yml` 改为可被调用，`main` 上的检查由发布流程执行，不重复运行。
- 首次发布在本地手动执行（npm 要求包已存在才能配置可信发布），之后为 5 个包配置可信发布，后续版本都走 CI。
- **修复类型声明中的 React 依赖**：tsc 生成声明时把 able 的推断类型写成了 `import("..")`（指回 react-moveable 的入口），入口又引用了 `InitialMoveable` 和 `react`。改为在源码中写出这些类型（`MOVEABLE_ABLES` 用显式的元组类型，`edgeDraggable`、`Resizable`、`Scalable` 补上类型注解），让 `@moveable-next/react/types` 的类型依赖不再经过入口。moveable 新增类型测试：`skipLibCheck: false` 下编译一段使用方代码，并断言参与编译的文件中没有 `@types/react`。
- README 写明 Node 原生 ESM 的限制（`moduleResolution: node16` 的 ESM 项目中默认导出的类型与运行时不符），双格式留给以后单独的 change。
- 新增 `CONTRIBUTING.md`，写明开发命令和怎样添加 changeset；README 中的「Contribute」链接改为指向它。
- **BREAKING**（相对上游）：包从 0.1.0 开始重新编号，与上游版本号不再对应。

## Capabilities

### New Capabilities

无

### Modified Capabilities

- `monorepo-tooling`：删除「本阶段不提供 npm 发布入口」，新增版本管理（changesets、锁版本的包组、首发版本）和 CI 可信发布的 requirement。
- `library-build`：新增「原生版与 Vue 3 版的类型声明不依赖 React 类型」。

## Impact

- 源码：react-moveable 的 `src/ables/consts.ts`、`edgeDraggable.tsx`、`Resizable.ts`、`Scalable.ts` 只改类型写法，产物（`dist/`）不变，`declaration/` 只有这 4 个文件变化。
- moveable 新增 `test/types.ts`、`tsconfig.test.json` 和检查脚本，`build` 最后执行类型测试（与 vue3-moveable 相同）。
- 根目录：新增 devDependencies `@changesets/cli`、`@changesets/changelog-github`，新增 `.changeset/`、`release` 脚本、`CONTRIBUTING.md`；删除 6 个上游 CHANGELOG。
- 5 个包的 `version` 字段（先改为 0.0.0，再由 changeset 升到 0.1.0）。
- CI：新增 `.github/workflows/release.yml`；`run-e2e.yml` 增加 `workflow_call`，`push` 不再包含 `main`。
- GitHub 仓库设置：允许 Actions 创建 PR；新增 `npm` 环境，只允许 `main` 部署。
- npm：首次手动发布 5 个包，并为每个包配置可信发布（仓库 `colinli007/moveable-next`、工作流 `release.yml`、环境 `npm`）。
- 文档：README（ESM 限制、Contribute 链接）、CLAUDE.md（发布流程）、ROADMAP（第 6 步）。
