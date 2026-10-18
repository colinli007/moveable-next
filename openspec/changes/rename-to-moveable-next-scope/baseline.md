# 基线与验证记录

## 1.1 改动前的状态

- 产物：当前 `dist/` 来自上一个 change（remove-preact-lit-svelte-packages）4.1 的全量构建，之后源码没有变化。复制前先核对了 28 个文件的 SHA-256，与那次构建记录的完全相同；然后把 5 个包的 `dist/` 复制到 scratchpad 的 `rename-base/` 作为基线。
- `pnpm test`：148 个用例全部通过（react-moveable 141、vue3-moveable 5、helper 2），同样来自上一个 change 4.1 的记录。
- React tab：用临时测试导出全部 137 个 story 的 `parameters.preview`，保存到 scratchpad 的 `rename-preview-before.json`，供 3.1 对比。

## 2. 包名、依赖和入口

- 2.1：5 个包的 `package.json` 用脚本修改，保留原有缩进和字段顺序；`pnpm install` 成功，`pnpm ls -r --depth -1` 列出 5 个新包名。
- 2.2：第一次构建时 vue3-moveable 的 `src/index.ts` 中还有一处用单引号写的 `export * from 'moveable'` 没改到，构建报未解析模块；改正后全量构建成功，没有警告。与基线逐个文件对比：
  - react-moveable、croact-moveable、helper 的全部产物，以及 moveable 的 UMD（`moveable.js`、`moveable.min.js`），都只有头部注释中的 `name` 和 `repository` 两行变化（加上 sourcemap 中相应的位置），内联的代码没有变化。design 中担心的「有了 `exports` 后 `mainFields` 不再生效、改为内联 CJS 产物」没有发生。
  - moveable 和 vue3-moveable 的 ESM / CJS 中，对其他工作区包的 import 换成了新包名（`@moveable-next/croact`、`@moveable-next/vanilla`）。CJS 中由模块名派生的局部变量名随之变化（`react_moveable` → `_moveable_next_react`，vue3 中的 `moveable$1` 因不再重名变为 `moveable`），只是名字不同，逻辑不变。
- 2.3（实施时新增）：改名后 `pnpm --filter react-moveable` 匹配不到任何包。根目录脚本和 CI 中的过滤条件改为 `@moveable-next/react` 后，`pnpm build` 和 `typecheck:stories` 都成功。

## 3. Storybook 与文档

- 3.1：实施时发现 `convertPath` 的正则不允许 `@`，从来匹配不到 `"@/react-moveable"`；React tab 中之所以显示 `react-moveable`，是因为 `convertReactTemplate` 删掉了所有 `@/`。所以改为让 `convertReactTemplate` 把 `"@/react-moveable"` 换成 `"@moveable-next/react"`，删除 `convertPath`。用临时测试重新导出后对比：137 个 story 的 React tab 全部变化，变化只有 `react-moveable` → `@moveable-next/react` 和（2 个 story 中的）`@moveable/helper` → `@moveable-next/helper`；CSS tab 没有变化。临时测试已删除。`typecheck:stories` 通过。
- 3.2：`packages/react-moveable/src/types.ts` 中 142 处文档注释示例全部改为 `import Moveable from "@moveable-next/vanilla"`。README（根目录、react-moveable、moveable、vue3-moveable；helper 和 croact-moveable 没有需要改的内容）、handbook、两份 `groupable.md`、`src/ables/README.md` 中的安装命令、import 语句、npm 徽章和包列表中的包名改为新包名。超出原定范围的一处：README 中用 `<script>` 引入 UMD 的示例原来指向上游站点 `daybrush.com`（那里提供的是上游的 moveable），改为 `https://unpkg.com/@moveable-next/vanilla/dist/moveable.min.js`。这是一种安装方式，不属于延后处理的站点链接。指向上游文档、Storybook、源码的链接没有改。`pnpm doc` 通过。
- 3.3：`CLAUDE.md` 加入目录与包名的对照表、`exports` 和 `files` 的说明，修改 `pnpm --filter`、React tab 转换、helper 别名、moveable 构建改名规则中的包名，搜不到 `@moveable/helper`。ROADMAP 第 6 步记录本 change，「已知遗留」补充了不支持 Node 原生 ESM 双格式这一条。

## 4. 全量检查

### 4.1

| 命令 | 结果 |
|---|---|
| `pnpm lint` | 通过 |
| `pnpm doc` | 通过 |
| `pnpm packages:build` | 通过，没有警告 |
| `pnpm --filter @moveable-next/react typecheck:stories` | 通过 |
| `pnpm build:storybook` | 通过 |
| `pnpm test` | 148 个用例全部通过，与基线相同 |

5 个包的 14 个 JS 产物与基线逐个文件对比：
- 12 个用脚本确认：把基线中预期的名字替换成新名字（头部注释的 `name` 和 `repository`、对其他工作区包的模块名、由模块名派生的局部变量名）之后，与新产物完全相同。
- vue3-moveable 的 2 个产物人工逐行核对了完整的 diff：每一行都属于这三类。脚本的替换规则会误伤 Vue 组件自己的 `name: "moveable"`，所以没有用脚本判断。
- sourcemap 的 `sources` 没有变化。

源码、配置、`dist/` 和 `declaration/` 中都搜不到把旧包名当作模块名的写法（`from` / `require` / `paths` / `alwaysBundle` / `--filter`）。

### 4.2

在 scratchpad 中用软链接指向 5 个包，用 Node 检查：
- `require` 和 `import()` 每个包都成功，都解析到 CJS 产物，`import()` 的 `default` 与 `require` 的结果是同一个值。
- `@moveable-next/react/types` 解析到 `types/index.js`；`@moveable-next/vanilla/dist/moveable.min.js`、`@moveable-next/helper/dist/helper.min.js` 可以解析；`@moveable-next/vue3/package.json` 可以读取。
- `@moveable-next/react/src/index`、`@moveable-next/vanilla/declaration/index.d.ts`、`@moveable-next/vanilla/dist/moveable.esm.js` 都抛出 `ERR_PACKAGE_PATH_NOT_EXPORTED`。
- `node --conditions=module` 下，5 个包的主入口都解析到 ESM 产物。

`pnpm pack` 打出 5 个 tarball，每个只包含 `dist/`、`declaration/`、`src/`（react 另有 `types/`）、`package.json`、`LICENSE` 和 README（helper 没有 README）；`package.json` 中的 `workspace:` 和 `catalog:` 都被替换成具体版本，例如 vanilla 依赖 `@moveable-next/croact: ~0.9.0`、`@moveable-next/react: ~0.56.0`。

publint 第一次检查时，moveable 和 helper 有一条警告：通配的 `./dist/*` 匹配到 `.esm.js`，而 Node 会把它当作 CommonJS 解析。导出 dist 的目的只是 UMD，所以改为只列出两个 UMD 文件，并同步修改 proposal、design、spec 和 `CLAUDE.md`。修改后 5 个包都没有错误和警告，只剩两条建议：显式写 `"type": "commonjs"`、声明 `engines.node`。`engines` 适合和 peer 范围一起决定，这次不加。修改后重新执行 `pnpm lint` 通过，`pnpm test` 148 个用例通过。
