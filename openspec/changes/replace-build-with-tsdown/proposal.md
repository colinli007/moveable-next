## Why

react-moveable、croact-moveable、preact-moveable、moveable、lit-moveable、helper 这 6 个包都用上游作者的 `@daybrush/builder`（rollup 3 + rollup-plugin-typescript2）构建，外加 `rollup-plugin-react-compat`、`rollup-plugin-preact`、`resolveOwnCroactPlugin` 等专用插件。这套工具已停止维护，很多处理是隐式的：`external` 不声明，靠「解析不到就当外部依赖」并产生警告；有些处理只对 ES5 产物有意义（`/** @class */` 替换、`minifyPrototype`）；CJS 入口在 ESM 源码里直接写 `module.exports =`；sourcemap 有的缺失，有的已经损坏。同时 TypeScript 6 已将 `target: es5` 和 `moduleResolution: node` 改为报错，现有 tsconfig 不改就无法升级。

这一步只换构建工具、升级 TypeScript，**产物对外的形状保持不变**，这样可以用结构对比证明换工具没有改变行为。改包名、补 `exports` 等形状上的改动留到第 6 步一次定好。

## What Changes

- 6 个包的构建从 `@daybrush/builder` + rollup 改为 **tsdown**（基于 Rolldown）。每个包有自己的 tsdown 配置：依赖按 `package.json` 自动作为 external；UMD 产物把依赖全部内联；产物文件名在配置中写死，不使用 tsdown 默认的 `.mjs`/`.cjs` 命名
- 「把 react 换成 croact / preact」按产物类型分两种做法：ESM/CJS 中依赖保持 external，用输出改名（`output.paths`）把 `react`、`react-css-styled`、`react-moveable` 改写为 croact / preact 对应的包；UMD 中用指向本包依赖的绝对路径 alias 把 croact 内联。这两种做法替代 `rollup-plugin-react-compat`、`rollup-plugin-preact` 和 `resolveOwnCroactPlugin`
- 产物运行时 import 的包必须在 `package.json` 中声明：preact-moveable 补上从 react-moveable 产物带进来的 10 个运行时依赖（修正现有缺陷：它的 CJS 产物目前在严格布局下无法加载；其中 `@scena/event-emitter` 在基线中是被意外内联的，改为 external）；croact-moveable 删除多余的 `react-css-styled` 依赖；react、preact、lit 这些框架运行时在配置中显式保持 external，改为 peerDependencies 留给决定版本范围的后续步骤
- 删除 `@daybrush/builder`、rollup、`rollup-plugin-react-compat`、`rollup-plugin-preact`、`rollup-plugin-css-bundle`、visualizer、print-sizes、pvu，以及没有被使用的 `#__VERSION__#` 替换
- **BREAKING（产物语法）**：产物的语法目标从 **ES5 改为 ES2022**，不再内联 tslib 的 `__extends` 等 helper，class 输出为原生 `class`。用 ES5 方式继承原生 `Moveable`（如 `Moveable.call(this)`）的代码会报错。所有包的 tsconfig 显式设置 `useDefineForClassFields: false`，保证装饰器（moveable 的 `@Properties`、Lit 的属性装饰器）定义的访问器不会被实例字段遮住
- 这 6 个包的 TypeScript 统一升到 **~6.0.3**，tsconfig 去掉 TS 6 中已报错或弃用的选项：`moduleResolution` 改为 `bundler`，删除 `baseUrl`、`downlevelIteration`、`esModuleInterop: false` 等；声明文件的 tsconfig 显式写 `rootDir`，保证 TS 6 下 `declaration/` 的目录结构不变。不升 TS 7，因为 typescript-eslint 8 只支持 `<6.1`
- 产物文件名、格式、UMD 全局变量名、banner 保持不变；CJS 产物保持「`require()` 得到的就是 default 导出，具名导出挂在它上面」的形状。但实现方式改为：入口文件只把具名导出挂到 default 上并 `export default`，由构建输出 `exports: "default"`。源码里不再出现 `module.exports`，各包的 `index.cjs.ts` 与 `index.umd.ts` 合并为一个入口。已知差异：helper 和 lit-moveable 的 CJS/UMD 导出对象，属性从普通可写属性变为只读 getter
- d.ts 继续用 tsc（TS 6）`--emitDeclarationOnly` 输出到 `declaration/`，目录结构不变
- 所有 ESM / CJS / UMD 产物统一生成正确的 sourcemap
- CI 增加全量构建（`pnpm packages:build`）步骤，构建失败时流水线失败
- 改动之前先为当前 `dist/`、`declaration/` 保存基线快照，再用临时的对比脚本做结构对比。对比项：导出名、`require` 之后对象的形状（包括属性描述符）、外部 import 清单、UMD 内联的包和全局变量名、banner、体积。对比结果写入本 change 的 `baseline.md`，结论摘要写入 design，脚本不留在仓库

不在本次范围：
- ESLint 10 flat config + typescript-eslint 8：单独的 change `migrate-eslint-flat-config`，在本 change 之后进行
- vue3-moveable、svelte-moveable 的构建，以及 Lit 3 升级：第 4 步。lit-moveable 在本 change 只替换构建工具
- 包名、`exports`、是否只发 ESM、d.ts 改为打包输出：第 6 步

## Capabilities

### New Capabilities

- `library-build`：各包发布产物的契约，包括每个包产出哪些格式和文件、语法目标、依赖是否内联、CJS 导出形状、UMD 全局变量名、sourcemap、banner、类型声明的位置

### Modified Capabilities

- `monorepo-tooling`：「按依赖顺序构建全部包」的场景从 rollup 的说法改为与工具无关的说法：没有未解析模块的例外清单；产物与基线的比较改为结构对比；UMD 自包含的场景改为引用 `library-build` 中的要求。「CI 执行全部自动化检查」增加全量构建

## Impact

- 6 个包：删除 `rollup.config.js`，新增 tsdown 配置；preact、lit 的 demo（`rollup.config.demo.js` / `rollup.demo.config.js`、`demo/`、`src/demo/` 和 `start` 脚本）一并删除，croact 的 `start` 脚本引用的 demo 配置本来就不存在，也删除。preact 的 demo 配置写成了 `modulex.exports`，早已无法运行，开发调试统一使用 Storybook；`package.json` 的依赖和 `build` 脚本；`tsconfig*.json`（helper、preact、lit 的 `tsconfig.build.json` 只剩冗余设置，删除）；合并后的 CJS/UMD 入口文件（react-moveable、croact-moveable、moveable、helper 的 `src/index.cjs.ts` / `src/index.umd.ts`）
- react-moveable 的 `build` 脚本仍会执行 lint（ESLint 7 + typescript-eslint 5），需要确认它在 TS 6 下能运行，处理方式见 design
- 根目录：`pnpm-lock.yaml`，`pnpm-workspace.yaml` 的 `allowBuilds`（如果新依赖需要构建脚本）
- 下游：vue3-moveable、svelte-moveable 不打包 moveable，但它们的类型检查（TS 4.8）会读取 moveable 由 TS 6 生成的 `declaration/`，全量构建要通过
- demo 部署复制的 moveable、helper UMD 产物路径不变
- CI：`.github/workflows/run-e2e.yml`
- 文档：`CLAUDE.md`（构建命令、包依赖链里提到的 rollup 插件）、`openspec/ROADMAP.md`
- croffle、Storybook、Vitest 不受影响：它们直接使用源码，不使用构建产物
