## 1. 基线

- [x] 1.1 执行 `pnpm packages:build`，把所有包的 `dist/` 和 `declaration/` 复制到 scratchpad 的 `before/`；再写一个去掉注释的对比脚本（用 TypeScript 的 scanner 跳过注释 token，其余原样输出），供 7.1 使用。验证：脚本对 `before/` 和刚构建的产物逐个比较，全部相同
- [x] 1.2 在 scratchpad 中写提取脚本，从迁移前的 react-moveable、moveable 源码中提取，存为 `before/comments.json`：
  - 所有 `@example` 代码块；
  - 所有带 `@name` 或 `@event` 的注释段（design Context 中的 128 段）的说明文字；
  - 13 个 `@namespace` 的 `@description`；
  - 不写字段名的 `@property` 所在的接口，以及每个接口的 `@property` 行数和字段数。

  执行 `pnpm doc`（jsdoc），记录页面清单。验证：`baseline.md` 中有上述数量，与 design Context 一致（`@example` 153 个，`@name` 段 70 个、`@event` 段 58 个，`@namespace` 13 个，带 `@property` 的接口 38 个）；有 `@property` 行数和字段数不一致的接口单独列出

## 2. TypeDoc 的配置（design 决策 1、5）

- [x] 2.1 修改依赖和脚本：
  - 根 `package.json` 新增 devDependency `typedoc ^0.28.20`，删除 `@daybrush/jsdoc`、`daybrush-jsdoc-template`、`@scena/event-emitter`；
  - `doc` 脚本改为 `typedoc`；删除 `jsdoc.json`；
  - moveable 的 `package.json` 删除 `doc` 脚本；
  - 执行 `pnpm install`。

  验证：锁文件中搜不到 `@daybrush/jsdoc`、`daybrush-jsdoc-template`、`jsdoc@`；`pnpm lint` 通过（包括依赖范围检查）
- [x] 2.2 按决策 1 新增 `typedoc.json`、`config/typedoc/index.ts`（先只有两行导出和 `@packageDocumentation`）、`config/typedoc/tsconfig.json`。验证：`pnpm doc --treatWarningsAsErrors false` 生成 `doc/`，其中有 `classes/Moveable.html`，没有 `classes/default.html`；警告数量与 design Context 中试跑的 184 个接近（差别逐条说明），记入 `baseline.md`

## 3. `MoveableProperties`（design 决策 4）

- [x] 3.1 按决策 4 修改 react-moveable `src/types.ts` 中的 `MoveableProperties`。验证：
  - `pnpm --filter react-moveable test:type` 通过；
  - 在 scratchpad 中写类型断言，新旧两种写法双向可赋值，并且 `keyof` 相同，`tsc --noEmit` 通过；
  - 重新执行 2.2 的命令后，`classes/Moveable.html` 中 `draggable` 一项有说明「Whether or not target can be dragged.」

## 4. 注释迁移（design 决策 3）

每个任务改完都执行 `pnpm doc --treatWarningsAsErrors false` 和 `pnpm lint`：警告数只减不增，lint 通过。

- [x] 4.1 react-moveable `src/types.ts` 中的接口和类型：
  - 删除 `@typedef`、`@extends`；
  - `@memberof` 改为 `@category`；
  - 不写字段名的 `@property` 拆到各个字段上。行数和字段数不一致的接口，对照 1.2 记录的旧 jsdoc 页面确定归属，结果记入 `baseline.md`。

  验证：`types.ts` 中搜不到 `@typedef`、`@memberof`、`@extends`、`@property`
- [x] 4.2 Draggable、Resizable、Scalable、Rotatable、Warpable、OriginDraggable 六个 able：
  - 读不到的 `@name` 段并入 `XxxOptions` 的字段；
  - `@event` 段移到 `XxxEvents.onX`；
  - `@namespace` 的说明移到入口文件的 `@categoryDescription`；
  - 删除原处的注释。

  验证：这些文件中搜不到 `@name`、`@event`、`@namespace`、`@memberof`；`classes/Moveable.html` 中这些 able 的选项都有说明，`interfaces/DraggableEvents.html` 等页面中每个事件都有说明和示例
- [x] 4.3 Snappable、Clippable、Roundable、Pinchable、Scrollable、DragArea、Clickable 和其余 able 文件，规则同 4.2。验证：`src/ables/` 下搜不到 `@name`、`@event`、`@namespace`、`@memberof`
- [x] 4.4 react-moveable 的 `MoveableManager.tsx`、`MoveableGroup.tsx`、`MoveableIndividualGroup.tsx`、`InitialMoveable.tsx`，以及 moveable 的 `src/MoveableManager.tsx`：
  - `@method` 段移到 `MoveableInterface`；
  - render、click 事件的 `@event` 段移到 `MoveableDefaultEvents` / `ClickableEvents` 的成员；
  - Group、IndividualGroup 的 `@namespace` 说明移到 `@categoryDescription`；
  - 原生 `Moveable` 类的注释按决策 2 改写：说明选项的两种用法和事件的监听方式，删除 `@sort`、`@alias`、`@extends`。

  验证：`src/` 下（两个包）搜不到 `@method`、`@event`、`@namespace`、`@name`；`classes/Moveable.html` 中 18 个有说明的方法都有说明
- [x] 4.5 其余写法：
  - `@story` 改为 `@see [Storybook](../../../../storybook/?path=/story/<id>)`；
  - 指向上游 jsdoc 的 `{@link}` 改为符号链接；
  - 删除 `@sort`、`@options`、`@alias`；
  - 修正 `@exmaple`、`@depreacted`；
  - 不写参数名的 `@param` 改为 TSDoc 写法，去掉 `@return -` 多余的 `-`；
  - 同一成员多处带注释的保留一处；
  - `highlightLanguages` 加上 `jsx`。

  验证：`pnpm doc` 在 `treatWarningsAsErrors: true` 下成功，没有警告；两个包的 `src/` 中搜不到 `daybrush.com/moveable/release`、`@story`、`@typedef`、`@memberof`
- [x] 4.6 按实现补写说明：proposal 中列出的 2 个方法、1 个选项、12 个事件，以及 Clickable 和 Core 两个分组的 `@categoryDescription`；原生类的 `setState`、`forceUpdate` 加上 `{@inheritDoc}`。每一项先读触发事件或使用选项的代码，再写一句说明，在 `baseline.md` 中记录每项依据的代码位置。验证：5.2 的脚本中这 15 项都显示有说明

## 5. Storybook 链接与检查脚本（design 决策 6）

- [x] 5.1 `stories/utils.ts` 按决策 6 改为 `makeLink(property)` 和 `makeTypeLink(name, member?)`，删除 `makeOptionLink`，并修改全部调用处。验证：
  - `pnpm --filter react-moveable typecheck:stories` 通过；
  - `pnpm lint` 通过；
  - `stories/` 中搜不到 `daybrush.com/moveable/release`
- [x] 5.2 在 scratchpad 中写检查脚本，以 `typedoc --json` 的输出和 1.2 的 `before/comments.json` 为输入，检查：
  - 每个 `MOVEABLE_PROPS`（标为 `@private` 的除外，它们不出现在类上）、`MOVEABLE_METHODS` 在 `Moveable` 类上都有说明；
  - 每个 `MOVEABLE_EVENTS` 对应的 `on<事件名>` 在 `MoveableProps` 上都有说明；
  - 迁移前的每个 `@example` 代码块、每段读不到的注释中的说明文字、每个 `@namespace` 的说明，在迁移后的源码注释或入口文件中都能找到（规整空白后比较）。

  验证：脚本输出全部通过，结果写入 `baseline.md`；如有在新注释中有意合并、改写的段落，逐条列出原因

## 6. CI 与文档（design 决策 7）

- [x] 6.1 `.github/workflows/run-e2e.yml` 在 Lint 之后加 `pnpm doc` 一步，注释说明它检查源码注释、不依赖构建。验证：actionlint 没有错误
- [x] 6.2 更新 `CLAUDE.md`：
  - `pnpm doc` 一行改为 TypeDoc，配置在 `typedoc.json` 和 `config/typedoc/`，警告视为错误；
  - 「类型」一节补充注释约定：注释写在声明上，用 TSDoc；able 的接口用 `@category <Able>`；事件说明写在 `XxxEvents.onX` 上；方法说明写在 `MoveableInterface` 上；不要写 jsdoc 的 `@typedef`、`@memberof`、`@name`、`@event`；
  - 说明 Storybook「See API」和文档中 Storybook 链接是站内相对链接，单独运行 `pnpm storybook` 时「See API」会 404。

  更新 `openspec/ROADMAP.md`：第 5 步表格写入本 change，「待进行」中 TypeDoc 一条改为已完成并概述，「已知遗留」中记录「See API」在开发时会 404，以及 README 中的 `CONTRIBUTING.md` 链接无效。

  验证：`CLAUDE.md` 中搜不到 `jsdoc`

## 7. 全量验证

- [x] 7.1 执行 `pnpm packages:build`，用 1.1 的脚本与 `before/` 对比：
  - 不保留注释的产物逐字节相同：moveable 的 `moveable.esm.js`、`moveable.cjs.js`、`moveable.min.js`，lit、vue3 的 ESM/CJS，helper 的全部产物，svelte 的 `dist`；
  - 其余 `.js` 和全部 `declaration/` 去掉注释后相同，只有 react-moveable 声明中的 `MoveableProperties` 例外；
  - `.map` 不比较。

  验证：对比结果写入 `baseline.md`
- [x] 7.2 执行 `pnpm demo:build`，在 scratchpad 中写脚本检查：
  - 文档中所有指向 `storybook/?path=/story/<id>` 的链接，id 都在 `demo/storybook/index.json` 中；
  - `stories/` 中所有「See API」链接按 `demo/storybook/` 的位置解析后，指向 `demo/release/latest/doc/` 中存在的页面，锚点也存在。

  再把 `demo/` 放在 `/moveable-next/` 子路径下用静态服务器提供，在浏览器中检查：
  - 文档首页；
  - `classes/Moveable.html` 中 `draggable` 的说明和一个 `@see` Storybook 链接能打开 story；
  - `interfaces/DraggableEvents.html` 中 `onDrag` 的说明和示例；
  - 分组索引中有 Draggable 等分组及其说明；
  - Storybook 中某个控件的「See API」能打开对应的文档锚点。

  验证：脚本和浏览器检查全部通过，结果写入 `baseline.md`
- [ ] 7.3 提交并推送后，确认 CI 通过，日志中有 `pnpm doc` 步骤。再推送一个临时提交，在某个注释中写入指向不存在符号的 `{@link}`，确认 CI 在 `pnpm doc` 步骤失败，日志中有文件位置；验证完 revert 并推送。结果写入 `baseline.md`
- [ ] 7.4 在全新克隆中执行 `pnpm install --frozen-lockfile && pnpm lint && pnpm doc && pnpm packages:build && pnpm --filter react-moveable exec playwright install chromium && pnpm --filter react-moveable typecheck:stories && pnpm test && pnpm demo:build`。验证：全部成功；`openspec validate replace-jsdoc-with-typedoc --strict` 通过
