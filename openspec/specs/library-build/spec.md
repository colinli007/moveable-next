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
| helper | `helper.esm.js`（ESM）、`helper.cjs.js`（CJS）、`helper.js`（UMD）、`helper.min.js`（UMD，压缩） |

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

### Requirement: 产物支持按 able 裁剪
react-moveable、moveable、vue3-moveable 的 ESM 产物中，默认导出和没有被引用的 able MUST NOT 带有使打包工具无法删除它们的副作用（例如类的静态块、顶层的未标注调用）。

这条约束 SHALL 有自动化检查，在这三个包各自的构建最后执行：用本包产物打包一段只组合 Draggable、Resizable、Rotatable 的使用方代码（本仓库的包一起打包，第三方依赖作为外部模块），断言打包结果中没有其它 able（以 able 的 `name` 判断），并断言体积不超过引入默认导出时的固定比例；任一断言不满足时构建失败。

#### Scenario: 引入副作用时构建失败
- **WHEN** 某个改动让默认 `Moveable` 或某个 able 在产物中重新带有副作用（例如把 `static get defaultAbles()` 改回静态字段）
- **THEN** 该包的构建失败，输出中能看到被保留的 able 名称

#### Scenario: 正常构建
- **WHEN** 执行全量构建
- **THEN** 三个包的检查都通过，输出组合三个 able 与全量的体积

### Requirement: 原生 moveable 的装饰器属性在产物中可用
原生 moveable 的选项属性访问器和方法代理 SHALL 定义在类的原型上，可以通过实例访问，MUST NOT 被同名的实例字段遮住。它们 SHALL 按类组合的 able 生成（默认 `Moveable` 是全部 able），在类的第一个实例创建时生成，MUST NOT 在模块加载时就以全部 able 生成（否则只引入 `makeMoveable` 时无法删掉其余 able）。

#### Scenario: 原生 moveable 的属性
- **WHEN** 使用 moveable 的产物创建实例，给一个选项属性（如 `draggable`）赋值后再读取
- **THEN** 读取到的是刚赋的值，并且这个值已经传给内部的 Moveable 组件

#### Scenario: 组合部分 able 的类
- **WHEN** 用 `makeMoveable([Draggable])` 创建的类 `new` 一个实例
- **THEN** 实例上有 `draggable` 等 Draggable 的选项属性和全部方法代理，可以赋值和读取

### Requirement: 外部依赖与声明一致
ESM 和 CJS 产物 SHALL 把运行时依赖保留为外部 import 或 require，MUST NOT 内联它们。例外：croact-moveable SHALL 内联 react-moveable 的代码。产物中出现的每个外部模块所属的包，SHALL 在该包 `package.json` 的 `dependencies` 或 `peerDependencies` 中声明，没有例外：react-moveable 的 `react` 是 peerDependency，不再需要在构建配置中单独指定为外部模块。

#### Scenario: 外部模块都已声明
- **WHEN** 收集每个 ESM 和 CJS 产物中的外部模块，按包名去重
- **THEN** 每个包名都出现在该包的 `dependencies` 或 `peerDependencies` 中

#### Scenario: 运行时依赖不被内联
- **WHEN** 检查 react-moveable 的 ESM 产物
- **THEN** gesto、`@daybrush/utils`、react 等依赖以外部 import 的形式出现，产物中不包含它们的代码

#### Scenario: 严格布局下可以加载 CJS 产物
- **WHEN** 在 pnpm 严格布局下，从包自己的目录 `require` 它的 CJS 产物
- **THEN** 不出现 `Cannot find module` 错误

### Requirement: croact 包不引用 React
croact-moveable 的产物 SHALL 使用 croact 和 croact-css-styled 代替 React 和 react-css-styled，MUST NOT 引用 `react`、`react-dom`、`react/jsx-runtime`、`react-css-styled`。moveable 的 ESM 和 CJS 产物 SHALL 引用 `@moveable-next/croact`，MUST NOT 引用 `@moveable-next/react` 或 `react`。

#### Scenario: croact-moveable 的外部模块
- **WHEN** 收集 croact-moveable 产物中的外部模块
- **THEN** 包含 `croact` 和 `croact-css-styled`，不包含 `react`、`react-dom`、`react/jsx-runtime`、`react-css-styled`

#### Scenario: moveable 的外部模块
- **WHEN** 收集 moveable ESM 和 CJS 产物中的外部模块
- **THEN** 包含 `croact` 和 `@moveable-next/croact`，不包含 `react` 和 `@moveable-next/react`

### Requirement: 各包 CJS 产物的导出形状
CJS 产物被 `require()` 后得到的值 SHALL 与当前已发布的形状一致：
- react-moveable、croact-moveable、moveable：得到的是 Moveable 组件本身；ESM 入口的每个具名导出都是它的同名属性；它的 `default` 属性指向它自己。
- helper：得到的是一个对象，包含 ESM 入口的全部具名导出，这些属性可以读取和枚举（是否可写不作要求）。
- vue3-moveable：得到的是一个对象，包含 ESM 入口的全部具名导出和 `default`（Vue 组件），这些属性可以读取和枚举。这与此前构建出的 `moveable.cjs` 文件的形状相同。

#### Scenario: require 组件包
- **WHEN** `require` react-moveable、croact-moveable 或 moveable 的 CJS 产物
- **THEN** 结果是一个函数（Moveable 组件），它的属性集合等于 ESM 入口的具名导出集合加上 `default`，并且 `result.default === result`

#### Scenario: require 对象包
- **WHEN** `require` helper 的 CJS 产物
- **THEN** 结果对象的可枚举键集合等于对应 ESM 入口的具名导出集合，每个键都能读到对应的导出值

#### Scenario: require vue3-moveable
- **WHEN** 以包目录为参数 `require` vue3-moveable，也就是按 `main` 字段解析到的 CJS 产物
- **THEN** 加载成功；结果对象的可枚举键集合等于 ESM 入口的具名导出集合加上 `default`，`result.default` 和 `result.VueMoveable` 是同一个 Vue 组件

### Requirement: UMD 产物自包含
UMD 产物 SHALL 内联全部依赖，MUST NOT 依赖任何外部模块或外部全局变量。通过 `<script>` 引入时，它们 SHALL 分别定义全局变量 `Moveable`（moveable）、`MoveableHelper`（helper）。moveable 的 UMD SHALL 内联 croact 代替 React。全局变量 `Moveable` SHALL 是 Moveable 类本身，具名导出挂在它上面；`MoveableHelper` SHALL 是包含全部具名导出的对象。

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
这 5 个包 SHALL 把类型声明输出到包根目录的 `declaration/` 下，按源码文件逐个输出 `.d.ts`，相对路径与 `src/` 下的源文件一一对应；`package.json` 的 `types` 字段 SHALL 指向 `declaration/` 中的入口文件。react-moveable 的子路径 `@moveable-next/react/types` SHALL 解析到 `declaration/externalTypes.d.ts`：支持 `exports` 的解析方式经由 `exports` 的 `./types`，不支持的（TypeScript 的 `moduleResolution: node`）经由 `types/package.json`。

#### Scenario: 声明文件对应源码
- **WHEN** 全量构建后列出 react-moveable 的 `declaration/`
- **THEN** `src/` 下每个 `.ts`/`.tsx` 源文件都有相对路径相同的 `.d.ts`，其中包含 `index.d.ts` 和 `externalTypes.d.ts`

#### Scenario: 深路径类型引用
- **WHEN** moveable 的源码引用 `@moveable-next/react/types`，并对 moveable 生成类型声明
- **THEN** 类型声明生成成功，解析到的是 react-moveable 的 `declaration/externalTypes.d.ts`

### Requirement: 原生版与 Vue 3 版的类型声明不依赖 React 类型
moveable（`@moveable-next/vanilla`）和 vue3-moveable（`@moveable-next/vue3`）的公开类型声明，以及 react-moveable 的子路径 `@moveable-next/react/types`，在被使用方的 TypeScript 引用时 MUST NOT 引入 `react` 的类型：从这些入口出发，类型检查涉及的文件中 MUST NOT 有 `@types/react` 或 react-moveable 的 React 组件声明（如 `InitialMoveable`）。使用方没有安装 `@types/react` 时，无论是否开启 `skipLibCheck`，引用这些包都 SHALL 能通过类型检查。

react-moveable 的主入口 `@moveable-next/react` 是 React 组件，不受这条约束；croact-moveable 的类型声明是 react-moveable 主入口的重新导出，也不受这条约束。

这条约束 SHALL 有自动化测试：编译一段只使用 moveable 公开 API 的使用方代码（`skipLibCheck: false`），断言没有类型错误，并且参与编译的文件中没有 `@types/react`。这个测试 SHALL 在 moveable 的构建中执行。

#### Scenario: 只装原生版的项目
- **WHEN** 在一个没有安装 `@types/react` 的项目中安装 `@moveable-next/vanilla`，用 `skipLibCheck: false` 对使用它的代码做类型检查
- **THEN** 类型检查通过，没有 `Cannot find module 'react'` 错误

#### Scenario: 只装 Vue 3 版的项目
- **WHEN** 在一个没有安装 `@types/react` 的 Vue 3 项目中安装 `@moveable-next/vue3`，用 `skipLibCheck: false` 对使用它的代码做类型检查
- **THEN** 类型检查通过，没有 `Cannot find module 'react'` 错误

#### Scenario: 类型依赖回到包入口
- **WHEN** react-moveable 的某个 able 改动后，生成的声明中某个类型又经由 react-moveable 的入口（`..`）引用
- **THEN** moveable 的构建因类型测试失败而失败，并能看到 `@types/react` 被引入

### Requirement: 包名、入口与发布内容
5 个包 SHALL 使用「受支持的框架包集合」中的包名，`package.json` 中的 `repository`（`git+https://github.com/colinli007/moveable-next.git`，带包所在的 `directory`）、`homepage`、`bugs` SHALL 指向本仓库。包之间的依赖 SHALL 使用这些包名。

每个包 SHALL 用 `exports` 声明入口，主入口 `.` 的条件依次为：
- `types`：`declaration/` 中的入口声明；
- `module`：ESM 产物，供识别这一条件的打包工具（Vite、webpack、Rollup、esbuild）使用；
- `default`：CJS 产物。Node 不论用 `import` 还是 `require`，都 SHALL 解析到 CJS 产物：这些包没有声明 `"type": "module"`，`.esm.js` 在 Node 中会被当作 CommonJS 解析。

每个包 SHALL 导出 `./package.json`。react-moveable SHALL 另外导出 `./types`（`types` 指向 `declaration/externalTypes.d.ts`）；moveable 和 helper SHALL 另外导出各自的两个 UMD 产物（如 `./dist/moveable.js`、`./dist/moveable.min.js`），MUST NOT 导出 `dist/` 下的 ESM、CJS 产物路径；并用 `unpkg`、`jsdelivr` 字段指向压缩后的 UMD 产物。不在 `exports` 中的路径 MUST NOT 能被 import。`main`、`module`、`types` 字段 SHALL 保留，供不识别 `exports` 的工具使用。

发布内容 SHALL 只包含 `dist/`、`declaration/`、`src/`（sourcemap 引用的源码）和 npm 默认包含的 `package.json`、README、LICENSE，react-moveable 另加 `types/`；构建配置、测试、tsconfig MUST NOT 被发布。

#### Scenario: 在 Node 中加载
- **WHEN** 在 Node 中分别用 `require` 和 `import()` 加载每个包
- **THEN** 都加载成功，得到的都是 CJS 产物导出的值

#### Scenario: 打包工具解析到 ESM 产物
- **WHEN** 带上 `module` 条件解析每个包的主入口
- **THEN** 解析到该包的 ESM 产物

#### Scenario: 未导出的路径
- **WHEN** 在 Node 中 `require` 一个包内未在 `exports` 中声明的路径（如 `@moveable-next/react/src/index`）
- **THEN** 抛出 `ERR_PACKAGE_PATH_NOT_EXPORTED`

#### Scenario: 发布内容
- **WHEN** 对每个包执行打包预演（`pnpm pack --dry-run`）
- **THEN** 文件清单中只有 `dist/`、`declaration/`、`src/`（react-moveable 另有 `types/`）下的文件，以及 `package.json`、README、LICENSE；`package.json` 中包之间的依赖是具体的版本号，而不是 `workspace:` 协议

#### Scenario: 入口检查工具
- **WHEN** 用 publint 检查每个包
- **THEN** 没有错误
