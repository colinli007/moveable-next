## Why

原生版（`@moveable-next/vanilla`）每次在单目标、组、单独分组之间切换，上一个控制框（`.moveable-control-box`）都会留在 DOM 中，只是子节点被清空；`destroy()` 之后这些元素也不会删除。用选择器指定多个目标时，第一次渲染总是先按单目标渲染再切换为组，最初的控制框以 `display: none` 留在最前面。Vue 3 版包装原生版，同样受影响：第 7 步（`add-vue3-storybook-examples`）中「Snap & Bound / Snap Elements (group)」因此在 Vue 下失败，目前标为 `vue-known-issue` 跳过。

根因在 croact 的 self 模式：原生版用 `renderSelf` 把传入的元素当作渲染树的根元素复用，而 `InitialMoveable` 在模式切换时会替换根元素（React 版中替换是正确的）；croact 在 self 模式下把根节点都标为 `_sel`，卸载时不删除。croact 2023 年 6 月后停更，并且是 croact-moveable 的 peerDependency，在本仓库给它打补丁到不了 npm 上的 ESM/CJS 使用者。

## What Changes

- 原生版不再使用 croact 的 self 模式：改为容器模式（`render`）渲染到一个不挂到页面上的根元素，再用 `createPortal` 把 Moveable 渲染进使用者传入的 `parentElement`。croact 的容器模式和 portal 都能正确替换和卸载节点。对原生版使用者，控制框仍是 `parentElement` 的子元素，DOM 结构、坐标基准都不变；不再泄漏控制框，`destroy()` 后不留下任何控制框。
- Vue 3 版的根元素改为不产生盒子（`display: contents`）的挂载点，控制框是它的子元素；显式把 `container` 设为组件的父元素，坐标基准与现在相同。**BREAKING**（行为）：组件的 `$el` 不再是控制框本身，`class` 等透传属性落在挂载点上；取控制框的方式是通过组件 ref 调用 `getControlBoxElement()`。
- 修复 react-moveable 中设置 `container` 时控制框一直不可见的问题（上游已有，Vue 版改为总是传 `container` 后暴露）：控制框在挂载后才会被标为可见，而 `MoveableManager.componentDidMount` 只在没有 `container` 时才在挂载后重新渲染，所以设置了 `container`、首次渲染就有目标元素时，控制框（单目标，以及单独分组的每个子控制框）一直是 `visibility: hidden`。改为挂载后总是重新渲染一次，坐标仍然只计算一次。
- 删除私有选项 `warpSelf`（标为 `@private`、「Don't set it」，只有 Vue 包装使用，改用 portal 后不再有读取它的地方）。它在 Default able 的 `props` 中，所以会从公开常量 `PROPERTIES` / `MOVEABLE_PROPS` 中消失，Vue 组件也不再有这个 prop。
- 原生版新增针对构建产物的浏览器测试，覆盖在单目标、组、无目标之间来回切换和 `destroy()`；Vue 3 版的测试补上同样的场景。
- 删除「Snap Elements (group)」的 `vue-known-issue` 标签，以及 monorepo-tooling spec 中对应的登记。
- 不做：fork 或修改 croact；修改 react-moveable 的渲染逻辑，上面 `componentDidMount` 的可见性修复除外（包括 `InitialMoveable._updateRefs` 首次渲染不解析选择器的行为，它在根元素能被正确删除之后只是一次多余的挂载，不再导致泄漏）；替换 croact（以后如有需要在路线图中单独列一步）；原生版和 React 版中首次渲染就用数组目标并开启单独分组、不设置 `container` 时的报错（ref 赋值时机的问题，与本 change 不同根，改动前就存在，记入路线图的已知遗留）。

## Capabilities

### New Capabilities

无

### Modified Capabilities

- `framework-packages`：「vue3-moveable 的行为」中根元素与控制框的关系改变；新增原生版在切换目标和销毁时不残留控制框的要求；新增设置 `container` 时控制框挂载后可见的要求；「框架包装的浏览器测试」覆盖范围加上 moveable。
- `monorepo-tooling`：「Storybook 交互测试可在受支持的运行时运行」的「CI 跑交互测试」场景删除 Snap Elements (group) 的登记。

## Impact

- `packages/moveable/src/MoveableManager.tsx`：构造函数和 `destroy()` 改用 `render` + `createPortal`，删除 `warpSelf` 分支和 `ContainerProvider`。
- `packages/vue3-moveable/src/VueMoveable.ts`：根元素、`container` 的默认值和 `watch`；`test/VueMoveable.spec.ts` 中「根元素就是控制框」的断言和新增用例。
- `packages/react-moveable/src/MoveableManager.tsx`：`componentDidMount` 的可见性修复；`src/types.ts`、`src/ables/Default.ts`、`MoveableManager.defaultProps`：删除 `warpSelf`。产物中 `PROPERTIES` 少一项。
- `packages/react-moveable/stories/99-Tests/`：新增一个只为测试存在的 story（`hidden-test`），首次渲染就带目标元素和 `container`，play 断言控制框可见，并有对应的 Vue 示例。story 测试数量变为 React 138、Vue 137。
- `packages/moveable`：新增 `vitest.config.mts`、`test/` 下的浏览器测试和对应的 devDependencies（vitest、@vitest/browser-playwright、playwright，都已在 catalog 中）；根目录 `vitest.config.mts` 的汇总自动包含它。
- `packages/react-moveable/stories/5-Snap&Bound/0-Snap&Bound.stories.tsx`：删除 `vue-known-issue`（标签机制本身保留）。
- changeset：vue3 为 minor（`$el` 不再是控制框，0.x 阶段对使用者可见的行为变化用 minor），vanilla、react 为 patch（react 的 changeset 写明 `container` 可见性修复和 `warpSelf` 删除）；四个包是 fixed 组，一起升到 0.2.0。分别写明原生版不再泄漏、Vue 版根元素的变化、`warpSelf` 的删除。
- 文档：vue3-moveable 的 README（如提到根元素）、CLAUDE.md（vue3-moveable 测试说明、`vue-known-issue` 现状）、ROADMAP 第 8 步。
