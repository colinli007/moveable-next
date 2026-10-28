## Why

Vue 3 是仓库支持的三种用法之一（上游一周下载量 7114），但 Storybook 中没有任何 Vue 示例：第 5 步删除了 croffle 翻译生成、从未经过检查的 Vue3 代码 tab，之后只剩 React 和 CSS。Vue 用户只能对着 React 代码自己改写。vue3-moveable 的包装也只有 `test/VueMoveable.spec.ts` 中少量的用例，没有在真实的示例场景中用过，比如组件没有声明 `emits`，与原生 DOM 事件同名的监听器（`@click`、`@drag`）会同时被挂到根元素上，`@click` 除了 moveable 的 click 事件，还会收到控制框上的原生 click。

## What Changes

- Storybook 工具栏增加「框架」切换（React / Vue）。同一个 story 在 Vue 模式下渲染这个 story 的 Vue 3 App，代码面板显示 Vue 和 CSS tab；React 模式与现在相同。story 的定义、id、参数（controls）和 play 断言只有一份，两种模式共用。
- 为 137 个 story 中的 136 个手写 Vue 3 示例（SFC，`<script setup lang="ts">` + 模板），与对应的 React App 放在同一目录。唯一的例外是 TreeShaking：它演示的 `makeMoveable` 在原生版和 Vue 3 版中都没有，Vue 模式下显示「Vue 3 版暂不支持按 able 组合」。除了这个例外，缺少 Vue 版的 story 会直接报错。
- 交互测试在 React 和 Vue 下各跑一遍：每个 story（Vue 下除 TreeShaking 外）都真实渲染并计入结果，带 play 的执行同一组断言。测试从 137 个增加到 273 个。
- Vue 示例的代码 tab 与 React tab 规则相同：显示的就是被渲染、被测试的源码，只把仓库内部的路径别名换成 `@moveable-next/vue3`、把 `props.xxx` 换成当前参数值、去掉 `defineProps` 的声明。
- 新增 Vue 示例的类型检查（vue-tsc），在 CI 中与 stories 的类型检查一起执行。
- 修复移植示例时发现的 vue3-moveable 包装问题，已知的一个是缺少 `emits` 导致事件监听器同时挂在根元素的原生事件上。每个修复在 `test/VueMoveable.spec.ts` 中补用例，并为 `@moveable-next/vue3` 加 changeset。
- 不做：给原生版和 Vue 3 版增加 `makeMoveable`（路线图另列一步）；Vue 2；把 React 示例自动翻译成 Vue（仍然禁止）。

## Capabilities

### New Capabilities

无

### Modified Capabilities

- `framework-packages`：代码面板从「只有 React 和 CSS」改为随框架切换，增加 Vue tab 的规则；新增「Storybook 示例提供 React 和 Vue 3 两个版本」；vue3-moveable 的事件监听器不能同时挂到根元素的原生事件上。
- `monorepo-tooling`：Storybook 交互测试改为每个 story 在两种框架下各测一遍；CI 中 story 代码的类型检查包括 Vue 示例。

## Impact

- react-moveable 的 Storybook：`.storybook/preview.tsx`（框架切换）、`.storybook/main.ts`（加入 Vue 的 Vite 插件）、代码面板 addon（按框架筛选 tab）、`stories/utils/story.tsx` 和 `stories/utils.ts`（配对 Vue App、Vue 模板转换）、20 个 story 文件（glob 和 TreeShaking 的标记）、`vitest.config.mts`（增加 Vue 的测试 project）、`tsconfig.json`（Vue 包装的路径别名）、新增 Vue 示例的 tsconfig 和 `typecheck` 脚本。
- 新增 136 个 `Vue*App.vue`。
- react-moveable 的 devDependencies 增加 `vue`、`@vitejs/plugin-vue`、`vue-tsc`，以及 Vue 示例用到的周边包（视验证结果是 vue3-selecto、vue3-infinite-viewer，或原生的 selecto、infinite-viewer）；`vue` 移入 catalog。可能需要为没有声明 `vue` 的周边包加 `packageExtensions`。
- vue3-moveable：`src/VueMoveable.ts` 的修复和对应测试；一份 `@moveable-next/vue3` 的 patch changeset（fixed 组，四个包一起升版本）。
- 开发流程：Vue 模式依赖原生版的构建产物，第一次切到 Vue 模式前要先 `pnpm packages:build`；React 模式不受影响。测试耗时大约翻倍。
- CI：`run-e2e.yml` 的类型检查步骤加上 Vue 示例。
- 文档：CLAUDE.md（story 写法约定、命令）、ROADMAP（第 7 步，新增「原生版和 Vue 3 版的 `makeMoveable`」一步）。
