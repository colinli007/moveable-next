## Context

动机见 proposal.md 的 Why。下面只列影响方案的现状事实，都是 2026-10-16 在 scratchpad 的克隆中验证的（pnpm 11.28.2）。

**`pnpm outdated -r` 的结果**
- 补丁或小版本落后：
  - storybook 系列 10.6.1 → 10.6.2，vitest / @vitest/browser-playwright 5.0.3 → 5.0.4，playwright 1.64.0 → 1.64.1，typescript-eslint 8.71.1 → 8.71.2。
  - 运行时依赖：react-selecto 1.25.0 → 1.26.3，@egjs/agent 2.4.2 → 2.4.4，@egjs/list-differ 1.0.0 → 1.0.1。
  - preact 10.7.3 → 10.29.8（开发依赖），tslib 2.4.0 → 2.8.1，helper 的 keycon 1.2.2 → 1.4.0（要删除）。
- 大版本落后：@babel/core 8、happy-dom 21、@types/node 26、keycon 1（croact、preact 中的 0.3.0）、preact 11、React 19（含两个类型包）、gh-pages 6、TypeScript 7。
- pnpm 11 默认有发布时间限制：发布不满一天的版本不会被选中。例如 happy-dom 21.0.2、21.0.3 是前一天发布的，outdated 显示的最新版本是 21.0.1。本 change 说的「最新」都是指满足这个限制的最新版本。

**锁文件**
- 锁文件是第 1 步用 `pnpm import` 从 yarn.lock 转换的，之后一直增量更新，现在 8430 行。
- 已弃用警告只在重新解析时打印。锁文件已是最新时，`pnpm install --frozen-lockfile` 会跳过解析，不打印警告。所以本 change 统一用 `pnpm install --resolution-only --force` 观察警告，现在是 12 个。
- `pnpm update -r --lockfile-only` 会更新直接依赖和大部分间接依赖，同时把各包 `package.json` 中的范围下限改成解析到的版本。但 vitest 的可选 peer `jsdom@11.12.0` 和它带来的 request、har-validator 等保留了下来，已弃用警告仍是 12 个，锁文件减到 7950 行。
- 在此基础上删除锁文件重新解析，jsdom 11 及其依赖全部消失。已弃用警告剩 3 个：glob 7 和 inflight 来自 gh-pages 2，glob 8 来自 @croffle/bakery。锁文件减到约 6900 行。
- 现在的锁文件中已经没有 core-js，`allowBuilds` 中的 `core-js: false` 已经不对应任何包。

**overrides**
- 共 15 条。14 条是 yarn `resolutions` 原样迁移的「去重」条目（`"@daybrush/utils": "^1.13.0"` 这类），没有注释；第 15 条是 `@cfcs/react>@cfcs/core`，有注释。
- 在现在的锁文件上去掉这 14 条后重新解析：
  - 被覆盖的包会在原来的范围内刷新到最新版本：tslib 2.4.0 → 2.8.1，@egjs/agent 2.4.2 → 2.4.4，@egjs/list-differ 1.0.0 → 1.0.1，@types/react 16.14.26 → 16.14.70，csstype 3.1.2 消失。这些和第 4 步的范围内升级是同一类变化，只是提前发生。
  - 改变依赖关系的只有 `@daybrush/utils`：
    - `keycon@0.3.0` 改用自己声明的 0.7.1。这个包本身要被删除。
    - croffle 的依赖 `ast-parser@0.2.0` 改用它声明的 0.11.0。
  - `@types/react` 那条把间接依赖的 peer 范围（如 `>=16`）改写成了 `^16.9.17`，但去掉后各处仍解析到同一个 16.x，因为各包直接声明的都是 `^16`。
- override 会压过 catalog：同一个包既有 override 又有 catalog 条目时，锁文件不生成 `catalogs` 一节，依赖按 override 的范围解析。
- 其余覆盖仍然需要，上游都还没有修复：
  - preact-css-styled 的最新版本仍是 1.1.9，没有声明 preact。
  - eslint-plugin-react 的最新版本仍是 7.37.5，peer 范围不含 ESLint 10。
  - react-keycon 的最新版本仍是 0.3.0，`@cfcs/core` 的问题还在。
- 这三项覆盖去掉后，全量检查不一定失败，问题要分别观察：
  - 去掉 packageExtensions：锁文件中 `preact-css-styled@1.1.9(preact@...)` 的 peer 后缀消失；在 `packages/preact-moveable` 下 `node -e "require('preact-css-styled')"` 报找不到 preact。
  - 去掉 peerDependencyRules：锁文件不变，安装时出现 eslint-plugin-react 的 peer 警告。
  - 去掉 `@cfcs/react>@cfcs/core`：锁文件中出现两个 `@cfcs/core`。按这条覆盖的注释，预期 `typecheck:stories` 会在使用 react-keycon 的两个 story（`ReactRotateWithControlsApp`、`ReactSelectoMultipleGroupApp`）上报类型错误，实施时确认。

**未使用的依赖**
在各包被版本控制的文件和 bake 生成的目录中搜索 import 字符串、脚本中的命令名、根目录 `jsdoc.json` 中的路径，排除 peer、可执行文件这类误报后得到：

| 包 | 未使用的依赖 | 说明 |
|---|---|---|
| 根目录 | `tslib`（dependencies） | 根目录没有源码引用它；第 3 步删除其它包的 tslib 时漏掉了根目录 |
| react-moveable | `@babel/core`、`@scena/react-guides`、`gh-pages` | Storybook 自己依赖的 @babel/core 7.29 不受影响 |
| helper | `@babel/core`、`gh-pages`、`keycon`、`react`、`react-dom`、`@types/react`、`@types/react-dom`、`@types/node` | helper 的源码只 import `@daybrush/utils` |
| moveable | `gh-pages`、`react`、`react-dom`、`@types/react-dom`、`@types/node` | 见下 |
| croact-moveable | `keycon`、`@types/node` | |
| preact-moveable | `keycon` | |

- 根目录的 `@scena/event-emitter` 要保留：`jsdoc.json` 引用了 `node_modules/@scena/event-emitter/src`，文档中 Moveable 继承来的 `on`/`off` 等就是从这里生成的，主 spec「依赖显式声明」已经要求声明这种用法。
- `@types/node` 能删掉的原因：TS 6 的 `types` 默认是 `[]`，不再自动加载 `@types/*`；这三个包的 tsconfig 没有写 `types`，源码也没有 import Node 模块。`tsc --listFilesOnly` 确认这三个包都没有加载 `@types/node`。react-moveable 的 `stories/tsconfig.json` 显式写了 `"types": ["vite/client", "node"]`，要保留。
- moveable：
  - 源码 `import * as React from "react"`，类型检查和声明生成都要用 `@types/react`，所以 `@types/react` 保留。
  - 运行时不需要 react 包：ESM/CJS 构建把 `react` 改名为 croact，UMD 构建用 alias 指向 croact。
  - 源码没有用到 react-dom。
  - 删除这三项后，`react-moveable → croact-moveable → moveable` 依次构建（包括 test:type、声明生成）都能通过，外部模块清单不变。
- 有两类依赖不按「未使用」处理：
  - 被使用的包要求的 peer。例如 `playwright` 是 `@vitest/browser-playwright` 的 peer，react 和 react-dom 是 Storybook 的 peer。pnpm 默认 `autoInstallPeers`，删掉后测试仍会通过，但那样依赖的版本就不再由仓库控制。
  - 包自己的 peerDependency 在开发时安装的版本。例如 croact-moveable 的 `croact`，以及 lit、vue、svelte。

**catalog**
- pnpm 11 支持在 `pnpm-workspace.yaml` 中写默认 `catalog`，包中写 `catalog:`。`pnpm update -r` 会更新 catalog 中的 `^` / `~` 范围，确切版本不会更新：catalog 中写 `vitest: 5.0.3`，执行后仍是 5.0.3。
- `catalogMode: prefer` 时，`pnpm add` 一个 catalog 中没有的依赖，也会把它加进 catalog。这与「只收录多个包共用的依赖」冲突，所以不用它，见决策 4。
- 把现有范围原样改写为 `catalog:` 不改变解析结果。例如 playwright `^1.64.0`、typescript `~6.0.3` 改写后，锁文件中仍是 1.64.0、6.0.3。
- 去掉未使用的依赖后，被两个及以上包声明的第三方依赖有：
  - 工具：typescript、tsdown、vitest、@vitest/browser-playwright、playwright、vite。
  - React 类型：@types/react（croact、moveable、react-moveable）。删除 helper、moveable 的 React 依赖后，react、react-dom、@types/react-dom 只剩 react-moveable 声明，不进 catalog。
  - 运行时依赖：
    - `@daybrush/utils`、`@scena/event-emitter`、`framework-utils`。
    - `croact`：moveable 的 dependencies 和 croact-moveable 的 devDependencies。
    - 只在 react / croact / preact 三个包中出现的 `@egjs/agent`、`@egjs/children-differ`、`@egjs/list-differ`、`@scena/dragscroll`、`@scena/matrix`、`css-to-mat`、`gesto`、`overlap-area`。
- `catalog:` 对发布和构建没有影响：
  - `pnpm pack` 的 tarball 中，它已经替换为实际范围。
  - svelte-moveable 的 dependencies 写 `catalog:` 时，build（包括 publint）照常通过。
  - tsdown 按包名判断外部模块，外部模块清单不变。

**大版本**
- happy-dom 21：helper 的 2 个单元测试在 21.0.1 下通过。
- preact 11.0.0 是 2026-09-30 发布的，11.0.1 是 2026-10-08 发布的，`preact/compat` 仍然存在。preact-moveable 没有任何运行时测试，devDependency 中的 preact 只用于类型检查和声明生成。
- @babel/core 8 要求 Node `^22.18.0 || >=24.11.0`。它本来就没有被使用，删除即可。

## Goals / Non-Goals

**Goals:**
- 每一步依赖变化后都执行全量检查，出问题时能定位到是哪一步、哪个包。
- 源码不改，对外的导出、CJS 形状和外部模块清单不变。

**Non-Goals:**
- 不处理 croffle 带来的旧依赖（glob 8、TS 4.5）。
- 不调整 peerDependencies 的范围（第 6 步）。

## Decisions

### 1. 按「删除 → catalog → 升级 → 大版本」的顺序，每步一次全量检查
1. 记录基线。
2. 删除未使用的依赖和不起作用的覆盖。
3. 改写为 catalog，并加上检查重复范围的脚本。这一步解析结果不变。
4. 范围内升级并重新生成锁文件。
5. 逐个升级大版本。

顺序的理由：
- 先删除：要删掉的依赖如果参与第 4 步的重新解析，会影响其它包的解析结果。例如 `keycon@0.3.0` 就牵扯着 `@daybrush/utils` 的 override。
- override 会压过 catalog，所以 override 必须在 catalog 之前删除。删除 override 会让被覆盖的少数包提前刷新到范围内最新（见 Context），这些变化在第 2 步就单独检查。
- catalog 先于升级：升级时只改 catalog 一处。而且第 3 步的锁文件中，除了 `catalogs` 一节和各包的 specifier 外不应有任何变化，可以单独确认这一步没有副作用。

备选方案是一次性升级全部依赖，然后统一测试。没有采用：出问题时无法区分是删除、重新解析还是某个大版本导致的。

### 2. 重新生成锁文件，而不是只用 `pnpm update`
要回答的问题是「按现在的依赖声明，今天能解析到什么」。最直接的信号是删除锁文件后重新解析的结果。删除时要连 `node_modules` 一起删，否则 pnpm 会沿用 `node_modules/.pnpm/lock.yaml` 中的当前锁文件，并不重新解析（见 baseline 2.3）。

`pnpm update -r` 是在旧锁文件上增量调整，会保留 yarn 时代残留的解析结果，比如 jsdom 11。

代价是间接依赖一次性大量变化。缓解办法：
- 第 4 步之前，第 1 至 3 步已经各自通过了检查。
- 第 4 步失败时，对比新旧锁文件，用 `pnpm why` 找出相关的包，分别升级来缩小范围。

### 3. 范围下限提高到实际测试过的版本
`pnpm update -r` 默认会把范围下限改成解析到的版本（例如 `^1.25.0` → `^1.26.3`），本次 devDependencies 和 dependencies 都接受这个改动：
- 测试实际运行的是锁文件中的版本。如果下限低于它，就是在声明兼容一个从未测试过的版本。
- 对 dependencies 的影响是，使用者最低会装到测试过的版本，而不是更老的版本。

peerDependencies（lit、vue、svelte、croact）不变：peer 的下限表示支持的最低框架版本，与开发时安装的版本无关。

### 4. catalog：只收录多个包共用的依赖，由检查脚本保证没有重复
- 只用默认 catalog，不用命名 catalog。
- 收录的标准是「被两个及以上的包声明」，与 spec 一致。只被一个包使用的依赖仍写在这个包的 `package.json` 中：收进 catalog 没有去重的好处，反而让读 `package.json` 的人看不到版本。
- vitest、@vitest/browser-playwright 写确切版本（不带 `^`），保持现状，因为它们必须是同一个版本。两条相邻放置，并加注释写明：`pnpm update -r` 不会更新它们，要手动同时修改。
- `catalogMode` 保持默认的 `manual`。
- 新增检查脚本 `config/check-dependency-ranges.mjs`，根目录的 `lint` 脚本在 ESLint 之后执行它：
  - 读取根目录和 `packages/*` 的 `package.json`。
  - 同一个第三方依赖在两个及以上的包中出现在 dependencies / devDependencies 里，并且其中任何一处不是 `catalog:` 时，打印依赖名和包名，并以非零状态退出。
  - 不检查 `workspace:` 依赖和 peerDependencies。

  放在 `pnpm lint` 里，是因为 CI 已经执行这一步，而且它和 ESLint 一样只读源文件，不需要先构建。

备选方案：
- `catalogMode: prefer`：Context 中已经验证，它会把只有一个包使用的新依赖也加进 catalog，与收录标准冲突。
- 全部依赖都放进 catalog（`catalogMode: strict`）：规则自然成立，不需要脚本，但读单个包的 `package.json` 时看不到任何版本。用户选择了只收录共用依赖、由脚本检查。
- 不加脚本，只在 CLAUDE.md 中写约定：人工维护，以后容易再出现重复。没有采用。

### 5. 大版本逐项的结论

| 依赖 | 结论 | 理由 |
|---|---|---|
| happy-dom 21 | 升级 | 只有 helper 的单元测试使用，scratchpad 中已通过 |
| @babel/core 8 | 不适用 | 依赖被删除 |
| keycon 1（croact、preact） | 不适用 | 依赖被删除；react-moveable 已经是 1.4.0 |
| @types/node 26 | 保持 22.x | 类型要描述实际运行时（Node 22.20.0），见 spec「固定的 Node 运行时版本」 |
| React 19、@types/react 19、@types/react-dom 19 | 暂缓到第 6 步 | 开发时用的版本就是声明支持的最低版本，要和 peer 范围一起决定 |
| preact 11 | 暂缓到第 6 步，本次升到 10.29.8 | 与 React 相同，是框架的 peer 版本；preact-moveable 没有运行时测试，升级后无法验证使用者拿到的代码 |
| gh-pages 6 | 暂缓到第 5 步 | 只有部署时使用，验证要真正推送 gh-pages 分支，放在第 5 步整理部署流程时进行 |
| TypeScript 7 | 暂缓 | 等 typescript-eslint 支持，见 ROADMAP 的已知遗留 |

### 6. 覆盖条目的处理
- overrides：删除 14 条，保留 `@cfcs/react>@cfcs/core`。
  - `@daybrush/utils` 那条删除后，croffle 的 ast-parser 改用它自己声明的 0.11.0。这是 croffle 本来的依赖，比强制使用 1.13 更符合它的预期。
  - 用 `pnpm bake` 的完整输出前后对比确认：生成的示例代码逐字节相同。
- packageExtensions（preact-css-styled）、peerDependencyRules（eslint-plugin-react）：上游还没有修复，保留，注释已经符合 spec。
- 保留的三项覆盖，各用 Context 中列出的观察方法确认仍然起作用。
- allowBuilds：
  - 删除 `core-js: false`。
  - 其余条目是否还需要，以重新生成锁文件后 `pnpm install` 是否报告未处理的构建脚本为准。
  - fsevents 的注释要改为与现在实际的版本一致：锁文件中只剩 fsevents 2.3.3，注释中的 fsevents@1 已经不存在。

### 7. 验证方法
每一步之后的「全量检查」：
- 与 CI 相同的 5 条命令：
  - `pnpm install --frozen-lockfile`
  - `pnpm lint`：从第 3 步起包含重复范围检查。
  - `pnpm packages:build`：包含 react-moveable、vue3、svelte 的类型测试，以及 svelte-check。
  - `pnpm --filter react-moveable typecheck:stories`
  - `pnpm test`：基线是 162 个测试。
- 另加 `pnpm doc`：它依赖根目录 `jsdoc.json` 引用的 `node_modules` 路径，CI 不执行，只有它能发现文档相关依赖的问题。

`pnpm build:storybook` 在第 4 步重新生成锁文件后和最后各执行一次。有些问题只在静态构建时出现，例如 storybook 10.6.2、storybook-dark-mode 的问题。

另外两项对比在第 1 步记录基线，最后再对比一次。基线和脚本都放在 scratchpad，结论记入 `baseline.md`：
- 产物结构：每个包的导出名集合、CJS `require` 后的形状、外部模块清单，方法同 `replace-build-with-tsdown` 的 baseline。UMD 内联的第三方代码会随版本变化，只核对内联的包名清单。
- `pnpm bake` 的输出：生成目录的完整文件对比。

## Risks / Trade-offs

- [重新生成锁文件后，某个间接依赖的新版本行为有变化] → 全量测试覆盖 137 个 story 和三个框架包装。出问题时按决策 2 的方法缩小范围；必要时在 design 中记录，并临时用带注释的 override 锁定版本，注释要符合 spec「依赖覆盖写明理由」。
- [`@types/node` 只有 22.x，部分靠 pnpm 复用已解析的版本] → happy-dom 依赖的 `@types/ws` 声明 `@types/node: *`。它现在解析到 22.x，是因为 react-moveable 声明了 `^22`，pnpm 复用了同一个版本。如果以后没有包再声明 `@types/node`，这里会解析到最新的大版本，spec 的场景就不成立了。CLAUDE.md 中写明这一点。
- [catalog 让发布内容依赖 pnpm 的替换] → `pnpm pack` / `pnpm publish` 会把 `catalog:` 替换为实际范围（已验证）。第 6 步发布时再确认一次。
- [提高 dependencies 的范围下限，使用者无法再使用更老的版本] → 这些都是同一作者维护的小版本，老版本没有经过测试。由于本阶段不发布，影响在第 6 步发布时才出现。
- [运行时依赖升级后（react-selecto 1.26、@egjs/agent 2.4.4 等），UMD 内联的代码变化] → story 测试和框架包装测试使用的都是这些新版本。产物对比只要求导出、CJS 形状和外部模块清单不变。

## Migration Plan

只改依赖声明、锁文件和 lint 脚本，不改源码。实施时按决策 1 分步完成，本地每步做一次全量检查。CI 的步骤不变，新的检查跟着 `pnpm lint` 执行，所以只需在本地故意写一处重复的版本范围，确认 `pnpm lint` 失败，不需要再推送一个故意失败的提交。推送后以 CI 通过为准。回滚就是 revert 对应的提交。
