## Why

vue3-moveable 是仓库里最后一个还在用老工具链的库包：
- 构建用 Vite 4 lib 模式 + vite-plugin-dts 3.0 beta + vue-tsc 1.8，TypeScript 锁在 4.8。
- 产物没有 sourcemap 和头部注释，也不受 `library-build` spec 约束。
- `main` 指向不存在的 `dist/moveable.cjs.js`（实际文件是 `moveable.cjs`），已发布的 0.28.0 同样如此，所以 `require("vue3-moveable")` 一直是坏的。
- 这个包也没有任何运行时测试。

这套工具链只是为了编译一个 SFC，而这个 SFC 的模板只有一行 `<div ref="moveableElement">`，全部逻辑都在 `defineComponent` 的选项对象里。把它改写成普通的 `.ts`，就可以像另外 6 个库包一样用 tsdown + tsc 构建，Vue 的构建工具链整套不再需要，以后也就不用再升级。

这是 ROADMAP 第 4 步「框架包装升级」的第二个 change（第一个是 `upgrade-lit-3`，原计划名为 `upgrade-vue-toolchain`）。

## What Changes

- 给 vue3-moveable 增加浏览器测试，沿用 `upgrade-lit-3` 确定的做法：Vitest 浏览器模式，针对构建产物，由根目录 `pnpm test` 执行。检查以下五项：
  - 渲染出控制框
  - prop 变化传给内部的 moveable
  - 拖动时 emit 事件
  - 通过组件 ref 调用方法
  - 卸载后销毁

  另加一份类型测试，用使用者的方式检查类型声明：prop 类型、事件参数类型、实例方法。两种测试在迁移前保存的 Vite 产物和迁移后的产物上都要通过。
- 源码改为普通 TypeScript：`src/components/Moveable.vue` 改为 `src/VueMoveable.ts`，模板换成等价的渲染函数 `h("div", { ref: "moveableElement" })`，其余逻辑不变。`src/components/index.ts` 移到 `src/index.ts`。
- 构建改为 tsdown（每包一份 `tsdown.config.mts`，共用 `config/build.mjs`），类型声明由 tsc 输出到 `declaration/`。TypeScript 升到 `~6.0.3`。
- 产物文件和入口字段与其它库包对齐：
  - `dist/moveable.esm.js`、`dist/moveable.cjs.js`，各带 sourcemap 和头部注释。
  - `main` 原本就写的是 `dist/moveable.cjs.js`，现在终于指向存在的文件。
  - `module` 从 `dist/moveable.js` 改为 `dist/moveable.esm.js`。
  - `types` 从 `dist/index.d.ts` 改为 `declaration/index.d.ts`。
  - 删除 `"type": "module"`，否则 `.js` 后缀的 CJS 产物会被 Node 当作 ESM。
  - **BREAKING**（只影响直接引用 `dist/` 内部文件路径的使用者）。
- CJS 形状保持现在 `moveable.cjs` 文件的形状：一个包含全部具名导出和 `default` 的对象，与 lit-moveable 相同。删除从未被构建使用过的 `src/components/index.umd.ts`，不新增 UMD。
- vue 升到 **3.5**，声明为 peerDependency `vue: ^3.5.0`。**BREAKING**：使用者需要 Vue 3.5+。
  - 现在源码用 `defineComponent<8 个类型参数>(...)` 声明组件类型。Vue 3.5 改了 `defineComponent` 的重载，这种写法会编译失败（已用原型验证），要改为对 `DefineComponent<...>` 类型的断言。生成的声明与现在等价。
- 删除依赖：vite、@vitejs/plugin-vue、vite-plugin-dts、vue-tsc、tslib，以及源码没有用到的 `framework-utils`。
- 删除 Vite 的开发演示：`index.html`、`src/main.ts`、`src/App.vue`、`src/style.css`、`src/vite-env.d.ts`、`vite.config.ts`、`tsconfig.node.json`、`.browserslistrc`，以及 `dev`、`preview` 脚本。新的浏览器测试代替演示页面的验证作用。
- vue3-moveable 的 `src` 纳入根目录的 lint 范围（6 个库包变为 7 个）。
- 修正 README：
  - 安装说明写明需要 Vue 3.5。
  - 删除指向不存在的 `npm run serve` 的「Developments」一节。

不在本次范围：
- Svelte 5（下一个 change `upgrade-svelte-5`）。
- vue3-moveable 的其它已有问题（见 design 的 Non-Goals），不改变行为。
- 包名、`exports`、`files` 的整理，React peer 范围（第 6 步）。

## Capabilities

### New Capabilities

（无）

### Modified Capabilities

- `framework-packages`：
  - 新增「vue3-moveable 的行为」：渲染、prop、事件、方法、卸载、类型声明，以及 Vue 3.5 peer 声明。
  - 「框架包装的浏览器测试」的覆盖范围加上 vue3-moveable。
  - 「不支持 Vue 2 与 Angular」删去对 `vue-template-compiler` 的例外：它只是 vue-tsc 的传递依赖，删除 vue-tsc 后锁文件中不再有它。
- `library-build`：
  - 「各包的产物文件」「类型声明位置」加入 vue3-moveable（6 个包变为 7 个）。
  - 「CJS 产物的导出形状」把 vue3-moveable 列为对象形状。
- `monorepo-tooling`：
  - 「代码检查」的范围加入 vue3-moveable。
  - 「CI 执行全部自动化检查」的「框架包装测试失败」场景加上 vue3-moveable。

## Impact

- vue3-moveable：
  - 源码从 `src/components/` 移到 `src/`，从 `.vue` 改为 `.ts`。
  - `package.json`：入口字段、依赖、脚本、peer。
  - 新增 `tsdown.config.mts`、`tsconfig.declaration.json`、`tsconfig.test.json`、`vitest.config.mts` 和 `test/`；改写 `tsconfig.json`。
  - 删除 Vite 相关文件和演示页面。
  - 修改 README。
- 根目录：
  - `eslint.config.mjs` 的 `files` 加入 vue3-moveable。
  - `pnpm test` 多执行 vue3-moveable 的浏览器测试。
  - `pnpm packages:build` 中 vue3-moveable 的构建会执行类型测试。
- `pnpm-lock.yaml`：
  - 删除 plugin-vue、vite-plugin-dts、vue-tsc 1.8 及其传递依赖（包括 `vue-template-compiler`）。vite 4 仍被 svelte-moveable 使用，留在锁文件中，只是 vue3-moveable 不再引用它。
  - vue 3.3 → 3.5。
  - 新增 vue3-moveable 的 tsdown、vitest、playwright（与其它包同版本）。
- 文档：`CLAUDE.md`（TypeScript 版本、库包数量、测试说明）、`openspec/ROADMAP.md`、CI 配置中的注释。
- 其它包的产物、Storybook 不受影响。bake 生成的 vue3 示例用法（`import Moveable from "vue3-moveable"`、`:draggable`、`@drag`、组件 ref 调用方法）不变。
