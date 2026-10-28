## Context

动机见 proposal.md。与方案有关的现状和已经验证过的事实（探针脚本在会话的 scratchpad 中，结论记录在这里）：

- **原生版的渲染**：`packages/moveable/src/MoveableManager.tsx` 的构造函数中，`warpSelf` 时把 `parentElement` 本身、否则把新建并追加到 `parentElement` 的 div 作为 `selfElement`，调用 `renderSelf(<InnerMoveable .../>, selfElement)`；`destroy()` 调用 `renderSelf(null, ...)`，非 `warpSelf` 时再移除 `selfElement`。`InnerMoveable`（`src/InnerMoveable.tsx`）只是把 state 传给 react-moveable 的 `Moveable`（`InitialMoveable`）。
- **根元素会被替换**：`InitialMoveable.render` 按目标数量渲染 `<MoveableManager key="single">`、`<MoveableGroup key="group">` 或 `<MoveableIndividualGroup>`，模式切换时根元素（控制框）是另一个组件渲染的另一个元素。React 版中旧元素被正确删除。
- **croact 的 self 模式**（croact 1.0.4，`dist/croact.esm.js`）：`renderSelf` 设置 `_hyd = [self]`、`_sel = true`，第一个挂载的元素领用 `self`；`renderProviders` 在 `_sel` 的容器下把根节点标为 `_sel`（`Component.$_setState` 从父 provider 开始渲染，所以每次 `moveable.target = ...` 都会走到这里）；`ElementProvider.un` 对 `_sel` 的节点不 `removeNode`。只用 croact 的最小探针确认：self 模式下根组件按 key 换类型，旧根元素全部残留、卸载后也不删除；容器模式（`render`）下正确替换、卸载时清空。
- **原生版的现象**（UMD 探针）：`[] → [a,b] → [] → [a,b] → [a]` 每一步都多留一个子节点为空的控制框，`warpSelf` 开关都一样；`destroy()` 后仍然残留。
- **坐标的基准**：`MoveableManager.getContainer()`（react-moveable）返回 `props.container || controlBox.parentElement`；`getMatrixStackInfo` 以 container 为矩阵栈的终点；控制框是 `position: absolute; left: 0; top: 0`，以它的包含块定位。
- **croact 的 portal**：`createPortal` 在 croact 1.0.4 中导出并有类型声明。portal 走 `renderProvider`，不像 `render` 那样在首次渲染时 `innerHTML = ""`；探针确认：宿主中原有的子元素不受影响，按 key 切换时旧根被删除、新根追加，`render(null, root)` 后宿主只剩原有子元素，ref 能穿过 portal。
- **Vue 包装**：`packages/vue3-moveable/src/VueMoveable.ts` 渲染一个 div，`mounted` 中 `new VanillaMoveable(div, { ...options, warpSelf: true })`，所以根元素就是控制框；`watch` 把每个 prop 的变化赋给原生实例。
- **`warpSelf`**：react-moveable `src/types.ts` 中标为 `@private`（「Don't set it」），列在 `src/ables/Default.ts` 的 `props` 中，因此出现在公开常量 `PROPERTIES` / `MOVEABLE_PROPS` 和 Vue 组件的 props 中。只有 Vue 包装设置它。
- **测试**：原生版只有类型测试（`test/checkTypes.mjs`），`test/manual/` 是手动打开的 HTML。vue3-moveable 有针对 `dist` 的浏览器测试，其中「renders the control box」断言根元素带 `moveable-control-box` 类。

## Goals / Non-Goals

**Goals:**
- 原生版和 Vue 版在任何目标切换和 `destroy()` 后，DOM 中只有当前使用的控制框。
- 原生版使用者看到的 DOM 结构和坐标与现在完全相同；React 版不受任何影响。
- 修复随三种产物（ESM、CJS、UMD）一起到达使用者，不依赖使用者安装的 croact 版本有什么改动。

**Non-Goals:**
- 修改或 fork croact，替换 croact。
- 修改 react-moveable 的渲染逻辑，包括 `InitialMoveable._updateRefs` 首次渲染不解析选择器的行为（见决策 5）；例外是决策 6 的可见性修复。
- 首次渲染就用数组目标并开启单独分组、不设置 `container` 时的报错：子 manager 在 `componentDidMount` 中调用 `wrapperMoveable.getContainer()`，而外层控制框的 ref 要等子组件挂载完才赋值（React 中 react-css-styled 用 `useImperativeHandle` 暴露元素，croact 中元素的 ref 在子 hooks 之后执行），React 版和上游 0.56.0 同样报错。与本 change 不同根，记入路线图的已知遗留。
- `vue-known-issue` 标签机制本身：保留，只删除这一条使用。

## Decisions

### 1. 原生版：容器模式渲染到游离根元素，再 portal 进 `parentElement`

问题的本质是所有权：self 模式把「宿主拥有的节点」（使用者的元素、原生版创建的 div）和「渲染树的根节点」（归渲染器，模式切换时会被替换）合成了同一个节点。修法是只给 croact 一个它完全拥有的边界：

```
root = getDocument(parentElement).createElement("div")   // 不挂到页面上，只作为 croact 的容器
render(createPortal(<InnerMoveable ref ... {...options} {...events} />, parentElement), root)
destroy(): render(null, root)
```

控制框由 portal 追加进 `parentElement`，仍是它的子元素：`getContainer()` 的 `controlBox.parentElement` 不变，坐标基准不变，`componentDidMount` 中「没有 `container` 时同步 `updateRect` + `forceUpdate`」照常执行，控制框创建后同步可见，与现在相同。端到端探针（croact-moveable 的 dist + npm 上的 croact 1.0.4）确认：来回切换每一步只有一个控制框，`destroy()` 后为零；父元素有定位偏移、缩放、滚动时坐标正确；用选择器时构造函数返回时已经是组。

- 根元素用 `parentElement` 所在文档创建，iframe 等场景中 portal 内部按容器所在文档创建元素。
- 不对 `parentElement` 直接 `render`：croact 的 `render` 首次会清空容器的 `innerHTML`，会删掉使用者的子元素。
- 不用 `renderSelf(el, parentElement, new ContainerProvider(parentElement))`：传入 provider 时 `renderSelf` 会跳过 `_hyd` / `_sel` 的设置，等于不清空的容器模式，但依赖 croact 的实现细节；portal 是 croact 与 ReactDOM 共有的公开语义。

考虑过的其它做法：
- fork croact 修 self 模式：根被替换时要让新根重新领用 self，并清掉旧根留下的属性、样式、事件（croact 以 prevProps 为基准 diff，换组件后 prevProps 为空，`data-able-*` 等会残留）；发布面上 croact-moveable 的 peer、croact-css-styled（产物 import `croact` 却没有声明）都要跟着换。为停更的运行时维护两个 fork，只换来「Vue 根元素仍是控制框」，否决。
- 把传入的元素（或新建的 div）作为容器、控制框渲染在里面：探针（11 种布局）显示坐标直接算错，不只是基准变化。target 不在这个容器里，矩阵栈一路算到文档根，把父元素自身的偏移、缩放、滚动、zoom 都算了进去，而控制框仍以原父元素为包含块定位；例如父元素 `left: 100; top: 80` 时控制框偏移 (100, 80)，父元素 `scale(.5)` 时尺寸也错。必须显式传 `container` 才能纠正，代价见决策 2；原生版用 portal 完全不需要付这个代价。
- 让 `InitialMoveable` 在模式切换时不换根元素：要么给 React 版多套一层元素（同样掉进上面的坐标问题），要么把三种 manager 合并，动 React 核心，否决。
- 原生版在切换后自己清理残留元素：无法区分同一父元素下其它实例的控制框，也要自己重写卸载，属于症状修补，否决。

### 2. Vue 版：`display: contents` 的挂载点 + 显式 `container`

Vue 组件的 DOM 应该留在组件自己的根元素中，所以控制框不 portal 到组件的父元素（那样它会成为 Vue 管理的兄弟节点之间的外来节点），而是：

- `render()` 返回 `h("div", { ref: "moveableElement", style: { display: "contents" } })`。挂载点不产生盒子，不影响 flex / grid 父元素（现在的根元素是 absolute 的控制框，同样不占位）。
- `mounted` 中 `new VanillaMoveable(el, { ...options, container: options.container ?? el.parentElement })`，不再传 `warpSelf`。原生版把控制框 portal 进挂载点，坐标以组件的父元素为基准：探针中 11 种布局与现在逐项相同（transform、连线与目标的偏差、`getRect()`）。
- `watch.container`：使用者把 `container` 改回 `undefined` / `null` 时，仍回落到 `el.parentElement`；否则 `getContainer()` 退化为挂载点，坐标算错（决策 1 的第二个备选）。

代价与处理：
- 显式传 `container` 后，`componentDidMount` 原来会跳过挂载后的重新渲染。最初评估为「下一个宏任务才可见」，全量截图对比发现单独分组的子控制框会一直不可见（3 个 Vue story 空白），根因是 react-moveable 的已有 bug，由决策 6 修复。
- `state.container` 从 `null` 变成父元素。Snappable 的 `checkSnapInfo` 用 `props.snapContainer || state.container` 与 `state.container` 比较：没设 `snapContainer` 时两者都相等，偏移为 0，与现在相同；设了 `snapContainer` 时，现在总是走「不相等」分支计算偏移；修改后如果 `snapContainer` 恰好是组件的父元素，会改走「相等」分支、偏移为 0，结果是否和现在相同没有验证过。实现时用 Snap Container 的 Vue story 和一个 `snapContainer` 等于父元素的用例回归，不一致时停下来确认（任务 3.3）。
- `$el` 不再是控制框，`class` 等透传属性落在挂载点上（`display: contents` 的元素自身的样式不生效）。这是对使用者可见的变化，在 changeset 和 README 中写明，取控制框用 `getControlBoxElement()`。ControlPadding 的 Vue 示例用的是 moveable 的 `className` prop，不受影响。

### 3. 删除 `warpSelf`

改用 portal 后，原生版不再读取 `warpSelf`，Vue 包装也不再传它。从 react-moveable 的 `types.ts` 和 `ables/Default.ts` 中删除；它会从 `PROPERTIES` / `MOVEABLE_PROPS` 中消失，Vue 组件也不再有这个 prop。它一直标为私有、不应设置，在 changeset 中写一句即可。

### 4. 测试

- 原生版新增针对 `dist` 的浏览器测试（`packages/moveable/test/*.spec.ts` + `vitest.config.mts`，写法与 vue3-moveable 相同，辅助函数用根目录的 `config/testing/browser.ts`）：来回切换目标、选择器起步、`destroy()` 后无控制框且父元素原有子元素保留、父元素带偏移和缩放时连线与目标重合。先在当前代码的产物上运行，确认切换和销毁的用例失败，再修改。
- vue3-moveable 的测试：「renders the control box」改为断言挂载点不产生盒子、其中的控制框就是 `getControlBoxElement()`；新增在一个元素、两个元素、空数组之间切换 `target` 后恰好一个控制框、卸载后没有控制框的用例；新增父元素带偏移时的坐标用例。
- Storybook：删除 Snap Elements (group) 的 `vue-known-issue` 后，`storybook-vue` 136 个测试全部通过且没有跳过；React 的 137 个结果不变。

### 5. 不修改 `_updateRefs`

`InitialMoveable._updateRefs` 第一次渲染遍历的是上一次的 `refTargets`，选择器要等挂载后才解析，React 版也是这样。根元素能被正确删除之后，首次的单目标 → 组只是一次干净的替换，而且发生在原生版构造函数返回之前（探针中构造后同步读取已经是组）。它剩下的只是多一次 manager 的挂载和卸载，改它会改变 React 版的首次渲染路径，不放进这个 change。

### 6. 设置 `container` 时控制框挂载后可见（react-moveable）

全量截图对比中，3 个开启 `individualGroupable` 的 story 在 Vue 模式下没有可见的控制框。原生版（包括改动前的 0.1.2）和 React 版（包括上游 react-moveable 0.56.0）都能复现：设置了 `container`、首次渲染就有目标元素时，控制框的 transform 是对的，但一直是 `visibility: hidden`；单目标同样如此。

原因（上游提交历史）：`aa9adcb0`（2019，#69）让坐标只计算一次：有 `container` 时 `checkUpdate` 在 render 中计算，没有时 `componentDidMount` 在挂载后计算（`!container`）。`38ba0479`、`55780301`（2022，#760）为了不让未计算坐标的首帧闪现，把可见性改为 `this.controlBox ? "visible" : "hidden"`，并在 `!container` 分支加了 `forceUpdate()` 让控制框挂载后变为可见，有 `container` 的分支从此没有挂载后的重新渲染。`d2388e54`（2023，#905）修单独分组子控制框不可见时也只修了没有 `container` 的路径。以前没暴露，是因为常见用法都会在挂载后碰巧再渲染一次（选择器解析后、组的事件更新等）；Vue 版改为总是传 `container`，单独分组的子 manager 在选择器解析后才首次挂载，之后没有再渲染。

修法：可见性取决于「挂载后再渲染一次」，与是否设置 `container` 无关；坐标只计算一次的原意保留：

```
componentDidMount:
    if (!parentMoveable && !state.isPersisted) {
        if (!container) updateRect("", false, false);   // 没有 container 时 render 中算不了坐标
        forceUpdate();                                   // 挂载后才能标为可见
    }
```

有 `container` 时只多一次不重新计算坐标的渲染（`checkUpdate` 中目标和容器都没变，直接返回）；组的子 manager（`parentMoveable`）和 persistData（`isPersisted`）仍然排除。React 和 croact 的 `forceUpdate` 在 `componentDidMount` 中同步提交，所以 Vue 版也不再有一帧不可见。探针在 React 和原生版上验证：设置 `container` 的单目标、组、单独分组（选择器目标和数组目标）全部可见；不设置 `container` 的各种情况、坐标、切换序列都与现在逐项相同。

考虑过的其它做法：
- 直接去掉 `!container`，挂载后总是 `updateRect` + `forceUpdate`：结果相同，但有 `container` 时多一次矩阵栈计算，丢掉了「只算一次」的原意。
- 让可见性直接表示「坐标已计算」而不是「控制框已存在」：可以省掉这次渲染，但 `MoveableGroup.checkUpdate` 不计算坐标，需要在 `updateRect` 中新增状态字段并改 render，收益只是一次渲染，不在这个 change 里做。
- Vue 版不传 `container`，把控制框 portal 到组件的父元素：React 和原生版使用者的同一问题留在原地，还要放弃决策 2 的 DOM 归属，否决。
- 把 3 个 story 登记为 `vue-known-issue`：0.1.x 中 Vue 的单独分组是正常的，等于发布回归，否决。

## Risks / Trade-offs

- [`v-show` 作用在 `display: contents` 的根元素上] → Vue 会记录元素原来的内联 `display` 并在显示时恢复，预期恢复为 `contents`；任务 3.3 中实测，如果恢复不正确，先停下来确认处理方式。
- [原生版使用者依赖 `warpSelf`] → 它是私有选项且注释写明不要设置；删除后传入它会被当作未知选项忽略，不会报错。
- [croact 的 portal 在某些路径（例如嵌套 portal、`flushSync`）的行为与 ReactDOM 不同] → 原生版只在最外层使用一次 portal；Storybook 中 136 个 Vue story 全部经过原生版，是这条路径的回归网。
- [原生版浏览器测试是新加的 Vitest project，CI 时间增加] → 用例只有几个，增加时间以秒计。
- [决策 6 改变了 React 版设置 `container` 时的行为（控制框从一直不可见变为挂载后可见）] → 这是修 bug；React 的 138 个 story 测试和截图对比回归，新增的 story 在 React 和 Vue 下都断言可见。
- [story 测试没有发现 3 个 story 空白] → 这几个 story 没有断言控制框的 play；新增的测试 story 覆盖「设置 `container` 时可见」，截图对比作为每次改动渲染路径时的检查。

## Migration Plan

发布为 0.2.0（fixed 组）。原生版使用者无需改动。Vue 版使用者如果通过 `$el` 或给组件加 `class` 来操作控制框，改为用组件 ref 的 `getControlBoxElement()`，或用 moveable 的 `className` prop。回滚就是回退本 change 的提交。
