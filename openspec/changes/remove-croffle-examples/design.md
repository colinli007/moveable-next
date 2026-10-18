## Context

动机见 proposal.md 的 Why。和实现有关的现状：

- `pnpm bake` 执行 `packages/react-moveable/croffle.config.js`。这个文件在被 require 时就会执行 `cleanPaths("stories/**/+([0-9A-Za-z])-*/{script,vue3,svelte,lit}/")`，然后把每个 `React*App.tsx` 翻译成 4 个子目录中的代码。这些目录被 `packages/react-moveable/.gitignore` 忽略，被 `stories/tsconfig.json` 排除在类型检查之外。
- 20 个 `*.stories.tsx` 都用同一种写法读取源码：`import.meta.glob("./{*App.tsx,script/**,vue3/**,svelte/**,lit/**}", { query: "?raw", ... })`。`stories/utils/story.tsx` 的 `appStory` 先生成 React、CSS 两个 tab，再按 `GENERATED_TABS` 查找生成出来的文件，把其中的 `"$preview_xxx"` 占位符转换成参数模板。
- React tab 是 App 源码经过 `convertPath`（内部路径改为 `react-moveable`）和 `convertReactTemplate`（`props.xxx` 改为参数模板）得到的。CSS tab 固定是 `stories/templates/default.css`。
- `stories/utils.ts` 的 `convertTemplate(text, regex, includePrefix)` 中，`regex` 和 `includePrefix` 两个参数只有 `$preview_` 和已经没有调用方的 `convertSvelteTemplate`、`convertVueTemplate` 会传。
- 有 2 个 App 从自己的目录 import 样式：`99-Tests/ReactChangingSnapContainerApp.tsx` 的 `./snap.css`、`99-Tests/ReactSafariApp.tsx` 的 `./safari.css`，两者都是在侧边栏中可见的 story。它们的 CSS tab 现在只显示默认样式。
- svelte-moveable 的 `Moveable.svelte` 同时用回调 prop 和 `createEventDispatcher` 派发每个事件。`test/LegacyUsage.svelte` 按生成的 Svelte 示例的写法（不用 runes、`on:drag`）测试组件；`test/TypesUsage.svelte` 中有一处 `on:dragEnd`。
- `pnpm why` 的结果：TypeScript 4.5.5 只由 croffle 引入，glob 8 和 inflight 只由 @croffle/bakery 引入。

## Goals / Non-Goals

**Goals:**
- 删除 croffle 之后，story 的渲染、交互测试、React tab 的内容都和删除前一致。
- 代码面板只读取 story 目录中真实存在、被渲染的文件，没有生成步骤，也没有为生成代码保留的结构。

**Non-Goals:**
- 不为以后加入 Vue3 示例预留结构（如保留可扩展的 `GENERATED_TABS`）。到时 Vue 示例要不要真的渲染、怎么测试，由那个 change 单独设计。
- 不改 code-preview addon 的渲染方式（`renderTemplate`、`renderTabs` 和面板组件）。

## Decisions

### 删除 croffle，而不是继承 SvelteWaffle 或替换成别的翻译工具

评估过的做法：

| 做法 | 结论 |
|---|---|
| 继承 SvelteWaffle，替换生成 state 声明和事件属性的私有方法 `_getScript`/`_getTemplate` | 可以做出 Svelte 5 写法，但要依赖一个停更工具的私有字段，而且 Vue3、Lit、Script 的输出照样没有检查 |
| `pnpm patch croffle` | 违背 ROADMAP「替换老的包，而不是在老版本上打补丁」的原则 |
| 自己写一个覆盖 4 个目标的翻译器 | 要把 React hooks 转成各框架的状态和生命周期，Script 版还要转成命令式代码，规模在几千行，而且同样需要检查输出 |
| 手写 4 × 133 个示例 | 每改一个 story 要同步改 4 份 |
| **删除生成的示例，只展示 React** | 采用。展示的代码就是被渲染、被测试的代码，不需要另外的检查 |

### React 代码面板直接使用 App 源码

React tab 的生成方式不变（`convertPath` + `convertReactTemplate`）。删除 `GENERATED_TABS` 和占位符处理之后，`appStory` 只生成 React 和 CSS 两个 tab。20 个 story 文件的 `sources` glob 改为 `./{*App.tsx,*.css}`：所有 story 文件都用同样的写法，没有 CSS 文件的目录匹配为空即可。

`convertTemplate` 只剩 `convertReactTemplate` 一个调用方，而且只用默认的 `props.xxx` 规则，所以去掉 `regex` 和 `includePrefix` 两个参数，规则写死在函数中。`render.test.ts` 删除占位符那条用例；`renderTabs` 用例中的多文件示例从 Script tab 改为 CSS tab（删除之后，只有 CSS tab 会有多个文件）。

### App import 的样式由源码中的 import 决定要显示哪些

`appStory` 从 App 源码中找出 `import "./xxx.css"` 这类相对路径的样式 import，在 `sources` 中取出对应文件的内容，作为 CSS tab 的附加代码，描述写文件名，显示在默认样式之后。如果 App import 了某个样式文件，而 `sources` 中没有它，就像找不到 App 源码时一样直接报错，避免 story 文件的 glob 写错时悄悄漏掉样式。

考虑过的替代做法：在 `appStory` 的参数中手动列出样式文件。这样同一件事要在 import 和参数两处写，容易对不上。App 实际 import 了哪些文件，最准确的信息就是源码中的 import 语句本身。

### 先删除本地生成目录，再删除忽略规则

生成目录被 git 忽略，删掉 `.gitignore` 规则后，本地残留的目录会变成未跟踪文件，被误提交。实施时先按 croffle 原来清理的范围（`stories/**/<编号>-*/{script,vue3,svelte,lit}/`）删除这些目录，再删除 `.gitignore` 和 `stories/tsconfig.json` 中的规则。其他克隆删掉这些目录即可，写进 tasks 的验证步骤；仓库只有一位开发者，不另外提供清理脚本。

### svelte-moveable 只保留回调 prop

删除 `createEventDispatcher` 的 import、`dispatch` 的定义和注释，事件处理中只调用回调 prop。`test/LegacyUsage.svelte` 改写为使用 runes 的组件（`$state` 绑定引用、`onDrag` 回调 prop），改名为 `test/BindThisUsage.svelte`，对应 spec 中「在组件中通过 bind:this 使用」这个场景。`bind:this` 得到的引用上能调用方法，这一点只有这个测试覆盖（另一个方法测试用的是 `mount()` 的返回值），所以测试要保留，只是换写法。`TypesUsage.svelte` 删除 `on:dragEnd`。

不新增「`on:` 不再收到事件」的测试：它检查的是一段已经被删掉的代码，以后也没有理由把它加回来。

### spec 用「删除 + 新增」表示替换

OpenSpec 的 MODIFIED 不能删除场景，同名要求也不能同时删除和新增。所以两条要求都按「删除旧要求，新增一条新名字的要求」来写：「Storybook 示例代码只覆盖受支持框架」由「Storybook 代码面板展示经过测试的 React 示例」取代；「svelte-moveable 的行为」由「svelte-moveable 的组件行为」取代，除了去掉 `on:` 和替换一个场景，其余内容不变。

## Risks / Trade-offs

- [使用者失去每个 story 的 Script / Vue3 / Svelte / Lit 写法] → 各框架包的 README 中有用法示例。按 spec，以后的 Vue3 示例要经过测试才展示。
- [svelte-moveable 中使用 `on:drag` 的代码在升级后不再收到事件，而且不会报错] → proposal 中标为 **BREAKING**，README 只写回调 prop。第 6 步换作用域发布，本来就是一个新包。
- [删除 croffle 后 React tab 的内容意外变化] → 实施前后各导出一次所有 story 的 React tab 文本（`parameters.preview`）并对比，应该完全相同。

## Migration Plan

都是仓库内部的改动，没有部署步骤；回滚只需还原提交并重新 `pnpm install`。本地开发者需要删除残留的生成目录（见上文）。
