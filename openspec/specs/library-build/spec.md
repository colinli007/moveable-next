# library-build Specification

## Purpose

定义各可发布包构建产物的对外契约：产出哪些文件和格式、语法目标、哪些依赖内联、CJS 与 UMD 的导出形状、sourcemap、banner 和类型声明的位置，作为替换构建工具或升级编译器时判断「产物是否等价」的依据。

## Requirements

### Requirement: 各包的产物文件
以下 5 个包的构建 SHALL 在各自的 `dist/` 下产出恰好这些 JavaScript 文件，每个文件旁边都有同名的 `.map` 文件：

| 包 | 文件 |
|---|---|
| react-moveable | `moveable.esm.js`（ESM）、`moveable.cjs.js`（CJS） |
| croact-moveable | `moveable.esm.js`（ESM）、`moveable.cjs.js`（CJS） |
| moveable | `moveable.esm.js`（ESM）、`moveable.cjs.js`（CJS）、`moveable.js`（UMD）、`moveable.min.js`（UMD，压缩） |
| vue3-moveable | `moveable.esm.js`（ESM）、`moveable.cjs.js`（CJS） |
| @moveable/helper | `helper.esm.js`（ESM）、`helper.cjs.js`（CJS）、`helper.js`（UMD）、`helper.min.js`（UMD，压缩） |

各包 `package.json` 中的 `main`、`module`、`types` SHALL 指向存在的文件。

#### Scenario: 产物文件清单
- **WHEN** 全量构建后列出这 5 个包的 `dist/` 目录
- **THEN** 每个包的 JavaScript 文件恰好是上表所列，每个都有对应的 `.map`，没有多余或缺失的文件

#### Scenario: 入口字段有效
- **WHEN** 读取这 5 个包的 `main`、`module`、`types` 字段
- **THEN** 每个字段指向的文件都存在

### Requirement: 产物语法目标为 ES2022
所有产物 SHALL 是合法的 ES2022 代码，MUST NOT 包含 ES2022 之后的语法。本仓库源码中的 class SHALL 以原生 `class` 语法输出，MUST NOT 降级为 ES5 的构造函数加原型继承辅助函数；UMD 中内联的第三方依赖保持其发布时的语法，不重新编译。

#### Scenario: 按 ES2022 解析
- **WHEN** 用限定为 ES2022 的 JavaScript 解析器解析每个产物（ESM 按 module，CJS 和 UMD 按 script）
- **THEN** 全部解析成功

#### Scenario: 不含 ES5 继承辅助函数
- **WHEN** 检查 react-moveable 和 moveable 的 ESM、CJS 产物，以及 moveable 的 UMD 产物中来自本仓库源码的部分（按 sourcemap 区分）
- **THEN** 组件以 `class ... extends ...` 形式出现，其中不存在 `__extends`、`extendStatics` 这类 ES5 继承辅助函数

### Requirement: 原生 moveable 的装饰器属性在产物中可用
源码中通过装饰器定义在原型上的属性访问器和方法代理，在产物中 SHALL 可以通过实例访问，MUST NOT 被同名的实例字段遮住。

#### Scenario: 原生 moveable 的属性
- **WHEN** 使用 moveable 的产物创建实例，给一个选项属性（如 `draggable`）赋值后再读取
- **THEN** 读取到的是刚赋的值，并且这个值已经传给内部的 Moveable 组件

### Requirement: 外部依赖与声明一致
ESM 和 CJS 产物 SHALL 把运行时依赖保留为外部 import 或 require，MUST NOT 内联它们。例外：croact-moveable SHALL 内联 react-moveable 的代码。产物中出现的每个外部模块所属的包，SHALL 在该包 `package.json` 的 `dependencies` 或 `peerDependencies` 中声明；尚未声明为 peerDependencies 的框架运行时（react-moveable 的 `react`）除外。

#### Scenario: 外部模块都已声明
- **WHEN** 收集每个 ESM 和 CJS 产物中的外部模块，按包名去重
- **THEN** 每个包名都出现在该包的 `dependencies` 或 `peerDependencies` 中，或者属于上面列出的框架运行时例外

#### Scenario: 运行时依赖不被内联
- **WHEN** 检查 react-moveable 的 ESM 产物
- **THEN** gesto、`@daybrush/utils`、react 等依赖以外部 import 的形式出现，产物中不包含它们的代码

#### Scenario: 严格布局下可以加载 CJS 产物
- **WHEN** 在 pnpm 严格布局下，从包自己的目录 `require` 它的 CJS 产物
- **THEN** 不出现 `Cannot find module` 错误

### Requirement: croact 包不引用 React
croact-moveable 的产物 SHALL 使用 croact 和 croact-css-styled 代替 React 和 react-css-styled，MUST NOT 引用 `react`、`react-dom`、`react/jsx-runtime`、`react-css-styled`。moveable 的 ESM 和 CJS 产物 SHALL 引用 croact-moveable，MUST NOT 引用 react-moveable 或 react。

#### Scenario: croact-moveable 的外部模块
- **WHEN** 收集 croact-moveable 产物中的外部模块
- **THEN** 包含 `croact` 和 `croact-css-styled`，不包含 `react`、`react-dom`、`react/jsx-runtime`、`react-css-styled`

#### Scenario: moveable 的外部模块
- **WHEN** 收集 moveable ESM 和 CJS 产物中的外部模块
- **THEN** 包含 `croact` 和 `croact-moveable`，不包含 `react` 和 `react-moveable`

### Requirement: 各包 CJS 产物的导出形状
CJS 产物被 `require()` 后得到的值 SHALL 与当前已发布的形状一致：
- react-moveable、croact-moveable、moveable：得到的是 Moveable 组件本身；ESM 入口的每个具名导出都是它的同名属性；它的 `default` 属性指向它自己。
- @moveable/helper：得到的是一个对象，包含 ESM 入口的全部具名导出，这些属性可以读取和枚举（是否可写不作要求）。
- vue3-moveable：得到的是一个对象，包含 ESM 入口的全部具名导出和 `default`（Vue 组件），这些属性可以读取和枚举。这与此前构建出的 `moveable.cjs` 文件的形状相同。

#### Scenario: require 组件包
- **WHEN** `require` react-moveable、croact-moveable 或 moveable 的 CJS 产物
- **THEN** 结果是一个函数（Moveable 组件），它的属性集合等于 ESM 入口的具名导出集合加上 `default`，并且 `result.default === result`

#### Scenario: require 对象包
- **WHEN** `require` @moveable/helper 的 CJS 产物
- **THEN** 结果对象的可枚举键集合等于对应 ESM 入口的具名导出集合，每个键都能读到对应的导出值

#### Scenario: require vue3-moveable
- **WHEN** 以包目录为参数 `require` vue3-moveable，也就是按 `main` 字段解析到的 CJS 产物
- **THEN** 加载成功；结果对象的可枚举键集合等于 ESM 入口的具名导出集合加上 `default`，`result.default` 和 `result.VueMoveable` 是同一个 Vue 组件

### Requirement: UMD 产物自包含
UMD 产物 SHALL 内联全部依赖，MUST NOT 依赖任何外部模块或外部全局变量。通过 `<script>` 引入时，它们 SHALL 分别定义全局变量 `Moveable`（moveable）、`MoveableHelper`（@moveable/helper）。moveable 的 UMD SHALL 内联 croact 代替 React。全局变量 `Moveable` SHALL 是 Moveable 类本身，具名导出挂在它上面；`MoveableHelper` SHALL 是包含全部具名导出的对象。

#### Scenario: 不引用外部模块
- **WHEN** 检查 `moveable.js`、`moveable.min.js`、`helper.js`、`helper.min.js`
- **THEN** UMD 包装在 CommonJS 分支不 require 任何模块，在 AMD 分支不声明任何依赖，在全局分支不读取依赖对应的全局变量（如 `React`、`croact`、`Gesto`）；moveable 的 UMD 中不存在对 `react` 或 `react-dom` 的引用

#### Scenario: 浏览器中直接使用
- **WHEN** 在页面中用 `<script>` 引入 `moveable.min.js`，然后执行 `new Moveable(document.body, { target: el, draggable: true })`
- **THEN** 控制框正常渲染，可以拖动 `el`；`Moveable.PROPERTIES` 等具名导出可以通过全局变量访问

### Requirement: sourcemap 有效
每个产物 SHALL 有对应的 sourcemap，产物末尾的 `sourceMappingURL` 指向它；sourcemap 的 `sources` 和 `mappings` MUST NOT 为空。压缩产物的 sourcemap SHALL 映射回源码，而不是映射到未压缩的产物。

#### Scenario: 压缩产物的 sourcemap
- **WHEN** 读取 `moveable.min.js.map` 和 `helper.min.js.map`
- **THEN** `sources` 中包含对应包 `src/` 下的文件，`mappings` 不为空

### Requirement: 产物头部注释
每个产物（包括压缩产物）SHALL 以一段注释开头，注释中包含版权行、包名、license、author、repository、version，数值与该包 `package.json` 一致；`LICENSE` 文件中有以 `Copyright` 开头的行时，版权行取这一行。

#### Scenario: 版本号随 package.json 变化
- **WHEN** 修改某个包 `package.json` 中的 `version` 后重新构建
- **THEN** 该包所有产物头部注释中的 version 都是新的版本号

### Requirement: 类型声明位置
这 5 个包 SHALL 把类型声明输出到包根目录的 `declaration/` 下，按源码文件逐个输出 `.d.ts`，相对路径与 `src/` 下的源文件一一对应；`package.json` 的 `types` 字段 SHALL 指向 `declaration/` 中的入口文件。react-moveable 的子路径 `react-moveable/types`（由 `types/package.json` 指向 `declaration/externalTypes.d.ts`）SHALL 继续可用。

#### Scenario: 声明文件对应源码
- **WHEN** 全量构建后列出 react-moveable 的 `declaration/`
- **THEN** `src/` 下每个 `.ts`/`.tsx` 源文件都有相对路径相同的 `.d.ts`，其中包含 `index.d.ts` 和 `externalTypes.d.ts`

#### Scenario: 深路径类型引用
- **WHEN** moveable 的源码引用 `react-moveable/types`，并对 moveable 生成类型声明
- **THEN** 类型声明生成成功，解析到的是 react-moveable 的 `declaration/externalTypes.d.ts`
