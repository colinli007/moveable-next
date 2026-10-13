## Why

lint 仍是 ESLint 7 + typescript-eslint 5 的 `.eslintrc` 写法：ESLint 7 已停止维护，ESLint 9 起默认只读 flat config，ESLint 10 不再支持 `.eslintrc` 和 `.eslintignore`；typescript-eslint 5 官方只支持 TS `<5.1`，现在是用 TS 6 解析，处在它不支持的版本上。配置本身也有问题：react-moveable 和 helper 各有一份内容完全相同的 `.eslintrc`，修改要同步两处；`eslint-plugin-import` 声明了却没有启用任何规则；构建时会打印「React version not specified」警告；croact、preact 的 `tslint.json` 没有任何脚本使用，TSLint 本身也早已废弃；moveable、lit、croact、preact 的源码从来没有被 lint 过。

这是 ROADMAP 第 3 步剩下的部分，上一个 change（`replace-build-with-tsdown`）已经把 6 个库包升到 TS 6，现在 lint 工具链是唯一还停在旧版本上的开发工具。

## What Changes

- 改为**根目录一份** `eslint.config.mjs`（flat config），ESLint **10** + typescript-eslint **8**。eslint 和所有插件只在根 `package.json` 中声明，从 react-moveable、helper 的 devDependencies 中删除
- 新增根脚本 `pnpm lint`，检查 6 个库包（react-moveable、helper、croact-moveable、preact-moveable、moveable、lit-moveable）的 `src`。范围比现在大：croact、preact、moveable、lit 的源码第一次接受检查。stories 和 `.storybook` 不在本次范围
- lint 与构建分开：react-moveable、helper 的 `build` 不再先执行 lint，删除这两个包的 `lint` 脚本；CI 增加单独的 Lint 步骤
- 规则按现有配置**等价迁移**：
  - 推荐规则集换成 ESLint 10、typescript-eslint 8 的版本，现有配置中关闭的规则继续关闭。typescript-eslint 8 中改名或拆分的规则（如 `ban-types`、`no-empty-interface`、`no-var-requires`）按新规则名对应关闭；被移出推荐集的规则逐条补回，只有在 ES 模块（严格模式）下已不成问题的 `no-inner-declarations` 有意不再启用
  - 格式规则（4 空格缩进、分号、多余分号、空格与 Tab 混用、多行尾逗号、120 列）已从 ESLint 和 typescript-eslint 中移除，改用 `@stylistic/eslint-plugin` 一一对应，检查范围和现在一致（函数参数、泛型参数的尾逗号和以前一样不检查）
  - 保留 eslint-plugin-react 的推荐规则，并写明 React 版本，消除现在构建时的警告
- 新规则集新增的检查按性质分别处理：真实的死代码（`no-useless-assignment` 发现的无用赋值，38 处；未使用的 import 和参数）修改源码；代码库有意使用的写法（`a && a.destroy()` 这类短路调用，class 与 interface 合并声明）在配置中放行，并在配置里写明原因。所有源码改动都不改变行为
- 删除 react-moveable、helper 的 `.eslintrc`、`.eslintignore`，croact、preact 的 `tslint.json`；删除 `eslint-plugin-import`
- 根目录的 TypeScript 从 `^4.8 <4.9` 升到 `~6.0.3`，供 typescript-eslint 的解析器使用，和 6 个库包使用的版本一致。根目录目前没有其它依赖 TypeScript 的工具（jsdoc 用 babel 解析源码）
- eslint-plugin-react 最新版（7.37.5）的 peer 范围还没有包含 ESLint 10，实测推荐集规则可以正常运行（推荐集以外有规则不兼容，只启用推荐集）；在 `pnpm-workspace.yaml` 中放行这一个 peer 限制，并记入 ROADMAP 的「已知遗留」

不在本次范围：
- stories、`.storybook`、各配置文件的 lint
- 改用 Prettier 或调整代码风格
- 需要类型信息的规则（type-aware linting）
- vue3-moveable、svelte-moveable 的 lint（第 4 步）

## Capabilities

### New Capabilities

（无）

### Modified Capabilities

- `monorepo-tooling`：新增「代码检查」requirement，规定根目录一条命令检查 6 个库包的源码，并且没有错误和警告；新增「包的构建不包含代码检查」；「CI 执行全部自动化检查」增加 lint；「依赖显式声明」的场景从包级 `lint` 脚本改为根目录的代码检查命令

## Impact

- 根目录：新增 `eslint.config.mjs`；`package.json` 新增 `lint` 脚本，新增 eslint 相关依赖，TypeScript 升到 `~6.0.3`；`pnpm-workspace.yaml` 新增 eslint-plugin-react 的 peer 放行；`pnpm-lock.yaml`
- react-moveable、helper：删除 `.eslintrc`、`.eslintignore`、`lint` 脚本和 eslint 相关依赖，`build` 脚本去掉 lint
- croact-moveable、preact-moveable：删除 `tslint.json`
- 6 个库包的 `src`：修正新规则发现的问题，主要在 react-moveable，不改变行为
- CI：`.github/workflows/run-e2e.yml` 增加 Lint 步骤
- 文档：`CLAUDE.md`（lint 命令、根目录 TypeScript 版本）、`openspec/ROADMAP.md`
- 构建产物、测试和 Storybook 不受影响
