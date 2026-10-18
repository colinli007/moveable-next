# 基线与对比记录

基线产物、对比脚本、各步骤的完整日志都在会话的 scratchpad 中，不提交到仓库；这里只保留结论数据。全量检查用 scratchpad 中的 `fullcheck.sh` 执行，命令同 design 决策 7。

## 1. 基线（提交 d77ebe86，2026-10-16）

### 全量检查（tasks 1.1）
- `pnpm install --frozen-lockfile`、`pnpm lint`、`pnpm packages:build`、`typecheck:stories`、`pnpm test`、`pnpm doc`、`pnpm build:storybook` 全部通过。
- `pnpm test`：26 个测试文件通过，1 个跳过（27 个），162 个测试全部通过。
- 已弃用警告 12 个：abab@2.0.6、domexception@1.0.1、glob@7.2.3、glob@8.1.0、har-validator@5.1.5、inflight@1.0.6、left-pad@1.3.0、request-promise-native@1.0.9、request@2.88.2、uuid@3.4.0、w3c-hr-time@1.0.2、whatwg-encoding@1.0.5。
- 观察方法的修正：锁文件已是最新时，`pnpm install --resolution-only` 也会输出「Already up to date」并跳过解析，要加 `--force` 才会重新解析并打印警告；这条命令不改动任何文件。design 和 tasks 中的命令已经改为 `pnpm install --resolution-only --force`。

### 产物结构与 bake 输出（tasks 1.2）
- `snapshot.mjs` 读取每个包的 `dist/` 和 `declaration/`，记录：
  - ESM 的导出名、`export *` 来源、外部模块。
  - CJS 在 Node 中 `require` 后的形状：类型、键、default 的类型和键。
  - UMD 和压缩产物 sourcemap 中出现的包名（即内联的包）和全局变量名。
  - `declaration/` 的文件列表；svelte-moveable 的 `dist/` 记录文件哈希，因为它是原样复制的源码和生成的声明。
- 外部模块是在产物文本中匹配 `from "x"` / `require("x")` 得到的，注释中的示例代码（如 `import Moveable from "moveable"`）也会被匹配到。这只是一种固定的统计口径，前后用同一个脚本比较，不影响结论。
- 基线摘要：
  - 声明文件数：react-moveable 63，moveable 8，helper 5，lit 3，preact 3，croact 2，vue3 2。
  - CJS 形状：react-moveable、croact-moveable、moveable 是函数（带 default 和具名导出）；preact-moveable 是函数，只有 `defaultAbles`；helper、lit-moveable 是对象；vue3-moveable 是对象，default 为组件选项。
  - UMD 内联：moveable 14 个包（含 croact、react-css-styled），lit-moveable 17 个包（另含 lit-element、lit-html、@lit/reactive-element），helper 1 个（@daybrush/utils）。
- `bakecopy.sh` 复制 `packages/react-moveable/stories` 下全部被 git 忽略的文件（bake 生成的示例），共 660 个。
- 两份基线都重新生成过一次：`snapshot.mjs` 输出逐字节相同；重新 `pnpm bake` 后 660 个文件与基线 `diff -r` 无差异。

## 2. 删除未使用的依赖和覆盖

### 删除未使用的依赖（tasks 2.1）
- 按 design 表格删除了 6 个 `package.json` 中的 20 项，没有需要恢复的。
- 锁文件只删除，没有任何版本变化。消失的包：
  - 被删依赖本身：@scena/react-guides（连带 @scena/react-ruler）、@types/node@18.11.3、keycon@0.3.0、keycon@1.2.2、tslib 的根目录直接声明。
  - @babel/core 7.19.0 一组：@babel/* 7.19 至 7.22 的旧版本、@ampproject/remapping、browserslist 4.21.5 等。Storybook 使用的 @babel/core 7.29.7 保留。
- 全量检查全部通过，测试 162 个；`doc/` 中仍生成 `EventEmitter.html`。已弃用警告仍是 12 个，与预期一致：它们来自 jsdom 11 和 gh-pages 2，不在这一步处理。
- 构建日志中没有警告（与基线相比只有时间戳不同），`snapshot.mjs` 的结果与基线完全相同。

### 删除 14 条 overrides（tasks 2.2）
- 锁文件的变化与 design Context 一致：
  - 在原范围内刷新：@egjs/agent 2.4.2 → 2.4.4，@egjs/list-differ 1.0.0 → 1.0.1，@types/react 16.14.26 → 16.14.70，tslib 2.4.0 → 2.8.1；csstype 3.1.2 消失。
  - `@daybrush/utils` 新增 0.11.0，只被 croffle 的 `ast-parser@0.2.0` 使用。
  - 没有其它变化。keycon 0.3.0 已在 2.1 中删除，所以没有出现 0.7.1。
- bake 输出的 660 个文件与基线 `diff -r` 无差异，`snapshot.mjs` 的结果与基线相同。
- 全量检查全部通过，测试 162 个。

### 核对保留的覆盖（tasks 2.3）
在 scratchpad 的克隆中逐条去掉后观察：
- **packageExtensions（preact-css-styled）：**
  - 默认设置下去掉后，`require('preact-css-styled')` 仍然成功：preact 是从 pnpm 默认私有提升的 `node_modules/.pnpm/node_modules/preact` 解析到的，问题被掩盖了。
  - 用 `--config.hoist=false` 干净安装后对比：没有这条时报 `Cannot find module 'preact/compat'`；有这条时解析到 `preact@10.7.3/node_modules/preact/compat`。
  - 结论：这条仍然需要。注释已补充私有提升掩盖问题的说明。
- **peerDependencyRules（eslint-plugin-react）：** 去掉后 `pnpm peers check` 报 `unmet peer eslint`（已安装 10.12.0，要求 `^3 || … || ^9.7`）；有这条时 `No peer dependency issues found`。仍然需要。
- **`@cfcs/react>@cfcs/core`：**
  - 只删 override、保留锁文件时，pnpm 沿用锁文件中已满足范围的 0.0.6，看不出差别。
  - 删除锁文件和 node_modules 后重新解析，出现 `@cfcs/core@0.0.26` 和 `0.0.6` 两份，`typecheck:stories` 失败，3 个 TS2339：`isKeydown` 不在 `ReactKeyControllerResult` 上。位置是 `ReactRotateWithControlsApp.tsx` 和 `ReactSelectoMultipleGroupApp.tsx`。
  - 恢复 override 后重新解析，只有 0.0.6，检查通过。注释补上了删除条件。
- **重新解析的方法（影响 tasks 4.1）：** 只删 `pnpm-lock.yaml` 时，pnpm 会改用 `node_modules/.pnpm/lock.yaml` 这份当前锁文件，并不真正重新解析，表现是安装只需 239ms、版本完全不变。要连 `node_modules`（包括各包的 `node_modules`）一起删。tasks 4.1 已按此修改。
- **allowBuilds：**
  - 检查了 fsevents 2.3.3、preact 10.7.3、playwright 1.64.0：都没有 preinstall / install / postinstall 脚本。core-js 已不在锁文件中。只有 esbuild 有 `postinstall`。
  - 在克隆中只保留 `esbuild: true`，干净安装后 `pnpm ignored-builds` 输出 `None`，所以删除了另外 4 条，注释改为只描述 esbuild。
  - 第 4 步重新解析后再检查一次。在本仓库中执行 `pnpm ignored-builds` 只输出 `Cannot identify as no node_modules found`，看不出结果，所以以克隆中干净安装的结果为准。
- 仓库中按上述结论修改 `pnpm-workspace.yaml` 后，全量检查全部通过，测试 162 个。

## 3. catalog

### 写入 catalog（tasks 3.1、3.3）
- 删除未使用的依赖后，被两个及以上的包声明的第三方依赖是 19 个，全部写入默认 catalog：
  - 工具：@types/react、playwright、tsdown、typescript、vite、vitest、@vitest/browser-playwright。
  - 运行时：@daybrush/utils、@egjs/agent、@egjs/children-differ、@egjs/list-differ、@scena/dragscroll、@scena/event-emitter、@scena/matrix、croact、css-to-mat、framework-utils、gesto、overlap-area。
  - 与 design 最初的清单相比少了 react、react-dom、@types/react-dom：2.1 删除 helper、moveable 的 React 依赖后，它们只剩 react-moveable 声明。design 已修正。
- 9 个 `package.json` 中共 79 处改为 `catalog:`。替换时 croact-moveable 的 peerDependency `croact` 也被误改了，已改回 `^1.0.4`；另外 3 个 peer（lit、vue、svelte）不在 catalog 中，没有受影响。
- 锁文件与 2.3 之后相比只多了 `catalogs.default` 一节和 importer 的 specifier，没有任何包的版本变化。
- 全量检查全部通过，测试 162 个；`snapshot.mjs` 的结果与基线相同。

### 重复范围检查（tasks 3.2）
- 新增 `config/check-dependency-ranges.mjs`，根目录的 `lint` 改为 `eslint --max-warnings 0 && node config/check-dependency-ranges.mjs`。
- 当前代码上检查通过。临时把 helper、lit-moveable 的 `@daybrush/utils` 改回 `^1.13.0` 后，`pnpm lint` 失败（exit 1），输出 `@daybrush/utils: croact-moveable (catalog:), @moveable/helper (^1.13.0), lit-moveable (^1.13.0), …`；恢复后检查重新通过。

## 4. 补丁版本和小版本升到最新

### 升级与重新解析（tasks 4.1）
- `pnpm update -r` 更新了 catalog 和单包依赖的范围下限，peerDependencies 没有变化。例如：
  - catalog：@egjs/agent `^2.2.1` → `^2.4.4`，@types/react `^16.9.17` → `^16.14.70`，playwright `^1.64.1`，gesto `^1.19.4`。
  - 单包依赖：react-selecto `^1.26.3`，preact `^10.29.8`，storybook 系列 `^10.6.2`，typescript-eslint `^8.71.2`，react / react-dom `^16.14.0`。
- vitest、@vitest/browser-playwright 的确切版本不受 `pnpm update -r` 影响，手动改为 5.0.4。npm 上已有 5.0.5，但它是 2026-10-15T14:29Z 发布的，执行时（2026-10-16T08:19Z）还不满一天，被 pnpm 的发布时间限制排除。
- 删除 `pnpm-lock.yaml`、根目录和各包的 `node_modules` 后重新安装。验证：
  - 已弃用警告只剩 3 个：glob@7.2.3、glob@8.1.0、inflight@1.0.6。
  - 锁文件中没有 jsdom；`@types/node` 只有 22.20.5；vitest 与 @vitest/browser-playwright 都只有 5.0.4。
  - 锁文件从基线的 8430 行减到 6834 行。与第 3 步相比，256 个包名有变化，其中 92 个整体消失（主要是 jsdom 11 和它的依赖）。
  - 直接依赖的变化：playwright 1.64.1、preact 10.29.8、react-selecto / selecto 1.26.3、storybook 10.6.2、typescript-eslint 8.71.2、vitest 5.0.4、rolldown 1.2.14。
  - `pnpm outdated -r` 只剩 @types/node、@types/react、@types/react-dom、gh-pages、happy-dom、preact、react、react-dom、typescript 的大版本，与 design 决策 5 一致。
  - 安装脚本：扫描 `node_modules/.pnpm` 中所有包的 preinstall / install / postinstall 和 `binding.gyp`，只有 esbuild@0.28.2，与 `allowBuilds` 一致。

### 全量检查与对比（tasks 4.2）
- 先重新执行了 `playwright install chromium`（playwright 升到 1.64.1）。
- 全量检查和 `pnpm build:storybook` 全部通过，测试 162 个。
- `snapshot.mjs` 的结果与基线完全相同：导出、CJS 形状、外部模块、UMD 内联的包名清单、声明文件列表、svelte-moveable 的文件哈希都没有变化。
- bake 输出的 660 个文件与基线 `diff -r` 无差异。
- 各日志中的警告数与基线相同：build 3、test 2、storybook 4、doc 0、typecheck:stories 0。内容也相同，只有进程号不同，例如 Node 的 `DEP0147 fs.rmdir` 提示。

## 5. 大版本

### happy-dom 21（tasks 5.1）
- `pnpm --filter @moveable/helper update happy-dom --latest` 把版本升到 `^21.0.1`。npm 上的 21.0.2、21.0.3 发布不满一天，被发布时间限制排除。锁文件中只有 happy-dom 20.14.6 → 21.0.1 一项变化。
- helper 的 2 个单元测试通过；全量检查全部通过，测试 162 个。

### 剩余的大版本（tasks 5.2）
`pnpm outdated -r` 的剩余输出与 design 决策 5 一一对应，不多也不少：

| 依赖 | 当前 | 最新 | 决策 5 |
|---|---|---|---|
| @types/node | 22.20.5 | 26.6.5 | 保持 22.x，与 Node 22 运行时一致 |
| react、react-dom | 16.14.0 | 19.3.1 | 第 6 步与 peer 范围一起决定 |
| @types/react | 16.14.70 | 19.3.0 | 同上 |
| @types/react-dom | 16.9.25 | 19.3.0 | 同上 |
| preact | 10.29.8 | 11.0.1 | 第 6 步决定 |
| gh-pages | 2.2.0 | 6.3.0 | 第 5 步 |
| typescript | 6.0.3 | 7.0.2 | 等 typescript-eslint 支持 |

## 6. 收尾

### 干净副本中的最终验证（tasks 6.3）
- 把工作区中被跟踪的文件和新增的文件（`git ls-files -co --exclude-standard`）复制到 scratchpad 的空目录，不含 node_modules、dist 和 bake 生成的目录。在这个副本中依次执行：
  - `pnpm install --frozen-lockfile`
  - `playwright install chromium`
  - `pnpm lint`
  - `pnpm packages:build`
  - `typecheck:stories`
  - `pnpm test`：162 个测试全部通过。
  - `pnpm doc`
  - `pnpm build:storybook`

  全部通过。
- 副本是全新安装，`pnpm ignored-builds` 输出 `None`：除 esbuild 外没有需要处理的构建脚本，与 `allowBuilds` 一致。
- `pnpm pack` 了 @moveable/helper、react-moveable、svelte-moveable。tarball 的 `package.json` 中不再有 `catalog:` 和 `workspace:`，都已替换成实际范围，例如：
  - react-moveable 的 `@egjs/agent` 是 `^2.4.4`。
  - svelte-moveable 的 `moveable` 是 `~0.53.0`。
