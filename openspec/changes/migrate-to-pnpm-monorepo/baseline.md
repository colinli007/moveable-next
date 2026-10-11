# 迁移基线（Node 16.20.2 + yarn 1）

本文件记录迁移前在原工具链下的安装、构建、测试结果，作为后续每一步的对比基准。

## 1. 工具链与安装（任务 1.1）

| 项 | 值 |
|---|---|
| Node | v16.20.2（nvm） |
| corepack | 0.17.0 |
| yarn | 1.22.22（corepack 提供） |
| 安装命令 | `yarn --frozen-lockfile` |
| 结果 | 成功（Done in 234.40s），`git status` 无变化 |

安装日志中的已知非致命项：

- `nice-napi`（可选依赖，经 `@angular/cli` 的 node-gyp 编译）因本机 Python 缺少 `distutils` 编译失败，yarn 标注 `This module is OPTIONAL, you can safely ignore this error`。
- 82 条 `warning`，绝大多数是 `@storybook/*` 对 `react` / `react-dom` / `@babel/core` 的 unmet peer 警告，另有 `url-loader@1.1.2: Invalid bin field`。

## 2. 全量构建（任务 1.2）

命令：`yarn packages:build`（成功，Done in 45.38s）。lerna 4 非 stream 模式只回显各包 stdout，rollup 警告走 stderr 被吞掉，所以随后又在每个包目录下单独执行 `yarn build` 采集完整日志（全部成功）。

`dist` 存在性：react-moveable、croact-moveable、preact-moveable、moveable、lit-moveable、vue3-moveable、svelte-moveable、helper 均有 `dist`（另有待删除的 vue-moveable、ngx-moveable）。

### 2.1 rollup「Unresolved dependencies」警告（已知例外，用户已确认）

基线本身就有以下 `(!) Unresolved dependencies` 警告。它们都出现在 ESM / CJS 构建里，被列出的都是该包 `dependencies` / `peerDependencies` 中的运行时依赖，rollup 找不到后按 external 处理，产物中保留为 import / require，这是这些构建的预期形态；UMD 构建里没有此类警告。

| 包 | 构建 | 未解析模块 |
|---|---|---|
| react-moveable | `moveable.esm.js`、`moveable.cjs.js` | `@egjs/agent`、`@scena/matrix`、`@daybrush/utils`、`css-to-mat`、`@egjs/children-differ`、`framework-utils`、`@scena/dragscroll`、`overlap-area`、`gesto`、`react`、`react-css-styled`、`@scena/event-emitter`、`@egjs/list-differ` |
| helper | `helper.esm.js`、`helper.cjs.js` | `@daybrush/utils` |
| lit-moveable | `moveable.esm.js`、`moveable.cjs.js` | `moveable`、`lit`、`lit/decorators.js`、`framework-utils`、`@daybrush/utils` |

croact-moveable、preact-moveable、moveable（含 UMD）、vue3-moveable、svelte-moveable 没有「未解析」警告。其它非错误警告：所有 rollup 包都有 `@rollup/plugin-replace` 的 `preventAssignment` 提示；helper 和 moveable 的 `*.min.js` 有 `Broken sourcemap`（terser）。

### 2.2 反向检查

- `packages/moveable/dist/moveable.js`、`moveable.min.js` 中 `require('croact')` / `require("croact")` / `global.croact` 出现次数均为 0。
- croact-moveable、moveable、preact-moveable、lit-moveable 的 `dist` 中 grep 不到 `__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED`。

### 2.3 产物文件清单与体积（字节）

汇总（不含待删除的 vue-moveable、ngx-moveable）：

| 目录 | 文件数 | 总字节 |
|---|---|---|
| croact-moveable/declaration | 2 | 178 |
| croact-moveable/dist | 2 | 1195615 |
| helper/declaration | 6 | 4583 |
| helper/dist | 8 | 274678 |
| lit-moveable/declaration | 3 | 1033 |
| lit-moveable/dist | 6 | 2584727 |
| moveable/declaration | 9 | 2615 |
| moveable/dist | 8 | 2401768 |
| preact-moveable/declaration | 3 | 572 |
| preact-moveable/dist | 2 | 1204652 |
| react-moveable/declaration | 63 | 289456 |
| react-moveable/dist | 4 | 3585820 |
| svelte-moveable/dist | 6 | 3286 |
| vue3-moveable/dist | 5 | 16055 |

逐文件清单（`stat -f "%z %N"`，按路径排序）：

```
96 packages/croact-moveable/declaration/index.d.ts
82 packages/croact-moveable/declaration/index.umd.d.ts
599876 packages/croact-moveable/dist/moveable.cjs.js
595739 packages/croact-moveable/dist/moveable.esm.js
1649 packages/helper/declaration/GroupManager.d.ts
2056 packages/helper/declaration/groups.d.ts
85 packages/helper/declaration/index.cjs.d.ts
83 packages/helper/declaration/index.d.ts
60 packages/helper/declaration/index.umd.d.ts
650 packages/helper/declaration/types.d.ts
26599 packages/helper/dist/helper.cjs.js
46038 packages/helper/dist/helper.cjs.js.map
26173 packages/helper/dist/helper.esm.js
45798 packages/helper/dist/helper.esm.js.map
32069 packages/helper/dist/helper.js
88461 packages/helper/dist/helper.js.map
9446 packages/helper/dist/helper.min.js
94 packages/helper/dist/helper.min.js.map
57 packages/lit-moveable/declaration/index.d.ts
762 packages/lit-moveable/declaration/LitMoveable.d.ts
214 packages/lit-moveable/declaration/types.d.ts
4464 packages/lit-moveable/dist/moveable.cjs.js
16476 packages/lit-moveable/dist/moveable.cjs.js.map
4148 packages/lit-moveable/dist/moveable.esm.js
16315 packages/lit-moveable/dist/moveable.esm.js.map
862817 packages/lit-moveable/dist/moveable.umd.js
1680507 packages/lit-moveable/dist/moveable.umd.js.map
122 packages/moveable/declaration/consts.d.ts
82 packages/moveable/declaration/index.cjs.d.ts
136 packages/moveable/declaration/index.d.ts
57 packages/moveable/declaration/index.umd.d.ts
239 packages/moveable/declaration/InnerMoveable.d.ts
107 packages/moveable/declaration/Moveable.d.ts
947 packages/moveable/declaration/MoveableManager.d.ts
273 packages/moveable/declaration/types.d.ts
652 packages/moveable/declaration/utils.d.ts
8313 packages/moveable/dist/moveable.cjs.js
6587 packages/moveable/dist/moveable.cjs.js.map
7382 packages/moveable/dist/moveable.esm.js
11728 packages/moveable/dist/moveable.esm.js.map
793932 packages/moveable/dist/moveable.js
1328179 packages/moveable/dist/moveable.js.map
245551 packages/moveable/dist/moveable.min.js
96 packages/moveable/dist/moveable.min.js.map
123 packages/preact-moveable/declaration/index.d.ts
149 packages/preact-moveable/declaration/Moveable.d.ts
300 packages/preact-moveable/declaration/types.d.ts
603803 packages/preact-moveable/dist/moveable.cjs.js
600849 packages/preact-moveable/dist/moveable.esm.js
408 packages/react-moveable/declaration/ables/AbleManager.d.ts
2118 packages/react-moveable/declaration/ables/BeforeRenderable.d.ts
2162 packages/react-moveable/declaration/ables/Clickable.d.ts
10282 packages/react-moveable/declaration/ables/Clippable.d.ts
2460 packages/react-moveable/declaration/ables/clippable/utils.d.ts
37351 packages/react-moveable/declaration/ables/consts.d.ts
748 packages/react-moveable/declaration/ables/Default.d.ts
1596 packages/react-moveable/declaration/ables/DragArea.d.ts
7299 packages/react-moveable/declaration/ables/Draggable.d.ts
1553 packages/react-moveable/declaration/ables/edgeDraggable.d.ts
431 packages/react-moveable/declaration/ables/Groupable.d.ts
212 packages/react-moveable/declaration/ables/IndividualGroupable.d.ts
629 packages/react-moveable/declaration/ables/Origin.d.ts
6454 packages/react-moveable/declaration/ables/OriginDraggable.d.ts
749 packages/react-moveable/declaration/ables/Padding.d.ts
5024 packages/react-moveable/declaration/ables/Pinchable.d.ts
1978 packages/react-moveable/declaration/ables/Renderable.d.ts
9431 packages/react-moveable/declaration/ables/Resizable.d.ts
7291 packages/react-moveable/declaration/ables/Rotatable.d.ts
8417 packages/react-moveable/declaration/ables/Roundable.d.ts
1409 packages/react-moveable/declaration/ables/roundable/borderRadius.d.ts
7870 packages/react-moveable/declaration/ables/Scalable.d.ts
2866 packages/react-moveable/declaration/ables/Scrollable.d.ts
11739 packages/react-moveable/declaration/ables/Snappable.d.ts
1383 packages/react-moveable/declaration/ables/snappable/bounds.d.ts
1927 packages/react-moveable/declaration/ables/snappable/getTotalGuidelines.d.ts
1693 packages/react-moveable/declaration/ables/snappable/innerBounds.d.ts
300 packages/react-moveable/declaration/ables/snappable/names.d.ts
1845 packages/react-moveable/declaration/ables/snappable/render.d.ts
2518 packages/react-moveable/declaration/ables/snappable/snap.d.ts
2198 packages/react-moveable/declaration/ables/snappable/snapBounds.d.ts
1808 packages/react-moveable/declaration/ables/snappable/utils.d.ts
3079 packages/react-moveable/declaration/ables/Warpable.d.ts
163 packages/react-moveable/declaration/classNames.d.ts
1074 packages/react-moveable/declaration/consts.d.ts
378 packages/react-moveable/declaration/EventManager.d.ts
244 packages/react-moveable/declaration/externalTypes.d.ts
1142 packages/react-moveable/declaration/gesto/CustomGesto.d.ts
166 packages/react-moveable/declaration/gesto/GestoData.d.ts
4459 packages/react-moveable/declaration/gesto/GestoUtils.d.ts
981 packages/react-moveable/declaration/gesto/getAbleGesto.d.ts
902 packages/react-moveable/declaration/groupUtils.d.ts
115 packages/react-moveable/declaration/index.d.ts
1082 packages/react-moveable/declaration/index.esm.d.ts
90 packages/react-moveable/declaration/index.umd.d.ts
3126 packages/react-moveable/declaration/InitialMoveable.d.ts
253 packages/react-moveable/declaration/makeMoveable.d.ts
218 packages/react-moveable/declaration/Moveable.d.ts
4754 packages/react-moveable/declaration/MoveableGroup.d.ts
1617 packages/react-moveable/declaration/MoveableIndividualGroup.d.ts
15088 packages/react-moveable/declaration/MoveableManager.d.ts
1531 packages/react-moveable/declaration/renderDirections.d.ts
189 packages/react-moveable/declaration/Snappable/utils.d.ts
550 packages/react-moveable/declaration/store/Store.d.ts
88504 packages/react-moveable/declaration/types.d.ts
11526 packages/react-moveable/declaration/utils.d.ts
180 packages/react-moveable/declaration/utils/calculateElementPosition.d.ts
787 packages/react-moveable/declaration/utils/calculateMatrixStack.d.ts
735 packages/react-moveable/declaration/utils/getElementInfo.d.ts
726 packages/react-moveable/declaration/utils/getFixedDirection.d.ts
549 packages/react-moveable/declaration/utils/getMatrixStackInfo.d.ts
931 packages/react-moveable/declaration/utils/getMoveableTargetInfo.d.ts
168 packages/react-moveable/declaration/utils/persist.d.ts
599842 packages/react-moveable/dist/moveable.cjs.js
1196302 packages/react-moveable/dist/moveable.cjs.js.map
595589 packages/react-moveable/dist/moveable.esm.js
1194087 packages/react-moveable/dist/moveable.esm.js.map
501 packages/svelte-moveable/dist/index.d.ts
587 packages/svelte-moveable/dist/index.js
60 packages/svelte-moveable/dist/index.umd.d.ts
167 packages/svelte-moveable/dist/index.umd.js
1172 packages/svelte-moveable/dist/Moveable.svelte
799 packages/svelte-moveable/dist/Moveable.svelte.d.ts
126 packages/vue3-moveable/dist/index.d.ts
57 packages/vue3-moveable/dist/index.umd.d.ts
2061 packages/vue3-moveable/dist/moveable.cjs
1748 packages/vue3-moveable/dist/moveable.js
12063 packages/vue3-moveable/dist/Moveable.vue.d.ts
```

## 3. Storybook 交互测试与启动警告（任务 1.3）

### 3.1 `yarn test:ci`

- 结果：**Test Suites 20 passed / 20；Tests 137 passed / 137**，退出码 0。
- **失败清单：无**（0 个失败）。
- 为了拿到逐条 story 结果，又对同一份 `test-static` 用 `test-storybook --json --outputFile` 跑了一次，结果一致（137/137/0），逐条清单见 3.3。
- `test:build`（`build-storybook`）日志中的非致命项：
  - `WARN Failed to load preset: {"type":"presets"} on level 1`，随后打印 `ERR! TypeError [ERR_INVALID_ARG_TYPE]: The "id" argument must be of type string. Received an instance of Object`（来自 `@storybook/core-common/dist/cjs/presets.js` 的 `interopRequireDefault`）。构建继续并成功。`@storybook/addon-essentials` 在 `node_modules/@storybook/` 中不存在，与 design 中「preset 加载失败」的预期一致。
  - webpack 的 asset / entrypoint size limit 警告（`main (4.9 MiB)`）。
  - fork-ts-checker：`No issues found.`
  - http-server：`[DEP0066] DeprecationWarning: OutgoingMessage.prototype._headers is deprecated`。
  - yarn：`"dependencies" has dependency "react-selecto" with range "^1.25.0" that collides with a dependency in "devDependencies" ... "^1.24.0"`。

### 3.2 `yarn storybook` 启动警告清单

启动成功（`Storybook 6.5.16 for React started`，`http://localhost:6006/` 返回 200），全部警告：

1. yarn：`react-selecto` 在 `dependencies`（`^1.25.0`）与 `devDependencies`（`^1.24.0`）重复声明。
2. `WARN Failed to load preset: {"type":"presets"} on level 1` + 同上的 `ERR! TypeError [ERR_INVALID_ARG_TYPE]` 堆栈（打印两次）。
3. `DeprecationWarning: Default PostCSS plugins are deprecated. When switching to '@storybook/addon-postcss' ...`
4. `Browserslist: caniuse-lite is outdated. Please run: npx browserslist@latest --update-db`
5. manager / preview bundle 的 webpack `[big]` 体积提示。
6. fork-ts-checker：`No issues found.`（不是警告，记录以便对比）

### 3.3 逐条 story 结果（status 文件 :: 名称）

```
passed stories/1-Basic/0-Basic.stories.tsx :: Basic BaiscRotatable smoke-test
passed stories/1-Basic/0-Basic.stories.tsx :: Basic BasicClippable smoke-test
passed stories/1-Basic/0-Basic.stories.tsx :: Basic BasicDraggable smoke-test
passed stories/1-Basic/0-Basic.stories.tsx :: Basic BasicOriginDraggable smoke-test
passed stories/1-Basic/0-Basic.stories.tsx :: Basic BasicPinchable smoke-test
passed stories/1-Basic/0-Basic.stories.tsx :: Basic BasicResizable smoke-test
passed stories/1-Basic/0-Basic.stories.tsx :: Basic BasicRoundable smoke-test
passed stories/1-Basic/0-Basic.stories.tsx :: Basic BasicScalable smoke-test
passed stories/1-Basic/0-Basic.stories.tsx :: Basic BasicScalableKeepRatioTest smoke-test
passed stories/1-Basic/0-Basic.stories.tsx :: Basic BasicWarpable smoke-test
passed stories/2-Combination/0-UseCSS.stories.tsx :: Able Combination CombinationAllInOne smoke-test
passed stories/2-Combination/0-UseCSS.stories.tsx :: Able Combination CombinationDraggableOriginRotatable smoke-test
passed stories/2-Combination/0-UseCSS.stories.tsx :: Able Combination CombinationDraggableResizableRotatble smoke-test
passed stories/2-Combination/0-UseCSS.stories.tsx :: Able Combination CombinationDraggableScalableRotatable smoke-test
passed stories/3-Group/0-Group.stories.tsx :: Group GroupAllInOne smoke-test
passed stories/3-Group/0-Group.stories.tsx :: Group GroupDraggableResizableRotatable smoke-test
passed stories/3-Group/0-Group.stories.tsx :: Group GroupDraggableScalableRotatable smoke-test
passed stories/3-Group/0-Group.stories.tsx :: Group GroupFixedResizeGroup smoke-test
passed stories/3-Group/0-Group.stories.tsx :: Group GroupMultipleGroup smoke-test
passed stories/3-Group/0-Group.stories.tsx :: Group GroupRoundableGroup smoke-test
passed stories/3-IndiviualGroup/0-Default.stories.tsx :: Individual Group IndividualGroupDraggableScalableRotatable smoke-test
passed stories/3-IndiviualGroup/0-Default.stories.tsx :: Individual Group IndividualGroupGroupableProps smoke-test
passed stories/4-Options/0-Default.stories.tsx :: Options OptionsAccuratePosition smoke-test
passed stories/4-Options/0-Default.stories.tsx :: Options OptionsCheckInput smoke-test
passed stories/4-Options/0-Default.stories.tsx :: Options OptionsControlPadding smoke-test
passed stories/4-Options/0-Default.stories.tsx :: Options OptionsDragFocusedInput smoke-test
passed stories/4-Options/0-Default.stories.tsx :: Options OptionsDragTarget smoke-test
passed stories/4-Options/0-Default.stories.tsx :: Options OptionsDragTargetSelf smoke-test
passed stories/4-Options/0-Default.stories.tsx :: Options OptionsLinePadding smoke-test
passed stories/4-Options/0-Default.stories.tsx :: Options OptionsMutationObserver smoke-test
passed stories/4-Options/0-Default.stories.tsx :: Options OptionsPadding smoke-test
passed stories/4-Options/0-Default.stories.tsx :: Options OptionsPersistData smoke-test
passed stories/4-Options/0-Default.stories.tsx :: Options OptionsPersistDataGroup smoke-test
passed stories/4-Options/0-Default.stories.tsx :: Options OptionsPersistDataIndividualGroup smoke-test
passed stories/4-Options/0-Default.stories.tsx :: Options OptionsResizeObserver smoke-test
passed stories/4-Options/0-Default.stories.tsx :: Options OptionsResizeObserverGroup smoke-test
passed stories/4-Options/0-Default.stories.tsx :: Options OptionsResizeObserverIndividualGroup smoke-test
passed stories/4-Options/0-Default.stories.tsx :: Options OptionsRootContainer smoke-test
passed stories/4-Options/0-Default.stories.tsx :: Options OptionsRootContainerZoom smoke-test
passed stories/4-Options/0-Default.stories.tsx :: Options OptionsViewContainer smoke-test
passed stories/4-Options/0-Default.stories.tsx :: Options OptionsZoom smoke-test
passed stories/4-SVG/0-SVG.stories.tsx :: SVG SVGCircle smoke-test
passed stories/4-SVG/0-SVG.stories.tsx :: SVG SVGFillboxOrigin smoke-test
passed stories/4-SVG/0-SVG.stories.tsx :: SVG SVGForeignObject smoke-test
passed stories/4-SVG/0-SVG.stories.tsx :: SVG SVGForeignObjectInner smoke-test
passed stories/4-SVG/0-SVG.stories.tsx :: SVG SVGG smoke-test
passed stories/4-SVG/0-SVG.stories.tsx :: SVG SVGGroup smoke-test
passed stories/4-SVG/0-SVG.stories.tsx :: SVG SVGLine smoke-test
passed stories/4-SVG/0-SVG.stories.tsx :: SVG SVGOrigin smoke-test
passed stories/4-SVG/0-SVG.stories.tsx :: SVG SVGPathElement smoke-test
passed stories/4-SVG/0-SVG.stories.tsx :: SVG SVGSVGElement smoke-test
passed stories/4-SVG/0-SVG.stories.tsx :: SVG SVGTargetG smoke-test
passed stories/5-Snap&Bound/0-Snap&Bound.stories.tsx :: Snap & Bound SnapBoundDragResize smoke-test
passed stories/5-Snap&Bound/0-Snap&Bound.stories.tsx :: Snap & Bound SnapBoundDragScale smoke-test
passed stories/5-Snap&Bound/0-Snap&Bound.stories.tsx :: Snap & Bound SnapDragRotate smoke-test
passed stories/5-Snap&Bound/0-Snap&Bound.stories.tsx :: Snap & Bound SnapDragRotateGroup smoke-test
passed stories/5-Snap&Bound/0-Snap&Bound.stories.tsx :: Snap & Bound SnapElements smoke-test
passed stories/5-Snap&Bound/0-Snap&Bound.stories.tsx :: Snap & Bound SnapElementsGroup smoke-test
passed stories/5-Snap&Bound/0-Snap&Bound.stories.tsx :: Snap & Bound SnapGrid smoke-test
passed stories/5-Snap&Bound/0-Snap&Bound.stories.tsx :: Snap & Bound SnapGridGroup smoke-test
passed stories/5-Snap&Bound/0-Snap&Bound.stories.tsx :: Snap & Bound SnapGuidelines smoke-test
passed stories/5-Snap&Bound/0-Snap&Bound.stories.tsx :: Snap & Bound SnapInnerBoundResize smoke-test
passed stories/5-Snap&Bound/0-Snap&Bound.stories.tsx :: Snap & Bound SnapMaxiumDistance smoke-test
passed stories/5-Snap&Bound/0-Snap&Bound.stories.tsx :: Snap & Bound SnapRotations smoke-test
passed stories/5-Snap&Bound/0-Snap&Bound.stories.tsx :: Snap & Bound SnapSnapContainer smoke-test
passed stories/5A-Advanced/0-Moveable/Deafult.stories.tsx :: Advanced Moveable Settings AdancedMoveableNoRelative smoke-test
passed stories/5A-Advanced/0-Moveable/Deafult.stories.tsx :: Advanced Moveable Settings AdancedMoveablePositionFixed smoke-test
passed stories/5A-Advanced/0-Moveable/Deafult.stories.tsx :: Advanced Moveable Settings AdancedMoveableSelectForm smoke-test
passed stories/5A-Advanced/1-Draggable/Deafult.stories.tsx :: advanced Draggable AdvancedDraggableEdgeDraggable smoke-test
passed stories/5A-Advanced/2-Resizable/Deafult.stories.tsx :: Advacned Resizable AdvancedResizableEdgeControl smoke-test
passed stories/5A-Advanced/2-Resizable/Deafult.stories.tsx :: Advacned Resizable AdvancedResizableFixedDirection smoke-test
passed stories/5A-Advanced/2-Resizable/Deafult.stories.tsx :: Advacned Resizable AdvancedResizableFlex smoke-test
passed stories/5A-Advanced/2-Resizable/Deafult.stories.tsx :: Advacned Resizable AdvancedResizableGroupMinSize smoke-test
passed stories/5A-Advanced/3-Scalable/Deafult.stories.tsx :: Advacned Scalable AdvancedScalableMinMax smoke-test
passed stories/5A-Advanced/4-Rotatable/Deafult.stories.tsx :: Advanced Rotatable AdvancedRotatableCustomOrigin smoke-test
passed stories/5A-Advanced/4-Rotatable/Deafult.stories.tsx :: Advanced Rotatable AdvancedRotatableRotateWithControls smoke-test
passed stories/5A-Advanced/4-Rotatable/Deafult.stories.tsx :: Advanced Rotatable AdvancedRotatableRotateWithResize smoke-test
passed stories/5A-Advanced/4-Rotatable/Deafult.stories.tsx :: Advanced Rotatable AdvancedSetRotation smoke-test
passed stories/5A-Advanced/5-Snappable/Deafult.stories.tsx :: Advanced Snappable AdvancedSnappableCustomElementGuidelines smoke-test
passed stories/5A-Advanced/5-Snappable/Deafult.stories.tsx :: Advanced Snappable AdvancedSnappableCustomGuidelines smoke-test
passed stories/5A-Advanced/9-Clippable/Deafult.stories.tsx :: Adavanced Clippable AdvancedClippable smoke-test
passed stories/5A-Advanced/9-Clippable/Deafult.stories.tsx :: Adavanced Clippable AdvancedClippableClipSnap smoke-test
passed stories/5A-Advanced/9-Clippable/Deafult.stories.tsx :: Adavanced Clippable AdvancedClippableClippedArea smoke-test
passed stories/5A-Advanced/9-Clippable/Deafult.stories.tsx :: Adavanced Clippable AdvancedClippableResizableKeepRatio smoke-test
passed stories/6-CustomAble/0-CustomAble.stories.tsx :: Make Custom Able CustomAbleDimensionViewable smoke-test
passed stories/6-CustomAble/0-CustomAble.stories.tsx :: Make Custom Able CustomAbleDragTarget smoke-test
passed stories/6-CustomAble/0-CustomAble.stories.tsx :: Make Custom Able CustomAbleEditable smoke-test
passed stories/6-CustomAble/0-CustomAble.stories.tsx :: Make Custom Able CustomAbleMouseEnterLeave smoke-test
passed stories/6-CustomAble/0-CustomAble.stories.tsx :: Make Custom Able CustomAbleRotatble smoke-test
passed stories/7-Request/0-Request.stories.tsx :: Request ables through a method RequestDraggable smoke-test
passed stories/7-Request/0-Request.stories.tsx :: Request ables through a method RequestDraggableAlign smoke-test
passed stories/7-Request/0-Request.stories.tsx :: Request ables through a method RequestDraggableSnappable smoke-test
passed stories/7-Request/0-Request.stories.tsx :: Request ables through a method RequestResizable smoke-test
passed stories/7-Request/0-Request.stories.tsx :: Request ables through a method RequestResizableDelta smoke-test
passed stories/7-Request/0-Request.stories.tsx :: Request ables through a method RequestResizableGroup smoke-test
passed stories/7-Request/0-Request.stories.tsx :: Request ables through a method RequestResizableSnappable smoke-test
passed stories/8-TreeShaking/0-TreeShaking.stories.tsx :: Support Tree Shaking TreeShaking smoke-test
passed stories/9-Scrolling/0-Scrollable.stories.tsx :: Support Scroll ScrollingScrollable smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestChangeTargetsOnClick smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestDragAPI smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestGroupPadding smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestIframe smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestNestedSVG smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestScalableKeepRatio smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestTranslate50 smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestsAccuracy smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestsAccurateElementGuidelines smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestsAccurateElementGuidelines2 smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestsChangingSnapContainer smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestsClick smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestsClickATag smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestsCustomElement smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestsCustomElementBounds smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestsDragStart smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestsDragtarget smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestsFixedSnap smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestsFlex smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestsHandleLargeNumber smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestsInput smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestsLargeZoom smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestsNestedTarget smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestsNoTarget smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestsOverflow smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestsRequestBounds smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestsRotateClippable smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestsSafari smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestsStopDrag smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestsTRSTarget smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestsWillChange smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestsZoomedCursor smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestsZoomedSnap smoke-test
passed stories/99-Tests/Deafult.stories.tsx :: Variable Situations TestsZoomedTarget smoke-test
passed stories/9A-Components/0-Components.stories.tsx :: Combination with Other Components ComponentsInfiniteViewer smoke-test
passed stories/9A-Components/0-Components.stories.tsx :: Combination with Other Components ComponentsSelecto smoke-test
passed stories/9A-Components/0-Components.stories.tsx :: Combination with Other Components ComponentsSelectoWithGroupUngroup smoke-test
passed stories/9A-Components/0-Components.stories.tsx :: Combination with Other Components ComponentsSelectoWithMultipleGroup smoke-test
passed stories/9A-Components/0-Components.stories.tsx :: Combination with Other Components ComponentsSelectoWithNestedGroup smoke-test
```

## 4. hoist 布局下未声明依赖的实际解析（任务 1.4）

方法：在使用方目录执行 `node -e "require.resolve('<name>/package.json')"` 读 version；rollup 3 的 `exports` 不导出 `package.json`（报 `ERR_PACKAGE_PATH_NOT_EXPORTED`），改为从使用方目录逐级向上查找 `node_modules/<name>/package.json`，与 Node 的解析顺序一致。

| 使用方 | 包 | 版本 | 解析路径 | 使用位置 |
|---|---|---|---|---|
| react-moveable | `webpack` | 4.46.0 | `node_modules/webpack` | `.storybook/main.js` 的 `require("webpack")` |
| react-moveable | `fork-ts-checker-webpack-plugin` | 6.5.2 | `node_modules/fork-ts-checker-webpack-plugin` | `.storybook/main.js` |
| react-moveable | `@storybook/client-api` | 6.5.16 | `node_modules/@storybook/client-api` | stories / `.storybook` 中 import |
| react-moveable | `@storybook/theming` | 6.5.16 | `packages/react-moveable/node_modules/@storybook/theming` | stories / `.storybook` 中 import |
| react-moveable | `playwright` | 1.25.2 | `node_modules/playwright` | test-runner 运行时 |
| moveable | `framework-utils` | 1.1.0 | `node_modules/framework-utils` | `src` import |
| preact-moveable | `framework-utils` | 1.1.0 | `node_modules/framework-utils` | `src` import |
| vue3-moveable | `@daybrush/utils` | 1.13.0 | `node_modules/@daybrush/utils` | `src` import |
| svelte-moveable | `@daybrush/utils` | 1.13.0 | `node_modules/@daybrush/utils` | `src` import |
| react-moveable、croact、helper、lit、moveable、preact | `rollup`（模块解析） | 3.29.2 | `node_modules/rollup` | `build` 脚本 `rollup -c` |
| helper | `eslint` | 7.32.0 | `node_modules/eslint` | `lint` 脚本 |
| helper | `@typescript-eslint/parser` | 3.10.1 | `node_modules/@typescript-eslint/parser` | `.eslintrc` |
| helper | `@typescript-eslint/eslint-plugin` | 3.10.1 | `node_modules/@typescript-eslint/eslint-plugin` | `.eslintrc` |
| helper | `eslint-plugin-import` | 2.26.0 | `node_modules/eslint-plugin-import` | `.eslintrc` |
| helper | `eslint-plugin-react` | 7.30.0 | `node_modules/eslint-plugin-react` | `.eslintrc` |
| 根 | `@scena/event-emitter` | 1.0.5 | `node_modules/@scena/event-emitter` | `jsdoc.json` 的 `source.include` |
| 从 `packages/react-moveable/dist` 出发 | `croact` | 1.0.4 | `node_modules/croact` | moveable UMD 构建中 compat 插件替换出的 `croact` |

补充说明：

- **webpack 是 4.46.0**，与 design 决策 2 要求的 4.x 一致，不存在「有意偏离基线」。
- **rollup 可执行文件与模块版本不同**：`yarn.lock` 中有 `rollup@*, ^3.0.0, ^3.21.0 → 3.25.3` 与 `rollup@^3.7.1 → 3.29.2`（`@daybrush/builder@0.2.4` 依赖 `^3.7.1`）两个条目。根 `node_modules/.bin/rollup` 被 yarn 链接到 `node_modules/@rollup/pluginutils/node_modules/rollup`（3.25.3），各包 `node_modules/.bin` 下都没有 rollup，所以基线中 `rollup -c` 实际执行的 CLI 是 **3.25.3**，而模块解析（含 `@daybrush/builder` 自己使用的）是 **3.29.2**。
- **jsdoc**：根脚本 `doc` 调用的 `jsdoc` 可执行文件来自根已声明的 `@daybrush/jsdoc@0.4.7`（`node_modules/.bin/jsdoc → ../@daybrush/jsdoc/jsdoc.js`），不存在名为 `jsdoc` 的包，无需补声明。

## 5. 删除包之后的对比（任务 2.5，仍为 Node 16.20.2 + yarn 1）

- `yarn` 刷新 `yarn.lock`：成功。按 `name@version` 比较新旧锁文件，**没有新增任何版本**，移除 706 个；diff 中的「新增行」都是同一版本的 spec 合并重排。
- `@angular/`、`@vue/cli-service`、`ng-packagr`：已不在 `yarn.lock` 中。
- **`vue-template-compiler@2.7.14` 仍在**：来源是 `vue3-moveable` 的 `vue-tsc@^1.8.1` → `@vue/language-core@1.8.2` 的 `dependencies`（Vue 3 类型检查工具链的传递依赖，不是 Vue 2 专属）。去掉它需要升级 vue-tsc，超出本 change「不升级依赖」的范围。**用户已确认登记为例外**，tasks 2.5 / 3.4 与 framework-packages spec 已相应修改。
- `yarn packages:build`：成功，lerna 构建 7 个包。产物文件清单与第 2.3 节**完全一致，逐文件字节数也完全一致**。
- `yarn test:ci`：20 suites / 137 tests 全部通过；逐条 story 结果与第 3.3 节**完全一致**。
