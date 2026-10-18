## Context

现状（动机见 proposal 的 Why）：

- `pnpm doc` = `rm -rf ./doc && jsdoc -c jsdoc.json`。`jsdoc.json` 扫描下列内容，生成 39 个页面：
  - README.md；
  - `packages/moveable/src`；
  - react-moveable 的 `InitialMoveable.tsx`、`MoveableGroup.tsx`、`MoveableManager.tsx`、`ables/`、`types.ts`；
  - `node_modules/@scena/event-emitter/src`。

  页面包括 `Moveable.html`、每个 able 一页（`Moveable.Draggable.html` 等）、`EventEmitter.html`、`global.html`。模板插件处理 `@story`（链接到上游 Storybook）。
- `packages/moveable/package.json` 也有一个 `doc` 脚本，指向一个不存在的 `packages/moveable/jsdoc.json`，执行必然失败。
- moveable 包从 `react-moveable` 和 `react-moveable/types` 导入，两者解析到 react-moveable 构建后的 `declaration/`。
- 注释现状：在 react-moveable 和 moveable 的 `src` 中统计，按每个声明的最后一段 JSDoc 算：
  - 需要迁移的是带 `@name`（选项）或 `@event`（事件）的段，共 128 段：`@name` 70 段，`@event` 58 段；
  - 其中多数没有挂在任何声明上；有些在文件末尾，只能挂到文件结束符上；有 2 段 `@name` 挂在 able 的 `export default` 上，TypeDoc 会把它们读成 able 对象的说明。数字的来历见 `baseline.md` 的 1.2。
- 迁移前的说明覆盖情况：

  | 类别 | 总数 | 说明在接口上 | 只在 React 实现上 | 只在读不到的注释中 | 完全没有 |
  |---|---|---|---|---|---|
  | `MOVEABLE_METHODS` | 20 | 5 | 13 | 0 | 2 |
  | `MOVEABLE_PROPS` | 127 | 122 | 0 | 1（`target`） | 4（其中 3 个标了 `@private`，不出现在文档中，见 `baseline.md` 的 4.4） |
  | `MOVEABLE_EVENTS` | 70 | 0 | 0 | 58 | 12 |

- 其它 jsdoc 专用写法：
  - 136 个 `@typedef`（全部在接口和类型别名上）、89 个 `@extends`；
  - 38 个接口用不写字段名的 `@property - 说明`（99 行）；
  - 13 个 `@namespace`（able 的分组说明）、23 个 `@method`；
  - `@story` 12 个、`@sort` 2 个、`@options` 2 个、`@alias` 1 个；
  - 拼写错误：`@exmaple` 2 个、`@depreacted` 1 个；
  - 32 个 `{@link}`，其中 23 个是指向上游 jsdoc 页面的 URL。
- 在 scratchpad 用 TypeDoc 0.28.20 + TypeScript 6.0.3 试跑（入口 `packages/moveable/src/index.ts`，tsconfig 用 `paths` 把 `react-moveable`、`react-moveable/types` 指到源码）：
  - **TS 6 的 rootDir**：要显式设置 `rootDir`，否则报 TS6059。
  - **184 个警告**：未知标签 `@memberof` 134、`@story` 11、`@description` 9、`@options` 2、`@exmaple` 2、`@depreacted` 1；`request` 的 `@param` 名与签名不符 12；同一成员有多个声明带注释 7（`refresh`、`element`、`className`、`ElementGuidelineValue`）；代码块语言 `jsx` 未加载 6。
  - **类名**：默认导出的类页面名是 `default`。用一个入口文件 `export { default as Moveable }` 后变为 `Moveable`。
  - **类页面没有说明**：`Moveable` 类页面有 157 个成员，但选项和方法都没有说明。另外做了两个小样例：
    - 把映射改为基于 `Pick<...>` 的同态映射后，注释保留；
    - 用 `as` 改键名的映射（如 `onDrag` → `drag`）即使基于 `Pick`，注释也会丢失。
  - **相对链接**：注释中的相对链接（如 `../../../../storybook/?path=...`）原样输出，但会产生「relative path is not a file」警告。这个警告由 `validation.invalidPath` 控制。
- 现有 Storybook 中所有被 `@story` 引用的 11 个不同的 story id 都存在。
- Storybook 的「See API」：
  - 由 `stories/utils.ts` 的 `makeLink(ableName, property)` / `makeOptionLink(ableName, option, property)` 生成，指向上游 jsdoc 页面；
  - 共 47 个不同的属性名，其中 46 个是 `Moveable` 类的成员，另一个是 `OnResizeStart`（`maxWidth` 等控件通过 `setMax`/`setMin` 实现）；
  - `makeOptionLink` 有 5 处：`linePadding`、`controlPadding` 是选项；`threshold` 等 3 个是 `scrollOptions` 的字段，类型来自外部包 `@scena/dragscroll`。
- 构建产物中保留注释的文件：
  - react-moveable 的 `dist/*.js`；
  - 内联了它的 croact-moveable、preact-moveable 的 `dist/*.js`；
  - moveable 的 `moveable.js`、lit-moveable 的 `moveable.umd.js`；
  - 各包的 `declaration/`。

## Goals / Non-Goals

**Goals:**
- 文档内容只来自挂在声明上的注释和类型本身，jsdoc 专用结构标签全部移除。
- 迁移前文档中的每段说明、每个示例都保留下来，没有说明的项补上。
- 注释写错（无效链接、未知标签、错误的 `@param`）在 `pnpm doc` 和 CI 中直接失败。
- 产物除注释外不变。

**Non-Goals:**
- 不为 react-moveable、helper、框架包装单独生成文档。
- 不用 TypeDoc 的 `notDocumented` / `requiredToBeDocumented` 强制所有导出都有注释：`XxxState` 等内部状态接口也是导出的，强制会引入大量无意义的注释。「每个选项、方法、事件都有说明」由一次性的验证脚本检查（tasks 5.2）。
- 不改写说明的内容和英文表述。

## Decisions

### 1. TypeDoc 的配置和入口

根目录新增：
- **`typedoc.json`**（TypeDoc 默认读取这个文件名）：
  - `entryPoints: ["config/typedoc/index.ts"]`、`tsconfig: "config/typedoc/tsconfig.json"`、`out: "doc"`、`readme: "README.md"`；
  - `router: "kind"`（默认值，写明是因为决策 6 的相对链接依赖页面深度）；
  - `categorizeByGroup: false`；
  - `highlightLanguages`：默认值加上 `jsx`；
  - `githubPages: false`：站点由 Actions 发布，不经过 Jekyll，不需要 `.nojekyll`；
  - `treatWarningsAsErrors: true`；
  - `validation: { invalidPath: false }`（理由见决策 6），其余检查保持默认开启。
- **`config/typedoc/index.ts`**：文档入口，内容是：
  - 模块注释：`@packageDocumentation`，加上每个分组的 `@categoryDescription`；
  - `export { default as Moveable } from "../../packages/moveable/src";`
  - `export * from "../../packages/moveable/src";`

  文档入口单独成文件，而不是直接用包入口：一是给默认导出命名，二是写分组说明。这两件事只属于文档，不应该改包的导出。
- **`config/typedoc/tsconfig.json`**：
  - 继承 `packages/moveable/tsconfig.json`；
  - `rootDir: "../.."`；
  - `paths` 把 `react-moveable` 指到 `packages/react-moveable/src/index.ts`，把 `react-moveable/types` 指到 `packages/react-moveable/src/externalTypes.ts`。这样文档直接读源码中的注释，也不需要先构建；
  - `include` 只有入口文件。

`pnpm doc` 改为 `typedoc`：TypeDoc 默认在生成前清空输出目录，不再需要 `rm -rf`。

不选 TypeDoc 的 `entryPointStrategy: "packages"`（按包生成）：目前只为 moveable 一个包生成文档，没有多包的需要。

### 2. 文档结构

- **`Moveable` 类页面是主页面**：
  - 全部选项都在这一页，来自 `MoveableProperties`，见决策 4；
  - 全部方法也在这一页，来自 `MoveableInterface`，见决策 3 中方法一条；
  - 还有继承自 EventEmitter 的 `on`、`off`、`trigger` 等。

  类注释说明两件事：一是选项既可以在构造时传入，也可以作为属性赋值；二是事件用 `moveable.on("drag", ...)` 监听，每个事件的说明在 `MoveableProps` 的对应 `onDrag` 成员上，并用 `{@link}` 链过去。
- **接口和类型按 able 分组**：用 `@category`，`@memberof Moveable.Draggable` 一一对应为 `@category Draggable`。这保留了旧文档「每个 able 一页」的组织方式。属于某个 able、但原来没有 `@memberof` 的类型（如 `DraggableEvents`、`SnappableState`、`Snap*Info`）补上对应的 `@category`。其余（原来的 `@memberof Moveable`、工具类型、常量、函数和 `Moveable` 类）由 `typedoc.json` 的 `defaultCategory: "Core"` 统一归入 Core，源码中不写 `@category Core`。不叫 `Moveable` 是为了避免和类重名。
- **分组说明**：写在入口文件的 `@categoryDescription` 中：
  - 13 个 `@namespace` 的说明原文搬过去；
  - Clickable 补写一句；
  - Core 写一句。
- **事件的说明**：写在 `XxxEvents` 接口的 `onXxx` 成员上（例如 `DraggableEvents.onDrag`），经继承出现在 `MoveableProps` 等页面上。
  - 不改 `MoveableEvents`（键名是 `drag`）去承载说明：它由 `MOVEABLE_EVENTS` 改键名映射得到，试跑证明改键名的映射一定丢注释。
  - 不为了文档再写一份按事件名的接口：会和 `XxxEvents` 重复，日后不同步。

### 3. 注释的迁移规则

迁移只改注释，规则如下（按出现的写法）：

| 现有写法 | 改为 |
|---|---|
| `@typedef` | 删除（TypeDoc 从声明得知类型） |
| `@memberof Moveable.X` | `@category X`；`@memberof Moveable` 删除（默认归入 Core） |
| `@extends Moveable.X` | 删除（TypeDoc 从 `extends` 得知） |
| 不写字段名的 `@property - 说明` | 按顺序拆到接口的各个字段上，成为字段自己的注释。拆之前核对行数和字段数，不一致的逐条对照旧文档确认 |
| 读不到的 `@name Moveable.X#prop` 段 | 说明和 `@example` 并入 `XxxOptions` 中该字段的注释。字段原有说明保留；读不到的段中的说明更完整时，以它为准，原说明不丢（合并为一段） |
| 读不到的 `@event x` 段 | 说明和 `@example` 移到 `XxxEvents.onX`；`@param {Moveable.X.OnX}` 删除（类型可见） |
| `@namespace` + `@description` | 移到入口文件的 `@categoryDescription`，原处删除 |
| `@method` 段（React 的 `MoveableManager` 等实现类上的方法说明） | 说明、`@param`、`@return`、`@example` 移到 `types.ts` 的 `MoveableInterface` 对应方法上，实现类上删除。`MoveableInterface` 是公开约定，原生类和 React 组件都实现它。原生 `Moveable` 类自己实现的方法（`destroy`、`dragStart`、`setState`、`forceUpdate`）用 `{@inheritDoc MoveableInterface.x}` 引用接口上的说明 |
| able 对象上 `request()` 的 `@method Moveable.X#request` 段 | 示例移到 `XxxRequestParam` 接口；参数说明与接口字段已有注释一致的不重复。OriginDraggable 没有这样的接口，参数清单和示例写进 `OriginDraggableOptions` 的接口注释：`{@link}` 不能链接到分组说明，放在类型上才能被 `MoveableInterface.request` 的 `@see` 链接到 |
| `@story <id>` | `@see [Storybook](../../../../storybook/?path=/story/<id>)`，见决策 6 |
| `{@link https://daybrush.com/.../Moveable.X.html#...}` | `{@link 符号}`，如 `{@link SnappableOptions}`、`{@link DraggableRequestParam}`。指向的符号由 TypeDoc 的 `invalidLink` 检查 |
| `@sort`、`@options`、`@alias`、`@name`（剩余的） | 删除 |
| `@exmaple`、`@depreacted` | 改为 `@example`、`@deprecated` |
| 不写参数名或带 jsdoc 类型的 `@param`（如 `@param - ableName`、`@param {Type} - 说明`） | 改为 TSDoc 的 `@param 参数名 - 说明`，参数名按签名中的位置对应（如 `request` 的 `ableName`、`params`、`isInstant`），说明不变；`@return -` 同样去掉多余的 `-` |
| 同一成员多个声明都带注释 | 保留一处说明完整的，其余删除 |

迁移前完全没有说明的 15 项（标了 `@private` 的选项不在文档中，不需要说明）和 Clickable 分组，按实现补写一句说明（清单见 proposal）。写之前读对应 able 中触发事件或使用选项的代码，说明只写可以从代码确认的内容。

### 4. `MoveableProperties` 改为同态映射

现在的写法：

```ts
export type MoveableProperties = {
    -readonly [key in typeof MOVEABLE_PROPS[number]]?: MoveableProps[key];
};
```

改为：

```ts
export type MoveableProperties = {
    -readonly [key in keyof Pick<MoveableProps, typeof MOVEABLE_PROPS[number]>]?: MoveableProps[key];
};
```

- **类型等价**：键集合相同，都是 `MOVEABLE_PROPS` 的元素；值类型相同，都可选、去掉 readonly。
- **差别**：基于 `Pick` 的映射是同态的，生成的属性保留原来的声明，TypeDoc 因此能读到选项上的注释。试跑的小样例中，现在的写法没有说明，改后有。

这是让 `Moveable` 类页面直接显示说明的最小改动；不选在类上逐个重复声明选项，那是第二份信息。

验证：
- `pnpm --filter react-moveable test:type` 通过；
- 在 scratchpad 中用 `type Equal<A, B>` 断言新旧写法双向可赋值；
- 对比 `declaration/` 时，除注释外只有这一个类型的写法不同（tasks 5.1）。

### 5. 删除的依赖和文件

- 删除 `jsdoc.json`。
- 根 `package.json` 删除 `@daybrush/jsdoc`、`daybrush-jsdoc-template`、`@scena/event-emitter`（根目录只有 `jsdoc.json` 用它；moveable 等包自己声明了，catalog 保留），新增 `typedoc`。
- moveable 的 `package.json` 删除 `doc` 脚本。

### 6. 站内相对链接

两个方向的链接都假定站点结构不变：Storybook 在站点的 `storybook/`，文档在 `release/latest/doc/`。

- **文档 → Storybook**：`@see [Storybook](../../../../storybook/?path=/story/<id>)`。
  - `router: "kind"` 下，成员的说明只出现在 `classes/`、`interfaces/`、`types/` 下的页面中，深度固定为 1。所以从页面回到站点根目录固定是 4 层：页面目录 → `doc` → `latest` → `release` → 站点根目录。
  - TypeDoc 会把相对链接当作本地文件检查，所以关掉 `validation.invalidPath`。代价是注释中真正写错的本地文件链接不再报警，但源码注释中没有本地文件链接（README 中有一个，见下）。
  - 由 tasks 中的脚本检查每个 story id 都存在于 `demo/storybook/index.json`。
- **Storybook → 文档**：`stories/utils.ts` 改为两个函数：
  - `makeLink(property)` → `../release/latest/doc/classes/Moveable.html#<小写的属性名>`；
  - `makeTypeLink(name, member?)` → `../release/latest/doc/interfaces/<name>.html#<小写的成员名>`。

  调用处去掉现在没有用处的 able 名参数：
  - `OnResizeStart` 的 8 处改用 `makeTypeLink("OnResizeStart", "setMax")`（`maxWidth`/`maxHeight`）或 `"setMin"`（`minWidth`/`minHeight`）；
  - `makeOptionLink` 的 2 个选项改为 `makeLink`；
  - `scrollOptions` 的 3 个字段改为 `makeLink("scrollOptions")`：字段属于外部类型，文档中没有单独的锚点。

  Storybook 的「See API」显示在 manager 页面（站点的 `storybook/`）中，所以 `../` 回到站点根目录。由 tasks 中的脚本检查所有生成的链接在 `demo/` 中指向存在的页面和锚点。

README 中「Contribute」链接指向不存在的 `CONTRIBUTING.md`，这是已有问题：关掉 `invalidPath` 后不报警，与以前一样是 404，不在本次范围。

### 7. CI 增加文档生成

`run-e2e.yml` 在 Lint 之后加 `pnpm doc`，用于检查注释，不上传产物。
- 它不依赖构建：入口经 `paths` 读源码。
- 放在 Lint 之后，是为了注释错误能尽早失败。

## Risks / Trade-offs

- [注释迁移量大：react-moveable 的 `types.ts` 和 13 个 able 文件，几百处注释，可能漏搬、错搬] → 迁移前后用脚本对比：
  - 迁移前所有 `@example` 代码块和读不到的段中的说明文字，迁移后在源码注释中都能找到（规整空白后比较）；
  - 用 TypeDoc 的 JSON 输出检查每个选项、方法、事件都有说明（tasks 5.2）；
  - 不写字段名的 `@property` 拆分时逐个核对字段数。
- [按顺序对应的 `@property` 可能本来就和字段对不上（字段增删后没有同步注释）] → 数量不一致的接口逐个对照旧 jsdoc 页面的显示结果；无法确定归属的说明在 tasks 中记录，并保留在接口的注释中，不丢弃。
- [`MoveableProperties` 写法改变出现在发布的声明文件中] → 类型等价，由类型测试和双向赋值断言验证。使用者的代码不受影响。
- [Storybook 的「See API」在 `pnpm storybook` 开发时是 404] → 用户选定的方案接受这一点；部署后的站点和本地 `demo/` 预览中可用。
- [文档页面的地址和锚点全部改变] → 本仓库的站点还没有发布过，外部没有指向新站点的链接；README 等指向上游的链接随第 6 步调整。
- [TypeDoc 0.28 的 TypeScript peer 范围最高到 6.0.x] → 与仓库现在的 TS `~6.0.3` 一致；以后升级到 TS 7 时，与 typescript-eslint 一起等待支持（ROADMAP 已有记录）。
- [react-moveable 的 dist 和声明文件中注释改变，sourcemap 中的源码内容随之改变] → 产物对比只比较去掉注释后的内容（tasks 5.1）。

## Migration Plan

部署在 `deploy-demo-with-actions` 之后照常进行：`demo:build` 中的 `pnpm doc` 现在执行 TypeDoc，产物位置不变。回滚就是 revert 本 change 的提交。
