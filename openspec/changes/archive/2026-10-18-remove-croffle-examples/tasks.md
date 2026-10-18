## 1. 基线

- [x] 1.1 记录改动前的状态，写入本 change 目录的 `baseline.md`：
  - 导出所有 story 的 React tab 文本：写一个临时的 Vitest 浏览器测试（放在 storybook project 能找到的位置，不提交），用 `composeStories` 导入全部 `*.stories.tsx`，把每个 story 的 `parameters.preview` 中 React tab 的模板按 story id 写成 JSON，保存到 scratchpad；
  - `pnpm why typescript@4.5.5 glob inflight -r` 的结果；
  - `pnpm test` 的通过数（测试文件数和用例数）。

  验证：`baseline.md` 中有这三项；JSON 中的 story 数等于 Storybook 中带代码预览的 story 数

## 2. 删除 croffle（design：删除 croffle、先删除本地生成目录）

- [x] 2.1 按 croffle 原来清理的范围（`packages/react-moveable/stories/**/<编号>-*/{script,vue3,svelte,lit}/`）删除本地生成目录，然后删除 `packages/react-moveable/.gitignore` 中对这些目录的忽略规则，以及 `stories/tsconfig.json` 中的 4 条 `exclude`。验证：`find packages/react-moveable/stories -type d \( -name script -o -name vue3 -o -name svelte -o -name lit \)` 没有输出；`git status` 中没有未跟踪的生成文件
- [x] 2.2 删除 `packages/react-moveable/croffle.config.js`；react-moveable 的 `package.json` 删除 `bake` 脚本和 devDependencies 中的 `croffle`、`@croffle/bakery`，`storybook`、`test`、`build:storybook` 去掉开头的 `pnpm bake && `；根 `package.json` 删除 `bake` 脚本，`test` 去掉开头的 `pnpm bake && `；执行 `pnpm install`。验证：
  - `pnpm why typescript@4.5.5 glob inflight -r` 中没有 TypeScript 4.5.5、glob 8、inflight；
  - 锁文件中搜不到 `croffle`；
  - 仓库中（排除 `openspec/changes/`、各包的 `CHANGELOG.md`、锁文件）搜不到 `croffle`、`pnpm bake`；
  - `pnpm install` 没有打印已弃用警告；`pnpm lint` 通过（包括依赖范围检查）

## 3. 代码面板（design：React 代码面板直接使用 App 源码、样式由 import 决定）

- [x] 3.1 `stories/utils/story.tsx`：删除 `GENERATED_TABS` 和占位符处理；按 design 从 App 源码中找出相对路径的样式 import，把 `sources` 中对应文件的内容加到 CSS tab 中（描述为文件名，排在默认样式之后），找不到对应文件时报错；更新 `AppStoryOptions.sources` 的注释。验证：`pnpm --filter react-moveable typecheck:stories` 通过
- [x] 3.2 20 个 `*.stories.tsx` 的 `sources` glob 改为 `./{*App.tsx,*.css}`。验证：`git grep -n "script/\*\*" -- 'packages/react-moveable/stories'` 没有输出
- [x] 3.3 `stories/utils.ts`：删除 `convertSvelteTemplate`、`convertVueTemplate`、`convertVanillaTemplate`；`convertTemplate` 去掉 `regex`、`includePrefix` 参数，固定按 `props.xxx` 匹配。`render.test.ts` 删除占位符用例，`renderTabs` 用例中的多文件示例从 Script tab 改为 CSS tab；`render.ts` 中引用 `convertTemplate` 的注释如果需要也一起更新。验证：`pnpm --filter react-moveable exec vitest run --project unit` 通过
- [x] 3.4 对比 React tab：重新执行 1.1 中的导出，与基线 JSON 对比，结果写入 `baseline.md`；然后删除临时测试。验证：所有 story 的 React tab 文本完全相同；`ReactChangingSnapContainerApp`、`ReactSafariApp` 两个 story 的 CSS tab 中分别有 `snap.css`、`safari.css` 的内容，其他 story 的 CSS tab 只有默认样式

## 4. svelte-moveable 去掉 `on:`（design：svelte-moveable 只保留回调 prop）

- [x] 4.1 `src/Moveable.svelte`：删除 `createEventDispatcher` 的 import、`dispatch` 的定义和注释，事件处理中只调用回调 prop。验证：`src/` 中搜不到 `dispatch`、`createEventDispatcher`
- [x] 4.2 `test/LegacyUsage.svelte` 用 `git mv` 改名为 `test/BindThisUsage.svelte`，改写为使用 runes 的组件（`$state` 绑定组件引用，`onDrag` 回调 prop）；`SvelteMoveable.svelte.spec.ts` 中对应的用例改名为与 spec 场景「在组件中通过 bind:this 使用」一致，断言不变（`transform` 包含新位置、`getRect().offsetWidth` 等于 200）；`test/TypesUsage.svelte` 删除 `on:dragEnd`。验证：`pnpm --filter svelte-moveable build`（包含 svelte-check、svelte-package、publint 和类型测试）通过；`pnpm exec vitest run --project "svelte-moveable (*)"` 通过
- [x] 4.3 `README.md` 删除关于 `on:` 的那一行。验证：README 中搜不到 `on:`、`detail`

## 5. 文档

- [x] 5.1 `CLAUDE.md`：
  - TypeScript 一节删除 croffle 使用 TS 4.5 的说明；
  - 常用命令中删除「先 bake」；
  - story 写法约定中，`sources` 的说明改为读取本目录的 App 源码和样式文件，代码 tab 只有 React / CSS，并说明 CSS tab 包含 App import 的样式；
  - 删除 `pnpm bake`（croffle）一段；
  - svelte-moveable 测试的说明改为 `test/BindThisUsage.svelte`。

  验证：`CLAUDE.md` 中搜不到 `bake`、`croffle`、`LegacyUsage`、`Script / Vue3`
- [x] 5.2 `openspec/ROADMAP.md`：
  - 第 5 步第三项改写为本 change 的做法和结果；
  - 「已知遗留」删除 croffle（TS 4.5）和 @croffle/bakery（glob 8、inflight）两条；
  - 第 6 步加入「React tab 中的包名随包名一起修改」；
  - 加入「以后加入 Vue3 示例，要求展示的代码经过测试」。

  验证：ROADMAP 中除了说明历史和本 change 的文字，搜不到 croffle

## 6. 全量检查

- [x] 6.1 在根目录依次执行 `pnpm lint`、`pnpm doc`、`pnpm packages:build`、`pnpm test`、`pnpm --filter react-moveable typecheck:stories`、`pnpm build:storybook`，结果写入 `baseline.md`。验证：全部成功；`pnpm test` 中 story 测试的数量与 1.1 相同，svelte-moveable 的用例数与 1.1 相同；执行后 story 目录中没有 script、vue3、svelte、lit 子目录
- [x] 6.2 用 `pnpm storybook` 在浏览器中检查：任选 3 个 story（包含 `Test Changing Snap Container`）打开代码面板。验证：只有 React 和 CSS 两个 tab；在 controls 中切换 `draggable` 后，React tab 中的值随之变化；`Test Changing Snap Container` 的 CSS tab 中有 `snap.css`
