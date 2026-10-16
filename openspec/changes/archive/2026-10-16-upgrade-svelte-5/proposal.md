## Why

svelte-moveable 是仓库里最后一个停在旧框架和旧工具链上的包：
- Svelte 4.2、SvelteKit 1、Vite 4、TypeScript 4.8。
- `pnpm install` 一直报 `svelte2tsx` 要求 TS `^4.9.4` 的 unmet peer。
- 这个包没有任何运行时测试。

在 scratchpad 中用 Svelte 5.57.2 验证，现有组件在 Svelte 5 下有两个问题：
- 组件变成了函数，不再是类。现在 `index.js` 把 moveable 的方法挂到组件类原型上，这种做法失效：通过 `bind:this` 拿到的引用上只有 `getInstance`，`getRect()` 等方法都不存在。
- 挂载后马上卸载时，`beforeUpdate` 中延迟执行的 `setState` 在 `destroy()` 之后运行，抛出 unhandled rejection。

其余行为（prop、`on:` 事件、`onDrag` 回调 prop、卸载销毁）仍然正常。

这是 ROADMAP 第 4 步「框架包装升级」的第三个 change，前两个是 `upgrade-lit-3` 和 `migrate-vue3-to-tsdown`。

## What Changes

- 给 svelte-moveable 增加浏览器测试，沿用前两个 change 的做法：Vitest 浏览器模式，针对构建产物，由根目录 `pnpm test` 执行。检查以下各项：
  - 渲染出控制框
  - prop 变化传给内部的 moveable
  - 回调 prop 收到事件
  - 通过组件引用调用方法
  - 卸载后销毁
  - Storybook 生成的 Svelte 示例所用的写法（旧语法组件中的 `on:drag` 和 `bind:this`）

  另加一个服务端渲染测试和一份类型测试（用 svelte-check 按使用者的写法检查 prop、回调参数、组件引用上的方法）。测试先在只换了工具链、源码未改的组件上运行，记录哪些失败（预期是方法相关的测试和卸载时的 unhandled rejection），改写源码后全部通过。
- Svelte 升到 **5**，peerDependency 改为 `svelte: ^5.0.0`。**BREAKING**：使用者需要 Svelte 5。
- 组件改写为 runes 模式加 TypeScript（`<script lang="ts">`，`$props()`、`$effect`），替代已弃用的 `beforeUpdate`、`$$props`。对外行为不变：
  - 选项仍是 prop，`onDrag` 等回调 prop 和 `on:drag` 指令两种监听方式都保留。`on:` 指令在 Svelte 5 中已弃用，但 croffle 生成的 133 个 Svelte 示例全部使用它，而且这种写法是 croffle 内部固定的，所以本次保留。
  - 方法改由 `src/index.ts` 中一层包装组件提供：调用内部组件，在它返回的组件引用上补上 moveable 的全部方法。`bind:this` 和 `mount()` 得到的引用上都能直接调用 `getRect()` 等方法。方法列表仍来自 moveable 的 `METHODS`，react-moveable 新增的方法会自动出现。
- 类型声明改为从源码生成（svelte-package + svelte2tsx），删除手写的 `index.d.ts`。prop 的类型是 moveable 的选项加上各事件的回调 prop，组件引用的类型包含 moveable 的方法。**BREAKING**（只影响类型）：
  - 不再导出 `SvelteMoveableEvents`，去掉了用来附加 prop 类型的泛型参数。
  - `on:drag` 的 `detail` 变为 `any`：Svelte 5 的组件类型无法描述 `on:` 事件。回调 prop 的参数仍有精确类型。
- 父组件对 `$state` 对象的深层修改（如 `bounds.left = 100`）不再传给 moveable，要整体赋值，与 vue3-moveable、react-moveable 一致（design 决策 1）。
- 构建去掉 SvelteKit：
  - 删除 `vite build` 构建的演示应用：`src/routes/`、`src/app.html`、`src/app.d.ts`、`vite.config.ts`、`svelte.config.js`。
  - 删除没有被 `exports` 引用的 `index.umd.js`。
  - 源码从 `src/lib/` 移到 `src/`。
  - 构建依次执行四步：svelte-check 检查源码，svelte-package 输出到 `dist/`，publint 检查包的入口字段，最后执行类型测试。
  - `package.json` 的 `svelte`、`types`、`exports` 指向的文件路径不变。
- 依赖：
  - 删除：@sveltejs/kit、@sveltejs/adapter-auto、tslib，以及源码没有用到的 `framework-utils`。
  - 升级：@sveltejs/package 2 → 3、svelte-check 3 → 4、publint 0.1 → 0.3、vite 4 → 8（作为 vite-plugin-svelte 的 peer，供测试使用）、TypeScript 4.8 → `~6.0.3`。
  - 新增测试依赖：@sveltejs/vite-plugin-svelte、vitest、@vitest/browser-playwright、playwright。
  - 删除 `dev`、`preview`、`package`、`prepublishOnly`、`check`、`check:watch` 脚本。删除 `prepublishOnly` 与「本阶段不提供 npm 发布入口」一致。
- svelte-moveable 的 `src/**/*.ts` 纳入根目录的 lint 范围（`.svelte` 文件不在 ESLint 范围内，其中的 TS 由 svelte-check 检查）。
- 修正 README：
  - 安装说明写明需要 Svelte 5。
  - 用法示例改为回调 prop，并说明 `on:` 指令仍可用但已弃用，以及如何通过 `bind:this` 调用方法。
  - 删除指向已删除的 `npm run dev` 的「Developments」一节。

不在本次范围：
- 把 Storybook 的 Svelte 示例改成 Svelte 5 的写法（`$state`、回调 prop）。这需要改 croffle 的输出，留给第 5 步（文档与部署），记入 ROADMAP。
- 3 个在 Svelte 4 下就编译失败的生成示例（croffle 的已有问题，见 design 的 Context）。
- 去掉 `on:` 指令的支持：要等示例改写之后。
- 包名、`files` 的整理（第 6 步）。

## Capabilities

### New Capabilities

（无）

### Modified Capabilities

- `framework-packages`：
  - 新增「svelte-moveable 的行为」，覆盖以下各项：
    - 渲染、prop
    - 两种事件监听方式
    - 组件引用上的方法
    - 卸载、服务端渲染
    - 类型声明
    - Svelte 5 peer 声明
  - 「框架包装的浏览器测试」的覆盖范围加上 svelte-moveable。
- `monorepo-tooling`：
  - 「代码检查」的范围加入 svelte-moveable。
  - 「CI 执行全部自动化检查」的「框架包装测试失败」场景加上 svelte-moveable。

## Impact

- svelte-moveable：
  - 源码从 `src/lib/` 移到 `src/`，`index.js` 改为 `index.ts`，`Moveable.svelte` 改为 runes 模式加 TS，删除 `index.d.ts`、`index.umd.js`。
  - 改写 `package.json`：依赖、脚本、peer。
  - 改写 `tsconfig.json`（不再继承 `.svelte-kit/tsconfig.json`），新增 `tsconfig.test.json`、`vitest.config.mts` 和 `test/`。
  - 删除 SvelteKit 演示应用和相关配置。
  - 修改 README 和 `.gitignore`。
  - 产物 `dist/` 中不再有 `index.umd.js`、`index.umd.d.ts`。`Moveable.svelte` 以 TS 源码发布，由使用者的 Svelte 5 编译。
- 根目录：
  - `eslint.config.mjs` 的 `files` 加入 svelte-moveable。
  - `pnpm test` 多执行 svelte-moveable 的浏览器测试和服务端渲染测试。
  - `pnpm packages:build` 中 svelte-moveable 的构建包含 svelte-check、publint 和类型测试。
  - `pnpm-workspace.yaml` 的 `allowBuilds` 删去不再存在的 `@sveltejs/kit`、`svelte-preprocess` 两项及相关注释。
- `pnpm-lock.yaml`：
  - 删除 SvelteKit 1、Vite 4、svelte-preprocess、TS 4.8 及它们的传递依赖。
  - svelte 4.2 → 5.57。
  - `pnpm peers check` 不再有 svelte2tsx 那一条。
- 文档：`CLAUDE.md`（TypeScript 一条不再有 4.8 的例外和由此而来的语法限制，lint 范围、测试说明）、`openspec/ROADMAP.md`、CI 配置中的注释。
- 其它包的产物不受影响。Storybook 生成的 Svelte 示例代码不变。
