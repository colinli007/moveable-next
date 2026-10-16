## 1. 基线

- [x] 1.1 执行 `pnpm packages:build`，记录 svelte-moveable 的基线：
  - `dist/` 的文件列表
  - `dist/index.js` 的具名导出和 `export *`
  - `pnpm peers check` 的输出
  - 用包里现有的 Svelte 4.2 编译 `packages/react-moveable/stories/**/svelte/**/*.svelte` 的结果（scratchpad 中的脚本，按 design 的 Context 改写）

  验证：本 change 目录下有 `baseline.md`，其中示例的编译结果是 133 个中 4 个失败：design 的 Context 中 croffle 的 3 个，加上 Svelte 4.2 编译器自身出错的 `ReactOriginFillboxApp`

## 2. 换工具链，升级 Svelte 5（源码不改内容，design 决策 3、5、6）

- [x] 2.1 用 `git mv` 把 `src/lib/Moveable.svelte`、`src/lib/index.js`、`src/lib/index.d.ts` 移到 `src/`。删除以下文件：`src/lib/index.umd.js`、`src/routes/`、`src/app.html`、`src/app.d.ts`、`vite.config.ts`、`svelte.config.js`；`.gitignore` 删去 `/build`、`/package`，保留 `/.svelte-kit`（svelte-package 的中间文件，design 决策 3）。验证：`git ls-files packages/svelte-moveable/src` 只有这三个文件
- [x] 2.2 改写 `tsconfig.json`（design 决策 3，不再继承 `.svelte-kit/tsconfig.json`）。`package.json` 的改动：
  - peerDependencies：`svelte: ^5.0.0`。
  - scripts：`build` 暂为 `svelte-package -i src && publint`，删除 `dev`、`preview`、`package`、`prepublishOnly`、`check`、`check:watch`。
  - devDependencies：
    - 删除 `@sveltejs/kit`、`@sveltejs/adapter-auto`、`tslib`。
    - `svelte` 改为 `^5.57.2`，`@sveltejs/package` 改为 `^3.0.1`，`svelte-check` 改为 `^4.7.6`，`publint` 改为 `^0.3.25`，`typescript` 改为 `~6.0.3`，`vite` 改为 `^8.3.4`。
  - dependencies：删除 `framework-utils`。

  执行 `pnpm install`。验证：
  - 锁文件中不再有 `@sveltejs/kit`、`vite@4`、`svelte@4`、`typescript@4.8`
  - `pnpm peers check` 没有任何问题（svelte2tsx 那一条消失）
  - 按需调整 `pnpm-workspace.yaml` 的 `allowBuilds`，`pnpm install` 没有被拦截的构建脚本提示
- [x] 2.3 执行 `pnpm --filter svelte-moveable build`。验证：
  - 构建成功，publint 没有报错
  - `dist/` 恰好是 `Moveable.svelte`、`Moveable.svelte.d.ts`、`index.js`、`index.d.ts`
  - `index.js` 的导出与 1.1 相同

  结果记入 `baseline.md`

## 3. 测试（先在旧组件上运行，design 决策 4）

- [x] 3.1 devDependencies 新增 `@sveltejs/vite-plugin-svelte ^7.3.1`、`vitest 5.0.3`、`@vitest/browser-playwright 5.0.3`、`playwright ^1.64.0`，scripts 新增 `"test": "vitest run"`。新增 `vitest.config.mts`：`svelte({ configFile: false })` 插件，`browser`（浏览器）和 `ssr`（node）两个 project，Vitest 显示为 `svelte-moveable (browser)`、`svelte-moveable (ssr)`，与 react-moveable 的 `react-moveable (unit)` 相同。执行 `pnpm install`。验证：
  - `pnpm why playwright -r`、`pnpm why vite -r` 各只解析到一个版本
  - 在根目录执行 `pnpm exec vitest list --project "svelte-moveable (*)" --filesOnly` 不报错
- [x] 3.2 新增浏览器测试和服务端渲染测试，按 design 决策 4 的表：
  - `test/SvelteMoveable.svelte.spec.ts`：7 个测试（表中 7 行），从 `../../../config/testing/browser` import `createTarget`、`drag`
  - `test/LegacyUsage.svelte`：不用 runes，`bind:this` + `on:drag`
  - `test/SvelteMoveable.ssr.spec.ts` 和 `test/SsrPage.svelte`

  「挂载后修改 prop」等待 `setState` 时用 `getInstance().getManager().props`，不经过补上的方法。

  在根目录执行 `pnpm exec vitest run --project "svelte-moveable (*)"`。验证：
  - 失败的测试只有「调用方法」，以及「Storybook 示例的写法」中 `getRect()` 那一步，原因是方法不存在
  - 另有卸载引起的 unhandled rejection `Cannot read properties of null (reading 'setState')`（design 的 Context），单独运行「挂载后马上卸载」也会出现
  - 其余测试和服务端渲染测试通过

  失败的测试名、unhandled rejection 的数量和来源记入 `baseline.md`

## 4. 改写组件（design 决策 1、2）

- [x] 4.1 按 design 决策 1 改写 `src/Moveable.svelte`：runes 模式，`<script lang="ts">`，标注了类型的 `$props()`，`PROPERTIES`、`EVENTS` 收窄为对应的键类型，`onMount` 返回清理函数，`$effect` 中 `setState`，保留 `dispatch`；删除未使用的 `isUndefined`。
  - `src/index.js` 改为 `src/index.ts`：按 design 决策 2 写包装组件，服务端渲染时跳过补方法，并在这一处用一行注释说明。
  - 删除 `src/index.d.ts`。
  - `build` 改为 `svelte-check --tsconfig ./tsconfig.json --fail-on-warnings && svelte-package -i src && publint`。

  验证：
  - `pnpm --filter svelte-moveable build` 成功，svelte-check 没有错误和警告
  - `dist/` 是 `Moveable.svelte`、`Moveable.svelte.d.ts`、`index.js`、`index.d.ts`
  - `Moveable.svelte.d.ts` 中 props 的类型不再是 `[x: string]: any`
- [x] 4.2 在根目录执行 `pnpm exec vitest run --project "svelte-moveable (*)"`。验证：全部测试通过，输出中没有 unhandled error，测试代码与 3.2 相同
- [x] 4.3 新增类型测试：`test/types.ts`、`test/TypesUsage.svelte`（design 决策 4），以及 `tsconfig.test.json`（继承 `tsconfig.json`，只包含这两个文件）。scripts 新增 `"test:type": "svelte-check --tsconfig ./tsconfig.test.json"`，`build` 末尾加上 `&& pnpm run test:type`。验证：
  - `pnpm --filter svelte-moveable build` 成功
  - 把 `@ts-expect-error` 那一行的值改为正确的类型后报 unused directive，把 `e.transform` 赋给 `number` 后报类型错误，确认后改回
- [x] 4.4 用 Svelte 5 编译全部生成示例（1.1 的脚本改用 svelte-moveable 现在的 svelte）。验证：133 个中只有 croffle 的那 3 个失败，比 1.1 少了 `ReactOriginFillboxApp`。结果记入 `baseline.md`

## 5. lint 与文档

- [x] 5.1 根目录 `eslint.config.mjs` 的 `files` 加入 `packages/svelte-moveable/src/**/*.ts`。验证：
  - `pnpm lint` 通过
  - 在 `src/index.ts` 中临时加一个未使用的 import，`pnpm lint` 报出该文件和规则名，确认后删除
- [x] 5.2 修正 svelte-moveable 的 README：
  - 安装说明写明需要 Svelte 5（`npm i svelte-moveable svelte`）。
  - 用法示例改用 Svelte 5 写法：`$state`、`onDrag` 等回调 prop、`bind:this` 后调用方法。
  - 说明 `on:drag` 仍可使用但已弃用：参数在 `detail` 中，且 `detail` 没有类型。
  - 说明对象和数组类型的选项要整体赋值，深层修改不会生效（design 决策 1）。
  - 删除「Developments」一节。

  验证：README 中搜不到 `npm run dev`、`localhost:5000`、`pinchable="false"`
- [x] 5.3 更新 `CLAUDE.md`：
  - TypeScript 一条：svelte-moveable 归入 `~6.0.3`，删除 svelte 用 TS 4.8 的例外和「不要写 TS 5+ 语法」的限制；加上 `.svelte` 组件以 TS 源码发布、只能写类型标注。
  - Lint 一条：范围加上 svelte-moveable 的 `src/**/*.ts`。
  - Vitest 一行：加上 svelte-moveable 的两个 project。
  - 框架包装测试一段：加上 svelte-moveable（`.svelte.spec.ts` 中用 `$state` 改 prop、旧语法测试组件、服务端渲染测试、svelte-check 类型测试）。
  - `packages:build` 的说明：svelte-moveable 的构建包含 svelte-check、publint 和类型测试。
  - `.github/workflows/run-e2e.yml` 中 Lint 步骤的注释加上 svelte-moveable。

  验证：`CLAUDE.md` 中搜不到 `4.8`、`TS 5+`
- [x] 5.4 更新 `openspec/ROADMAP.md`：
  - 第 4 步表格中 `upgrade-svelte-5` 标为进行中。
  - 「待进行」中 Svelte 一条标明由本 change 完成。
  - 第 5 步加入：把生成的 Svelte 示例改为 Svelte 5 写法（`$state`、回调 prop），需要改 croffle 的输出；修复 3 个编译失败的示例；示例改完后去掉 `on:` 指令的支持。

  验证：表格、「待进行」和第 5 步都反映以上内容

## 6. 全量验证

- [x] 6.1 推送后确认 CI 通过，Run tests 步骤的日志中有 svelte-moveable 两个 project 的测试。再用一个让 svelte-moveable 测试失败的临时提交（例如把 `src/index.ts` 中补方法的循环删掉）确认 CI 在 Run tests 步骤失败，日志中有失败的测试名称。验证完 revert。结果记入 `baseline.md`
- [x] 6.2 在全新克隆中执行 `pnpm install --frozen-lockfile && pnpm lint && pnpm packages:build && pnpm --filter react-moveable exec playwright install chromium && pnpm --filter react-moveable typecheck:stories && pnpm test`。验证：
  - 全部成功，测试结果中包含 lit-moveable、vue3-moveable、svelte-moveable 的测试
  - `openspec validate upgrade-svelte-5 --strict` 通过
