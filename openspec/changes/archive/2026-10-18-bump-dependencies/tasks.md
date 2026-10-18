「全量检查」指 design 决策 7 的 5 条 CI 命令加 `pnpm doc`，全部通过才算这一项完成。「已弃用警告」统一用 `pnpm install --resolution-only --force` 观察。每一步的结果（测试数量、警告、意外变化）都记入 `baseline.md`。

## 1. 基线

- [x] 1.1 在当前提交上执行一次全量检查和 `pnpm build:storybook`，记录测试数量（预期 162 个）和已弃用警告（预期 12 个）。验证：结果写进 `baseline.md` 的「基线」一节。
- [x] 1.2 在 scratchpad 中保存两份基线，对比脚本也放在 scratchpad：
  - 产物结构：全部可发布包 `pnpm packages:build` 之后的导出名集合、CJS `require` 形状、外部模块清单、UMD 内联的包名清单。
  - `pnpm bake` 后全部生成目录的副本。

  验证：对比脚本在未改动的代码上运行，两份结果都与基线完全一致。

## 2. 删除未使用的依赖和不起作用的覆盖

- [x] 2.1 按 design Context 中的表格删除未使用的依赖：
  - 根目录：`tslib`。
  - react-moveable：`@babel/core`、`@scena/react-guides`、`gh-pages`。
  - helper：`@babel/core`、`gh-pages`、`keycon`、`react`、`react-dom`、`@types/react`、`@types/react-dom`、`@types/node`。
  - moveable：`gh-pages`、`react`、`react-dom`、`@types/react-dom`、`@types/node`。
  - croact-moveable：`keycon`、`@types/node`。
  - preact-moveable：`keycon`。

  验证：全量检查通过（`pnpm doc` 照常生成 `EventEmitter.html`）。如果某一项删除后检查失败，就恢复这一项，并在 design 中写明原因。
- [x] 2.2 删除 overrides 中除 `@cfcs/react>@cfcs/core` 之外的 14 条。验证：
  - 与删除前的锁文件对比，只有 design Context 中列出的变化：tslib、@egjs/agent、@egjs/list-differ、@types/react 在原范围内刷新，csstype 3.1.2 消失，ast-parser 改用 `@daybrush/utils@0.11.0`。keycon 0.3.0 在 2.1 中已删除，不会再出现 0.7.1。
  - bake 输出与 1.2 的基线逐字节相同。
  - 全量检查通过。
- [x] 2.3 核对其余覆盖，使它们满足 spec「依赖覆盖写明理由」。对保留的三项，每次去掉一项，按 design Context 中的方法确认问题会重新出现，然后恢复：
  - packageExtensions：锁文件中 preact-css-styled 的 peer 后缀消失，在 `packages/preact-moveable` 下 `node -e "require('preact-css-styled')"` 报错。
  - peerDependencyRules：`pnpm install --resolution-only --force` 出现 eslint-plugin-react 的 peer 警告。
  - `@cfcs/react>@cfcs/core`：锁文件中出现两个 `@cfcs/core`，`typecheck:stories` 失败。如果没有失败，说明这条覆盖已经不起作用，删除并记入 design。

  allowBuilds：删除 `core-js: false`，fsevents 的注释改为与现在实际的版本一致。

  验证：每条覆盖都有注释，写明针对的包、问题和删除条件；全量检查通过。

## 3. catalog

- [x] 3.1 在 `pnpm-workspace.yaml` 中加入默认 `catalog`，收录 design Context 中列出的、被两个及以上的包声明的第三方依赖，版本范围先保持不变；`catalogMode` 不设置。vitest、@vitest/browser-playwright 写确切版本并相邻放置，加注释写明两者必须一致、`pnpm update -r` 不会更新它们。验证：所有 `package.json` 中，这些依赖都改为 `catalog:`。
- [x] 3.2 新增 `config/check-dependency-ranges.mjs`，按 design 决策 4 检查重复的版本范围；根目录 `lint` 改为 ESLint 之后执行它。验证：
  - 当前代码上 `pnpm lint` 通过。
  - 临时在两个包中各写一个 `@daybrush/utils` 的版本范围，`pnpm lint` 失败，输出中有依赖名和两个包名；恢复后重新通过。
- [x] 3.3 确认这一步没有改变依赖解析。验证：
  - 锁文件中只有 `catalogs` 一节和各包的 specifier 变化，没有任何包的版本变化。
  - 全量检查通过。

## 4. 补丁版本和小版本升到最新

- [x] 4.1 先执行 `pnpm update -r`，更新 catalog 和各包中的范围（包括范围下限），peerDependencies 不变。然后手动把 catalog 中 vitest、@vitest/browser-playwright 的确切版本改成同一个最新版本。最后删除 `pnpm-lock.yaml` 和所有 `node_modules` 后重新安装（只删锁文件时 pnpm 会沿用 `node_modules/.pnpm/lock.yaml`，见 baseline 2.3），再确认 `pnpm ignored-builds` 没有新出现需要处理的构建脚本。验证：
  - `pnpm outdated -r` 只剩 design 决策 5 表格中的大版本（happy-dom 21 在 5.1 中升级）。
  - 已弃用警告只剩 glob 7、inflight（gh-pages 2）和 glob 8（@croffle/bakery）。
  - 锁文件中没有 jsdom。
  - `@types/node` 只有 22.x。
  - vitest 与 @vitest/browser-playwright 是同一个版本。
- [x] 4.2 执行全量检查和 `pnpm build:storybook`，并与 1.2 的基线对比产物结构。验证：
  - 全量检查和 Storybook 静态构建都通过。
  - 导出名集合、CJS 形状、外部模块清单与基线一致；UMD 内联的包名清单与基线一致。
  - bake 输出与基线一致。如有差异，确认来源是 croffle 依赖的升级，并记入 `baseline.md`。

## 5. 大版本

- [x] 5.1 happy-dom 升到 21。验证：helper 的单元测试通过，全量检查通过。
- [x] 5.2 确认决策 5 中暂缓的各项（React、@types/react、@types/react-dom 19，preact 11，gh-pages 6，TypeScript 7）和保持不变的 @types/node 22，与 `pnpm outdated -r` 的剩余输出一一对应，不多也不少。验证：结果记入 `baseline.md`。

## 6. 文档与收尾

- [x] 6.1 更新 CLAUDE.md：
  - catalog 的约定：
    - 被两个及以上的包使用的第三方依赖放进 catalog；第二个包开始使用某个依赖时，把它移进 catalog。
    - `pnpm lint` 会检查有没有重复的版本范围。
    - vitest 和 @vitest/browser-playwright 要手动同时升级。
  - 覆盖的约定：overrides 等覆盖必须带注释。
  - `@types/node` 与 Node 运行时的大版本一致；react-moveable 的声明也决定了间接依赖中 `@types/node: *` 解析到的版本。
  - 删除已经不准确的描述：
    - TypeScript「由各包自己声明」改为由 catalog 统一声明。
    - Lint 一节补上重复范围检查。

  验证：CLAUDE.md 中提到的依赖、版本和配置位置都能在仓库中找到。
- [x] 6.2 更新 ROADMAP：
  - 第 4 步标为已完成，在「已完成」中补上本 change 的摘要。
  - 「待进行」中：第 5 步加上 gh-pages 6，第 6 步加上 preact 11 和 React 19 的决定。
  - 「已知遗留」中：写明 croffle 带来的已弃用 glob 8。

  验证：ROADMAP 中没有指向已删除内容的描述。
- [x] 6.3 在干净的克隆中执行 `pnpm install --frozen-lockfile`、全量检查和 `pnpm build:storybook`；对一个使用 catalog 的包执行 `pnpm pack`，确认 tarball 中 `package.json` 的 `catalog:` 已经替换为实际范围。验证：全部通过，并记入 `baseline.md`。
