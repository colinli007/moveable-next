# 产物基线与对比记录

本文件记录 design 决策 10 的基线和迁移后的对比结果。基线产物、对比脚本都在会话的 scratchpad 中，不提交到仓库；这里只保留结论数据。

## 1. 基线（迁移前，2026-10-12）

构建环境：Node 22.20.0、pnpm 11.28.2，`pnpm packages:build` 用迁移前的工具链（`@daybrush/builder` 0.2.4 + rollup 3）全量构建，8 个包全部成功。构建日志中有 6 处 rollup 的 `UNRESOLVED_IMPORT` 警告，都属于 monorepo-tooling 主 spec 登记的例外（react-moveable、helper、lit-moveable 的 ESM/CJS 构建）。

对比脚本做的事：
- 用 acorn 解析 ESM 产物，得到导出名和外部 import；
- 解析 CJS/UMD 产物中的 `require()` 和 AMD `define` 依赖；
- 用绑定到真实工作区包的 `require` 执行 CJS 产物，记录形状；
- 在空的 `vm` 沙箱中执行 UMD 产物，记录它定义的全局变量。需要 DOM 的工厂（lit）执行会失败，失败时改为从包装代码中读取全局变量名；
- sourcemap 记录 sources 数量和 mappings 长度。

### 基线 UMD 内联的包

基线的 sourcemap 不列出依赖，所以内联清单按依赖关系推导：从各产物实际 import 的包出发，按 `package.json` 的 `dependencies` 递归求闭包，`react` 按别名换成 `croact`。推导结果与产物中各库保留的头部注释（`name:` 行）逐一吻合。

| UMD | 内联的包 |
|---|---|
| moveable `moveable.js` / `moveable.min.js` | react-moveable 产物、@daybrush/utils、@egjs/agent、@egjs/children-differ、@egjs/list-differ、@scena/dragscroll、@scena/event-emitter、@scena/matrix、croact、css-styled、css-to-mat、framework-utils、gesto、overlap-area、react-css-styled |
| lit-moveable `moveable.umd.js` | moveable 产物、croact-moveable 产物、@daybrush/utils、@egjs/agent、@egjs/children-differ、@egjs/list-differ、@scena/dragscroll、@scena/event-emitter、@scena/matrix、croact、croact-css-styled、css-styled、css-to-mat、framework-utils、gesto、overlap-area、lit、lit-element、lit-html、@lit/reactive-element、@lit-labs/ssr-dom-shim |
| helper `helper.js` / `helper.min.js` | @daybrush/utils |

说明：moveable 的 UMD 内联的是 `react-css-styled`（其中的 react 被换成 croact），不是 `croact-css-styled`；lit 的 UMD 通过 croact-moveable 内联的是 `croact-css-styled`。

### react-moveable

- dist 文件：`moveable.cjs.js` (585900)、`moveable.cjs.js.map` (1190150)、`moveable.esm.js` (581650)、`moveable.esm.js.map` (1187935)
- declaration 文件数：63

| 产物 | 格式 | 外部模块 | 导出 / 形状 | sourcemap |
|---|---|---|---|---|
| `moveable.esm.js` | esm | @daybrush/utils, @egjs/agent, @egjs/children-differ, @egjs/list-differ, @scena/dragscroll, @scena/event-emitter, @scena/matrix, css-to-mat, framework-utils, gesto, overlap-area, react, react-css-styled | `Clippable` `DIRECTIONS` `Draggable` `EdgeDraggable` `InitialMoveable` `MOVEABLE_ABLES` `MOVEABLE_EVENTS` `MOVEABLE_METHODS` `MOVEABLE_PROPS` `Pinchable` `Resizable` `Rotatable` `Roundable` `Scalable` `Snappable` `Warpable` `calculateElementPosition` `default` `getElementInfo` `makeAble` `makeMoveable` | 58 sources，mappings 529354 |
| `moveable.cjs.js` | cjs | @daybrush/utils, @egjs/agent, @egjs/children-differ, @egjs/list-differ, @scena/dragscroll, @scena/event-emitter, @scena/matrix, css-to-mat, framework-utils, gesto, overlap-area, react, react-css-styled | function Moveable，22 个键，default===自身: true，__esModule: false，描述符 {"data-writable":22} | 59 sources，mappings 530320 |

头部注释：

```
/*
Copyright (c) 2019 Daybrush
name: react-moveable
license: MIT
author: Daybrush
repository: https://github.com/daybrush/moveable/blob/master/packages/react-moveable
version: 0.56.0
*/
```

### croact-moveable

- dist 文件：`moveable.cjs.js` (585937)、`moveable.esm.js` (581800)
- declaration 文件数：2

| 产物 | 格式 | 外部模块 | 导出 / 形状 | sourcemap |
|---|---|---|---|---|
| `moveable.esm.js` | esm | @daybrush/utils, @egjs/agent, @egjs/children-differ, @egjs/list-differ, @scena/dragscroll, @scena/event-emitter, @scena/matrix, croact, croact-css-styled, css-to-mat, framework-utils, gesto, overlap-area | `Clippable` `DIRECTIONS` `Draggable` `EdgeDraggable` `InitialMoveable` `MOVEABLE_ABLES` `MOVEABLE_EVENTS` `MOVEABLE_METHODS` `MOVEABLE_PROPS` `Pinchable` `Resizable` `Rotatable` `Roundable` `Scalable` `Snappable` `Warpable` `calculateElementPosition` `default` `getElementInfo` `makeAble` `makeMoveable` | 无 |
| `moveable.cjs.js` | cjs | @daybrush/utils, @egjs/agent, @egjs/children-differ, @egjs/list-differ, @scena/dragscroll, @scena/event-emitter, @scena/matrix, croact, croact-css-styled, css-to-mat, framework-utils, gesto, overlap-area | function Moveable，22 个键，default===自身: true，__esModule: false，描述符 {"data-writable":22} | 无 |

头部注释：

```
/*
Copyright (c) 2019 Daybrush
name: croact-moveable
license: MIT
author: Daybrush
repository: https://github.com/daybrush/moveable/blob/master/packages/croact-moveable
version: 0.9.0
*/
```

### preact-moveable

- dist 文件：`moveable.cjs.js` (589889)、`moveable.esm.js` (586935)
- declaration 文件数：3

| 产物 | 格式 | 外部模块 | 导出 / 形状 | sourcemap |
|---|---|---|---|---|
| `moveable.esm.js` | esm | @daybrush/utils, @egjs/agent, @egjs/children-differ, @egjs/list-differ, @scena/dragscroll, @scena/matrix, css-to-mat, framework-utils, gesto, overlap-area, preact-css-styled, preact/compat | `default` | 无 |
| `moveable.cjs.js` | cjs | @daybrush/utils, @egjs/agent, @egjs/children-differ, @egjs/list-differ, @scena/dragscroll, @scena/matrix, css-to-mat, framework-utils, gesto, overlap-area, preact-css-styled, preact/compat | require 失败：Cannot find module '@egjs/agent' | 无 |

头部注释：

```
/*
Copyright (c) 2019 Daybrush
name: preact-moveable
license: MIT
author: Daybrush
repository: https://github.com/daybrush/moveable/blob/master/packages/preact-moveable
version: 0.55.0
*/
```

### moveable

- dist 文件：`moveable.cjs.js` (8275)、`moveable.cjs.js.map` (6509)、`moveable.esm.js` (7345)、`moveable.esm.js.map` (11658)、`moveable.js` (788092)、`moveable.js.map` (1280060)、`moveable.min.js` (245567)、`moveable.min.js.map` (96)
- declaration 文件数：9

| 产物 | 格式 | 外部模块 | 导出 / 形状 | sourcemap |
|---|---|---|---|---|
| `moveable.esm.js` | esm | @daybrush/utils, @scena/event-emitter, croact, croact-moveable, framework-utils | `EVENTS` `METHODS` `PROPERTIES` `default` `getElementInfo` `makeAble` | 5 sources，mappings 5114 |
| `moveable.cjs.js` | cjs | @daybrush/utils, @scena/event-emitter, croact, croact-moveable, framework-utils | function Moveable，6 个键，default===自身: true，__esModule: false，描述符 {"data-writable":6} | 6 sources，mappings 5311 |
| `moveable.js` | umd | 无 | 全局 `Moveable`：function，6 个键，default===自身: true | 7 sources，mappings 640142 |
| `moveable.min.js` | umd | 无 | 全局 `Moveable`：function，6 个键，default===自身: true | 0 sources，mappings 0 |

头部注释：

```
/*
Copyright (c) 2019 Daybrush
name: moveable
license: MIT
author: Daybrush
repository: https://github.com/daybrush/moveable/blob/master/packages/moveable
version: 0.53.0
*/
```

### lit-moveable

- dist 文件：`moveable.cjs.js` (4464)、`moveable.cjs.js.map` (16571)、`moveable.esm.js` (4148)、`moveable.esm.js.map` (16410)、`moveable.umd.js` (848852)、`moveable.umd.js.map` (1653386)
- declaration 文件数：3

| 产物 | 格式 | 外部模块 | 导出 / 形状 | sourcemap |
|---|---|---|---|---|
| `moveable.esm.js` | esm | @daybrush/utils, framework-utils, lit, lit/decorators.js, moveable | `* from moveable` `LitMoveable` | 2 sources，mappings 3205 |
| `moveable.cjs.js` | cjs | @daybrush/utils, framework-utils, lit, lit/decorators.js, moveable | object，6 个键，default===自身: false，__esModule: false，描述符 {"getter-only":5,"data-writable":1} | 2 sources，mappings 3239 |
| `moveable.umd.js` | umd | 无 | 全局（读包装）：UMD（沙箱执行失败：window is not defined）；AMD 依赖 ["exports"] | 25 sources，mappings 807917 |

头部注释：

```
/*
Copyright (c) 2021 Daybrush
name: lit-moveable
license: MIT
author: Daybrush
repository: https://github.com/daybrush/moveable/blob/master/packages/lit-moveable
version: 0.30.0
*/
```

### helper

- dist 文件：`helper.cjs.js` (25977)、`helper.cjs.js.map` (45311)、`helper.esm.js` (25551)、`helper.esm.js.map` (45071)、`helper.js` (31447)、`helper.js.map` (87824)、`helper.min.js` (9448)、`helper.min.js.map` (94)
- declaration 文件数：6

| 产物 | 格式 | 外部模块 | 导出 / 形状 | sourcemap |
|---|---|---|---|---|
| `helper.esm.js` | esm | @daybrush/utils | `ArrayChild` `Child` `GroupManager` `SingleChild` `toTargetList` | 2 sources，mappings 21598 |
| `helper.cjs.js` | cjs | @daybrush/utils | object，5 个键，default===自身: false，__esModule: false，描述符 {"data-writable":5} | 3 sources，mappings 21663 |
| `helper.js` | umd | 无 | 全局 `MoveableHelper`：object，5 个键，default===自身: false | 3 sources，mappings 23076 |
| `helper.min.js` | umd | 无 | 全局 `MoveableHelper`：object，5 个键，default===自身: false | 0 sources，mappings 0 |

头部注释：

```
/*
Copyright (c) Daybrush
name: @moveable/helper
license: MIT
author: Daybrush
repository: https://github.com/daybrush/moveable/blob/master/packages/helper
version: 0.1.3
*/
```


## 2. TypeScript 6 的调整记录（tasks 2.2）

按 design 决策 7 修改的项：
- 6 个包：`target: es2022`，`useDefineForClassFields: false`，`lib` 改为 `es2022` + `dom` + `dom.iterable`，`moduleResolution: bundler`；croact、moveable 的 `module` 由 `es2015` 改为 `esnext`。
- 删除 `esModuleInterop: false`（react-moveable、croact、preact、moveable、helper）、`baseUrl`（react-moveable、moveable、helper）、`downlevelIteration`（react-moveable、helper）、moveable 的 `importHelpers`。
- 6 个包的 `tsconfig.declaration.json` 加上 `rootDir`（preact 为 `./src/preact-moveable`，其余为 `./src`）。
- 删除 helper、preact、lit 的 `tsconfig.build.json`；react-moveable 的保留（`jsx: react`）。

编译过程中额外发现、并按根因处理的两项：
- **入口中的 `module.exports =` 报 `Cannot find name 'module'`**：TS 6 的 `types` 默认值为 `[]`，不再自动引入 `@types/node`。这几行本来就要按 design 决策 5 删除，所以把入口改写从 tasks 3.2、4.1、4.2、5.1 提前到这里：react-moveable、croact-moveable 的 `src/index.umd.ts` 改为只有 `export default` 的形式，删除 helper、moveable 的 `src/index.cjs.ts`。没有为此加 `types: ["node"]`。
- **`typecheck:stories` 报 TS6059（文件不在 `rootDir` 下）**：`stories/tsconfig.json` 继承了 react-moveable `tsconfig.json` 中的 `outDir: "./outjs/"`，TS 6 下 `rootDir` 默认为 tsconfig 所在目录（`stories/`），而 `.storybook/` 不在其中。这个 `outDir` 是死配置（`noEmit: true`，声明文件使用 `declarationDir`），所以删除它，没有给 stories 补 `rootDir`。

验证结果：
- 6 个包的 `declaration` 成功，没有出现 `declaration/src/`。
- react-moveable 的 `test:type`、`typecheck:stories` 通过。

`declaration/` 与基线的差异：

| 包 | 文件列表 | 内容变化 | 原因 |
|---|---|---|---|
| react-moveable | 不变 | `ables/edgeDraggable.d.ts`、`ables/consts.d.ts`、`ables/Resizable.d.ts`、`ables/Scalable.d.ts` 中推断类型的引用由 `import("../types")` 变为 `import("..")`；`index.umd.d.ts` 少了 `export * from "./index.esm"` | 前者：bundler 解析下 TS 6 选择了更短的等价路径（`declaration/index.d.ts` 转导出 `types`），类型相同。后者：入口改写 |
| croact-moveable | 不变 | `index.umd.d.ts` 少了 `export * from "./index"` | 入口改写 |
| preact-moveable | 不变 | `types.d.ts` 中 `export declare type` 变为 `export type` | TS 版本的输出格式 |
| moveable | 少了 `index.cjs.d.ts` | `types.d.ts` 中 `export declare type` 变为 `export type` | 入口合并；TS 版本的输出格式 |
| lit-moveable | 不变 | 无 | |
| helper | 少了 `index.cjs.d.ts` | 无 | 入口合并 |

测试与 lint（tasks 2.3、2.4）：
- `pnpm test`：22 个测试文件通过，1 个跳过（与改动前相同）；144 个测试全部通过，即 137 个 story、5 个代码 tab 单元测试、2 个 helper 单元测试，数量与改动前相同。
- react-moveable、helper 的 `lint`（ESLint 7 + typescript-eslint 5.60，TS 6.0.3）通过，没有解析错误，也没有打印「不受支持的 TS 版本」警告；只有 eslint-plugin-react 原本就有的「React version not specified」提示。

## 3. banner 与 helper（tasks 3.1、3.2）

- `config/build.mjs` 的 `banner()` 生成的头部注释，与基线 6 个包全部 17 个 JS 产物的开头逐字相同。
- tsdown 配置文件命名为 `tsdown.config.mts`：包的 `package.json` 没有 `"type": "module"`，用 `.ts` 时 Node 会打印 `MODULE_TYPELESS_PACKAGE_JSON` 警告。这与仓库中 Vitest 配置使用 `.mts` 的原因相同。
- helper 的产物与基线对比：

| 产物 | 对比结果 |
|---|---|
| `helper.esm.js` | 导出名、外部模块（`@daybrush/utils`）、头部注释相同；体积 25551 → 13550 |
| `helper.cjs.js` | 键集合相同（5 个具名导出，没有 `default`、没有 `__esModule`）；属性由可写数据属性变为只读 getter（design 决策 5 的已知差异）；体积 25977 → 14446 |
| `helper.js` / `helper.min.js` | 全局变量 `MoveableHelper` 相同（对象，5 个键）；内联的包只有 `@daybrush/utils`，与基线相同；AMD 分支由 `define(factory)` 变为 `define([], factory)`，两者等价；体积 31447 → 18343、9448 → 8156 |

- 产物中没有 `tslib` 或 `@oxc-project/runtime` 的引用。
- `helper.min.js` 以头部注释开头；`helper.min.js.map` 有 5 个 sources，指向 `src/` 下的文件和 `@daybrush/utils`，mappings 不为空。
- `declaration/` 只少了 `index.cjs.d.ts`（入口合并）。
- `pnpm --filter @moveable/helper test`：2 个测试通过。

## 4. react-moveable、croact-moveable、preact-moveable

### react-moveable（tasks 4.1）

- 首次构建时 Rolldown 报 `INVALID_ANNOTATION`：`src/ables/consts.ts` 中 `MOVEABLE_ABLES = /*#__PURE__*/[...]`。`#__PURE__` 只对函数调用和 `new` 有效，放在数组字面量前从来不起作用（rollup 静默忽略）。根因是源码中的注释本身无效，所以删除这个注释，没有关闭 `checks.invalidAnnotation`。删除后构建没有任何警告。
- 与基线对比：

| 产物 | 对比结果 |
|---|---|
| `moveable.esm.js` | 导出名、外部模块、头部注释相同；体积 581566 → 438145 |
| `moveable.cjs.js` | 外部模块、头部注释相同；`require()` 结果为 `function Moveable`，22 个键与基线逐一相同，`default === 自身`，没有 `__esModule`，属性都是可写数据属性（与基线相同）；体积 585816 → 448810 |

- sourcemap 只包含本包源码，没有 node_modules 包被内联（`deps.onlyBundle: []` 未报错）。
- 装饰器：`@withMethods(MOVEABLE_METHODS)` 编译为 `__decorate([...], InitialMoveable.prototype, "moveable", void 0)`，辅助函数从 Rolldown 内置的 `@oxc-project/runtime` 内联（产物中只有它的区域注释，没有外部 import）。`public moveable!` 没有被输出为类字段；实例字段编译为构造函数中的赋值，静态字段编译为 `static {}` 块。
- JSX 编译为 `createElement`（36 处），没有 `react/jsx-runtime`；产物中没有 `__extends`、`extendStatics`、`tslib`。
- `build` 脚本（lint → test:type → tsdown → declaration）成功。

### croact-moveable（tasks 4.2）

- 删除多余的 `react-css-styled` 依赖。
- 与基线对比：

| 产物 | 对比结果 |
|---|---|
| `moveable.esm.js` | 导出名、外部模块（`croact`、`croact-css-styled` 加上 react-moveable 的运行时依赖）、头部注释相同；体积 581716 → 435307 |
| `moveable.cjs.js` | 外部模块、头部注释相同；`require()` 形状与基线相同（`function Moveable`，22 个键，`default === 自身`，没有 `__esModule`，可写数据属性）；体积 585853 → 445984 |

- 产物中没有 `react`、`react-dom`、`react/jsx-runtime`、`react-css-styled` 的引用。
- sourcemap 的 sources 为 `../../react-moveable/dist/moveable.esm.js` 和本包的 `src/index.ts`、`src/index.umd.ts`：内联的是 react-moveable 的 ESM 产物（CJS 构建也是，`mainFields` 生效），没有 node_modules 包被内联，croact 保持 external。
- `deps.onlyBundle: []` 没有报错：react-moveable 通过 workspace 符号链接解析，真实路径不在 `node_modules` 中，tsdown 不把它计入内联清单，所以不需要写进 `onlyBundle`（结论已写入 design 决策 3）。

### preact-moveable（tasks 4.3）

- `dependencies` 补上 10 个运行时依赖，范围与 react-moveable 相同（`pnpm add` 会把范围改写为当前解析到的版本，`@egjs/agent`、`gesto` 已手动改回 `^2.2.1`、`^1.19.3`）。
- 首次构建被 `deps.onlyBundle: []` 拦下：`@scena/event-emitter` 会被内联。查基线发现它在基线 preact 产物中**本来就是被内联的**（产物第 25 行是它的头部注释）：旧的 preact rollup 配置的 external 清单漏了它，插件自带的 node-resolve 把它打了进去。croact 和 react-moveable 都把它作为 external。按 spec「运行时依赖保持 external」，改为声明为 preact-moveable 的依赖，而不是复刻这个意外。
- 与基线对比：导出名（只有 `default`）、头部注释相同；外部模块比基线多一个 `@scena/event-emitter`（上一条的原因），其余相同；产物中没有 `react`、`react-dom`、`react/jsx-runtime`、`react-css-styled`、`preact` 的 import；sourcemap 只包含本包源码和 react-moveable 的 ESM 产物，没有 node_modules 包被内联；体积 586851 → 434227（ESM）、589805 → 444066（CJS）。
- 严格布局下 `require` CJS 产物：原来的 `Cannot find module '@egjs/agent'` 已解决，但接着报 `Cannot find module 'preact/compat'`，抛出位置是 `preact-css-styled@1.1.9` 的 `dist/styled.cjs.js`。`preact-css-styled`（1.1.9 是 npm 上的最新版）的代码 import 了 `preact/compat`，但它的 `package.json` 没有把 preact 声明为依赖或 peer。这是第三方包的元数据缺陷。经用户确认，在 `pnpm-workspace.yaml` 中用 `packageExtensions` 给 `preact-css-styled` 补上 `peerDependencies: { preact: "*" }`（pnpm 修正第三方包错误声明的标准做法，记入 ROADMAP「已知遗留」）。之后 `require` 成功：结果是 `function Moveable`（原型为 `InitialMoveable`），唯一的可枚举键是静态字段 `defaultAbles`，即 ESM 入口的 default 导出本身，符合 spec「require preact-moveable」。
- 用 Node 原生 ESM 直接 import 产物会报 `Named export 'diff' not found`（`@egjs/children-differ` 是 CJS 包）。基线中同一行 import 完全相同，这是依赖库本身的情况，不是本次回归；产物面向打包器使用，不在 spec 范围内。

## 5. moveable 与 lit-moveable

### moveable（tasks 5.1）

- 首次构建时 ESM/CJS 的外部模块多出 `react-moveable/types`：`src/types.ts` 的 `export * from "react-moveable/types"` 是纯类型转导出，旧工具靠完整的类型信息删掉了它，Rolldown 逐文件转译只能保留。这个子路径的运行时入口是空文件，所以用 `deps.alwaysBundle: ["react-moveable/types"]` 把它打包进来，转导出随之消失（理由见 design 决策 3）。
- 与基线对比：

| 产物 | 对比结果 |
|---|---|
| `moveable.esm.js` | 导出名、外部模块（`@daybrush/utils`、`@scena/event-emitter`、`croact`、`croact-moveable`、`framework-utils`）、头部注释相同；体积 7345 → 4485 |
| `moveable.cjs.js` | 外部模块、头部注释相同；`require()` 形状与基线完全相同（`function Moveable`，6 个键，`default === 自身`，可写数据属性）；体积 8275 → 6349 |
| `moveable.js` / `moveable.min.js` | 全局 `Moveable` 形状相同（函数，6 个键，`default === 自身`）；内联的包与基线推导清单逐一相同（react-moveable 产物、croact、react-css-styled、css-styled 等 14 个依赖）；没有 `react` 引用；AMD 分支由 `define(factory)` 变为 `define([], factory)`；体积 787498 → 600562、245567 → 229102 |

- `moveable.min.js.map`：22 个 sources，mappings 不为空（基线为 96 字节的空 map）。

### 浏览器实测 moveable.min.js（tasks 5.2）

用 react-moveable 已安装的 Playwright（chromium，800×600）打开临时页面，引入新的 `moveable.min.js`：
- `new Moveable(document.body, { target, draggable: true })` 渲染出 `.moveable-control-box`，页面没有报错；
- 从 (150, 150) 拖到 (200, 180)，`drag` 事件写入的 `transform` 为 `translate(50px, 30px)`；
- `Moveable.PROPERTIES` 可以通过全局变量访问（127 项）；
- `moveable.draggable = false` 后读回 `false`；实例上没有名为 `draggable` 的自有字段（访问器来自 `@Properties` 定义的原型，没有被实例字段遮住）；内部组件的 `props.draggable` 也变为 `false`。

### lit-moveable（tasks 5.3）

- 首次构建后，UMD 产物能在没有 `window` 的空沙箱中执行，还定义了 `customElements` 等全局变量：打进去的是 lit 的 SSR 版本（带 `@lit-labs/ssr-dom-shim`）。根因是 tsdown 默认 `platform: "node"`，解析时匹配了 lit 系列包 `exports` 中的 `node` 条件。UMD 运行在浏览器中，所以 3 个包的 UMD 配置都改为 `platform: "browser"`（见 design 决策 1 的默认值表）。之后：
  - lit UMD 在沙箱中需要 `window`（浏览器版本），内联清单中不再有 `@lit-labs/ssr-dom-shim`；
  - helper UMD 中的 `@daybrush/utils` 从 CJS 版本（整体包装、无法 tree-shake）变为 ESM 版本，体积 18343 → 17563（压缩版 8156 → 7774）；
  - moveable UMD 不变。
  - 浏览器平台的默认解析已是 `module` 优先，moveable、lit 的 UMD 配置中原先显式写的 `mainFields` 是多余的，删除后产物逐字节相同。
- 与基线对比：

| 产物 | 对比结果 |
|---|---|
| `moveable.esm.js` | 导出名（`LitMoveable`、`export * from "moveable"`）、外部模块（`@daybrush/utils`、`framework-utils`、`lit`、`lit/decorators.js`、`moveable`）、头部注释相同；体积 4148 → 2733 |
| `moveable.cjs.js` | 外部模块、头部注释相同；键集合相同（6 个）；`LitMoveable` 由数据属性变为只读 getter，另外 5 个在基线中已是 getter（design 决策 5 的已知差异）；体积 4464 → 4315 |
| `moveable.umd.js` | 全局变量名 `UMD`、AMD 依赖（`["exports"]`）相同；内联的包：moveable、croact-moveable 产物，croact、croact-css-styled、css-styled、lit-element、lit-html、@lit/reactive-element 及 moveable 的运行时依赖，与基线推导清单一致（推导清单中的 `lit` 只有转导出、`@types/trusted-types` 只有类型，都不产生代码，所以不出现在 sourcemap 中）；体积 848258 → 619370 |

- 浏览器实测（Playwright chromium 打开临时页面，引入 `moveable.umd.js`）：全局 `UMD` 有 6 个导出；`<lit-moveable>` 已注册，设置 `target`、`litDraggable` 后渲染出控制框，内部实例的 `draggable` 为 `true`；设置 `zoom = 2` 后元素重新渲染，内部 Moveable 的 `zoom` 变为 2；元素上没有名为 `zoom` 的自有字段；`@withMethods` 代理的 `getRect()` 可用。
- moveable 的 UMD 改为浏览器平台后，重跑 5.2 的浏览器测试，结果不变。

## 6. 清理（tasks 6.1）

- 删除 6 个包的 `rollup.config.js`，preact 的 `rollup.config.demo.js`、`demo/`、`src/demo/`，lit 的 `rollup.demo.config.js`、`demo/`；删除 croact、preact、lit 的 `start` 脚本和 croact 调用 pvu 的 `packages:update`、`packages:dist`；helper、moveable 的 `start` 改为 `tsdown --watch`。
- 删除依赖 `@daybrush/builder`、`rollup`、`rollup-plugin-react-compat`、`rollup-plugin-preact`、`rollup-plugin-css-bundle`、`print-sizes`、`pvu`；react-moveable、moveable、helper 的 `tslib` 也一并删除（它只服务于旧构建的 rollup-plugin-typescript2 和 moveable 的 `importHelpers`，源码中没有引用）。
- react-moveable、moveable、helper 的 `.npmignore` 删除 visualizer 产物的条目（`dist/report.html`、`rollup-plugin-visualizer/`）；删除本地的 `statistics/`（visualizer 输出，git 已忽略）。
- 锁文件中不再有 `@daybrush/builder`、`rollup-plugin-typescript2`、`rollup-plugin-react-compat`、`rollup-plugin-preact`、`rollup-plugin-css-bundle`、`print-sizes`、`pvu`。`rollup` 本身仍有两个版本，来自 vue3、svelte 使用的 Vite 4（第 4 步处理）。

## 7. 全量验证

### 全量构建（tasks 7.1）

删除 6 个包的 `dist/`、`declaration/` 后执行 `pnpm packages:build`：8 个包按拓扑顺序全部成功（helper → react-moveable → croact、preact → moveable → lit、vue3、svelte）。vue3-moveable 的 `vue-tsc`（TS 4.8）读取 moveable 由 TS 6 生成的 `declaration/` 没有报错。

构建日志中的警告只有两类，都在迁移前的基线日志中原样存在，不来自 tsdown：
- react-moveable、helper 的 lint：eslint-plugin-react 的「React version not specified」（由 `migrate-eslint-flat-config` 处理）；
- vue3-moveable 的 Vite 4 构建：入口同时使用具名和默认导出（第 4 步处理）。

6 个 tsdown 包的构建没有任何警告，没有「未解析的模块」或「依赖被当作外部模块」之类的提示，也没有打印 design 风险条目中预想的「建议改用 ESM」之类的固定提示。

### 与基线的逐项对比（tasks 7.2）

| 包 | 项 | 与基线的差异 |
|---|---|---|
| react-moveable | dist 文件 | 新增 无；缺少 无 |
| react-moveable | declaration 文件 | 新增 无；缺少 无；内容变化 index.umd.d.ts、ables/Resizable.d.ts、ables/Scalable.d.ts、ables/consts.d.ts、ables/edgeDraggable.d.ts |
| react-moveable | `moveable.esm.js` | 体积 581566 → 438145；map 60 sources |
| react-moveable | `moveable.cjs.js` | 体积 585816 → 448810；map 60 sources |
| croact-moveable | dist 文件 | 新增 moveable.cjs.js.map、moveable.esm.js.map；缺少 无 |
| croact-moveable | declaration 文件 | 新增 无；缺少 无；内容变化 index.umd.d.ts |
| croact-moveable | `moveable.esm.js` | sourceMappingURL: false → true；体积 581716 → 435307；map 2 sources |
| croact-moveable | `moveable.cjs.js` | sourceMappingURL: false → true；体积 585853 → 445984；map 3 sources |
| preact-moveable | dist 文件 | 新增 moveable.cjs.js.map、moveable.esm.js.map；缺少 无 |
| preact-moveable | declaration 文件 | 新增 无；缺少 无；内容变化 types.d.ts |
| preact-moveable | `moveable.esm.js` | externals: ["@daybrush/utils","@egjs/agent","@egjs/children-differ","@egjs/list-differ","@scena/dragscroll","@scena/matrix","css-to-mat","framework-utils","gesto","overlap-area","preact-css-styled","preact/compat"] → ["@daybrush/utils","@egjs/agent","@egjs/children-differ","@egjs/list-differ","@scena/dragscroll","@scena/event-emitter","@scena/matrix","css-to-mat","framework-utils","gesto","overlap-area","preact-css-styled","preact/compat"]；sourceMappingURL: false → true；体积 586851 → 434227；map 2 sources |
| preact-moveable | `moveable.cjs.js` | externals: ["@daybrush/utils","@egjs/agent","@egjs/children-differ","@egjs/list-differ","@scena/dragscroll","@scena/matrix","css-to-mat","framework-utils","gesto","overlap-area","preact-css-styled","preact/compat"] → ["@daybrush/utils","@egjs/agent","@egjs/children-differ","@egjs/list-differ","@scena/dragscroll","@scena/event-emitter","@scena/matrix","css-to-mat","framework-utils","gesto","overlap-area","preact-css-styled","preact/compat"]；require 形状: 错误 Cannot find module '@egjs/agent' → {"type":"function","keys":["defaultAbles"],"defaultIsSelf":false,"esModule":false}；sourceMappingURL: false → true；体积 589805 → 444066；map 2 sources |
| moveable | dist 文件 | 新增 无；缺少 无 |
| moveable | declaration 文件 | 新增 无；缺少 index.cjs.d.ts；内容变化 types.d.ts |
| moveable | `moveable.esm.js` | 体积 7345 → 4485；map 6 sources |
| moveable | `moveable.cjs.js` | 体积 8275 → 6349；map 7 sources |
| moveable | `moveable.js` | defineDeps: null → []；体积 787498 → 600562；map 22 sources |
| moveable | `moveable.min.js` | defineDeps: null → []；体积 245567 → 229102；map 22 sources |
| lit-moveable | dist 文件 | 新增 无；缺少 无 |
| lit-moveable | declaration 文件 | 新增 无；缺少 无；内容变化 无 |
| lit-moveable | `moveable.esm.js` | 体积 4148 → 2733；map 1 sources |
| lit-moveable | `moveable.cjs.js` | 属性描述符: {"getter-only":5,"data-writable":1} → {"getter-only":6}；体积 4464 → 4315；map 1 sources |
| lit-moveable | `moveable.umd.js` | 体积 848258 → 619370；map 25 sources |
| helper | dist 文件 | 新增 无；缺少 无 |
| helper | declaration 文件 | 新增 无；缺少 index.cjs.d.ts；内容变化 无 |
| helper | `helper.esm.js` | 体积 25551 → 13550；map 2 sources |
| helper | `helper.cjs.js` | 属性描述符: {"data-writable":5} → {"getter-only":5}；体积 25977 → 14446；map 4 sources |
| helper | `helper.js` | defineDeps: null → []；体积 31447 → 17563；map 5 sources |
| helper | `helper.min.js` | defineDeps: null → []；体积 9448 → 7774；map 5 sources |

上表只列出与基线不同的项和体积；没有列出的导出名、外部模块、头部注释、CJS 形状、UMD 全局变量都与基线相同。UMD 内联的包在第 3、5 节逐个核对过，与基线推导清单一致。每一处差异的原因：

| 差异 | 涉及 | 原因 |
|---|---|---|
| 体积变小 | 全部 | 语法目标 ES5 → ES2022，不再内联 tslib 的 helper；Rolldown 的 tree-shaking |
| 新增 `.map`，产物带 `sourceMappingURL` | croact、preact | 统一生成 sourcemap（design 决策 8） |
| 外部模块多出 `@scena/event-emitter` | preact | 基线中被意外内联，改为声明为依赖并保持 external（design 决策 3） |
| CJS 可以在严格布局下加载 | preact | 补上了运行时依赖的声明（design 决策 3），并用 `packageExtensions` 修正 `preact-css-styled` 的 peer 声明 |
| 属性从可写数据属性变为只读 getter | helper CJS、lit CJS（`LitMoveable`）；helper、lit 的 UMD 全局对象同理 | Rolldown 的模块命名空间对象（design 决策 5 的已知差异） |
| AMD 分支 `define(factory)` → `define([], factory)` | moveable、helper 的 UMD | 两种写法等价，Rolldown 的 UMD 包装 |
| 少了 `index.cjs.d.ts` | moveable、helper | CJS/UMD 入口合并（design 决策 5） |
| `index.umd.d.ts` 少了 `export *` | react-moveable、croact | 入口改写（design 决策 5） |
| `import("../types")` → `import("..")`、`export declare type` → `export type` | react-moveable、preact、moveable 的声明 | TS 6 的输出差异，类型等价 |

结论：没有无法解释的差异。

### spec 场景检查（tasks 7.3）

用 scratchpad 中的检查脚本（acorn 8，`ecmaVersion: 2022`）逐条检查 `specs/library-build`：
- 「产物文件清单」「入口字段有效」：6 个包的 `dist/` 恰好是 spec 表中的文件加上各自的 `.map`；`main`、`module`、`types` 指向的文件都存在。通过。
- 「按 ES2022 解析」：17 个产物（ESM 按 module，CJS/UMD 按 script）全部解析成功。通过。
- 「sourcemap 有效」：每个产物末尾的 `sourceMappingURL` 指向同名 `.map`，`sources`、`mappings` 都不为空；`moveable.min.js.map`、`helper.min.js.map` 的 `sources` 包含本包 `src/` 下的文件。通过。
- 「版本号随 package.json 变化」：把 helper 的 `version` 临时改为 `9.9.9-bannercheck` 后重新构建，4 个产物的头部注释都变为新版本号；改回后重新构建。通过。
- 「不含 ES5 继承辅助函数」：react-moveable 的 ESM/CJS、moveable 的 ESM/CJS 中没有 `__extends`、`extendStatics`，组件为原生 `class ... extends`（react-moveable ESM 中 6 处，moveable ESM 中 3 处）。**但 moveable 的 UMD（`moveable.js`、`moveable.min.js`）中有**：sourcemap 显示它们全部来自被内联的第三方包的发布产物（croact、@egjs/children-differ、@scena/dragscroll、gesto、react-css-styled 都以 ES5 发布），本仓库代码中没有。spec 场景已收窄为「ESM/CJS 产物和 UMD 中来自本仓库源码的部分」，UMD 中内联的第三方依赖保持其发布时的语法。按收窄后的场景通过。

## 6.2 CI

- `5c9b1508`（本 change 的实现）推送后 CI 通过（run 38234377560）：「Build packages」按拓扑顺序构建全部 8 个包，之后的 stories 类型检查和测试都通过。
- 故意让 helper 的构建失败（`src/index.ts` 末尾加 `export * from "./ci-missing-module"`，本地确认 lint 通过、失败发生在 tsdown，run 38234694047）：「Build packages」失败，日志中有 `packages/helper build: [UNRESOLVED_IMPORT] Could not resolve './ci-missing-module' in src/index.ts` 和 `ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL @moveable/helper@0.1.3 build`，后续步骤没有执行。
- 临时提交已 revert（`9ad27260`），代码与 `5c9b1508` 一致。

## 7.4 全新克隆

从 `5c9b1508` 克隆到 scratchpad，依次执行 `pnpm install --frozen-lockfile`（锁文件无需更新）、`pnpm packages:build`（8 个包全部成功）、安装 chromium、`typecheck:stories`、`pnpm test`（22 个测试文件通过、1 个跳过，144 个测试通过），全部成功；`openspec validate replace-build-with-tsdown --strict` 通过。
