## 1. 基线

- [x] 1.1 执行 `pnpm packages:build`，把 5 个包的 `dist/` 复制到 scratchpad 作为基线；记录 `pnpm test` 的用例数。结果写入本 change 目录的 `baseline.md`。验证：`baseline.md` 中有用例数，scratchpad 中有 5 个包的 `dist/` 副本

## 2. 包名、依赖和入口（design：只改包名、`exports` 写法、子路径）

- [x] 2.1 修改 5 个包的 `package.json`：
  - `name` 改为新包名；
  - 工作区依赖改用新包名（`workspace:~` 不变）；
  - `repository` 改为 `{ type: "git", url: "git+https://github.com/colinli007/moveable-next.git", directory: "packages/<目录>" }`，`homepage` 改为本仓库中该包的目录页，`bugs` 改为本仓库的 issues；
  - 按 design 增加 `exports`；moveable、helper 增加 `unpkg`、`jsdelivr`（UMD 子路径最初写成通配的 `./dist/*`，4.2 中按 publint 的警告改为只列出 UMD 文件）；
  - `files` 改为 `["dist", "declaration", "src"]`（react-moveable 另加 `"types"`）。

  `packages/react-moveable/types/package.json` 的 `name` 改为 `@moveable-next/react/types`。执行 `pnpm install`。验证：`pnpm install` 成功；`pnpm ls -r --depth -1` 列出 5 个新包名
- [x] 2.2 源码 import 和构建配置改用新包名：
  - `packages/croact-moveable/src/index.ts`、`packages/moveable/src/` 中的 import（包括 `react-moveable/types`），以及 `packages/vue3-moveable/src/` 中的 import；
  - croact-moveable 和 moveable 的 `tsdown.config.mts`（`alwaysBundle`、`outputOptions.paths` 和相关注释）；
  - `config/typedoc/tsconfig.json` 的 `paths`。

  验证：`pnpm packages:build` 成功，构建输出中没有未解析模块的警告
- [x] 2.3 根目录 `package.json` 的 `storybook`、`build`、`build:storybook` 脚本和 `.github/workflows/run-e2e.yml` 中的 `pnpm --filter react-moveable` 改为 `--filter @moveable-next/react`（实施时发现：按旧包名过滤会匹配不到任何包）。验证：`pnpm build`、`pnpm --filter @moveable-next/react typecheck:stories` 成功；仓库中（排除 `openspec/changes/` 和各 CHANGELOG）搜不到按旧包名写的 `--filter`

## 3. Storybook 与文档（design：Storybook 和 TypeDoc 的别名）

- [x] 3.1 react-moveable 的 `tsconfig.json` 中 `@moveable/helper` 别名改为 `@moveable-next/helper`，2 个 story 的 import 跟着改；`stories/utils.ts` 的 `convertReactTemplate` 改为把 `"@/react-moveable"` 换成 `"@moveable-next/react"`，删除从未生效的 `convertPath`（实施时发现它的正则匹配不到 `@/react-moveable`）。验证：`pnpm --filter react-moveable typecheck:stories` 通过；React tab 的内容（用 remove-croffle-examples 1.1 中的导出方法）与改动前相比，只有 `react-moveable` 变为 `@moveable-next/react`、`@moveable/helper` 变为 `@moveable-next/helper`
- [x] 3.2 `packages/react-moveable/src/types.ts` 文档注释中的 `import Moveable from "moveable"` 改为 `@moveable-next/vanilla`；README（根目录和 4 个包）、`handbook/handbook.md`、`groupable.md`、`packages/react-moveable/groupable.md`、`packages/react-moveable/src/ables/README.md` 中的安装命令、import 语句和 npm 徽章改为新包名，指向上游站点的链接不动。验证：`pnpm doc` 通过；这些文件中搜不到把旧包名当作模块名或 npm 包名的写法（`from "moveable"`、`from "react-moveable"`、`npm i moveable` 这类）
- [x] 3.3 `CLAUDE.md` 加入目录与包名的对照表，并说明以目录名指代各包；修改写到模块名的地方（如 React tab 的转换、`@moveable/helper` 别名、构建中的改名规则）。`openspec/ROADMAP.md` 第 6 步记录本 change。验证：`CLAUDE.md` 中搜不到 `@moveable/helper`；ROADMAP 第 6 步的表格和正文中有本 change

## 4. 全量检查

- [x] 4.1 在根目录依次执行 `pnpm lint`、`pnpm doc`、`pnpm packages:build`、`pnpm test`、`pnpm --filter react-moveable typecheck:stories`、`pnpm build:storybook`，结果写入 `baseline.md`。验证：
  - 全部成功，`pnpm test` 的用例数与 1.1 相同；
  - 逐个文件对比 5 个包的 `dist/` 与基线，差异只有 design 中允许的三类；
  - 源码、配置和产物中搜不到把旧包名当作模块名的写法
- [x] 4.2 验证入口和发布内容，结果写入 `baseline.md`：
  - 在 vue3-moveable 目录（它依赖 moveable，可以按包名解析）和根目录（通过临时链接，不提交）中，用 Node 分别 `require` 和 `import()` 每个包，都得到 CJS 产物的值；
  - 用 `node --conditions=module` 解析每个包的主入口，得到 ESM 产物；
  - `require("@moveable-next/react/src/index")` 抛出 `ERR_PACKAGE_PATH_NOT_EXPORTED`；
  - 对每个包执行 `pnpm pack --dry-run`，文件清单只包含 spec 允许的文件，工作区依赖被替换成版本号；
  - 用 `pnpm dlx publint` 检查每个包，没有错误。

  验证：以上每一项都有记录且符合预期
