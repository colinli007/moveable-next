## Context

动机见 proposal.md。方案经 Fable 独立评审，下面的数据来自评审和复核实验（esbuild 0.28 与 rolldown 1.2，压缩，react/croact/vue 及第三方依赖作为外部模块，只计 moveable 自身代码）：

| React 产物中默认 `Moveable` 的写法 | 全量 | 组合 3 个 able | 只用 Draggable |
|---|---|---|---|
| 现状：`static { this.defaultAbles = MOVEABLE_ABLES }` | 164.7KB | 164.8KB（不裁剪） | — |
| `static get defaultAbles()` + 4 个函数标注 `/*#__NO_SIDE_EFFECTS__*/` | 164.7KB | 108.6KB（-34%，gzip 57.2→37.8KB） | 77.6KB（-53%） |

- **阻止裁剪的原因**（全部，逐一排查过）：
  1. `src/Moveable.tsx` 的 `static defaultAbles = MOVEABLE_ABLES`：`useDefineForClassFields: false` 下 oxc 输出 `static {}` 块，esbuild 和 rolldown 都视为副作用。上游 0.56.0 的 ES5 产物（带 PURE 的 IIFE）可以裁剪（3 个 able -26% 到 -31%），这是路线图第 3 步的回归。
  2. `src/makeMoveable.ts` 返回的类同样是静态块（不影响 able 裁剪，但使用者的 `makeMoveable(...)` 调用本身删不掉）。
  3. 5 处顶层 `makeAble(...)`（`ables/Pinchable.ts`、`Origin.tsx`、`Padding.tsx`、`Clickable.ts`、`edgeDraggable.tsx`），没有标注。
  4. able 对象字面量中的调用：`render: getRenderDirections(...)`、`viewClassName: getDirectionViewClassName(...)`、`getDirectionCondition(...)`（`ables/Resizable.ts`、`Scalable.ts`、`Warpable.tsx`）。rolldown 能分析掉，esbuild 不能（Vite 开发时的依赖预构建、webpack 同样不能）。
- **不是原因的**：`__decorate([withMethods(...)], InitialMoveable.prototype, ...)` 和 `InitialMoveable` 的静态块（`InitialMoveable` 是 `makeMoveable` 的基类，总要保留）；CSS（`makeStyled` 只拼接生效 able 的 `css`）；`MOVEABLE_EVENTS/PROPS` 的 reduce（已有 PURE）；`MoveableManager` 等的 `defaultProps`。
- **固定开销**：只用 Draggable 仍有约 77KB，来自结构：`InitialMoveable.render` 引用 `MoveableGroup`、`MoveableIndividualGroup`；`getTotalAbles()` 固定带 Default、Groupable、IndividualGroupable、DragArea；`triggerAble` 直接调用 BeforeRenderable、Renderable；Draggable 等直接 import snap 辅助函数。
- **原生版**：`src/consts.ts` 的 `PROPERTIES/EVENTS/METHODS` 来自全部 able；`src/MoveableManager.tsx` 在模块顶层套用 `@Properties(METHODS, ...)`、`@Properties(PROPERTIES, ...)`；`src/InnerMoveable.tsx` 固定渲染默认 `Moveable`；没有导出 able。
- **Vue 版**：`src/VueMoveable.ts` 在模块顶层 `defineComponent`，props、methods、watch、emits 来自原生版的全量列表；默认导出是 `const` 加同名 `interface` 合并；`src/index.ts` 是 `export * from "@moveable-next/vanilla"` 加默认导出。
- **事件的来源**：`gesto/getAbleGesto.ts` 的 `triggerAble` 对任何 Moveable 都触发 BeforeRenderable 和 Renderable，它们不在 `getTotalAbles()` 中；所以组合部分 able 的 Moveable 仍有 `render`、`beforeRender*` 等事件。

## Goals / Non-Goals

**Goals:**
- 三个包都能按 able 裁剪，裁剪效果在构建中自动检查。
- React 版和原生版的默认导出仍是 class，所有类型用法不变；Vue 版默认导出的类型不变。
- 三个包的 `makeMoveable` 用法和泛型一致。

**Non-Goals:**
- 降低约 77KB 的固定开销（需要拆分 `InitialMoveable` 与组相关的类、snap 辅助函数，记入路线图）。
- 导出更多 able；不写泛型时从 able 元组推断精确类型。
- 调整 `useDefineForClassFields`（见决策 1）。

## Decisions

### 1. React：`static get defaultAbles()` 加 `/*#__NO_SIDE_EFFECTS__*/`

- `src/Moveable.tsx`、`src/makeMoveable.ts` 的 `static defaultAbles = ...` 改为 `static get defaultAbles() { return ... }`。类的访问器是声明，打包工具不把它当作副作用；默认导出仍是 class 声明，`useRef<Moveable>`（33 个 story 在用）、`Moveable<T>`、`InstanceType`、`extends Moveable` 都不变，`declaration/` 中只有 `defaultAbles` 从属性变为 getter。`InitialMoveable.defaultAbles` 保持静态属性（tsc 验证：子类的静态 getter 覆盖父类静态属性不报错），`defaultStyled` 在 `makeStyled` 中被赋值，也保持属性。
- `makeAble`（`ables/AbleManager.ts`）、`getRenderDirections`（`renderDirections.tsx`）、`getDirectionViewClassName`、`getDirectionCondition`（`utils.tsx`）的声明前加 `/*#__NO_SIDE_EFFECTS__*/`：标在函数上，调用处由打包工具视为无副作用，以后新增的调用也自动生效。实测 tsdown 会保留这个标注并给调用处补 `/* @__PURE__ */`，croact 构建再打包一次后仍在。

考虑过的其它写法：
- 默认导出改为 `/*#__PURE__*/ makeMoveable(MOVEABLE_ABLES)`：裁剪效果相同，但默认导出不再是 class 声明，作为类型使用时需要另写同名 interface，否决。
- `static defaultAbles` 用 define 语义（`useDefineForClassFields: true`）：裁剪效果相同，但子类只声明不初始化的字段（`public foo!: X`）会在 `super()` 之后被重置为 `undefined`，`MoveableGroup extends MoveableManager` 等层级都要重审；为两个静态字段冒这个险不值。CLAUDE.md 中这条配置的理由（「访问器会被实例字段遮住」）经核对不成立，按这里的真实理由更正。
- 在类定义后赋值 `Moveable.defaultAbles = ...`：同样视为副作用，不裁剪。
- 打包工具选项（如 `treeshake.manualPureFunctions`）：裁剪发生在使用者的打包工具中，库只能在产物中写标注。

### 2. 原生版：按类的 able 懒生成原型访问器

- `MoveableManager` 保持普通 class。新增 `protected static get ables(): readonly Able<any>[]`（基类返回空数组，标 `@private`，不出现在文档中），和静态方法 `getAbleInfo()`：第一次调用时用 React 版的 `makeMoveable(this.ables)` 生成内部组件类，从它推导出选项名和事件名列表，在声明了 `ables` 的类（默认 `Moveable`、`makeMoveable` 返回的类）的原型上定义选项访问器（即现在 `@Properties(PROPERTIES)` 回调的内容），结果缓存在这个类上（`Object.hasOwn` 判断）。使用者的子类沿原型链找到声明 `ables` 的类，共用它的访问器和内部组件：与旧的装饰器只写基类原型一样，子类自己定义的同名访问器不会被覆盖，也不会每个子类各生成一份内部组件和样式。构造函数第一步调用它，用返回的事件列表注册事件、把内部组件类经 `moveableClass` prop 交给 `InnerMoveable` 渲染。去掉模块顶层的 `@Properties(PROPERTIES)`；`@Properties(METHODS)` 保留在顶层，因为 `MOVEABLE_METHODS` 不引用任何 able。这是仓库中已有的懒初始化做法（`InitialMoveable.render` 首次渲染时 `makeStyled()`）。
- `getAbleInfo()` 要给 Vue 版调用，所以在 TS 中是 public（TSDoc 标 `@private`，不进文档），返回类型只写 `{ props: string[]; events: string[] }`：内部组件类的类型来自 react-moveable 的入口，出现在类型声明中会引入 React 的类型。实际的工作在 private 的静态方法 `prepareAbles()` 中，它的返回值带内部组件类，构造函数直接调用它；private 成员在类型声明中不带类型。
- 选项名和事件名的精确来源是「这个 Moveable 实际生效的 able」：`getTotalAbles()` 再加上总会触发的 BeforeRenderable、Renderable。react-moveable 的 `InitialMoveable` 新增静态方法 `getAllAbles()` 返回这个列表，原生版直接使用，不在原生版中复制这条规则。
- `export default class Moveable extends MoveableManager { static get ables() { return MOVEABLE_ABLES; } }`，`makeMoveable(ables)` 返回 `class extends MoveableManager { static get ables() { return ables; } }`。TypeDoc 的 `Moveable` 类页面和文档链接不变。
- `consts.ts` 的 `PROPERTIES/EVENTS/METHODS` 保留为全量列表（使用者和旧代码在用），它们是 PURE 的，不引用就会被删。
- `InnerMoveable` 改为渲染传入的组件类（`moveableClass` prop），不再 import 默认 `Moveable`。第 8 步的 `render` + `createPortal` 结构不变。
- 实测原型：组合 3 个 able 约 110KB，全量约 166KB（-34%）。

考虑过的做法：原生版也用 PURE 工厂定义默认类（在工厂内套用装饰器）。裁剪效果相同（实测 109.6KB），但默认导出变成工厂调用的结果，类型和文档都要另做，否决。

### 3. Vue 版：PURE 工厂

内部函数 `defineMoveable(原生类)` 从原生类取选项名和事件名（决策 2 的 `getAbleInfo()`），在函数内 `defineComponent`（props、methods、watch、emits 与现在相同，只是来源换成这个类）。`makeMoveable(ables)` 是 `defineMoveable(原生版 makeMoveable(ables))`；默认导出为 `/*#__PURE__*/ defineMoveable(原生默认类)`（原生版没有导出 `MOVEABLE_ABLES`，直接用默认类也省掉再生成一次内部组件），类型保持 `const` 加同名 `interface`。`src/index.ts` 显式 `export { makeMoveable }`，覆盖 `export *` 带来的原生版同名导出（ES 模块和 TypeScript 都以显式导出优先）。第 8 步的挂载点、`container` 默认值，以及 `emits` 等行为保持不变。实测原型：组合 3 个 able 约 110KB，全量约 167KB。

### 4. 类型

- 三个包的签名对齐 React 版：`makeMoveable<T extends Record<string, any> = {}>(ables: Array<Able<T>>)`，`T` 是组合的 able 的选项和 `onX` 事件类型，使用者三处都写 `makeMoveable<DraggableProps & ResizableProps & RotatableProps>([...])`。
- 原生版返回的类：实例类型 `MadeMoveable<T>` 从 `T` 推导：选项为去掉 `on` + 大写字母开头的键后的可选属性（`MoveableOptionsOf`），`on("x", ...)` 的事件名由 `onX` 键转换（`MoveableEventsOf`），事件参数与默认 Moveable 相同地加上 `stop`；并上每个 Moveable 都有的 able 的选项（`InitialMoveable.tsx` 中未导出的 `DefaultAbles`，移到 `types.ts` 并以 `DefaultAbleProps` 导出：原生版只能经 `@moveable-next/react/types` 引用它）和 `MoveableInterface` 的方法（去掉其中参数为 `any` 的 `setState`、`forceUpdate`，按 `T` 重新声明）。类的类型 `MadeMoveableClass<T>` 是构造签名加 `getAbleInfo`。`makeMoveable` 的返回值做一次类型断言。默认 `Moveable` 仍走 `interface MoveableManager extends MoveableInterface, MoveableProperties` 合并，`MoveableProperties` 的同态 `Pick` 不动。
- Vue 版：`VueMoveableComponent` 改为以 props 和事件为参数的泛型，默认组件仍是 `Partial<MoveableProperties>` 和 `MoveableEvents`（类型不变），`makeMoveable` 的组件用 `MoveableOptionsOf`、`MoveableEventsOf`。`defineMoveable` 的参数是默认类的类型，`makeMoveable` 中把 `MadeMoveableClass<T>` 断言为它：`T` 在构造参数上是逆变的，不同 `T` 的类不能互相赋值，而组件只按运行时的名称列表使用这个类。
- 原生版导出 able 时 **MUST** 在源码中写出显式类型（`Able<DraggableProps>`，与 `makeMoveable` 的参数 `Array<Able<T>>` 一致），不能直接 `export { Draggable } from "@moveable-next/react"`：实测后者会让类型声明经 react-moveable 的入口引入 4 个 `@types/react` 文件，`test/checkTypes.mjs` 失败。每个新增导出都由这个测试检查。Snappable（`dragRelation` 推断为 `string`、`dragControlCondition` 可能返回 `undefined`）、Scrollable（`dragRelation`）、Roundable（`requestStyle` 返回 `keyof CSSStyleDeclaration`）推断出的类型与 `Able` 不符，在 react-moveable 源码中修正（`as const`、补 `return false`、返回 `string[]`），React 版 `makeMoveable([Snappable])` 也因此能通过类型检查。
- `static get ables` 和 `getAbleInfo()` 标 `@private`，TypeDoc 不显示。

### 5. 构建中的裁剪检查

- 精确的信号是「打包结果中有哪些 able」而不是字节数：每个 able 在未压缩的产物中都是顶层的对象字面量（一级缩进处有 `name: "xxx"`）或 `makeAble("xxx", ...)` 调用，按这个形状识别（不会把 Vue 组件的 `name: "moveable"` 当作 able，也不用硬编码 able 列表；全量结果中一个都识别不到时失败，防止输出格式变化后检查空转）。检查脚本打包一段只组合 Draggable、Resizable、Rotatable 的代码（不压缩），断言除这三个和每个 Moveable 都有的 able（Groupable、IndividualGroupable、DragArea、BeforeRenderable、Renderable；Default 的 name 是空串）之外的 able 名都不出现；再压缩打包「组合 3 个 able」和「默认导出」，断言前者不超过后者的 75%（实测约 0.66），作为宽松的兜底。不用绝对字节数，避免随功能变化漂移。
- 工具：用 tsdown 的 `build()` API（三个包都已声明 tsdown；esbuild、rolldown 没有直接声明，在严格布局下不能 import，单独声明还会和 tsdown 锁定的 rolldown 版本冲突）。示例代码用绝对路径 import 本包 `dist/moveable.esm.js`；本仓库的包（`@moveable-next/*`）一起打包，第三方依赖作为外部模块：原生版、Vue 版的产物只是包装，able 在 croact-moveable 的产物中，只打包本包时检查会空转。`write: false`，`outDir` 指向临时目录（tsdown 构建前会清空 `outDir`，默认是本包的 `dist`）。
- 位置：一份共用的 `config/check-tree-shaking.mjs`，在包目录中执行（各包的 `test:tree-shaking` 脚本），tsdown 从执行它的包解析，根目录不需要声明 tsdown（与 `config/build.mjs` 不引入第三方包的做法一致）；接在 react-moveable、moveable、vue3-moveable 的 `build` 脚本最后。CI 的 `pnpm packages:build` 会执行。三个包的检查逻辑相同，所以不在各包中各写一份。
- 只用 rolldown 检查的局限（已验证不存在）：原以为根 4（able 字面量中的调用）只有 esbuild 不能分析。实测临时去掉 `getRenderDirections` 的标注后，rolldown 下检查失败（Scalable 被保留），所以不需要另加 esbuild。

### 6. Storybook 与文案

TreeShaking story 写 `VueTreeShakingApp.vue`（用 `@/vue3-moveable` 的 `makeMoveable`），去掉 `tags: ["react-only"]` 和 `vue: false`。React 示例中「30% size reduction」改为不带数字的说法（例如「smaller bundle」），具体数字由检查脚本的输出和 ROADMAP 记录。`react-only` 机制本身保留（`appStory` 的 `vue: false`、vitest 的 `tags.exclude`），CLAUDE.md 写明目前没有使用。

## Risks / Trade-offs

- [`Moveable.defaultAbles` 从可赋值的静态属性变为只读 getter] → 仓库内没有赋值，也不是文档中的 API；在 changeset 中写明。需要自定义 able 的使用者应使用 `makeMoveable`。
- [原生版原型访问器在第一个实例创建前不存在] → 没有已知用法依赖它；原生版测试中加一个「组合部分 able 的类，实例上有对应访问器」的用例。
- [原生版的类型推导（从 `T` 推出选项和事件）比较复杂] → 在 `test/types.ts` 中为默认 `Moveable` 和 `makeMoveable<DraggableProps>` 各写正反用例（含 `@ts-expect-error`），并跑 `checkTypes.mjs`。
- [rolldown 检查发现不了只有 esbuild 才有的回归] → 见决策 5 的最后一条。
- [裁剪检查让每个包的构建多花几秒] → 只打包三次小示例，可接受。

## Migration Plan

与尚未发布的 0.2.0 合并发布（changesets 的版本 PR 会自动更新）。默认导出的用法不变，使用者无需改动；想减小体积的使用者改用 `makeMoveable` 和具名 able。回滚就是回退本 change 的提交。
