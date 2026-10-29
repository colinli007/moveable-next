## Why

`makeMoveable(ables)` 让使用者只组合需要的 able，打包时不带上其余 able。目前只有 React 版提供它，原生版和 Vue 3 版只能使用全部 able；Storybook 的 TreeShaking story 因此是唯一只有 React 版的 story。更严重的是，React 版本身也已经起不到作用：用 esbuild 打包，`makeMoveable([Draggable, Resizable, Rotatable])` 和默认的 `Moveable` 体积完全相同（约 210KB）。原因是产物的语法目标改为 ES2022 后（路线图第 3 步），类的静态字段被编译成静态块，打包工具把它当作副作用，默认 `Moveable` 和它引用的全部 able 都删不掉；上游 0.56.0 的 ES5 产物可以删掉。

## What Changes

- **恢复 React 版的 tree-shaking**：默认 `Moveable` 和 `makeMoveable` 返回的类改用 `static get defaultAbles()`（不再是静态字段），默认导出仍是 class，类型不变；在 `makeAble` 和 able 对象字面量中被调用的 3 个辅助函数（`getRenderDirections`、`getDirectionViewClassName`、`getDirectionCondition`）上标注 `/*#__NO_SIDE_EFFECTS__*/`。只用 3 个 able 时 moveable 自身代码约减少 1/3，只用 Draggable 约减少一半，全量不变。
- **原生版新增 `makeMoveable(ables)`**：返回只包含这些 able 的原生 Moveable 类（`new` 的用法、选项属性、事件、方法与默认 `Moveable` 相同，选项和事件按组合的 able 确定）。默认 `Moveable` 仍是 class，模块顶层的 `@Properties` 装饰器改为第一次构造时按类的 able 生成原型上的访问器和方法代理，这样只引入 `makeMoveable` 时不会带上全部 able。原生版新增导出与 React 版相同的 10 个 able：`Draggable`、`Resizable`、`Scalable`、`Rotatable`、`Warpable`、`Clippable`、`EdgeDraggable`、`Snappable`、`Roundable`、`Pinchable`；UMD 中挂在默认导出上（`Moveable.makeMoveable([Moveable.Draggable])`）。
- **Vue 3 版新增 `makeMoveable(ables)`**：返回只包含这些 able 的 Vue 组件；它显式导出，覆盖从原生版 `export *` 带来的同名函数。默认组件改为 `/*#__PURE__*/ makeMoveable(全部 able)`。10 个 able 经原生版的 `export *` 一并导出。
- 三个包的 `makeMoveable<T>` 泛型含义一致（`T` 是组合的 able 的选项和事件类型，与 React 版相同）。
- **构建中检查 tree-shaking**：react-moveable、moveable、vue3-moveable 的构建最后各执行一次检查（共用 `config/check-tree-shaking.mjs`）：用只组合 3 个 able 的示例打包产物，断言没有组合的 able 不出现在结果中，并断言体积不超过全量的固定比例（防止出现新的副作用）。检查失败时构建失败，CI 的全量构建会执行。
- Storybook：TreeShaking story 写 Vue 版，去掉 `react-only` 和 `vue: false`，不再有只有 React 版的 story；示例文案中写死的「30%」改为不带具体数字的说法。
- 更正 CLAUDE.md 中 `useDefineForClassFields: false` 的理由。
- **BREAKING**（极小）：`Moveable.defaultAbles`（React 版，未写进文档）从可赋值的静态属性变为只读 getter。
- 不做：导出更多 able（如 `OriginDraggable`、`Scrollable`）；进一步缩小「只用一个 able」时的固定开销（组相关的类、snap 辅助函数总会被引用，约 77KB，记入路线图）；不写泛型时从 able 元组推断精确类型的重载。

## Capabilities

### New Capabilities

无

### Modified Capabilities

- `framework-packages`：新增「按需组合 able」（三个包的 `makeMoveable` 及其打包效果）；修改「Storybook 示例提供 React 和 Vue 3 两个版本」，删除 TreeShaking 的例外。
- `library-build`：新增「产物支持按 able 裁剪」（构建中的 tree-shaking 检查）；修改「原生 moveable 的装饰器属性在产物中可用」（原型访问器不再由顶层装饰器生成）。

## Impact

- react-moveable：`src/Moveable.tsx`、`src/makeMoveable.ts`（static getter）、`src/ables/AbleManager.ts`、`src/renderDirections.tsx`、`src/utils.tsx`（标注），`src/InitialMoveable.tsx`（新增返回全部生效 able 的静态方法 `getAllAbles()`）、`src/types.ts`（导出默认 able 的 Props 类型 `DefaultAbleProps`），供原生版推导事件列表和类型；`ables/Snappable.tsx`、`Scrollable.ts`、`Roundable.tsx` 的推断类型改为与 `Able` 相符，原生版才能写出 able 的类型；`build` 脚本。`declaration/` 中 `defaultAbles` 的声明形状变化。新增共用的 `config/check-tree-shaking.mjs`。
- moveable：`src/MoveableManager.tsx`（懒初始化、`static get ables()`）、`src/InnerMoveable.tsx`（渲染按 able 生成的组件）、`src/Moveable.tsx`、新增 `src/makeMoveable.ts`、able 的导出（显式类型注解，避免类型声明引入 React）、`src/index.ts`、`test/types.ts`、`build` 脚本和浏览器测试用例。
- vue3-moveable：`src/VueMoveable.ts`（工厂化）、`src/index.ts`、`test/types.ts`、`build` 脚本和浏览器测试用例。
- Storybook：`stories/8-TreeShaking/`（Vue App、story、文案）。
- changeset：react、vanilla、vue3 为 minor（新 API），四个包是 fixed 组，与尚未发布的 0.2.0 合并；helper 不变。
- 文档：三个包的 README（`makeMoveable` 用法）、CLAUDE.md（`useDefineForClassFields` 的理由、构建中的检查、`react-only` 现状）、ROADMAP（第 9 步、77KB 固定开销作为后续项）。TypeDoc 中新增的函数和 able 需要注释。
