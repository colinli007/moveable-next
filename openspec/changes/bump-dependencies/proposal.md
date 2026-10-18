## Why

前面几步换掉了构建、测试、lint 和三个框架包装的工具链，但依赖本身还有不少是从 yarn 时代带过来的：
- 锁文件是第 1 步用 `pnpm import` 从 yarn.lock 转换的，间接依赖沿用了当时的解析结果。例如 vitest 的可选 peer jsdom 被解析成 11.12.0，连带装上 request、har-validator 等，重新解析时报 12 个已弃用的间接依赖。在 scratchpad 中试过，`pnpm update -r` 不会处理这些；删除锁文件重新解析后只剩 3 个。
- 有一批声明了但没有被使用的依赖：
  - react-moveable 和 helper 中的 `@babel/core`。
  - croact、preact 中的 `keycon@0.3.0`，以及 helper 中的 keycon。
  - helper、moveable、react-moveable 中的 `gh-pages`：只有根目录脚本调用它。
  - 根目录的 `tslib`。
  - react-moveable 中的 `@scena/react-guides`。
  - helper 中的 react、react-dom 及其类型；moveable 中的 react、react-dom、@types/react-dom。
  - croact、moveable、helper 中的 `@types/node`。
- `pnpm-workspace.yaml` 中的 15 条 overrides 有 14 条是 yarn `resolutions` 原样迁移的「去重」条目（第 1 步明确不精简）。在 scratchpad 中去掉这 14 条后重新解析：被它们覆盖的包只是在原来的范围内刷新到最新版本；唯一改变依赖关系的是 `@daybrush/utils`，涉及两个包：一个是要删除的 `keycon@0.3.0`，另一个是 croffle 的 ast-parser。而且 overrides 会压过下面要引入的 catalog。
- 同一个依赖在多个包中各写一次：typescript 9 次，@daybrush/utils 8 次，tsdown 7 次，vitest 6 次，而 vitest 和 @vitest/browser-playwright 的版本必须完全一致。每次升级都要改很多处，容易漏改。

这是 ROADMAP 第 4 步的最后一个 change：把依赖升到最新，后续开发都基于新版本。

## What Changes

- 删除上面列出的未使用依赖。每删除一项都以构建、类型检查和测试的结果确认，删除后有失败的保留下来，并在 design 中记录原因。
- overrides 只保留 `@cfcs/react>@cfcs/core`，它已经写明了针对的问题。其余 14 条删除；`@daybrush/utils` 那条删除后，用 bake 的输出确认 croffle 生成的示例不变。
- 引入 pnpm 的默认 catalog：被两个及以上的包声明的第三方依赖，版本只写在 `pnpm-workspace.yaml` 的 `catalog` 中，各包写 `catalog:`。只有一个包使用的依赖、peerDependencies、内部包的 `workspace:~` 不变。以后升级执行 `pnpm update -r`，或者只改 catalog 一处；写确切版本的 vitest 和 @vitest/browser-playwright 要手动改。
- 新增一个检查脚本，放进 `pnpm lint`（CI 已执行）：同一个第三方依赖在两个包中各写一个版本范围时失败，并给出依赖名和包名。
- 补丁版本和小版本统一升到最新：执行 `pnpm update -r`，再删除锁文件重新解析，让间接依赖也按现在的声明解析到最新版本。devDependencies 和 dependencies 范围的下限都提高到实际安装、实际测试过的版本；peerDependencies 不变。
- 大版本逐个评估，每项单独升级、单独跑全量测试：
  - happy-dom 20 → 21：升级。helper 的单元测试在 scratchpad 中已经通过。
  - @babel/core 8、croact/preact 的 keycon 1：依赖本身被删除，不需要再升级。
  - @types/node：保持 22.x，与 Node 22.20.0 运行时一致，不升到 26。croact、moveable、helper 不再声明。
  - 暂缓，写明触发条件：
    - React 19 及 @types/react、@types/react-dom 19：按 ROADMAP 在第 6 步确定 peer 范围时决定。
    - preact 11：同样是框架的 peer 版本，与 React 一起在第 6 步决定；本次升到 10.x 的最新版本。
    - gh-pages 6：第 5 步整理部署流程时升级（2.x 依赖已弃用的 glob 7）。
    - TypeScript 7：等 typescript-eslint 支持。
- 更新 CLAUDE.md（依赖与 catalog 的约定）和 ROADMAP（第 4 步完成，已知遗留的增减）。

不在本次范围：
- pnpm 12、Node 版本：工具链保持 pnpm 11.28.2、Node 22.20.0。
- `@daybrush/jsdoc`、`daybrush-jsdoc-template`：第 5 步换成 TypeDoc 时删除。
- croffle 引入的已弃用 glob 8：croffle 的已知遗留，见 ROADMAP。

## Capabilities

### New Capabilities

无。

### Modified Capabilities

- `monorepo-tooling`：
  - 「依赖显式声明」增加「不声明未使用的依赖」。
  - 「固定的 Node 运行时版本」增加「Node 类型声明的大版本与运行时一致」。
  - 新增「共用依赖的版本只声明一处」（catalog，重复时代码检查失败）。
  - 新增「依赖覆盖写明理由」：每条 override、packageExtensions、peerDependencyRules 都要注明针对哪个包的什么问题。

## Impact

- 全部 9 个 `package.json`、`pnpm-workspace.yaml`、`pnpm-lock.yaml`（重新生成）。
- 新增 `config/` 下的检查脚本，根目录 `lint` 脚本改为在 ESLint 之后执行它。
- 不改源码。依赖升级可能改变 UMD 产物中内联的第三方代码（如 react-selecto 1.25 → 1.26），但导出、CJS 形状和外部模块清单不变。
- 发布：catalog 在 `pnpm pack` / `pnpm publish` 时会被替换为实际范围。本阶段不发布，第 6 步发布时生效。
- CLAUDE.md、`openspec/ROADMAP.md`。
