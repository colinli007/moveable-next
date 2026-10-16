# 基线与验证记录

## 1.1 Svelte 4 版的基线

`pnpm packages:build` 全部成功后，用 scratchpad 中的 `svelte-baseline.cjs` 读取 svelte-moveable 的产物，并用包里安装的 svelte 编译 `packages/react-moveable/stories/**/svelte/**/*.svelte`，原始结果保存为 `svelte-baseline-before.json`。`index.js` 的 import / export 用文本解析。

| 项 | SvelteKit 1 + Svelte 4.2.0 |
|---|---|
| dist 文件 | `Moveable.svelte`、`Moveable.svelte.d.ts`、`index.d.ts`、`index.js`、`index.umd.d.ts`、`index.umd.js` |
| `index.js` | import `./Moveable.svelte`、`moveable`；`export default`；`export * from "moveable"` |
| 构建输出 | `svelte-package` 提示 `Using $lib/index.d.ts instead of generated .d.ts file`，publint `All good!` |
| `pnpm peers check` | 只有一条：svelte-moveable 的 `svelte2tsx@0.6.16` 要求 typescript `^4.9.4 \|\| ^5.0.0`，安装的是 4.8.4 |

生成示例的编译结果：133 个中 4 个失败。

| 文件 | 错误 | 原因 |
|---|---|---|
| `4-Options/svelte/ReactDragFocusedInputApp/App.svelte` | `invalid-void-content` | croffle 给 `<input>` 写了闭合标签 |
| `7-Request/svelte/ReactDraggableApp/App.svelte` | `invalid-void-content` | 同上 |
| `9A-Components/svelte/ReactSelectoNestedGroupApp/App.svelte` | `parse-error: Unexpected token` | croffle 生成的 JS 语法错误 |
| `4-SVG/svelte/ReactOriginFillboxApp/App.svelte` | `Cannot read properties of undefined (reading 'type')` | Svelte 4.2.0 编译器内部出错（`StyleAttributeWrapper.render` → `is_dynamic`），起因是样式属性中的空值 `transform: ;`；Svelte 5 能编译 |

前 3 个与 design 的 Context 一致；第 4 个是实施时发现的，design 的 Context 和 tasks 4.4 的预期已据此更正。

## 2.1 – 2.2 换工具链

- 源码用 `git mv` 移到 `src/`，`git ls-files packages/svelte-moveable/src` 只有 `Moveable.svelte`、`index.d.ts`、`index.js`。SvelteKit 演示应用、`vite.config.ts`、`svelte.config.js`、`index.umd.js` 已删除；`.gitignore` 删去 `/build`、`/package`，`/.svelte-kit` 保留并加注释。
- `pnpm install` 后：
  - 锁文件中没有 `@sveltejs/kit`、`vite@4`、`svelte@4`、`svelte-preprocess`。
  - TypeScript 只剩 croffle 的 `4.5.5` 和 `6.0.3`：`4.8.4` 删除，原来由 svelte-preprocess 带入的 `5.9.3` 也一并消失。
  - `pnpm peers check`：`No peer dependency issues found`。
- `pnpm-workspace.yaml` 的 `allowBuilds` 删去 `@sveltejs/kit`、`svelte-preprocess` 及注释中的 `svelte-kit sync`。`pnpm ignored-builds` 只列出 `allowBuilds` 中显式拦截的 4 项，没有新增的待处理脚本。

## 2.3 用新工具链构建旧组件

`pnpm --filter svelte-moveable build`（`svelte-package -i src && publint`）成功。publint 0.3.25 没有错误和警告，只有一条建议：`repository.url` 可以写成 `git+https://...git` 的形式；`repository` 留给第 6 步整理。

| 项 | 结果 |
|---|---|
| dist 文件 | `Moveable.svelte`、`Moveable.svelte.d.ts`、`index.d.ts`、`index.js`；不再有 `index.umd.*` |
| `index.js` | 与基线相同：import `./Moveable.svelte`、`moveable`；`export default`；`export * from "moveable"` |
| `index.d.ts` | 手写的声明原样复制 |
| `Moveable.svelte.d.ts` | svelte2tsx 0.7 生成，props 仍是 `[x: string]: any` |
| 生成示例（Svelte 5.57.2） | 133 个中 3 个失败，就是 croffle 的 3 个；`ReactOriginFillboxApp` 能编译 |

## 3.1 测试配置

- devDependencies 新增 `@sveltejs/vite-plugin-svelte ^7.3.1`、`vitest 5.0.3`、`@vitest/browser-playwright 5.0.3`、`playwright ^1.64.0`。锁文件中 `vite` 只有 `8.3.4`，`playwright` 只有 `1.64.0`。
- 与 tasks 的一处差异：两个 project 命名为 `browser`、`ssr`，没有用 `svelte-moveable`、`svelte-moveable-ssr`。
  - 原因：Vitest 会在嵌套 project 名前加上包名，原来的命名会显示为 `svelte-moveable (svelte-moveable-ssr)`。
  - 现在显示为 `svelte-moveable (browser)`、`svelte-moveable (ssr)`，与 react-moveable 的 `react-moveable (unit)` 一致。用 `--project "svelte-moveable (*)"` 同时选中两者。
  - tasks、design 已更新。
- 插件写成 `svelte({ configFile: false })`：否则插件每次都会打印 `no Svelte config found ... using default configuration`，在根目录跑其它包的测试时也会出现。
- `pnpm exec vitest list --project "svelte-moveable (*)" --filesOnly` 能列出两个 project 的测试文件。

## 3.2 旧组件上的测试

`test/SvelteMoveable.svelte.spec.ts`（7 个测试）、`test/LegacyUsage.svelte`、`test/SvelteMoveable.ssr.spec.ts` + `test/SsrPage.svelte`。`pnpm exec vitest run --project "svelte-moveable (*)"` 的结果：8 个测试中 6 个通过，2 个失败，另有 1 个 unhandled error。

| 测试 | 结果 |
|---|---|
| renders the control box for the target | 通过 |
| passes prop changes after mount to moveable | 通过 |
| calls the event callback props | 通过 |
| proxies moveable methods through the component instance | 失败：`TypeError: instance.getRect is not a function` |
| destroys moveable when unmounted | 通过 |
| can be unmounted right after mounting | 测试本身通过，但引起 unhandled rejection（见下） |
| supports the syntax of the generated Storybook examples | `on:drag` 的 `detail.transform` 正确；之后失败：`TypeError: instance.getMoveable(...).getRect is not a function` |
| renders on the server（ssr） | 通过 |

Unhandled rejection 的情况：
- 错误：`TypeError: Cannot read properties of null (reading 'setState')`，栈为 `dist/Moveable.svelte:33`（`beforeUpdate` 中 `tick().then` 的回调）→ `MoveableManager.tsx:89`（`innerMoveable` 已被 `destroy()` 置空）。
- 完整运行时 Vitest 报 `Errors 1 error`。
- 用 `-t "right after mounting"` 单独运行这个测试，同样出现这个 unhandled rejection，说明它能单独检出这个问题。

写测试时的两点发现（design 决策 4 的表已更新）：
- 最初的 6 个测试检不出这个问题：其余测试在卸载前都等过微任务，旧组件推迟执行的 `setState` 已经运行完。所以补上「挂载后马上卸载」。
- `render()` 用 `$state` 包装 props，传入的数组会被代理：组件 `push` 写到的是代理，测试中的原数组不变。所以 `LegacyUsage.svelte` 改为通过回调 prop `record` 记录事件。

## 4.1 改写组件

- `Moveable.svelte` 改为 runes 模式加 `<script lang="ts">`；`index.js` 用 `git mv` 改为 `index.ts`，其中是包装组件；删除手写的 `index.d.ts`。
- `getOptions()` 写成 `Object.fromEntries(PROPERTIES.filter(name => name in props).map(...))`，返回类型标为 `MoveableOptions`。
- `$effect` 写在 `onMount` 之后，首次运行时 moveable 已经创建，所以直接 `moveable.setState(...)`，不加 `?.`。
- `svelte-check --tsconfig ./tsconfig.json --fail-on-warnings`：`0 ERRORS 0 WARNINGS`。
- `pnpm --filter svelte-moveable build` 成功，publint 仍只有 `repository.url` 那一条建议。
- `dist/` 是 `Moveable.svelte`、`Moveable.svelte.d.ts`、`index.d.ts`、`index.js`：
  - `Moveable.svelte.d.ts`：`Component<Props, { getInstance: () => VanillaMoveable }, "">`。`Props` 是 `MoveableOptions` 加上每个事件的 `on${Capitalize<K>}` 回调，不再是 `[x: string]: any`。
  - `index.d.ts`：`Component<ComponentProps<typeof InnerMoveable>, ReturnType<typeof InnerMoveable> & MoveableInterface>`，以及 `export * from "moveable"`。
  - `index.js`：import `moveable`、`./Moveable.svelte`；`export default`；`export * from "moveable"`。导出与基线相同，只是 import 顺序不同。

## 4.2 新组件上的测试

`pnpm exec vitest run --project "svelte-moveable (*)" --reporter verbose`：8 个测试全部通过（browser 7 个，ssr 1 个）。测试代码与 3.2 相同。输出中没有 unhandled error，也没有 Svelte 的警告。

## 4.3 类型测试

`test/types.ts`、`test/TypesUsage.svelte`、`tsconfig.test.json`；scripts 新增 `test:type`，`build` 末尾执行它。`pnpm --filter svelte-moveable build` 成功，类型测试 `0 ERRORS 0 WARNINGS`。反向检查（每次只改一处，确认后改回）：

| 修改 | 结果 |
|---|---|
| `types.ts` 中 `draggable: "yes"` 改为 `true` | `25:9 Unused '@ts-expect-error' directive.` |
| `types.ts` 中 `e.transform` 赋给 `number` | `15:19 Type 'string' is not assignable to type 'number'.` |
| `TypesUsage.svelte` 中 `e.transform` 赋给 `number` | `18:11 Type 'string' is not assignable to type 'number'.`（确认 `.svelte` 文件也被检查） |

## 4.4 Svelte 5 编译生成示例

用改写后的包（svelte 5.57.2）重新执行 `svelte-baseline.cjs`，原始结果保存为 `svelte-baseline-after.json`。133 个中 3 个失败：

- `4-Options/svelte/ReactDragFocusedInputApp/App.svelte`、`7-Request/svelte/ReactDraggableApp/App.svelte`：`void_element_invalid_content`。
- `9A-Components/svelte/ReactSelectoNestedGroupApp/App.svelte`：`js_parse_error`。

这就是 croffle 的 3 个；与 1.1 相比少了 `ReactOriginFillboxApp`（Svelte 4.2 编译器自身的问题）。

## 5. lint 与文档

- `eslint.config.mjs` 的 `files` 加入 `packages/svelte-moveable/src/**/*.ts` 后，`pnpm lint` 通过。在 `src/index.ts` 中临时加 `import { EVENTS } from "moveable";`，报 `1:10 error 'EVENTS' is defined but never used @typescript-eslint/no-unused-vars`，确认后删除。
- README：
  - 安装改为 `npm i svelte-moveable svelte`，写明需要 Svelte 5。
  - 用法改为 runes 写法：`$state`、回调 prop、`bind:this` 调用方法、整体赋值数组选项，并说明 `on:` 已弃用且 `detail` 没有类型。
  - 删除「Developments」一节，搜不到 `npm run dev`、`localhost:5000`、`pinchable="false"`。
  - 把示例代码取出放到 `test/` 下，用 Svelte 5 编译（没有警告）并用 svelte-check 检查（0 错误），确认后删除。
- `CLAUDE.md`：
  - TypeScript 一条改为全部包 `~6.0.3`，删除 TS 4.8 的例外和「不要写 TS 5+ 语法」的限制，加上 `.svelte` 只能写类型标注。
  - 更新 lint 范围、Vitest project、框架包装测试、`packages:build` 的说明。
  - 搜不到 `4.8`、`TS 5+`。
- CI 中 Lint 步骤的注释加上 svelte-moveable。
- ROADMAP：
  - 第 4 步表格和「待进行」标明 `upgrade-svelte-5` 进行中。
  - 第 5 步加入三项：示例改写为 Svelte 5 写法（需要改 croffle 的输出）、修复 3 个编译失败的示例、示例改完后去掉 `on:`。
- 仓库中（排除 `openspec/changes/`、锁文件）搜不到 `4.8 <4.9`、`TS 4.8`、`svelte2tsx` 的旧描述。

## 本地完整检查

`pnpm lint && pnpm packages:build && pnpm --filter react-moveable typecheck:stories && pnpm test` 全部成功：27 个测试文件中 26 个通过、1 个 skipped，162 个测试通过。比上一个 change 的 154 个多出 8 个，就是 svelte-moveable 的测试。

## 6.1 CI

- `27435bf4`（本 change 的提交）：run 38844574207 通过。Run tests 步骤的日志中有：
  - `✓ svelte-moveable (browser) (chromium) test/SvelteMoveable.svelte.spec.ts (7 tests)`
  - `✓ svelte-moveable (ssr) test/SvelteMoveable.ssr.spec.ts (1 test)`
- `dca71317`（临时提交，把 `src/index.ts` 中补方法的 `METHODS.forEach` 换成 `void METHODS;`）：
  - 本地先确认构建仍成功（类型声明中仍有这些方法），两个测试失败。
  - run 38844871209 失败，失败在 Run tests 步骤。日志中有：
    - `FAIL svelte-moveable (browser) (chromium) test/SvelteMoveable.svelte.spec.ts > svelte-moveable > proxies moveable methods through the component instance`
    - `... > supports the syntax of the generated Storybook examples`
  - 失败截图作为 `failure screenshots` 产物上传。
- `c540829b` revert 了临时提交（与 `27435bf4` 没有差异），run 38845193934 通过。

## 6.2 全新克隆

从 origin 全新克隆 `refactor`（`c540829b`），依次执行以下命令，全部成功：
- `pnpm install --frozen-lockfile`
- `pnpm lint`
- `pnpm packages:build`
- `playwright install chromium`
- `typecheck:stories`
- `pnpm test`

结果：27 个测试文件中 26 个通过、1 个 skipped，162 个测试通过。在同一个克隆中用 `--reporter verbose` 单独执行 lit-moveable、vue3-moveable、`svelte-moveable (*)`，4 个测试文件、18 个测试全部通过（5 + 5 + 8）。`openspec validate upgrade-svelte-5 --strict` 通过。
