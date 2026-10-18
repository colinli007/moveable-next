# 基线与验证记录

scratchpad 中的脚本：
- `compare-outputs.cjs`：对比产物与快照。逐字节相同的记为相同；否则用 TypeScript 的 scanner 去掉注释和空白 token 后再比较；`.map` 和 `.svelte` 不做去注释比较。
- `extract-comments.cjs`：从源码提取迁移中必须保留的注释内容。

## 1.1 产物快照

`pnpm packages:build` 成功，8 个包的 `dist/` 和 `declaration/` 共 128 个文件复制到 scratchpad 的 `before/`。对比脚本对刚构建的产物判为全部相同（128 个逐字节相同）。

自检：
- 只把注释中的 `@memberof` 改为 `@category` 的文件，判为「去掉注释后相同」；
- 只删除注释并改动空白的声明文件，同样判为「去掉注释后相同」；
- 把代码中的字符串 `"draggable"` 改掉的文件，判为「不同」。

## 1.2 注释基线

从 react-moveable 和 moveable 的 `src` 中提取，存为 `before/comments.json`：

| 内容 | 数量 |
|---|---|
| `@example` 代码块 | 153 |
| 需要迁移的 `@name` 段（选项） | 70 |
| 需要迁移的 `@event` 段 | 58 |
| `@namespace` | 13 |
| 带不写字段名的 `@property` 的接口 | 38（共 99 行） |

`@name` 和 `@event` 段的数量与 design Context 不同（design 写的是 109 段读不到 + 13 段在文件末尾）：
- design 的统计用的是正则交替匹配，先命中的标签决定归类：45 段事件被归在 `@memberof` 下，文件末尾的 4 段 `@name` 被算作挂在文件结束符上。
- 另有 2 段 `@name` 挂在 able 的 `export default` 上：TypeDoc 会把它们读成 able 对象的说明，同样要迁移。
- 按「带 `@name` 或 `@event` 的段」统计，共 70 + 58 = 128 段。
- 70 段 `@name` 指向 70 个不同的选项，全部在 `MOVEABLE_PROPS` 中；58 段 `@event` 的事件名全部在 `MOVEABLE_EVENTS` 中。
- 所有这些段都有说明文字。

`@property` 行数和字段数不一致的接口只有 1 个：`OnResizeStart`，8 行、10 个字段。它的字段本身已经有注释（`startRatio`、`setMin` 等），4.1 中逐条对照。

迁移前 `pnpm doc`（jsdoc）生成 39 个页面，快照存在 `before/jsdoc/`：
- `index.html`、`global.html`、`Moveable.html`、`EventEmitter.html`；
- 每个 able 一页，共 12 页：`Moveable.Clippable`、`Draggable`、`Group`、`OriginDraggable`、`Pinchable`、`Resizable`、`Rotatable`、`Roundable`、`Scalable`、`Scrollable`、`Snappable`、`Warpable`；
- 23 个源码页面。

## 2.1 依赖

`pnpm install` 删除了 `@daybrush/jsdoc`、`daybrush-jsdoc-template`、根目录的 `@scena/event-emitter`，新增 `typedoc 0.28.20`；锁文件 +172 / −241 行，其中搜不到 `@daybrush/jsdoc`、`daybrush-jsdoc-template`、`jsdoc@`。安装没有新的警告，`pnpm lint` 通过。

## 2.2 TypeDoc 首次生成（注释迁移前）

`pnpm doc --treatWarningsAsErrors false` 成功：
- 生成 `doc/`，有 `classes/Moveable.html`，没有 `classes/default.html`；
- `typedoc.json` 中的注释可以被正常读取。

共 178 个警告，比 design Context 中试跑的 184 个少 6 个：`highlightLanguages` 在这一步已经加上 `jsx`（原计划在 4.5 加），代码块语言的 6 个警告消失。其余警告与试跑完全一致：

| 警告 | 数量 |
|---|---|
| 未知标签 `@memberof` | 134 |
| `@param` 名与签名不符 | 12 |
| 未知标签 `@story` | 11 |
| 未知标签 `@description` | 9 |
| 同一成员多个声明带注释（`refresh` 2、`element` 2、`className` 2、`ElementGuidelineValue` 1） | 7 |
| 未知标签 `@options` | 2 |
| 未知标签 `@exmaple` | 2 |
| 未知标签 `@depreacted` | 1 |

## 3.1 `MoveableProperties`

改为基于 `Pick` 的映射后：
- `pnpm --filter react-moveable test:type` 通过；
- scratchpad 中的断言（`check.ts`）通过：新旧写法双向可赋值，`keyof` 相同，两个类型用 `Equal` 判定相同；
- 反向自检：把断言中旧写法的 `?:` 改为 `:`，`tsc` 报 2 个 TS2322，说明断言能发现差异；
- 重新生成文档后，`classes/Moveable.html` 中 `draggable` 显示「Whether or not target can be dragged. Default false」，并注明继承自 `DraggableOptions.draggable`。警告数不变（178）。

## 4.1 `types.ts`

用脚本 `migrate-types.cjs` 做机械转换：
- 删除 136 个 `@typedef` 和 119 个 `@extends`；
- `@memberof Moveable.X` 改为 `@category X`；
- 删除转换后没有内容的注释块。

不写字段名的 `@property`（38 个接口、99 行）用 `positional.cjs` 按顺序和接口自己的成员配对：

| 结果 | 行数 | 处理 |
|---|---|---|
| 成员没有注释 | 91 | 拆为成员自己的注释 |
| 成员已有相同的注释 | 1 | 删除 `@property` |
| 成员已有不同的注释 | 7 | 都在 `OnResizeStart` 中，删除 `@property`，见下 |

`OnResizeStart`：8 行 `@property`、10 个成员。成员自己的注释比 `@property` 新：中间插入了 `startRatio`，后面的说明整体错开了一位；最后一行「Set the ratio of width and height.」对应的 `setRatio` 自己也有注释。迁移前的 jsdoc 页面（`before/jsdoc/Moveable.Resizable.html`）显示的就是成员自己的注释，所以删除这 8 行不会丢失文档中已有的内容。

分组：
- 转换后有 63 个导出没有分组，落在 TypeDoc 默认的「Other」中。
- 其中 27 个属于某个 able，用 `categorize.cjs` 补上 `@category`：14 个 `XxxEvents` / `XxxState`、`RotationPosition`、`SnappableRenderType`、9 个 `Snap*Info` 类型、`RenderGuidelineInnerInfo`、`BoundInfo`。
- `OnCustomDrag` 由 `gesto/CustomGesto.ts` 使用，属于程序化请求的公共机制，不归 Draggable。
- 其余由 `typedoc.json` 的 `defaultCategory: "Core"` 归入 Core。原来的 48 个 `@memberof Moveable` 一并删除，不再写 `@category Core`。design 决策 2 已同步修改。

结果：15 个分组，没有「Other」，`types.ts` 中搜不到 `@typedef`、`@memberof`、`@extends`、`@property`。

| 分组 | Core | Snappable | Draggable | Rotatable | Resizable | Scalable | Roundable | Pinchable | Clippable | OriginDraggable | Warpable | Scrollable | Clickable | Group | IndividualGroup |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 数量 | 87 | 29 | 13 | 13 | 12 | 12 | 10 | 9 | 7 | 6 | 6 | 5 | 3 | 2 | 2 |

警告从 178 降到 44（剩下的在其它文件中）；`pnpm lint`、`test:type` 通过。

## 4.2 Draggable、Resizable、Scalable、Rotatable、Warpable、OriginDraggable

用 `migrate-floating.cjs` 把这 6 个文件中的 52 段 `@name` / `@event` 移到 `types.ts`：
- 32 段的目标字段原来没有注释，新建注释；
- 20 段的目标字段已有注释，追加 `@default`（字段没有时）、`@see` 和 `@example`。

合并规则：
- 字段已有说明时，保留字段的说明。`@name` 段的说明去掉「(default: x)」后缀后，应当已经包含在字段说明中；
- 不包含的段必须人工给出处理方式，否则脚本拒绝写入。

本批人工处理 4 段：

| 选项 | `@name` 段 | 字段 | 处理 |
|---|---|---|---|
| `throttleDragRotate` | throttle of angle of x, y when drag. | throttle of angle(degree) of x,y when drag. | 保留字段（更准确） |
| `startDragRotate` | start angle of throttleDragRotate of x, y when drag. | start angle(degree) of x,y for throttleDragRotate when drag. | 保留字段 |
| `scalable` | Whether or not target can scaled. | Whether or not target can be scaled. | 保留字段（`@name` 段少一个 be） |
| `throttleResize` | …when resize. If throttleResize is set to less than 1, the target may shake. | …when resize. | 在字段说明后追加第二句 |

`renderDirections` 在 Resizable、Scalable、Rotatable 中各有一段，3 个示例互不相同，都并到同一个字段上。这 3 段的 `@default` 都是 `["n", "nw", "ne", "s", "se", "sw", "e", "w"]`，字段是「false if rotatable, [...] otherwise」，以字段为准。

迁移中修正的问题：
- 初版脚本把 `@example` 后的第一行代码放在 `@example` 同一行，TypeDoc 会把它当成示例标题。迁移前的源码中没有在 `@example` 同一行写内容的情况，改为 `@example` 单独一行。
- 初版脚本合并了整个文件中的连续空行，改动了不相关的代码空行。改为只在删除的注释块所在处保留一个空行。
- 处理这两个问题时，一次 `git checkout -- packages/react-moveable/src` 把 3.1 和 4.1 已完成的 `types.ts` 改动也撤销了。按原脚本和原编辑重做后，与撤销前一致：`types.ts` 改动 +443 / −571 行，44 个警告，分组相同，`test:type` 通过。此后每一步完成后都把 diff 存为补丁。

`@method Moveable.X#request` 块（Draggable、Resizable、Scalable、Rotatable、OriginDraggable 各一个）挂在 able 对象的 `request()` 上，而 able 对象不在文档入口中。design 的规则表没有覆盖这种情况，按「移到公开类型」的同一原则处理：
- **前 4 个**：
  - 示例移到 `types.ts` 中对应的 `XxxRequestParam` 接口注释；
  - 这些接口上的 `@description` 改为普通说明文字；
  - `@param e.x` 等说明与接口字段已有的注释一致，不重复；
  - Rotatable 的 `@param` 写了默认值 `=0`，给 `RotatableRequestParam` 的 `deltaRotate`、`rotate` 补上 `@default 0`。
- **OriginDraggable**：没有 `RequestParam` 接口，新建会改变公开类型。它的参数清单和示例写进入口文件中 OriginDraggable 分组的 `@categoryDescription`。

`@namespace`：13 段说明全部写进 `config/typedoc/index.ts` 的 `@categoryDescription`，原文照搬。唯一例外是 IndividualGroup：原文把同一句话重复了两遍（「…not as a group.Create targets individually, not as a group.」），去重后只保留一遍。本批删除这 6 个文件中的 `@namespace` 块。

检查（`check-docs.cjs`，读 `typedoc --json` 的输出）：
- drag、resize、scale、rotate、warp、dragOrigin 系列的事件都有说明和示例，这 6 个 able 的选项都有说明；
- 13 个分组都有说明；
- 尚未处理的项在后续任务中处理：4.3 的 able、4.4 的方法和 render / click 事件、4.6 的补写项；另外 `warpSelf` 也显示为没有说明，在 4.4 中查。

6 个 able 文件中搜不到 `@name`、`@event`、`@namespace`、`@memberof`、`@method`；diff 中这些文件只有删除的注释行和紧挨着它们的空行。`pnpm lint` 通过，警告降到 40。

## 4.3 其余 able

Snappable、Clippable、Roundable、Pinchable、Scrollable、DragArea、Clickable、Origin、Padding、edgeDraggable 共 60 段：
- 20 段新建注释，40 段追加到已有注释；
- 没有重复的示例。

人工处理 3 段：

| 选项 | `@name` 段 | 字段 | 处理 |
|---|---|---|---|
| `roundable` | Whether to show and drag or double click border-radius, (default: false) | Whether to show and drag border-radius. | 改用 `@name` 段的说明（多了 double click），`@default false` 不变 |
| `dragArea` | Add an event to the moveable area instead of the target for stopPropagation. (default: false, true in group) | Instead of firing an event on the target, we add it to the moveable control element. You can use click and clickGroup events. | 两段内容不同，在字段说明后追加 `@name` 段的说明 |
| `origin` | Whether or not the origin controlbox will be visible or not (default: true) | Whether or not the origin control box will be visible or not. | 保留字段 |

`@default` 与字段不一致，以字段为准，舍弃 `@name` 段的值：

| 选项 | 舍弃 | 保留 |
|---|---|---|
| `snapContainer` | `null = container` | `null` |
| `snapDirections` | `{ left: true, top: true, right: true, bottom: true }` | `true (true is all directions)` |
| `elementSnapDirections` | `{ left: true, ftrue, right: true, bottom: true }` | `true (true is all directions)` |
| `snapThreshold` | `5` | `0` |
| `snapGridWidth` / `snapGridHeight` | `0` | `0 (0 is not used)` |
| `snapDistFormat` | `self` | `oneself` |
| `clipVerticalGuidelines` | `0` | `[]` |
| `roundPadding` | `false` | `0` |
| `dragArea` | `false, true in group` | `if group, true, else fals` |

加上 4.2 的 `renderDirections`，共 14 处不一致，都以字段为准。抽查实现：`defaultGroupOrigin` 的默认值实际是 `"50% 50%"`（`MoveableGroup.tsx` 中 `props.defaultGroupOrigin || "50% 50%"`），与字段一致。这个 change 不核对注释内容是否准确，`dragArea` 字段的笔误「fals」也保持原样。

删除 Clippable、Scrollable、Pinchable、Roundable、Snappable 的 `@namespace` 块；Snappable 块中的 `@sort 2` 一并删除。

`src/ables/` 下（包括子目录）搜不到 `@name`、`@event`、`@namespace`、`@memberof`、`@method`、`@sort`；diff 中这些文件没有新增行。`pnpm lint` 通过，警告仍为 40。`check-docs.cjs` 中没有说明的事件只剩 render 系列 6 个（4.4）和 4.6 中补写的 12 个。

## 4.4 管理类和原生类

`@name` / `@event` 段：react-moveable 的 `MoveableManager.tsx`、`MoveableGroup.tsx`、`MoveableIndividualGroup.tsx` 共 16 段，7 段新建注释，9 段追加。
- render 系列 6 个事件的说明落在 `RenderableEvents` 上：`onRender` 等就声明在那里，`MoveableDefaultEvents` 中只有 `onChangeTargets`；design 写的是 `MoveableDefaultEvents`，以实际声明位置为准。
- `target` 落在 `MoveableInitalOptions` 上。
- 人工处理 3 段，都保留字段原文：
  - `edge`：`@name` 段「Resize, Scale Events at edges」，字段的说明更完整；
  - `dragTarget`：`@name` 段少了「external」；
  - `defaultGroupOrigin`：`@name` 段是「initial origin」，字段是「initial transform origin」，`@default` 以字段的 `"50% 50%"` 为准（`@name` 段写的是 0）。

`@method` 段：react-moveable 的 `MoveableManager.tsx` 15 段、`InitialMoveable.tsx` 3 段，用 `move-methods.cjs` 移到 `MoveableInterface`：
- `getControlBoxElement`、`getDragElement`、`request`：接口上已有相同的说明，只删除实现类上的段。
- `updateRect`：接口原说明保留，追加实现类的说明和示例。
- `updateTarget`：同上，并调整顺序，让说明在 `@deprecated` 之前。
- 其余 13 个：接口上原来没有注释，整段移过去，`@param - x` 按签名位置补上参数名，`@return -` 改为 `@returns`。
- `getManager`、`stopDrag` 的 `@return - The Rect Info` 是从 `getRect` 复制来的笔误，原样保留（不改写内容）。
- 实现类文件中只删除了注释行。

原生 `Moveable`：
- 类注释从不导出的基类 `MoveableManager` 移到 `Moveable.tsx` 的 `Moveable` 类上，按决策 2 改写；删除 `@sort`、`@alias`、`@extends`。
- 原生类自己实现了 `destroy`、`dragStart`、`setState`、`forceUpdate`，TypeDoc 用的是这些没有注释的声明。给 `destroy`、`dragStart` 加上 `/** {@inheritDoc MoveableInterface.x} */`，生成的文档中 `dragStart` 显示接口上的说明。`setState`、`forceUpdate` 在 4.6 补写接口说明后再加。design 决策 3 已补充这条规则。

删除 Group、IndividualGroup 的 `@namespace` 块。删除注释后，`MoveableGroup.tsx` 末尾留下两个空行，已改回一个，与原来一致。

`@private` 选项：`check-docs.cjs` 显示 `warpSelf` 不在 `Moveable` 类上。原因是它的注释标了 `@private`（「Don't set it.」），TypeDoc 默认不输出私有成员，迁移前的 jsdoc 也不显示它。同样标了 `@private` 的还有 `firstRenderState`、`requestStyles`、`groupable`：它们在 design Context 中被算作「完全没有说明」，实际是注释中只有 `@private`、没有说明文字。所以需要补写说明的选项只有 `targetGroups`。proposal、design、spec 的场景和 tasks 4.6、5.2 已同步修改。检查脚本把 `@private` 选项单独列出。

两个包的 `src` 中搜不到 `@method`、`@event`、`@namespace`、`@name`、`@memberof`、`@typedef`、`@alias`、`@sort`。`check-docs.cjs` 结果：
- 20 个方法中只有 `setState`、`forceUpdate` 没有说明（4.6）；
- 选项中只有 `targetGroups` 没有说明（4.6）；
- 没有说明的事件只剩 4.6 的 12 个；
- 所有有说明的事件都有示例。

`pnpm lint`、`test:type` 通过；警告 41 个，都属于 4.5（`@story` 多了 1 个，是 `waitToChangeTarget` 的说明进入文档后才被读到）。

## 4.5 其余写法

| 写法 | 数量 | 处理 |
|---|---|---|
| `@story <id>` | 12 | `@see [Storybook](../../../../storybook/?path=/story/<id>)` |
| `{@link https://daybrush.com/moveable/release/latest/doc/Moveable.Snappable.html#.SnappableOptions}` | 17 | `{@link SnappableOptions}` |
| 4 个 able 的 Requester 链接（空格和 `\|` 两种写法各 4 个） | 8 | `{@link XxxRequestParam \| Xxx Requester}` |
| OriginDraggable Requester | 1 | `{@link OriginDraggableOptions \| OriginDraggable Requester}`，见下 |
| `Moveable.html#request\|Request Method` | 1 | `{@link MoveableInterface.request \| Request Method}` |
| `@description` | 5 | 去掉标签，改为普通说明 |
| `@options` | 2 | 删除 |
| `@exmaple`、`@depreacted` | 2、1 | 改为 `@example`、`@deprecated` |
| `MoveableInterface.request` 中不写参数名的 `@param`、`@return -` | 3、1 | `@param ableName - …`、`@param params - …`、`@param isInstant - …`、`@returns …` |

OriginDraggable 的 request 说明在 4.2 中放进了它的 `@categoryDescription`，但 `{@link}` 不能链接到分组，`MoveableInterface.request` 的 `@see` 就无处可链。所以改放到 `OriginDraggableOptions` 的接口注释中，与其它 able 一样落在一个类型上；分组说明恢复为原来的一句话。design 决策 3 已同步。

「同一成员多个声明带注释」的 7 个警告都来自 `ElementGuidelineValue`：这个接口被声明了两次，由 TypeScript 合并，两处的 `element`、`className`、`refresh` 都带注释。第一处的说明更完整（`className` 带 CSS 示例），所以删除第二处的接口注释和成员注释，声明本身不动。

`highlightLanguages` 的 `jsx` 已在 2.2 中加上。

结果：在 `treatWarningsAsErrors: true` 下 `pnpm doc` 成功，没有警告。两个包的 `src` 中搜不到 `daybrush.com/moveable/release`、`@story`、`@typedef`、`@memberof`、`@options`、`@exmaple`、`@depreacted`、`@description`。生成的页面中，`interfaces/DefaultOptions.html` 有 `../../../../storybook/?path=/story/options--options-control-padding` 等链接。`pnpm lint` 通过。

## 4.6 补写说明

每项的依据：

| 项 | 写在 | 说明 | 依据 |
|---|---|---|---|
| `beforeRenderStart` / `beforeRender` / `beforeRenderEnd` | `BeforeRenderableEvents` | 沿用参数类型 `OnBeforeRenderStart` 等上已有的说明 | `types.ts` 中这三个参数类型的注释 |
| `beforeRenderGroupStart` / `beforeRenderGroup` / `beforeRenderGroupEnd` | 同上 | 单个目标的说明加上「in group」，与 `renderGroupStart` 等已有说明的写法一致 | `RenderableEvents` 中 render 组事件的说明 |
| `changeTargets` | `MoveableDefaultEvents` | 目标改变时触发 | `InitialMoveable.tsx` 的 `_checkChangeTargets`：目标元素有增减时调用 `onChangeTargets` |
| `bound` | `SnappableEvents` | 吸附时目标接触的边界（`bounds`）或内边界（`innerBounds`）改变时触发 | `ables/Snappable.tsx` 的渲染中，`watchValue` 记录的 `boundMap` 或 `innerBoundMap` 改变时触发 `onBound` |
| `beforeRotate` | `RotatableEvents` | 与 `beforeResize`、`beforeScale` 已有说明的写法相同：在 `rotate` 之前触发，可以读取和设置旋转前的值 | `ables/Rotatable.tsx` 的 `dragControl` 中先触发 `onBeforeRotate`（带 `setRotation`），再计算旋转 |
| `beforeRotateGroup` / `beforeResizeGroup` / `beforeScaleGroup` | 对应的 `XxxEvents` | 同上，加上 group | 三个 able 的 `dragGroupControl` 用 `catchEvent` 把单个目标的 before 事件转发为 group 事件 |
| `targetGroups` | `GroupableOptions` | 由 `target` 中的嵌套数组得到的嵌套分组；渲染组时由 Moveable 自己设置 | `InitialMoveable.tsx` 渲染 `MoveableGroup` 时传入 `getTargetGroups(...)` 的结果，覆盖使用者的值；`MoveableGroup.tsx` 用它计算嵌套分组的范围 |
| `setState` | 原生 `MoveableManager` | 一次设置多个选项，变更生效后调用 `callback` | 原生类的 `setState` 调用内部 `InnerMoveable` 的 `setState`；属性赋值走的也是这条路径 |
| `forceUpdate` | 原生 `MoveableManager` | 重新渲染，渲染后调用 `callback` | 原生类的 `forceUpdate` 调用 `InnerMoveable.forceUpdate` |
| Clickable 分组 | 入口文件 | 目标或组被点击时，是否触发 `click`、`clickGroup` 事件 | `ClickableOptions.clickable`（「Whether to trigger the moveable's click event.」）和 `ClickableEvents` |
| Core 分组 | 入口文件 | Moveable 本身的选项、事件和类型，所有 able 共用 | 分组规则（design 决策 2） |

`setState`、`forceUpdate` 没有按 tasks 原计划写在 `MoveableInterface` 上再用 `{@inheritDoc}` 引用。原因是 React 组件的 `setState` 是组件自身的状态，原生类的 `setState` 设置的是选项，两者含义不同，所以直接写在原生类的方法上。

检查结果（`check-docs.cjs`）：
- 没有说明的选项、方法、事件：0；
- `@private` 选项 4 个（`warpSelf`、`firstRenderState`、`requestStyles`、`groupable`），不在类上；
- 15 个分组都有说明；
- 没有示例的事件只有这次补写的 12 个。

`pnpm doc`（警告视为错误）、`pnpm lint`、`test:type` 通过。

## 5.1 Storybook 的「See API」

`stories/utils.ts` 改为：
- `makeLink(property)` → `../release/latest/doc/classes/Moveable.html#<小写的属性名>`；
- `makeTypeLink(typeName, member?)` → `../release/latest/doc/interfaces/<typeName>.html#<小写的成员名>`。

删除 `makeOptionLink`，文件头部注释说明链接是站内相对的，以及在 `pnpm storybook` 中会是 404。

调用处共 70 处：
- `controls/default.ts` 59 处：52 处改为 `makeLink(<属性名>)`；4 处 `OnResizeStart` 改为 `makeTypeLink("OnResizeStart", "setMax" / "setMin")`，`maxWidth`、`maxHeight` 对应 `setMax`，`minWidth`、`minHeight` 对应 `setMin`；3 处 `scrollOptions` 的字段改为 `makeLink("scrollOptions")`。
- `controls/group.ts` 7 处：3 处 `makeLink`，4 处 `makeTypeLink`。
- `4-Options/0-Default.stories.tsx` 2 处：`makeOptionLink` 改为 `makeLink`，import 同步修改。
- `5-Snap&Bound/0-Snap&Bound.stories.tsx` 2 处 `makeLink`。

第一次执行 `typecheck:stories` 时，`0-Default.stories.tsx` 的 import 漏改，报 TS2304，已修正。`typecheck:stories`、`pnpm lint` 通过；`stories/` 中搜不到 `daybrush.com/moveable/release`。

## 5.2 完整性检查

`check-docs.cjs`（读 `typedoc --json` 的输出），结果与 4.6 相同：
- 除 4 个 `@private` 选项外，所有 `MOVEABLE_PROPS` 在 `Moveable` 类上都有说明；
- 20 个 `MOVEABLE_METHODS` 都有说明；
- 70 个 `MOVEABLE_EVENTS` 对应的 `on<事件名>` 在 `MoveableProps` 上都有说明；
- 15 个分组都有说明。

`check-preserved.cjs`（以 1.2 的 `before/comments.json` 为输入，在迁移后两个包 `src` 和入口文件的全部注释中查找；比较时忽略大小写、空白、标点和末尾的「(default: x)」）：

| 内容 | 总数 | 找不到原文 |
|---|---|---|
| `@example` 代码块 | 153 | 0 |
| `@name` / `@event` 段的说明 | 128 | 7 |
| `@namespace` 的说明 | 13 | 1 |

找不到原文的 8 处都是有意的取舍，前面已逐条记录：
- 保留字段说明、舍弃 `@name` 段措辞的 7 处：`throttleDragRotate`、`startDragRotate`、`scalable`（4.2）；`origin`（4.3）；`edge`、`dragTarget`、`defaultGroupOrigin`（4.4）。这 7 处字段说明与 `@name` 段意思相同，或者更完整；`@name` 段没有字段里缺少的信息。
- IndividualGroup 的分组说明去掉了重复的那句（4.2）。

## 6.x CI 与文档

- `run-e2e.yml` 在 Lint 之后加了「API docs」一步（`pnpm doc`），注释说明它检查源码注释，并且不依赖构建。actionlint 检查两个 workflow 都没有错误。
- `CLAUDE.md`：
  - `pnpm doc` 一行改为 TypeDoc；
  - story 约定中加入「See API」链接的说明；
  - 「类型」一节加入注释约定：注释写在哪个声明上、`@category` 和默认分组、`@param` / `@returns` / `@example` / `{@link}` / Storybook 链接的写法、`MoveableProperties` 必须保持同态映射。
  - 文件中搜不到 `jsdoc`。
- ROADMAP：第 5 步表格加入本 change；「待进行」中 TypeDoc 一条改为概述；「已知遗留」加入「See API」在开发时会 404，以及 README 中的 `CONTRIBUTING.md` 链接无效。

## 7.1 产物对比

`pnpm packages:build` 成功。与 1.1 的快照对比（快照目录中后来存入的 `comments.json`、`jsdoc/` 不是产物，对比时显示为「缺失」，不计）：

| 结果 | 文件 |
|---|---|
| 逐字节相同 | 84 个，包括 `moveable.min.js`、helper 的全部产物、lit / vue3 的 ESM 和 CJS、svelte 的 `dist` |
| 去掉注释后相同 | 31 个：react / croact / preact 的 ESM 和 CJS、moveable 的 ESM / CJS / `moveable.js`、lit 的 UMD、react-moveable 和 moveable 的 20 个声明文件 |
| 去掉注释后仍不同 | 1 个：`react-moveable/declaration/types.d.ts`，只有 `MoveableProperties` 一行（`[key in typeof MOVEABLE_PROPS[number]]` → `[key in keyof Pick<MoveableProps, typeof MOVEABLE_PROPS[number]>]`） |
| `.map` | 11 个不比较 |

与 tasks 的预期不同的一处：moveable 的 `moveable.esm.js`、`moveable.cjs.js` 原本预期逐字节相同，实际是「去掉注释后相同」。原因是原生类方法上新加的注释（`{@inheritDoc}`、`setState` / `forceUpdate` 的说明）被保留到了产物中。`moveable.min.js` 不含注释，仍然逐字节相同。

对 `types.d.ts` 逐行对比时，临时脚本起初没有处理模板字面量类型（`` `on${...}` ``），扫描器把后面一段注释当成了代码，多显示了一处差异；补上处理后只剩上面这一行。

## 7.2 站点中的链接和页面

`pnpm demo:build` 成功。`check-links.cjs`：

| 方向 | 链接数 | 不同的目标 | 无效 |
|---|---|---|---|
| 文档 → Storybook：按页面位置解析后都指向 `demo/storybook/`，story id 都在 `index.json` 中 | 81 | 11 个 story | 0 |
| Storybook → 文档：按 `demo/storybook/` 解析后，页面和锚点都存在 | 70 | 51 个地址 | 0 |

浏览器检查（`demo/` 放在 `/moveable-next/` 子路径下，用 `python3 -m http.server` 提供，Chrome 打开）：
- 首次打开时，文档首页的标题是「moveable-root」：TypeDoc 默认用根 `package.json` 的包名作为项目名。在 `typedoc.json` 中加上 `"name": "Moveable"`，重新生成后标题是「Moveable」。
- `modules.html`：分组依次是 Clickable、Clippable、Core……，每组下面显示 `@categoryDescription` 的说明。
- `classes/Moveable.html`：
  - 类说明显示决策 2 的内容，链接到 `on`、`MoveableProps`、`onDrag`；
  - `draggable` 显示说明、`Default false` 和示例；
  - `rootContainer` 有「See Storybook」链接；
  - `setState` 显示 4.6 补写的说明；
  - 共 12 个 Storybook 链接。
- 点击第一个 Storybook 链接，打开 `storybook/?path=/story/options--options-control-padding`，story 渲染出控制框；它的「See API」指向 `release/latest/doc/classes/Moveable.html#controlpadding`，打开后定位到 `controlPadding` 的说明。
- `interfaces/DraggableEvents.html` 中，`onDrag` 有说明「When dragging, the drag event is called.」和示例。

## 7.3 CI

- 提交与推送：
  - 第一次提交时，`git add` 因为 `jsdoc.json` 已经用 `git rm` 暂存而报 pathspec 错误，整条命令失败；用 `;` 连接的 `git commit` 照常执行，于是 `d9f9f757` 只包含 `jsdoc.json` 的删除，却带着整个 change 的提交说明，并且已经推送。
  - 没有改写远程分支：其余改动作为 `76ae1660` 追加提交，说明中写明了 `d9f9f757` 的情况。
  - 两个提交的 `Tests` 都通过。
- `76ae1660` 的 CI 日志中有「API docs」一步：`$ typedoc`，`html generated at ./doc`，用时约 10 秒。
- 临时提交 `5ea418f3` 在 `draggable` 的说明中写入 `{@link NotAMoveableSymbol}`，run 39104706754 在「API docs」一步失败（exit code 4）：
  - 日志列出 5 个「Failed to resolve link to "NotAMoveableSymbol" in comment for …」：`MoveableProps.draggable`、`MoveableOptions.draggable`、`DraggableOptions.draggable`、`DraggableProps.draggable`、`Moveable.draggable`；
  - 后面的构建和测试步骤都被跳过。
- 警告给出的是出错的声明，不是文件和行号。spec 中两个场景的「文件位置」已改为「出错的声明或文件位置」。
- revert 后推送。
