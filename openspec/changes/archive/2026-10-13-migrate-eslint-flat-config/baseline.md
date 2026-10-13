# 基线与验证记录

## 1.1 旧配置的对照基线

fixture 放在 scratchpad，没有进入仓库，全文附在本节末尾（第 21 行以 1 个 Tab 加 4 个空格开头）。在 `packages/react-moveable` 下执行：

```bash
pnpm exec eslint --stdin --stdin-filename src/lint-fixture.tsx < lint-fixture.tsx
```

ESLint 7.32.0 + typescript-eslint 5.60.1，17 个错误，执行前后 `git status` 不变：

| 行 | 规则 | fixture 中的写法 |
|---|---|---|
| 2 | `@typescript-eslint/no-unused-vars` | 未使用的 import |
| 5 | `comma-dangle` | 多行 import 缺尾逗号 |
| 13 | `@typescript-eslint/indent` | 2 空格缩进 |
| 16 | `semi` | 缺分号 |
| 18 | `@typescript-eslint/no-extra-semi` | `;;` |
| 21 | `no-mixed-spaces-and-tabs` | Tab 加空格缩进 |
| 26 | `no-inner-declarations` | `if` 块中的函数声明 |
| 36 | `comma-dangle` | 多行对象缺尾逗号 |
| 41 | `comma-dangle` | 多行数组缺尾逗号 |
| 44 | `max-len` | 128 列 |
| 47 | `@typescript-eslint/no-unused-vars` | 未使用的局部变量 |
| 52 | `no-console` | `console.log` |
| 55 | `@typescript-eslint/no-inferrable-types` | `let inferrable: number = 1` |
| 55 | `prefer-const` | 同一行，`let` 从未重新赋值（来自 `eslint-recommended`） |
| 57 | `no-var` | `var` |
| 62 | `react/no-direct-mutation-state` | `componentDidMount` 中给 `this.state` 赋值 |
| 70 | `react/jsx-key` | `map` 返回的 `<li>` 缺 `key` |

「放行」的代码（第 75–100 行）都没有报：多行函数参数缺尾逗号、多行泛型参数缺尾逗号、`a && a.b()`、class 与同名 interface 合并、`{}` 类型、`require()`。

两点说明：

- 旧 `@typescript-eslint/indent` 对这个 fixture 中的多行泛型参数（第 82–85 行）没有误报，对照时没有需要排除的旧规则误报。
- 第 21 行只报了 `no-mixed-spaces-and-tabs`，旧 indent 规则没有报这一行。

另外，执行时打印了「React version not specified in eslint-plugin-react settings」。

fixture 全文：

```tsx
import * as React from "react";
import { unusedImport } from "./unused";
import {
    useState,
    useEffect
} from "react";

export const hooks = [useState, useEffect];

// ---- 违反现有配置 ----

export function badIndent() {
  return 1;
}

export const missingSemi = 1

export const extraSemi = 2;;

export function mixedTabs() {
	    return 3;
}

export function outer(flag: boolean) {
    if (flag) {
        function inner() {
            return 4;
        }
        return inner();
    }
    return 0;
}

export const obj = {
    a: 1,
    b: 2
};

export const arr = [
    1,
    2
];

export const longLine = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

export function unusedLocal() {
    const unusedVar = 5;
    return 6;
}

export function logs() {
    console.log("x");
}

export let inferrable: number = 1;

export var legacy = 1;

export class StateComponent extends React.Component<{}, { count: number }> {
    public state = { count: 0 };
    public componentDidMount() {
        this.state = { count: 1 };
    }
    public render() {
        return <div>{this.state.count}</div>;
    }
}

export function List() {
    return <ul>{[1, 2].map(i => <li>{i}</li>)}</ul>;
}

// ---- 现有配置放行 ----

export function multilineParams(
    a: number,
    b: number
) {
    return a + b;
}

export type Pair<
    A,
    B
> = [A, B];

export function shortCircuit(a?: { b(): void }) {
    a && a.b();
}

export interface Merged {
    extra(): void;
}
export class Merged {
    public x = 1;
}

export const empty: {} = {};

export const req = require("path");
```

## 1.2 文档基线

`pnpm doc` 成功，`doc/` 下 50 个文件。文件列表和每个 HTML 的 sha1 保存在 scratchpad（`doc-files-before.txt`、`doc-html-sha-before.txt`），供 5.2 对照。

## 2.1 依赖

`pnpm install` 只报了一条 peer 问题：svelte-moveable 的 `svelte2tsx@0.6.16` 要求 TS `^4.9.4 || ^5.0.0`，实际是 4.8.4。在 HEAD（`aadcec8a`）的临时 worktree 中执行 `pnpm install --frozen-lockfile` + `pnpm peers check`，报的是同一条，属于第 4 步（Svelte 升级）的范围，与本 change 无关。eslint-plugin-react 对 ESLint 10 的 peer 限制已被放行，没有出现在报告中。

各包解析到的 TypeScript：根目录和 6 个库包为 6.0.3，vue3、svelte 为 4.8.4，croffle 为 4.5.5；typescript-eslint 解析到根目录的 6.0.3。

## 2.2 新配置首次运行

检查了 84 个文件，都在 6 个库包的 `src` 下（react-moveable 63、moveable 8、helper 5、lit 3、preact 3、croact 2）。共 48 处问题，与 design 中的试跑一致：`no-useless-assignment` 38、`@typescript-eslint/no-unused-vars` 3、`@stylistic/semi` 3、失效的 disable 注释 2、`@stylistic/max-len` 1、`@stylistic/no-extra-semi` 1。没有打印 React 版本警告。

## 2.3 删除旧配置

被跟踪的文件中（不含 `openspec/`、锁文件和 `demo/`）已经搜不到 `.eslintrc`、`.eslintignore`、`tslint`。`demo/` 中旧的构建产物 sourcemap 内嵌了第三方源码里的这些字样，不属于本仓库的配置。另外删除了 react-moveable 源码中两条 `// tslint:disable-next-line: max-line-length` 注释（`ables/Rotatable.tsx`、`consts.ts`）：TSLint 早已不用，它们保护的两行都是不到 120 列的模板字符串，`max-len` 本来就会跳过。锁文件中不再有 eslint 7、`@typescript-eslint/parser@5`、`eslint-plugin-import`。

## 3.1 `no-useless-assignment`

38 处中，34 处是声明时的初始值，删除初始值时补上类型注解（如 `let gap = 0` → `let gap: number`），由 TS 的明确赋值检查保证读取前一定赋过值。下面几处没有 TS 兜底，逐处读了前后逻辑：

| 位置 | 改动 | 判断依据 |
|---|---|---|
| react-moveable `src/utils.tsx` 732–733 | 删除 `clientWidth = contentWidth;`、`clientHeight = contentHeight;` | 之后的 if/else（735–749 行）不读这两个变量，750–751 行又无条件重新赋值 |
| react-moveable `src/utils/getMatrixStackInfo.ts` 197 | 删除 `requestEnd = requestEnd \|\| isOffsetEnd;` | 从这一行到循环末尾都没有读 `requestEnd`。279 行要么 `break`（循环之后也不再读它），要么在 283 行被 `requestEnd = isOffsetEnd` 无条件覆盖。上游的意图可能是让 WebKit 下 static/relative 定位的情况提前结束遍历，但这个赋值从来没有生效过，本 change 保持现有行为 |
| react-moveable `src/groupUtils.ts` 55 | `let childEvent: any = ev;` → `let childEvent: any;` | 类型是 `any`，TS 不做赋值前使用的检查。if 和 else 两条分支都在读取前赋值，else 中提前 `return` 的路径不读它 |
| react-moveable `src/groupUtils.ts` 98–100 | `let childEvent = ev;` 和下一行的赋值合并为 `const childEvent = eachEvent(childMoveable, ev);` | 初始值在下一行被无条件覆盖 |
| react-moveable `src/ables/Clippable.tsx` 356 | 删除 `let controls: any[] = [];`，379 行改为 `const controls: any[] = poses.map(...)` | 356 到 379 行之间没有读 `controls`；删除初始值后只剩一次赋值，`prefer-const` 要求合并成 const |

删除初始值后，Rotatable 的 `beforeDelta`、`delta`、`absoluteDelta` 和 clippable/utils 的 `radius`、`xRadius`、`yRadius` 只在一次混合解构赋值中被赋值，触发了 `prefer-const`。经确认，配置改为 `prefer-const: ["error", { destructuring: "all" }]`（design 决策 4），源码不动。

验证：`no-useless-assignment` 不再报告；react-moveable 的 `test:type`、`declaration`、`typecheck:stories` 和 helper 的 `declaration` 通过；`pnpm packages:build` 成功；`pnpm test` 22 个文件通过（1 个 skipped），144 个测试通过。

## 3.2 其余 10 处

- 未使用的 import / 参数：moveable `src/utils.ts` 的 `DefaultProps`（类型 import）；preact `src/preact-moveable/Moveable.ts` 的 `import Preact from "preact"`（文件中没有 JSX，`jsx: preserve`；现有产物中没有对 `preact` 的导入，说明它在编译时就已被删除，不是为了副作用）；lit `src/LitMoveable.ts` 中 `EVENTS.forEach` 回调未使用的 `i`。
- class 字段末尾的分号：react-moveable `src/EventManager.ts` 32 行，`src/MoveableManager.tsx` 947、1110 行。
- 失效的 disable 注释：helper `src/GroupManager.ts` 的 `/* eslint-disable no-cond-assign */`（文件中已经没有条件赋值），react-moveable `src/ables/Clickable.ts` 的 `eslint-disable-next-line @typescript-eslint/no-unused-vars`。
- lit `src/LitMoveable.ts` 中 125 列的 interface 声明，在 `extends` 前换行。
- moveable `src/utils.ts` 中 `getElementInfo` 函数声明后多余的 `;`。

验证：`pnpm lint` 以 0 退出，没有任何输出（只有 pnpm 打印的命令行）。

## 3.3 新配置的对照

在根目录执行 `pnpm exec eslint --stdin --stdin-filename packages/react-moveable/src/lint-fixture.tsx < lint-fixture.tsx`（同一个 fixture），17 个错误：

| 行 | 旧配置 | 新配置 |
|---|---|---|
| 2 | `@typescript-eslint/no-unused-vars` | 同左 |
| 5 | `comma-dangle` | `@stylistic/comma-dangle` |
| 13 | `@typescript-eslint/indent` | `@stylistic/indent` |
| 16 | `semi` | `@stylistic/semi` |
| 18 | `@typescript-eslint/no-extra-semi` | `@stylistic/no-extra-semi` |
| 21 | `no-mixed-spaces-and-tabs` | `@stylistic/no-mixed-spaces-and-tabs`，另报 `@stylistic/indent` |
| 26 | `no-inner-declarations` | 不报（决策 4：有意不再启用） |
| 36 | `comma-dangle` | `@stylistic/comma-dangle` |
| 41 | `comma-dangle` | `@stylistic/comma-dangle` |
| 44 | `max-len` | `@stylistic/max-len` |
| 47 | `@typescript-eslint/no-unused-vars` | 同左 |
| 52 | `no-console` | 同左 |
| 55 | `@typescript-eslint/no-inferrable-types` | 同左 |
| 55 | `prefer-const` | 同左（`destructuring: "all"` 对非解构的声明没有影响） |
| 57 | `no-var` | 同左 |
| 62 | `react/no-direct-mutation-state` | 同左 |
| 70 | `react/jsx-key` | 同左 |

- 旧配置报出的规则在新配置下都还能报出，只有有意不再启用的 `no-inner-declarations` 例外。1.1 中旧 indent 规则没有误报，没有需要排除的项。
- 「放行」的代码（第 75–100 行）仍然不报。
- 新增 1 条：第 21 行 Tab 加空格的缩进，`@stylistic/indent` 也报了。这一行旧配置同样不通过（`no-mixed-spaces-and-tabs`），不会有旧配置接受的代码被新配置拒绝，已补充到 design 决策 5。fixture 中没有触发决策 6 表中的新规则（`no-useless-assignment` 等），它们在 84 个源码文件上的结果见 2.2。
- 没有打印 React 版本警告，`git status` 中没有 fixture。

## 5.1 构建不执行 lint

在 react-moveable `src/consts.ts` 临时加了一行未使用的 `import { isArray } from "@daybrush/utils";`。`pnpm lint` 报 `@typescript-eslint/no-unused-vars`，而删除 `dist`、`declaration` 后执行 `pnpm --filter react-moveable build` 成功，重新产出了两者，构建日志中没有 eslint 输出。之后撤销了临时修改，`pnpm lint` 恢复为通过。

## 5.2 文档

`pnpm doc` 成功，`doc/` 的文件列表与 1.2 相同（50 个）。HTML 内容的比较：jsdoc 会把源码收进文档页，也会写入生成时间，所以和 1.2 的哈希不能直接比较。改为在 HEAD 的临时 worktree 中（根目录 TS 4.8.4）同步当前 6 个包的 `src` 后生成文档，与本仓库（根目录 TS 6.0.3）的输出做 `diff -r`。差异只有 39 个页面各一行的「Documentation generated by … on <时间>」，根目录 TypeScript 的升级不影响文档。

## 4.1 CI

- `38c15eae`（本 change 的提交）：run 38338354541 通过，Lint、Build packages、Type-check stories、Run tests 各步骤都成功。
- `8b681872`（临时提交，在 react-moveable `src/consts.ts` 中加入未使用的 `isArray` import）：run 38338593854 失败。失败在 Lint 步骤，之后的构建和测试步骤都被跳过；日志中有 `packages/react-moveable/src/consts.ts`、`3:10  error  'isArray' is defined but never used  @typescript-eslint/no-unused-vars`。
- `ee16a73b` revert 了临时提交，run 38338683102 通过。

## 5.3 全新克隆

从 origin 全新克隆 `refactor`（`38c15eae`）到 scratchpad：

1. `pnpm install --frozen-lockfile` 成功。
2. 此时 `packages/react-moveable/dist` 不存在，`pnpm lint` 已经通过（spec「不需要先构建」）。
3. `pnpm packages:build`、`playwright install chromium`、`typecheck:stories` 都成功；构建输出中没有「React version not specified」。
4. `pnpm test`：22 个文件通过（1 个 skipped），144 个测试通过。
