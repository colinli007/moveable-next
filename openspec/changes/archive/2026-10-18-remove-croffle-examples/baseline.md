# 基线与验证记录

## 1.1 改动前的状态

### 代码 tab

用临时的 Vitest 浏览器测试（独立配置，只导入全部 `*.stories.tsx`，不提交）导出每个 story 的 `parameters.preview`，按 `<story 文件>#<export 名>` 保存为 JSON（scratchpad 中的 `preview-before.json`）。

- 带代码预览的 story：137 个
- 各 tab 的代码条数：React 137、CSS 137、Script 262（HTML + JavaScript 两份，131 个 story）、Vue3 133、Svelte 133、Lit 131

### 依赖来源（`pnpm why typescript@4.5.5 glob inflight -r`）

```
glob@8.1.0          <- @croffle/bakery@0.0.25 <- react-moveable (devDependencies)
glob@13.0.6         <- @joshwooding/vite-plugin-react-docgen-typescript <- @storybook/react-vite
inflight@1.0.6      <- glob@8.1.0 <- @croffle/bakery@0.0.25
typescript@4.5.5    <- croffle@0.0.21 <- react-moveable (devDependencies)
```

TypeScript 4.5.5、glob 8、inflight 都只来自 croffle；glob 13 来自 Storybook，与本 change 无关。

### `pnpm test`

27 个测试文件（26 个通过，1 个跳过），162 个用例全部通过：

| 包 | 用例数 |
|---|---|
| react-moveable | 142（137 个 story + 5 个 code-preview 单元测试） |
| svelte-moveable | 8 |
| lit-moveable | 5 |
| vue3-moveable | 5 |
| helper | 2 |

## 2. 删除 croffle

- 2.1：生成目录都不在 git 跟踪中（`git ls-files` 匹配 0 个），按 croffle 的清理范围删除后，`find` 找不到 script / vue3 / svelte / lit 目录；删除忽略和 `exclude` 规则后，`git status` 中没有未跟踪的生成文件。
- 2.2：`pnpm install` 移除 13 个包，锁文件减少 106 行，没有打印已弃用警告。`pnpm why typescript@4.5.5 glob inflight -r` 只剩 Storybook 带来的 glob 13，TypeScript 4.5.5、glob 8、inflight 都已移除；锁文件中搜不到 `croffle`；`pnpm lint` 通过。仓库中剩下的 `croffle` 字样都在任务 3、5 要改的文件里（`story.tsx`、`render.test.ts`、`CLAUDE.md`、`ROADMAP.md`），在 6.1 中统一复查。

## 3. 代码面板

- 3.1：`typecheck:stories` 通过。另外把 `.storybook/main.ts` 中列出 6 个 tab 的注释改为 `React / CSS`（tasks 中没有单列）。
- 3.3：code-preview 单元测试 4 个通过（删除占位符用例后从 5 个变为 4 个）。
- 3.4：用 1.1 中同样的方法重新导出，与基线对比：
  - 137 个 story 的键完全相同；
  - tab 只剩 React（137 条）和 CSS（139 条）；
  - 所有 story 的 React tab 与基线完全相同，默认 CSS 也完全相同；
  - 只有 `99-Tests` 的 `TestsChangingSnapContainer`、`TestsSafari` 两个 story 的 CSS tab 多了一条，描述分别是 `snap.css`、`safari.css`，内容与文件逐字相同。

  对比后已删除临时测试和临时配置。

## 4. svelte-moveable 去掉 `on:`

- 4.1：`src/` 和构建后的 `dist/Moveable.svelte` 中都搜不到 `dispatch`。
- 4.2：`pnpm --filter svelte-moveable build` 通过（svelte-check 0 错误 0 警告，类型测试 0 错误）；`svelte-moveable (*)` 两个 project 共 8 个用例通过，与基线相同。publint 提示 `repository.url` 可以写成完整的 git URL，改动前就有，与本 change 无关。

## 6. 全量检查

### 6.1

| 命令 | 结果 |
|---|---|
| `pnpm lint` | 通过 |
| `pnpm doc` | 通过 |
| `pnpm packages:build` | 通过（svelte-moveable 的 svelte-check 0 错误 0 警告） |
| `pnpm --filter react-moveable typecheck:stories` | 通过 |
| `pnpm build:storybook` | 通过，不再先执行 bake |
| `pnpm test` | 27 个测试文件（26 个通过，1 个跳过），161 个用例全部通过 |

用例数与基线对比：react-moveable 141（137 个 story 与基线相同，code-preview 单元测试从 5 个减到 4 个，删掉的是占位符那条）；svelte-moveable 8、lit-moveable 5、vue3-moveable 5、helper 2，都与基线相同。执行后 story 目录中没有 script / vue3 / svelte / lit 子目录。

仓库中（排除 `openspec/changes/`、各 `CHANGELOG.md`、锁文件，以及叙述本 change 历史的 `ROADMAP.md`）搜不到 `croffle`、`pnpm bake`、`$preview_`、`LegacyUsage`。

### 6.2

用 `pnpm storybook` 启动开发服务（不再先执行 bake），在浏览器中检查：

- Basic / Draggable：代码面板只有 React 和 CSS；在 Controls 中关闭 `draggable` 后，React tab 中的 `draggable={true}` 变为 `draggable={false}`。
- Variable Situations / Test Changing Snap Container：CSS tab 中先是默认样式，再是说明为 `snap.css` 的 `.snapGrid { ... }`。
- Combination with Other Components / Use Selecto：只有 React 和 CSS；React tab 的 import 是 `react`、`react-selecto`、`react-moveable`。

## 7. 评审后的修改

独立评审（只读）没有发现必须改的问题，按两条建议修改：

- spec 中「React 代码就是渲染的代码」原来写「只在两处不同」，实际还有第三处：`App(props: Record<string, any>)` 变成 `App()`。要求和场景都改为列出三处转换，`CLAUDE.md` 的说明同步更新。`openspec validate --strict` 通过。
- `story.tsx` 识别样式 import 的正则从只认 `import "./x.css";` 放宽为单双引号、有无分号都认（`^import\s+["'](\.\/[^"']+\.css)["'];?$`），保留行首锚点，所以被注释掉的 `// import "./App.css";` 仍然不匹配。对全部 136 个 App 源码，新旧正则的匹配结果完全相同（只有 `snap.css`、`safari.css`）；`typecheck:stories` 通过，`99-Tests` 的 34 个 story 测试和 4 个 code-preview 单元测试通过。
