## Why

ROADMAP 第 6 步的目标是以 `@moveable-next` 作用域发布。现在 5 个包还用着上游作者在 npm 上的包名（`react-moveable`、`moveable` 等），`repository`、`homepage` 也指向上游仓库，所以不能以现在的样子发布。另外，这些包只有 `main`、`module`、`types` 三个入口字段，没有 `exports`：使用者可以 import 包里的任意文件，`files` 写的是 `"./*"`，构建配置、测试、tsconfig 也会一起发布出去。

改包名是第 6 步其余工作（定 peer 范围、引入 changesets）的前提，`exports` 和发布内容也要在第一次发布前定好，因为发布之后再收紧入口就是破坏性变更。

## What Changes

- **BREAKING**：包名改为 `@moveable-next/*`（用户决定）：

  | 目录 | 原包名 | 新包名 |
  |---|---|---|
  | `packages/react-moveable` | react-moveable | `@moveable-next/react` |
  | `packages/croact-moveable` | croact-moveable | `@moveable-next/croact` |
  | `packages/moveable` | moveable | `@moveable-next/vanilla` |
  | `packages/vue3-moveable` | vue3-moveable | `@moveable-next/vue3` |
  | `packages/helper` | @moveable/helper | `@moveable-next/helper` |

  包之间的依赖、源码中的 import（如 `react-moveable/types`）、构建配置中的外部模块改名和内联规则、TypeDoc 和 Storybook 的路径别名都改用新包名。目录名不变。
- **BREAKING**：每个包增加 `exports`：`types` 指向类型声明，`module` 条件指向 ESM 产物（供打包工具使用），其余情况（Node 的 `import` 和 `require`）指向 CJS 产物；同时导出 `./package.json`。`@moveable-next/react` 另外导出 `./types` 子路径，`@moveable-next/vanilla` 和 `@moveable-next/helper` 导出两个 UMD 文件（如 `./dist/moveable.js`、`./dist/moveable.min.js`），并用 `unpkg`、`jsdelivr` 字段指向压缩后的 UMD。不在 `exports` 中的路径（如 `src/` 下的文件）不能再被 import。
- `files` 只包含 `dist`、`declaration`、`src`（sourcemap 指向它），`@moveable-next/react` 另加 `types`；构建配置、测试、tsconfig 不再发布。
- `repository`（带 `directory`）、`homepage`、`bugs` 指向本仓库 `github.com/colinli007/moveable-next`；产物头部注释中的包名和 repository 随之变化。
- 文档：源码文档注释中的示例 `import Moveable from "moveable"`（会出现在 API 文档中）改为新包名；Storybook React tab 显示 `@moveable-next/react`、`@moveable-next/helper`；各 README 的安装命令、import 语句和 npm 徽章改为新包名；`CLAUDE.md` 说明目录名与包名的对应关系；`openspec/ROADMAP.md` 记录本 change。

不在本次范围：

- 版本号：保持不变，由引入 changesets 的 change 决定第一次发布的版本。
- 真正的双格式（Node 原生 ESM）：要把 ESM 产物改为 `.mjs`，并提供 CJS / ESM 两套类型声明，以后单独评估。
- README 和落地页中指向上游 `daybrush.com` 的站点链接：随站点地址一起调整（ROADMAP 已有这一项）。
- 把 `@moveable-next/croact` 合并进 `@moveable-next/vanilla`：用户决定保持现在的结构。
- 在 npm 上创建 `moveable-next` 组织并实际发布：需要用户操作，属于后面引入 changesets 的工作。

## Capabilities

### New Capabilities

（无）

### Modified Capabilities

- `framework-packages`：「受支持的框架包集合」写明各包的目录和发布名，并约定 spec 中以目录名指代各包；Storybook React tab 换成的发布包名改为 `@moveable-next/react`。
- `library-build`：新增「包名、入口与发布内容」要求（`exports`、`files`、仓库地址）；产物文件、CJS 导出形状、UMD、外部模块、类型声明位置等要求中的包名和子路径改为新的写法（helper 按目录名指代，`react-moveable/types` 改为 `@moveable-next/react/types`）。

## Impact

- 5 个包的 `package.json`；`packages/react-moveable/types/package.json`
- 源码：`packages/croact-moveable/src`、`packages/moveable/src`、`packages/vue3-moveable/src` 中的 import；`packages/react-moveable/src/types.ts` 的文档注释
- 构建与工具：`packages/croact-moveable/tsdown.config.mts`、`packages/moveable/tsdown.config.mts`、`config/typedoc/tsconfig.json`、`packages/react-moveable/tsconfig.json`（`@moveable/helper` 别名）、`packages/react-moveable/stories/utils.ts`（React tab 的包名）、2 个 story
- `pnpm-lock.yaml`（工作区包名变化）
- 文档：各 README、`handbook/handbook.md`、`groupable.md`、`packages/react-moveable/src/ables/README.md`、`CLAUDE.md`、`openspec/ROADMAP.md`
- 产物：头部注释、ESM / CJS 中对其它工作区包的 import 名、类型声明中的文档注释会变化；除此之外与改动前一致
