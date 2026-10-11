## 1. 建立基线（Node 16.20.2 + yarn 1，不修改仓库文件）

- [x] 1.1 执行 `nvm use 16.20.2 && corepack enable`，确认 `yarn -v` 是 1.x 并把版本写入本 change 目录的 `baseline.md`；然后在根目录执行 `yarn --frozen-lockfile`，验证：安装成功，`git status` 中除了新增的 `baseline.md` 之外没有任何变化
- [x] 1.2 执行 `yarn packages:build 2>&1 | tee` 保存构建日志，把每个包 `dist` 和 `declaration` 的文件清单与体积（`find packages/*/dist packages/*/declaration -type f -exec ls -l {} +`）以及日志里 rollup 的「未解析依赖」警告记录到 `baseline.md`，验证：react-moveable、croact、preact、moveable、lit、vue3、svelte、helper 都有 `dist`；如果基线本身就有「未解析」警告，逐条写进 `baseline.md` 并标注出来，作为 spec「没有未解析模块」场景的已知例外，等用户确认后再处理
- [x] 1.3 在 `packages/react-moveable` 下执行 `yarn test:ci`，把通过和失败的 story 清单写入 `baseline.md`；另外单独启动一次 `yarn storybook`，记录启动时的全部警告（预计会有 `addon-essentials` 加载失败），验证：`baseline.md` 中有测试总数、失败清单（没有失败也要写明）和启动警告清单
- [x] 1.4 在 hoist 布局下，从实际使用方所在的目录执行 `node -p "require.resolve('<name>/package.json')"` 再读 version，记录这些包实际解析到的版本和路径，写入 `baseline.md`：
  - react-moveable：`webpack`、`fork-ts-checker-webpack-plugin`、`@storybook/client-api`、`@storybook/theming`、`playwright`
  - moveable、preact：`framework-utils`
  - vue3、svelte：`@daybrush/utils`
  - 每个 rollup 包：`rollup`
  - helper：`eslint`、`@typescript-eslint/parser`、`@typescript-eslint/eslint-plugin`、`eslint-plugin-import`、`eslint-plugin-react`
  - 根目录：`@scena/event-emitter`、`jsdoc`
  - 从 `packages/react-moveable/dist` 出发：`croact`

  验证：每一项都有版本号和解析路径；webpack 如果是 5.x，要按 design 决策 2 在 `baseline.md` 里注明「有意偏离基线」

## 2. 删除不再支持的包（仍用 yarn + Node 16）

- [x] 2.1 删除 `packages/vue-moveable`、`packages/ngx-moveable`、`packages/snappable`、根目录 `storybook/`，验证：这些目录不存在
- [x] 2.2 删除 `config/update-type-consts.js`；从根 `package.json` 的 `workspaces` 中去掉 `packages/ngx-moveable/projects/ngx-moveable`，删除 `update-type-consts` 脚本，并从 `packages:build` / `packages:publish` 中去掉 Angular 常量生成步骤和对已删除包的 `--ignore`；`lerna.json` 的 `packages` 做同样修改，验证：在仓库中 grep `ngx-moveable`、`update-type-consts`，只剩 CHANGELOG 和 README 里的引用
- [x] 2.3 修改 `packages/react-moveable/croffle.config.js`：删除 Vue 2 和 Angular 的 waffle、`ngxModuleSirup`、`ngxTemplateSirup` 以及不再使用的 import，从 `cleanPaths` 中去掉 `vue2`、`angular`，验证：先手动删掉 `stories/**/vue2/`、`stories/**/angular/` 这些旧的生成目录（它们在 `.gitignore` 里，`cleanPaths` 不会再清理），再执行 `yarn bake`，之后只生成 script、vue3、svelte、lit 目录
- [x] 2.4 修改 `packages/react-moveable/stories/utils/story.tsx`，删除 Vue2 和两个 Angular 代码 tab；删除 `stories/utils.ts` 中不再被引用的 `convertAngularTemplate`；去掉 `tsconfig.json` 的 angular exclude 和 `.gitignore` 中 vue2、angular 的条目，验证：`yarn test:type` 和 `yarn lint` 通过，Storybook 的代码面板里没有 Vue2 和 Angular tab
- [x] 2.5 执行 `yarn` 刷新 `yarn.lock` 后重新跑 `yarn packages:build` 和 `yarn test:ci`，验证：产物文件清单、测试结果都与 `baseline.md` 一致，且 `yarn.lock` 中不再有 `@angular/`、`@vue/cli-service`、`ng-packagr`；`vue-template-compiler` 只允许作为 `vue-tsc` → `@vue/language-core` 的传递依赖存在（用户已确认的例外，见 `baseline.md` 第 5 节）

## 3. 切换到 pnpm + Node 22.20.0

- [x] 3.1 新增 `.nvmrc`（内容为 `22.20.0`）；在根 `package.json` 中加 `engines.node` 和 `packageManager`（实施时最新稳定版 pnpm 的精确版本），验证：在根目录执行 `nvm use` 切到 22.20.0，`pnpm -v` 输出声明的版本
- [x] 3.2 先改配置，不执行安装（design 决策 1、4、5）：
  - 新增 `pnpm-workspace.yaml`（只包含 `packages/*`），删除 `packages/svelte-moveable/.npmrc`。pnpm 11 的 `.npmrc` 只读认证配置，所以不新建 `.npmrc`，也不配置任何 hoist 选项
  - 把根 `resolutions` 原样迁移成 pnpm overrides，删除 `workspaces`（包括 `nohoist`）和 `resolutions`
  - 把各包对内部包的依赖改成 `workspace:~`（croact、preact、moveable、lit、vue3、svelte）
  - 从根 devDependencies 中移除 `lerna`、`lerna-changelog`、`@daybrush/release`；确认 `cpx`、`intercept-stdout` 没有其它引用后一并移除

  验证：`git diff` 中这几处修改齐全，内部依赖里已经找不到普通的 semver 范围（例如 `~0.56.0`）
- [x] 3.3 按 `baseline.md` 记录的版本补齐三类缺失依赖（design 决策 2）：
  - react-moveable：`webpack`（4.x）、`fork-ts-checker-webpack-plugin`、`@storybook/client-api`、`@storybook/theming`、`rollup`
  - moveable、preact-moveable：`framework-utils`
  - vue3-moveable、svelte-moveable：`@daybrush/utils`
  - croact、helper、lit、moveable、preact：`rollup`
  - helper：eslint 及 4 个插件/解析器
  - 根目录：`@scena/event-emitter`

  验证：每一条新增依赖都能在 `baseline.md` 里找到对应的使用位置和版本
- [x] 3.4 执行 `pnpm import` 生成 `pnpm-lock.yaml`，然后删除 `yarn.lock` 和 `.yarnrc`，执行 `pnpm install --frozen-lockfile`，验证：
  - 安装成功，`pnpm why typescript` 只有 4.8.x
  - react-moveable、gesto、rollup 等关键依赖的版本与 `yarn.lock` 相同
  - `packages/moveable/node_modules/react-moveable` 是指向 `packages/react-moveable` 的符号链接
  - `pnpm-lock.yaml` 中不存在 `@angular/`、`@vue/cli-service`、`ng-packagr`；`vue-template-compiler` 只作为 `@vue/language-core` 的依赖被安装（锁文件里只有一份，由 vue-tsc 引入；fork-ts-checker-webpack-plugin 把同一份链接为它的可选 peer，与 hoist 布局下的行为一致）
- [x] 3.5 执行 `pnpm approve-builds`，只批准确实需要执行构建脚本的依赖（如 esbuild），写进 `allowBuilds`（pnpm 11 起取代 `onlyBuiltDependencies`），验证：vue3 和 svelte 用到的 vite 能正常执行 `vite build`
- [x] 3.6 删除 `lerna.json`；按 design 决策 6 改写根脚本和各包脚本（`yarn` / `npm run` 改成 pnpm，`npx http-server` 改成 `pnpm exec http-server`），删除 `bootstrap`、`packages:update`、`packages:publish`、`changelog`、`release`，以及 `packages/moveable` 中的 `prerelease`、`release`、`release:init`、`release:before`、`deploy`、`storybook` 脚本，验证：在所有 `package.json` 中 grep 不到 `lerna`、`lerna-helper`、`prerelease`，也没有任何脚本执行 `npm publish`、`pnpm publish` 或 `changeset publish`（svelte-moveable 的 `prepublishOnly` 只是打包步骤，保留）
- [x] 3.7 每个包单独执行 `pnpm --filter <pkg> build`（helper 的 build 包含 lint），验证：没有出现 `command not found` 或 "Cannot find module"。如果又暴露出新的缺失依赖，每补一条都要对应到真实的 import、可执行文件调用或配置路径，并补记到 `baseline.md`；补完后执行 `pnpm install` 更新锁文件
- [x] 3.8 moveable 的 UMD（design 决策 3）：先在不做修改的情况下构建 moveable，确认是否复现了 croact 的「未解析」警告，以及 `dist/moveable.js` 里是否有对外部 `croact` 的引用。复现了就在 `packages/moveable/rollup.config.js` 里把 croact 解析到 moveable 自己的依赖；复现不了就不改，并在 `baseline.md` 里记录，验证：构建日志里没有 croact 相关的「未解析」警告，`dist/moveable.js` 和 `moveable.min.js` 中 grep 不到 `require('croact')`、`require("croact")` 和 `global.croact`，体积与基线一致（误差需要给出原因）
- [x] 3.9 新增 `config/deploy.mjs`（读取 moveable 版本号，对三条规则中的每个目标执行先清空再复制），根脚本 `deploy` 改为 `node config/deploy.mjs && pnpm demo:deploy`，验证：
  - 执行 `pnpm doc` 能正常生成 `doc/`，`jsdoc.json` 引用的路径有效
  - 单独执行 `node config/deploy.mjs` 后，`demo/release/<moveable 版本>/{dist,doc}`、`demo/release/latest/{dist,doc}`、`demo/helper/release/<moveable 版本>/dist`、`demo/helper/release/latest/dist` 都存在，且与源目录 `diff -r` 一致
  - 本步骤不执行推送
- [x] 3.10 Storybook（design 决策 8）：
  - 在 react-moveable 的 `storybook`、`test:build`、`test:fail-build`、`build:storybook` 脚本前加 `NODE_OPTIONS=--openssl-legacy-provider`
  - 执行 `pnpm --filter react-moveable exec playwright install chromium`
  - 如果出现找不到 preset 或 addon 的问题，把 `.storybook/main.js` 的 `addons` 和 `framework` 改写成用 `require.resolve` 计算出来的绝对路径

  验证：在 Node 22 下执行 `pnpm storybook`，6006 端口能打开，没有 `ERR_OSSL_EVP_UNSUPPORTED`，启动警告与 `baseline.md` 中记录的一致。如果做了上述处理后仍有其它错误，按停止规则停下并上报，不在本 change 内打补丁、不加 `public-hoist-pattern`
- [x] 3.11 在 Node 22 下执行 `pnpm --filter react-moveable test:ci`，验证：通过的 story 集合与 `baseline.md` 一致，失败集合没有扩大
- [x] 3.12 产物对比：重新执行 `pnpm packages:build` 并保存日志，验证：
  - 各包 `dist` 和 `declaration` 的文件清单与 `baseline.md` 一致，体积差异逐项给出原因
  - 日志中没有「未解析依赖」警告，基线 `baseline.md` 第 2.1 节登记的例外（react-moveable、helper、lit-moveable 的 ESM/CJS 构建，用户已确认）除外，且例外清单不扩大
  - `croact-moveable`、`moveable`、`preact-moveable`、`lit-moveable` 的 `dist` 中 grep 不到 `__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED`（即 react / react-dom 没有被误打包进去）
  - 3.8 的 UMD 检查依然通过
- [x] 3.13 收尾检查：执行 `rm -rf node_modules packages/*/node_modules && pnpm install --frozen-lockfile`，验证：锁文件没有变化（`git status` 中 `pnpm-lock.yaml` 没有修改），安装成功

## 4. CI 与文档

- [ ] 4.1 按 design 决策 9 改写 `.github/workflows/run-e2e.yml`（pnpm setup、Node 版本读 `.nvmrc`、缓存 pnpm store 和 Playwright、显式安装 Playwright 浏览器、使用当前主版本的 upload-artifact），验证：推送到 origin 后工作流的 Storybook 测试任务通过；用一个故意让 story 失败的临时提交确认能上传 `failed snapshot` 产物，验证完 revert
- [x] 4.2 更新 `CLAUDE.md`：包管理器、命令（yarn 改 pnpm）、Node 版本、包依赖链（去掉 vue-moveable 和 ngx-moveable）、构建流程（去掉 Angular 常量生成）、croffle 生成的框架列表，验证：在 `CLAUDE.md` 中 grep 不到 `yarn`、`lerna`、`ngx`、`Angular`、`Vue2`
- [x] 4.3 从根 README、`packages/moveable/README.md`、`packages/lit-moveable/README.md`、`packages/vue3-moveable/README.md` 中删除 Angular 和 Vue 2 的徽章与链接，删除 `handbook/handbook.md` 中的 Angular Example，验证：这些文件中 grep 不到 `ngx-moveable` 和 `vue-moveable`（`vue3-moveable` 除外）
- [x] 4.4 最终整体验证：在全新克隆中执行 `nvm use && pnpm install --frozen-lockfile && pnpm packages:build && pnpm --filter react-moveable exec playwright install chromium && pnpm --filter react-moveable test:ci`，验证：全部成功；执行 `openspec validate migrate-to-pnpm-monorepo --strict` 通过
