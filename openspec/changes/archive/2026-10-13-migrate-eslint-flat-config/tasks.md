## 1. 旧配置的对照基线（不修改仓库中要提交的文件）

- [x] 1.1 在 scratchpad 中写一个临时的 `lint-fixture.tsx`，每段代码违反现有配置中的一条规则：4 空格以外的缩进、缺分号、多余的分号（`;;`）、空格与 Tab 混用的缩进、代码块中的函数声明、多行对象/数组/import 缺尾逗号、超过 120 列的代码行、未使用的变量和 import、`console.log`、`let a: number = 1`（`no-inferrable-types`）、`var`（`no-var`）、class 组件中直接给 `this.state` 赋值、列表元素缺 `key`；另外再写几段**现有配置放行**的代码：多行函数参数缺尾逗号、多行泛型参数缺尾逗号、`a && a.b()`、class 与同名 interface 合并、`{}` 类型、`require()`。在 `packages/react-moveable` 目录下用它自己的 ESLint 7 执行 `eslint --stdin --stdin-filename src/lint-fixture.tsx < <fixture>`（不把文件放进仓库）。验证：报出的规则清单（规则名和行号）与「放行」的那几段没有报错这两点写入本 change 目录的 `baseline.md`；旧 `@typescript-eslint/indent` 对多行泛型参数的误报单独标注；`git status` 没有变化
- [x] 1.2 执行 `pnpm doc`，把 `doc/` 的文件列表保存到 scratchpad，作为 5.2 升级根目录 TypeScript 之后的对照。验证：命令成功，文件列表已保存

## 2. 依赖与配置（design 决策 1、2、7、8）

- [x] 2.1 根 `package.json`：devDependencies 新增 `eslint ^10.12.0`、`@eslint/js ^10.0.1`、`typescript-eslint ^8.71.1`、`@stylistic/eslint-plugin ^5.10.0`、`eslint-plugin-react ^7.37.5`，`typescript` 改为 `~6.0.3`；新增脚本 `"lint": "eslint --max-warnings 0"`。`pnpm-workspace.yaml` 按 design 决策 7 新增 `peerDependencyRules.allowedVersions`（带注释）。执行 `pnpm install`。验证：安装输出中没有 unmet peer 警告；`pnpm why typescript` 显示根目录和 6 个库包为 6.0.3，vue3、svelte 仍为 4.8.x，croffle 仍为 4.5.x
- [x] 2.2 新建根目录 `eslint.config.mjs`：`defineConfig` + `globalIgnores(["**/*.{js,mjs,cjs}"])`；一个配置项，`files` 为 6 个库包的 `src/**/*.{ts,tsx}`，`extends` 三个推荐集，`settings.react.version: "16.8"`，`rules` 按 design 决策 4、5、6 的表写（`comma-dangle` 的 10 个键都显式写出），`no-unused-expressions`、`no-unsafe-declaration-merging` 的放行和 `no-inner-declarations` 不再启用，都在旁边用注释写明原因。验证：`pnpm exec eslint --format json` 输出的文件数为 84，都在 6 个库包的 `src` 下；`pnpm lint` 报出的问题和 design Context 中试跑的 48 处一致（规则和处数）
- [x] 2.3 删除 react-moveable、helper 的 `.eslintrc`、`.eslintignore`、`lint` 脚本，以及 devDependencies 中的 `eslint`、`@typescript-eslint/eslint-plugin`、`@typescript-eslint/parser`、`eslint-plugin-import`、`eslint-plugin-react`；`build` 脚本去掉 `pnpm run lint`（react-moveable 为 `pnpm run test:type && tsdown && pnpm run declaration`，helper 为 `tsdown && pnpm run declaration`）；删除 croact、preact 的 `tslint.json`。执行 `pnpm install`。验证：除根目录外，仓库中被跟踪的文件里搜不到 `.eslintrc`、`.eslintignore`、`tslint`；锁文件中不再有 eslint 7、`@typescript-eslint/parser@5`、`eslint-plugin-import`

## 3. 修正源码（design 决策 6）

- [x] 3.1 修正 `no-useless-assignment` 的 38 处：只删除无用的赋值，不改动其它逻辑。声明时的初始值：删除时保留或补上类型注解，如果删除后 TS 报「在赋值前使用」，说明这个值实际会被读到，回到 design 重新判断，不要绕开。函数中途的赋值语句：没有 TS 兜底，逐处读懂前后逻辑、确认值在被读取前一定会被覆盖或函数已返回，再删除，并在 `baseline.md` 中列出这些位置和判断依据。验证：`pnpm lint` 中不再有这条规则的报告；react-moveable 的 `test:type`、`declaration`、`typecheck:stories` 通过；helper 的 `declaration` 通过；`pnpm test` 全部通过
- [x] 3.2 修正其余 10 处：未使用的 import / 参数 3 处（moveable `src/utils.ts`、preact `src/preact-moveable/Moveable.ts`、lit `src/LitMoveable.ts`；删除前确认不是为了副作用或 JSX 工厂而存在的 import），class 字段末尾的分号 3 处，失效的 `eslint-disable` 注释 2 处（helper `src/GroupManager.ts`、react-moveable `src/ables/Clickable.ts`），lit 中超过 120 列的 1 处，moveable `src/utils.ts` 中多余的分号 1 处。验证：`pnpm lint` 以 0 退出，没有任何输出
- [x] 3.3 用 1.1 的 `lint-fixture.tsx` 跑新配置（在根目录执行 `pnpm exec eslint --stdin --stdin-filename packages/react-moveable/src/lint-fixture.tsx < <fixture>`）。验证：1.1 中报出的每条规则在新配置下都还能报出（规则名按 design 决策 4、5 对应；有意不再启用的 `no-inner-declarations` 和旧 indent 规则的误报除外，逐条注明）；1.1 中「放行」的代码仍然不报；新增的报告都在 design 决策 6 的表中。对照结果写入 `baseline.md`

## 4. CI 与文档

- [x] 4.1 `.github/workflows/run-e2e.yml` 在 Install dependencies 之后、Build packages 之前增加 `pnpm lint` 步骤。验证：推送后 CI 通过；用一个故意制造 lint 错误（例如 react-moveable 源码中未使用的 import）的临时提交确认 CI 在 Lint 步骤失败，日志中能看到文件路径和规则名；验证完 revert。结果记入 `baseline.md`
- [x] 4.2 更新 `CLAUDE.md`：常用命令中把 react-moveable 的 `pnpm lint` 改为根目录的 `pnpm lint`，说明检查范围是 6 个库包的 `src`；`pnpm build` 的说明去掉 lint；TypeScript 一节中根目录改为 `~6.0.3`；补一句 lint 配置是根目录的 `eslint.config.mjs`，依赖只在根目录声明。验证：`CLAUDE.md` 中搜不到 `.eslintrc`、`eslint ./src`，也没有「根目录仍是 4.8」的说法
- [x] 4.3 更新 `openspec/ROADMAP.md`：第 3 步标为已完成，表格中写两个 change；「已完成」中第 3 步补上 lint 的摘要，删除「待进行」中的第 3 步；「已知遗留」增加 eslint-plugin-react 的 peer 放行，写明只启用推荐集、额外启用 react 规则前要先确认它在 ESLint 10 下能运行。验证：表格、「已完成」「待进行」「已知遗留」都反映本 change

## 5. 全量验证

- [x] 5.1 临时在 react-moveable 源码中加一个未使用的 import，执行 `pnpm --filter react-moveable build`，然后撤销。验证：构建成功并产出 `dist`、`declaration`（spec「包的构建不包含代码检查」）
- [x] 5.2 执行 `pnpm doc`。验证：成功，`doc/` 的文件列表与 1.2 保存的相同
- [x] 5.3 在全新克隆中执行 `pnpm install --frozen-lockfile && pnpm lint`（此时没有任何构建产物），再执行 `pnpm packages:build && pnpm --filter react-moveable exec playwright install chromium && pnpm --filter react-moveable typecheck:stories && pnpm test`。验证：全部成功，`pnpm lint` 在构建前就能通过（spec「不需要先构建」）；构建输出中不再有「React version not specified」；`openspec validate migrate-eslint-flat-config --strict` 通过
