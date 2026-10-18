## Why

Storybook 的代码面板除了 React 和 CSS，还有 Script、Vue3、Svelte、Lit 四个 tab，内容由 croffle（`pnpm bake`）从 React story 自动翻译生成。这一层的问题是：

- 生成的代码没有任何检查，出错了也没人知道。用各框架的编译器检查现有输出：Svelte 133 个中 3 个编译失败，Vue 3 133 个中 1 个，Lit 131 个中 1 个，Script 131 个中 2 个。Svelte 版整体还是 Svelte 3 的写法（顶层 `let`、`on:drag`），而 svelte-moveable 已经只支持 Svelte 5。用到 svelte-selecto、svelte-infinite-viewer 的 6 个 Svelte 示例，在 Svelte 5 下运行时一定会出错（这两个包装组件把方法挂在组件原型上，2023 年后没有更新）。
- croffle 已经停止维护：最后一个版本 0.0.21 发布于 2023 年 6 月，GitHub 仓库已经无法访问。它内部锁定 TypeScript 4.5，所以 story 的 App 只能使用 TS 4.5 支持的语法。仓库中剩下的已弃用依赖（glob 8、inflight）和唯一的旧版 TypeScript（4.5.5）也都是它引入的。
- 要让它输出 Svelte 5 写法，只能继承它的 SvelteWaffle、依赖它的私有字段，这等于在一个停更的工具上继续加补丁。

代码 tab 是给使用者复制的，可信的前提是「展示的代码就是测试过的代码」。React tab 满足这一点：它就是 story 的 App 源码，每个 story 都在 Storybook 测试中真实渲染，并做了类型检查。其余 4 个 tab 是翻译出来的，没有经过测试。按用户的决定，本 change 去掉 croffle 和这 4 个 tab，先保证 React 示例完整可用。以后再加入 Vue3 示例，同样要满足「展示的代码经过测试」。

这是 ROADMAP 第 5 步「文档与部署」的最后一个 change。它替代了原计划的「改 croffle 的输出，让 Svelte 示例使用 Svelte 5 写法」。原计划在示例改完后去掉 svelte-moveable 对 `on:` 指令的支持，这一项同样在本 change 中完成：保留 `on:` 的唯一理由就是生成的 Svelte 示例在使用它。

## What Changes

- 删除 croffle：删除 `croffle.config.js`，删除 react-moveable 的 `bake` 脚本和根目录的 `bake` 转发脚本，删除 `croffle`、`@croffle/bakery` 依赖；`storybook`、`build:storybook`、`test`（根目录和 react-moveable）不再先执行 bake。
- Storybook 的代码面板只保留 React 和 CSS 两个 tab，删除 Script、Vue3、Svelte、Lit 四个 tab。story 文件只读取自己目录下的 App 源码。删除 `$preview_` 占位符的处理，以及已经没有调用方的 `convertSvelteTemplate`、`convertVueTemplate`、`convertVanillaTemplate`。
- 删除 `stories/tsconfig.json`、`.gitignore` 中对生成目录的排除和忽略规则，同时删除本地已生成的这些目录。
- React 示例中 import 的 story 目录下的 CSS 文件（目前是 `snap.css`、`safari.css`）也显示在 CSS tab 中，否则复制出来的代码缺少样式。
- **BREAKING**（svelte-moveable）：去掉 `on:` 指令的支持（`createEventDispatcher`），事件只能用回调 prop（`onDrag` 等）监听。只针对 `on:` 写法的测试改为测试 `bind:this` 取得的组件引用，类型测试中的 `on:` 用法删除，README 中关于 `on:` 的说明删除。
- `CLAUDE.md` 删除 bake、croffle、TS 4.5 相关的说明；`openspec/ROADMAP.md` 更新第 5 步，删除「已知遗留」中 croffle 和 glob 8 两条，并加入「以后加入 Vue3 示例」。

不在本次范围：

- 加入 Vue3 示例：以后单独做一个 change。
- 修改各框架包装组件本身（vue3、lit、preact 等）。svelte-moveable 只去掉 `on:`。
- React tab 中的包名：第 6 步改为 `@moveable-next/*` 时再一起修改。
- 是否继续发布 lit-moveable、preact-moveable 等框架包：属于第 6 步发布前的决策。

## Capabilities

### New Capabilities

（无）

### Modified Capabilities

- `framework-packages`：「Storybook 示例代码只覆盖受支持框架」改为代码面板只展示 React 和 CSS，不再自动翻译生成其他框架的示例；「svelte-moveable 的行为」去掉 `on:` 指令的监听方式，原来的「Storybook 示例的写法」场景改为通过 `bind:this` 调用方法。

## Impact

- react-moveable：`package.json`（脚本、依赖）、删除 `croffle.config.js`、`.gitignore`、`stories/tsconfig.json`、`stories/utils/story.tsx`、`stories/utils.ts`、20 个 `*.stories.tsx` 的 `sources` glob、`.storybook/addons/code-preview/render.test.ts`
- svelte-moveable：`src/Moveable.svelte`、`test/LegacyUsage.svelte`（改写为 runes 写法）、`test/SvelteMoveable.svelte.spec.ts`、`test/TypesUsage.svelte`、`README.md`
- 根目录：`package.json`（`bake`、`test` 脚本）
- `pnpm-lock.yaml`：删除 croffle、@croffle/bakery 及其独有的间接依赖（TypeScript 4.5.5、glob 8、inflight 等）。删除后仓库中没有已弃用的依赖，TypeScript 只剩一个版本。
- 文档：`CLAUDE.md`、`openspec/ROADMAP.md`
- 库的源码、构建产物、各包的发布内容（svelte-moveable 去掉 `on:` 除外）都不变；Storybook 中的 story 和交互测试不变
