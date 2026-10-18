## Context

动机见 proposal.md。和实现有关的现状：

- 5 个包的入口只有 `main`（`dist/*.cjs.js`）、`module`（`dist/*.esm.js`）、`types`（`declaration/index.d.ts`），都没有 `"type": "module"`。react-moveable 的 `types/package.json` 让 `react-moveable/types` 这个子路径解析到 `declaration/externalTypes.d.ts`，它的 `index.js` 是空文件。
- 包名在仓库中被这些地方引用：
  - 工作区依赖：croact-moveable 依赖 react-moveable，moveable 依赖 croact-moveable 和 react-moveable，vue3-moveable 依赖 moveable。
  - 源码 import：`packages/croact-moveable/src/index.ts`、`packages/moveable/src/` 下 4 个文件（包括 `react-moveable/types`）、`packages/vue3-moveable/src/VueMoveable.ts`。
  - 构建配置：croact-moveable 用 `alwaysBundle: ["react-moveable"]` 内联它；moveable 用 `alwaysBundle: ["react-moveable/types"]`，并通过 `outputOptions.paths` 把输出中的 `react-moveable` 改名为 `croact-moveable`。
  - 工具：`config/typedoc/tsconfig.json` 的 `paths` 把 `react-moveable`、`react-moveable/types` 指向源码；react-moveable 的 `tsconfig.json` 有 `@moveable/helper` 别名，2 个 story 用它。
  - Storybook React tab：`stories/utils.ts` 的 `convertReactTemplate` 删掉源码中所有的 `@/`，于是 `@/react-moveable` 变成 `react-moveable`。`convertPath` 本意是把含 `react-moveable` 的模块名换掉，但它的正则不允许 `@`，匹配不上 `"@/react-moveable"`，实际上从来没有生效（实施时发现）。
  - `pnpm --filter`：根目录的 `storybook`、`build`、`build:storybook` 脚本，CI 中安装 Playwright 和检查 story 类型的两步，以及 `CLAUDE.md` 中的命令，都按包名 `react-moveable`、`vue3-moveable` 过滤（实施时发现）。
  - 文档：`packages/react-moveable/src/types.ts` 中有 142 处文档注释示例 `import Moveable from "moveable"`，它们出现在 TypeDoc 生成的 API 文档中。
- 产物头部注释（`config/build.mjs` 的 `banner`）读取 `package.json` 的 `name` 和 `repository.url`。
- vitest project 名、目录名、`config/copy-demo-files.mjs` 中的路径都按目录名书写，不受包名影响。

## Goals / Non-Goals

**Goals:**
- 5 个包以新包名构建、测试、生成文档，包之间按新包名互相引用。
- 第一次发布前定好入口：使用者能用到的路径都在 `exports` 中，发布内容只包含运行和调试需要的文件。
- 除了包名、仓库地址这类预期的变化，产物与改动前一致。

**Non-Goals:**
- 不改目录名、vitest project 名和版本号。
- 不做 Node 原生 ESM 的双格式支持。

## Decisions

### 只改包名，不改目录名

目录名是仓库内部的标识：CLAUDE.md、spec、vitest project、demo 复制脚本、各种路径都用它。改目录名会牵动所有这些地方，而对使用者没有任何好处。所以目录名不变，在 `framework-packages` spec 中写一张目录与包名的对照表，并约定 spec 中以目录名指代各包，只有写模块名、import 路径或 npm 包名时才用新包名。这样现有 spec 中的大部分文字不用改，只修改那些写的是模块名或子路径的地方（helper 原来写的是 npm 名 `@moveable/helper`，按约定改为目录名 helper）。

### `exports`：打包工具走 `module` 条件，Node 统一走 CJS

考虑过的写法：

| 写法 | 问题 |
|---|---|
| `import` → `.esm.js`，`require` → `.cjs.js` | 包没有 `"type": "module"`，Node 会把 `.esm.js` 当作 CommonJS 解析，`import` 时直接因 `export` 语法报错 |
| 把 ESM 产物改名为 `.mjs`，做真正的双格式 | 产物文件名改变；类型声明也要分成 `.d.mts` / `.d.cts` 两套，否则在 `moduleResolution: node16` 下类型与运行时不符；工作量和验证面都大 |
| **`types` / `module` / `default`（采用）** | Node 的 `import` 和 `require` 都拿到 CJS（Node 的 `import` 可以加载 CJS），识别 `module` 条件的打包工具拿到 ESM，与现在 `main` + `module` 的解析结果一致 |

采用的写法不改变任何使用者现在实际拿到的文件，只是把入口收拢到 `exports` 中。`main`、`module`、`types` 字段保留，供不识别 `exports` 的工具使用。`types/package.json` 同样保留，供 TypeScript 的 `moduleResolution: node` 解析 `@moveable-next/react/types`。

已知的限制（改动前就有，本 change 不处理）：在 `moduleResolution: node16` 的 ESM 项目中，`import Moveable from "@moveable-next/react"` 在运行时得到的是 CJS 的 `module.exports`，也就是 Moveable 本身（它的 `default` 指向它自己），但类型声明是 `export default`，TypeScript 会把默认导入当作带 `default` 属性的对象。解决办法是双格式，见 Non-Goals。

### 子路径只导出使用者需要的

- react-moveable 的 `./types`：vanilla 版和使用者都通过它拿到外部类型。
- moveable、helper 的两个 UMD 文件（`./dist/moveable.js`、`./dist/moveable.min.js`，helper 同理）：使用者会直接引用它们（如 `@moveable-next/vanilla/dist/moveable.min.js`）。最初写的是通配的 `./dist/*`，但 publint 指出它同时暴露了 `.esm.js`，Node 会把这个文件当作 CommonJS 解析，直接 import 就会报错；而导出 dist 的目的只是 UMD，所以改为只列出 UMD 文件（实施时修改）。同时加 `unpkg`、`jsdelivr` 字段，让 CDN 的包根 URL 返回压缩后的 UMD。
- 所有包的 `./package.json`：一些工具会读取它。

`src/`、`declaration/` 下的单个文件不导出。`src/` 仍然随包发布，因为 sourcemap 引用它。

### 构建中的改名规则跟着新包名走

- croact-moveable 的 `alwaysBundle` 改为 `@moveable-next/react`。
- moveable 的 `alwaysBundle` 改为 `@moveable-next/react/types`，`outputOptions.paths` 改为把 `@moveable-next/react` 改名为 `@moveable-next/croact`。

这些规则匹配的是 import 时写的模块名，所以源码 import 和配置要一起改。

### Storybook 和 TypeDoc 的别名

react-moveable 的 `tsconfig.json` 中 `@moveable/helper` 别名改为 `@moveable-next/helper`，2 个 story 跟着改，React tab 因此直接显示真实的包名。App 源码中唯一的内部别名是 `@/react-moveable`（136 处），所以 `convertReactTemplate` 改为只把 `"@/react-moveable"` 换成 `"@moveable-next/react"`，不再删除所有 `@/`；从来没有生效过的 `convertPath` 删除。TypeDoc 的 `paths` 改为 `@moveable-next/react` 和 `@moveable-next/react/types`。

### `pnpm --filter` 改用新包名

`--filter` 按包名匹配，改名后旧名什么也匹配不到，命令会直接报「No projects matched」。根目录脚本、CI 和 `CLAUDE.md` 中的过滤条件都改为新包名（如 `--filter @moveable-next/react`），而不是改成按目录过滤：过滤的对象本来就是包，用包名最直接。

## Risks / Trade-offs

- [改名后某个 import 漏改，构建时被当作未声明的外部模块，或解析到 npm 上的同名旧包] → 构建配置设了 `deps.onlyBundle: []`，未声明的依赖会让构建失败；改完后在源码、配置和产物中搜索旧包名作为模块名的写法（`"react-moveable"`、`"croact-moveable"`、`"moveable"`、`"@moveable/helper"`），应该一个都没有。
- [产物有意料之外的变化] → 改动前后各构建一次，逐个文件对比 5 个包的 `dist/`。允许的差异只有三类：头部注释中的 `name` 和 `repository`；ESM / CJS 中对其他工作区包的 import 名；sourcemap 中相应的位置。
- [收紧 `exports` 后，使用者原来能 import 的深路径不能再用了] → proposal 中标为 **BREAKING**。新包名第一次发布，本来就没有使用者。

## Migration Plan

都是仓库内部的改动，没有部署步骤；回滚只需还原提交并重新 `pnpm install`。
