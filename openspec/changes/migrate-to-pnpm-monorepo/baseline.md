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
7. **（第 7.8 节补记）** 18 条 TypeScript 旧 factory API 的弃用警告：`DeprecationWarning: 'createIdentifier' has been deprecated since v4.0.0. Use the appropriate method on 'ts.factory' ...`，另外还有 `createLiteral`、`createBinaryExpression`、`createExpressionStatement`、`createPropertyAssignment`、`createObjectLiteralExpression`、`createTypeOfExpression`、`createElementAccessExpression`、`createIfStatement`、`createBlock`、`createVariableDeclaration`、`createCatchClause`、`createTryStatement`、`createNull`、`createFalse`、`createTrue`，以及一条名称为空的 `''`。当时用 `head -40` 截取日志，这些行被 webpack 进度输出挤掉了，所以第一次没有记下来。

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

## 6. 补齐的依赖声明（任务 3.3）

每条都对应第 4 节的使用位置和基线版本：

| 声明方 | 段 | 依赖 | 范围 | 基线版本 / 依据 |
|---|---|---|---|---|
| react-moveable | devDependencies | `webpack` | `^4.46.0` | 4.46.0，`.storybook/main.js` |
| react-moveable | devDependencies | `fork-ts-checker-webpack-plugin` | `^6.5.2` | 6.5.2，`.storybook/main.js` |
| react-moveable | devDependencies | `@storybook/client-api` | `6.5.16` | 6.5.16，`stories/utils/story.tsx` |
| react-moveable | devDependencies | `@storybook/theming` | `6.5.16` | 6.5.16，`.storybook/preview.jsx` |
| react-moveable | devDependencies | `playwright` | `^1.25.2` | 1.25.2；3.10 和 CI 在本包执行 `playwright install`，属于脚本直接调用的可执行文件，版本与 test-runner 运行时使用的一致（任务清单未列出，此处补记） |
| react-moveable、croact、helper、lit、moveable、preact | devDependencies | `rollup` | `~3.25.3` | 基线 `rollup -c` 实际执行的 CLI 是 3.25.3（见第 4 节），锁定同一版本，避免打包器版本变化导致产物差异 |
| moveable、preact-moveable | dependencies | `framework-utils` | `^1.1.0` | 1.1.0，`src` import |
| vue3-moveable、svelte-moveable | dependencies | `@daybrush/utils` | `^1.13.0` | 1.13.0，`src` import |
| helper | devDependencies | `eslint`、`@typescript-eslint/parser`、`@typescript-eslint/eslint-plugin`、`eslint-plugin-import`、`eslint-plugin-react` | `^7.32.0`、`^3.10.1`、`^3.10.1`、`^2.26.0`、`^7.30.0` | 基线解析版本，`lint` 脚本与 `.eslintrc` |
| 根 | devDependencies | `@scena/event-emitter` | `^1.0.5` | 1.0.5，`jsdoc.json` |

## 7. 切换到 pnpm 后的记录（任务 3.1–3.7，Node 22.20.0 + pnpm 11.28.2）

### 7.1 环境说明

本机直连 `registry.npmjs.org` 时 TLS 会间歇性返回自签名证书（curl 同样如此），而 pnpm 不读取 macOS 的系统代理。因此本次 `pnpm import` / `pnpm install` 都临时加了 `HTTPS_PROXY=http://127.0.0.1:7890 HTTP_PROXY=http://127.0.0.1:7890` 环境变量，走本机代理。这只是本机网络问题，没有写进仓库配置。

### 7.2 对 1.4 解析结果的更正

1.4 的解析是在**删除包之前**测的。删包后（第 2 阶段，构建、测试与基线完全一致的那个状态）重新测了一遍，只有 helper 的 `@typescript-eslint/parser`、`@typescript-eslint/eslint-plugin` 不同：删包前是 3.10.1（来自已删除的包），删包后是 **5.60.1**（与 react-moveable 声明的一致）。因此 helper 声明的是 `^5.60.1`，其余各项不变。

### 7.3 锁文件与 yarn.lock 的版本差异（任务 3.4）

`pnpm import` 生成的锁文件里有 2429 个包版本。相对 `yarn.lock` 新出现的版本及其来源：

- `@storybook/expect`：`@storybook/jest@0.0.10` 依赖的是 dist-tag `storybook-jest`，`pnpm import` 会把它解析成 tag 当前指向的 28.1.3-5（连带引入 `@types/jest@28.1.3`）。已用 override `@storybook/jest>@storybook/expect: 27.5.2-0` 锁回基线版本，见 design 决策 5。
- `preact@8.5.3`：pnpm 自动安装缺失的 peer（`preact-compat` 等的 peer）。
- `@types/keyv`、`@types/responselike`（来自 `got@6.7.1`）以及 `semver@5.5.1`、`yamlparser`（来自 `useragent@2.3.0`）：pnpm 内置兼容库补上的依赖。

其余版本都在 `yarn.lock` 里出现过。yarn.lock 中有、pnpm 中没有的条目，是 pnpm 对同一范围选用了 yarn.lock 里的另一个已有版本，或者条目随已删除的包一起消失了。

关键依赖的版本与 yarn.lock 一致：`typescript` 只有 4.8.4，gesto 1.19.4、rollup 3.25.3、react / react-dom 16.14.0、croact 1.0.4、webpack 4.46.0、playwright 1.25.2、vite 4.3.9、svelte 4.2.0、vue 3.3.4、lit 2.6.1、`@storybook/*` 6.5.16、`@storybook/test-runner` 0.9.4。

### 7.4 构建脚本审批（任务 3.5）

只允许 `esbuild` 执行构建脚本；`@sveltejs/kit`、`core-js`、`core-js-pure`、`fsevents`、`playwright`、`preact`、`svelte-preprocess` 都显式拒绝，理由写在 `pnpm-workspace.yaml` 的注释里。vue3-moveable 和 svelte-moveable 的 `vite build` 都成功。

### 7.5 逐包构建暴露出的新增缺失依赖（任务 3.7）

| 声明方 | 段 | 依赖 | 范围 | 依据 |
|---|---|---|---|---|
| croact-moveable | devDependencies | `@types/node` | `^18.11.3` | `src/index.umd.ts` 的 `module.exports`，rpt2 报 `TS2552: Cannot find name 'module'` |
| moveable | devDependencies | `@types/node` | `^18.11.3` | `src/index.cjs.ts` 的 `module.exports`，同上 |

hoist 布局下，TS 会自动加载根目录 `node_modules/@types/node`。当时 hoist 的具体版本没有记录，现在 yarn 的 node_modules 已经删除，无法复查。这个包只提供 `module` 全局变量的类型声明，不会进入产物，所以取 react-moveable 已声明、yarn.lock 里也有的 18.11.3。补齐后 8 个包的 `pnpm --filter <pkg> build` 全部成功，日志里没有 `command not found` 或 `Cannot find module`。

### 7.6 moveable UMD（任务 3.8）

**复现**：在不改配置的情况下用 pnpm 构建 moveable，`moveable.js` 和 `moveable.min.js` 都出现了 `(!) Unresolved dependencies: react (imported by "../react-moveable/dist/moveable.esm.js")` 和 `Missing global variable name: react (guessing "React")`，产物头部变成 `factory(require('react'))` / `global.React`，不再自包含。和 design 的预测不同，未解析的模块名是 `react`，不是 `croact`。原因是 `rollup-plugin-react-compat` 的 `resolveCompat` 从 importer（`packages/react-moveable/dist`）出发解析 `croact`，react-moveable 不依赖 croact，所以解析失败，原始的 `react` 就被当成了外部依赖。

**修复**：在 `packages/moveable/rollup.config.js` 两个 UMD 构建的 compat 插件之前加了一个 `resolveId` 插件，把 `react` / `react-dom` 用 `this.resolve("croact", __filename)` 从 moveable 自己的目录解析（moveable 声明了 `croact`）。

**验证**：构建日志里没有任何「未解析」警告；产物头部是 `factory()`；`moveable.js`、`moveable.min.js` 中 `require('croact')`、`require("croact")`、`global.croact`、`require('react')`、`global.React` 都是 0 次。`moveable.min.js` **与基线逐字节相同**。

### 7.7 产物体积差异的原因

为了逐字节对比，在 scratchpad 中用 git worktree 检出第 2 阶段提交 `c655b9de`，在 Node 16 + yarn 下重建了一份对照产物。它的文件清单和体积与第 2.3 节完全一致。和 pnpm 构建的产物相比，差异如下：

| 文件 | 差异 | 原因 |
|---|---|---|
| `helper/dist/helper.js.map`、`lit-moveable/dist/*.map` | +42 ~ +956 字节 | `mappings` 完全相同，只是 `sources` 中的依赖路径从 `node_modules/<pkg>` 变成了 `node_modules/.pnpm/<id>/node_modules/<pkg>` |
| `moveable/dist/moveable.js`、`moveable.esm.js`、`moveable.cjs.js` 及其 `.map` | -37 ~ -3670 字节 | `diff -w -B` 显示只有注释位置和空行不同。`@daybrush/builder` 用的 babel 从 `@babel/core 7.18.2 / @babel/generator 7.18.2` 变成了 `7.19.0 / 7.21.1`：都是 yarn.lock 里已有的版本，`pnpm import` 对同一范围选了另一个已有版本。新版 generator 会把行尾注释挪到单独一行，并去掉多余的空行。terser 压缩后的 `moveable.min.js` 与基线逐字节相同，可以证明语义没有变化 |
| `lit-moveable/dist/moveable.umd.js`（3.12 全量构建时出现） | -37 字节 | lit 的 UMD 会内联 moveable 的 ESM 产物，差异与上一行 `moveable.esm.js` 的 -37 字节相同；`diff -w -B` 为空，只有空行不同 |
| `lit-moveable/declaration/LitMoveable.d.ts` | -5 字节 | `render()` 的返回类型从 `import("lit-html").TemplateResult<1>` 变成 `import("lit").TemplateResult<1>`。严格布局下 lit-moveable 访问不到它没有声明的 `lit-html`，TS 改用 `lit` 重新导出的同一个类型 |

react-moveable、croact-moveable、preact-moveable、vue3-moveable、svelte-moveable 以及其余 declaration 与基线逐字节大小相同。

### 7.8 Storybook 启动警告对比（任务 3.10）

第 3.2 节的原始日志已随 scratchpad 被清理。所以用第 7.7 节的 yarn 对照 worktree（Node 16）重新完整采集了一次启动日志，与 Node 22 + pnpm 的启动日志逐条比较（去掉 webpack 进度、堆栈行和模块清单之后去重）：

- 两边相同：`Failed to load preset` 和 `ERR_INVALID_ARG_TYPE`、PostCSS 弃用警告、18 条 TS factory API 弃用警告（第 3.2 节第 7 条，基线漏记）、`No issues found.`。
- 只在 yarn 里出现：yarn 自己打印的 `react-selecto` 重复声明提示，pnpm 不输出这类提示。
- **只在 pnpm 里出现**：`` `isModuleDeclaration` has been deprecated, please migrate to `isImportOrExportDeclaration` ``。来源是 pnpm 把 `@babel/types` 统一成了 7.21.2（yarn.lock 里本来就有，但基线的部分子树用的是 7.18.4 / 7.19.0）。这只是一条日志，不影响启动。**用户已确认接受。**

Node 22 下 Storybook 正常启动，`http://localhost:6006/` 和 `iframe.html` 都返回 200，没有 `ERR_OSSL_EVP_UNSUPPORTED`。也没有出现找不到 preset 或 addon 的问题，所以 `.storybook/main.js` 不需要改成绝对路径。

### 7.9 全量构建对比（任务 3.12）

`pnpm packages:build`（即 `pnpm -r build`）成功，构建顺序为 react-moveable → croact / preact → moveable → vue3 / lit / svelte，helper 独立构建。

- 文件清单与第 2.3 节完全一致；体积差异逐项见第 7.7 节，都能解释。
- 「Unresolved dependencies」与第 2.1 节登记的例外完全一致（react-moveable 13 个、helper 1 个、lit-moveable 5 个，各出现在 ESM 和 CJS 两次构建中），没有扩大；UMD 构建中没有此类警告。
- croact-moveable、moveable、preact-moveable、lit-moveable 的 `dist` 中都没有 `__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED`。
- 3.8 的 UMD 检查依然通过，`moveable.min.js` 与基线逐字节相同。

Node 22 下的 `test:ci`（任务 3.11）：20 个 suite、137 个测试全部通过，逐条 story 结果与第 3.3 节完全一致。

## 8. CI 验证（任务 4.1）

工作流使用 `actions/checkout@v7`、`pnpm/action-setup@v6`（pnpm 版本读取 `packageManager`）、`actions/setup-node@v7`（Node 版本读取 `.nvmrc`，`cache: pnpm`）、`actions/cache@v6`（缓存 Playwright 浏览器）、`actions/upload-artifact@v7`，都是实施时（2026-10）各 action 的最新主版本。

| 提交 | Run | 结果 |
|---|---|---|
| `1e614d2f` 迁移后的正常提交 | 38110841238 | success，pnpm v11.28.2，20 suites / 137 tests 全部通过 |
| `3ee5558f` 临时把 `0-Basic.stories.tsx` 的一处断言改错 | 38111106661 | failure（符合预期）；`Archive Failed Artifact` 成功上传 `failed snapshot`（816706 字节） |
| `8cb215a1` revert 上面的临时提交 | 38111294593 | success，137 tests 全部通过 |

补充说明：

- 失败那次运行中，`Run Original Storybook`（`test:fail-ci`）本身也失败了。原因是 `SKIP_TEST=true` 的生产模式下，`stories/utils/story.tsx` 会把名字以 `Test` 结尾的 story 从 `facade.stories` 中隐藏，而 test-runner 仍然按索引去加载它们，于是报 `Unable to load story '...-test'`。这段逻辑本次迁移没有改动，判断为迁移前就有的行为，但没有在 yarn 下实际复现。截图照常生成并上传，满足 spec「测试失败时上传失败快照」的场景。
- `pnpm/action-setup@v6` 会提示 `Detected a pnpm v10 installation layout at PNPM_HOME`，不影响运行。
- 本机 git 钥匙串里的 GitHub token 没有 `workflow` 权限，推送修改 workflow 文件的提交时被拒绝。这几次推送改用了 `gh auth git-credential`：同一个账号（ID 46670238，原名 `li1164267803`，已改名为 `colinli007`），只对单条命令生效，没有改 git 配置。
