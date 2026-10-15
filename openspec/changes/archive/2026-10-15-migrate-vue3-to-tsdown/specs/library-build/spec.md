## MODIFIED Requirements

### Requirement: 各包的产物文件
以下 7 个包的构建 SHALL 在各自的 `dist/` 下产出恰好这些 JavaScript 文件，每个文件旁边都有同名的 `.map` 文件：

| 包 | 文件 |
|---|---|
| react-moveable | `moveable.esm.js`（ESM）、`moveable.cjs.js`（CJS） |
| croact-moveable | `moveable.esm.js`（ESM）、`moveable.cjs.js`（CJS） |
| preact-moveable | `moveable.esm.js`（ESM）、`moveable.cjs.js`（CJS） |
| moveable | `moveable.esm.js`（ESM）、`moveable.cjs.js`（CJS）、`moveable.js`（UMD）、`moveable.min.js`（UMD，压缩） |
| lit-moveable | `moveable.esm.js`（ESM）、`moveable.cjs.js`（CJS）、`moveable.umd.js`（UMD） |
| vue3-moveable | `moveable.esm.js`（ESM）、`moveable.cjs.js`（CJS） |
| @moveable/helper | `helper.esm.js`（ESM）、`helper.cjs.js`（CJS）、`helper.js`（UMD）、`helper.min.js`（UMD，压缩） |

各包 `package.json` 中的 `main`、`module`、`types` SHALL 指向存在的文件。

#### Scenario: 产物文件清单
- **WHEN** 全量构建后列出这 7 个包的 `dist/` 目录
- **THEN** 每个包的 JavaScript 文件恰好是上表所列，每个都有对应的 `.map`，没有多余或缺失的文件

#### Scenario: 入口字段有效
- **WHEN** 读取这 7 个包的 `main`、`module`、`types` 字段
- **THEN** 每个字段指向的文件都存在

### Requirement: CJS 产物的导出形状
CJS 产物被 `require()` 后得到的值 SHALL 与当前已发布的形状一致：
- react-moveable、croact-moveable、preact-moveable、moveable：得到的是 Moveable 组件本身；ESM 入口的每个具名导出都是它的同名属性；它的 `default` 属性指向它自己。
- lit-moveable、@moveable/helper：得到的是一个对象，包含 ESM 入口的全部具名导出，这些属性可以读取和枚举（是否可写不作要求）。
- vue3-moveable：得到的是一个对象，包含 ESM 入口的全部具名导出和 `default`（Vue 组件），这些属性可以读取和枚举。这与此前构建出的 `moveable.cjs` 文件的形状相同。

#### Scenario: require 组件包
- **WHEN** `require` react-moveable、croact-moveable 或 moveable 的 CJS 产物
- **THEN** 结果是一个函数（Moveable 组件），它的属性集合等于 ESM 入口的具名导出集合加上 `default`，并且 `result.default === result`

#### Scenario: require preact-moveable
- **WHEN** `require` preact-moveable 的 CJS 产物
- **THEN** 结果就是 Moveable 组件本身，也就是 ESM 入口的 default 导出

#### Scenario: require 对象包
- **WHEN** `require` lit-moveable 或 @moveable/helper 的 CJS 产物
- **THEN** 结果对象的可枚举键集合等于对应 ESM 入口的具名导出集合，每个键都能读到对应的导出值

#### Scenario: require vue3-moveable
- **WHEN** 以包目录为参数 `require` vue3-moveable，也就是按 `main` 字段解析到的 CJS 产物
- **THEN** 加载成功；结果对象的可枚举键集合等于 ESM 入口的具名导出集合加上 `default`，`result.default` 和 `result.VueMoveable` 是同一个 Vue 组件

### Requirement: 类型声明位置
这 7 个包 SHALL 把类型声明输出到包根目录的 `declaration/` 下，按源码文件逐个输出 `.d.ts`，相对路径与 `src/` 下的源文件一一对应；`package.json` 的 `types` 字段 SHALL 指向 `declaration/` 中的入口文件。react-moveable 的子路径 `react-moveable/types`（由 `types/package.json` 指向 `declaration/externalTypes.d.ts`）SHALL 继续可用。

#### Scenario: 声明文件对应源码
- **WHEN** 全量构建后列出 react-moveable 的 `declaration/`
- **THEN** `src/` 下每个 `.ts`/`.tsx` 源文件都有相对路径相同的 `.d.ts`，其中包含 `index.d.ts` 和 `externalTypes.d.ts`

#### Scenario: 深路径类型引用
- **WHEN** preact-moveable 的源码引用 `react-moveable/types`，并对 preact-moveable 生成类型声明
- **THEN** 类型声明生成成功，解析到的是 react-moveable 的 `declaration/externalTypes.d.ts`
