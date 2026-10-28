## 1. 原生版的浏览器测试（先复现，design 决策 4）

- [x] 1.1 `packages/moveable` 新增 `vitest.config.mts`（浏览器模式，写法同 vue3-moveable）和 devDependencies `vitest`、`@vitest/browser-playwright`、`playwright`（`catalog:`），`package.json` 增加 `test` 脚本；`pnpm install` 后 `pnpm lint`（含依赖范围检查）通过，根目录 `pnpm test` 能识别这个 project
- [x] 1.2 新增 `test/Moveable.spec.ts`（import `../dist/moveable.esm.js`，辅助函数用 `config/testing/browser.ts`，清理逻辑留在测试文件中），覆盖 framework-packages「原生版切换目标和销毁时不残留控制框」的四个场景：来回切换目标后恰好一个顶层控制框、选择器起步只有组的控制框、`destroy()` 后无控制框且父元素原有子元素保留、父元素带定位偏移和 `scale` 时连线与目标边界重合；在当前代码的产物上运行，确认「来回切换」「选择器」「销毁」失败、「坐标」通过（记下失败信息）

## 2. 原生版改用容器模式 + portal（design 决策 1、3）

- [x] 2.1 `packages/moveable/src/MoveableManager.tsx`：构造函数用 `getDocument(parentElement).createElement("div")` 作为不挂到页面上的根，`render(createPortal(<InnerMoveable .../>, parentElement), root)`；`destroy()` 改为 `render(null, root)`；删除 `warpSelf` 分支、`selfElement` / `_warp` / `containerProvider` 字段和 `renderSelf`、`ContainerProvider` 的 import；构造函数末尾对数组目标的 `updateRect()` 保留。`pnpm --filter @moveable-next/vanilla build`（含类型测试）通过，1.2 的用例全部通过
- [x] 2.2 react-moveable 删除 `warpSelf`：`src/types.ts` 的选项和 `src/ables/Default.ts` 的 `props` 项；`pnpm packages:build` 通过，构建出的 `PROPERTIES` 中不再有 `warpSelf`，`pnpm doc` 没有警告
- [x] 2.3 用会话中的 UMD 探针（或在 1.2 中加一个用例）确认 UMD 产物 `dist/moveable.js` 同样不再残留：切换 `[] → [a,b] → [] → [a,b] → [a]` 每步一个控制框，`destroy()` 后为零

## 3. Vue 版的挂载点（design 决策 2）

- [x] 3.1 `packages/vue3-moveable/test/VueMoveable.spec.ts`：「renders the control box」改为断言根元素是 `display: contents`、其中的控制框就是 `getControlBoxElement()`；新增在一个元素、两个元素、空数组之间切换 `target` 后根元素中恰好一个顶层控制框、卸载后 DOM 中没有这个组件的控制框；新增父元素带定位偏移时连线与目标重合。先在当前包装上运行，确认新断言失败
- [x] 3.2 `src/VueMoveable.ts`：`render()` 返回带 `style: { display: "contents" }` 的挂载点；`mounted` 中 `container: options.container ?? el.parentElement`，去掉 `warpSelf: true`；`watch.container` 在新值为空时回落到 `el.parentElement`。`pnpm --filter @moveable-next/vue3 build`（含类型测试）和该包测试全部通过，`pnpm lint` 通过
- [x] 3.3 实测 design Risks 中的两点：给组件加 `v-show`，切换隐藏、显示后挂载点恢复为 `display: contents` 且控制框可见、坐标正确；Snap Container 相关的 Vue story 通过，并在 vue3-moveable 测试中加一个 `snapContainer` 等于组件父元素的用例，与原生版直接在父元素中创建的吸附结果比较。任一不符合时停下来确认

## 4. 设置 container 时控制框挂载后可见（design 决策 6）

- [x] 4.1 先写失败的测试：react-moveable 新增 `stories/99-Tests/ReactContainerVisibleApp.tsx`（首次渲染 Moveable 时就传入已存在的目标元素和 `container`：一个单目标，一个开启 `individualGroupable` 的两个目标）和对应的 `VueContainerVisibleApp.vue`，在 `Deafult.stories.tsx` 中加一个 `tags: ["hidden-test"]` 的 story，play 断言所有控制框（含单独分组的子控制框）`visibility` 为 `visible`；原生版测试加「设置 `container` 的单目标、单独分组（数组和选择器）可见」；vue3-moveable 测试加「`individualGroupable` + 选择器目标时子控制框可见」。在当前代码上运行，确认 React、原生版、Vue 下这些断言失败
- [x] 4.2 `packages/react-moveable/src/MoveableManager.tsx` 的 `componentDidMount`：在 `!parentMoveable && !this.state.isPersisted` 时总是 `forceUpdate()`，只在 `!container` 时 `updateRect("", false, false)`；`pnpm packages:build` 后 4.1 的测试全部通过，`pnpm --filter @moveable-next/vanilla test`、`pnpm --filter @moveable-next/vue3 test` 通过
- [x] 4.3 react 的 changeset 补上这个修复的说明（设置 `container` 且首次渲染已有目标时控制框一直不可见，单独分组的子控制框同样）；`pnpm changeset status` 仍是 fixed 组升到 0.2.0

## 5. Storybook 回归

- [x] 5.1 删除 `stories/5-Snap&Bound/0-Snap&Bound.stories.tsx` 中 Snap Elements (group) 的 `vue-known-issue` 标签和注释；`pnpm packages:build` 后执行 `pnpm exec vitest run --project storybook-react --project storybook-vue`，273 个测试全部通过、没有跳过（决策 6 之前；4.2 之后在 5.2 中重新全量运行）
- [x] 5.2 4.2 之后重新执行两个 story project，React 138 个、Vue 137 个全部通过、没有跳过；在 Storybook 中对照两种模式（用会话中的截图对比脚本），除已知原因（Roundable、View Container 的亚像素差异，TreeShaking 的 Vue 说明）外，Vue 模式下所有 story 的画面与 React 一致，3 个单独分组的 story 有可见的控制框；检查用到 `class` 透传、`v-show` 或依赖根元素的 Vue 示例（没有）

## 6. 收尾

- [x] 6.1 全量检查：`pnpm lint`、`pnpm doc`、`pnpm packages:build`、`pnpm --filter @moveable-next/react typecheck:stories`、`pnpm test` 全部通过；`pnpm build:storybook` 成功
- [x] 6.2 changeset：`@moveable-next/vue3` minor（根元素改为 `display: contents` 的挂载点，`$el` 不再是控制框，取控制框用 `getControlBoxElement()`）、`@moveable-next/vanilla` patch（切换目标和 `destroy()` 后不再残留控制框）、`@moveable-next/react` patch（删除私有选项 `warpSelf`，`PROPERTIES` 少一项）；`pnpm changeset status` 显示 fixed 组升到 0.2.0、helper 不变
- [x] 6.3 文档：vue3-moveable 的 README 中写明根元素是挂载点、用 `getControlBoxElement()`；CLAUDE.md 中框架包装测试的说明加上 moveable，`vue-known-issue` 一条写明目前没有使用；`openspec/ROADMAP.md` 第 8 步改为已完成并按本 change 的结论更新说明（含决策 6 的 `container` 可见性修复和新的测试数量），「已知遗留」中加上「首次渲染就用数组目标并开启单独分组、不设置 `container` 时报错」
- [x] 6.4 `openspec validate fix-vanilla-root-switch-leak --strict` 通过
