## 1. 先写会失败的检查（design 决策 5）

- [x] 1.1 新增共用的 `config/check-tree-shaking.mjs`（react-moveable 的 `test:tree-shaking`）：用 tsdown 的 `build()` 打包「只组合 Draggable、Resizable、Rotatable」和「默认导出」两段示例（import 本包 `dist/moveable.esm.js`，本仓库的包一起打包、第三方依赖外部化，输出到临时目录），断言前者不含其它 able 的 `name`、压缩后体积不超过后者的 75%，失败时打印保留的 able 和体积；在 `build` 脚本最后执行。在当前代码上运行，确认失败并列出全部 able
- [x] 1.2 验证检查对根 4（able 字面量中的调用）的敏感度：在决策 1 完成之后，临时去掉 `getRenderDirections` 的标注，确认检查失败；如果 rolldown 下检查不出，按 design 决策 5 的最后一条处理（先停下来确认是否增加 esbuild 打包）

## 2. 恢复 React 版的裁剪（design 决策 1）

- [x] 2.1 `src/Moveable.tsx`、`src/makeMoveable.ts` 改用 `static get defaultAbles()`；`ables/AbleManager.ts` 的 `makeAble`、`renderDirections.tsx` 的 `getRenderDirections`、`utils.tsx` 的 `getDirectionViewClassName`、`getDirectionCondition` 加 `/*#__NO_SIDE_EFFECTS__*/`；构建后确认产物中这些标注存在、默认 `Moveable` 没有静态块，1.1 的检查通过（输出体积），`tests/types.ts`（`test:type`）和 `typecheck:stories` 通过
- [x] 2.2 croact-moveable 构建后，用 1.1 的方法对 `packages/croact-moveable/dist/moveable.esm.js` 手动打包一次，确认标注保留、同样裁剪（不新增脚本）
- [x] 2.3 `InitialMoveable` 新增静态方法（`getTotalAbles()` 加 BeforeRenderable、Renderable）并导出默认 able 的 Props 类型（现在未导出的 `DefaultAbles`），带 TSDoc 注释；`pnpm doc` 无警告

## 3. 原生版的 `makeMoveable`（design 决策 2、4）

- [x] 3.1 先写测试：`test/Moveable.spec.ts` 增加用例：`makeMoveable([Draggable, Resizable, Rotatable])` 的实例可拖动、缩放、旋转，`drag`、`resize`、`rotate`、`render` 事件触发，`scalable` 等未组合的选项不生效；实例上有 `draggable` 访问器和方法代理；默认 `Moveable` 的现有用例不变。`test/types.ts` 增加 `makeMoveable<DraggableProps & ResizableProps & RotatableProps>` 的正反类型用例（含 `@ts-expect-error`）。在当前代码上确认失败
- [x] 3.2 `src/MoveableManager.tsx`：去掉顶层 `@Properties`，新增 `protected static get ables()` 和懒初始化的静态方法（按 `InitialMoveable` 的新静态方法推导选项、事件，定义原型访问器和方法代理，按构造函数缓存），构造函数改用它的结果；`src/InnerMoveable.tsx` 渲染传入的组件类；`src/Moveable.tsx` 用 `static get ables()` 返回 `MOVEABLE_ABLES`；新增 `src/makeMoveable.ts`；`src/index.ts` 导出 `makeMoveable` 和 10 个 able（显式类型注解）。`pnpm --filter @moveable-next/vanilla build`（含 `checkTypes.mjs`）通过，3.1 的测试和原有测试全部通过
- [x] 3.3 moveable 的 `build` 最后执行同一个检查（`test:tree-shaking`），确认通过；UMD 产物中 `Moveable.makeMoveable`、`Moveable.Draggable` 存在（在测试中用 UMD 或手动检查）

## 4. Vue 版的 `makeMoveable`（design 决策 3、4）

- [x] 4.1 先写测试：`test/VueMoveable.spec.ts` 增加 `makeMoveable([Draggable, Resizable, Rotatable])` 组件的用例（prop、事件、ref 方法、只有组合的 able 生效）；`test/types.ts` 增加 `makeMoveable<DraggableProps>` 组件的类型用例。在当前代码上确认失败
- [x] 4.2 `src/VueMoveable.ts` 改为 `makeMoveable(ables)` 工厂（从原生类取选项和事件），默认组件为 `/*#__PURE__*/ makeMoveable(MOVEABLE_ABLES)`；`VueMoveableComponent` 改为泛型；`src/index.ts` 显式导出 `makeMoveable`。`pnpm --filter @moveable-next/vue3 build`（含类型测试）和该包测试全部通过
- [x] 4.3 vue3-moveable 的 `build` 最后执行同一个检查（`test:tree-shaking`），确认通过

## 5. Storybook

- [x] 5.1 `stories/8-TreeShaking/` 新增 `VueTreeShakingApp.vue`（`@/vue3-moveable` 的 `makeMoveable` 组合三个 able），story 去掉 `react-only` 和 `vue: false`、glob 改为与其它 story 相同；React 示例的「30% size reduction」改为不带数字的说法；两种模式下测试通过，截图对比一致，Vue 代码 tab 显示 `@moveable-next/vue3`
- [x] 5.2 全部 story 测试：React 138 个、Vue 138 个通过；全量截图对比除已知原因（View Container 的亚像素差异）外一致

## 6. 收尾

- [x] 6.1 全量检查：`pnpm lint`、`pnpm doc`、`pnpm packages:build`（含三个裁剪检查）、`pnpm --filter @moveable-next/react typecheck:stories`、`pnpm test` 全部通过；`pnpm build:storybook` 成功
- [x] 6.2 changeset：react、vanilla、vue3 各一份 minor（React：恢复裁剪、`defaultAbles` 改为 getter；原生版：`makeMoveable` 和 10 个 able；Vue 版：`makeMoveable`）；`pnpm changeset status` 显示 fixed 组升到 0.2.0、helper 不变
- [x] 6.3 文档：三个包的 README 写 `makeMoveable` 用法（原生版含 UMD 写法）；CLAUDE.md 更正 `useDefineForClassFields: false` 的理由，写明构建中的裁剪检查、`react-only` 目前没有使用，以及「静态字段会编译成静态块、不能直接写静态字段」的约束；ROADMAP 第 9 步改为已完成，新增「降低约 77KB 的固定开销」作为后续项
- [x] 6.4 `openspec validate add-make-moveable-to-vanilla-and-vue --strict` 通过
