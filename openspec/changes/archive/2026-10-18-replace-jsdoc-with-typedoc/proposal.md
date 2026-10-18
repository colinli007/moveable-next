## Why

API 文档现在由 `@daybrush/jsdoc` 0.4 和 `daybrush-jsdoc-template` 生成：根目录 `jsdoc.json` 列出要扫描的源码，jsdoc 只读注释，不读 TypeScript 类型。为了让 jsdoc 理解代码，注释里用 jsdoc 的结构标签手工描述了整套 API：

- 136 个 `@typedef` 加 `@memberof Moveable.Draggable` 等，把接口挂到各个 able 的命名空间下；
- 38 个接口用按顺序对应、不写字段名的 `@property - 说明`（共 99 行）描述字段；
- 128 段注释不属于它们描述的声明，jsdoc 靠 `@name Moveable.Draggable#draggable`、`@event drag` 等标签把它们拼回去。这些段要么没有挂在任何声明上，要么挂在文件末尾或 able 的 `export default` 上，TypeDoc 读不到或读错：
  - 70 段是选项的说明和示例；
  - 58 段是事件的说明和示例。

这些写法只有 daybrush 自己的 jsdoc 分支和模板能处理。它们同类型定义是两套信息：类型改了，注释不会跟着报错。这是 ROADMAP 第 5 步「文档与部署」的第二个 change：发布通道已经在 `deploy-demo-with-actions` 中改为 Actions，这次把文档本身换成直接读 TypeScript 的 TypeDoc。

用 TypeDoc 0.28 对现有源码试跑的结果（详见 design 的 Context）：
- 能生成文档，但有 184 个警告；
- `Moveable` 类显示为 `default`；
- 类页面上的 150 多个选项和全部方法都没有说明：选项来自按常量数组映射出的 `MoveableProperties`，映射丢掉了注释；方法的说明写在 React 实现类上，不在公开的 `MoveableInterface` 上；
- 事件的说明和选项的示例完全缺失，因为上面那 128 段注释读不到或归属错误。

## What Changes

- `pnpm doc` 改用 **TypeDoc 0.28** 生成，输出仍在 `doc/`（`demo:build` 照旧把它复制到 `demo/release/latest/doc`）：
  - 配置在根目录 `typedoc.json`，文档入口是专用的入口文件，它把 moveable 包的默认导出命名为 `Moveable`，并在模块注释中写各 able 的分组说明；
  - 警告视为错误（`treatWarningsAsErrors`）。
- 删除 `jsdoc.json`、根目录的 `@daybrush/jsdoc`、`daybrush-jsdoc-template`、`@scena/event-emitter`（只有 `jsdoc.json` 用它），以及 moveable 包中指向不存在的 `jsdoc.json` 的 `doc` 脚本。
- 把源码注释改写为 TypeDoc 能读的 TSDoc，只改注释，不改行为。规则见 design 决策 3：
  - jsdoc 的结构标签换成 TypeDoc 的写法，`@memberof Moveable.Draggable` 改为 `@category Draggable`；
  - 不写字段名的 `@property` 拆到对应的字段上；
  - 读不到的选项说明和示例并入 `XxxOptions` 接口中对应的字段；
  - 事件说明和示例并入 `XxxEvents` 接口中的 `onXxx` 成员；
  - 方法说明移到 `MoveableInterface`；
  - 指向上游 jsdoc 页面的链接改为 `{@link 符号}`。
- `MoveableProperties` 改写为保留原属性声明的映射类型，类型含义不变（由类型测试和声明文件对比验证），使 `Moveable` 类页面上的每个选项都带说明。
- **BREAKING**（只影响文档站点的链接）：API 文档的页面结构和锚点改为 TypeDoc 的格式，例如 `Moveable.Draggable.html#draggable` 变为 `classes/Moveable.html#draggable`。
- 文档和 Storybook 之间的互相链接改为站内相对链接：
  - 注释中的 12 个 `@story` 改为指向站点内 Storybook 的链接；
  - Storybook 控件说明中约 65 个「See API」改为指向站点内的 TypeDoc 页面，不再指向上游 `daybrush.com`。
  - 单独运行 `pnpm storybook` 开发时，「See API」链接会是 404，这是选定方案接受的代价。
- CI（`run-e2e.yml`）增加 `pnpm doc` 一步：注释写错（无效的 `{@link}`、未知标签等）会让流水线失败。
- `CLAUDE.md`、`openspec/ROADMAP.md` 更新。

不在本次范围：
- 只为 moveable（原生 JS）包生成文档，与现在相同。react-moveable、helper 和框架包装不单独生成文档：它们的选项和事件与 moveable 相同，在同一份文档中。
- README、`groupable.md`、`handbook/` 等文件中指向上游 `daybrush.com` 文档的链接：随第 6 步的站点地址一起调整。
- 注释内容本身（说明是否准确、英文是否通顺）：只搬运、合并，不改写；明显的标签拼写错误（`@exmaple`、`@depreacted`）除外。迁移前任何地方都没有说明的项，按实现补写一句说明：
  - 2 个方法：`setState`、`forceUpdate`；
  - 1 个选项：`targetGroups`（`warpSelf`、`firstRenderState`、`requestStyles`、`groupable` 标了 `@private`，是框架包装和组内部使用的选项，迁移前后都不出现在文档中）；
  - 12 个事件：`beforeRenderStart`、`beforeRender`、`beforeRenderEnd`、`beforeRenderGroupStart`、`beforeRenderGroup`、`beforeRenderGroupEnd`、`changeTargets`、`bound`、`beforeResizeGroup`、`beforeScaleGroup`、`beforeRotate`、`beforeRotateGroup`；
  - Clickable 分组的说明（它没有 `@namespace` 注释）。

## Capabilities

### New Capabilities

（无）

### Modified Capabilities

- `monorepo-tooling`：
  - 新增「API 文档由 TypeDoc 从源码生成」：包括内容完整性，以及与 Storybook 的站内互相链接；
  - 「依赖显式声明」中作为例子的 `jsdoc.json` 改为 `typedoc.json`，「配置文件引用的路径有效」场景改为 TypeDoc 的入口和 tsconfig；
  - 「CI 执行全部自动化检查」增加 API 文档生成。

## Impact

- 根目录：`package.json`（`doc` 脚本、依赖）、新增 `typedoc.json` 和文档入口文件与它的 tsconfig、删除 `jsdoc.json`、`.github/workflows/run-e2e.yml`
- react-moveable：`src/types.ts`、`src/ables/*`、`src/MoveableManager.tsx`、`src/MoveableGroup.tsx`、`src/MoveableIndividualGroup.tsx`、`src/InitialMoveable.tsx` 的注释；`types.ts` 中 `MoveableProperties` 的写法；`stories/utils.ts` 及调用处的「See API」链接
- moveable：`src/MoveableManager.tsx` 的注释，`package.json` 删除 `doc` 脚本
- 产物：
  - moveable、croact-moveable、preact-moveable、lit、vue3、svelte 的 `.js` 产物不变；
  - react-moveable 的 `dist` 中保留了注释，所以只有注释不同；
  - `declaration/` 中除注释外只有 `MoveableProperties` 的写法不同；
  - sourcemap 中的源码内容随注释改变。
- `pnpm-lock.yaml`：删除 jsdoc 及其模板的依赖树，新增 typedoc
