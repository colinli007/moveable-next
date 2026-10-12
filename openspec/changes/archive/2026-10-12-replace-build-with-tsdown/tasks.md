## 1. 建立基线（当前工具链，不修改仓库文件）

- [x] 1.1 在 Node 22.20.0 + 当前工具链下执行 `pnpm packages:build`，把 react-moveable、croact-moveable、preact-moveable、moveable、lit-moveable、helper 的 `dist/` 和 `declaration/` 复制到 scratchpad 中作为基线。验证：基线中的文件清单与 design Context 的产物表一致（moveable 4 个 JS 产物、helper 4 个、lit 3 个、其余各 2 个，外加已有的 `.map`）
- [x] 1.2 在 scratchpad 中写临时对比脚本（需要的解析器等依赖也装在 scratchpad），对一份产物目录提取 design 决策 10 列出的各项：导出名集合；CJS 在所属包目录下 `require` 后的形状（类型、键集合、`default === 自身`、属性描述符）；外部模块清单；UMD 内联的包（基线按决策 10 由 ESM 产物的外部 import 推导，新产物读取 sourcemap 的 `sources`）和全局变量名；头部注释；体积；`declaration/` 文件列表。对基线运行，结果写入本 change 目录的 `baseline.md`。验证：`baseline.md` 覆盖 6 个包；preact-moveable 的 CJS 记录为 `Cannot find module '@egjs/agent'`（已知缺陷，见 design 决策 3）；其余 CJS 形状与 design Context 中的实测一致

## 2. TypeScript 6 与 tsconfig（design 决策 2、7）

- [x] 2.1 6 个包的 `typescript` 改为 `~6.0.3`，执行 `pnpm install`。验证：`pnpm why typescript` 显示这 6 个包用 6.0.3，vue3-moveable、svelte-moveable 和根目录仍为 4.8.x，croffle 仍为 4.5.x
- [x] 2.2 按 design 决策 7 修改 6 个包的 tsconfig：`target: es2022`；`lib` 对应 ES2022 + DOM；`module: esnext`；`moduleResolution: bundler`；`useDefineForClassFields: false`；删除 `baseUrl`（`paths` 改为相对路径）、`downlevelIteration`、`esModuleInterop: false`、moveable 的 `importHelpers`；每个 `tsconfig.declaration.json` 显式写 `rootDir`（preact 为 `./src/preact-moveable`，其余为 `./src`）；需要全局类型的显式写 `types`；删除 helper、preact、lit 的 `tsconfig.build.json`，react-moveable 的保留（`jsx: react`）。其余因 TS 6 报错的选项按编译结果逐项修改，不使用 `ignoreDeprecations`，修改项记录在 `baseline.md`。此时旧的 rollup 构建不要求可用。验证：6 个包的 `declaration` 脚本成功；`declaration/` 的文件列表与基线一致（没有出现 `declaration/src/`），内容差异只来自 TS 版本（逐类说明，写入 `baseline.md`）；react-moveable 的 `test:type`、`typecheck:stories` 通过
- [x] 2.3 执行 `pnpm test`（Storybook 测试读取的是改过的 tsconfig）。验证：所有 story 渲染、所有 play 断言通过，数量与改动前相同
- [x] 2.4 执行 react-moveable 和 helper 的 `lint`（ESLint 7 + typescript-eslint 5，TS 6）。验证：通过，只出现「不受支持的 TS 版本」警告的记录下来即可；如果解析失败，按 design 的风险条目停下来，先完成 `migrate-eslint-flat-config` 再继续

## 3. 共享 banner 与 helper（design 决策 1）

- [x] 3.1 新建根目录 `config/build.mjs`：`banner(包目录)` 读取 `package.json` 和 `LICENSE`，返回与 `@daybrush/builder` 相同格式的头部注释；`sharedOptions(包目录)` 返回 6 个包共用的 `target`、`sourcemap`、`dts: false`、`banner`。只使用 `node:fs`。验证：对 6 个包分别调用，结果与基线产物开头的注释逐字相同
- [x] 3.2 helper 声明 `tsdown: ~0.23.1`，新建 `tsdown.config.mts`，每项都展开 `sharedOptions`，并用 `outputOptions.entryFileNames` 固定文件名：ESM（`helper.esm.js`）从 `index.ts`；CJS（`helper.cjs.js`）和 UMD（`helper.js`、压缩的 `helper.min.js`）从 `index.umd.ts`，`exports: "default"`；UMD 全局名 `MoveableHelper`，`deps.alwaysBundle` 匹配所有模块；ESM/CJS 加 `deps.onlyBundle: []`。删除 `src/index.cjs.ts`；`build` 脚本改为 lint → tsdown → `declaration`。验证：`dist/` 文件与 spec「各包的产物文件」完全一致（没有 `.mjs`/`.cjs`/`.d.ts`）；对比脚本显示 helper 的导出名、CJS 键集合、外部模块、UMD 全局名与基线一致，属性描述符差异符合 design 决策 5；产物中没有 `tslib` 或 `@oxc-project/runtime` 的外部引用；`helper.min.js` 以 banner 开头，`helper.min.js.map` 的 `sources` 指向 `src/`；`pnpm --filter @moveable/helper test` 通过

## 4. react-moveable、croact-moveable、preact-moveable（design 决策 3、4、5）

- [x] 4.1 react-moveable 声明 tsdown，新建 `tsdown.config.mts`，指向 `tsconfig.build.json`（`jsx: react`），通用项同 3.2（`sharedOptions`）：ESM（`moveable.esm.js`）从 `index.ts`；CJS（`moveable.cjs.js`）从 `index.umd.ts`，`exports: "default"`；`deps.neverBundle: ["react", "react-dom"]`，注释说明改为 peerDependencies 留给第 6 步；`deps.onlyBundle: []`。把 `src/index.umd.ts` 改写为 design 决策 5 的形式（删除 `module.exports` 和 `export *` 两行）。`build` 脚本改为 lint → test:type → tsdown → `declaration`。验证：CJS 形状与基线相同（Moveable 函数、具名导出是它的属性、`default` 指向自身、没有 `__esModule`）；外部模块清单与基线相同；产物中 `InitialMoveable` 的 `@withMethods` 编译为 `__decorate(...)`，代理方法没有被输出为同名的实例字段；JSX 编译为 `createElement`，不出现 `react/jsx-runtime`
- [x] 4.2 croact-moveable 删除多余的 `react-css-styled` 依赖，声明 tsdown，新建配置：ESM 从 `index.ts`，CJS 从 `index.umd.ts`（改写为决策 5 的形式）；`deps.alwaysBundle: ["react-moveable"]`；`deps.neverBundle: ["react", "react-dom", "react-css-styled"]`；`outputOptions.paths`：`react`、`react-dom` → `croact`，`react-css-styled` → `croact-css-styled`；`inputOptions.resolve.mainFields: ["module", "main"]`。实测 `deps.onlyBundle` 是否需要列出 react-moveable，并把结论写入 design 决策 3。验证：外部模块清单与基线相同，不出现 `react`、`react-dom`、`react/jsx-runtime`、`react-css-styled`；sourcemap 的 `sources` 显示内联的是 `react-moveable/dist/moveable.esm.js`，没有任何 node_modules 包被内联（croact 不能被内联）；CJS 形状与基线相同
- [x] 4.3 preact-moveable 的 `dependencies` 补上 `@egjs/agent`、`@daybrush/utils`、`@scena/matrix`、`css-to-mat`、`@egjs/children-differ`、`@scena/dragscroll`、`overlap-area`、`gesto`、`@egjs/list-differ`、`@scena/event-emitter`（基线中被意外内联，见 design 决策 3），版本与 react-moveable 相同；声明 tsdown，新建配置：入口 `src/preact-moveable/Moveable.ts`；`deps.alwaysBundle: ["react-moveable"]`；`deps.neverBundle: ["react", "react-dom", "react-css-styled", "preact"]`（preact 注释说明改为 peerDependencies 留给第 6 步）；`outputOptions.paths`：`react`、`react-dom` → `preact/compat`，`react-css-styled` → `preact-css-styled`；`mainFields` 同 4.2；CJS 为 `exports: "default"`。验证：在严格布局下从 preact-moveable 目录 `require` CJS 产物成功，结果是 Moveable 组件；外部模块清单与基线相同；没有任何 node_modules 包被内联

## 5. moveable 与 lit-moveable

- [x] 5.1 moveable 声明 tsdown，新建配置。ESM（`moveable.esm.js`）从 `index.ts`、CJS（`moveable.cjs.js`）从 `index.umd.ts`：`deps.neverBundle: ["react"]`，`outputOptions.paths`：`react` → `croact`、`react-moveable` → `croact-moveable`，`deps.onlyBundle: []`。UMD（`moveable.js`、压缩的 `moveable.min.js`）从 `index.umd.ts`：全局名 `Moveable`，`deps.alwaysBundle` 匹配所有模块，`alias` 把 `react`、`react-dom` 指向本包 `node_modules/croact` 的绝对路径，`mainFields` 同 4.2。CJS 和 UMD 都是 `exports: "default"`。删除 `src/index.cjs.ts`。验证：ESM/CJS 的外部模块清单与基线相同，包含 `croact`、`croact-moveable`，不包含 `react`、`react-moveable`；CJS 形状与基线相同；UMD 内联的包集合与基线推导结果相同，产物中没有 `react` 引用
- [x] 5.2 在 scratchpad 写一个临时 HTML，用 react-moveable 已安装的 Playwright chromium 打开：引入新的 `moveable.min.js`，执行 spec「浏览器中直接使用」场景（能渲染、能拖动、`Moveable.PROPERTIES` 可访问），并给实例的 `draggable` 赋值后读回（spec「原生 moveable 的属性」）。验证：两个场景都通过；如果属性被实例字段遮住，按 design 决策 9 的退路停下来重新决定
- [x] 5.3 lit-moveable 声明 tsdown，新建配置：ESM 和 CJS 从 `index.ts`，具名导出，`deps.neverBundle: ["lit"]`（按前缀也覆盖 `lit/decorators.js`，注释说明 Lit 3 和 peerDependencies 留给第 4 步），`deps.onlyBundle: []`；UMD（`moveable.umd.js`）全局名 `UMD`，依赖全部内联。用 5.2 的临时页面引入 `moveable.umd.js`，创建 `<lit-moveable>` 并设置一个选项属性。验证：外部模块清单、CJS 键集合、UMD 全局名与基线相同，属性描述符差异符合 design 决策 5；元素重新渲染，内部 Moveable 实例拿到新值（spec「lit-moveable 的属性」）

## 6. 清理、CI 与文档

- [x] 6.1 从 6 个包删除 `rollup.config.js`、preact 的 `rollup.config.demo.js` 和 `demo/`、`src/demo/`、lit 的 `rollup.demo.config.js` 和 `demo/`、各包引用它们的 `start` 脚本、croact 的 `start` 脚本，以及 `packages:update`、`packages:dist` 等调用 pvu 的脚本；删除依赖 `@daybrush/builder`、`rollup`、`rollup-plugin-react-compat`、`rollup-plugin-preact`、`rollup-plugin-css-bundle`、`print-sizes`、`pvu`；检查 `.npmignore` 中与 rollup 相关的条目。执行 `pnpm install`。验证：这 6 个包的 `package.json` 和目录中搜不到 `rollup`、`@daybrush/builder`、`print-sizes`、`pvu`；锁文件中不再有 `@daybrush/builder`、`rollup-plugin-typescript2`、`rollup-plugin-react-compat`、`rollup-plugin-preact`
- [x] 6.2 `.github/workflows/run-e2e.yml` 在测试之前增加 `pnpm packages:build`。验证：推送后 CI 通过；用一个故意让 helper 构建失败的临时提交确认 CI 失败，并且日志中能看到包名；验证完 revert
- [x] 6.3 更新 `CLAUDE.md`：
  - `build` 的步骤说明；
  - 包依赖链中 croact/preact/moveable 的说明，改为 tsdown 的 `deps` 配置、`output.paths` 改名和 UMD 的绝对路径 alias，删除 `resolveOwnCroactPlugin` 的描述；
  - 补充四条约束：产物语法目标为 ES2022，`useDefineForClassFields: false` 不可去掉；JSX 必须是经典转换（croact 没有 jsx-runtime）；产物运行时 import 的包必须在 package.json 中声明；6 个包用 TS 6，vue3/svelte 仍为 4.8。

  验证：`CLAUDE.md` 中搜不到 `rollup`、`resolveOwnCroactPlugin`、`rollup-plugin-react-compat`
- [x] 6.4 更新 `openspec/ROADMAP.md`：第 3 步 `replace-build-with-tsdown` 标为已完成，写一段「已完成」摘要。验证：ROADMAP 表格和「已完成」一节都反映本 change

## 7. 全量验证

- [x] 7.1 在删除了 6 个包 `dist/`、`declaration/` 的工作区中执行 `pnpm packages:build`。验证：按拓扑顺序全部成功，包括 vue3-moveable（`vue-tsc` 读取 moveable 由 TS 6 生成的类型声明）和 svelte-moveable；构建输出中没有「无法解析的 import」或「依赖被当作外部模块」之类的警告；tsdown 的固定提示（如对 CJS 格式的「建议改用 ESM」）逐条列出，作为预期输出记入 `baseline.md`
- [x] 7.2 对新产物运行 1.2 的对比脚本，把逐项对比结果写入 `baseline.md`，每一处差异都说明原因。预期只有：语法目标、新增或修复的 sourcemap、preact 的 CJS 现在可以加载、helper 和 lit 导出对象的属性描述符、体积变化。结论摘要写入 design 的 Migration Plan。验证：没有无法解释的差异
- [x] 7.3 逐条检查 `specs/library-build` 中能在命令行验证的场景：用装在 scratchpad 的 acorn（`ecmaVersion: 2022`）解析所有产物；react-moveable 和 moveable 的 ESM/CJS 产物，以及 moveable UMD 中来自本仓库源码的部分没有 `__extends`、`extendStatics`；每个产物有 `sourceMappingURL` 和非空的 map；把 helper 的 `version` 临时改掉后重新构建，所有产物的 banner 跟着变化，然后改回。验证：全部通过，结果记入 `baseline.md`
- [x] 7.4 在全新克隆中依次执行 `pnpm install --frozen-lockfile && pnpm packages:build && pnpm --filter react-moveable exec playwright install chromium && pnpm --filter react-moveable typecheck:stories && pnpm test`。验证：全部成功；`openspec validate replace-build-with-tsdown --strict` 通过
