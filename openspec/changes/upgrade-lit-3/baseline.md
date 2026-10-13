# 基线与验证记录

## 1.1 Lit 2 下的产物基线

`pnpm packages:build` 全部成功后，用 scratchpad 中的 `lit-baseline.cjs` 读取 lit-moveable 的产物，原始结果保存为 `lit-baseline-before.json`。方法与 `archive/2026-10-12-replace-build-with-tsdown/baseline.md` 相同：ESM 的 import / export 用文本解析，CJS 在 node 中 `require` 后看形状，UMD 内联的包从 sourcemap 的 `sources` 推出。基线是从当前 tsdown 产物重新取的，没有沿用归档中 rollup 时代的表。

| 项 | Lit 2.6.1 |
|---|---|
| dist 文件 | `moveable.{esm,cjs,umd}.js` 及各自的 `.map` |
| `declaration/` | `LitMoveable.d.ts`、`index.d.ts`、`types.d.ts` |
| 头部注释 | `Copyright (c) 2021 Daybrush`，name / license / author / repository / version 0.30.0，三个产物相同 |
| ESM（2730 字节） | import：`@daybrush/utils`、`framework-utils`、`lit`、`lit/decorators.js`、`moveable`；`export * from "moveable"`；具名导出 `LitMoveable` |
| CJS（4312 字节） | require 同上 5 个；`require` 后是 object，键 `EVENTS`、`LitMoveable`、`METHODS`、`PROPERTIES`、`getElementInfo`、`makeAble` |
| UMD（619030 字节） | 全局变量 `UMD`，AMD 依赖 `["exports"]`；内联 moveable、croact-moveable 产物和本包源码，以及 `@daybrush/utils`、`@egjs/agent`、`@egjs/children-differ`、`@egjs/list-differ`、`@scena/dragscroll`、`@scena/event-emitter`、`@scena/matrix`、`croact`、`croact-css-styled`、`css-styled`、`css-to-mat`、`framework-utils`、`gesto`、`overlap-area`，lit 部分是 `lit-html@2.6.1`、`lit-element@3.2.2`、`@lit/reactive-element@1.6.1` |

## 2.1 测试依赖

lit-moveable 的 devDependencies 新增 `vitest 5.0.3`、`@vitest/browser-playwright 5.0.3`、`playwright ^1.64.0`，另加 `"test": "vitest run"` 脚本（与 helper、react-moveable 一样，每个包有自己的 `test` 脚本）。`pnpm why playwright` 只解析到 `playwright@1.64.0` 一个版本，lit-moveable 和 react-moveable 共用。`pnpm exec vitest list --project lit-moveable --filesOnly` 输出 `[lit-moveable (chromium)] packages/lit-moveable/test/LitMoveable.spec.ts`。

## 2.2 Lit 2 上的测试结果

`pnpm exec vitest run --project lit-moveable`：5 个测试，4 个通过，「passes property changes after the first render to moveable」失败，失败在 `litDraggable = false` 之后等待内部 `props.draggable` 变为 `false` 的一步：`AssertionError: expected true to be false`。内部的 `draggable` 一直是 `true`，也就是修改被忽略。同一个测试前半段的 `rotatable` 断言已经通过。

对照：把这一行临时改为 `el.mvDraggable = false`，5 个测试全部通过，说明失败来自 `updated()` 中的 `"litMoveable"` 判断，而不是测试本身写错了。确认后已改回 `litDraggable`。

实施中的一个发现：起初测试在属性赋值后立即拖动，`litDraggable` 和 `mvDraggable` 两种写法都会失败。原因是原生 moveable 的属性 setter 经 croact 的 `setState` 异步生效。测试改为先用 `expect.poll` 等公开方法 `getManager()` 返回的 `props.draggable` 变为新值，再拖动，已写入 design 决策 3。

## 2.3 修正 `litDraggable`

`src/LitMoveable.ts` 的 `updated()` 中 `propName === "litMoveable"` 改为 `"litDraggable"`。重新构建 lit-moveable 后，5 个测试全部通过；`pnpm lint` 通过。

## 3.1 升级到 Lit 3

lit-moveable 新增 `peerDependencies: { "lit": "^3.0.0" }`，开发依赖 `lit` 改为 `^3.3.3`；`tsdown.config.mts` 的 ESM/CJS 配置改为 `deps: { onlyBundle: [] }`（与 helper 相同），删除 `neverBundle` 及其注释。`pnpm install` 后 `pnpm peers check` 只有已知的 svelte-moveable `svelte2tsx` 一条。锁文件中的 lit 系列只剩 `lit@3.3.3`、`lit-element@4.2.2`、`lit-html@3.3.3`、`@lit/reactive-element@2.1.2`、`@lit-labs/ssr-dom-shim@1.6.0`（Lit 3 的依赖），没有 Lit 2 的版本。

## 3.2 与基线对比

`pnpm --filter lit-moveable build` 成功，输出中没有依赖提示、警告或错误。用同一个脚本取快照（`lit-baseline-after.json`）对比：

| 项 | 结果 |
|---|---|
| dist 文件、`declaration/` 文件、头部注释 | 相同 |
| ESM import / `export *` / 具名导出 | 相同（外部模块仍是 `@daybrush/utils`、`framework-utils`、`lit`、`lit/decorators.js`、`moveable`） |
| CJS require / `require` 后的形状 | 相同（object，6 个键） |
| UMD 全局变量名 / AMD 依赖 | 相同（`UMD`、`["exports"]`） |
| UMD 内联的包 | lit 部分从 `lit-html@2.6.1`、`lit-element@3.2.2`、`@lit/reactive-element@1.6.1` 换成 `lit-html@3.3.3`、`lit-element@4.2.2`、`@lit/reactive-element@2.1.2`，其余相同；产物中没有「Lit is in dev mode」，是生产版本 |
| 体积 | ESM 2730 → 2731、CJS 4312 → 4313（2.3 的 `litMoveable` → `litDraggable` 多一个字符），UMD 619030 → 618036 |

## 3.3 Lit 3 上的测试

`pnpm exec vitest run --project lit-moveable`：5 个测试全部通过，与 2.3 相同。

## 4.1 README

安装说明改为 `npm install lit-moveable lit`，并写明需要 Lit 3（peer）；`litMoveable` 改为 `litDraggable`；`**lite**` 改为 `**lit**`；示例 import 改为 `import { html, render } from "lit";`；删除指向已删除的 rollup demo 的「Developments」一节。要让示例真正能直接运行，还修正了三处 tasks 没有列出的问题：补上示例中用到但没有声明的 `let translate = [0, 0];`，`render()` 补上容器参数 `document.body`，自定义元素不能自闭合，`/>` 改为 `></lit-moveable>`。

验证：README 中搜不到 `litMoveable`、`**lite**`、`demo/index.html`。把 README 的代码块原样作为 scratchpad 页面的模块脚本（`readme-example/`，用 Vite 解析 `lit` 和指向构建产物的 `lit-moveable`），在 Playwright chromium 中打开：控制框渲染出来，用真实鼠标拖动目标 (60, 40) 后 `transform` 为 `translate(60px, 40px)`，页面没有错误。
