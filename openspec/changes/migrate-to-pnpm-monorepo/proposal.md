## Why

仓库仍是 yarn 1 workspaces + lerna 4 + Node 16 的组合：Node 16 已停止维护，仓库停留在 lerna 4（`bootstrap` 等命令在 lerna 7 起已被移除），GitHub Actions 的 `upload-artifact@v2` 已停用，依赖提升（hoist）还掩盖了一批未声明的依赖。同时这个 fork 不再维护 Vue 2 与 Angular 包装，它们恰恰是 `nohoist` 配置、Angular 常量生成步骤和 ngcc postinstall 的来源。现在统一迁到 pnpm workspace + Node 22，并顺手移除不再支持的包，能让后续的 Storybook 升级、发布到 `@moveable-next` 等工作在一个干净、可复现的基线上进行。

## What Changes

- 包管理器从 yarn 1 切换为 pnpm，使用 pnpm workspace（默认严格的非提升布局），只保留一份 `pnpm-lock.yaml`；删除 `yarn.lock`、`storybook/yarn.lock`、`.yarnrc`
- 运行时固定为 Node 22.20.0：新增 `.nvmrc`，根 `package.json` 声明 `engines` 与 `packageManager`
- 移除 lerna 与 `@daybrush/release`（lerna-helper）：跨包构建改由 `pnpm -r` 按拓扑顺序执行；删除 `lerna.json`、`bootstrap`、`packages:update`、`packages:publish`、`changelog`、`release` 脚本
- 内部依赖改用 `workspace:~` 协议；根 `resolutions` 迁为 `pnpm.overrides` 并去掉只为已删除包服务的条目；删除 `workspaces.nohoist`
- 补齐各包实际使用但未声明的依赖（严格布局下否则无法解析），范围包括三类：源码与配置里的 import / require、脚本直接调用的可执行文件（如 `rollup`、`eslint`）、配置文件里写死的 `node_modules` 路径（如 `jsdoc.json`）
- moveable 的 UMD 构建改为显式解析 `croact` 的位置，不再依赖它被提升到根目录才能被内联
- `deploy` 脚本由 `lerna-helper deploy` 改为零依赖的 Node 脚本，保持原 `deployFileMap` 的三条复制规则；`demo:build`、`demo:deploy`（gh-pages 推送到 `origin`）保留
- react-moveable 的 Storybook 6.5（webpack 4 builder）在 Node 22 下通过 `NODE_OPTIONS=--openssl-legacy-provider` 运行，暂不升级
- CI 改为 pnpm + Node 22，Actions 升级到当前主版本（checkout / setup-node / upload-artifact）
- **BREAKING** 删除 `packages/vue-moveable`（Vue 2）与 `packages/ngx-moveable`（Angular），以及 `config/update-type-consts.js`、croffle 中的 Vue 2 / Angular 转译、Storybook 中的 Vue2 / Angular 代码 tab
- 删除未完成且无引用的 `packages/snappable`，以及半途而废的根目录 `storybook/`（Storybook 7 迁移残留）
- 更新 CLAUDE.md、README 中与包管理器、框架列表相关的描述

不在本次范围：发布到 npm（改为 `@moveable-next` 作用域包名并引入 changesets）、Storybook 升级、构建工具统一、TypeScript 5、lint 统一、`exports` 字段、demo 页面中指向原站的链接。

## Capabilities

### New Capabilities

- `monorepo-tooling`: 仓库的开发工具链契约——Node 版本、pnpm workspace 安装、跨包构建顺序、Storybook 交互测试、CI、demo 构建与部署
- `framework-packages`: 本仓库提供的框架包集合，以及 Storybook 示例代码覆盖的框架范围

### Modified Capabilities

（无，`openspec/specs/` 目前为空）

## Impact

- 根配置：`package.json`、`lerna.json`（删除）、`.yarnrc`（删除）、`yarn.lock`（删除）、新增 `pnpm-workspace.yaml`、`.npmrc`、`.nvmrc`
- 包：删除 `packages/vue-moveable`、`packages/ngx-moveable`、`packages/snappable`、根 `storybook/`、`packages/svelte-moveable/.npmrc`；其余包的 `package.json`（内部依赖协议、补齐依赖、脚本里的 `yarn` 调用）
- react-moveable：`croffle.config.js`、`stories/utils/story.tsx`、`stories/utils.ts`、`tsconfig.json`、`.gitignore`、`.storybook/main.js`（必要时 addon 改为绝对路径）、Storybook 相关脚本
- moveable：`rollup.config.js`（UMD 构建中 `croact` 的解析）
- 构建/发布：`config/update-type-consts.js`（删除），新增 `config/deploy.mjs`；`jsdoc.json` 所引用路径的依赖在根目录显式声明
- CI：`.github/workflows/run-e2e.yml`
- 文档：`CLAUDE.md`、根 README 及各包 README 的框架链接、`handbook/handbook.md` 的 Angular 示例
- 已发布到 npm 的 `vue-moveable` / `ngx-moveable` 不受影响，只是本仓库不再产出新版本
