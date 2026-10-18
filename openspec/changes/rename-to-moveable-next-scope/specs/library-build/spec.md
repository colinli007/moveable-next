## MODIFIED Requirements

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

### Requirement: 类型声明位置
这 5 个包 SHALL 把类型声明输出到包根目录的 `declaration/` 下，按源码文件逐个输出 `.d.ts`，相对路径与 `src/` 下的源文件一一对应；`package.json` 的 `types` 字段 SHALL 指向 `declaration/` 中的入口文件。react-moveable 的子路径 `@moveable-next/react/types` SHALL 解析到 `declaration/externalTypes.d.ts`：支持 `exports` 的解析方式经由 `exports` 的 `./types`，不支持的（TypeScript 的 `moduleResolution: node`）经由 `types/package.json`。

#### Scenario: 声明文件对应源码
- **WHEN** 全量构建后列出 react-moveable 的 `declaration/`
- **THEN** `src/` 下每个 `.ts`/`.tsx` 源文件都有相对路径相同的 `.d.ts`，其中包含 `index.d.ts` 和 `externalTypes.d.ts`

#### Scenario: 深路径类型引用
- **WHEN** moveable 的源码引用 `@moveable-next/react/types`，并对 moveable 生成类型声明
- **THEN** 类型声明生成成功，解析到的是 react-moveable 的 `declaration/externalTypes.d.ts`

## ADDED Requirements

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
