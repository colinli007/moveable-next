## Context

动机见 proposal.md 的 Why。下面只列影响方案的现状事实（基于 2026-10-11 用当前工具链构建的 `dist/`）：

- **`@daybrush/builder` 的隐式行为**：每个产物都加 banner（版权、包名、license、author、repository、version）；把 `#__VERSION__#` 替换为版本号（src 中没有任何地方使用）；把 `/** @class */` 替换为 `/*#__PURE__*/`；可选 `minifyPrototype`（只有 moveable 开启）；输出参数 `freeze: false`、`esModule: false`、`interop: "default"`。`external` 只取配置中列出的键，react-moveable、helper、lit 没有列出，它们的 ESM/CJS 产物靠「解析不到就当外部依赖」实现 external，并产生 `UNRESOLVED_IMPORT` 警告。
- **各包产物**：

  | 包 | 产物 | 入口 | external / 内联 |
  |---|---|---|---|
  | react-moveable | `moveable.esm.js`、`moveable.cjs.js` | `index.ts`、`index.umd.ts` | 全部 external |
  | croact-moveable | `moveable.esm.js`、`moveable.cjs.js` | `index.ts`、`index.umd.ts` | 内联 react-moveable 的 ESM 产物，react → croact，react-css-styled → croact-css-styled |
  | preact-moveable | `moveable.esm.js`、`moveable.cjs.js` | `preact-moveable/Moveable.ts` | 内联 react-moveable 的 ESM 产物，react → preact/compat，react-css-styled → preact-css-styled |
  | moveable | `moveable.esm.js`、`moveable.cjs.js` | `index.ts`、`index.cjs.ts` | react-moveable → croact-moveable 并作为 external，react → croact |
  | moveable | `moveable.js`、`moveable.min.js`（UMD，全局 `Moveable`） | `index.umd.ts` | 全部内联（croact、react-moveable 的 ESM 产物和所有运行时依赖） |
  | lit-moveable | `moveable.esm.js`、`moveable.cjs.js`、`moveable.umd.js`（全局 `UMD`） | `index.ts` | ESM/CJS external；UMD 全部内联（含 lit） |
  | helper | `helper.esm.js`、`helper.cjs.js`、`helper.js`、`helper.min.js`（UMD，全局 `MoveableHelper`） | `index.ts`、`index.cjs.ts`、`index.umd.ts` | ESM/CJS external；UMD 内联 |

  croact、preact、moveable UMD 内联的是 react-moveable **已构建的 ESM 产物**，不是它的源码（`rollup-plugin-react-compat` 用 node-resolve 解析到 `module` 字段；基线 `moveable.js.map` 的第一个 source 就是 `../../react-moveable/dist/moveable.esm.js`）。所以这些产物的语法和装饰器转译结果取决于 react-moveable 自己的构建，依赖拓扑顺序保证它先构建。
- **为什么需要 `resolveOwnCroactPlugin`**：严格布局下，`packages/react-moveable/node_modules` 里没有 croact 和 preact。把被内联的 react-moveable 产物里的 `react` 换成 croact 时，必须从 moveable 包的位置解析 croact，而不是从 react-moveable 的位置。
- **入口文件**：react-moveable 和 croact-moveable 的 `index.umd.ts`、moveable 和 helper 的 `index.cjs.ts` 都在 ESM 源码中写 `module.exports = ...`，前两者还有 `export * from ...`。moveable 和 helper 的 `index.umd.ts` 只有 `export default`，靠输出参数 `exports: "default"` 得到同样的形状。
- **moveable 源码的 import**：`react`（2 处）、`croact`、`react-moveable`（2 处）、`react-moveable/types`（只导入类型）、`framework-utils`、`@daybrush/utils`、`@scena/event-emitter`。`react` 不在 moveable 的依赖声明中。
- **产物里 import 了但 `package.json` 没有声明的包**（按 ESM 产物统计）：
  - react-moveable：`react`（只在 devDependencies 中）
  - preact-moveable：`preact/compat`，以及从 react-moveable 产物带进来的 `@egjs/agent`、`@daybrush/utils`、`@scena/matrix`、`css-to-mat`、`@egjs/children-differ`、`@scena/dragscroll`、`overlap-area`、`gesto`、`@egjs/list-differ`
  - lit-moveable：`lit`、`lit/decorators.js`（只在 devDependencies 中）

  实测：在严格布局下从 preact-moveable 目录 `require` 它的 CJS 产物，会直接报 `Cannot find module '@egjs/agent'`。反过来，croact-moveable 声明了 `react-css-styled`，但产物里引用的是 `croact-css-styled`，这条声明是多余的。
- **CJS 形状（实测基线）**：react-moveable、croact-moveable、moveable 的 `require()` 结果是 Moveable 函数，具名导出是它的属性，`default` 指向它自己；lit-moveable、helper 的结果是只含具名导出的普通对象，没有 `default`。helper 的属性都是普通可写数据属性；lit-moveable 中从 `moveable` 转导出的 5 个属性已经是只读 getter（rollup 的 `export *` 实现），只有 `LitMoveable` 是数据属性。
- **类型子路径**：`react-moveable/types` 由 `packages/react-moveable/types/package.json` 指向 `../declaration/externalTypes.d.ts`，preact-moveable 和 moveable 的源码都引用这个子路径。
- **sourcemap**：croact、preact 没有；`moveable.min.js.map` 和 `helper.min.js.map` 都只有约 95 字节，内容是空的。基线 sourcemap 的 `sources` 不列出 node_modules 中的依赖，所以无法用它统计基线 UMD 内联了哪些包。
- **构建时序**：根命令 `pnpm packages:build` 是 `pnpm -r build`，按依赖拓扑执行。vue3-moveable 的 `vite.config.ts` 把 `moveable` 设为 external，svelte-package 不打包依赖，所以它们不处理 moveable 的 JS 产物，只通过类型检查（vue-tsc 1.8 / svelte-check，TS 4.8）读取 moveable 的 `declaration/`。
- **lint 与构建绑定**：react-moveable 和 helper 的 `build` 脚本先执行 `lint`（ESLint 7 + typescript-eslint 5），react-moveable 还执行 `test:type`。CI 目前不执行 `build`，也不执行 `lint`。
- **TS 版本与 tsconfig**：react-moveable、helper 为 ~5.9.3，其余 4 个包为 `^4.8 <4.9`。tsconfig 中 `target: es5`（lit 为 es2015）、`moduleResolution: node`；react-moveable 和 moveable 使用 `baseUrl`；react-moveable 和 helper 使用 `downlevelIteration`；react-moveable、croact、preact、moveable、helper 显式写了 `esModuleInterop: false`；各包 `tsconfig.declaration.json` 都是 `declarationDir: "declaration"` 加上 `include: ["./src/**/*"]`，没有写 `rootDir`。
- **`tsconfig.build.json`**：react-moveable 的只设置 `jsx: react`（它的 `tsconfig.json` 为了 Storybook 是 `jsx: preserve`）；helper 的只设置 `jsx: react`，但 helper 没有 tsx 文件；preact 的设置 `jsx: react` + `jsxFactory: h`，但 preact 包的源码（demo 除外）没有 JSX；lit 的只设置 `target: es2015`。
- **装饰器**：moveable 的 `MoveableManager` 使用 `@Properties` 和 `@withMethods`，lit 的 `LitMoveable` 使用 `@customElement`、`@property`，react-moveable 的 `InitialMoveable` 使用 `@withMethods`，都依赖 `experimentalDecorators`。
- **版本基准（2026-10）**：tsdown 0.23.1（依赖 rolldown ~1.2.13、rolldown-plugin-dts ^0.28.7；engines `^22.18.0 || ^24.11.0 || >=26.0.0`；peer typescript `^5 || ^6 || ^7`），TypeScript 6.0.3（6.x 最后一版；7.0.2 已发布，但 typescript-eslint 8.71 的 peer 为 `>=4.8.4 <6.1.0`）。

## Goals / Non-Goals

**Goals:**
- 每个包的构建配置都是显式的：产出什么、哪些依赖 external、哪些内联、怎么改名，都能在配置中直接看到，不依赖工具的隐式行为或警告。
- 产物对外形状不变：文件名、格式、导出名、CJS 的 `require` 形状、UMD 全局变量名、banner、`declaration/` 目录结构。允许的差异只有语法目标（ES5 → ES2022）带来的变化，修复 sourcemap 和依赖声明带来的变化，以及决策 5 说明的属性描述符差异。
- 源码中不再出现只为配合构建工具存在的写法（`module.exports =`）。

**Non-Goals:**
- 不改 react-moveable 等库的运行时行为。
- 不改包名、`main`/`module`/`types`，不新增 `exports`，不决定 peerDependencies 的版本范围（第 6 步）。
- 不改 lint 配置（`migrate-eslint-flat-config`）。
- 不改 vue3-moveable、svelte-moveable 的构建和 TS 版本（第 4 步）。
- 不改 lit-moveable 的 UMD 全局变量名 `UMD`，虽然这个名字不合理，但它属于对外形状，留到第 6 步。

## Decisions

### 1. 用 tsdown，每个包一份 `tsdown.config.mts`

tsdown 是基于 Rolldown 的库构建工具：配置可以是数组，每项单独指定 `entry`、`format`、`globalName`、`outputOptions`；按 `package.json` 的 dependencies 和 peerDependencies 自动 external；用 `deps.neverBundle` / `deps.alwaysBundle` 显式指定 external 和内联（`external` / `noExternal` 在 0.23 已弃用）；内置 `alias`、`minify`、`target`、`banner`。用户的 `inputOptions`、`outputOptions` 与默认值深合并，并且优先。

- 备选方案：Vite 库模式。`build.lib` 一份配置只能有一组入口，同一个包的 ESM/CJS/UMD 使用不同入口时要拆成多次构建；external 要手写；banner 要写到 `rolldownOptions.output`。生成的代码和 tsdown 相同（都是 Rolldown 1.2），差别只在配置繁简，所以选 tsdown。
- 备选方案：直接用 Rolldown。每个包都要自己写 external 推导、多格式循环，等于自己重写一个 tsdown。

每个包的配置放在包内，由包自己声明 `tsdown` 依赖，满足「依赖显式声明」。配置文件用 `.mts` 扩展名：包的 `package.json` 没有 `"type": "module"`，用 `.ts` 时 Node 会打印 `MODULE_TYPELESS_PACKAGE_JSON` 警告（与 Vitest 配置用 `.mts` 的原因相同）。6 个包共用的选项放到根目录 `config/build.mjs`：banner 的生成逻辑（读取 `package.json` 和 `LICENSE`），以及 `target: "es2022"`、`sourcemap: true`、`dts: false`（`sharedOptions(包目录)`）。语法目标是整个仓库统一的决定，只在一处声明。这个文件只使用 `node:fs`，不引入第三方依赖，所以根目录不需要声明 tsdown。

tsdown 的默认值和本仓库的产物形状不一致，每份配置都要显式覆盖：

| tsdown 默认 | 覆盖方式 | 原因 |
|---|---|---|
| `platform: "node"` 时 `fixedExtension` 为 true，输出 `.mjs`/`.cjs`；UMD 自动加 `.umd` 后缀，文件名取自入口文件名 | `outputOptions.entryFileNames` 写死目标文件名（如 `moveable.esm.js`） | 文件名属于对外形状 |
| `package.json` 有 `types` 字段时默认开启 `dts` | `dts: false` | d.ts 由 tsc 生成（决策 6） |
| node 平台（ESM 默认，CJS 强制）的 `mainFields` 为 `["main", "module"]`，会把 react-moveable 解析成它的 CJS 产物 | croact、preact 的 ESM/CJS 配置写 `inputOptions.resolve.mainFields: ["module", "main"]` | 被内联的应该是 ESM 产物，与基线一致 |
| `platform: "node"`，按 `exports` 的 `node` 条件解析 | UMD 配置写 `platform: "browser"` | UMD 运行在浏览器中。lit 系列包在 `node` 条件下提供 SSR 版本（带 `@lit-labs/ssr-dom-shim`），按 node 解析时 lit 的 UMD 会打进 SSR 版本（迁移 lit 时实测）。浏览器平台默认 `module` 优先，内联的包都没有 `browser` 字段或 `exports`，所以 UMD 不需要再写 `mainFields` |
| `clean: true` | 保留 | 多份配置共用一个输出目录时只清空一次（已核实） |
| `report: true`，构建后打印体积表 | 保留 | 替代 print-sizes |

### 2. 语法目标 ES2022，`useDefineForClassFields: false`

- `target: "es2022"`，与 Vite 默认的 `baseline-widely-available` 大致相当。tsconfig 的 `lib` 同步改为 `ES2022` + `DOM`（+ `DOM.Iterable`），让源码能用的 API 与目标一致。
- ES2022 下 TS 默认 `useDefineForClassFields: true`，实例字段会遮住 `@Properties`、`@withMethods`、Lit `@property` 定义在 prototype 上的访问器，所以所有包的 tsconfig 显式设置 `useDefineForClassFields: false`。已核实：Rolldown 读取这个设置（包括通过 `extends` 继承的），实例字段编译为构造函数中的赋值；静态字段编译为 `static { ... }` 块，这是合法的 ES2022 语法。
- 不再内联 tslib 的 helper，`/** @class */` 替换、`minifyPrototype` 都随 ES5 一起删除。moveable tsconfig 中的 `importHelpers` 一并删除。
- 备选方案：ES2020 或更低，可以绕开类字段语义问题。弃用原因：用户已确认按当前主流选择，而且 `useDefineForClassFields: false` 一行配置就能解决这个问题。

### 3. external 以 `package.json` 为准，产物 import 的包必须声明

tsdown 只把已声明的依赖当作 external，没声明的会被内联。如果按现状直接迁移，react-moveable 会内联 React，preact-moveable 会内联 gesto 等库，lit-moveable 会内联 lit，产物就变了。

原则：**产物运行时 import 什么，`package.json` 就声明什么**。

- preact-moveable：把产物 import 的 9 个运行时库加入 `dependencies`，版本与 react-moveable 一致。这是修正现有的元数据缺陷：发布后的 preact-moveable 目前靠 npm 的提升才能找到这些包。另外 `@scena/event-emitter` 在基线中被意外内联（旧的 preact rollup 配置的 external 清单漏了它，插件自带的 node-resolve 把它打了进去；croact 和 react-moveable 都把它作为 external），迁移时 `deps.onlyBundle: []` 拦下了它。按「运行时依赖保持 external」的原则同样声明为依赖，preact 产物的外部模块因此比基线多一个 `@scena/event-emitter`。
- croact-moveable：删除多余的 `react-css-styled` 依赖，它的产物引用的是 `croact-css-styled`。
- 框架运行时：react-moveable 的 `react`、`react-dom`，moveable 源码中的 `react`，preact-moveable 的 `preact`，lit-moveable 的 `lit`。它们应该是 peerDependencies 或者被改名（决策 4），但 peer 的版本范围属于第 6 步（React peer 范围）和第 4 步（Lit 3）的决定。本 change 在配置中用 `deps.neverBundle` 显式列出，并注明由哪一步改为 peerDependencies。
- croact-moveable、preact-moveable：`deps.alwaysBundle: ["react-moveable"]`，内联 react-moveable 的 ESM 产物。
- UMD 产物：`deps.alwaysBundle` 匹配所有模块，全部内联。
- moveable：`src/types.ts` 中有 `export * from "react-moveable/types"`，这个子路径只有类型，运行时入口 `react-moveable/types/index.js` 是空文件。旧工具用完整的 TS 程序编译，能知道它只有类型而删掉这个转导出；Rolldown 逐文件转译，没有类型信息，只能保留它，产物会多出对 `react-moveable/types` 的 import。所以 ESM/CJS 配置用 `deps.alwaysBundle: ["react-moveable/types"]` 把这个空入口打包进来，转导出随之消失。不改成 `export type * from`，因为这是 TS 5.0 语法，会进入 `declaration/`，而 vue3、svelte 仍用 TS 4.8 读取它。
- ESM/CJS 配置再加 `deps.onlyBundle: []`，不允许内联任何 node_modules 包。tsdown 会在不在清单内的 node_modules 包被内联时报错，把「依赖被悄悄打进产物」变成构建失败。react-moveable 是 workspace 符号链接，真实路径不在 `node_modules` 中，tsdown 不把它计入内联清单（迁移 croact 时实测），所以 croact、preact 的 `onlyBundle` 同样是 `[]`。

### 4. 改名用 `output.paths`，内联替换用绝对路径 alias

「把 react 换成 croact」在两类产物中是两件不同的事，要用两种不同的手段：

- **ESM/CJS 产物**：依赖保持 external，要做的只是改写输出中的模块名。用 `deps.neverBundle` 让这些模块保持 external，再用 Rolldown 的 `outputOptions.paths` 改名：
  - croact-moveable：`react`、`react-dom` → `croact`；`react-css-styled` → `croact-css-styled`。
  - preact-moveable：`react`、`react-dom` → `preact/compat`；`react-css-styled` → `preact-css-styled`。
  - moveable：`react` → `croact`；`react-moveable` → `croact-moveable`。
- **UMD 产物**：要把 croact 的代码真正打进来，用 `alias`，目标写成从本包目录解析出的**绝对路径**（如 `path.join(包目录, "node_modules/croact")`）：
  - moveable UMD：`react`、`react-dom` → 本包的 croact。
  - lit UMD 不涉及 React。

这样就替代了 `rollup-plugin-react-compat`、`rollup-plugin-preact` 和 `resolveOwnCroactPlugin`。

不用 alias 处理 ESM/CJS 的原因（已实测）：
- 已在 `package.json` 声明的依赖会被 tsdown 的依赖插件直接标为 external，alias 根本不生效。例如 moveable 产物仍然 import `react-moveable`。
- 没声明的依赖会经过 alias 解析成具体文件，然后被内联。例如 croact 的代码被打进了 croact-moveable。

alias 目标用包名而不是绝对路径不行：alias 目标是从 import 发起方的位置解析的，被内联的 react-moveable 产物位于 `packages/react-moveable/dist/`，从那里找不到 croact，实测报 `Could not resolve 'react'`。

JSX 必须保持经典转换（`jsx: react`，输出 `React.createElement`）：改名只针对 `react` 这个模块，而自动 JSX 运行时会引入 `react/jsx-runtime`，croact 1.0.4 没有这个入口。需要编译 JSX 的只有 react-moveable 和 moveable 自己的源码：react-moveable 的配置指向 `tsconfig.build.json`（`jsx: react`），moveable 的 `tsconfig.json` 本身就是 `jsx: react`。已核实：Rolldown 读取指定的 tsconfig，输出 `React.createElement`，没有 `react/jsx-runtime`。

### 5. CJS 和 UMD 共用入口，形状由 `exports: "default"` 决定

react-moveable、croact-moveable、moveable、helper 的 CJS/UMD 入口统一改成 moveable 现有 `index.umd.ts` 的写法，**只有一个 `export default`，没有 `export *`**：

```ts
import Moveable, * as modules from "./index";

for (const name in modules) {
    (Moveable as any)[name] = (modules as any)[name];
}

export default Moveable;
```

构建输出 `exports: "default"`，于是 `require("react-moveable")` 得到的就是 Moveable，具名导出挂在它上面，与现状一致。入口中如果留着 `export *`，Rolldown 会报 `INVALID_EXPORT_OPTION`（已实测）。每个包的 `index.cjs.ts` 删除，CJS 和 UMD 都从 `index.umd.ts` 构建。helper 的 default 是模块对象本身，写法相同。

tsdown 默认 `cjsDefault: true`，入口只有 default 时已经会输出 `module.exports = default`；配置中仍显式写 `exports: "default"`，表明这是有意为之的形状。

已知差异：Rolldown 输出的模块命名空间对象，成员是只读的 getter（`enumerable: true`、`configurable: false`、没有 setter），基线是普通可写属性。受影响的是 helper 的 CJS 和 UMD（`require()` 结果和全局 `MoveableHelper`），以及 lit-moveable 的 CJS 和 UMD（`require()` 结果和全局 `UMD`）。读取不受影响，只有给这些对象的属性赋值会失败。这属于可接受差异，在对比结果中记录。

- 备选方案：继续在源码中写 `module.exports =`。弃用原因：ESM 和 CJS 混写，依赖打包器对混合模块的处理方式，正是要清理的写法。
- 备选方案：CJS 改为普通的具名导出（`exports.default`）。弃用原因：改变了 `require()` 的形状，属于第 6 步的决定。

### 6. d.ts 继续用 tsc

每个包保留 `tsconfig.declaration.json` 和 `declaration` 脚本，使用 TS 6 的 tsc `--emitDeclarationOnly`，输出目录和结构不变。每份 tsdown 配置都写 `dts: false`。

- 备选方案：tsdown 的 `dts`（rolldown-plugin-dts）。它会把类型打包成单文件，preact 用到的 `react-moveable/types` 这类深路径会失效。等第 6 步确定 `exports` 后再改，到时整个构建只剩一个工具。

### 7. TypeScript 6 的 tsconfig 调整

6 个包统一声明 `typescript: ~6.0.3`。tsconfig：
- `target` 改为 `es2022`，`lib` 改为与之对应；
- `moduleResolution` 改为 `bundler`，`module` 改为 `esnext`；
- 删除 `baseUrl`，`paths` 改为相对 tsconfig 所在目录的写法；
- 删除 `downlevelIteration`，因为 ES2022 不需要它；
- 加上 `useDefineForClassFields: false`；
- 删除 `esModuleInterop: false`（以及 `allowSyntheticDefaultImports: false`，如果有的话），TS 6 不再允许设为 `false`；
- `tsconfig.declaration.json` 显式写 `rootDir`（preact 为 `./src/preact-moveable`，其余为 `./src`）。TS 6 把 `rootDir` 的默认值改为 tsconfig 所在目录，不写的话声明文件会输出到 `declaration/src/...`，`types` 字段和 `react-moveable/types` 子路径都会失效；
- TS 6 的 `types` 默认为 `[]`，需要全局类型的（如 `global.d.ts` 引用的 `@types/node`）显式列出；
- 其余因 TS 6 默认值变化而报错的选项，以实际编译结果为准逐项修改，不使用 `ignoreDeprecations`；
- `tsconfig.build.json` 只保留 react-moveable 的（`jsx: react`），helper、preact、lit 的只剩冗余设置，删除。

croffle 仍使用它自己的 TS 4.5，不受影响。

moveable 的 `src/utils.ts` 用普通 `import` 引入 `react-moveable/types` 中的纯类型，Oxc 会把它消除（已实测）。以后如果开启 `verbatimModuleSyntax`，要改成 `import type`。

### 8. sourcemap

ESM、CJS、UMD、min 全部生成 sourcemap，min 文件的 map 必须有实际内容。这一项会改变 croact、preact 的产物文件列表（新增 `.map`），属于预期差异。已核实：banner 在压缩之后才拼接，`moveable.min.js` 以 banner 开头，它的 map 有 22 个 sources（包含 `moveable/src/`），mappings 不为空。

### 9. 已验证与待验证的技术点

方案评审时，评审方用仓库中已安装的 Rolldown 1.2.13 对真实源码做了构建实验，并对照 tsdown 0.23.1 的源码，确认了以下几点：

1. 旧式装饰器编译为 `__decorate(...)`，辅助函数从 Rolldown 内置的 `@oxc-project/runtime` 内联，产物中没有对 `@oxc-project/runtime` 或 `tslib` 的外部 import。
2. `useDefineForClassFields: false` 生效（决策 2）。
3. 入口按决策 5 的写法时，`exports: "default"` 在 CJS 下得到与基线相同的形状：`function Moveable`，`default === self`，22 个键，没有 `__esModule`。
4. UMD 包装和全局变量名与基线一致：moveable 为 `global.Moveable = factory()`，lit 为 `factory(global.UMD = {})`。
5. `outputOptions.paths` 能改写 external 的模块名；绝对路径 alias 能正确解析并内联 croact。
6. 按依赖自动 external 时，子路径（如 `lit/decorators.js`）按前缀匹配。
7. 压缩后的 banner 和 sourcemap 有效（决策 8）。

迁移时仍要在 tsdown 实际运行中确认：

- 第 1 至第 7 点在 tsdown（而不是直接用 Rolldown）下的结果相同。
- `deps.onlyBundle` 对 workspace 符号链接包（react-moveable）的处理方式（决策 3）。
- moveable 的 `@Properties` 和 lit 的 `@property` 在浏览器中实际可用（spec「装饰器定义的属性在产物中可用」）。

迁移顺序按依赖拓扑：helper → react-moveable → croact-moveable → preact-moveable → moveable → lit-moveable。如果装饰器的结论在 tsdown 下不成立，退路是对这些包关闭 Oxc 的装饰器转译，改由 TypeScript 先转译。这会改变方案，需要回到这里重新决定。

### 10. 基线对比：临时脚本，结果写入 `baseline.md`

动手之前，把当前 6 个包的 `dist/`、`declaration/` 复制到 scratchpad 作为基线。迁移完成后，用一个临时脚本对比：

- 文件列表（预期差异：新增的 `.map`）；
- 每个 ESM 入口的导出名集合；
- `require()` CJS 入口后的形状：类型、键集合、`default === 自身`、每个属性的描述符（预期差异见决策 5）；
- 每个产物的外部 import 或 require 清单；
- UMD 内联了哪些包，以及全局变量名。基线 sourcemap 不列出依赖，所以基线的内联清单由各包 ESM 产物的外部 import 推导：moveable UMD 应内联 moveable ESM/CJS 产物引用的全部外部包，以及 croact-moveable 产物引用的全部外部包（其中 `croact-moveable` 自身对应 react-moveable 产物）。新产物的内联清单从 sourcemap 的 `sources` 读取。两者按包名比较；
- banner 内容；
- 体积（只记录，预期会变小）；
- `declaration/` 的文件列表和内容（只允许 TS 版本带来的差异）。

脚本和需要的临时依赖（如解析器）都放在 scratchpad，不提交到仓库。基线和迁移后的逐项对比结果写入本 change 目录的 `baseline.md`（与上一个 change 的做法一致，随 change 归档），结论摘要写入本文件的 Migration Plan 一节。

### 11. CI 增加全量构建

`.github/workflows/run-e2e.yml` 在测试之前执行 `pnpm packages:build`，任何包构建失败都会让流水线失败。这一步覆盖 6 个 tsdown 包，以及读取 moveable 类型声明的 vue3、svelte 包。

## Risks / Trade-offs

- [ES5 → ES2022 影响下游用户] → proposal 中标注为 BREAKING；第 6 步以新包名发布，不会影响上游包的现有用户。
- [typescript-eslint 5 在 TS 6 下无法解析，导致 react-moveable 和 helper 的 `build` 失败] → typescript-eslint 5 只会对不支持的 TS 版本打印警告，源码中也没有新语法，预期可以运行。如果实际失败，不在 ESLint 7 上打补丁，而是先完成 `migrate-eslint-flat-config`，再继续本 change。
- [tsdown 仍是 0.x，配置项可能变化] → 锁定精确的次版本（`~0.23.1`）；配置只使用 entry、format、globalName、deps、alias、target、minify、banner、dts、outputOptions、inputOptions 这些基础选项。
- [vue3-moveable、svelte-moveable 用 TS 4.8 的类型检查工具（vue-tsc 1.8、svelte-check）读取 moveable 由 TS 6 生成的 `declaration/`，可能遇到 TS 4.8 不认识的声明语法] → 全量构建（包括 vue3 的 `vue-tsc`）要通过，作为本 change 的验收条件；如果失败，先查看具体语法，再决定是调整 moveable 的声明输出，还是把这两个包的 TS 升级提前到本 change。
- [第三方包 `preact-css-styled@1.1.9`（最新版）import 了 `preact/compat`，但没有把 preact 声明为依赖或 peer，严格布局下无法加载] → 在 `pnpm-workspace.yaml` 中用 `packageExtensions` 补上 `peerDependencies: { preact: "*" }`，记入 ROADMAP「已知遗留」，上游修复后删除。
- [tsdown 对每个 CJS 构建打印「建议改用 ESM」之类的固定提示] → 这类提示不属于「未解析模块」警告，在 tasks 7.1 中列为预期输出。

## Migration Plan

1. 保存基线快照（决策 10）。
2. 6 个包的 TS 升到 6.0.3，调整 tsconfig；确认 `declaration` 和 react-moveable 的 `test:type` 通过，Storybook 测试通过。
3. 按 helper → react-moveable → croact-moveable → preact-moveable → moveable → lit-moveable 的顺序迁移到 tsdown，同时完成决策 9 中待验证的几点，按决策 3 补全依赖声明。在第 2 步和第 3 步之间，旧的 rollup 构建不要求可用。
4. 删除旧的 rollup 配置、demo 配置、旧依赖和合并掉的入口文件；更新 `CLAUDE.md`。
5. 全量构建、结构对比，把结果写入本节；CI 增加构建步骤。
6. 更新 `openspec/ROADMAP.md`。

回滚：产物不提交、不发布，回滚就是 revert 本 change 的提交。

**对比结论（详见 `baseline.md` 第 7 节）**：6 个包的导出名、CJS `require()` 形状、UMD 全局变量名和内联的包、头部注释都与基线一致。差异只有以下几类，都有对应的决策：语法目标带来的体积变化；croact、preact 新增 sourcemap；preact 的外部模块多出 `@scena/event-emitter`（基线中是意外内联），CJS 产物现在可以加载；helper、lit 导出对象的属性变为只读 getter；UMD 的 AMD 分支写法变化（等价）；入口合并导致的声明文件变化，以及 TS 6 的声明输出格式差异。实施中发现并按根因处理的问题：TS 6 的 `types`、`rootDir` 默认值变化；源码中无效的 `#__PURE__` 注释；纯类型子路径 `react-moveable/types` 的转导出；UMD 需要 `platform: "browser"`；第三方 `preact-css-styled` 缺少 preact 的 peer 声明。
