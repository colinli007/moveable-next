# 基线与验证记录

## 1.1 Vite 产物的基线

`pnpm packages:build` 全部成功后，用 scratchpad 中的 `vue-baseline.cjs`（由 `lit-baseline.cjs` 改写：可以指定 ESM/CJS 文件名，去掉 UMD 部分，形状中加上 `default === VueMoveable`）读取 vue3-moveable 的产物，原始结果保存为 `vue-baseline-before.json`。方法与 `archive/2026-10-13-upgrade-lit-3/baseline.md` 相同：ESM 的 import / export 用文本解析，CJS 在 node 中 `require` 后看形状。

| 项 | Vite 4 + Vue 3.3.4 |
|---|---|
| dist 文件 | `moveable.js`、`moveable.cjs`、`index.d.ts`、`index.umd.d.ts`、`Moveable.vue.d.ts`，没有 `.map` |
| `declaration/` | 不存在 |
| 头部注释 | 没有 |
| ESM（1748 字节） | import：`@daybrush/utils`、`moveable`、`vue`；`export * from "moveable"`；具名导出 `VueMoveable`、`default` |
| CJS（2061 字节） | require 同上 3 个；直接 `require` `dist/moveable.cjs` 后是 object，键 `EVENTS`、`METHODS`、`PROPERTIES`、`VueMoveable`、`default`、`getElementInfo`、`makeAble`，`default === VueMoveable`，组件 `name` 为 `moveable` |
| 按 `main` 加载 | 在包目录中执行 `node -e 'require(".")'` 失败：`Cannot find module '.../dist/moveable.cjs.js'` |

外部模块清单是 `moveable`、`vue`、`@daybrush/utils`，与 design 的 Context 一致。

Vite 产物（整个 `dist/`）另外复制到 scratchpad 的 `vue-vite-dist/`，供第 4 节在旧产物上跑测试。

## 2.1 共用的测试辅助

`createTarget`、`mouse`、`drag` 移到 `config/testing/browser.ts`。lit 测试从这里 import，原来在 `createTarget`、`createMoveable` 中记录待清理元素的那一步改为测试文件内的 `track()`，`afterEach` 的清理逻辑不变。`pnpm exec vitest run --project lit-moveable`：5 个测试全部通过，Vite 能直接提供包目录以外的 `config/testing/browser.ts`。

## 2.2 测试依赖

vue3-moveable 的 devDependencies 新增 `vitest 5.0.3`、`@vitest/browser-playwright 5.0.3`、`playwright ^1.64.0`，新增 `vitest.config.mts` 和 `"test": "vitest run"`。`pnpm why playwright -r` 只解析到 `playwright@1.64.0`。

实施中的发现：vitest 5 把 vite 声明为必需的 peer（`^6.4.0 || ^7.0.0 || ^8.0.0`），vue3-moveable 此时自己依赖 vite 4.3.9，pnpm 把它交给 vitest，`pnpm peers check` 多出 `unmet peer vite` 一条，`vitest list --project vue3-moveable` 加载配置时报 `ERR_PACKAGE_PATH_NOT_EXPORTED: Package subpath './module-runner'`。所以调整了顺序：先换构建工具删掉 vite 4，再写测试，测试在保存的 Vite 产物和新产物上各跑一次（design Risks、Migration Plan 已更新）。

## 3.1 – 3.2 换成 tsdown

源码按 tasks 迁移（`git mv` 保留历史），`git ls-files packages/vue3-moveable/src` 只有 `index.ts`、`VueMoveable.ts`。`pnpm install` 后锁文件中没有 `vite-plugin-dts`、`vue-tsc`、`@vitejs/plugin-vue`、`vue-template-compiler`，`pnpm peers check` 只剩已知的 svelte `svelte2tsx` 一条，`vitest list --project vue3-moveable --filesOnly` 能列出 `packages/vue3-moveable/test/VueMoveable.spec.ts`。

与 tasks 的一处差异：vue 的 peerDependency 从 5.1 提前到 3.2 加入，范围先写 `^3.3.4`（与当时的开发版本一致），5.1 再改为 `^3.5.0`。原因是 vue 只作为 devDependency 时，tsdown 在 `deps.onlyBundle: []` 下判定它会被打进产物而报错（`@vue/shared is located in node_modules but is not included in deps.onlyBundle option`）。peer 本来就是 design 让 vue 成为外部模块的方式，提前加入不需要临时的 `neverBundle`。

## 3.3 – 3.4 构建与基线对比

`pnpm --filter vue3-moveable build` 成功，输出中除了 tsdown 的文件清单没有提示或错误。快照（`vue-baseline-after.json`）与基线对比：

| 项 | 结果 |
|---|---|
| dist 文件 | `moveable.esm.js`、`moveable.cjs.js` 及各自的 `.map` |
| `declaration/` | `index.d.ts`、`VueMoveable.d.ts`；不再有 `index.umd.d.ts`，`Moveable.vue.d.ts` 变为 `VueMoveable.d.ts`（与 design Risks 一致） |
| 头部注释 | 新增，ESM、CJS 相同（name / license / author / repository / version 0.28.0） |
| ESM import / `export *` / 具名导出 | 相同：`@daybrush/utils`、`moveable`、`vue`；`export * from "moveable"`；`VueMoveable`、`default` |
| CJS require / 形状 | 相同：3 个外部模块；object，7 个键，`default === VueMoveable`，组件 `name` 为 `moveable` |
| 按 `main` 加载 | 在包目录中 `node -e 'require(".")'` 成功，形状同上 |
| 体积 | ESM 1748 → 1514，CJS 2061 → 2939（tsdown 的 CJS 互操作辅助代码） |
| 类型声明内容 | `index.d.ts` 只有 import 路径 `./Moveable.vue` → `./VueMoveable`；`VueMoveable.d.ts` 与 `Moveable.vue.d.ts` 只有 TS 打印格式差异（省略默认泛型参数、`Array<T>` → `T[]`、联合成员顺序） |

## 4.1 浏览器测试

`test/VueMoveable.spec.ts` 按 design 决策 4 的表写了 5 个测试，用 `createApp` + `h` 挂载，prop 放在 `shallowReactive` 中，像模板那样整体传给组件。

- 把 Vite 产物复制到 `dist-vite/`、import 临时改为 `../dist-vite/moveable.js`：`pnpm exec vitest run --project vue3-moveable`，5 个测试全部通过。
- import 改回 `../dist/moveable.esm.js`：5 个测试全部通过。Vue 3.3 下测试输出中没有 Vue 的警告。

design Non-Goals 第一条的确认（在 Vite 产物上用临时测试文件，确认后删除）：组件同时传 `onClick`、`onDragStart`，在根元素上派发原生 `click` 时 `onClick` 收到的是 `MouseEvent`；派发原生 `dragstart`（`DragEvent`）时 `onDragStart` 没有被调用。与 design 的描述一致：只有单个单词、又与 DOM 事件同名的 `click` 会被原生事件误触发。

## 4.2 类型测试

`test/types.ts` 检查：prop 和 `onDrag` 的参数类型（参数由上下文推断，`e.transform` 赋给 `string`）、`@ts-expect-error` 标注的错误 prop、`InstanceType<typeof Moveable>` 上的 `getRect()`/`updateRect()`、作为子组件注册。`tsconfig.test.json` 继承 `tsconfig.json`（TS 6），只包含这个文件。

- 从 `../dist-vite/index`（vite-plugin-dts 生成的旧声明）导入：`test:type` 通过。把 `draggable: "yes"` 改为 `true` 后报 `TS2578: Unused '@ts-expect-error' directive`；把 `e.transform` 赋给 `number` 后报 `TS2322`。确认后改回。
- 改为从 `../declaration` 导入，`build` 改为 `tsdown && pnpm run declaration && pnpm run test:type`：`pnpm --filter vue3-moveable build` 成功；同样把 `draggable: "yes"` 改为 `true` 后报 `TS2578`，确认后改回。
- 删除 `dist-vite/`，`git status` 中没有它。

## 5.1 升级到 Vue 3.5

`peerDependencies.vue` 改为 `^3.5.0`，开发依赖 `vue` 改为 `^3.5.44`。`pnpm install` 后 `pnpm peers check` 只有已知的 svelte 一条。`pnpm --filter vue3-moveable build` 在声明生成一步失败：`src/VueMoveable.ts(31,5): error TS2344: Type '{}' does not satisfy the constraint 'string'.`，位置是 `defineComponent` 的第 3 个类型参数，与 design Context 一致。

## 5.2 类型写法

改为 `defineComponent({...} as any) as VueMoveableComponent`，`VueMoveableComponent` 是同样 8 个参数的 `DefineComponent` 类型别名，上方一行注释说明类型来自运行时生成的 `PROPERTIES`/`METHODS`/`EVENTS`。

- `pnpm --filter vue3-moveable build` 成功，包含类型测试。
- `declaration/VueMoveable.d.ts` 变为 `type VueMoveableComponent = DefineComponent<8 个参数>` 加 `declare const VueMoveable: VueMoveableComponent`。前 8 个参数与 3.3 时的声明（scratchpad `vue-decl-33/`）相同，3.3 的声明把方法和事件的映射类型展开、并写出了其余参数的默认值。
- 在 Vue 3.5 上重复 4.2 的两个反向检查：`TS2578`、`TS2322` 都能报出，确认后改回。
- 锁文件中只有 `vue@3.5.44`。

## 5.3 Vue 3.5 上的测试

`pnpm exec vitest run --project vue3-moveable`：5 个测试全部通过，与 3.3 时相同。输出中没有 Vue 的 feature flag 警告（design Risks 已按实测更新）。
