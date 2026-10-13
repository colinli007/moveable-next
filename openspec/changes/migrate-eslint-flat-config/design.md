## Context

动机见 proposal.md 的 Why。下面只列影响方案的现状事实（2026-10-12）：

- **现有配置**：react-moveable 和 helper 的 `.eslintrc` 内容完全相同。`extends` 了 `eslint:recommended`、`plugin:@typescript-eslint/eslint-recommended`、`plugin:@typescript-eslint/recommended`、`plugin:react/recommended`，`plugins` 中列了 `import`，但没有启用它的任何规则。`.eslintignore` 是 `node_modules`、`dist`、`*.js`。两个包的 `lint` 脚本都是 `eslint ./src/ --ext .ts,.tsx`，并且都在 `build` 的第一步执行。CI 不单独执行 lint，只通过 `pnpm packages:build` 间接执行。
- **现在实际运行的版本**：ESLint 7.32.0，typescript-eslint 5.60.1（它的 `SUPPORTED_TYPESCRIPT_VERSIONS` 是 `>=3.3.1 <5.1.0`），解析器用的是这两个包自己的 TypeScript 6.0.3。没有设置 React 版本，所以每次构建都打印「React version not specified」。
- **TSLint**：croact、preact 的 `tslint.json` 没有被任何脚本引用，仓库中也没有安装 tslint。
- **根目录的 TypeScript**：根 `package.json` 声明了 `typescript: ^4.8 <4.9`，但根目录的工具都不用它：jsdoc（`@daybrush/jsdoc`）用 `@babel/parser` 解析 TS 源码，`vitest.config.mts` 由 Vitest 自己转译，croffle 用它自己依赖的 TS 4.5。
- **版本基准（2026-10）**：ESLint 10.12.0（engines `^20.19.0 || ^22.13.0 || >=24`），`@eslint/js` 10.0.1，typescript-eslint 8.71.1（peer `eslint ^8.57 || ^9 || ^10`，`typescript >=4.8.4 <6.1.0`），`@stylistic/eslint-plugin` 5.10.0（peer `eslint ^9 || ^10`），eslint-plugin-react 7.37.5（2025-04 发布，peer `eslint ... || ^9.7`，不含 10）。
- **用 ESLint 10 在 scratchpad 中试跑**（规则按决策 4、5 翻译，范围是 6 个库包的 `src`，共 84 个文件）：
  - 只按原规则翻译、什么都不放行：约 160 处，其中 90 处是函数参数的尾逗号，18 处是 `a && a.destroy()` 这类短路调用，5 处是 class 与 interface 的合并声明。
  - 采用本 design 的配置后剩 48 处，都需要改源码：`no-useless-assignment` 38 处，未使用的 import / 参数 3 处，class 字段末尾缺分号 3 处，失效的 `eslint-disable` 注释 2 处，超过 120 列 1 处，多余的分号 1 处（moveable `src/utils.ts` 中函数声明后的 `};`）。
  - eslint-plugin-react 在 ESLint 10 下能正常加载，推荐规则能正常触发（用一个故意写错的组件验证了 `react/jsx-key`、`react/no-direct-mutation-state`）。推荐集以外的部分规则不能用：`jsx-filename-extension`、`forward-ref-uses-ref` 直接调用了 ESLint 10 已删除的 `context.getFilename()`、`context.getSourceCode()`，启用就会报错；推荐集中的规则都经过插件自己的兼容层（`lib/util/eslint.js`）。

## Goals / Non-Goals

**Goals:**
- 一份配置、一条命令、一组依赖：改规则只改一处，编辑器插件和命令行的检查范围一致。
- 规则的检查效果和现在等价：现有配置能发现的问题，新配置都能发现，只有在当前语言环境下已经不成问题的检查例外，逐条在决策 4 中说明；新增的检查都逐条判断过，要么改代码，要么在配置里写明放行的原因。
- lint 是独立的检查，不再藏在构建里。

**Non-Goals:**
- 不改代码风格，不引入 Prettier。
- 不启用需要类型信息的规则（`recommendedTypeChecked` 等）：要为每个包配置 `parserOptions.project`，检查也会明显变慢，以后单独评估。
- 不检查 stories、`.storybook`、构建和测试的配置文件。

## Decisions

### 1. 根目录一份 `eslint.config.mjs`，依赖只在根目录声明

flat config 中的插件是在配置文件里 `import` 的，严格布局下这些 import 从配置文件所在的目录解析。配置放在根目录，eslint 和所有插件就只需要在根 `package.json` 中声明一次；react-moveable、helper 删除各自的 eslint 依赖。

- 备选方案：各包一份配置，内容相同。改规则要改两处（现在就是这样），而且要再给 croact、preact、moveable、lit 各加一份配置和一组依赖。
- 备选方案：共用配置放在 `config/` 下，各包一个很短的入口配置去引用它。共用配置 import 的插件仍然要从根目录解析，依赖还是要在根目录声明；各包同时又要声明 eslint 才能执行 `eslint` 命令，依赖分散在两处。上一个 change 的 `config/build.mjs` 能这样做，是因为它不 import 任何第三方包。

### 2. 检查范围写在配置的 `files` 中，命令不带路径

```js
globalIgnores(["**/*.{js,mjs,cjs}"]),
{ files: ["packages/{react-moveable,helper,croact-moveable,preact-moveable,moveable,lit-moveable}/src/**/*.{ts,tsx}"], ... }
```

根脚本是 `"lint": "eslint --max-warnings 0"`。ESLint 只检查匹配某个配置项 `files` 的文件，vue3、svelte 和 stories 的 TS 文件不匹配，所以不会被检查。ESLint 默认还会检查所有 `.js`、`.mjs`、`.cjs`（包括 `dist/` 中的产物），`globalIgnores` 把这些排除。本 change 不检查任何 JS 文件，以后要检查配置文件时，再从这里放开。实测这样检查的正好是 6 个包 `src` 下的 84 个文件。

- 备选方案：配置对所有 `**/*.{ts,tsx}` 生效，范围写在脚本参数里（`eslint "packages/{...}/src/**"`）。编辑器的 ESLint 插件不读脚本参数，会在 stories、vue3 等文件里报出命令行不会报的错误，两边不一致。

`--max-warnings 0` 让警告也算失败。ESLint 10 默认把失效的 `eslint-disable` 注释报为警告，加上这个参数后这类注释也会让检查失败。

### 3. lint 与构建分开

react-moveable、helper 的 `build` 去掉 `pnpm run lint`，删除这两个包的 `lint` 脚本。CI 在安装依赖之后、构建之前增加 `pnpm lint` 步骤：它不依赖产物，放在前面可以最快给出结果。

理由：构建负责产出产物，lint 负责检查源码，两者失败的原因和修复方式都不同。现在 lint 藏在 `build` 里，结果是只有 react-moveable、helper 被检查，其它包的构建根本不执行 lint。分开之后 lint 有了明确的入口和范围（spec「代码检查」「包的构建不包含代码检查」）。react-moveable 的 `build` 保留 `test:type`：它检查 `tests/types.ts` 对外类型的断言，属于这个包自己的产物正确性。

### 4. 规则等价迁移

推荐规则集换成新版本，现有配置中关闭的规则继续关闭；typescript-eslint 8 中改名或拆分的规则按新名字对应：

| 现有配置 | 新配置 | 说明 |
|---|---|---|
| `eslint:recommended` | `js.configs.recommended`（ESLint 10） | |
| `plugin:@typescript-eslint/eslint-recommended` + `recommended` | `tseslint.configs.recommended`（v8，已包含 eslint-recommended） | |
| `plugin:react/recommended` | `react.configs.flat.recommended` | |
| `no-console: error` | 不变 | |
| `no-unused-vars: off` + `@typescript-eslint/no-unused-vars: error` | 推荐集已是如此，不再写 | |
| `@typescript-eslint/no-inferrable-types`（`ignoreParameters: true`） | 不变，显式写出 | v8 中它从 recommended 移到了 stylistic 规则集 |
| `@typescript-eslint/ban-types: off` | `no-empty-object-type`、`no-unsafe-function-type`、`no-wrapper-object-types`: off | v8 把 `ban-types` 拆成这三条 |
| `@typescript-eslint/no-empty-interface: off`、`no-empty-interface: off` | 由 `no-empty-object-type: off` 覆盖 | v8 中已合并 |
| `@typescript-eslint/no-var-requires: off` | `@typescript-eslint/no-require-imports: off` | v8 中改名 |
| `no-this-alias`、`no-explicit-any`: off | 不变 | |
| `explicit-function-return-type`、`explicit-module-boundary-types`、`no-non-null-assertion`、`no-empty-function`、`adjacent-overload-signatures`: off | 不再写 | v8 的 recommended 不包含这些规则，写 off 是多余的 |
| `arrow-parens: off`、`plugins: ["import"]` | 删除 | 前者不在任何推荐集中，后者没有启用任何规则 |
| `no-extra-semi`、`@typescript-eslint/no-extra-semi`（推荐集） | `@stylistic/no-extra-semi: error` | ESLint 9 移出推荐集，typescript-eslint 8 删除，规则移到 `@stylistic` |
| `no-mixed-spaces-and-tabs`（推荐集） | `@stylistic/no-mixed-spaces-and-tabs: error` | 同上 |
| `no-inner-declarations`（推荐集） | 有意不再启用 | ESLint 9 把它移出推荐集，因为 ES2015 起严格模式下代码块中的函数声明是块级作用域，行为明确。6 个包的源码都是 ES 模块，始终是严格模式，这条规则防不住任何实际问题 |
| `prefer-const`（推荐集，默认 `destructuring: "any"`） | `prefer-const: ["error", { destructuring: "all" }]` | 实施中发现：按决策 6 删掉无用的初始值后，Rotatable 的 `[beforeDelta, beforeDist, beforeRotation] = ...` 这类混合解构赋值中，有 6 个变量只被赋值一次，而同一个解构中的其它变量还会在别处赋值，无法单独改成 const。`all` 只在解构中的变量都能改成 const 时才报。这是轻微放宽（`let { a, b } = x` 之后只重新赋值 `b` 也不再要求拆开），旧代码在原配置下没有这种情况 |

其余推荐集自身带来的差异都属于预期，不需要单独处理：typescript-eslint 8 的 `no-unused-vars` 默认也检查未使用的 catch 参数（`caughtErrors: "all"`，现有代码中没有）；它的 eslint-recommended 对 TS 文件关闭了 `no-class-assign`、`no-with` 等由 TS 编译器检查的规则。

不用 `tseslint.config()`：typescript-eslint 8 已把它标为弃用，改用 ESLint 自带的 `defineConfig`（来自 `eslint/config`）。不引入 `globals`：typescript-eslint 的推荐集对 TS 文件关闭了 `no-undef`，不需要声明全局变量。

### 5. 格式规则改用 `@stylistic/eslint-plugin`

ESLint 9 起弃用了核心中的格式规则，typescript-eslint 8 删除了 `@typescript-eslint/indent`，这两处的格式规则都已移到 `@stylistic/eslint-plugin`。一一对应：`@stylistic/indent: 4`、`@stylistic/semi: always`、`@stylistic/max-len`（选项照抄）、`@stylistic/comma-dangle`，以及原来由推荐集启用的 `@stylistic/no-extra-semi`、`@stylistic/no-mixed-spaces-and-tabs`（见决策 4）。

`comma-dangle` 要写成对象形式：`arrays`、`objects`、`imports`、`exports` 为 `always-multiline`，`functions`、`generics`、`enums`、`tuples`、`importAttributes`、`dynamicImports` 为 `ignore`。对象形式中没写的键默认是 `never`，所以这 6 个键都要显式写出。原因是现有配置写的是字符串 `"always-multiline"`，但 ESLint 7 的核心规则在没有设置 `ecmaVersion` 时不检查函数参数，也根本不认识 TS 的泛型参数；而 `@stylistic` 的字符串形式会检查所有位置。只写字符串会多出约 90 处函数参数、2 处泛型参数的报错，等于偷偷改了代码风格。旧规则同样不认识 import 属性和动态 import，所以这两处也设为 `ignore`。

`@stylistic/semi` 会检查 class 字段（ESLint 7 的核心规则还不支持 class 字段），因此有 3 处箭头函数 class 字段末尾要补分号。这是检查范围自然扩大，不是风格改变，直接修改代码。

`@stylistic/indent` 对 Tab 加空格混用的缩进行也会报缩进错误，旧的 `@typescript-eslint/indent` 不报（3.3 的 fixture 对照中发现）。这种行本来就违反 `no-mixed-spaces-and-tabs`，旧配置同样不通过，所以不会有旧配置接受的代码被新配置拒绝。

- 备选方案：改用 Prettier。首次格式化会改动大量文件，和本 change 的「等价迁移」目标冲突。
- 备选方案：不再检查格式。现在缩进、分号、尾逗号都是靠 lint 保持一致的，去掉后没有任何机制保证。

### 6. 新增检查的处理原则

判断标准：报出的是**真实的问题**（死代码、未使用的声明）就改代码；报出的是**代码库有意使用的写法**就在配置中放行，并在配置里用注释写明原因。

| 规则 | 来源 | 处数 | 处理 |
|---|---|---|---|
| `no-useless-assignment` | ESLint 10 推荐集新增 | 38 | 改代码：删除无用的赋值。分两类：多数是声明时的初始值（典型如 `let x: number[] = [];`，之后每条分支都会重新赋值），删除时保留或补上类型注解（`let c = 0` → `let c: number`），由 TS 的明确赋值检查保证每条路径在读取前都赋过值；少数是函数中途的赋值语句（如 `getMatrixStackInfo.ts` 中被后面无条件覆盖的 `requestEnd = ...`、`utils.tsx` 中的 `clientWidth = contentWidth`），没有 TS 检查兜底，每处都要读懂前后逻辑确认值不会被读到，再由 story 测试保证。读不到的值删掉不改变行为。删掉初始值后只剩一次赋值的非解构变量，直接合并成 const 声明（Clippable 的 `controls`、groupUtils 的 `childEvent`），解构赋值的情况见决策 4 的 `prefer-const` |
| `@typescript-eslint/no-unused-vars` | 检查范围扩大到 moveable、lit、preact | 3 | 改代码：删除未使用的 import 和参数 |
| `@stylistic/semi` | 见决策 5 | 3 | 改代码 |
| 失效的 `eslint-disable` 注释 | ESLint 9 起默认报告 | 2 | 改代码：删除注释 |
| `@stylistic/max-len` | 检查范围扩大到 lit | 1 | 改代码：换行 |
| `@stylistic/no-extra-semi` | 检查范围扩大到 moveable | 1 | 改代码：删除函数声明后多余的分号 |
| `@typescript-eslint/no-unused-expressions` | typescript-eslint 8 推荐集 | 18 | 放行：`allowShortCircuit: true, allowTernary: true`。`manager && manager.destroy()`、`this.gesto && (this.gesto.options.x = y)` 是这个代码库的惯用写法，其中带赋值的那种无法改写成 `?.`，逐处改写只是换写法，不修复任何问题 |
| `@typescript-eslint/no-unsafe-declaration-merging` | typescript-eslint 6 起进入推荐集 | 5 | 放行（关闭）：moveable 的 `MoveableManager`、lit 的 `LitMoveable`、react-moveable 的 `InitialMoveable` 都是由装饰器或 mixin 在运行时添加成员，class 与同名 interface 合并是给这些成员补类型的唯一写法 |

### 7. 保留 eslint-plugin-react，放行它的 peer 限制

eslint-plugin-react 就是现在使用的插件，规则覆盖这个库的 class 组件（`no-direct-mutation-state`、`no-deprecated`、`require-render-return` 等），保留它检查效果不变；实测推荐集在 ESLint 10 下能正常运行。**只启用推荐集**：推荐集以外有规则调用了 ESLint 10 已删除的 API（见 Context），以后要额外启用 react 规则，先确认它在 ESLint 10 下能运行。只是它的 peer 范围还没有写到 10，在 `pnpm-workspace.yaml` 中用 `peerDependencyRules.allowedVersions` 只针对它放行：

```yaml
peerDependencyRules:
  allowedVersions:
    # eslint-plugin-react 7.37.5 runs on ESLint 10 but its peer range stops at ^9.7.
    # Remove once a release declares ESLint 10.
    eslint-plugin-react>eslint: "10"
```

`settings.react.version` 写为 `"16.8"`，不用 `"detect"`：根目录没有安装 react，`detect` 会找不到 React 并给出警告。`16.8` 是 react-moveable 开发依赖声明的最低版本（`^16.8.6`），也是目前支持的最低版本，`no-deprecated` 等规则按这个版本判断哪些 API 已经过时；第 6 步确定 React peer 范围时一起更新。

- 备选方案：换成 `@eslint-react/eslint-plugin`。它维护活跃、支持 ESLint 10，但规则面向函数组件和 hooks，对这个库的 class 组件价值有限，规则要重新挑选，不是等价迁移。
- 备选方案：去掉 React 规则。会失去对 class 组件常见错误的检查。

### 8. 根目录 TypeScript 升到 `~6.0.3`

typescript-eslint 的解析器从它被安装的位置解析 peer `typescript`，配置在根目录，用的就是根目录的 TypeScript。升到 `~6.0.3` 后，和 6 个库包使用同一个版本，也在 typescript-eslint 8 支持的范围（`<6.1`）内。根目录现在没有其它工具使用 TypeScript（见 Context），升级后用 `pnpm doc` 确认 jsdoc 不受影响。vue3、svelte 仍然声明它们自己的 TS 4.8，不受影响。

## Risks / Trade-offs

- [eslint-plugin-react 没有声明支持 ESLint 10，以后的 ESLint 10 小版本可能和它不兼容] → 锁文件固定了版本，升级 ESLint 时 CI 的 Lint 步骤会发现问题。放行规则只针对这一个包，记入 ROADMAP「已知遗留」（连同「只启用推荐集」的限制）；上游发布支持 10 的版本后删除放行。
- [`no-useless-assignment` 的 38 处修改都在 react-moveable 的核心代码里] → 每一处都只删除从未被读取的值。初始值由 TS 的明确赋值检查（`test:type`、`declaration`、`typecheck:stories`）保证；函数中途的赋值没有 TS 兜底，逐处读懂前后逻辑后再删，由全量构建和全部 story 测试保证。
- [typescript-eslint 8 的 peer 限制 TS `<6.1`，以后无法直接升级到 TS 7] → 已在第 3 步的规划中说明；等 typescript-eslint 支持 TS 7 时再一起升级。
- [lint 不再在 `build` 中执行，本地构建时发现不了 lint 问题] → CI 单独执行；编辑器插件读取同一份配置，写代码时就能看到。

## Migration Plan

1. 先在旧配置下用一个故意违反各条规则的临时文件（放在 scratchpad，用 `eslint --stdin --stdin-filename` 以 react-moveable `src` 下的路径喂给 ESLint，不改仓库），记录现有配置能报出哪些规则，作为等价性的对照（结果记入本 change 的 `baseline.md`）。
2. 新增根目录配置和依赖，删除旧配置和依赖，修改源码，`pnpm lint` 通过。
3. 用同一个临时文件跑新配置，对照第 1 步：现有规则都还能报出来（决策 4 中有意不再启用的除外），新增的报告都在决策 6 的表里。旧版 `@typescript-eslint/indent` 对多行泛型参数有已知误报，对照时标为旧规则的问题，不算新配置漏报。
4. CI 增加 Lint 步骤，用一个故意制造 lint 错误的临时提交确认 CI 会失败，验证完 revert。

回滚：整个 change 是一组提交，revert 即可恢复旧配置。
