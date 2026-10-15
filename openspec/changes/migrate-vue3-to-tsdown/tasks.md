## 1. 现有 Vite 产物的基线

- [x] 1.1 执行 `pnpm packages:build`，记录 vue3-moveable 的产物基线，方法同 `archive/2026-10-13-upgrade-lit-3/baseline.md`（scratchpad 中的 `lit-baseline.cjs` 改为可以指定文件名）。记录以下各项：
  - `dist/moveable.js` 的 import、`export *`、具名导出
  - 直接 `require` `dist/moveable.cjs` 得到的形状（类型、键集合，`default === VueMoveable`）
  - ESM/CJS 的外部模块清单
  - `dist/` 下的类型声明文件列表

  原始结果存到 scratchpad，整个 `dist/` 也复制到 scratchpad 的 `vue-vite-dist/`，供第 4 节在旧产物上跑测试。验证：本 change 目录下有 `baseline.md`，其中的外部模块清单是 `moveable`、`vue`、`@daybrush/utils`

## 2. 测试辅助与依赖

- [x] 2.1 把 lit 测试中的 `createTarget`（只负责创建并插入 200×100、绝对定位于 50,50 的元素）和 `mouse`/`drag` 抽到 `config/testing/browser.ts`（design 决策 4，只用 DOM API）。lit 的测试改为从这里 import，清理逻辑仍留在 lit 的测试文件中。验证：在根目录执行 `pnpm exec vitest run --project lit-moveable`，5 个测试全部通过
- [x] 2.2 vue3-moveable 的 devDependencies 新增 `vitest 5.0.3`、`@vitest/browser-playwright 5.0.3`、`playwright ^1.64.0`，新增 `vitest.config.mts`（project 名 `vue3-moveable`，其余同 lit），scripts 新增 `"test": "vitest run"`，然后执行 `pnpm install`。验证：`pnpm why playwright -r` 显示各包解析到同一个版本。此时 vitest 还不能运行（design Risks：vite 4 被当作 vitest 的 peer），能否列出测试文件在 3.2 验证

## 3. 换成 tsdown（Vue 仍是 3.3，design 决策 1、2、6）

- [x] 3.1 源码迁移：
  - `src/components/Moveable.vue` 的 `<script>` 内容移到 `src/VueMoveable.ts`，选项对象中加 `render() { return h("div", { ref: "moveableElement" }); }`，类型写法不动。
  - `src/components/index.ts` 移为 `src/index.ts`，import 路径改为 `./VueMoveable`。
  - 删除以下文件：`src/components/`（含 `index.umd.ts`）、`src/App.vue`、`src/main.ts`、`src/style.css`、`src/vite-env.d.ts`、`index.html`、`vite.config.ts`、`tsconfig.node.json`、`.browserslistrc`。

  验证：`git ls-files packages/vue3-moveable/src` 只有 `index.ts`、`VueMoveable.ts`
- [x] 3.2 构建配置（vue 的 peerDependency 提前到这里加入，范围先写 `^3.3.4`，见 `baseline.md`）：
  - 新增 `tsdown.config.mts`（ESM `moveable.esm.js`，CJS `moveable.cjs.js` + `exports: "named"`，都设 `deps.onlyBundle: []`，没有 UMD）。
  - 改写 `tsconfig.json`（design 决策 6），新增 `tsconfig.declaration.json`（照 lit，`rootDir: ./src`）。
  - `package.json`：
    - 删除 `"type": "module"`；`module` 改为 `dist/moveable.esm.js`，`types` 改为 `declaration/index.d.ts`。
    - scripts 改为 `build: tsdown && pnpm run declaration`、`declaration: rm -rf declaration && tsc -p tsconfig.declaration.json`，删除 `dev`、`preview`（类型测试在 4.2 加入 `build`）。
    - devDependencies：删除 `vite`、`@vitejs/plugin-vue`、`vite-plugin-dts`、`vue-tsc`、`tslib`；`typescript` 改为 `~6.0.3`；新增 `tsdown`（与其它包相同的 `~0.23.1`）。
    - dependencies 删除 `framework-utils`。
  - 删除旧的 `dist/`，执行 `pnpm install`。

  验证：
  - 锁文件中不再有 `vite-plugin-dts`、`vue-tsc`、`@vitejs/plugin-vue`、`vue-template-compiler`
  - `pnpm peers check` 只有已知的 svelte `svelte2tsx` 一条（2.2 时出现的 vitest 的 vite peer 一条消失）
  - 在根目录执行 `pnpm exec vitest list --project vue3-moveable --filesOnly` 能列出测试文件
- [x] 3.3 执行 `pnpm --filter vue3-moveable build`。验证：
  - 构建成功，构建输出中没有 tsdown 的打包依赖提示或错误
  - `dist/` 恰好是 `moveable.esm.js`、`moveable.cjs.js` 和两个 `.map`
  - `declaration/` 是 `index.d.ts`、`VueMoveable.d.ts`
- [x] 3.4 与 1.1 的基线对比。验证：
  - ESM 的具名导出和 `export * from "moveable"` 不变
  - 在包目录中执行 `node -e 'require(".")'`（按 `main` 解析；包没有 `exports`，按包名引用自己会报 `MODULE_NOT_FOUND`）成功，形状与基线中 `moveable.cjs` 的形状相同
  - 外部模块清单不变
  - 产物有头部注释和 sourcemap
  - 声明文件列表的变化与 design 的 Risks 一致

  对比结果写入 `baseline.md`

## 4. 测试（先在保存的 Vite 产物上，再在新产物上）

- [x] 4.1 新增 `test/VueMoveable.spec.ts`：按 design 决策 4 的表写 5 个测试，import `../dist/moveable.esm.js`，用 `createApp` + `h` 挂载，用响应式状态改 prop。
  - 先把 scratchpad 的 `vue-vite-dist/` 复制到包内的 `dist-vite/`，import 临时改为 `../dist-vite/moveable.js`，在根目录执行 `pnpm exec vitest run --project vue3-moveable`。顺带确认 design Non-Goals 第一条：给组件加 `onClick` 后点击控制框，监听函数是否收到原生 `MouseEvent`。结论记入 `baseline.md`，不为它写测试。
  - import 改回 `../dist/moveable.esm.js`，再执行一次。

  验证：两次都是 5 个测试全部通过
- [x] 4.2 新增 `test/types.ts`（design 决策 4 的类型测试：正确的 prop 和 `onDrag`、带 `@ts-expect-error` 的错误 prop、实例方法 `getRect()`/`updateRect()`、作为子组件注册），以及 `tsconfig.test.json`（`noEmit`、`skipLibCheck: true`，只包含 `test/types.ts`），scripts 新增 `"test:type": "tsc -p tsconfig.test.json"`。
  - 先从 `../dist-vite/index` 导入，执行 `pnpm --filter vue3-moveable test:type`。
  - 再改为从 `../declaration` 导入，`build` 改为 `tsdown && pnpm run declaration && pnpm run test:type`，执行 `pnpm --filter vue3-moveable build`。
  - 删除 `dist-vite/`。

  验证：
  - 两次类型检查都通过
  - 把 `@ts-expect-error` 那一行的值临时改为正确的类型后，检查失败（报 unused directive），确认后改回
  - `git status` 中没有 `dist-vite/`

## 5. 升级到 Vue 3.5（design 决策 3、5）

- [x] 5.1 `package.json` 的 `peerDependencies.vue` 改为 `^3.5.0`，devDependencies 的 `vue` 改为 `^3.5.44`，执行 `pnpm install`，再执行 `pnpm --filter vue3-moveable build`。验证：声明生成失败，报 `TS2344`（与 design Context 一致），记入 `baseline.md`
- [x] 5.2 按 design 决策 3 把类型写法改为 `defineComponent({...} as any) as VueMoveableComponent`，在类型别名上方用一行注释说明为什么不能靠推断。验证：
  - `pnpm --filter vue3-moveable build` 成功（含类型测试）
  - `declaration/VueMoveable.d.ts` 中 `DefineComponent` 的前 8 个类型参数与 3.3 时相同，其余为默认值（3.3 的声明展开了全部参数，写法不同，不按文字对比）；类型测试通过
  - 锁文件中只有 vue 3.5
- [x] 5.3 在根目录执行 `pnpm exec vitest run --project vue3-moveable`。验证：5 个测试全部通过，与 3.3 时测试数量相同

## 6. lint 与文档

- [x] 6.1 根目录 `eslint.config.mjs` 的 `files` 加入 `vue3-moveable`。验证：
  - `pnpm lint` 通过
  - 在 `packages/vue3-moveable/src/VueMoveable.ts` 中临时加一个未使用的 import，`pnpm lint` 报出该文件和规则名，确认后删除
- [x] 6.2 修正 vue3-moveable 的 README：安装说明写明需要 Vue 3.5（`npm i vue3-moveable vue`），删除「Developments」一节（`npm run serve` 并不存在）。验证：README 中搜不到 `npm run serve`、`localhost:8080`
- [x] 6.3 更新 `CLAUDE.md`：
  - TypeScript 一条：vue3-moveable 归入 `~6.0.3`，只剩 svelte 是 `^4.8 <4.9`。
  - Lint 一条：6 个库包改为 7 个。
  - 构建一节：6 个库包改为 7 个，`neverBundle` 一条加上 vue3-moveable 的 vue 是 peerDependency。
  - Vitest 一行：加上 vue3-moveable 一个（浏览器）。
  - 框架包装测试一段：加上 vue3-moveable，以及共用的 `config/testing/browser.ts`。
  - `packages:build` 的说明：vue3-moveable 的构建包含类型测试。
  - `.github/workflows/run-e2e.yml` 中 Lint 步骤的注释 `six library packages` 改为 `seven`。

  验证：`CLAUDE.md` 中搜不到「6 个库包」和「vue3、svelte 仍是」；在仓库中（排除 `openspec/changes/archive/`）搜不到 `six library`
- [x] 6.4 更新 `openspec/ROADMAP.md`：
  - 第 4 步表格中 `upgrade-vue-toolchain` 改为本 change 名，「待进行」中 Vue 一条标明由本 change 完成，TS 一条只剩 svelte。
  - 「待进行」新增一个 change `bump-dependencies`（排在 `upgrade-svelte-5` 之后）：先把补丁和小版本统一升到最新，再逐个评估大版本（@babel/core 8、happy-dom 21、@types/node、keycon、preact 11 等），每次升级跑全量测试。
  - 写明暂缓升级的两项和触发条件：React 16 → 19 在第 6 步确定 peer 范围时决定；TypeScript 7 要等 typescript-eslint 支持，且 croffle 只能处理 TS 4 的 AST。

  验证：表格和「待进行」都反映本 change 和 `bump-dependencies`

## 7. 全量验证

- [ ] 7.1 推送后确认 CI 通过，Run tests 步骤的日志中有 vue3-moveable 的测试。再用一个让 vue3-moveable 测试失败的临时提交（例如把源码中的 `this.$emit(name, ...)` 改成别的事件名）确认 CI 在 Run tests 步骤失败，日志中有失败的测试名称。验证完 revert。结果记入 `baseline.md`
- [ ] 7.2 在全新克隆中执行 `pnpm install --frozen-lockfile && pnpm lint && pnpm packages:build && pnpm --filter react-moveable exec playwright install chromium && pnpm --filter react-moveable typecheck:stories && pnpm test`。验证：
  - 全部成功，测试结果中包含 lit-moveable 和 vue3-moveable 的测试
  - `openspec validate migrate-vue3-to-tsdown --strict` 通过
