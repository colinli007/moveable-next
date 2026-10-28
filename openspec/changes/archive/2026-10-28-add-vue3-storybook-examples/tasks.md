## 1. 依赖与前置验证（design 决策 5、7 和 Risks）

- [x] 1.1 `vue` 移入 `pnpm-workspace.yaml` 的 catalog（vue3-moveable 改为 `catalog:`），react-moveable 的 devDependencies 增加 `vue`（`catalog:`）、`@vitejs/plugin-vue`、`vue-tsc`；`pnpm install` 成功，`pnpm lint`（含重复范围检查）通过；确认 react-moveable 和 vue3-moveable 的 `node_modules/vue` 指向同一个真实路径
- [x] 1.2 验证 vue-tsc 与 TypeScript 6.0：在 react-moveable 中临时写一个最小的 `.vue`（`<script setup lang="ts">` + 一处故意的类型错误），用 vue-tsc 检查，确认能报出这个错误、去掉后通过；不兼容时按 design Risks 中的退路处理，并先更新 design 再继续；删除临时文件
- [x] 1.3 验证周边包：在仓库外的临时目录中，用 pnpm 严格布局（`--config.hoist=false`）安装 vue 3.5、vue3-selecto、vue3-infinite-viewer、selecto、infinite-viewer，用 Vite 跑一个最小页面，分别挂载 vue3-selecto 和 vue3-infinite-viewer（框选能选中元素，视图能滚动缩放）；把结论（直接用 / 补 `packageExtensions` 后用 / 改用原生包）写进 design 决策 7，再继续第 4 组

## 2. vue3-moveable 的 `emits` 修复（design 决策 8）

- [x] 2.1 `test/VueMoveable.spec.ts` 新增用例：组件设置 `@click`，在控制点上按下并松开（不移动），断言监听器的每次调用参数都不是 `MouseEvent`；`pnpm --filter @moveable-next/vue3 build` 后执行该包测试，确认新用例失败
- [x] 2.2 `src/VueMoveable.ts` 的 `defineComponent` 增加 `emits: EVENTS`；重新构建（含类型测试）后该包测试全部通过，`pnpm lint` 通过
- [x] 2.3 新增 `@moveable-next/vue3` 的 patch changeset，说明修复的行为；`pnpm changeset status` 显示四个 fixed 包将升 patch、helper 不变

## 3. Storybook 基础设施与试点目录（design 决策 1–7）

- [x] 3.1 react-moveable 的 `tsconfig.json` 增加 `paths`：`@/vue3-moveable` → `../vue3-moveable/src/`；`.storybook/main.ts` 的 `viteFinal` 加入 `@vitejs/plugin-vue`；`pnpm storybook` 能启动，React 模式下所有 story 照常渲染
- [x] 3.2 `.storybook/preview.tsx` 增加 global `framework`（工具栏 React / Vue，`initialGlobals` 为 `react`）；在 Storybook 中能切换，URL 中带上 `globals=framework:vue`
- [x] 3.3 `stories/utils.ts` 新增 `convertVueTemplate`（包名别名替换、去掉可能跨多行的 `const props = defineProps<...>()`、复用 `convertTemplate`）；代码面板的 `render.ts` 增加单引号字面量的值格式（`Preview` 上的选项）；在 `.storybook/addons/code-preview/render.test.ts`（或同目录新测试文件）中覆盖：单行和多行 `defineProps` 被去掉、字符串 / 数组 / 对象参数在 Vue tab 中是单引号字面量、React tab 的输出不变；`pnpm exec vitest run --project unit` 通过
- [x] 3.4 `stories/utils/story.tsx` 的 `appStory`：接收 Vue App 的懒加载 glob 和 `.vue` 的 `?raw` 源码，按 `React<Name>App.tsx` → `Vue<Name>App.vue` 配对，找不到时抛出带期望文件名的错误；`vue: false` 选项；生成只在 Vue 模式下加载的 `loaders`；Vue 模式下的 `render` 用 `shallowReactive` + `createApp` 挂载、参数变化时更新、卸载时 `unmount`；`vue: false` 时 Vue 模式渲染说明文字；`preview` 按框架生成两组 tab（每项带 `framework`）。`pnpm --filter @moveable-next/react typecheck:stories` 通过
- [x] 3.5 代码面板 `manager.tsx` 用 `useGlobals()` 读取 `framework`，只显示当前框架的 tab；在 Storybook 中切换框架时 tab 随之切换，修改 controls 后当前 tab 的参数值同步更新
- [x] 3.6 `stories/tsconfig.json` 的 `include` 加上 `./**/*.vue`，`typecheck:stories` 改为 `vue-tsc -p stories`（见 design 决策 7）；在一个 Vue 示例中临时给 Moveable 传类型不符的 prop，确认命令失败并指出 `.vue` 文件和行号，然后还原
- [x] 3.7 `vitest.config.mts`：`storybook` project 改名 `storybook-react`，新增 `storybook-vue`（`initialGlobals` 加 `framework: "vue"`，`tags: { exclude: ["react-only"] }`）。验证两个 `storybookTest` 实例同时运行不互相影响（两个 project 的测试数各自正确、结果互不覆盖）；临时让一个 play 在两个 project 中都失败，确认两张失败截图都保留且能区分 project。结果：内置截图会互相覆盖，per-project `attachmentsDir` 不生效，改为 design 决策 6 中由 setup 文件按 project 截图；清空 Vite 缓存后第一次运行也通过
- [x] 3.8 试点 `1-Basic`：写 9 个 `Vue*App.vue`（按 design 决策 7 的写法），story 文件扩展 glob；`pnpm exec vitest run --project storybook-vue stories/1-Basic` 全部通过（含 10 个 play），`storybook-react` 结果不变；在 Storybook 中逐个对照两种模式的画面、拖动和 controls，Vue tab 与 `.vue` 源文件只差三处转换
- [x] 3.9 `8-TreeShaking`：story 加 `tags: ["react-only"]`，`appStory` 传 `vue: false`；Vue 模式下画布显示说明、没有 Vue tab、没有脚本错误；`storybook-vue` 不包含这个测试
- [x] 3.10 验证未构建时 React 模式可用：在一个新的 git worktree 中只执行 `pnpm install`（不构建任何包），启动 Storybook，React 模式下打开 `1-Basic` 的 story 正常渲染、浏览器控制台没有模块解析错误；切到 Vue 模式时的报错信息能看出需要先构建（记录现象，写进 6.1 的文档）；删除 worktree

## 4. 移植其余目录（design 决策 7、8）

每一项的完成标准相同：该目录的 Vue App 全部写完，`pnpm exec vitest run --project storybook-vue stories/<目录>` 通过，`typecheck:stories` 通过，在 Storybook 中逐个对照过两种模式。移植中发现的包装问题按 design 决策 8 处理（先在 `test/VueMoveable.spec.ts` 补一个失败的用例，再修 `src/VueMoveable.ts`，并补进 2.3 的 changeset 说明），在对应任务后面记下修了什么；需要改 play 的地方也逐条记下原因。

- [x] 4.1 `2-Combination`（4）、`3-Group`（6）、`3-IndiviualGroup`（2）
- [x] 4.2 `4-Options`（19）
- [x] 4.3 `4-SVG`（11）
- [x] 4.4 `5-Snap&Bound`（13）。Snap Elements (group) 在 Vue 下失败，原因是原生版的已有问题（design Risks），用户决定另开 change 修；这个 story 打 `vue-known-issue`，Vue 下跳过，其余 12 个通过
- [x] 4.5 `5A-Advanced` 的 7 个子目录（共 19，其中 `4-Rotatable/ReactRotateWithControlsApp` 用 react-keycon，改为 keycon）
- [x] 4.6 `6-CustomAble`（5）：自定义 able 的 `render` 用参数中的 `React.createElement`
- [x] 4.7 `7-Request`（7，其中 `ReactAlignApp` 用 react-selecto，按 1.3 的结论处理）、`9-Scrolling`（1）
- [x] 4.8 `9A-Components`（5）：selecto、infinite-viewer、react-keycon 按 1.3 的结论处理；如需 `packageExtensions`，按仓库规则写明针对的包、问题和删除条件，`pnpm install` 后 `pnpm lint` 通过
- [x] 4.9 `99-Tests`（35）：`createPortal` 的 2 个示例改用 `<Teleport>`（`ReactIframeApp` 传送到 iframe 的 body），`snap.css`、`safari.css` 在 Vue App 中同样 import

## 5. 整体验证

- [x] 5.1 全量检查：`pnpm lint`、`pnpm doc`、`pnpm packages:build`、`pnpm --filter @moveable-next/react typecheck:stories`、`pnpm test` 全部通过；`storybook-react` 137 个测试、`storybook-vue` 136 个测试；`pnpm build:storybook` 成功，在构建出的 Storybook 中两种模式都能浏览，play 不自动执行
- [x] 5.2 按 spec 场景逐条检查：临时删除一个 Vue App，确认测试失败、Storybook 中这个 story 文件加载出错且错误中有文件名，然后还原；两种模式的代码面板只有各自的两个 tab；Vue 模式下修改 controls 立即生效；`git status` 确认执行这些命令后没有生成的文件
- [x] 5.3 推送分支，CI 的 `Tests` 全部通过；记录测试步骤在改动前后的耗时，写进 6.2 的 ROADMAP 说明（`feat/vue3-storybook-examples` 的运行 40623342038 通过：290 个测试中 289 个通过、1 个跳过；「Run tests」12–15 秒 → 23 秒，「Type-check stories」4–7 秒 → 8 秒）

## 6. 文档与收尾

- [x] 6.1 更新 CLAUDE.md：story 写法约定（Vue App 的命名和写法、`@/vue3-moveable` 别名、例外要同时写 `tags` 和 `vue: false`）、代码 tab 的说明（React / Vue 随工具栏切换、Vue tab 的三处转换）、测试说明（两个 vitest project、Vue 模式需要先 `pnpm packages:build`）、常用命令（`typecheck:stories` 包含 vue-tsc）
- [x] 6.2 更新 `openspec/ROADMAP.md`：第 7 步改为已完成并写明本 change；新增一步「原生版和 Vue 3 版的 `makeMoveable`」（完成后去掉 TreeShaking 的例外）；「已知遗留」中记下 Vue 模式依赖构建产物
- [x] 6.3 `openspec validate add-vue3-storybook-examples --strict` 通过
