## Why

lit-moveable 还停在 Lit 2.6（2023 年初的版本）。Lit 2 已不再维护，Lit 3 是当前的主版本。lit 也没有被声明为 peerDependency：它只是开发依赖，构建配置里靠 `neverBundle` 让它保持外部模块，`library-build` spec 中也为此留着「框架运行时」的例外。另外，三个框架包装（lit、vue3、svelte）都没有任何运行时测试，bake 生成的 lit 示例只是代码 tab 中的文本，从来没有执行过，升级坏了不会有任何检查发现。

这是 ROADMAP 第 4 步「框架包装升级」拆分出的第一个 change，后面依次是 Vue 工具链和 Svelte 5。Lit 风险最小，先用它确定框架包装的浏览器测试的做法，后两个 change 沿用。

## What Changes

- 给 lit-moveable 增加浏览器冒烟测试（Vitest 浏览器模式 + Playwright chromium，和 react-moveable 的 story 测试一样），由根目录 `pnpm test` 汇总执行，CI 自动覆盖。测试针对包的构建产物，检查：渲染出控制框、属性更新传给内部的 Moveable、拖动时派发 `lit` 前缀的事件、方法代理可以调用、元素移除后销毁。先在 Lit 2 上让测试通过，再升级，用同一组测试验证升级前后行为一致
- 修正一个已有的 bug：`updated()` 中把 `propName === "litDraggable"` 误写成了 `"litMoveable"`，导致首次渲染后再修改 `litDraggable` 不会生效。测试覆盖这一点。这是行为修正：修改后，运行时切换 `litDraggable` 会生效
- lit 升到 **3**：`peerDependencies` 声明 `lit: ^3.0.0`，开发依赖改为 `^3.3.3`。**BREAKING**：使用者需要 Lit 3（npm 7+ 和 pnpm 会自动安装 peer）
- 构建配置中删除 lit 的 `neverBundle`：声明为 peer 后它自然是外部模块。UMD 产物照旧内联全部依赖，内联的 lit 从 2 换成 3
- `library-build` spec「外部依赖与声明一致」的框架运行时例外中去掉 lit
- 源码不需要因 Lit 3 修改：已确认 Lit 3 的 `property()`、`customElement()` 仍然支持 `experimentalDecorators` 的旧版调用方式，在 `customElements.define` 之后再调用 `createProperty` 也仍然会定义访问器（`framework-utils` 的 `@Properties` 依赖这一点）
- 修正 README：安装说明写明需要 lit 3；文档和示例中把不存在的 `litMoveable` 改为 `litDraggable`（照现在的示例写，目标拖不动）；修正示例的 import 错误，删除指向已不存在的 rollup demo 的开发说明

不在本次范围：
- Vue 工具链升级、Svelte 5（各自单独的 change）
- lit-moveable 的其它已有问题（见 design 的 Non-Goals），除上面的 `litDraggable` 外不改变行为
- react-moveable 的 React peer 范围（第 6 步）

## Capabilities

### New Capabilities

（无）

### Modified Capabilities

- `framework-packages`：新增「lit-moveable 的行为」（渲染、属性、事件、方法、销毁，以及 Lit 3 peer 声明）和「框架包装的浏览器测试」（含失败截图）两条 requirement
- `library-build`：「外部依赖与声明一致」的框架运行时例外中去掉 lit-moveable 的 `lit`
- `monorepo-tooling`：「CI 执行全部自动化检查」增加框架包装的浏览器测试

## Impact

- lit-moveable：`package.json`（peer、开发依赖、测试依赖）、`tsdown.config.mts`、`src/LitMoveable.ts`（`litDraggable` 修正）、新增 `vitest.config.mts` 和 `test/`、README
- 根目录：`pnpm test` 会多执行 lit-moveable 的测试。这些测试读取构建产物，因此执行前需要先 `pnpm packages:build`（CI 已经是这个顺序）
- `pnpm-lock.yaml`：lit 2 → 3，新增 lit-moveable 的 vitest、playwright 依赖（与 react-moveable 同版本）
- 文档与 CI：`CLAUDE.md`（测试前需要构建、lit 版本）、`.github/workflows/run-e2e.yml` 中测试步骤的注释、`openspec/ROADMAP.md`
- 其它包的产物、Storybook 不受影响；bake 生成的 lit 示例用法（`.litDraggable`、`@litDrag`）不变
