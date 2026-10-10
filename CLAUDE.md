# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 仓库概况

Moveable（daybrush/moveable 的 fork）：给 DOM/SVG 元素提供拖拽、缩放、旋转、变形、吸附、分组等交互的库，同一套核心逻辑发布为 React / Preact / 原生 JS / Vue2 / Vue3 / Svelte / Lit / Angular 多个包。

- 包管理：仓库现状是 **yarn 1 workspaces + lerna（independent 版本）**，有 `yarn.lock`，`lerna.json` 的 `npmClient` 为 yarn；CI 用 Node 16。
- TypeScript 锁定在 `^4.8 <4.9`（根 `resolutions` 强制），不要用 4.9+ 语法。
- 需求/设计走 OpenSpec 工作流（`openspec/`、`.claude/skills/openspec-*`、`/opsx:*` 命令）。

## 常用命令

几乎所有开发都在 `packages/react-moveable` 里进行（根脚本基本是转发过去的）：

```bash
# 根目录
yarn                       # 安装依赖
yarn storybook             # = react-moveable 的 storybook（端口 6006），主要的开发/调试环境
yarn build                 # 只构建 react-moveable
yarn packages:build        # 构建 react-moveable → 生成 Angular 输入输出常量 → lerna 构建其余包

# packages/react-moveable
yarn lint                  # eslint ./src
yarn test:type             # tsc -p tsconfig.test.json，对 tests/types.ts 做类型断言检查
yarn build                 # lint + test:type + rollup + declaration
yarn test:ci               # 构建测试版 storybook 并用 @storybook/test-runner（Playwright）跑所有 play 交互测试
yarn test                  # 对已在 6006 端口运行的 storybook 跑 test-runner（本地调试单个用例：开着 yarn storybook，在 Interactions 面板看对应 story 的 play）
```

测试即 storybook story 的 `play` 函数（`stories/**/*.stories.tsx`，用 `stories/utils/testing.tsx` 的 `pan`/`pinch`/`rotate` 模拟手势，再断言 `style.transform`）。环境变量约定（见 `stories/utils/story.tsx`、`.storybook/test-runner.js`）：
- `EXEC_TEST=true`：测试构建，没有 `play` 的 story 渲染为空。
- `SKIP_TEST=true`：生产/文档构建，不挂 `play`；test-runner 在此模式下给每个 story 截图到 `__snapshots__/`（CI 失败时用于对比）。

`yarn bake`（croffle）会把 React story 自动转译成 vanilla/vue2/vue3/svelte/angular/lit 版本的示例代码，生成在各 story 目录的子文件夹里，不要手改这些生成目录。

## 架构

### 包依赖链

```
react-moveable  ← 全部核心逻辑（React class 组件）
 ├─ preact-moveable   直接复用 react-moveable 源码，换 preact-css-styled
 ├─ croact-moveable   用 rollup-plugin-react-compat 把 react 别名到 croact（轻量 React 兼容运行时）
 │    └─ moveable     原生 JS 版：croact 的 renderSelf 渲染 InnerMoveable，
 │         │          @Properties 装饰器按 MOVEABLE_PROPS / EVENTS / METHODS 自动生成 getter/setter/方法代理
 │         └─ vue-moveable / vue3-moveable / svelte-moveable / lit-moveable   包装原生 moveable
 └─ ngx-moveable     inputs/outputs 由 config/update-type-consts.js 从 react-moveable 的 dist 生成
helper、snappable   独立工具包
```

因此：**改行为只改 `react-moveable`**，其它包自动继承；新增 prop/事件必须登记在对应 able 的 `props` / `events` 数组里，才会进入 `MOVEABLE_PROPS` / `MOVEABLE_EVENTS`，进而被原生版、各框架包装和 Angular 自动暴露。

### Able 插件体系（核心）

所有功能（Draggable、Resizable、Rotatable、Snappable、Groupable……）都是 `src/ables/` 下的 Able 对象，不是组件。接口与自定义示例见 `src/ables/README.md`。

- `src/ables/consts.ts` 的 `MOVEABLE_ABLES` 定义默认 able 及**顺序**（顺序即事件执行顺序：`BeforeRenderable` 最先，`Snappable` 在 `Draggable`/`Resizable` 等之前以便修正位移，`Renderable` 最后）。`MOVEABLE_PROPS/EVENTS` 由它归约得出。
- `makeMoveable(ables)` 可只组合部分 able（tree-shaking），默认 `Moveable` 即 `InitialMoveable` + 全部 able。
- Able 钩子按「操作 × 作用对象 × 阶段」命名：`drag` / `dragControl` / `dragGroup` / `dragGroupControl`（以及 pinch 对应）× `Start` / `` / `End`，可选 `*Condition` 决定是否参与、`render` 渲染控件、`request` 支持程序化调用（`moveable.request(...)`）。

### 渲染与事件流

1. `InitialMoveable`（`src/InitialMoveable.tsx`）解析 `target`/`targets`（含选择器、ref），按情况渲染：
   - 单目标 → `MoveableManager`
   - 多目标/`groupable` → `MoveableGroup`（内部为每个子目标挂一个 `MoveableManager`，组 rect 由子 rect 计算）
   - `individualGroupable` → `MoveableIndividualGroup`（多个独立 manager）
   切换单/组时会把旧 manager 的 state 作为 `firstRenderState` 传递。
2. `MoveableManager` 负责测量（`updateRect`，矩阵栈计算见 `src/utils/calculateMatrixStack.ts`、`getMatrixStackInfo.ts`）、渲染控制框并创建两个 Gesto：`targetGesto`（拖目标）和 `controlGesto`（拖控制点）。
3. `src/gesto/getAbleGesto.ts` 的 `triggerAble` 把 Gesto 事件分发到所有带对应钩子的 able：每个 able 有独立的 `datas`，able 回调里通过 `fillParams`/`triggerEvent`（`src/utils.tsx`）触发用户事件（如 `onDrag`）。拖动中事件后还会再触发一轮 `*After`，结束后 `updateRect` + `forceUpdate`。
4. 样式通过 `react-css-styled` 注入（croact/preact 版替换成对应实现），类名统一加 `moveable-` 前缀（`src/utils.tsx` 的 `prefix`）。

### 类型

`src/types.ts`（数千行）是所有 props、事件参数、`MoveableManagerInterface` 的唯一来源；`tests/types.ts` 用于编译期类型断言（`yarn test:type`）。
