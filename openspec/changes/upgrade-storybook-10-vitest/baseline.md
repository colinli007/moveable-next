# 基线记录（upgrade-storybook-10-vitest）

记录时间：2026-10-11，提交 `a2828437`，Node 22.20.0，pnpm 11.28.2，TypeScript 4.8.4（全局 override），Storybook 6.5.16。

## 1.1 构建产物

`pnpm packages:build` 成功。rollup「Unresolved dependencies」警告只出现在 helper、react-moveable、lit-moveable 的 ESM / CJS 构建中，与 monorepo-tooling 主 spec 登记的例外一致。

共 127 个文件（`stat -f "%z %N"`，体积单位为字节）：

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
88503 packages/helper/dist/helper.js.map
9446 packages/helper/dist/helper.min.js
94 packages/helper/dist/helper.min.js.map
57 packages/lit-moveable/declaration/index.d.ts
757 packages/lit-moveable/declaration/LitMoveable.d.ts
214 packages/lit-moveable/declaration/types.d.ts
4464 packages/lit-moveable/dist/moveable.cjs.js
16571 packages/lit-moveable/dist/moveable.cjs.js.map
4148 packages/lit-moveable/dist/moveable.esm.js
16410 packages/lit-moveable/dist/moveable.esm.js.map
862780 packages/lit-moveable/dist/moveable.umd.js
1681204 packages/lit-moveable/dist/moveable.umd.js.map
122 packages/moveable/declaration/consts.d.ts
82 packages/moveable/declaration/index.cjs.d.ts
136 packages/moveable/declaration/index.d.ts
57 packages/moveable/declaration/index.umd.d.ts
239 packages/moveable/declaration/InnerMoveable.d.ts
107 packages/moveable/declaration/Moveable.d.ts
947 packages/moveable/declaration/MoveableManager.d.ts
273 packages/moveable/declaration/types.d.ts
652 packages/moveable/declaration/utils.d.ts
8275 packages/moveable/dist/moveable.cjs.js
6509 packages/moveable/dist/moveable.cjs.js.map
7345 packages/moveable/dist/moveable.esm.js
11658 packages/moveable/dist/moveable.esm.js.map
790262 packages/moveable/dist/moveable.js
1307886 packages/moveable/dist/moveable.js.map
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

## 1.1 Storybook 6 测试结果

`pnpm --filter react-moveable test:build` 后用 http-server 在 6017 端口提供静态产物（6006 被一个已有的 `start-storybook --ci` 进程占用），执行 `test-storybook --url http://127.0.0.1:6017 --json --outputFile`。结果：137/137 通过，20 个测试文件。逐条结果见下方 1.2 清单的「SB6」列。

## 1.2 story 清单（137 条）

「有效 args」按现有 `add()` 的行为计算：`{ ...makeArgs(argsTypes), args }`，传入的 `args` 被嵌套成一个名为 `args` 的键，没有展开。只有 `BasicScalableKeepRatioTest` 传了 `args: { keepRatio: true }`，它实际生效的 `keepRatio` 是 `false`。每个 story 完整的有效 args 见文末附录。

| story id | 显示名 | export | 文件 | App | play | SB6 |
|---|---|---|---|---|---|---|
| basic--basic-draggable | Draggable | BasicDraggable | 1-Basic/0-Basic.stories.tsx | ReactDraggableApp | ✓ | passed |
| basic--basic-resizable | Resizable | BasicResizable | 1-Basic/0-Basic.stories.tsx | ReactResizableApp | ✓ | passed |
| basic--basic-scalable | Scalable | BasicScalable | 1-Basic/0-Basic.stories.tsx | ReactScalableApp | ✓ | passed |
| basic--basic-scalable-keep-ratio-test | Scalable keepRatio Test | BasicScalableKeepRatioTest | 1-Basic/0-Basic.stories.tsx | ReactScalableApp | ✓ | passed |
| basic--baisc-rotatable | Rotatable | BaiscRotatable | 1-Basic/0-Basic.stories.tsx | ReactRotatableApp | ✓ | passed |
| basic--basic-warpable | Warpable | BasicWarpable | 1-Basic/0-Basic.stories.tsx | ReactWarpableApp | ✓ | passed |
| basic--basic-clippable | Clippable | BasicClippable | 1-Basic/0-Basic.stories.tsx | ReactClippableApp | ✓ | passed |
| basic--basic-roundable | Roundable | BasicRoundable | 1-Basic/0-Basic.stories.tsx | ReactRoundableApp | ✓ | passed |
| basic--basic-origin-draggable | OriginDraggable | BasicOriginDraggable | 1-Basic/0-Basic.stories.tsx | ReactOriginDraggableApp | ✓ | passed |
| basic--basic-pinchable | Pinchable | BasicPinchable | 1-Basic/0-Basic.stories.tsx | ReactPinchableApp | ✓ | passed |
| able-combination--combination-draggable-resizable-rotatble | Draggable & Resizable & Rotatable | CombinationDraggableResizableRotatble | 2-Combination/0-UseCSS.stories.tsx | ReactDraggableResizableRotatableApp |  | passed |
| able-combination--combination-draggable-scalable-rotatable | Draggable & Scalable & Rotatable | CombinationDraggableScalableRotatable | 2-Combination/0-UseCSS.stories.tsx | ReactDraggableScalableRotatableApp |  | passed |
| able-combination--combination-draggable-origin-rotatable | Draggable & OriginDraggable & Rotatable | CombinationDraggableOriginRotatable | 2-Combination/0-UseCSS.stories.tsx | ReactDraggableOriginDraggableRotatableApp |  | passed |
| able-combination--combination-all-in-one | All In One | CombinationAllInOne | 2-Combination/0-UseCSS.stories.tsx | ReactAllInOneApp |  | passed |
| group--group-draggable-resizable-rotatable | Draggable & Resizable & Rotatable | GroupDraggableResizableRotatable | 3-Group/0-Group.stories.tsx | ReactDraggableResizableRotatableApp | ✓ | passed |
| group--group-draggable-scalable-rotatable | Draggable & Scalable & Rotatable | GroupDraggableScalableRotatable | 3-Group/0-Group.stories.tsx | ReactDraggableScalableRotatableApp | ✓ | passed |
| group--group-all-in-one | All in One | GroupAllInOne | 3-Group/0-Group.stories.tsx | ReactAllInOneApp |  | passed |
| group--group-multiple-group | Multiple Group | GroupMultipleGroup | 3-Group/0-Group.stories.tsx | ReactMultipleGroupApp | ✓ | passed |
| group--group-roundable-group | Roundable Group | GroupRoundableGroup | 3-Group/0-Group.stories.tsx | ReactRoundableGroupApp | ✓ | passed |
| group--group-fixed-resize-group | Fixed Position Resize Group | GroupFixedResizeGroup | 3-Group/0-Group.stories.tsx | ReactFixedResizeGroupApp |  | passed |
| individual-group--individual-group-draggable-scalable-rotatable | Draggable & Scalable & Rotatable | IndividualGroupDraggableScalableRotatable | 3-IndiviualGroup/0-Default.stories.tsx | ReactDraggableScalableRotatableApp |  | passed |
| individual-group--individual-group-groupable-props | Use Individual Groupable Props | IndividualGroupGroupableProps | 3-IndiviualGroup/0-Default.stories.tsx | ReactIndividualGroupablePropsApp |  | passed |
| options--options-resize-observer | useResizeObserver | OptionsResizeObserver | 4-Options/0-Default.stories.tsx | ReactUseResizeObserverApp |  | passed |
| options--options-resize-observer-group | useResizeObserver (Group) | OptionsResizeObserverGroup | 4-Options/0-Default.stories.tsx | ReactUseResizeObserverGroupApp |  | passed |
| options--options-resize-observer-individual-group | useResizeObserver (Individual Group) | OptionsResizeObserverIndividualGroup | 4-Options/0-Default.stories.tsx | ReactUseResizeObserverIndividualGroupApp |  | passed |
| options--options-mutation-observer | useMutationObserver | OptionsMutationObserver | 4-Options/0-Default.stories.tsx | ReactUseMutationObserverApp |  | passed |
| options--options-padding | padding | OptionsPadding | 4-Options/0-Default.stories.tsx | ReactPaddingApp | ✓ | passed |
| options--options-line-padding | linePadding | OptionsLinePadding | 4-Options/0-Default.stories.tsx | ReactLinePaddingApp |  | passed |
| options--options-control-padding | controlPadding | OptionsControlPadding | 4-Options/0-Default.stories.tsx | ReactControlPaddingApp |  | passed |
| options--options-check-input | checkInput | OptionsCheckInput | 4-Options/0-Default.stories.tsx | ReactCheckInputApp |  | passed |
| options--options-drag-focused-input | dragFocusedInput | OptionsDragFocusedInput | 4-Options/0-Default.stories.tsx | ReactDragFocusedInputApp |  | passed |
| options--options-view-container | viewContainer (Cursor is applied in viewer during dragging) | OptionsViewContainer | 4-Options/0-Default.stories.tsx | ReactViewContainerApp |  | passed |
| options--options-persist-data | persistData (First render with persisted data) | OptionsPersistData | 4-Options/0-Default.stories.tsx | ReactPersistDataApp |  | passed |
| options--options-persist-data-group | persistData (First render with persisted data, group) | OptionsPersistDataGroup | 4-Options/0-Default.stories.tsx | ReactGroupPersistDataApp |  | passed |
| options--options-persist-data-individual-group | persistData (First render with persisted data, individual group) | OptionsPersistDataIndividualGroup | 4-Options/0-Default.stories.tsx | ReactIndividualGroupPersistDataApp |  | passed |
| options--options-root-container | rootContainer (css transformed container) | OptionsRootContainer | 4-Options/0-Default.stories.tsx | ReactTransformedApp |  | passed |
| options--options-root-container-zoom | rootContainer (css zoomed container) | OptionsRootContainerZoom | 4-Options/0-Default.stories.tsx | ReactRootContainerApp |  | passed |
| options--options-zoom | zoom (line, control) | OptionsZoom | 4-Options/0-Default.stories.tsx | ReactZoomApp |  | passed |
| options--options-accurate-position | useAccuratePosition (Render in a more accurate position) | OptionsAccuratePosition | 4-Options/0-Default.stories.tsx | ReactUseAccuratePositionApp |  | passed |
| options--options-drag-target | other dragTarget | OptionsDragTarget | 4-Options/0-Default.stories.tsx | ReactDragTargetApp |  | passed |
| options--options-drag-target-self | dragTargetSelf with other dragTarget | OptionsDragTargetSelf | 4-Options/0-Default.stories.tsx | ReactDragTargetSelfApp |  | passed |
| svg--svg-path-element | SVGPathElement | SVGPathElement | 4-SVG/0-SVG.stories.tsx | ReactPathApp |  | passed |
| svg--svgsvg-element | SVGSVGElement | SVGSVGElement | 4-SVG/0-SVG.stories.tsx | ReactSVGSVGApp |  | passed |
| svg--svg-circle | Circle | SVGCircle | 4-SVG/0-SVG.stories.tsx | ReactSVGCircleApp |  | passed |
| svg--svg-line | Line | SVGLine | 4-SVG/0-SVG.stories.tsx | ReactSVGLineApp |  | passed |
| svg--svgg | SVGElement with G tag | SVGG | 4-SVG/0-SVG.stories.tsx | ReactSVGGApp |  | passed |
| svg--svg-target-g | SVGElement with target G tag | SVGTargetG | 4-SVG/0-SVG.stories.tsx | ReactSVGTargetGApp |  | passed |
| svg--svg-group | SVG Group | SVGGroup | 4-SVG/0-SVG.stories.tsx | ReactSVGGroupApp | ✓ | passed |
| svg--svg-origin | SVGPathElement with center origin | SVGOrigin | 4-SVG/0-SVG.stories.tsx | ReactOriginApp |  | passed |
| svg--svg-fillbox-origin | SVGPathElement with center origin and transform fill-box | SVGFillboxOrigin | 4-SVG/0-SVG.stories.tsx | ReactOriginFillboxApp |  | passed |
| svg--svg-foreign-object | SVGForeignObject | SVGForeignObject | 4-SVG/0-SVG.stories.tsx | ReactSVGForeignObjectApp |  | passed |
| svg--svg-foreign-object-inner | SVGForeignObject div | SVGForeignObjectInner | 4-SVG/0-SVG.stories.tsx | ReactSVGForeignObjectInnerApp |  | passed |
| snap-bound--snap-guidelines | Snap Guidelines | SnapGuidelines | 5-Snap&Bound/0-Snap&Bound.stories.tsx | ReactSnapGuidelinesApp | ✓ | passed |
| snap-bound--snap-elements | Snap Elements | SnapElements | 5-Snap&Bound/0-Snap&Bound.stories.tsx | ReactSnapElementsApp |  | passed |
| snap-bound--snap-grid | Snap Grid | SnapGrid | 5-Snap&Bound/0-Snap&Bound.stories.tsx | ReactSnapGridApp |  | passed |
| snap-bound--snap-grid-group | Snap Grid Group (snapGridAll) | SnapGridGroup | 5-Snap&Bound/0-Snap&Bound.stories.tsx | ReactSnapGridGroupApp |  | passed |
| snap-bound--snap-bound-drag-scale | Bound Drag & Scale | SnapBoundDragScale | 5-Snap&Bound/0-Snap&Bound.stories.tsx | ReactBoundScalableApp |  | passed |
| snap-bound--snap-bound-drag-resize | Bound Drag & Resize | SnapBoundDragResize | 5-Snap&Bound/0-Snap&Bound.stories.tsx | ReactBoundResizableApp |  | passed |
| snap-bound--snap-drag-rotate | Bound Drag & Rotate | SnapDragRotate | 5-Snap&Bound/0-Snap&Bound.stories.tsx | ReactBoundRotatableApp |  | passed |
| snap-bound--snap-drag-rotate-group | Bound Drag & Rotate Group | SnapDragRotateGroup | 5-Snap&Bound/0-Snap&Bound.stories.tsx | ReactBoundRotatableGroupApp |  | passed |
| snap-bound--snap-snap-container | Use snapContainer option | SnapSnapContainer | 5-Snap&Bound/0-Snap&Bound.stories.tsx | ReactSnapContainerApp |  | passed |
| snap-bound--snap-inner-bound-resize | inner bound with resize | SnapInnerBoundResize | 5-Snap&Bound/0-Snap&Bound.stories.tsx | ReactInnerBoundResizableApp |  | passed |
| snap-bound--snap-maxium-distance | Set maximum distance for guidelines | SnapMaxiumDistance | 5-Snap&Bound/0-Snap&Bound.stories.tsx | ReactMaxSnapElementApp |  | passed |
| snap-bound--snap-elements-group | Snap Elements (group) | SnapElementsGroup | 5-Snap&Bound/0-Snap&Bound.stories.tsx | ReactSnapElementsGroupApp | ✓ | passed |
| snap-bound--snap-rotations | Snap Rotations | SnapRotations | 5-Snap&Bound/0-Snap&Bound.stories.tsx | ReactSnapRotationsApp | ✓ | passed |
| advanced-moveable-settings--adanced-moveable-position-fixed | Target with position: fixed; | AdancedMoveablePositionFixed | 5A-Advanced/0-Moveable/Deafult.stories.tsx | ReactPositionFixedApp |  | passed |
| advanced-moveable-settings--adanced-moveable-select-form | Select Form | AdancedMoveableSelectForm | 5A-Advanced/0-Moveable/Deafult.stories.tsx | ReactSelectFormApp |  | passed |
| advanced-moveable-settings--adanced-moveable-no-relative | Static Body | AdancedMoveableNoRelative | 5A-Advanced/0-Moveable/Deafult.stories.tsx | ReactNoRelativeApp |  | passed |
| advanced-draggable--advanced-draggable-edge-draggable | edgeDraggable with edge | AdvancedDraggableEdgeDraggable | 5A-Advanced/1-Draggable/Deafult.stories.tsx | ReactEdgeDraggableWithEdgeApp |  | passed |
| advacned-resizable--advanced-resizable-fixed-direction | Resizable & Scalable with fixed direction | AdvancedResizableFixedDirection | 5A-Advanced/2-Resizable/Deafult.stories.tsx | ReactFixedDirectionApp |  | passed |
| advacned-resizable--advanced-resizable-flex | Resizable with display: flex | AdvancedResizableFlex | 5A-Advanced/2-Resizable/Deafult.stories.tsx | ReactFlexApp |  | passed |
| advacned-resizable--advanced-resizable-group-min-size | Limit Sizes with Group | AdvancedResizableGroupMinSize | 5A-Advanced/2-Resizable/Deafult.stories.tsx | ReactGroupMinSizeApp |  | passed |
| advacned-resizable--advanced-resizable-edge-control | Using Edges and Controls with Draggable, Resizable, and Scalable | AdvancedResizableEdgeControl | 5A-Advanced/2-Resizable/Deafult.stories.tsx | ReactWithEdgeControlApp |  | passed |
| advacned-scalable--advanced-scalable-min-max | Scalable with min, max size | AdvancedScalableMinMax | 5A-Advanced/3-Scalable/Deafult.stories.tsx | ReactScalableMinMaxApp |  | passed |
| advanced-rotatable--advanced-rotatable-custom-origin | rotate with custom origin | AdvancedRotatableCustomOrigin | 5A-Advanced/4-Rotatable/Deafult.stories.tsx | ReactCustomOriginApp |  | passed |
| advanced-rotatable--advanced-rotatable-rotate-with-controls | rotate with direction controls | AdvancedRotatableRotateWithControls | 5A-Advanced/4-Rotatable/Deafult.stories.tsx | ReactRotateWithControlsApp |  | passed |
| advanced-rotatable--advanced-rotatable-rotate-with-resize | rotate with resize | AdvancedRotatableRotateWithResize | 5A-Advanced/4-Rotatable/Deafult.stories.tsx | ReactRotateWithResizeApp |  | passed |
| advanced-rotatable--advanced-set-rotation | customize the rotation value  | AdvancedSetRotation | 5A-Advanced/4-Rotatable/Deafult.stories.tsx | ReactSetRotationApp | ✓ | passed |
| advanced-snappable--advanced-snappable-custom-guidelines | Guidelines with custom styles | AdvancedSnappableCustomGuidelines | 5A-Advanced/5-Snappable/Deafult.stories.tsx | ReactCustomGuidelinesApp |  | passed |
| advanced-snappable--advanced-snappable-custom-element-guidelines | Element Guidelines with custom styles | AdvancedSnappableCustomElementGuidelines | 5A-Advanced/5-Snappable/Deafult.stories.tsx | ReactCustomElementGuidelinesApp |  | passed |
| adavanced-clippable--advanced-clippable | Clippable with Drag, Resize, Rotate | AdvancedClippable | 5A-Advanced/9-Clippable/Deafult.stories.tsx | ReactClippableApp |  | passed |
| adavanced-clippable--advanced-clippable-clipped-area | Drag, Resize, Rotate with Clipped Area (Testing) | AdvancedClippableClippedArea | 5A-Advanced/9-Clippable/Deafult.stories.tsx | ReactClippedAreaApp |  | passed |
| adavanced-clippable--advanced-clippable-clip-snap | Clip & Snap | AdvancedClippableClipSnap | 5A-Advanced/9-Clippable/Deafult.stories.tsx | ReactClipSnapApp |  | passed |
| adavanced-clippable--advanced-clippable-resizable-keep-ratio | keepRatio for both clippable and resizeable | AdvancedClippableResizableKeepRatio | 5A-Advanced/9-Clippable/Deafult.stories.tsx | ReactClippableResizableKeepRatioApp |  | passed |
| make-custom-able--custom-able-dimension-viewable | DimensionViewable | CustomAbleDimensionViewable | 6-CustomAble/0-CustomAble.stories.tsx | ReactDimensionViewableApp |  | passed |
| make-custom-able--custom-able-editable | Editable | CustomAbleEditable | 6-CustomAble/0-CustomAble.stories.tsx | ReactEditableApp |  | passed |
| make-custom-able--custom-able-rotatble | Custom Rotatable | CustomAbleRotatble | 6-CustomAble/0-CustomAble.stories.tsx | ReactCustomRotatableApp |  | passed |
| make-custom-able--custom-able-mouse-enter-leave | Mouse Enter & Leave | CustomAbleMouseEnterLeave | 6-CustomAble/0-CustomAble.stories.tsx | ReactMouseEnterLeaveApp |  | passed |
| make-custom-able--custom-able-drag-target | DragTarget | CustomAbleDragTarget | 6-CustomAble/0-CustomAble.stories.tsx | ReactDragTargetAbleApp |  | passed |
| request-ables-through-a-method--request-draggable | Draggable | RequestDraggable | 7-Request/0-Request.stories.tsx | ReactDraggableApp |  | passed |
| request-ables-through-a-method--request-resizable | Resizable | RequestResizable | 7-Request/0-Request.stories.tsx | ReactResizableApp |  | passed |
| request-ables-through-a-method--request-resizable-delta | Resizable Delta | RequestResizableDelta | 7-Request/0-Request.stories.tsx | ReactResizableDeltaApp |  | passed |
| request-ables-through-a-method--request-resizable-group | Resizable Group | RequestResizableGroup | 7-Request/0-Request.stories.tsx | ReactResizableGroupApp |  | passed |
| request-ables-through-a-method--request-draggable-snappable | Draggable With Snappable | RequestDraggableSnappable | 7-Request/0-Request.stories.tsx | ReactDraggableSnappableApp |  | passed |
| request-ables-through-a-method--request-resizable-snappable | Resizable With Snappable | RequestResizableSnappable | 7-Request/0-Request.stories.tsx | ReactResizableSnappableApp |  | passed |
| request-ables-through-a-method--request-draggable-align | Align | RequestDraggableAlign | 7-Request/0-Request.stories.tsx | ReactAlignApp |  | passed |
| support-tree-shaking--tree-shaking | Use only Draggable, Resizable, Rotatable | TreeShaking | 8-TreeShaking/0-TreeShaking.stories.tsx | TreeShakingApp |  | passed |
| support-scroll--scrolling-scrollable | Use Scrollable | ScrollingScrollable | 9-Scrolling/0-Scrollable.stories.tsx | ReactScrollableApp |  | passed |
| variable-situations--tests-no-target | No Target | TestsNoTarget | 99-Tests/Deafult.stories.tsx | ReactNoTargetApp |  | passed |
| variable-situations--tests-click-a-tag | Click a tag | TestsClickATag | 99-Tests/Deafult.stories.tsx | ReactATagApp |  | passed |
| variable-situations--tests-input | Any native input element | TestsInput | 99-Tests/Deafult.stories.tsx | ReactInputApp |  | passed |
| variable-situations--tests-safari | Test Control Box in Safari | TestsSafari | 99-Tests/Deafult.stories.tsx | ReactSafariApp |  | passed |
| variable-situations--tests-custom-element | Test Custom Element Offset | TestsCustomElement | 99-Tests/Deafult.stories.tsx | ReactCustomElementApp | ✓ | passed |
| variable-situations--tests-custom-element-bounds | Test Custom Element with Bounds | TestsCustomElementBounds | 99-Tests/Deafult.stories.tsx | ReactCustomElementBoundsApp | ✓ | passed |
| variable-situations--tests-accuracy | Check drag accuracy when using bounds | TestsAccuracy | 99-Tests/Deafult.stories.tsx | ReactAccuracyApp |  | passed |
| variable-situations--tests-large-zoom | Check element guidelines accuracy when zoom is large | TestsLargeZoom | 99-Tests/Deafult.stories.tsx | ReactLargeZoomElementGuidelinesApp |  | passed |
| variable-situations--tests-flex | Test flex element | TestsFlex | 99-Tests/Deafult.stories.tsx | ReactFlexApp |  | passed |
| variable-situations--tests-will-change | Test Container with will change | TestsWillChange | 99-Tests/Deafult.stories.tsx | ReactWillChangeApp |  | passed |
| variable-situations--tests-stop-drag | Stop drag if target is select, input, textarea | TestsStopDrag | 99-Tests/Deafult.stories.tsx | ReactStopDragApp |  | passed |
| variable-situations--tests-click | Stop Click event's Propagation for dragStart | TestsClick | 99-Tests/Deafult.stories.tsx | ReactClickApp |  | passed |
| variable-situations--tests-nested-target | Nested Moveable's target | TestsNestedTarget | 99-Tests/Deafult.stories.tsx | ReactNestedTargetApp |  | passed |
| variable-situations--tests-zoomed-cursor | Zoomed Cursor | TestsZoomedCursor | 99-Tests/Deafult.stories.tsx | ReactZoomedCursorApp |  | passed |
| variable-situations--tests-handle-large-number | Test performance for large number instances | TestsHandleLargeNumber | 99-Tests/Deafult.stories.tsx | ReactHandleLargeNumberApp |  | passed |
| variable-situations--tests-overflow | Test overflow: auto target | TestsOverflow | 99-Tests/Deafult.stories.tsx | ReactOverflowApp |  | passed |
| variable-situations--tests-dragtarget | Test Drag Target | TestsDragtarget | 99-Tests/Deafult.stories.tsx | ReactDragTargetApp |  | passed |
| variable-situations--tests-drag-start | Test Drag Start Group Manually | TestsDragStart | 99-Tests/Deafult.stories.tsx | ReactDragStartGroupApp |  | passed |
| variable-situations--tests-changing-snap-container | Test Changing Snap Container | TestsChangingSnapContainer | 99-Tests/Deafult.stories.tsx | ReactChangingSnapContainerApp |  | passed |
| variable-situations--tests-fixed-snap | Test Snap with position: fixed | TestsFixedSnap | 99-Tests/Deafult.stories.tsx | ReactFixedSnapApp |  | passed |
| variable-situations--tests-zoomed-target | Test css zoomed target | TestsZoomedTarget | 99-Tests/Deafult.stories.tsx | ReactZoomedTargetApp |  | passed |
| variable-situations--tests-trs-target | Test css translate & rotate & scale target | TestsTRSTarget | 99-Tests/Deafult.stories.tsx | ReactTRSTargetApp | ✓ | passed |
| variable-situations--tests-zoomed-snap | Test snap for scaled target | TestsZoomedSnap | 99-Tests/Deafult.stories.tsx | ReactZoomedSnapApp |  | passed |
| variable-situations--tests-request-bounds | Test request with bounds | TestsRequestBounds | 99-Tests/Deafult.stories.tsx | ReactRequestBoundsApp |  | passed |
| variable-situations--tests-rotate-clippable | Test rotate & clippable | TestsRotateClippable | 99-Tests/Deafult.stories.tsx | ReactRotateClippableApp |  | passed |
| variable-situations--tests-accurate-element-guidelines | Test Accurate Element Guidelines | TestsAccurateElementGuidelines | 99-Tests/Deafult.stories.tsx | ReactAccurateElementGuidelineApp | ✓ | passed |
| variable-situations--tests-accurate-element-guidelines-2 | Test Accurate Element Guidelines 0.2 | TestsAccurateElementGuidelines2 | 99-Tests/Deafult.stories.tsx | ReactAccurateElementGuideline2App | ✓ | passed |
| variable-situations--test-drag-api | Test Drag API | TestDragAPI | 99-Tests/Deafult.stories.tsx | ReactDragAPIApp |  | passed |
| variable-situations--test-change-targets-on-click | Test Change Target on Click Group | TestChangeTargetsOnClick | 99-Tests/Deafult.stories.tsx | ReactChangeTargetsOnClickApp |  | passed |
| variable-situations--test-scalable-keep-ratio | Even if the size is 0, the ratio is maintained. | TestScalableKeepRatio | 99-Tests/Deafult.stories.tsx | ReactScalableKeepRatioApp |  | passed |
| variable-situations--test-iframe | Test Iframe | TestIframe | 99-Tests/Deafult.stories.tsx | ReactIframeApp |  | passed |
| variable-situations--test-group-padding | Test Show Group's Padding | TestGroupPadding | 99-Tests/Deafult.stories.tsx | ReactGroupPaddingApp |  | passed |
| variable-situations--test-translate-50 | Test translate(-50%, -50%) | TestTranslate50 | 99-Tests/Deafult.stories.tsx | ReactTranslate50App | ✓ | passed |
| variable-situations--test-nested-svg | Test Nested SVG | TestNestedSVG | 99-Tests/Deafult.stories.tsx | ReactNestedSVGApp |  | passed |
| combination-with-other-components--components-selecto | Use Selecto | ComponentsSelecto | 9A-Components/0-Components.stories.tsx | ReactSelectoApp |  | passed |
| combination-with-other-components--components-selecto-with-multiple-group | Use Selecto with Multiple Group | ComponentsSelectoWithMultipleGroup | 9A-Components/0-Components.stories.tsx | ReactSelectoMultipleGroupApp |  | passed |
| combination-with-other-components--components-selecto-with-group-ungroup | Use Selecto with Group & Ungroup | ComponentsSelectoWithGroupUngroup | 9A-Components/0-Components.stories.tsx | ReactSelectoMultipleGroupUngroupApp |  | passed |
| combination-with-other-components--components-selecto-with-nested-group | Use Selecto with Nested Group | ComponentsSelectoWithNestedGroup | 9A-Components/0-Components.stories.tsx | ReactSelectoNestedGroupApp |  | passed |
| combination-with-other-components--components-infinite-viewer | Use Infinite Viewer | ComponentsInfiniteViewer | 9A-Components/0-Components.stories.tsx | ReactInfiniteViewerApp |  | passed |

## 1.2 带 play 的 story 与断言（26 个 play，62 条 expect）

### basic--basic-draggable（Draggable）

- `expect(controlBox.style.transform).toBe("translate3d(100px, 150px, 0px)")`
- `expect(target.style.transform).toBe("translate(100px, 0px)")`
- `expect(controlBox.style.transform).toBe("translate3d(200px, 150px, 0px)")`

### basic--basic-resizable（Resizable）

- `expect(target.style.transform).toBe("translate(0px, 0px)")`
- `expect(target.style.width).toBe("200px")`
- `expect(target.style.height).toBe("200px")`

### basic--basic-scalable（Scalable）

- `expect(target.style.transform).toBe("translate(25px, 50px) scale(1.5, 2)")`

### basic--basic-scalable-keep-ratio-test（Scalable keepRatio Test）

- `expect(target.style.transform).toBe("translate(150px, 150px) scale(-2, -2)")`

### basic--baisc-rotatable（Rotatable）

- `expect(target.style.transform).toBe("translate(0px, 0px) rotate(90deg)")`

### basic--basic-warpable（Warpable）

- `expect(mat[i]).toBeCloseTo(v, 4)`

### basic--basic-clippable（Clippable）

- `expect(target.style.clipPath).toBe(`inset(0px 40px 40px 0px)`)`

### basic--basic-roundable（Roundable）

- `expect(targets[0].style.borderRadius).toBe(`35px`)`
- `expect(targets[1].style.borderRadius).toBe(`25px 33px`)`

### basic--basic-origin-draggable（OriginDraggable）

- `expect(throttle(clientRect1.left, 0.1)).toBe(throttle(clientRect2.left, 0.1))`
- `expect(throttle(clientRect1.top, 0.1)).toBe(throttle(clientRect2.top, 0.1))`

### basic--basic-pinchable（Pinchable）

- `expect(target.style.transform).toBe(`translate(100px, 0px) rotate(-180deg) scale(2, 2)`)`

### group--group-draggable-resizable-rotatable（Draggable & Resizable & Rotatable）

- `expect(areaElement.style.width).toBe("420px")`
- `expect(areaElement.style.height).toBe("345px")`
- `expect(target.style.width).toBe("150px")`
- `expect(targets[0].style.transform).toBe(`translate(242.5px, -85px) rotate(90deg)`)`
- `expect(targets[1].style.transform).toBe(`translate(32.5px, 165px) rotate(90deg)`)`
- `expect(targets[2].style.transform).toBe(`translate(-12.5px, -125px) rotate(90deg)`)`
- `expect(areaElement.style.width).toBe("420px")`
- `expect(areaElement.style.height).toBe("345px")`

### group--group-draggable-scalable-rotatable（Draggable & Scalable & Rotatable）

- `expect(throttle(functionValue[0], 0.1)).toBe(1.5)`
- `expect(throttle(functionValue[1], 0.1)).toBe(-1.5)`
- `expect(throttle(functionValue[1], 0.1)).toBe(1.5)`

### group--group-multiple-group（Multiple Group）

- `expect(throttle(parseFloat(areaElement.style.width), 0.1)).toBe(298.3)`
- `expect(throttle(parseFloat(areaElement.style.height), 0.1)).toBe(266.6)`
- `expect(throttle(left, 0.1)).toBe(133.4)`
- `expect(throttle(top, 0.1)).toBe(151.7)`
- `expect(throttle(width, 0.1)).toBe(266.9)`
- `expect(throttle(height, 0.1)).toBe(298.5)`
- `expect(throttle(parseFloat(areaElement.style.width), 0.1)).toBe(266.5)`
- `expect(throttle(parseFloat(areaElement.style.height), 0.1)).toBe(298.3)`
- `expect(areaElement.style.transform).toBe("translate(0px, 0px) rotate(0deg) scale(1, 1)")`

### group--group-roundable-group（Roundable Group）

- `expect(target.style.borderRadius).toBe("30px")`

### options--options-padding（padding）

- `expect(Math.round(parseFloat(widthLine.style.width))).toBe(231)`
- `expect(Math.round(parseFloat(heightLine.style.width))).toBe(221)`
- `expect(Math.round(paddingAreas[0].getBoundingClientRect().width)).toBe(10)`
- `expect(Math.round(paddingAreas[1].getBoundingClientRect().height)).toBe(30)`
- `expect(Math.round(paddingAreas[2].getBoundingClientRect().width)).toBe(20)`
- `expect(Math.round(paddingAreas[3].getBoundingClientRect().height)).toBe(40)`

### svg--svg-group（SVG Group）

- `expect(area.style.width).toBe("191px")`
- `expect(area.style.height).toBe("57px")`
- `expect(area.style.transform).toBe("translate(0px, 0px) rotate(0deg) scale(1, 1)")`

### snap-bound--snap-guidelines（Snap Guidelines）

- `expect(target.style.transform).toBe("translate(-51px, -151px)")`

### snap-bound--snap-elements-group（Snap Elements (group)）

- `expect(moveable.style.transform).toBe("translate3d(-1px, -1px, 0px)")`

### snap-bound--snap-rotations（Snap Rotations）

- `expect(target.style.transform).toBe("translate(0px, 0px) rotate(90deg)")`

### advanced-rotatable--advanced-set-rotation（customize the rotation value ）

- `expect(target.style.transform).toBe("translate(0px, 0px) rotate(90deg)")`

### variable-situations--tests-custom-element（Test Custom Element Offset）

- `expect(moveableElement.style.transform).toBe("translate3d(60px, 192px, 0px)")`

### variable-situations--tests-custom-element-bounds（Test Custom Element with Bounds）

- `expect(innerMoveable.style.transform).toBe("translate3d(50px, 50px, 0px)")`

### variable-situations--tests-trs-target（Test css translate & rotate & scale target）

- `expect(line1.style.width).toBe("101px")`
- `expect(line2.style.width).toBe("201px")`
- `expect(splitComma(splitBracket(controlBox.style.transform).value!).map(v => { return parseInt(v, 10); })).toEqual([243, 248, 0])`
- `expect(splitComma(splitBracket(target.style.transform).value!).map(v => { return parseInt(v, 10); })).toEqual([186, -25])`
- `expect(splitComma(splitBracket(controlBox.style.transform).value!).map(v => { return parseInt(v, 10); })).toEqual([343, 248, 0])`

### variable-situations--tests-accurate-element-guidelines（Test Accurate Element Guidelines）

- `expect(target.style.transform).toBe("translate(0px, 0px)")`

### variable-situations--tests-accurate-element-guidelines-2（Test Accurate Element Guidelines 0.2）

- `expect(target.style.transform).toBe("translate(0px, 0px)")`

### variable-situations--test-translate-50（Test translate(-50%, -50%)）

- `expect(controlBox.style.transform).toBe("translate3d(50px, 100px, 0px)")`
- `expect(target.style.transform).toBe("translate(50px, -50px)")`
- `expect(controlBox.style.transform).toBe("translate3d(150px, 100px, 0px)")`

## 1.3 bake 生成文件（659 个，`shasum`）

统计：script 262、vue3 133、svelte 133、lit 131。

```
86b24e8d6fa23c047334300badffe5ba97574e18  stories/1-Basic/lit/ReactClippableApp/App.ts
a0891836b4ede59b9cbb7142207034394dcb78ff  stories/1-Basic/lit/ReactDraggableApp/App.ts
923303f6a46e67ca5807e1bb3417178552220d78  stories/1-Basic/lit/ReactOriginDraggableApp/App.ts
2f943b79d93078347985e4535912da5ae9f136c3  stories/1-Basic/lit/ReactPinchableApp/App.ts
0e4d49c32426b8ff811884b4944abd4e25048f1c  stories/1-Basic/lit/ReactResizableApp/App.ts
0a35791e2ef9cab128b2b1b947a85eab13581e3f  stories/1-Basic/lit/ReactRotatableApp/App.ts
1bfbc0584d1f8f9b376e05103d989f34148b819d  stories/1-Basic/lit/ReactRoundableApp/App.ts
fdc3b447b008a6909a362b6e5ff9facc7a6cd063  stories/1-Basic/lit/ReactScalableApp/App.ts
6a554a241c54fef0f74a313ac0f29b47c0993e2d  stories/1-Basic/lit/ReactWarpableApp/App.ts
6415636a2de86381b9f447020a4305a5855d1586  stories/1-Basic/script/ReactClippableApp/App.html
b26ce649c3c1fa94b4d8cf7ec13b583daeef1c85  stories/1-Basic/script/ReactClippableApp/App.js
6415636a2de86381b9f447020a4305a5855d1586  stories/1-Basic/script/ReactDraggableApp/App.html
3e780329b5065f3b4dae179d50e44f298cd8bf11  stories/1-Basic/script/ReactDraggableApp/App.js
6415636a2de86381b9f447020a4305a5855d1586  stories/1-Basic/script/ReactOriginDraggableApp/App.html
f608e2be12c347f776f3b5f89214eb344f82e339  stories/1-Basic/script/ReactOriginDraggableApp/App.js
12948e5614e0b566a5afb074ca8ed84862deffee  stories/1-Basic/script/ReactPinchableApp/App.html
d852e05e913e22d423242c187cc18a749e3d4dda  stories/1-Basic/script/ReactPinchableApp/App.js
cb404cfac009a504c896f2a8edf7bb641ffa5a4b  stories/1-Basic/script/ReactResizableApp/App.html
a71fadf7b73fa643acff0263ad15653df5ab3d91  stories/1-Basic/script/ReactResizableApp/App.js
98a5977980da65cd379bc6e92286eed7dccd8a5a  stories/1-Basic/script/ReactRotatableApp/App.html
fa709e375cdf99711f27a6fa71ac9d90281ecb47  stories/1-Basic/script/ReactRotatableApp/App.js
292f458fe329d84c5a911b7b114e55fd7601c0f5  stories/1-Basic/script/ReactRoundableApp/App.html
51b1576216d5a1870b3f164b834124d0f6cb8253  stories/1-Basic/script/ReactRoundableApp/App.js
6415636a2de86381b9f447020a4305a5855d1586  stories/1-Basic/script/ReactScalableApp/App.html
d15abb19796c6405bf233adf4a2ac44f0984654d  stories/1-Basic/script/ReactScalableApp/App.js
6415636a2de86381b9f447020a4305a5855d1586  stories/1-Basic/script/ReactWarpableApp/App.html
7c752090026dc3aa3b679a791a2e1593969588c0  stories/1-Basic/script/ReactWarpableApp/App.js
2f30f095463bf0ecfa139569ee4f401fde70602b  stories/1-Basic/svelte/ReactClippableApp/App.svelte
15be199c96654ec0d79073ce6d42cac54b07c980  stories/1-Basic/svelte/ReactDraggableApp/App.svelte
31d34f520026c8b89da22d6c1f9ad72d5df82023  stories/1-Basic/svelte/ReactOriginDraggableApp/App.svelte
661601bfa2dcae5d6ae31d591c2b9215011d002a  stories/1-Basic/svelte/ReactPinchableApp/App.svelte
df11ce663913cf0ba9a88d5e68d611282ec59144  stories/1-Basic/svelte/ReactResizableApp/App.svelte
96ed225fa8f60c5a38b2c77c19bd8f9ab2c02d13  stories/1-Basic/svelte/ReactRotatableApp/App.svelte
82d664c0df77b0fec69a64b85b0fddc1bac4dae0  stories/1-Basic/svelte/ReactRoundableApp/App.svelte
cbaab4de25f01903a18a9357c1d66afce655698c  stories/1-Basic/svelte/ReactScalableApp/App.svelte
eec17a94992673e63e446c00ab81cdbac8264ec0  stories/1-Basic/svelte/ReactWarpableApp/App.svelte
c686d8a567f30b4665f521415e3fb18a4a245a75  stories/1-Basic/vue3/ReactClippableApp/App.vue
85aebcc84a3725abef7ab0ba701cf20dcf825379  stories/1-Basic/vue3/ReactDraggableApp/App.vue
cb8f7f67623a272bfa7ad2afbd87696b5e698195  stories/1-Basic/vue3/ReactOriginDraggableApp/App.vue
255f0ed2886a37d1ba43d8e0b89fe1686a94eabe  stories/1-Basic/vue3/ReactPinchableApp/App.vue
be41d94483adce5100a964cc5fafffb24fba31c2  stories/1-Basic/vue3/ReactResizableApp/App.vue
1ce022dc0a29ff408d44b9a9a9841b2e72666a1c  stories/1-Basic/vue3/ReactRotatableApp/App.vue
ea13ee46f9bf2c4fca2b787515ab02106e440dec  stories/1-Basic/vue3/ReactRoundableApp/App.vue
c65d99d00315a00584090d67069371df2d96b66a  stories/1-Basic/vue3/ReactScalableApp/App.vue
f1447aec1b2cb08a0821337ed84baf85fec479db  stories/1-Basic/vue3/ReactWarpableApp/App.vue
273708598f96ec3c4fbfee10f78606f5fd4add50  stories/2-Combination/lit/ReactAllInOneApp/App.ts
2b25c93493e1a87aec9e1d7e98c400aad72133c8  stories/2-Combination/lit/ReactDraggableOriginDraggableRotatableApp/App.ts
01fe8e57ee90b39bdb4af4e2c1d7a07d392c0b72  stories/2-Combination/lit/ReactDraggableResizableRotatableApp/App.ts
d67005bf94e54dab3d7ed5d1c76796a6b29d76d1  stories/2-Combination/lit/ReactDraggableScalableRotatableApp/App.ts
e9ba5915896beae2d1167ef96b70f034894989f1  stories/2-Combination/script/ReactAllInOneApp/App.html
9f0e5c35039e2e1fcc59488148fbfce52e0075cf  stories/2-Combination/script/ReactAllInOneApp/App.js
e9ba5915896beae2d1167ef96b70f034894989f1  stories/2-Combination/script/ReactDraggableOriginDraggableRotatableApp/App.html
25db8e988c69cb30215e7b2dd1e3d648e2cb47c9  stories/2-Combination/script/ReactDraggableOriginDraggableRotatableApp/App.js
cb404cfac009a504c896f2a8edf7bb641ffa5a4b  stories/2-Combination/script/ReactDraggableResizableRotatableApp/App.html
131e9a0d23f23331233fef6efd4b88a7d6831747  stories/2-Combination/script/ReactDraggableResizableRotatableApp/App.js
e9ba5915896beae2d1167ef96b70f034894989f1  stories/2-Combination/script/ReactDraggableScalableRotatableApp/App.html
4d1f270ebe1348c1129709f32864910ced6ae2cc  stories/2-Combination/script/ReactDraggableScalableRotatableApp/App.js
5d742debb76b0626dcdd6a0b75362f289717388e  stories/2-Combination/svelte/ReactAllInOneApp/App.svelte
26d31c09f2cb66cc3f2cc409967090fe4c2c65c5  stories/2-Combination/svelte/ReactDraggableOriginDraggableRotatableApp/App.svelte
024bd620446ddbe9501aba2dff991b70b6951b35  stories/2-Combination/svelte/ReactDraggableResizableRotatableApp/App.svelte
6fd4f6fd19aaec3da8545571c7cf742ffc2bc2f5  stories/2-Combination/svelte/ReactDraggableScalableRotatableApp/App.svelte
da1e0a5d1376df36b083f97f629ef81162de6e47  stories/2-Combination/vue3/ReactAllInOneApp/App.vue
747599741447ca78c1135bd3ebce620ab0dbb28a  stories/2-Combination/vue3/ReactDraggableOriginDraggableRotatableApp/App.vue
e47eda3cbddd472feb9dc83855059088b35d0237  stories/2-Combination/vue3/ReactDraggableResizableRotatableApp/App.vue
616920a4139dcf9852e5e9674b2d2d8627bf9c70  stories/2-Combination/vue3/ReactDraggableScalableRotatableApp/App.vue
692b7474f57a356f7555b538adfb7d3a9424f135  stories/3-Group/lit/ReactAllInOneApp/App.ts
8f90abd683361a61131ab1978a292ddb258f46f3  stories/3-Group/lit/ReactDraggableResizableRotatableApp/App.ts
20821bd552f127226d6e8c31d7b67275f74cc5b3  stories/3-Group/lit/ReactDraggableScalableRotatableApp/App.ts
6a0305bc50f867209ec5b34e53fb9131431d5a9a  stories/3-Group/lit/ReactFixedResizeGroupApp/App.ts
cc1ab9bd874596a7e38ee5af0b5fbd9a5382c95d  stories/3-Group/lit/ReactMultipleGroupApp/App.ts
83180f0efc32fa758f48ccf59a0f83591a1bd396  stories/3-Group/lit/ReactRoundableGroupApp/App.ts
1bc0f947c4ebe82ba7906d28f9ffe7b7db09d477  stories/3-Group/script/ReactAllInOneApp/App.html
27b77a617f9a6b57f4478129c71d6a3c11aa7362  stories/3-Group/script/ReactAllInOneApp/App.js
20f565cc25f0012cb21cb994a47ff7aa6cb23aa1  stories/3-Group/script/ReactDraggableResizableRotatableApp/App.html
1acc8af6a5681e2cb7d34d0568bd140bdf54a0ae  stories/3-Group/script/ReactDraggableResizableRotatableApp/App.js
7e1f29ae8d2b81555901a3b8e526accd6a766841  stories/3-Group/script/ReactDraggableScalableRotatableApp/App.html
b2e944fc5d37d41fd387f86b5836ed9f56053a55  stories/3-Group/script/ReactDraggableScalableRotatableApp/App.js
1bc0f947c4ebe82ba7906d28f9ffe7b7db09d477  stories/3-Group/script/ReactFixedResizeGroupApp/App.html
ff7c7cd99b10eb05cbddf139356aa8a3576d9e2c  stories/3-Group/script/ReactFixedResizeGroupApp/App.js
7c1202bdb4275507c87d8c64e1919fcd1a9dd5e3  stories/3-Group/script/ReactMultipleGroupApp/App.html
db276b8a3d346a52e87c71fd88a21adf5a48daa6  stories/3-Group/script/ReactMultipleGroupApp/App.js
7063e750c4171b5bc13f6f60afaa0c43f2abab55  stories/3-Group/script/ReactRoundableGroupApp/App.html
e5c24d8f4f3272bea0524ad444196d30f62f9d4e  stories/3-Group/script/ReactRoundableGroupApp/App.js
6521f7c1de095738a6e380ec973aeb1d13f5be79  stories/3-Group/svelte/ReactAllInOneApp/App.svelte
f36b11c5f3028a8467d21387268010a6d489a235  stories/3-Group/svelte/ReactDraggableResizableRotatableApp/App.svelte
efee082a47d2a86b81ae02748bb8dd2fc57587a8  stories/3-Group/svelte/ReactDraggableScalableRotatableApp/App.svelte
5b8809676194e4eb033f56ec4ac2ad26b00bd7ca  stories/3-Group/svelte/ReactFixedResizeGroupApp/App.svelte
ed38d35c994103f4bac15d5f682f701410500965  stories/3-Group/svelte/ReactMultipleGroupApp/App.svelte
9eac278c8c46c0c1efc1922a7c55898d6ef0aa78  stories/3-Group/svelte/ReactRoundableGroupApp/App.svelte
5f1bfc8685d55bf0485f8fc78b0fba9129754ff2  stories/3-Group/vue3/ReactAllInOneApp/App.vue
ffd24f92fd7002b83d8e632f0d33d2714c224815  stories/3-Group/vue3/ReactDraggableResizableRotatableApp/App.vue
a9978191b6c41ac0b5c27978cc9cdf44b8637b0b  stories/3-Group/vue3/ReactDraggableScalableRotatableApp/App.vue
960884651a16418dcc94eacf8da792c5745df1f5  stories/3-Group/vue3/ReactFixedResizeGroupApp/App.vue
21a49ee22beb719ab9c352cf11c43c591a1f73be  stories/3-Group/vue3/ReactMultipleGroupApp/App.vue
8b183de458f22e9aa0257d1d54eef1c162f3d35e  stories/3-Group/vue3/ReactRoundableGroupApp/App.vue
a89c7351b6e995fb30710e54ae2a9a445941bf83  stories/3-IndiviualGroup/lit/ReactDraggableScalableRotatableApp/App.ts
b1edf8955058b36a36a7a982d86312ebeb4c5b47  stories/3-IndiviualGroup/lit/ReactIndividualGroupablePropsApp/App.ts
72193e6a1e0461debd66c1576cd855d4637f328e  stories/3-IndiviualGroup/script/ReactDraggableScalableRotatableApp/App.html
abf05a4ad07a070e84ec54cd78f229df6cc874e9  stories/3-IndiviualGroup/script/ReactDraggableScalableRotatableApp/App.js
72193e6a1e0461debd66c1576cd855d4637f328e  stories/3-IndiviualGroup/script/ReactIndividualGroupablePropsApp/App.html
fd38628ce42fc99b2684a952a632a1d6b9f5afdf  stories/3-IndiviualGroup/script/ReactIndividualGroupablePropsApp/App.js
18946dcb275d6c30852f89051aadd8655bb7e09c  stories/3-IndiviualGroup/svelte/ReactDraggableScalableRotatableApp/App.svelte
808faeea437568361607750d256d23f402bdd488  stories/3-IndiviualGroup/svelte/ReactIndividualGroupablePropsApp/App.svelte
ca18663422ac0d6f3961c3c536d4f69c5bf6b294  stories/3-IndiviualGroup/vue3/ReactDraggableScalableRotatableApp/App.vue
31cae6d4a80c544847e6b9b4b920ab5f3a877e7b  stories/3-IndiviualGroup/vue3/ReactIndividualGroupablePropsApp/App.vue
0ca8a7e78f3c603de6200c511f807ab6a60b1b20  stories/4-Options/lit/ReactCheckInputApp/App.ts
5cfdd3e0c58f2abb7e1db4f542d1e27c0fac371b  stories/4-Options/lit/ReactControlPaddingApp/App.ts
888e4b0ee7ba95efaef8ddce90eb6c89e5e20d92  stories/4-Options/lit/ReactDragFocusedInputApp/App.ts
20fe543bcc8b0baff36d0862f5ae63b9871956fb  stories/4-Options/lit/ReactDragTargetApp/App.ts
4e27b1bc17cf4bac5bf51c5165e68a2f3a028974  stories/4-Options/lit/ReactDragTargetSelfApp/App.ts
3954eb26267aeb45fadecad9f69c01b79c2e4c55  stories/4-Options/lit/ReactGroupPersistDataApp/App.ts
18794cd137ff01ff60d7cd85d87b5bc403ad5219  stories/4-Options/lit/ReactIndividualGroupPersistDataApp/App.ts
1db0825d6b46458cab5378f0474acff3e879321f  stories/4-Options/lit/ReactLinePaddingApp/App.ts
0089289dd6326a509673cdc5f1ae2c29d1577171  stories/4-Options/lit/ReactPaddingApp/App.ts
3b1ecdccc84f491079a8b808a9bac3d5b54781e6  stories/4-Options/lit/ReactPersistDataApp/App.ts
8cc4e7278f5a0b85af3d5c3d5c61eb7f3d6cb146  stories/4-Options/lit/ReactRootContainerApp/App.ts
ef3b3f5b95fe8fc2f3254a462cadd168c141f95f  stories/4-Options/lit/ReactTransformedApp/App.ts
67f0c56e7342879e6845a36aedee96624356f947  stories/4-Options/lit/ReactUseAccuratePositionApp/App.ts
8d97280ee4cb7a3dd5ef545733a08a2005fd404d  stories/4-Options/lit/ReactUseMutationObserverApp/App.ts
d54eb13d6b2e270c4bede7a87ad0b60de925d3cf  stories/4-Options/lit/ReactUseResizeObserverApp/App.ts
0bfba23bb0ed9dbb4c7c7fbfffce2795cb1bfc69  stories/4-Options/lit/ReactUseResizeObserverGroupApp/App.ts
24a55debd66e4ac191a0675c8c7e42a418fbddc7  stories/4-Options/lit/ReactUseResizeObserverIndividualGroupApp/App.ts
74d9bc97526313462cf1c6dc766a0c513b33a58f  stories/4-Options/lit/ReactViewContainerApp/App.ts
fcd95462d48becc8a71102513e7a6b0f5b93154c  stories/4-Options/lit/ReactZoomApp/App.ts
95a3d2dffc0bdfa53958ed6e61abce736d4fbe1c  stories/4-Options/script/ReactCheckInputApp/App.html
afb740e44a8afb8d07cbd88fc26f1b26dceaa82e  stories/4-Options/script/ReactCheckInputApp/App.js
d48da046be33f54d601e4b3385cb08f10619ed87  stories/4-Options/script/ReactControlPaddingApp/App.html
8388540171e91a853fae4fb2a26a808372cab41a  stories/4-Options/script/ReactControlPaddingApp/App.js
744258fecfaf4534d4514d284382022029f1450a  stories/4-Options/script/ReactDragFocusedInputApp/App.html
eeaaeb66128dace839f8e7558382fd824353456d  stories/4-Options/script/ReactDragFocusedInputApp/App.js
93f21e50d46bca01632e5afdf08ff5d2ddfd65c8  stories/4-Options/script/ReactDragTargetApp/App.html
fea8230f02cf6b5517fd4f3d2628d690be3789b6  stories/4-Options/script/ReactDragTargetApp/App.js
93f21e50d46bca01632e5afdf08ff5d2ddfd65c8  stories/4-Options/script/ReactDragTargetSelfApp/App.html
46007d254221b554d742239f1601af14c9f9c892  stories/4-Options/script/ReactDragTargetSelfApp/App.js
7124306351356991c627c4925e5b003f59ba3ab0  stories/4-Options/script/ReactGroupPersistDataApp/App.html
f7da725e66225803a7a88e6f32037175fc1672d5  stories/4-Options/script/ReactGroupPersistDataApp/App.js
49c182df33291c528c999d815d15d80f87ce516d  stories/4-Options/script/ReactIndividualGroupPersistDataApp/App.html
0977751bb8b778ad2630a13f058bb95399d81ac7  stories/4-Options/script/ReactIndividualGroupPersistDataApp/App.js
d48da046be33f54d601e4b3385cb08f10619ed87  stories/4-Options/script/ReactLinePaddingApp/App.html
2fbad3455d336c4ee823cfdc9ba58189bf2d86d3  stories/4-Options/script/ReactLinePaddingApp/App.js
d48da046be33f54d601e4b3385cb08f10619ed87  stories/4-Options/script/ReactPaddingApp/App.html
32bd2d8fef98e7db8c1d43bcc385f44baebc76a9  stories/4-Options/script/ReactPaddingApp/App.js
c107609b080a5d3b95ef001da1f1ad9b751f8400  stories/4-Options/script/ReactPersistDataApp/App.html
e1242c8de5a39fa19ae4e0eb2f37852f97376085  stories/4-Options/script/ReactPersistDataApp/App.js
38e8960752f50aa5f79fd8b7b04728bb85c017aa  stories/4-Options/script/ReactRootContainerApp/App.html
202a163512fdf27f8129b07af2c633732d8e4836  stories/4-Options/script/ReactRootContainerApp/App.js
5db32a7075b0373ede0173ad4be50e28c2b090b5  stories/4-Options/script/ReactTransformedApp/App.html
9d055674ea2ad1ccaba150d66be8fcdd7fa873c1  stories/4-Options/script/ReactTransformedApp/App.js
f7b57c247bd2628ee0308c091c9bb8d92cd6b63d  stories/4-Options/script/ReactUseAccuratePositionApp/App.html
277cb68a3ab52e7b818ba691428f3525f1369069  stories/4-Options/script/ReactUseAccuratePositionApp/App.js
e5783068a8927691a997c7480f51ac0056bc65d6  stories/4-Options/script/ReactUseMutationObserverApp/App.html
c9ab9f0f3789a10078d5e1fcd9fd4b350b35d019  stories/4-Options/script/ReactUseMutationObserverApp/App.js
cbc1b3c3570e07f383413627a6259cbafa945618  stories/4-Options/script/ReactUseResizeObserverApp/App.html
8e5acd95323622963440888f8202c201b7b5d35f  stories/4-Options/script/ReactUseResizeObserverApp/App.js
433faeda74db45eee0e52228b261077ae4acdb72  stories/4-Options/script/ReactUseResizeObserverGroupApp/App.html
037d8878a5eade6e7a6d8a37732c5462f7a1ab2e  stories/4-Options/script/ReactUseResizeObserverGroupApp/App.js
433faeda74db45eee0e52228b261077ae4acdb72  stories/4-Options/script/ReactUseResizeObserverIndividualGroupApp/App.html
df7872ca501baf4ec8c7213035339de9db50e8e8  stories/4-Options/script/ReactUseResizeObserverIndividualGroupApp/App.js
d3f7387b7b38e38a5f4515b9b5e4322ce685d614  stories/4-Options/script/ReactViewContainerApp/App.html
9b40f8908bcfd818afe48d5126430cab28c89ca5  stories/4-Options/script/ReactViewContainerApp/App.js
fa04fdd150a82403aeefc0ccccea5ae9acdf1362  stories/4-Options/script/ReactZoomApp/App.html
851002352c51aaf51c02fe0fe480d0ace133dd5b  stories/4-Options/script/ReactZoomApp/App.js
15e56d3e2f431d5f8d2e46aac0c32b5155862c99  stories/4-Options/svelte/ReactCheckInputApp/App.svelte
01fa69615ff5efc5f972fec512583a67bffeea3f  stories/4-Options/svelte/ReactControlPaddingApp/App.svelte
02b1f73650dc83b2c014ec33f1aea99a23a2fb9d  stories/4-Options/svelte/ReactDragFocusedInputApp/App.svelte
30f4bd5d26503d0e6c42083d604dde14e09cd767  stories/4-Options/svelte/ReactDragTargetApp/App.svelte
bba4a7e39fe5ef85f6a3ef3f9ba641e48faf2883  stories/4-Options/svelte/ReactDragTargetSelfApp/App.svelte
138f881cec333a9b418d97d0d6e8095874aba7c2  stories/4-Options/svelte/ReactGroupPersistDataApp/App.svelte
23eded919aeb1cd68eaaccb3d8b0145dbde2ceaa  stories/4-Options/svelte/ReactIndividualGroupPersistDataApp/App.svelte
261a0f126dab9168c0a94b25c54bfa523b47841f  stories/4-Options/svelte/ReactLinePaddingApp/App.svelte
e2b45fad39003ce3eee8c62d25b65f9c33ec6925  stories/4-Options/svelte/ReactPaddingApp/App.svelte
3ed4e0604ea3237ca9892071646c4a1c7491be79  stories/4-Options/svelte/ReactPersistDataApp/App.svelte
530e1675efb123547185ac79772e3f72d65bb573  stories/4-Options/svelte/ReactRootContainerApp/App.svelte
59602f49940530a46e2d6c636ba98138fc4e0370  stories/4-Options/svelte/ReactTransformedApp/App.svelte
717a5a066269bf0c2f10b48aac4a13b85a14dd86  stories/4-Options/svelte/ReactUseAccuratePositionApp/App.svelte
f21e52ac28167aeb5faa08b96b83e943476ff087  stories/4-Options/svelte/ReactUseMutationObserverApp/App.svelte
f2a32978e9635b6ef47899aaebab6ffc2dd382e5  stories/4-Options/svelte/ReactUseResizeObserverApp/App.svelte
0eeb9e4cbe521087a02ac543b1238562245f027b  stories/4-Options/svelte/ReactUseResizeObserverGroupApp/App.svelte
b4646269144969b0bf66e9d52b463190745d5c6f  stories/4-Options/svelte/ReactUseResizeObserverIndividualGroupApp/App.svelte
a784746e37b3ab67977c4de6be81ddf9d9a6bb76  stories/4-Options/svelte/ReactViewContainerApp/App.svelte
ca48877336d9ed01344090e284abf184ed714621  stories/4-Options/svelte/ReactZoomApp/App.svelte
a4ce45c9ce3005d13ec5f208c510c43488ee9d3c  stories/4-Options/vue3/ReactCheckInputApp/App.vue
85190931302839e35608d79642d3db91b954d38f  stories/4-Options/vue3/ReactControlPaddingApp/App.vue
fdd91eb10715198d61d6d75f857b8006c22de64f  stories/4-Options/vue3/ReactDragFocusedInputApp/App.vue
ee145218f188803beb98fc189cd03e819a84b3af  stories/4-Options/vue3/ReactDragTargetApp/App.vue
82d58b5eb4c3ef02842e7381efea51a60772784e  stories/4-Options/vue3/ReactDragTargetSelfApp/App.vue
3aacd57491f029ca667949f166ec9ded0ea6f4bc  stories/4-Options/vue3/ReactGroupPersistDataApp/App.vue
166d4fbd9cc92c8ab188693b3d236be930619569  stories/4-Options/vue3/ReactIndividualGroupPersistDataApp/App.vue
466f5cbf2baa11c7c0d7855d5cbfe25987b8c546  stories/4-Options/vue3/ReactLinePaddingApp/App.vue
be6f2a16d0620547e5fa76048c1ae82d4a0d8d9d  stories/4-Options/vue3/ReactPaddingApp/App.vue
4c43eb986503e239050ae10947867a188f5bcfb3  stories/4-Options/vue3/ReactPersistDataApp/App.vue
39192174272849d1b44fc4690dc17676b5f62f67  stories/4-Options/vue3/ReactRootContainerApp/App.vue
83ed75b43fa92b7c2c80b00714829ca79fd1c983  stories/4-Options/vue3/ReactTransformedApp/App.vue
1a8184786153f44a52ba6680fd08f7e38b53a254  stories/4-Options/vue3/ReactUseAccuratePositionApp/App.vue
94e5289bf0c06b1b1cd5229b398cb3dc7c460179  stories/4-Options/vue3/ReactUseMutationObserverApp/App.vue
1e42bec546b54d6f194fe83d23cb4f7b059ca984  stories/4-Options/vue3/ReactUseResizeObserverApp/App.vue
32058d6e0aa47ce16f0987e309bc58f625f1a8e6  stories/4-Options/vue3/ReactUseResizeObserverGroupApp/App.vue
ae7764eef2393620379f055778faf2129d2029bc  stories/4-Options/vue3/ReactUseResizeObserverIndividualGroupApp/App.vue
4f083f60b706022655f75d42e328f3cc6c01a33b  stories/4-Options/vue3/ReactViewContainerApp/App.vue
808b201fa33e14a16f6ecb9c0d823dabc73ff535  stories/4-Options/vue3/ReactZoomApp/App.vue
b53db8abd5b23e3f8c6b27b745c9e2296edc187b  stories/4-SVG/lit/ReactOriginApp/App.ts
fbceb29ca8c267f0a9aefd510455706f062e2fb9  stories/4-SVG/lit/ReactOriginFillboxApp/App.ts
66425132c9d245a32d5bf4d245f0b0176392c3e3  stories/4-SVG/lit/ReactPathApp/App.ts
5d39519760be0313ba8f1537c2042d0325f38cb5  stories/4-SVG/lit/ReactSVGCircleApp/App.ts
dc64ad9f51b33611dcdf39cedc5179e0b245b5b8  stories/4-SVG/lit/ReactSVGForeignObjectApp/App.ts
ec332cb7b8609c809b903b5feff5db636a084787  stories/4-SVG/lit/ReactSVGForeignObjectInnerApp/App.ts
d461c491837ae06f501cc4a64508fe3f749c79a8  stories/4-SVG/lit/ReactSVGGApp/App.ts
f65a818417dfffdd590321fe289fc270abf45840  stories/4-SVG/lit/ReactSVGGroupApp/App.ts
683c5e0873b0ca9e734e1e4e99b3a91f3442d520  stories/4-SVG/lit/ReactSVGLineApp/App.ts
f74cdc8a4476b8b08f3f4bfba4f6d508f284d4a0  stories/4-SVG/lit/ReactSVGSVGApp/App.ts
72e89debba2538f3f0b9d3a39ad300f03d8f8e42  stories/4-SVG/lit/ReactSVGTargetGApp/App.ts
044861c50f1df34123f7735650f181fde218d2d3  stories/4-SVG/script/ReactOriginApp/App.html
fc2b6a59d1e2b265ff6c61d801deb23c489db624  stories/4-SVG/script/ReactOriginApp/App.js
3817759dcd93722118eafd5b2429314309fe7d6d  stories/4-SVG/script/ReactOriginFillboxApp/App.html
100929c944552e190577730cd209e38df4dbbad5  stories/4-SVG/script/ReactOriginFillboxApp/App.js
66fb1551aa56078aff0d3d94e14893dbaff2c1d4  stories/4-SVG/script/ReactPathApp/App.html
d8c0a73116ec3acb6931d3b009c7f3721c217d9a  stories/4-SVG/script/ReactPathApp/App.js
4ebad240cab8cf7806e2bfe62cbc725e4daf1c31  stories/4-SVG/script/ReactSVGCircleApp/App.html
d8c0a73116ec3acb6931d3b009c7f3721c217d9a  stories/4-SVG/script/ReactSVGCircleApp/App.js
657ab9700a199e651714e35c90e6422bee28519f  stories/4-SVG/script/ReactSVGForeignObjectApp/App.html
78bb654c7a2e4d67d81ce58fa206016cf6f24248  stories/4-SVG/script/ReactSVGForeignObjectApp/App.js
657ab9700a199e651714e35c90e6422bee28519f  stories/4-SVG/script/ReactSVGForeignObjectInnerApp/App.html
7c2f7beb72be14348bde78fc4ac073f6bd5e129e  stories/4-SVG/script/ReactSVGForeignObjectInnerApp/App.js
cab641337554442074c4d684dcb85a885e2f4737  stories/4-SVG/script/ReactSVGGApp/App.html
ccfd30542a04e71e4eb6cf5dcde95d8cba35f054  stories/4-SVG/script/ReactSVGGApp/App.js
5acbbd34539a37f081a48c09c186cc93fdecf848  stories/4-SVG/script/ReactSVGGroupApp/App.html
d61f7978a131391f297dd044469b854f54792e2c  stories/4-SVG/script/ReactSVGGroupApp/App.js
daaf6851cee9d29e6a33b1c68411b49b7d69ac77  stories/4-SVG/script/ReactSVGLineApp/App.html
d8c0a73116ec3acb6931d3b009c7f3721c217d9a  stories/4-SVG/script/ReactSVGLineApp/App.js
31118fedc1cf0e29fbbc45edc08478632c5e631e  stories/4-SVG/script/ReactSVGSVGApp/App.html
d8c0a73116ec3acb6931d3b009c7f3721c217d9a  stories/4-SVG/script/ReactSVGSVGApp/App.js
887c08908480c8893b088ee9643bbd6428e56a9f  stories/4-SVG/script/ReactSVGTargetGApp/App.html
7b1a2a23a5734461eaa643ddce6ac949b5112e2e  stories/4-SVG/script/ReactSVGTargetGApp/App.js
417a10a8770ff55505be3e79a484804e40467735  stories/4-SVG/svelte/ReactOriginApp/App.svelte
d6c215d2a44eb45c21feb4faca206474d635bce7  stories/4-SVG/svelte/ReactOriginFillboxApp/App.svelte
98643200607a3d238d49e8c23686257639502daa  stories/4-SVG/svelte/ReactPathApp/App.svelte
1aacf1a04c21b43ed9eff262ed27f129432725f5  stories/4-SVG/svelte/ReactSVGCircleApp/App.svelte
63fdcc7d857d2293ae346120402d853124e6211d  stories/4-SVG/svelte/ReactSVGForeignObjectApp/App.svelte
9e530bf2c430df4ef80f7a393599787c211489e1  stories/4-SVG/svelte/ReactSVGForeignObjectInnerApp/App.svelte
33e7b5bd2178af94b5d513e567c30546ae69cebf  stories/4-SVG/svelte/ReactSVGGApp/App.svelte
7f2e5464cc545ce73f94a1e8b6266a8595212eca  stories/4-SVG/svelte/ReactSVGGroupApp/App.svelte
a175095c756d7038f98ca860d307fa89fbce90f2  stories/4-SVG/svelte/ReactSVGLineApp/App.svelte
72d4fd4b8fdd869a66630547d83aa1e3fcd4087c  stories/4-SVG/svelte/ReactSVGSVGApp/App.svelte
b8c220b99951521f4b77e51d216564b5adcfa7f2  stories/4-SVG/svelte/ReactSVGTargetGApp/App.svelte
676b7a550c36debd61e2dee9630d9d5b506dc9b5  stories/4-SVG/vue3/ReactOriginApp/App.vue
a79a30850aada04cda3fe6d5d26dd92b5465b7b7  stories/4-SVG/vue3/ReactOriginFillboxApp/App.vue
51786cc0b64090143f227e1c4cf908fcdb611710  stories/4-SVG/vue3/ReactPathApp/App.vue
1791c9ffc574b461d91e4f7775f4a26a6540c699  stories/4-SVG/vue3/ReactSVGCircleApp/App.vue
48733dd205ce81a08c396a2d8b745f09da5cc432  stories/4-SVG/vue3/ReactSVGForeignObjectApp/App.vue
85addc3b3d68c5602cc3f89207a6ef4cd8359f96  stories/4-SVG/vue3/ReactSVGForeignObjectInnerApp/App.vue
5f982fa36d9c46e718db501f397b2d4dce277894  stories/4-SVG/vue3/ReactSVGGApp/App.vue
730cd07b1592b95e48163351738f86241ef08a3f  stories/4-SVG/vue3/ReactSVGGroupApp/App.vue
69f2373f4a3db0c0147db27a533eaea02b42eac6  stories/4-SVG/vue3/ReactSVGLineApp/App.vue
e4a2891293b5e50cf00f65f1cd8b46305ef86605  stories/4-SVG/vue3/ReactSVGSVGApp/App.vue
e4c1af1a30f04f7dc600cfdf0e8ca9ea3a36901f  stories/4-SVG/vue3/ReactSVGTargetGApp/App.vue
fd96ade4c14543dba88b2d4e255425735e39f458  stories/5-Snap&Bound/lit/ReactBoundResizableApp/App.ts
91ec10397d12eb6e2113761a9a68d19157f323bc  stories/5-Snap&Bound/lit/ReactBoundRotatableApp/App.ts
381c431b3c7cfc875327783c4a9a21770efc9502  stories/5-Snap&Bound/lit/ReactBoundRotatableGroupApp/App.ts
f2837738c339b6de0d9d1477523bed58eb42afd4  stories/5-Snap&Bound/lit/ReactBoundScalableApp/App.ts
ffbb8da713f4d9bb8a8dbe37d2f752b913a2931a  stories/5-Snap&Bound/lit/ReactInnerBoundResizableApp/App.ts
abf1c12d09fa7f42cc248d57acbae360fb3a229e  stories/5-Snap&Bound/lit/ReactMaxSnapElementApp/App.ts
5fa9d1b8c67f9be58e46503141a1cb0406fe5ce1  stories/5-Snap&Bound/lit/ReactSnapContainerApp/App.ts
5892b843bca1b0c4b604ad0ab3075dc710095512  stories/5-Snap&Bound/lit/ReactSnapElementsApp/App.ts
df6729a66f0d4ddcfcc484a0c958b66ac21aef1b  stories/5-Snap&Bound/lit/ReactSnapElementsGroupApp/App.ts
1b8867d89d4d2b554e3e8c140da12a30897a0cf4  stories/5-Snap&Bound/lit/ReactSnapGridApp/App.ts
fa98a8cb0b9ebb8bfe5c194a943528788e4ddeb4  stories/5-Snap&Bound/lit/ReactSnapGridGroupApp/App.ts
ba4e24c90e5e8c5aee00c1aa2cffe5817544f851  stories/5-Snap&Bound/lit/ReactSnapGuidelinesApp/App.ts
005351780f49acfa725d361e0d66eb6e240d83ec  stories/5-Snap&Bound/lit/ReactSnapRotationsApp/App.ts
0d0e9b666ca74d1213ef97541dbfa7f58aaf5960  stories/5-Snap&Bound/script/ReactBoundResizableApp/App.html
f320b5f27f07e1d08512e1e7705a4741981624df  stories/5-Snap&Bound/script/ReactBoundResizableApp/App.js
c015e3a2d38156e08c2fae456c7c9cca3a41bb17  stories/5-Snap&Bound/script/ReactBoundRotatableApp/App.html
9b0862afed35672ca56dadfd3b074e69b57225ef  stories/5-Snap&Bound/script/ReactBoundRotatableApp/App.js
10c8a82b73f537b88d2c5a2b83e8001e88072de4  stories/5-Snap&Bound/script/ReactBoundRotatableGroupApp/App.html
5097f6abdf355738b1dab56a93242191ca8a791d  stories/5-Snap&Bound/script/ReactBoundRotatableGroupApp/App.js
dca9c4f907ee4ba85355b45442a7469f3b3b17bb  stories/5-Snap&Bound/script/ReactBoundScalableApp/App.html
07d1ef3db4c900111d03192a9f369d9d2e415202  stories/5-Snap&Bound/script/ReactBoundScalableApp/App.js
be502ee5eb8eb9891eed6791c055b08cdcb95af0  stories/5-Snap&Bound/script/ReactInnerBoundResizableApp/App.html
62fc4bd584db72b6e5f9bf9d3718aeb7e761ef1b  stories/5-Snap&Bound/script/ReactInnerBoundResizableApp/App.js
392ec0a21ae3372c13816ef8345ca3dc79f50e7b  stories/5-Snap&Bound/script/ReactMaxSnapElementApp/App.html
e629763bae1ea321d5ca711fcba3bb734c0706cd  stories/5-Snap&Bound/script/ReactMaxSnapElementApp/App.js
3f03fc827599e59562102cb684ba3f4be2578af9  stories/5-Snap&Bound/script/ReactSnapContainerApp/App.html
f0b1f995c824e53012a2b26e82f686e4a7ffc9e5  stories/5-Snap&Bound/script/ReactSnapContainerApp/App.js
fdb5a052100c5f08c6f9c87c9277f17ddc34d892  stories/5-Snap&Bound/script/ReactSnapElementsApp/App.html
8b6815a5c46f8496faf375770bc136e03c66ab8c  stories/5-Snap&Bound/script/ReactSnapElementsApp/App.js
95b8ac27640a2739bda6d81ab29eb15420b135fd  stories/5-Snap&Bound/script/ReactSnapElementsGroupApp/App.html
1490e0d7b28008ebd21a76b352353fc8a965a8ed  stories/5-Snap&Bound/script/ReactSnapElementsGroupApp/App.js
f0c74b8256d7083ccc757e75ab19d386b62d8ebc  stories/5-Snap&Bound/script/ReactSnapGridApp/App.html
45656bcd883f53b8e91193cf13ddec774fd49d11  stories/5-Snap&Bound/script/ReactSnapGridApp/App.js
f7a822ad4f385f115c65903c21f32ca53767846d  stories/5-Snap&Bound/script/ReactSnapGridGroupApp/App.html
3ebc4d4f20adde0f9ecb2911a83d6b6ebba60bbc  stories/5-Snap&Bound/script/ReactSnapGridGroupApp/App.js
f0c74b8256d7083ccc757e75ab19d386b62d8ebc  stories/5-Snap&Bound/script/ReactSnapGuidelinesApp/App.html
37a2f179f7a4ff8b17b4a93aceb2a31df9088fc0  stories/5-Snap&Bound/script/ReactSnapGuidelinesApp/App.js
19d05a6c554d019a7a98d3095bc12423661be070  stories/5-Snap&Bound/script/ReactSnapRotationsApp/App.html
e95c759fb2ff1a97b26852e2206fdf29db64ca61  stories/5-Snap&Bound/script/ReactSnapRotationsApp/App.js
9dba761b94d2fe986158ec3dae2fd2f84ca809e9  stories/5-Snap&Bound/svelte/ReactBoundResizableApp/App.svelte
03eea47f8faa705ebb93708fba0c3a0b23f7edba  stories/5-Snap&Bound/svelte/ReactBoundRotatableApp/App.svelte
9ed500c5b43dac6c5cb4981b084a6fb7cb199f7f  stories/5-Snap&Bound/svelte/ReactBoundRotatableGroupApp/App.svelte
99ca87b3115d4b52ba2f15311138fe418346a368  stories/5-Snap&Bound/svelte/ReactBoundScalableApp/App.svelte
346ce3b9846fd6b4a7d5ac4c351187042c5642b5  stories/5-Snap&Bound/svelte/ReactInnerBoundResizableApp/App.svelte
0abaded9cfc56eebc250a06c1f87d5b6166c7d8e  stories/5-Snap&Bound/svelte/ReactMaxSnapElementApp/App.svelte
c606a9289240589378bd0a2c2e82ff0b8ebe732e  stories/5-Snap&Bound/svelte/ReactSnapContainerApp/App.svelte
82e4074529d5e5afe19eecbbd5239ef4a2599e7f  stories/5-Snap&Bound/svelte/ReactSnapElementsApp/App.svelte
811228fb4dc9e7535204cb75484e2467ebc9bbda  stories/5-Snap&Bound/svelte/ReactSnapElementsGroupApp/App.svelte
c0fa1ca233e105b63822e26b70481a8ab684a183  stories/5-Snap&Bound/svelte/ReactSnapGridApp/App.svelte
562a88965df322471f8ab49491eb600b0353b805  stories/5-Snap&Bound/svelte/ReactSnapGridGroupApp/App.svelte
f739ec3f468eeee2bbcc6071397947366de5d213  stories/5-Snap&Bound/svelte/ReactSnapGuidelinesApp/App.svelte
99a6dfdd5dc8a24edd19f3b0c661995a4c100b14  stories/5-Snap&Bound/svelte/ReactSnapRotationsApp/App.svelte
b4fd6971cbf4b8f2cf0369766da1736436c31925  stories/5-Snap&Bound/vue3/ReactBoundResizableApp/App.vue
29c39f053242771bc5689944c42923c43cfd734c  stories/5-Snap&Bound/vue3/ReactBoundRotatableApp/App.vue
063781e87bbd4a0f501cebeb2bea576eb48342af  stories/5-Snap&Bound/vue3/ReactBoundRotatableGroupApp/App.vue
4b71c324fb5eec75567e46413482b50ab9abd770  stories/5-Snap&Bound/vue3/ReactBoundScalableApp/App.vue
2b61cb24734f821f610dc7d16b75b4f8b7aadaa8  stories/5-Snap&Bound/vue3/ReactInnerBoundResizableApp/App.vue
2a8f80c727c399ec309419b79b397d8d9c17d9b5  stories/5-Snap&Bound/vue3/ReactMaxSnapElementApp/App.vue
66295459f8242114744562a484e64dbc70ce1c3f  stories/5-Snap&Bound/vue3/ReactSnapContainerApp/App.vue
c7b4e3a016f4354bce434490903458304343af10  stories/5-Snap&Bound/vue3/ReactSnapElementsApp/App.vue
b37e493e6dfc1fe655a7ae334b614ec49d493c53  stories/5-Snap&Bound/vue3/ReactSnapElementsGroupApp/App.vue
4a2f7bef94241e2acd17765a58f9870065d3d978  stories/5-Snap&Bound/vue3/ReactSnapGridApp/App.vue
afd4054737661c5c52daffb69dd20b77bcb5f60d  stories/5-Snap&Bound/vue3/ReactSnapGridGroupApp/App.vue
9b2220c71c6d89b8c7fd332a0277d6c0f9af4845  stories/5-Snap&Bound/vue3/ReactSnapGuidelinesApp/App.vue
f9620ebf5fc0fc84530ebb97f4d8d6a01d778911  stories/5-Snap&Bound/vue3/ReactSnapRotationsApp/App.vue
e4f39b2fac1381bb9cc90ec1352110ee244557b0  stories/5A-Advanced/0-Moveable/lit/ReactNoRelativeApp/App.ts
a5fa525cf6d47a940eba32910f682259ccdc1da1  stories/5A-Advanced/0-Moveable/lit/ReactPositionFixedApp/App.ts
85ca387e155b0d7a581a2f8f01b6efc15da9e5d0  stories/5A-Advanced/0-Moveable/lit/ReactSelectFormApp/App.ts
b4b4fd08e26f7e9af90b0f23ab296d58d45f5718  stories/5A-Advanced/0-Moveable/script/ReactNoRelativeApp/App.html
1a901f6ec06ed7bd14c2d51cd1147a86165d054d  stories/5A-Advanced/0-Moveable/script/ReactNoRelativeApp/App.js
acd1b6355818be8cbcbaa7b589fc2c90ad8e25e1  stories/5A-Advanced/0-Moveable/script/ReactPositionFixedApp/App.html
6e15f69cd54944b000c4e1dce3e1665aa4c181f6  stories/5A-Advanced/0-Moveable/script/ReactPositionFixedApp/App.js
14d1b7666a7ff967420b46ae3a8b6b401c9545a5  stories/5A-Advanced/0-Moveable/script/ReactSelectFormApp/App.html
40c2ff41cee0924a86ebb2f2cb5b7aa3b5d92df7  stories/5A-Advanced/0-Moveable/script/ReactSelectFormApp/App.js
08c81c7e6c216f88dc16000457b2033d39e16fab  stories/5A-Advanced/0-Moveable/svelte/ReactNoRelativeApp/App.svelte
cc157368dabe419689f96f025d0eacc699e114f9  stories/5A-Advanced/0-Moveable/svelte/ReactPositionFixedApp/App.svelte
de69710646316c3b17ed3be43e82c8c292c83e49  stories/5A-Advanced/0-Moveable/svelte/ReactSelectFormApp/App.svelte
ef80496bbc3ad2b9b16a4e6736b454cde626f91e  stories/5A-Advanced/0-Moveable/vue3/ReactNoRelativeApp/App.vue
1a0ccfcb99eefc0cce74d12b63b395b409072f1f  stories/5A-Advanced/0-Moveable/vue3/ReactPositionFixedApp/App.vue
fb54304902c3c94eb7295bc776ada19ea1fad3d8  stories/5A-Advanced/0-Moveable/vue3/ReactSelectFormApp/App.vue
144241be4e16b16dfd55fb147913ae4a75a41618  stories/5A-Advanced/1-Draggable/lit/ReactEdgeDraggableWithEdgeApp/App.ts
c3ed0edeb72b0f9fda2b4a9f01125715a8ac6063  stories/5A-Advanced/1-Draggable/script/ReactEdgeDraggableWithEdgeApp/App.html
e21f522591a4d8f1459e85dabfa226fa3c444e0b  stories/5A-Advanced/1-Draggable/script/ReactEdgeDraggableWithEdgeApp/App.js
ec77b251954591e6f21ea5c03cd323d05cbd521f  stories/5A-Advanced/1-Draggable/svelte/ReactEdgeDraggableWithEdgeApp/App.svelte
63c19cc2a59d20344e94e4b429c4869ea3d50d6c  stories/5A-Advanced/1-Draggable/vue3/ReactEdgeDraggableWithEdgeApp/App.vue
2d818c417d39f3c0b5a497b7561c68a3f07d5eee  stories/5A-Advanced/2-Resizable/lit/ReactFixedDirectionApp/App.ts
ab69625ec4f369e4a4545c1a7da4ef2cb12e6b26  stories/5A-Advanced/2-Resizable/lit/ReactFlexApp/App.ts
c37c36f9c1294b92da97cce08c8632b46341cf31  stories/5A-Advanced/2-Resizable/lit/ReactGroupMinSizeApp/App.ts
5668ccc5daace74841d022850406a2d0930080ee  stories/5A-Advanced/2-Resizable/lit/ReactWithEdgeControlApp/App.ts
2eadca3272060fb72f41218a135a84cab2c6f660  stories/5A-Advanced/2-Resizable/script/ReactFixedDirectionApp/App.html
a2a8d9f672e5f0f65fddd91c1ac19f60548c4435  stories/5A-Advanced/2-Resizable/script/ReactFixedDirectionApp/App.js
c18db2473d2987bc6db7cf085826cfeaaf08388c  stories/5A-Advanced/2-Resizable/script/ReactFlexApp/App.html
1a687abf29ef002e648448f364693e87e6d314b0  stories/5A-Advanced/2-Resizable/script/ReactFlexApp/App.js
6ef999fc5483ac181d84ae2e74588a0364937a77  stories/5A-Advanced/2-Resizable/script/ReactGroupMinSizeApp/App.html
f58760161861b7243dace2bfcbc2b85ae42c0d7b  stories/5A-Advanced/2-Resizable/script/ReactGroupMinSizeApp/App.js
1cfddddd58e2c79b232e56c4ca62c140a6d3cc6f  stories/5A-Advanced/2-Resizable/script/ReactWithEdgeControlApp/App.html
a188d6e936460276ba7e3dae3529dd5dec93be18  stories/5A-Advanced/2-Resizable/script/ReactWithEdgeControlApp/App.js
088082cab5bbd755399788b1520cfdd8c475e2d9  stories/5A-Advanced/2-Resizable/svelte/ReactFixedDirectionApp/App.svelte
a146f165f1bcce3c8ce8ca254136eaeac84c0a1d  stories/5A-Advanced/2-Resizable/svelte/ReactFlexApp/App.svelte
f3d1b6bd42243e3e224a9c90b05c32cf00461cfb  stories/5A-Advanced/2-Resizable/svelte/ReactGroupMinSizeApp/App.svelte
8ad37aeb99ce927d9c9ca8b3041c466a2a8171b0  stories/5A-Advanced/2-Resizable/svelte/ReactWithEdgeControlApp/App.svelte
2154c4755f0e39a14d4b0220062979d6e34b26e6  stories/5A-Advanced/2-Resizable/vue3/ReactFixedDirectionApp/App.vue
535156be9e409e7e67b7cb033886bb64f52bd2f8  stories/5A-Advanced/2-Resizable/vue3/ReactFlexApp/App.vue
eb2c0b770197e3c3407a8dac46ae87c225373653  stories/5A-Advanced/2-Resizable/vue3/ReactGroupMinSizeApp/App.vue
cca0681bb57582f834f51d6e567251c6711dc15f  stories/5A-Advanced/2-Resizable/vue3/ReactWithEdgeControlApp/App.vue
7d1295fc7417d57176538aaf7094417518dbd8f8  stories/5A-Advanced/3-Scalable/lit/ReactScalableMinMaxApp/App.ts
844927c2b59e4c931a987bc0018efce0b8228c90  stories/5A-Advanced/3-Scalable/script/ReactScalableMinMaxApp/App.html
4d003a91454af6aae4a6ded47ba1dc42792967d8  stories/5A-Advanced/3-Scalable/script/ReactScalableMinMaxApp/App.js
5db9b84859d0b238bd1b145dd39e0c0cfcbd922f  stories/5A-Advanced/3-Scalable/svelte/ReactScalableMinMaxApp/App.svelte
d1922a58eae07a6c69e6fc83cbcb995db97deb29  stories/5A-Advanced/3-Scalable/vue3/ReactScalableMinMaxApp/App.vue
a1ea149f03040d9ee5dde750ccdf87045109a1b7  stories/5A-Advanced/4-Rotatable/lit/ReactCustomOriginApp/App.ts
bf1260a13aeae0ec7422b92c05d7ff7c33efcfd2  stories/5A-Advanced/4-Rotatable/lit/ReactRotateWithResizeApp/App.ts
ceba6381703dd63ff5a1ac4aa68bd9b2453d6a1d  stories/5A-Advanced/4-Rotatable/lit/ReactSetRotationApp/App.ts
c3ed0edeb72b0f9fda2b4a9f01125715a8ac6063  stories/5A-Advanced/4-Rotatable/script/ReactCustomOriginApp/App.html
533c9e06819d23cd0fa3f979d362ba6215d7d87c  stories/5A-Advanced/4-Rotatable/script/ReactCustomOriginApp/App.js
dd96b3cd30be27231c8f3b689d1987dcc7e3c369  stories/5A-Advanced/4-Rotatable/script/ReactRotateWithResizeApp/App.html
34ebc2738be4be73985dc86dd5a72dbd866a2618  stories/5A-Advanced/4-Rotatable/script/ReactRotateWithResizeApp/App.js
ee927e6e6dc127dabb7875301b84d4bd6d711f0a  stories/5A-Advanced/4-Rotatable/script/ReactSetRotationApp/App.html
c3d5bd7c12b31a6ca5e7584388763ef4721d2cc9  stories/5A-Advanced/4-Rotatable/script/ReactSetRotationApp/App.js
b2c3a02815c2552374be20999f159fcea896638c  stories/5A-Advanced/4-Rotatable/svelte/ReactCustomOriginApp/App.svelte
200d24adf0d64308523592392a0c81bb735f2037  stories/5A-Advanced/4-Rotatable/svelte/ReactRotateWithControlsApp/App.svelte
a73d5c2fa8bba30f774737449311ed20b6c6e74e  stories/5A-Advanced/4-Rotatable/svelte/ReactRotateWithResizeApp/App.svelte
1e1a3fefd6029c3d179d8f533e6be023a93e20ed  stories/5A-Advanced/4-Rotatable/svelte/ReactSetRotationApp/App.svelte
172086092173819b456f7c93ec01274669fefe0f  stories/5A-Advanced/4-Rotatable/vue3/ReactCustomOriginApp/App.vue
dfc26e5382976fe8578be72cb85eb64e6fe4ef02  stories/5A-Advanced/4-Rotatable/vue3/ReactRotateWithControlsApp/App.vue
3fa547b0f57bf48a45007b3d4dcc32cf3cd50b6b  stories/5A-Advanced/4-Rotatable/vue3/ReactRotateWithResizeApp/App.vue
ee6bae322bd2d1cae95ea1e16b2e12731b331509  stories/5A-Advanced/4-Rotatable/vue3/ReactSetRotationApp/App.vue
42b34189f9f00597aa3292a4141cac73de97e4ab  stories/5A-Advanced/5-Snappable/lit/ReactCustomElementGuidelinesApp/App.ts
22c5da4ec88558c7deea073fc44efe4cd7fda909  stories/5A-Advanced/5-Snappable/lit/ReactCustomGuidelinesApp/App.ts
4241058182530dcff1a1acd579932e95bf50aed2  stories/5A-Advanced/5-Snappable/script/ReactCustomElementGuidelinesApp/App.html
41762fc2bad734ce380957d3bf9140213b486b58  stories/5A-Advanced/5-Snappable/script/ReactCustomElementGuidelinesApp/App.js
19d05a6c554d019a7a98d3095bc12423661be070  stories/5A-Advanced/5-Snappable/script/ReactCustomGuidelinesApp/App.html
f978faf60dcc88701df00d6872ba40fceae4b60e  stories/5A-Advanced/5-Snappable/script/ReactCustomGuidelinesApp/App.js
f07872b269f949022fdeebc2dacc97a82e3a6b5b  stories/5A-Advanced/5-Snappable/svelte/ReactCustomElementGuidelinesApp/App.svelte
43b3c599f53cd824703736367c716ce78d2d19ad  stories/5A-Advanced/5-Snappable/svelte/ReactCustomGuidelinesApp/App.svelte
c6fc206ed8d2aa4b39a6b41626e57e1fee09aa4d  stories/5A-Advanced/5-Snappable/vue3/ReactCustomElementGuidelinesApp/App.vue
f330fd42e9130d24eb85c8b665e764cb5570edab  stories/5A-Advanced/5-Snappable/vue3/ReactCustomGuidelinesApp/App.vue
52e9f659ebe220b651b2f759af1a865cb1e52598  stories/5A-Advanced/9-Clippable/lit/ReactClippableApp/App.ts
1a8fe89b543dc0db13300bb940b0e9fe37557af7  stories/5A-Advanced/9-Clippable/lit/ReactClippableResizableKeepRatioApp/App.ts
88035ee82e1df3e5da65d4287da4e818416c5c2f  stories/5A-Advanced/9-Clippable/lit/ReactClippedAreaApp/App.ts
6ae1a23945cf5183ff751ce8e9c892cd3459f1b6  stories/5A-Advanced/9-Clippable/lit/ReactClipSnapApp/App.ts
eb095ac6f033eedff8d7c06b2349044e1ea5caa7  stories/5A-Advanced/9-Clippable/script/ReactClippableApp/App.html
9d16456dd820460fe8ae0008135a100df654be45  stories/5A-Advanced/9-Clippable/script/ReactClippableApp/App.js
7a56f72ae53dfaeb00fa3c58ee38cff9a510af39  stories/5A-Advanced/9-Clippable/script/ReactClippableResizableKeepRatioApp/App.html
9034313a7b0eb0f88af0d9423af41922843a176d  stories/5A-Advanced/9-Clippable/script/ReactClippableResizableKeepRatioApp/App.js
eb095ac6f033eedff8d7c06b2349044e1ea5caa7  stories/5A-Advanced/9-Clippable/script/ReactClippedAreaApp/App.html
06633ca5227a29e338faaaa1e449eb44d681f105  stories/5A-Advanced/9-Clippable/script/ReactClippedAreaApp/App.js
eb095ac6f033eedff8d7c06b2349044e1ea5caa7  stories/5A-Advanced/9-Clippable/script/ReactClipSnapApp/App.html
3e0be26b6241421ae7facb3409328559ffe00f55  stories/5A-Advanced/9-Clippable/script/ReactClipSnapApp/App.js
8a28e5ba681bf837ae2ffd2b699f873e5b46cf51  stories/5A-Advanced/9-Clippable/svelte/ReactClippableApp/App.svelte
2a8ab874ffbbb37ca7f88ae43d7659e24f53f574  stories/5A-Advanced/9-Clippable/svelte/ReactClippableResizableKeepRatioApp/App.svelte
75590a0e57479c7c0364af300ed594e116798358  stories/5A-Advanced/9-Clippable/svelte/ReactClippedAreaApp/App.svelte
5d04cbac6ee111c383a6bf7a5b035623b2b9e8d4  stories/5A-Advanced/9-Clippable/svelte/ReactClipSnapApp/App.svelte
37503818c820d4ed90f041a34da882fe3f485c64  stories/5A-Advanced/9-Clippable/vue3/ReactClippableApp/App.vue
87a377d6e20ad2f293024423e14e304736ac5d22  stories/5A-Advanced/9-Clippable/vue3/ReactClippableResizableKeepRatioApp/App.vue
508bc7aee3f8f86fa788a71e826add4f79a2e079  stories/5A-Advanced/9-Clippable/vue3/ReactClippedAreaApp/App.vue
e10a7a1ce4ce472674a7f42fba43b700cb57603d  stories/5A-Advanced/9-Clippable/vue3/ReactClipSnapApp/App.vue
588d60da6898ceb3063fbf155639ff9cf7f8e803  stories/6-CustomAble/lit/ReactCustomRotatableApp/App.ts
6f81668509c311aff2766ed42a43d284c2eec944  stories/6-CustomAble/lit/ReactDimensionViewableApp/App.ts
78e1e5515fac97748d46c6e5810fa71a982de0d2  stories/6-CustomAble/lit/ReactEditableApp/App.ts
b02b3596f21d135ef41d98b320e11815939bec79  stories/6-CustomAble/lit/ReactMouseEnterLeaveApp/App.ts
6a6180c5a87c52797aa2c4b58d0f07373e2f2ab7  stories/6-CustomAble/script/ReactCustomRotatableApp/App.html
ecc6f345bb7407ff517af606f27c442af3391696  stories/6-CustomAble/script/ReactCustomRotatableApp/App.js
028c6a51d167f0bdba4525aa402112aa166a4c61  stories/6-CustomAble/script/ReactDimensionViewableApp/App.html
a9b785c4e5caf503c7ea68f93f98a5a862ec0142  stories/6-CustomAble/script/ReactDimensionViewableApp/App.js
028c6a51d167f0bdba4525aa402112aa166a4c61  stories/6-CustomAble/script/ReactEditableApp/App.html
1fbf32268ee8d132101b6ce32304a95231cfc314  stories/6-CustomAble/script/ReactEditableApp/App.js
39f45e0c88bd61a220f68cfd52fc9154aa58b028  stories/6-CustomAble/script/ReactMouseEnterLeaveApp/App.html
e503b45251a6158e25cec6583b88b145870618f1  stories/6-CustomAble/script/ReactMouseEnterLeaveApp/App.js
7538af8ccc5e02d3aef75b712ed2639237fead93  stories/6-CustomAble/svelte/ReactCustomRotatableApp/App.svelte
b463c7d01191cbed857684ce6dae6f1c9e7fddb3  stories/6-CustomAble/svelte/ReactDimensionViewableApp/App.svelte
e9f4185422471eb06a6e2006a0881da01f5463d2  stories/6-CustomAble/svelte/ReactEditableApp/App.svelte
afa5f9daa5826f5481ee4e39bf90c7ba841b1ccb  stories/6-CustomAble/svelte/ReactMouseEnterLeaveApp/App.svelte
bb8e3b28cd53bad02d6cc8db6ca5a227eeed63b0  stories/6-CustomAble/vue3/ReactCustomRotatableApp/App.vue
f0ed4b59d80a5d89a353a2b11b132d23f4be2b95  stories/6-CustomAble/vue3/ReactDimensionViewableApp/App.vue
2538cf005f685daa958c86d2aa03849be74989f2  stories/6-CustomAble/vue3/ReactEditableApp/App.vue
fa4c9026513032aeb155ec50aa778871ce4c3c5b  stories/6-CustomAble/vue3/ReactMouseEnterLeaveApp/App.vue
45d3ffada4a6a55c6d151168ec71f2a3ee11caec  stories/7-Request/lit/ReactAlignApp/App.ts
06978006d68a7ac2ea07f738834e338ff459524c  stories/7-Request/lit/ReactDraggableApp/App.ts
23b193f87f60db22be1c88252493246e97536119  stories/7-Request/lit/ReactDraggableSnappableApp/App.ts
963c4d65d9a077f839052d37563a46b02c68a43b  stories/7-Request/lit/ReactResizableApp/App.ts
da1c0ab77ef39ad6182a9fb325384839bad26fbc  stories/7-Request/lit/ReactResizableDeltaApp/App.ts
28d749fc8ac4fcf919d3d6a41b04cc3df1b70117  stories/7-Request/lit/ReactResizableGroupApp/App.ts
b24d03a6139fb631235a7360348f6adcaa2cd277  stories/7-Request/lit/ReactResizableSnappableApp/App.ts
2cc17294d45afd393bc15d776736e626f965d092  stories/7-Request/script/ReactAlignApp/App.html
4d02d69bf203b40d375ed913ea8a0fe5bc9294ac  stories/7-Request/script/ReactAlignApp/App.js
7be91d529a084e5f9cda590ab77d061d572c9b64  stories/7-Request/script/ReactDraggableApp/App.html
00f9262adb75f9d37cb33d88a50b95d306b3084d  stories/7-Request/script/ReactDraggableApp/App.js
94a184ea16c5c08fa63a7c03ef47b07de6c745aa  stories/7-Request/script/ReactDraggableSnappableApp/App.html
750e4f00039f0b28a7bb93e3d8b2d78e1b03126c  stories/7-Request/script/ReactDraggableSnappableApp/App.js
fac3c987ed8ceb2335de079c0e4008ed2869de75  stories/7-Request/script/ReactResizableApp/App.html
52bc3569e75d50431ef82c2aadc6095fc15e68c7  stories/7-Request/script/ReactResizableApp/App.js
7ff3f0316af3735234a037717ed970700f9df9d0  stories/7-Request/script/ReactResizableDeltaApp/App.html
47040f4933c1e33432c2298a5d1e03ecbaf690c0  stories/7-Request/script/ReactResizableDeltaApp/App.js
02efcb5354a0782a58fb9a05c3ba515b0cc83569  stories/7-Request/script/ReactResizableGroupApp/App.html
50c0731044a23b0038d4f57894c42a01030f7470  stories/7-Request/script/ReactResizableGroupApp/App.js
94a184ea16c5c08fa63a7c03ef47b07de6c745aa  stories/7-Request/script/ReactResizableSnappableApp/App.html
fbe8863fa71733ca40ed3ab04ac9458652fae0d5  stories/7-Request/script/ReactResizableSnappableApp/App.js
07fcac7031d07b6f67a5d5128d5bf31ea90b969d  stories/7-Request/svelte/ReactAlignApp/App.svelte
2e94a723220ff69f868493e590f0cff321e47111  stories/7-Request/svelte/ReactDraggableApp/App.svelte
77595fcdf2f9c69d188b9120488f679633eb2de5  stories/7-Request/svelte/ReactDraggableSnappableApp/App.svelte
5d30108e73ca4ed63f92b9d3cfb2299f196fd3e4  stories/7-Request/svelte/ReactResizableApp/App.svelte
9f6d1ba23fdde1c7baeaa73da79d33983a7564c7  stories/7-Request/svelte/ReactResizableDeltaApp/App.svelte
6dbf8fb8c2440728990a092b77e5445b7e8b5aca  stories/7-Request/svelte/ReactResizableGroupApp/App.svelte
524b7231be25d8a854768d0d7d8e45c0f8ccc27f  stories/7-Request/svelte/ReactResizableSnappableApp/App.svelte
c3e6608cf72ab9dc5878cfe508aa63d46bcb61c1  stories/7-Request/vue3/ReactAlignApp/App.vue
3f13991e14ce1220a33ab2c8264de3b95fe293d7  stories/7-Request/vue3/ReactDraggableApp/App.vue
d4f7778db91386986a341e59d9d2729698fc2878  stories/7-Request/vue3/ReactDraggableSnappableApp/App.vue
e9cbf8d933e63e38c69b1ddbe0dc3e7bb53af42f  stories/7-Request/vue3/ReactResizableApp/App.vue
a0d03b054a60942ff31598880bcc678d403354b0  stories/7-Request/vue3/ReactResizableDeltaApp/App.vue
e44f408c4b135707cf705ad036fe8c3848ba655c  stories/7-Request/vue3/ReactResizableGroupApp/App.vue
59014dbfbb0e1272901d9f2f0c167ed4519b00df  stories/7-Request/vue3/ReactResizableSnappableApp/App.vue
4740e26376731d4a1a79a3b8f98b99be0ccbfae9  stories/9-Scrolling/lit/ReactScrollableApp/App.ts
492f316ff2d83231b1c2f663a020b20a1f4cb5aa  stories/9-Scrolling/script/ReactScrollableApp/App.html
20f0d37933effdec419096f784bbbc6e98dfc06a  stories/9-Scrolling/script/ReactScrollableApp/App.js
2d88947e4799642f0c64d28f990d41cdfd93fab9  stories/9-Scrolling/svelte/ReactScrollableApp/App.svelte
73e7db7afddfc50e25267cacf4b8b67727b31a57  stories/9-Scrolling/vue3/ReactScrollableApp/App.vue
e6294cd4554880eea7a881ec9e4e62f00048c279  stories/99-Tests/lit/ReactAccuracyApp/App.ts
93c5754c4cffd445a393ad82eb93060e776f106b  stories/99-Tests/lit/ReactAccurateElementGuideline2App/App.ts
422948688b79ea66b1d9a02307e517d7ba725049  stories/99-Tests/lit/ReactAccurateElementGuidelineApp/App.ts
687b3485004887a9d6d308f6bc6735b67bc2a2a3  stories/99-Tests/lit/ReactATagApp/App.ts
4be2cd6556661f9be0e25b9012a8e257869fa984  stories/99-Tests/lit/ReactChangeTargetsOnClickApp/App.ts
8669ce8fe6f37c6247fea9cc498b123136cd8b17  stories/99-Tests/lit/ReactChangingSnapContainerApp/App.ts
b77921112192071bd1d93b99aba46348d7815fb3  stories/99-Tests/lit/ReactClickApp/App.ts
4277613feed7a2a38f90fe2a906fdd130440c645  stories/99-Tests/lit/ReactCustomElementApp/App.ts
d72cf5ddae1ce936a281423819c89f127fab861c  stories/99-Tests/lit/ReactDragAPIApp/App.ts
02eb99f1c58b506b220bf8fc266f1b782cfdda82  stories/99-Tests/lit/ReactDragStartGroupApp/App.ts
2e6f7796cd2bb9d173e3cb332ecbbd14036a4387  stories/99-Tests/lit/ReactDragTargetApp/App.ts
61f12a37f34e3e55646c59f00226a5a64717961b  stories/99-Tests/lit/ReactFixedSnapApp/App.ts
c6f9f0503eda1db0efc07b318acb37b5b63fc68a  stories/99-Tests/lit/ReactFlexApp/App.ts
560c06849a97b70ee133d14db44d0f8b5dcc3542  stories/99-Tests/lit/ReactGroupDragAreaApp/App.ts
5a00f42a34c870f1deec476f6c9b6ef370ea7b05  stories/99-Tests/lit/ReactGroupPaddingApp/App.ts
eca0995dd91814a15cb7d781cbeb805e751f9dc7  stories/99-Tests/lit/ReactHandleLargeNumberApp/App.ts
eee5a620db1ce5d88910f8ffdd09e2018628df51  stories/99-Tests/lit/ReactInputApp/App.ts
2389a7ed4fd0bc3a9c214da738ed1a424869b0ab  stories/99-Tests/lit/ReactLargeZoomElementGuidelinesApp/App.ts
a591e3a84268adbb29d455eef13e7366f456a3fa  stories/99-Tests/lit/ReactNestedSVGApp/App.ts
ce3f1597c9a113f480adfad9869626cf05212e80  stories/99-Tests/lit/ReactNestedTargetApp/App.ts
21fd5dc2853c08e1a430d00c260721a51342f0aa  stories/99-Tests/lit/ReactNoTargetApp/App.ts
0c94db2e68d873ca261385fdc3e54e6c25848270  stories/99-Tests/lit/ReactOverflowApp/App.ts
757d37cfd155bb05ba6fb1543e16b5f62fdcd5d0  stories/99-Tests/lit/ReactRequestBoundsApp/App.ts
d9a0e4402d2bfe0b076b0bef5861f2f08d405461  stories/99-Tests/lit/ReactRotateClippableApp/App.ts
c9c56fc37892219aa3354634876c63547f727579  stories/99-Tests/lit/ReactSafariApp/App.ts
3664b52c460f0299f5a3464044bc8199e0400339  stories/99-Tests/lit/ReactScalableKeepRatioApp/App.ts
40f4886b6cd10c5e606fdc172763ae6fcddf1941  stories/99-Tests/lit/ReactStopDragApp/App.ts
f753331b7083ea6504792609746f75dd00fc3fe3  stories/99-Tests/lit/ReactTranslate50App/App.ts
6284680174427f5ac99dfcdfa5855f15d8d111c3  stories/99-Tests/lit/ReactTRSTargetApp/App.ts
8473a61f94ae1091fc04cc21a96dc031f3162b33  stories/99-Tests/lit/ReactWillChangeApp/App.ts
d64b3345c875a64ad837c631183e8b9f103d0ee1  stories/99-Tests/lit/ReactZoomedCursorApp/App.ts
a236e0fdabcf5f917da51a71eed9b4ee5a3f60d5  stories/99-Tests/lit/ReactZoomedSnapApp/App.ts
7931677c51e402e8d6800720c9f99f4844cc5d99  stories/99-Tests/lit/ReactZoomedTargetApp/App.ts
3d1b0c901a897efe614a21987dd31009798f27e4  stories/99-Tests/script/ReactAccuracyApp/App.html
cb5aa7fc57fadc3cf4e2ea7f39a4c7bb6bc685e4  stories/99-Tests/script/ReactAccuracyApp/App.js
c5f5317bc0faf18781299e7a7f2411bcb0f3c679  stories/99-Tests/script/ReactAccurateElementGuideline2App/App.html
dca8106a95847e06b1111a0c6b5c4dca41cd7345  stories/99-Tests/script/ReactAccurateElementGuideline2App/App.js
7279df0366ef33e4605b4dfbb890f48931e4d075  stories/99-Tests/script/ReactAccurateElementGuidelineApp/App.html
99e23d368938ec55ac7a473529780289767d32aa  stories/99-Tests/script/ReactAccurateElementGuidelineApp/App.js
59261ec090b616c2d6d0f8f67d98dbb959c5d170  stories/99-Tests/script/ReactATagApp/App.html
cc3a0799eba4e14d6abe3037c51dc9e307076a8e  stories/99-Tests/script/ReactATagApp/App.js
ac2d0139d49308d187165d60d9d1794b0766cfc3  stories/99-Tests/script/ReactChangeTargetsOnClickApp/App.html
7cbb1dd28d9c8f1bfbfba114f6241efa33373ea9  stories/99-Tests/script/ReactChangeTargetsOnClickApp/App.js
c0d7da024c727def089772c178045d0d8f46b4e3  stories/99-Tests/script/ReactChangingSnapContainerApp/App.html
e7105d72709854fbfeb56132fcf0c2b9710a21f8  stories/99-Tests/script/ReactChangingSnapContainerApp/App.js
795cca4ea514a130cffbe4de64b2930a947f4c23  stories/99-Tests/script/ReactClickApp/App.html
fd361e0b12a72e57305eaa43128e9a6af09546ba  stories/99-Tests/script/ReactClickApp/App.js
4a67cd6eb6916205ea26680c166487549c68b1c5  stories/99-Tests/script/ReactCustomElementApp/App.html
13cd7bf89b46dadc8b5f3ef14b040b9bc967ee08  stories/99-Tests/script/ReactCustomElementApp/App.js
28a2f8394bddbe09051e4a528c82e54c1f45645a  stories/99-Tests/script/ReactDragAPIApp/App.html
5e4e7818bd69142dd6838d4a54b64ceb20bd90b8  stories/99-Tests/script/ReactDragAPIApp/App.js
afefcf22faa1b73d0e04288b60e05efbad0594b2  stories/99-Tests/script/ReactDragStartGroupApp/App.html
0810b73a840b7deb15e80a7e3da4b9fa06a3fae5  stories/99-Tests/script/ReactDragStartGroupApp/App.js
54beb78c550e00000caccf0f229690c53a1abc78  stories/99-Tests/script/ReactDragTargetApp/App.html
ae033cf1c395459d6c8ff8b70ca3e28608919e93  stories/99-Tests/script/ReactDragTargetApp/App.js
805989fd3065ce2d0997964dc53dfbf8144a064d  stories/99-Tests/script/ReactFixedSnapApp/App.html
5e4d8ee99914e69d0b91cb5d4bb10b7de5ba8470  stories/99-Tests/script/ReactFixedSnapApp/App.js
1f9da5e403591e5a148d6320858ebc30db42163d  stories/99-Tests/script/ReactFlexApp/App.html
cc3a0799eba4e14d6abe3037c51dc9e307076a8e  stories/99-Tests/script/ReactFlexApp/App.js
6ef999fc5483ac181d84ae2e74588a0364937a77  stories/99-Tests/script/ReactGroupDragAreaApp/App.html
c84aedea2bcad37f611abbc6f411e13ab2daddd4  stories/99-Tests/script/ReactGroupDragAreaApp/App.js
7063e750c4171b5bc13f6f60afaa0c43f2abab55  stories/99-Tests/script/ReactGroupPaddingApp/App.html
6d2867e4f191581640c5a416da84d580e22051ad  stories/99-Tests/script/ReactGroupPaddingApp/App.js
d797223b5afe2d6ab2dc4fbf11dc3b9798e0cd22  stories/99-Tests/script/ReactHandleLargeNumberApp/App.html
63e75b1ccf8a8d0a3bd5cba35903c4cee877f029  stories/99-Tests/script/ReactHandleLargeNumberApp/App.js
d347f7971b988d92890860d54cc525ec6d0800f2  stories/99-Tests/script/ReactInputApp/App.html
610861bde1ccda1b42d72286511d6b16842bd8df  stories/99-Tests/script/ReactInputApp/App.js
f7dbdb40df23d54312e5c77e440c1e8a22f9c612  stories/99-Tests/script/ReactLargeZoomElementGuidelinesApp/App.html
184a7afbcf8db6f0a65c61b441b9ab76cd2ae554  stories/99-Tests/script/ReactLargeZoomElementGuidelinesApp/App.js
a13d8286d5ac6a9bd8e7d7beb44f294d3fd9393b  stories/99-Tests/script/ReactNestedSVGApp/App.html
bf6f1310edf63619de60bb006a1cae39cf1ff475  stories/99-Tests/script/ReactNestedSVGApp/App.js
da469d5f8c49cfd0767a80550e4b11e8c4db5030  stories/99-Tests/script/ReactNestedTargetApp/App.html
64ef43b5bce9accb8def2ea9111aab8d6ac1aaa1  stories/99-Tests/script/ReactNestedTargetApp/App.js
1cfddddd58e2c79b232e56c4ca62c140a6d3cc6f  stories/99-Tests/script/ReactNoTargetApp/App.html
da743b9cbc5502b56b2e638d3c74959e39b1808d  stories/99-Tests/script/ReactNoTargetApp/App.js
ceca12365c300a358092268f1f322990ef71ddf2  stories/99-Tests/script/ReactOverflowApp/App.html
c25b658e8ed269791d308b0ce1e414a43b0e0f27  stories/99-Tests/script/ReactOverflowApp/App.js
9f85645648543708129dbf96b060664767cbf274  stories/99-Tests/script/ReactRequestBoundsApp/App.html
da32460126d0b8c200e8d5e3df292465fc7bea8e  stories/99-Tests/script/ReactRequestBoundsApp/App.js
5001937caab428e7faab7d88b60459e501f46bb4  stories/99-Tests/script/ReactRotateClippableApp/App.html
acec068f6b6f78bca0c0c1da6248c0466d001621  stories/99-Tests/script/ReactRotateClippableApp/App.js
35cd4aca3557e029dee2dc1ec9d6fe7238249856  stories/99-Tests/script/ReactSafariApp/App.html
41f0be7963cdb8303583e41f6da25c0c7b6ff5ff  stories/99-Tests/script/ReactSafariApp/App.js
f7399c98757a72c5340fcfdd79f1abd26c72187c  stories/99-Tests/script/ReactScalableKeepRatioApp/App.html
76293e452355e4f2ccbfb2c5368027b36d67e9c9  stories/99-Tests/script/ReactScalableKeepRatioApp/App.js
54369bee952c3e20487984842fb19e51bc5e4694  stories/99-Tests/script/ReactStopDragApp/App.html
9c2815ce8ebbd29eebb4c7886d832fb9d57c0192  stories/99-Tests/script/ReactStopDragApp/App.js
279f482cbbd59d318b1ae7c8d38ef7cbdf4137ed  stories/99-Tests/script/ReactTranslate50App/App.html
8b8315e40426fd9ca07abadf60f5121e02dee40a  stories/99-Tests/script/ReactTranslate50App/App.js
6a348abb8897f193304702bcc1c880b764e98ddb  stories/99-Tests/script/ReactTRSTargetApp/App.html
590cb0597a4ea02b8768b089e3a6ab3bdb7b3dfd  stories/99-Tests/script/ReactTRSTargetApp/App.js
ed85100fc1c57f9d01c850332d47fe8c9cfc7752  stories/99-Tests/script/ReactWillChangeApp/App.html
bd6fb8ce949919af2d31fece3039ee88f42da758  stories/99-Tests/script/ReactWillChangeApp/App.js
9a4c3b8f9f686b2e807e0d45530d924f881ffdd5  stories/99-Tests/script/ReactZoomedCursorApp/App.html
b69e414c24404721f4aea21cc72d765163af3853  stories/99-Tests/script/ReactZoomedCursorApp/App.js
c37644b39c11a9b4dad6021ee49af28a20419bbd  stories/99-Tests/script/ReactZoomedSnapApp/App.html
c9d6fa14b57168465b6fbcaedb6e5f94aa1b9c6d  stories/99-Tests/script/ReactZoomedSnapApp/App.js
6ebfbccd1719094c07feca0d099570f0abea7c85  stories/99-Tests/script/ReactZoomedTargetApp/App.html
590cb0597a4ea02b8768b089e3a6ab3bdb7b3dfd  stories/99-Tests/script/ReactZoomedTargetApp/App.js
d0ecd49808e37e9d5df9e8f51d88e3c3bc33060a  stories/99-Tests/svelte/ReactAccuracyApp/App.svelte
cceefc194adb0e2fc1cb828a3b9f1ca05918daf7  stories/99-Tests/svelte/ReactAccurateElementGuideline2App/App.svelte
91be2ca50da859b3d337ebb160cff5467ee20785  stories/99-Tests/svelte/ReactAccurateElementGuidelineApp/App.svelte
e4309cf5ba7538fb9d87c97758c09bdf0e3d4693  stories/99-Tests/svelte/ReactATagApp/App.svelte
7d237ea3cb7874cf20082347b2f8ce04c85fe5fc  stories/99-Tests/svelte/ReactChangeTargetsOnClickApp/App.svelte
87dd2d63ea3bd4e7d54408d51e11101b58cb116c  stories/99-Tests/svelte/ReactChangingSnapContainerApp/App.svelte
57b9604dddc166e468f5bf5af96924888bf24e7d  stories/99-Tests/svelte/ReactClickApp/App.svelte
f0025e04a5749e0d6521d9bb3b98a343d62fa782  stories/99-Tests/svelte/ReactCustomElementApp/App.svelte
8f59d2839668754db7c12ef2f8ec63494bfc76a2  stories/99-Tests/svelte/ReactDragAPIApp/App.svelte
6ac873fb8f086a7d357ade4ff417dd981dee17f4  stories/99-Tests/svelte/ReactDragStartGroupApp/App.svelte
222625569e084e2ea089301b263e02d93a009fc9  stories/99-Tests/svelte/ReactDragTargetApp/App.svelte
37343777cfdab57f36c3c284698b26fa2a05c632  stories/99-Tests/svelte/ReactFixedSnapApp/App.svelte
894ede16d84d3043c97c7ae08ec5405dcdab6b6b  stories/99-Tests/svelte/ReactFlexApp/App.svelte
9944889933375e6632b598427beece5b2d345426  stories/99-Tests/svelte/ReactGroupDragAreaApp/App.svelte
f4e26ba491a6ac687ae6bd3d7f0546e010a3ede8  stories/99-Tests/svelte/ReactGroupPaddingApp/App.svelte
3452270575fdc8459274622670055341d03e044e  stories/99-Tests/svelte/ReactHandleLargeNumberApp/App.svelte
427eec165ffe136f2bf49e57deb33c4305f7c1b4  stories/99-Tests/svelte/ReactInputApp/App.svelte
2390eb121ece44ea5fc8ba7cfd83e545fa16105c  stories/99-Tests/svelte/ReactLargeZoomElementGuidelinesApp/App.svelte
74d681ee0fb6fc2177444c1f45d15db63b87bade  stories/99-Tests/svelte/ReactNestedSVGApp/App.svelte
def752fbee3a9693305a13c3c74dcbf3bc79fc57  stories/99-Tests/svelte/ReactNestedTargetApp/App.svelte
bacd453391b28f8926b45ed8926c1534bba8cea5  stories/99-Tests/svelte/ReactNoTargetApp/App.svelte
44325d7769268b238ffaf062e56618ebda49c4f5  stories/99-Tests/svelte/ReactOverflowApp/App.svelte
f03f44b06f44b158c1325781737b7015238eb6c7  stories/99-Tests/svelte/ReactRequestBoundsApp/App.svelte
629043054e7eb0881e8185ce4e5f0ae2ea0b1847  stories/99-Tests/svelte/ReactRotateClippableApp/App.svelte
fb3a63883d06eaa157588ed7cd245ac0c8bc0f0e  stories/99-Tests/svelte/ReactSafariApp/App.svelte
8ddd89e2e8c07c39df31ae02d3b9a6cb24e8b299  stories/99-Tests/svelte/ReactScalableKeepRatioApp/App.svelte
06f7824dddbec5839ed7b6cae1ec55bba98d3655  stories/99-Tests/svelte/ReactStopDragApp/App.svelte
ccb817d6e5ce2b64c6b8e041bc93a26e94415681  stories/99-Tests/svelte/ReactTranslate50App/App.svelte
24800dbd96bcff6e280d91d56df0906fe8c6e123  stories/99-Tests/svelte/ReactTRSTargetApp/App.svelte
efc615ccce385243ac0519bf64b4c0496b2ff8ec  stories/99-Tests/svelte/ReactWillChangeApp/App.svelte
8cf41a6d744c6dfafd40e24d5bc26755de6876cd  stories/99-Tests/svelte/ReactZoomedCursorApp/App.svelte
ff8111303acdc33ff56053ca914625aafa868308  stories/99-Tests/svelte/ReactZoomedSnapApp/App.svelte
14d2be514735aefa80ba03cbf31ebdf240c11856  stories/99-Tests/svelte/ReactZoomedTargetApp/App.svelte
de32fa963a062f9458b4b098fea0d16200c365ec  stories/99-Tests/vue3/ReactAccuracyApp/App.vue
6c029649307e1f29992dc4bcf6d6b52b40801da4  stories/99-Tests/vue3/ReactAccurateElementGuideline2App/App.vue
5dc2bcab28170f29d1d4fa8ee64a06012db89a15  stories/99-Tests/vue3/ReactAccurateElementGuidelineApp/App.vue
e56bffa0a141e5ffa4604a142394b0549c8d0973  stories/99-Tests/vue3/ReactATagApp/App.vue
ce75e74a99be71559ae24ee12637a4c7f5257e77  stories/99-Tests/vue3/ReactChangeTargetsOnClickApp/App.vue
0359da3535242460923dccd0fe183cbdbb010f2e  stories/99-Tests/vue3/ReactChangingSnapContainerApp/App.vue
d5841505e22bc99a1ba579da87000f57747c7090  stories/99-Tests/vue3/ReactClickApp/App.vue
fc1c0b15d5b82f3b18b61bde91744329541d21be  stories/99-Tests/vue3/ReactCustomElementApp/App.vue
d979d91eba165259169cce81cd003c64817628db  stories/99-Tests/vue3/ReactDragAPIApp/App.vue
83dc206cf5aa2b2e080123e671e186123f447b47  stories/99-Tests/vue3/ReactDragStartGroupApp/App.vue
cfa5946f3b72e9ec2ebd1aa27a52b8b751ab7c2a  stories/99-Tests/vue3/ReactDragTargetApp/App.vue
87f9c79073980cd6bc089da806690b598f0fd90b  stories/99-Tests/vue3/ReactFixedSnapApp/App.vue
5ac5f182b25533fd993e3c1940b69b5b5c363615  stories/99-Tests/vue3/ReactFlexApp/App.vue
30cc9ddaa941347fee3b2eea79c101e538aacd71  stories/99-Tests/vue3/ReactGroupDragAreaApp/App.vue
2764870f2f76476a8abf01e771ab5ea121c33b8e  stories/99-Tests/vue3/ReactGroupPaddingApp/App.vue
948ab95755e2fbf775ea5b86f343b6e54a891eb2  stories/99-Tests/vue3/ReactHandleLargeNumberApp/App.vue
cb12b3d19022915b3f30afbdefd5f506ea2c05db  stories/99-Tests/vue3/ReactInputApp/App.vue
cbd702f9995e63eb1541a9ff953abe1e8282ec64  stories/99-Tests/vue3/ReactLargeZoomElementGuidelinesApp/App.vue
995fa37f36e55ee74719f5626ba3043a1817418c  stories/99-Tests/vue3/ReactNestedSVGApp/App.vue
babd50c0dd0aac549004a7792b28ca85392d85a0  stories/99-Tests/vue3/ReactNestedTargetApp/App.vue
5a521382cdc08b1f643ba4cab2935633f691ae73  stories/99-Tests/vue3/ReactNoTargetApp/App.vue
8daf61443b103bde9e5f08e0dc2fd99c277ab370  stories/99-Tests/vue3/ReactOverflowApp/App.vue
7c27c6c86783d18fbf87b3bfc234ee35dab7f188  stories/99-Tests/vue3/ReactRequestBoundsApp/App.vue
d509ee33039e5335d480de7c376b472827c4a1b6  stories/99-Tests/vue3/ReactRotateClippableApp/App.vue
21433f98f094fac17ae32be6a390bac5909b9a46  stories/99-Tests/vue3/ReactSafariApp/App.vue
a35d6f4b0c76b671d7a999a4d11476cd87ba7c5b  stories/99-Tests/vue3/ReactScalableKeepRatioApp/App.vue
6326682235c26d327a0ea35b385b6a60ccc1cff4  stories/99-Tests/vue3/ReactStopDragApp/App.vue
d857384b37ba143e7eb6fc0b7bf536afb2ea669e  stories/99-Tests/vue3/ReactTranslate50App/App.vue
b494fb672383d4124bcd444f1cb71e935b5f6333  stories/99-Tests/vue3/ReactTRSTargetApp/App.vue
ad6c1e6e8d2c747c22aba63c2915426afb55c367  stories/99-Tests/vue3/ReactWillChangeApp/App.vue
a89b32d4ce4ebc517e2ebb24405a5ec2b6a19e1d  stories/99-Tests/vue3/ReactZoomedCursorApp/App.vue
81dbd4f3075f46d668b9812d1b344200200fd046  stories/99-Tests/vue3/ReactZoomedSnapApp/App.vue
7635dc46eee6c33190c851aa10c4c3a20946f764  stories/99-Tests/vue3/ReactZoomedTargetApp/App.vue
93411a51ca7733a8aa0923575516dc45c31195de  stories/9A-Components/lit/ReactInfiniteViewerApp/App.ts
d8cc94fc109cc374175ac43e50d23eaa22af9be8  stories/9A-Components/lit/ReactSelectoApp/App.ts
87d828ddaf954d61d55eda2b9289bc075020f616  stories/9A-Components/lit/ReactSelectoMultipleGroupUngroupApp/App.ts
513cb17182d58c6408aeacc3b4bcf9e79f9571f3  stories/9A-Components/lit/ReactSelectoNestedGroupApp/App.ts
26e4f4bd02db37522ea1e692df2449f0a14cb889  stories/9A-Components/script/ReactInfiniteViewerApp/App.html
8589897bff234373d572a128751555d8843341a6  stories/9A-Components/script/ReactInfiniteViewerApp/App.js
74615c025625dab6cc4f693ef5319f239fc8da70  stories/9A-Components/script/ReactSelectoApp/App.html
e01b7a4d58a54b5b2b8d15560f2193e929fb8f69  stories/9A-Components/script/ReactSelectoApp/App.js
24a70fcdbb6235538a4431a938bef1ed42a2badb  stories/9A-Components/script/ReactSelectoMultipleGroupUngroupApp/App.html
ec025af25f9f934d2bbc68a80013a52533e79900  stories/9A-Components/script/ReactSelectoMultipleGroupUngroupApp/App.js
0a7ed960dd885b3493fe6d72e294a85e55bcaada  stories/9A-Components/script/ReactSelectoNestedGroupApp/App.html
928bc780523aca37bea686814a147e70bf7b1d91  stories/9A-Components/script/ReactSelectoNestedGroupApp/App.js
9dfcb1bc8653f1181949e3cb2b88afb25787e532  stories/9A-Components/svelte/ReactInfiniteViewerApp/App.svelte
7d45510a1ff36705ba721f33439ff159b2daca7f  stories/9A-Components/svelte/ReactSelectoApp/App.svelte
b4fc5994e2039be26414357b7348946cf6e6cb44  stories/9A-Components/svelte/ReactSelectoMultipleGroupApp/App.svelte
bf355e3298dfb47b1706ba8df53bf4406d4e109d  stories/9A-Components/svelte/ReactSelectoMultipleGroupUngroupApp/App.svelte
134461e9a8c4af394687c6eaa8fbbf8d485dff60  stories/9A-Components/svelte/ReactSelectoNestedGroupApp/App.svelte
478f1a7d09ff1163113056f090b22c17eb012ba2  stories/9A-Components/vue3/ReactInfiniteViewerApp/App.vue
964c731b6984a7f01b124c432d26314d48932c0f  stories/9A-Components/vue3/ReactSelectoApp/App.vue
d2ca671594e91a4476dd9905eb01e83dbf3bc7fd  stories/9A-Components/vue3/ReactSelectoMultipleGroupApp/App.vue
b1c754cdc9091f4ea426911c5979de103a8d88d8  stories/9A-Components/vue3/ReactSelectoMultipleGroupUngroupApp/App.vue
4d7707ceae055580e8ecc4ef59023a0886e75ac4  stories/9A-Components/vue3/ReactSelectoNestedGroupApp/App.vue
```

## 1.4 worktree 对照产物

在 scratchpad 中 `git worktree add --detach` 检出 `a2828437`，`pnpm install --frozen-lockfile` 后执行 `pnpm packages:build`。对照产物的文件清单与体积和 1.1 完全一致，并且 127 个文件逐字节一致（`cmp`）。

## 附录：137 个 story 的有效 args

```json
{"id":"basic--basic-draggable","args":{"draggable":true,"throttleDrag":1,"edgeDraggable":false,"throttleDragRotate":0,"startDragRotate":0}}
{"id":"basic--basic-resizable","args":{"resizable":true,"edge":[],"maxWidth":"auto","maxHeight":"auto","minWidth":"auto","minHeight":"auto","keepRatio":false,"throttleResize":1,"renderDirections":["nw","n","ne","w","e","sw","s","se"]}}
{"id":"basic--basic-scalable","args":{"scalable":true,"keepRatio":false,"throttleScale":0,"renderDirections":["nw","n","ne","w","e","sw","s","se"]}}
{"id":"basic--basic-scalable-keep-ratio-test","args":{"scalable":true,"keepRatio":false,"throttleScale":0,"renderDirections":["nw","n","ne","w","e","sw","s","se"],"args":{"keepRatio":true}}}
{"id":"basic--baisc-rotatable","args":{"rotatable":true,"throttleRotate":0,"rotationPosition":"top"}}
{"id":"basic--basic-warpable","args":{"warpable":true,"renderDirections":["nw","n","ne","w","e","sw","s","se"]}}
{"id":"basic--basic-clippable","args":{"draggable":true,"throttleDrag":1,"edgeDraggable":false,"throttleDragRotate":0,"startDragRotate":0,"clippable":true,"clipRelative":false,"clipArea":false,"dragWithClip":0,"defaultClipPath":"inset","clipTargetBounds":false,"keepRatio":false}}
{"id":"basic--basic-roundable","args":{}}
{"id":"basic--basic-origin-draggable","args":{}}
{"id":"basic--basic-pinchable","args":{}}
{"id":"able-combination--combination-draggable-resizable-rotatble","args":{"draggable":true,"throttleDrag":1,"edgeDraggable":false,"throttleDragRotate":0,"startDragRotate":0,"resizable":true,"edge":[],"maxWidth":"auto","maxHeight":"auto","minWidth":"auto","minHeight":"auto","keepRatio":false,"throttleResize":1,"renderDirections":["nw","n","ne","w","e","sw","s","se"],"rotatable":true,"throttleRotate":0,"rotationPosition":"top"}}
{"id":"able-combination--combination-draggable-scalable-rotatable","args":{"draggable":true,"throttleDrag":1,"edgeDraggable":false,"throttleDragRotate":0,"startDragRotate":0,"scalable":true,"keepRatio":false,"throttleScale":0,"renderDirections":["nw","n","ne","w","e","sw","s","se"],"rotatable":true,"throttleRotate":0,"rotationPosition":"top"}}
{"id":"able-combination--combination-draggable-origin-rotatable","args":{"originDraggable":true,"originRelative":true,"draggable":true,"throttleDrag":1,"edgeDraggable":false,"throttleDragRotate":0,"startDragRotate":0,"rotatable":true,"throttleRotate":0,"rotationPosition":"top"}}
{"id":"able-combination--combination-all-in-one","args":{"originDraggable":true,"originRelative":true,"draggable":true,"throttleDrag":1,"edgeDraggable":false,"throttleDragRotate":0,"startDragRotate":0,"scalable":true,"keepRatio":false,"throttleScale":0,"renderDirections":["nw","n","ne","w","e","sw","s","se"],"rotatable":true,"throttleRotate":0,"rotationPosition":"top"}}
{"id":"group--group-draggable-resizable-rotatable","args":{"hideChildMoveableDefaultLines":false,"resizable":true,"edge":[],"maxWidth":0,"maxHeight":0,"minWidth":0,"minHeight":0,"keepRatio":true,"throttleResize":1,"renderDirections":["nw","n","ne","w","e","sw","s","se"],"rotatable":true,"throttleRotate":0,"rotationPosition":"top","draggable":true,"throttleDrag":1,"edgeDraggable":false,"throttleDragRotate":0,"startDragRotate":0}}
{"id":"group--group-draggable-scalable-rotatable","args":{"hideChildMoveableDefaultLines":false,"scalable":true,"keepRatio":true,"throttleScale":0,"renderDirections":["nw","n","ne","w","e","sw","s","se"],"rotatable":true,"throttleRotate":0,"rotationPosition":"top","draggable":true,"throttleDrag":1,"edgeDraggable":false,"throttleDragRotate":0,"startDragRotate":0}}
{"id":"group--group-all-in-one","args":{"hideChildMoveableDefaultLines":false,"draggable":true,"throttleDrag":1,"edgeDraggable":false,"throttleDragRotate":0,"startDragRotate":0,"scalable":true,"keepRatio":false,"throttleScale":0,"renderDirections":["nw","n","ne","w","e","sw","s","se"],"rotatable":true,"throttleRotate":0,"rotationPosition":"top"}}
{"id":"group--group-multiple-group","args":{}}
{"id":"group--group-roundable-group","args":{}}
{"id":"group--group-fixed-resize-group","args":{}}
{"id":"individual-group--individual-group-draggable-scalable-rotatable","args":{"scalable":true,"keepRatio":false,"throttleScale":0,"renderDirections":["nw","n","ne","w","e","sw","s","se"],"rotatable":true,"throttleRotate":0,"rotationPosition":"top","draggable":true,"throttleDrag":1,"edgeDraggable":false,"throttleDragRotate":0,"startDragRotate":0}}
{"id":"individual-group--individual-group-groupable-props","args":{}}
{"id":"options--options-resize-observer","args":{}}
{"id":"options--options-resize-observer-group","args":{}}
{"id":"options--options-resize-observer-individual-group","args":{}}
{"id":"options--options-mutation-observer","args":{}}
{"id":"options--options-padding","args":{}}
{"id":"options--options-line-padding","args":{"linePadding":10}}
{"id":"options--options-control-padding","args":{"controlPadding":20}}
{"id":"options--options-check-input","args":{}}
{"id":"options--options-drag-focused-input","args":{}}
{"id":"options--options-view-container","args":{}}
{"id":"options--options-persist-data","args":{}}
{"id":"options--options-persist-data-group","args":{}}
{"id":"options--options-persist-data-individual-group","args":{}}
{"id":"options--options-root-container","args":{}}
{"id":"options--options-root-container-zoom","args":{}}
{"id":"options--options-zoom","args":{}}
{"id":"options--options-accurate-position","args":{}}
{"id":"options--options-drag-target","args":{}}
{"id":"options--options-drag-target-self","args":{}}
{"id":"svg--svg-path-element","args":{}}
{"id":"svg--svgsvg-element","args":{}}
{"id":"svg--svg-circle","args":{}}
{"id":"svg--svg-line","args":{}}
{"id":"svg--svgg","args":{}}
{"id":"svg--svg-target-g","args":{}}
{"id":"svg--svg-group","args":{}}
{"id":"svg--svg-origin","args":{}}
{"id":"svg--svg-fillbox-origin","args":{}}
{"id":"svg--svg-foreign-object","args":{}}
{"id":"svg--svg-foreign-object-inner","args":{}}
{"id":"snap-bound--snap-guidelines","args":{"snappable":true,"snapDirections":{"top":true,"left":true,"bottom":true,"right":true},"snapHorizontalThreshold":5,"snapVerticalThreshold":5,"verticalGuidelines":[50,150,250,450,550],"horizontalGuidelines":[0,100,200,400,500],"draggable":true,"throttleDrag":1,"edgeDraggable":false,"throttleDragRotate":0,"startDragRotate":0,"scalable":true,"keepRatio":false,"throttleScale":0,"renderDirections":["nw","n","ne","w","e","sw","s","se"]}}
{"id":"snap-bound--snap-elements","args":{"snappable":true,"snapDirections":{"top":true,"left":true,"bottom":true,"right":true,"center":true,"middle":true},"snapHorizontalThreshold":5,"snapVerticalThreshold":5,"elementSnapDirections":{"top":true,"left":true,"bottom":true,"right":true,"center":true,"middle":true},"snapGap":true,"isDisplaySnapDigit":true,"isDisplayInnerSnapDigit":false,"snapDigit":0,"maxSnapElementGuidelineDistance":null}}
{"id":"snap-bound--snap-grid","args":{"draggable":true,"throttleDrag":1,"edgeDraggable":false,"throttleDragRotate":0,"startDragRotate":0,"scalable":true,"keepRatio":false,"throttleScale":0,"renderDirections":["nw","n","ne","w","e","sw","s","se"],"snappable":true,"isDisplayGridGuidelines":false,"snapGridWidth":10,"snapGridHeight":10}}
{"id":"snap-bound--snap-grid-group","args":{"draggable":true,"throttleDrag":1,"edgeDraggable":false,"throttleDragRotate":0,"startDragRotate":0,"resizable":true,"edge":[],"maxWidth":"auto","maxHeight":"auto","minWidth":"auto","minHeight":"auto","keepRatio":false,"throttleResize":1,"renderDirections":["nw","n","ne","w","e","sw","s","se"]}}
{"id":"snap-bound--snap-bound-drag-scale","args":{"draggable":true,"throttleDrag":1,"edgeDraggable":false,"throttleDragRotate":0,"startDragRotate":0,"scalable":true,"keepRatio":false,"throttleScale":0,"renderDirections":["nw","n","ne","w","e","sw","s","se"],"snappable":true,"bounds":{"left":0,"top":0,"right":0,"bottom":0,"position":"css"}}}
{"id":"snap-bound--snap-bound-drag-resize","args":{"draggable":true,"throttleDrag":1,"edgeDraggable":false,"throttleDragRotate":0,"startDragRotate":0,"resizable":true,"edge":[],"maxWidth":"auto","maxHeight":"auto","minWidth":"auto","minHeight":"auto","keepRatio":false,"throttleResize":1,"renderDirections":["nw","n","ne","w","e","sw","s","se"],"snappable":true,"bounds":{"left":0,"top":0,"right":0,"bottom":0,"position":"css"}}}
{"id":"snap-bound--snap-drag-rotate","args":{"draggable":true,"throttleDrag":1,"edgeDraggable":false,"throttleDragRotate":0,"startDragRotate":0,"rotatable":true,"throttleRotate":0,"rotationPosition":"top","snappable":true,"bounds":{"left":0,"top":0,"right":0,"bottom":0,"position":"css"}}}
{"id":"snap-bound--snap-drag-rotate-group","args":{}}
{"id":"snap-bound--snap-snap-container","args":{"snappable":true,"snapDirections":{"top":true,"left":true,"bottom":true,"right":true},"snapHorizontalThreshold":5,"snapVerticalThreshold":5,"snapContainer":".snapContainer","verticalGuidelines":[50,150,250,450,550],"horizontalGuidelines":[0,100,200,400,500],"bounds":{"left":0,"top":0,"right":0,"bottom":0,"position":"css"},"draggable":true,"throttleDrag":1,"edgeDraggable":false,"throttleDragRotate":0,"startDragRotate":0}}
{"id":"snap-bound--snap-inner-bound-resize","args":{"snappable":true,"innerBounds":{"left":0,"top":0,"width":100,"height":100}}}
{"id":"snap-bound--snap-maxium-distance","args":{"maxSnapElementGuidelineDistance":100,"maxSnapElementGapDistance":80}}
{"id":"snap-bound--snap-elements-group","args":{}}
{"id":"snap-bound--snap-rotations","args":{}}
{"id":"advanced-moveable-settings--adanced-moveable-position-fixed","args":{}}
{"id":"advanced-moveable-settings--adanced-moveable-select-form","args":{}}
{"id":"advanced-moveable-settings--adanced-moveable-no-relative","args":{}}
{"id":"advanced-draggable--advanced-draggable-edge-draggable","args":{}}
{"id":"advacned-resizable--advanced-resizable-fixed-direction","args":{}}
{"id":"advacned-resizable--advanced-resizable-flex","args":{}}
{"id":"advacned-resizable--advanced-resizable-group-min-size","args":{}}
{"id":"advacned-resizable--advanced-resizable-edge-control","args":{}}
{"id":"advacned-scalable--advanced-scalable-min-max","args":{}}
{"id":"advanced-rotatable--advanced-rotatable-custom-origin","args":{}}
{"id":"advanced-rotatable--advanced-rotatable-rotate-with-controls","args":{}}
{"id":"advanced-rotatable--advanced-rotatable-rotate-with-resize","args":{}}
{"id":"advanced-rotatable--advanced-set-rotation","args":{}}
{"id":"advanced-snappable--advanced-snappable-custom-guidelines","args":{}}
{"id":"advanced-snappable--advanced-snappable-custom-element-guidelines","args":{}}
{"id":"adavanced-clippable--advanced-clippable","args":{}}
{"id":"adavanced-clippable--advanced-clippable-clipped-area","args":{}}
{"id":"adavanced-clippable--advanced-clippable-clip-snap","args":{}}
{"id":"adavanced-clippable--advanced-clippable-resizable-keep-ratio","args":{}}
{"id":"make-custom-able--custom-able-dimension-viewable","args":{}}
{"id":"make-custom-able--custom-able-editable","args":{}}
{"id":"make-custom-able--custom-able-rotatble","args":{}}
{"id":"make-custom-able--custom-able-mouse-enter-leave","args":{}}
{"id":"make-custom-able--custom-able-drag-target","args":{}}
{"id":"request-ables-through-a-method--request-draggable","args":{"containerScale":1,"draggable":true,"throttleDrag":1,"edgeDraggable":false,"throttleDragRotate":0,"startDragRotate":0}}
{"id":"request-ables-through-a-method--request-resizable","args":{"resizable":true,"edge":[],"maxWidth":"auto","maxHeight":"auto","minWidth":"auto","minHeight":"auto","keepRatio":false,"throttleResize":1,"renderDirections":["nw","n","ne","w","e","sw","s","se"]}}
{"id":"request-ables-through-a-method--request-resizable-delta","args":{"resizable":true,"edge":[],"maxWidth":"auto","maxHeight":"auto","minWidth":"auto","minHeight":"auto","keepRatio":false,"throttleResize":1,"renderDirections":["nw","n","ne","w","e","sw","s","se"]}}
{"id":"request-ables-through-a-method--request-resizable-group","args":{"resizable":true,"edge":[],"maxWidth":"auto","maxHeight":"auto","minWidth":"auto","minHeight":"auto","keepRatio":false,"throttleResize":1,"renderDirections":["nw","n","ne","w","e","sw","s","se"]}}
{"id":"request-ables-through-a-method--request-draggable-snappable","args":{}}
{"id":"request-ables-through-a-method--request-resizable-snappable","args":{}}
{"id":"request-ables-through-a-method--request-draggable-align","args":{}}
{"id":"support-tree-shaking--tree-shaking","args":{}}
{"id":"support-scroll--scrolling-scrollable","args":{"threshold":30,"throttleTime":0,"checkScrollEvent":false}}
{"id":"variable-situations--tests-no-target","args":{}}
{"id":"variable-situations--tests-click-a-tag","args":{}}
{"id":"variable-situations--tests-input","args":{}}
{"id":"variable-situations--tests-safari","args":{}}
{"id":"variable-situations--tests-custom-element","args":{}}
{"id":"variable-situations--tests-custom-element-bounds","args":{}}
{"id":"variable-situations--tests-accuracy","args":{}}
{"id":"variable-situations--tests-large-zoom","args":{}}
{"id":"variable-situations--tests-flex","args":{}}
{"id":"variable-situations--tests-will-change","args":{}}
{"id":"variable-situations--tests-stop-drag","args":{}}
{"id":"variable-situations--tests-click","args":{}}
{"id":"variable-situations--tests-nested-target","args":{}}
{"id":"variable-situations--tests-zoomed-cursor","args":{}}
{"id":"variable-situations--tests-handle-large-number","args":{}}
{"id":"variable-situations--tests-overflow","args":{}}
{"id":"variable-situations--tests-dragtarget","args":{}}
{"id":"variable-situations--tests-drag-start","args":{}}
{"id":"variable-situations--tests-changing-snap-container","args":{}}
{"id":"variable-situations--tests-fixed-snap","args":{}}
{"id":"variable-situations--tests-zoomed-target","args":{}}
{"id":"variable-situations--tests-trs-target","args":{}}
{"id":"variable-situations--tests-zoomed-snap","args":{}}
{"id":"variable-situations--tests-request-bounds","args":{}}
{"id":"variable-situations--tests-rotate-clippable","args":{}}
{"id":"variable-situations--tests-accurate-element-guidelines","args":{}}
{"id":"variable-situations--tests-accurate-element-guidelines-2","args":{}}
{"id":"variable-situations--test-drag-api","args":{}}
{"id":"variable-situations--test-change-targets-on-click","args":{}}
{"id":"variable-situations--test-scalable-keep-ratio","args":{}}
{"id":"variable-situations--test-iframe","args":{}}
{"id":"variable-situations--test-group-padding","args":{}}
{"id":"variable-situations--test-translate-50","args":{}}
{"id":"variable-situations--test-nested-svg","args":{}}
{"id":"combination-with-other-components--components-selecto","args":{}}
{"id":"combination-with-other-components--components-selecto-with-multiple-group","args":{}}
{"id":"combination-with-other-components--components-selecto-with-group-ungroup","args":{}}
{"id":"combination-with-other-components--components-selecto-with-nested-group","args":{}}
{"id":"combination-with-other-components--components-infinite-viewer","args":{}}
```

## 2. TypeScript 按包声明后的比较

### 2.1 依赖解析

删除全局 override，react-moveable、helper 声明 `~5.9.3` 后，锁文件中的 typescript 版本：

| 版本 | 使用者 |
|---|---|
| 5.9.3 | react-moveable、helper |
| 4.8.4 | 根目录、croact、preact、moveable、lit、vue3、svelte，以及它们的工具链 |
| 4.5.5 | croffle（`dependencies` 中声明 `^4.5.0 <4.6.0`） |
| 5.0.4 | `@microsoft/api-extractor@7.36.0`（vue3-moveable → vite-plugin-dts 3.0.0-beta.3 → api-extractor，在 `dependencies` 中精确声明 `5.0.4`） |

5.0.4 原先被全局 override 压成 4.8.4。vue3 的 `dts()` 没有开 `rollupTypes`，不会走 api-extractor；vue3 产物的比较结果见 2.3。

### 2.2 bake

`croffle.config.js` 改为从 croffle 所在目录解析 typescript（实测 4.5.5，与 croffle 同一实例）。bake 成功，136 个 App 全部转译；生成文件 659 个，清单和内容哈希与 1.3 **完全一致**。

### 2.3 构建产物

`pnpm packages:build` 成功，文件清单与 1.1 一致（127 个）。rollup「Unresolved dependencies」警告与基线完全相同（helper、react-moveable、lit-moveable 各 2 处，模块清单不变），UMD 构建没有此警告。

与 1.4 对照产物逐字节比较，svelte-moveable 全部一致，其余有差异的文件和原因：

1. **换行符**：TS 5.0 起 `newLine` 默认值从按平台改为 LF。TS 4.8 下 rollup-plugin-typescript2 的输出中部分行是 CRLF，TS 5.9 下全部是 LF。这是 react-moveable、helper 以及下游 JS 产物体积变化（约 14KB）的主要来源，`diff -w -B` 下消失。
2. **隐式构造函数的 down-level 写法**：`diff -w -B` 后唯一的代码差异，react-moveable 4 处、helper 1 处：
   ```
   < var _this = _super !== null && _super.apply(this, arguments) || this;
   > var _this = _super.apply(this, __spreadArray([], __read(arguments), false)) || this;
   ```
   这几个类都继承自确定存在的父类，`arguments` 被复制成数组后再传入，语义等价。`__spreadArray`、`__read` 在这些产物里本来就有。
3. **下游包继承 react-moveable 的变化**：croact-moveable、preact-moveable（cjs/esm）、moveable（umd/min）、lit-moveable（umd）在构建时内联了 react-moveable 的产物，所以带有和第 1、2 条完全相同的差异（`diff -w -B` 后同样只有那 4 处构造函数），这些包自己的 TS 版本并没有变化。`.min.js` 的差异是同一处变化压缩后的结果。
4. **声明文件**（react-moveable 10 个、helper 1 个）：都是 TS 5 声明输出风格的变化，类型含义不变：
   - `export declare type` → `export type`；
   - 省略与默认值相同的泛型参数：`MoveableManagerInterface<{}, {}>` → `MoveableManagerInterface`；
   - 对象字面量中的方法以方法签名输出，而不是展开成属性（`ables/consts.d.ts` 因此增大约 5KB）；
   - 可选属性不再附加 `| undefined`，联合类型成员的顺序变化，删除多余的 `/// <reference types="react" />`。
   使用 TS 4.8 的下游包（moveable、lit、vue3、svelte）都基于这些声明构建成功。
5. **vue3-moveable 的 `dist/Moveable.vue.d.ts`**：体积相同，只是成员顺序变化（排序后完全一致）。它展开的是 `moveable` 的事件类型，而这些类型来自 react-moveable 的声明，属于第 4 条的连带变化，不是 api-extractor 的 TS 5.0.4 引起的。

### 2.4 类型检查、lint 与 Storybook 6

- react-moveable `test:type`：通过。
- react-moveable `lint`、helper `lint`：通过，没有 typescript-eslint 的版本警告，只有 eslint-plugin-react 原有的「React version not specified」提示。
- Storybook 6 `test:build`（尽力验证）：失败，`fork-ts-checker-webpack-plugin@6.5.2` 的 `connectTypeScriptPerformance` 会给 `ts.performance.mark` 赋值，而 TS 5 中它是只读的 getter（`TypeError: Cannot set property mark of #<Object> which has only a getter`）。这属于 design 风险条目中允许的情况，记录后放行；Storybook 6 会在第 3 组整体替换。

## 3. 骨架实测

- `pnpm why @storybook/react`：只有 10.6.1。锁文件中还剩 test-runner、addon-coverage 带进来的 `@storybook/*@6.5.16` 内部包，6.1 删除这两个依赖后消失。
- `pnpm peers check` 新增两条提示，都来自删除全局 TS override：svelte-moveable 的 `svelte2tsx@0.6.16` 期望 `typescript ^4.9.4 || ^5`（实际 4.8.4，原先被 override 改写了 peer 范围所以不提示；svelte 产物与基线逐字节一致）；react-moveable 的 `karma-typescript@4.1.1` 来自 `@daybrush/tester`，5.2 删除。
- 6006 端口被一个已存在的 `start-storybook --ci` 进程（SB6）占用，骨架验证改用 6016 端口；`storybook dev` 脚本本身仍是 `-p 6006`。
- `@withMethods`：oxc 输出使用旧版装饰器辅助函数 `_decorate`，`moveable!` 没有被输出为类字段；浏览器中 `getRect`、`updateRect`、`request`、`getManager`、`dragStart` 都是函数，`getRect()` 返回 `[200, 150, 100, 100]`；真实鼠标拖动 (+50, +40) 后 `transform` 从 `translate(100px, 0px)`（dev 模式 play 执行后的状态）变为 `translate(150px, 40px)`，没有控制台错误。
- `import.meta.env.MODE`：`storybook dev` 为 `development`，`storybook build` 为 `production`（静态产物中打开 Basic / Draggable，目标保持初始状态），Vitest 为 `test`。
- 视口：故意失败的断言打印出 `1280x720`；失败截图写入根目录 `.vitest/attachments/failure-screenshots/0-Basic.stories.tsx/Draggable.png`。

## 4. story 改写后的比较

- story 索引：137 个 story，id、显示名、export 名、是否带 play 与 1.2 完全一致。
- 有效 args：136 个与 1.2 完全一致；`basic--basic-scalable-keep-ratio-test` 按 design 有意改为真正应用 `{ keepRatio: true }`。
- play 断言：26 个 play、62 条 `expect` 与 1.2 逐条一致（只是外层包了 `devPlay`，`expect` 改从 `storybook/test` 引入）。
- 代码 tab：131 个 story 有 React、CSS、Script（HTML + JavaScript）、Vue3、Svelte、Lit；2 个用到 keycon 的 story（`advanced-rotatable--advanced-rotatable-rotate-with-controls`、`combination-with-other-components--components-selecto-with-multiple-group`）没有 Script 和 Lit；4 个只有 React 和 CSS（`make-custom-able--custom-able-drag-target`、`support-tree-shaking--tree-shaking`、`variable-situations--tests-custom-element-bounds`、`variable-situations--test-iframe`），与 croffle 的生成规则一致。变化：4-SVG 的 11 个 story 原来通过 `text` 传源码，只显示 React 和 CSS，现在与其它 story 一样显示 croffle 生成的各框架代码。
- 代码 tab 面板（Playwright 在 manager 中实际操作）：Basic / Draggable 的面板有 React、CSS、Script、Vue3、Svelte、Lit 六个 tab；在 Controls 中关闭 `draggable`、把 `throttleDrag` 改为 10 后，React（`draggable={false}`、`throttleDrag={10}`）、Script / Vue3（`draggable = false`、`throttleDrag = 10`）、Svelte、Lit（`draggable: any = false`、`throttleDrag: any = 10`）都同步更新；React tab 的复制按钮复制出的代码也是新值；没有页面错误。`render.ts` 的 5 个单元测试通过。
- Introduction 文档页：README 正常渲染（标题、1 个表格、36 张图片），`preview-head.html` 的样式在 `#storybook-docs` 下生效（表格 `border-collapse: collapse`、单元格上边框 `solid`）；生成的 `stories/0-Introduction/readme.mdx` 被 git 忽略。组件文档页（Basic）显示标题、story 名「Draggable」、主 story 和 5 行 Controls。
- 统计请求：在开发模式中打开 Introduction 和 Basic / Draggable，所有外部请求的域名只有 README 中图片所在的 `raw.githubusercontent.com`、`img.shields.io`、`opencollective.com`、`images.opencollective.com`、`contrib.rocks`、`daybrush.com`，没有任何统计、分析或遥测请求。
- 发布构建（4.5）：删除全部 76 个生成目录后在根目录执行 `pnpm build:storybook`，bake 重新生成 136 个 App 的代码，产物输出到 `demo/storybook`。静态产物中 Basic / Draggable 的代码面板有 React、CSS、Script、Vue3、Svelte、Lit，Vue3 tab 有生成的代码；打开后目标的 `transform` 为空、Interactions 没有计数，play 没有执行；侧边栏默认看不到 `Scalable keepRatio Test`，在标签筛选中把 `hidden-test` 切换为显示后出现，并能正常渲染。

## 5.1 全量 Vitest

在根目录执行 `pnpm exec vitest run`：22 个测试文件中 21 个通过、1 个跳过（`stories/0-Introduction/readme.mdx`，纯文档页，没有 story），142 个测试全部通过 = react-moveable 的 137 个 story（其中 26 个执行 play，断言与 1.2 一致）+ code-preview 的 5 个单元测试。

迁移中暴露并修复的两个问题（都是迁移造成的，不是原有问题，不需要登记例外）：

1. `Group / Multiple Group` 断言页面坐标，在 Vitest 中 `left` 为 117.4（期望 133.4），整体差 16px：addon-vitest 渲染时不会给 `<body>` 加 Storybook 预览页的布局 class `sb-show-main sb-main-padded`（`padding: 1rem`）。新增 `.storybook/vitest.setup.ts` 补上这两个 class，期望值不变。
2. 同一个 play 中 `userEvent.click(...)` 没有 `await`：`storybook/test` 的 user-event 14 是异步的，原来的 `@storybook/testing-library` 0.0.13 是同步的。改为 `await userEvent.click(...)`，期望值不变。

stderr 中只有警告，没有渲染错误：React 16 下 Storybook 渲染器使用 `act(...)` 产生的「Do not await the result of calling act(...) with sync logic」（117 次）和「The callback passed to act(...) function must return undefined」（17 次）；以及 App 自身已有的 `stroke-width` / `stroke-linejoin` 属性名、列表缺少 `key` 的警告各 1 次。

## 5.2 / 6.1

- helper：jest 24 / ts-jest / `@daybrush/tester` 换成 Vitest 5.0.3 + happy-dom 20（近 6 个月 happy-dom 发布了 37 个正式版，jsdom 7 个），`@types/node` 升到 22（vitest 5 的 peer 要求）。根目录 `pnpm exec vitest run`：144 个测试全部通过（react-moveable 137 个 story + 5 个 code-preview 单元测试 + helper 2 个）。
- 删除的依赖：react-moveable 的 webpack、babel-loader、ts-loader、raw-loader、css-loader、fork-ts-checker-webpack-plugin、`@storybook/test-runner`、http-server、concurrently、wait-on、jest、jest-image-snapshot、`@storybook/addon-coverage`、`@daybrush/tester`、devDependencies 中重复的 react-selecto（`dependencies` 中的 `^1.25.0` 保留）；helper 的 babel-loader、raw-loader、css-loader。锁文件中不再有 webpack 4、`@storybook/*@6`、test-runner、jest。`allowBuilds` 中删除已不在锁文件里的 `core-js-pure`。`pnpm peers check` 中 karma-typescript 的提示随 `@daybrush/tester` 消失。
- story 依赖升级：keycon 1.0 → 1.4.0、react-keycon 0.1.2 → 0.3.0、react-infinite-viewer 0.19 → 0.28.1、@scena/react-guides 0.17 → 0.28.2，都没有用到 React 17/18 才有的 API，相关 story 全部通过。react-keycon 0.3.0 会装出两份 `@cfcs/core`（0.0.6 和 0.0.26），导致 `useKeycon` 返回类型退化、2 个 story 类型检查失败；经确认加了限定范围的 override `"@cfcs/react>@cfcs/core": "0.0.6"` 让两者共用一份。

## 6.4 最终验证

把将要提交的全部文件（`git ls-files -co --exclude-standard`，即已跟踪的文件加上未被忽略的新文件）复制到 scratchpad 中一个没有 `node_modules` 和生成目录的空目录，依次执行：

- `pnpm install --frozen-lockfile`：成功。
- `pnpm packages:build`：成功；127 个产物文件与 2.3（TS 按包声明后）的构建逐字节一致；rollup「Unresolved dependencies」警告仍是登记的 6 处。
- `pnpm --filter react-moveable exec playwright install chromium`、`pnpm --filter react-moveable typecheck:stories`：成功。
- `pnpm exec vitest run`：22 个测试文件通过、1 个跳过（readme.mdx），144 个测试全部通过。
- `pnpm build:storybook`：bake 136 个 App 后构建成功，输出 `demo/storybook/index.html`。
- 26 个 play 的 62 条 `expect` 与 1.2 逐条一致；`openspec validate upgrade-storybook-10-vitest --strict` 通过。

## 6.2 CI

- `b9da5c03`（本 change 的实现）推送后 CI 通过（run 38145127409）：stories 类型检查、bake 136 个 App、22 个测试文件通过、1 个跳过（readme.mdx）。
- 故意让 story 断言失败（Basic / Draggable 期望改为 `translate(999px, 0px)`，run 38145290167）：「Run tests」失败，上传的「failure screenshots」产物中有 `0-Basic.stories.tsx/Draggable.png`（1280×720）。
- 故意让 helper 单元测试失败（run 38145456772）：「Run tests」失败，日志中有 `FAIL helper test/unit/GroupManager.spec.ts > test GroupManager > test groups [[0, 1], 2], 3 > selectCompletedChilds 2 => [0, 1]`，统计为 1 failed / 143 passed。
- 故意在 Basic 的 story 文件中加一个不影响渲染的类型错误（未导出的常量；本地确认 Basic 的 10 个 story 仍全部通过，run 38145645569）：「Type-check stories」失败，日志中有 `stories/1-Basic/0-Basic.stories.tsx(39,7): error TS2322`。第一次写成了 `export`，Storybook 会把它当成 story 导致渲染失败，不能证明「能渲染但类型错误」，所以又补了一个提交改为不导出。
- 以上临时提交都已 revert，代码与 `b9da5c03` 一致。
