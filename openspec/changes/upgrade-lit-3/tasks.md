## 1. Lit 2 下的产物基线

- [x] 1.1 执行 `pnpm packages:build`，按 `archive/2026-10-12-replace-build-with-tsdown/baseline.md` 的方法记录 lit-moveable 的产物基线：ESM 和 CJS 的导出名、CJS `require` 后的形状、ESM/CJS 的外部模块清单、UMD 的全局变量名和内联的包（含 lit 版本）、`declaration/` 的文件列表、头部注释。原始结果存到 scratchpad。验证：基线已写入本 change 目录的 `baseline.md`，外部模块清单为 `lit`、`lit/decorators.js`、`moveable`、`framework-utils`、`@daybrush/utils`

## 2. 浏览器测试（在 Lit 2 上）

- [x] 2.1 lit-moveable 的 devDependencies 新增 `vitest 5.0.3`、`@vitest/browser-playwright 5.0.3`、`playwright ^1.64.0`；新增 `vitest.config.mts`（design 决策 2：project 名 `lit-moveable`，浏览器模式、playwright、chromium、headless，`include: ["test/**/*.spec.ts"]`，不写 `screenshotFailures`）。执行 `pnpm install`。验证：`pnpm why playwright` 显示 lit-moveable 和 react-moveable 解析到同一个版本；在根目录执行 `pnpm exec vitest list --project lit-moveable --filesOnly` 能列出 `[lit-moveable (chromium)]` 的测试文件（不加 `--filesOnly` 时浏览器模式的 project 会报「No test suite found」，不代表配置有问题）
- [x] 2.2 新增 `test/LitMoveable.spec.ts`，按 design 决策 3 的表写 5 组测试，import `../dist/moveable.esm.js`，拖动用鼠标事件模拟（辅助函数写在测试文件内）；每个元素只移除一次（design Non-Goals）。在根目录执行 `pnpm exec vitest run --project lit-moveable`。验证：除「`litDraggable = false` 后不再派发拖动事件」外全部通过；这一条的失败信息记入 `baseline.md`，确认失败原因是修改被忽略，而不是测试本身写错（例如在测试中临时改为设置 `mvDraggable = false`，应当通过，确认后改回）
- [x] 2.3 修正 `src/LitMoveable.ts` 中 `updated()` 的 `"litMoveable"` 为 `"litDraggable"`。重新构建 lit-moveable 后执行同样的命令。验证：全部测试通过；`pnpm lint` 通过

## 3. 升级到 Lit 3（design 决策 5、6）

- [x] 3.1 lit-moveable 的 `package.json` 新增 `peerDependencies: { "lit": "^3.0.0" }`，devDependencies 的 `lit` 改为 `^3.3.3`；`tsdown.config.mts` 删除 ESM/CJS 配置中的 `neverBundle` 及其注释，保留 `onlyBundle: []`。执行 `pnpm install`。验证：安装输出中没有新的 peer 警告（svelte 的 `svelte2tsx` 那一条是已知的）；锁文件中不再有 lit 2（`lit@2`、`lit-element@3`、`lit-html@2`、`@lit/reactive-element@1`）
- [x] 3.2 执行 `pnpm --filter lit-moveable build`，与 1.1 的基线对比。验证：导出名、CJS 形状、ESM/CJS 的外部模块清单、UMD 的全局变量名、`declaration/` 文件列表、头部注释都与基线一致；UMD 内联的 lit 为 3.x；构建输出中没有 tsdown 的打包依赖提示或错误。对比结果写入 `baseline.md`
- [x] 3.3 在根目录执行 `pnpm exec vitest run --project lit-moveable`。验证：全部测试通过，和 2.3 的测试数量相同

## 4. 文档

- [x] 4.1 修正 lit-moveable 的 README：安装说明改为 `npm install lit-moveable lit` 并写明需要 Lit 3；`draggable` 改名的说明和示例中的 `litMoveable` 改为 `litDraggable`；「prefixed with **lite**」改为 **lit**；示例的 import 改为 `import { html, render } from "lit";`（原来结尾是冒号，且没有导入 `html`）；删除指向已不存在的 rollup demo 的「Developments」一节（`npm run start`、`./demo/index.html`）。验证：README 中搜不到 `litMoveable`、`**lite**`、`demo/index.html`，示例代码能直接复制运行（在 scratchpad 中用 4.1 的示例和构建产物打开一次页面，拖动目标能移动）
- [x] 4.2 更新 `CLAUDE.md` 和 CI 注释：`CLAUDE.md` 根命令中 `pnpm test` 的说明（现在是「react-moveable 的 story 测试 + 各包单元测试」）加上框架包装的浏览器测试，并说明这些测试读取构建产物，需要先执行 `pnpm packages:build`；测试一段补一句 lit-moveable 的测试位置（`packages/lit-moveable/test/`，Vitest 浏览器模式，针对 `dist`）；`.github/workflows/run-e2e.yml` 中 Run tests 步骤的注释同样加上框架包装的浏览器测试；TypeScript / 依赖相关的描述中写明 lit-moveable 的 lit 是 peerDependency（Lit 3），并删除构建一节中「react、preact、lit 暂时在配置中用 `deps.neverBundle` 保持 external」里的 lit。验证：`CLAUDE.md` 中搜不到 lit 的 `neverBundle` 说法，`pnpm test` 的说明和 CI 注释都提到了框架包装的浏览器测试
- [x] 4.3 更新 `openspec/ROADMAP.md`：第 4 步状态改为「进行中」，表格中写 `upgrade-lit-3`，「待进行」第 4 步中 Lit 3 一条标明由本 change 完成，并写明后续 change 的名字（`upgrade-vue-toolchain`、`upgrade-svelte-5`）。验证：表格和「待进行」都反映本 change

## 5. 全量验证

- [ ] 5.1 推送后确认 CI 通过，且 Run tests 步骤的日志中有 lit-moveable 的测试；再用一个让 lit-moveable 测试失败的临时提交（例如把源码中的 `camelize(\`lit ${name}\`)` 改成别的前缀）确认 CI 在 Run tests 步骤失败，日志中有失败的测试名称；验证完 revert。结果记入 `baseline.md`
- [ ] 5.2 在全新克隆中执行 `pnpm install --frozen-lockfile && pnpm lint && pnpm packages:build && pnpm --filter react-moveable exec playwright install chromium && pnpm --filter react-moveable typecheck:stories && pnpm test`。验证：全部成功，测试结果中包含 lit-moveable 的测试；`openspec validate upgrade-lit-3 --strict` 通过
