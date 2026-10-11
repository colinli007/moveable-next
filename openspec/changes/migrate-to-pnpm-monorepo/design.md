## Context

动机见 proposal.md 的 Why，需求见 `specs/monorepo-tooling` 与 `specs/framework-packages`。下面只列影响方案的现状事实：

- 根目录是 yarn 1 workspaces（`packages/*` + `packages/ngx-moveable/projects/ngx-moveable`），`lerna.json` 设置了 `npmClient: yarn`、`version: independent`。根 `package.json` 用 `resolutions` 强制了 22 个依赖的版本，`nohoist` 只服务于 Vue 2 与 Vue 3 共存和 jest。
- `resolutions` 是真正起作用的：例如 `yarn.lock` 里 `@microsoft/api-extractor`（由 vue3-moveable 的 `vite-plugin-dts` 引入）要求 `typescript ~5.0.4`，实际被压到了 4.8.4。
- 构建链：根脚本 `packages:build` = 构建 react-moveable → 执行 `update-type-consts`（只为 Angular 服务）→ `lerna run build`，忽略 ngx、storybook、snappable、react-moveable。
- react-moveable 的 Storybook 是 6.5.16，用 `@storybook/builder-webpack4`（webpack 4.46）。webpack 4 内部用 md4 哈希，Node 17 及以上不加 `--openssl-legacy-provider` 就会报错。`.storybook/main.js` 里登记的 `@storybook/addon-essentials` 在 `yarn.lock` 中不存在，现在启动时就会有一条加载 preset 失败的警告。
- `deploy` 脚本 = `lerna-helper deploy --base moveable`。看过 `@daybrush/release@0.7.1` 的源码（`lerna/deploy.js`）后确认，它做的事是：读 `lerna.json` 的 `deployFileMap`，把三条规则中的 `{{version}}` 都替换成 **moveable 包的版本号**，对每个目标目录执行 `rm -rf` → `mkdir -p` → `cp -a`，最后执行 `gh-pages -d ./demo --dest=./ --add --remote origin`。
- 在严格布局下会失效的依赖分三类（import 粗扫加上独立评审补充）：
  - import / require 但没有声明：react-moveable 的 `webpack`、`fork-ts-checker-webpack-plugin`、`@storybook/client-api`、`@storybook/theming`；moveable、preact-moveable 的 `framework-utils`；vue3-moveable、svelte-moveable 的 `@daybrush/utils`
  - 脚本直接调用可执行文件但没有声明：croact、helper、lit、moveable、preact、react-moveable 的 `build` 都调用 `rollup -c`，`rollup` 只是 `@daybrush/builder` 的传递依赖；helper 的 `lint` 调用 `eslint`，而 `.eslintrc` 用到的 `@typescript-eslint/parser`、`@typescript-eslint/eslint-plugin`、`eslint-plugin-import`、`eslint-plugin-react` 都没有声明
  - 配置文件写死了 `node_modules` 路径：根 `jsdoc.json` 引用了 `node_modules/@scena/event-emitter/src`，但根 `package.json` 没有声明这个包
  - stories 中的 `@moveable/helper` 是通过 webpack alias 和 tsconfig paths 指向 `../helper/src` 解析的，不经过 node_modules，不属于上面三类
- moveable 的 UMD 构建（`dist/moveable.js`、`moveable.min.js`）没有 external，用的是 `rollup-plugin-react-compat` 的 `resolveCompat: true`，目的是把 react-moveable 和 croact 一起打包进来。按插件实现，`croact` 是从 importer（`packages/react-moveable/dist/...`）所在的目录开始查找的；react-moveable 并不依赖 croact，在 yarn 下能找到，只是因为 croact 被提升到了根目录。
- `packages/svelte-moveable/.npmrc` 是 SvelteKit 模板留下的，其中 `resolution-mode=highest` 会影响 pnpm 的版本解析。
- 本机 nvm 有 Node 16.20.2 和 22.20.0，但 Node 16 下没有安装 yarn；全局 pnpm 是 10.x。

## Goals / Non-Goals

**Goals:**
- 每一步都能和基线做对比：先在原工具链下建立基线，再按「删除包 → 切换包管理器与 Node 版本 → CI 与文档」的顺序推进，每一步只引入一类变化。
- 迁移后依赖的解析版本尽量与 `yarn.lock` 保持一致。版本漂移不是本次的目标，所以不在这次升级任何依赖。
- 使用 pnpm 默认的严格布局，不靠任何形式的 hoist（包括 `public-hoist-pattern`）掩盖依赖声明问题。

**Non-Goals:**
- 不精简 `resolutions` / `overrides` 的条目，不升级任何依赖版本（为补齐依赖声明而新增的条目，版本取基线里实际解析到的版本）。以后可以考虑用 pnpm 的 `catalog:` 统一多处重复声明的版本，不在本次范围内。
- 不处理 croact-moveable 等包里 `pvu`、`print-sizes` 这类旧辅助脚本，只要它们不依赖被删掉的工具就保留。
- 不修改 demo 页面里指向原站（`daybrush.com`）的链接。
- 不清理 `.storybook/main.js` 里本来就失效的 `addon-essentials` 条目，只在基线里记录它导致的警告，避免迁移后被误判为 pnpm 引起的问题。

## Decisions

### 1. 先改好所有 `package.json`，再用 `pnpm import` 从 `yarn.lock` 生成锁文件
`pnpm import` 会把 yarn v1 锁文件里的版本当作「优先版本」来生成 `pnpm-lock.yaml`，这样「换包管理器」和「依赖版本漂移」两件事就被分开了。

顺序要求（有两条约束）：
- 先在 yarn 下删除包并刷新 `yarn.lock`，这样不会把已删除包的依赖带进新锁文件。
- 执行 `pnpm import` 之前，overrides、`workspace:~`、`pnpm-workspace.yaml`、补齐的依赖声明都必须已经写好。原因是 `pnpm import` 只在版本满足依赖范围时才沿用旧锁文件的版本：如果此时还没有 overrides，api-extractor 的 `typescript ~5.0.4` 就会被重新解析成 5.0.x；如果内部依赖还是 `~0.56.0` 这种普通范围，pnpm 默认（`link-workspace-packages=false`）会从 npm 下载同名包，而不是链接本地包。等之后再改，锁文件又会变一次，`--frozen-lockfile` 验证就没有意义了。

另外，pnpm 会自动安装缺失的 peer 依赖，锁文件比 `yarn.lock` 多出一些条目是正常的，和基线对比时不要误判。
- 备选方案：删掉锁文件直接执行 `pnpm install`。弃用原因：所有 `^` 范围的依赖都会重新解析到最新版本，一旦构建或测试出问题，就分不清是 pnpm 布局引起的还是版本变化引起的。

### 2. 使用 pnpm 默认的 isolated 布局，缺什么就在使用者身上声明什么
`.npmrc` 里不设置 `shamefully-hoist`、`node-linker=hoisted`，也不设置 `public-hoist-pattern`。Context 里列出的三类缺失依赖，全部在**实际使用它的那一方**显式声明，版本取基线里实际解析到的版本：
- 各个 rollup 包都各自声明 `rollup`。虽然 `pnpm run` 会把根目录的 `node_modules/.bin` 也加入 PATH，根目录声明一次技术上就能跑，但那还是靠根目录兜底，和 spec 的要求矛盾。
- helper 声明 eslint 和它的 4 个插件/解析器。不选择「从 helper 的 build 里去掉 lint」，因为那是行为变化，不属于本次范围。
- 根 `package.json` 声明 `@scena/event-emitter`，使 `jsdoc.json` 里的路径有效。
- webpack 版本：`yarn.lock` 里同时有 4.46.0（来自 `builder-webpack4`）、5.73.0（来自 `@storybook/react` 的 dependencies）、5.75.0（来自 Angular）。`.storybook/main.js` 把 `require("webpack")` 拿到的 `DefinePlugin` 交给 Storybook 内部的 webpack 4 compiler 用，而 webpack 5 的 DefinePlugin 在 webpack 4 compiler 上会因为缺少 `compilation.valueCacheVersions` 而报错，所以 react-moveable 声明的 `webpack` 必须是 **4.x**。如果任务 1.4 测出基线 hoist 出来的是 5.x，这里就是有意偏离基线，并且要在 `baseline.md` 里注明。`fork-ts-checker-webpack-plugin` 同样有三个候选版本（0.5.2 / 4.1.6 / 6.5.2），以基线实际解析到的版本为准。
- 备选方案：设置 `node-linker=hoisted` 或 `public-hoist-pattern`。弃用原因：Angular 删掉以后，剩下的缺口都可以通过补齐声明解决；而 hoist 会让 spec 里「依赖显式声明」这条要求无法被验证。

### 3. moveable 的 UMD 构建在自己的配置里把 croact 解析到明确的路径
不靠 croact 被提升到根目录，也不让 react-moveable 声明它根本不使用的 croact。在 `packages/moveable/rollup.config.js` 里，让 UMD 构建中由 compat 插件替换出来的 `croact` 解析到 moveable 自己声明的 croact（以 moveable 包目录为起点做 `require.resolve`）。具体用 alias，还是在 compat 插件之前加一个 `resolveId` 钩子，等实施时以能通过 spec 的 UMD 检查为准来决定。

实施前先复现：在没有修复的 pnpm 布局下构建一次，确认 rollup 确实出现了 croact 的「未解析」警告，并且 UMD 产物里确实有对外部 `croact` 的引用，然后再动手修。如果复现不出来，就不改 rollup 配置，只保留 spec 里的检查。
- 备选方案：给 react-moveable 加上 `croact` 依赖。弃用原因：react-moveable 本身不使用 croact，这样写依赖关系是假的，等于换个形式的 hoist。

### 4. 内部依赖使用 `workspace:~`
保留现有 `~` 语义（例如 `react-moveable: workspace:~`），将来发布时 pnpm 会改写成 `~x.y.z`，和现在发布出去的包语义一致。
- 备选方案：`workspace:*`。弃用原因：发布时会被改写成精确版本，改变了下游的版本范围语义。等以后做 `@moveable-next` 发布的 change 时再决定也不迟，选 `~` 对那时没有任何约束。

### 5. `resolutions` 原样迁移到 pnpm overrides
条目和版本范围都保持不变，只换配置位置。另外新增了一条定向 override：`@storybook/jest>@storybook/expect: 27.5.2-0`。原因是 `@storybook/jest@0.0.10` 依赖的是 dist-tag `storybook-jest`，`pnpm import` 无法把 tag 对应到 yarn.lock 里的版本，会解析成 tag 当前指向的 28.1.3-5；这条 override 把它锁回基线版本。所用 pnpm 版本支持在 `pnpm-workspace.yaml` 里写 `overrides` 的话，统一放在 `pnpm-workspace.yaml`，否则放在根 `package.json` 的 `pnpm.overrides`。精简条目留到以后的 Storybook 或依赖升级 change。同时删除 `packages/svelte-moveable/.npmrc`，避免子目录的 `resolution-mode` 设置干扰解析。

### 6. 用 `pnpm -r` 替代 lerna 的任务编排
根脚本对照：

| 原脚本 | 新做法 |
|---|---|
| `build` / `storybook` / `bake` / `build:storybook` | `pnpm --filter react-moveable <script>` |
| `packages:build` | `pnpm -r build`（按依赖图调度，没有依赖关系的包可以并行；Angular 常量生成步骤删除） |
| `doc` / `demo:build` / `demo:deploy` | 保留，内部调用改成 pnpm |
| `deploy` | 改为 Node 脚本加 `demo:deploy`，见决策 7 |
| `bootstrap` / `packages:update` / `update-type-consts` / `packages:publish` / `changelog` / `release` | 删除 |

各包脚本里的 `yarn xxx` 和 `npm run xxx` 一律改成 `pnpm xxx` / `pnpm run xxx`，`npx http-server` 改为 `pnpm exec http-server`。`packages/moveable` 中依赖 `@daybrush/release` 可执行文件的 `prerelease`、`release`、`release:init`、`release:before` 脚本一并删除，因为它们是发布入口，而且依赖的工具已经被移除；指向不存在目录的 `storybook` 脚本（`cd storybook && ...`）也一并删除。
- 备选方案：turbo。弃用原因：不到 10 个包、依赖链很短，缓存的收益不足以抵消多维护一份配置。以后需要时可以零返工地接入。

### 7. deploy 改为一个零依赖的 Node 脚本
新增 `config/deploy.mjs`（和现有的 `config/` 目录放在一起）：读取 `packages/moveable/package.json` 的版本号，按原来的三条规则对每个目标执行 `fs.rmSync(recursive)` → `fs.mkdirSync(recursive)` → `fs.cpSync(recursive)`。根脚本 `deploy` = `node config/deploy.mjs && pnpm demo:deploy`。

和 lerna-helper 的区别只有一点：`cp -a` 会保留文件权限和修改时间，`fs.cpSync` 默认不保留修改时间。gh-pages 按内容提交，对部署结果没有影响，所以不额外开启 `preserveTimestamps`。
- 备选方案：`rm -rf` 加 cpx 命令。弃用原因：cpx 只能复制、不能清空，需要拼两条命令；而且 cpx 1.5.0 是 2016 年的版本。Node 22 自带的 fs API 一个文件就能完整还原原逻辑，也不用新增依赖。（用户已确认使用 Node 脚本。）
- 确认 `cpx`、`intercept-stdout` 只是给 lerna-helper 配套的根依赖、没有其它引用后，一并删除。

### 8. Storybook 在 Node 22 和 pnpm 布局下的处理方式与停止规则
只做以下两件事：
- **Node 22**：只在 react-moveable 的 `storybook`、`test:build`、`test:fail-build`、`build:storybook` 这几条脚本前加 `NODE_OPTIONS=--openssl-legacy-provider`，沿用现有脚本里 `SKIP_TEST=true` 这种 POSIX 写法。备选方案：在 `.npmrc` 里写 `node-options`，对所有脚本生效。弃用原因：影响面过大，会把 rollup 构建等不需要它的流程也带上 legacy OpenSSL。
- **pnpm 布局**：Storybook 6.x 在 monorepo 里找不到 preset 或 addon 是官方 FAQ 承认的已知问题。如果出现这种情况，就在 `.storybook/main.js` 里把 `addons` 和 `framework` 改写成用 `path.dirname(require.resolve("<pkg>/package.json"))` 计算出来的绝对路径（官方推荐做法，不属于 hoist）。前提是对应的包已经在 react-moveable 中声明。

**停止规则**：如果做了上面两件事，Storybook 或 test-runner 还是因为 Node 22 或 pnpm 布局起不来，或者测试结果和基线不一致，**就停下这个 change，转去开 Storybook 升级的 change**。不在本 change 里加 `public-hoist-pattern` 或其它补丁（用户已确认）。

### 9. CI
`pnpm/action-setup`（版本读 `packageManager`）→ `actions/setup-node`（`node-version-file: .nvmrc`，`cache: pnpm`）→ `pnpm install --frozen-lockfile` → 显式安装 Playwright 浏览器 → `pnpm --filter react-moveable test:ci` → 失败时运行 `test:fail-ci`，并用 `actions/upload-artifact` 上传 `__snapshots__`。Actions 一律用实施时的当前主版本。不再缓存 `**/node_modules`，改为缓存 pnpm store 和 Playwright 浏览器目录。

### 10. 包管理器版本
`packageManager` 写实施时最新稳定版 pnpm 的精确版本。pnpm 10 起默认禁止依赖的生命周期脚本：用 `pnpm approve-builds` 审核后，只把确实需要构建的依赖（如 esbuild）标记为允许，不能整体放开。

**实施时的修正**：实施时 npm 上的最新版是 pnpm 12.11.2，但它改成了原生二进制分发。Node 22.20.0 自带的 corepack 0.34 会去找 `bin/pnpm.cjs`，在 12.x 里这个文件不存在；全局 pnpm 10 自动切换到 12.x 时也会报 ENOEXEC。这样就满足不了 spec 里「启用 Corepack 的开发者使用声明版本」。因此改用 **pnpm 11.28.2**，即 corepack 能正常运行的最新主版本。pnpm 11 的几项变化也一并适配：
- 构建审批由 `allowBuilds` 取代 `onlyBuiltDependencies`，且默认开启 `strictDepBuilds`，未审批的构建脚本会让安装失败。
- `.npmrc` 只读认证和 registry 配置，所以不再新建 `.npmrc`；不加任何 hoist 选项的目标不受影响。
- 不再读取 `package.json` 的 `pnpm` 字段，overrides 只能写在 `pnpm-workspace.yaml`。Playwright 浏览器不靠 postinstall 下载，本地和 CI 都显式执行 `playwright install`。

## Risks / Trade-offs

- [Node 22 或 pnpm 布局下 Storybook 6.5 / test-runner 0.9 起不来] → 按决策 8 先用 legacy OpenSSL 参数和绝对路径处理，仍然不行就按停止规则转去开 Storybook 升级的 change。
- [严格布局暴露出的缺失依赖比 Context 里列的更多] → 按包逐个构建、逐个排查，每新增一条依赖都要能对应到一个真实的 import、可执行文件调用或配置路径，并补记到 `baseline.md`；不允许为了「先跑通」加 hoist。
- [moveable 的 UMD 在 pnpm 下没有内联 croact，构建却显示成功] → 按决策 3 先复现再修；spec 要求构建中不能有「未解析」警告，并对 UMD 产物做反向检查。
- [其它打包产物在符号链接布局下解析路径变化（croact-moveable、preact-moveable 内联 react-moveable 后再做别名替换）] → 对比基线的产物清单和体积，并检查 `react` / `react-dom` 没有被误打包进去。
- [`pnpm import` 对个别条目的转换和 yarn 不完全一致] → 拿基线的产物文件列表、体积和测试结果做对比，发现差异后定位到具体依赖再决定怎么处理。
- [gh-pages 2.x 在 Node 22 下能不能正常推送，本次没有真正验证] → deploy 任务只验证复制结果；推送等到第一次实际发布 demo 时再验证。由于推送目标是自己的 `origin`，失败的代价可控。
- [删除 vue-moveable 和 ngx-moveable 是 BREAKING] → 只影响这个 fork，npm 上原作者已发布的版本不受影响；本仓库目前也没有发布入口。

## Migration Plan

1. **建立基线（Node 16.20.2 + yarn 1，不改任何仓库文件）**：用 corepack 准备 yarn 1，然后安装依赖、全量构建、跑 Storybook 测试，记录到 `baseline.md`（放在本 change 目录下）：
   - 各包 `dist` 和 `declaration` 的文件清单与体积
   - 测试通过的 story 数和失败清单，Storybook 启动时的警告
   - 三类缺失依赖在 hoist 布局下实际解析到的版本
   - rollup、eslint、jsdoc 等可执行文件的版本
2. **删除包（仍用 yarn + Node 16）**：删除 vue-moveable、ngx-moveable、snappable、根目录 `storybook/` 以及相关配置，刷新 `yarn.lock`，重新构建、测试，结果和基线对比。
3. **切换到 pnpm + Node 22**：先把 workspace、overrides、`workspace:~`、补齐的依赖声明全部写进 `package.json`，再执行 `pnpm import`；然后删除 lerna 和 yarn 相关配置，改写脚本和 deploy，处理 moveable UMD 和 Storybook，重新构建、测试，结果和基线对比。
4. **CI 与文档**：更新工作流、CLAUDE.md 和各个 README。

回滚：每一步单独提交，任何一步出问题都可以 `git revert` 回到上一步。第 3 步失败、需要回到 yarn 时，第 2 步刷新过的 `yarn.lock` 仍然可用。

## Open Questions

- 基线中如果已经有失败的 story：它们属于迁移前就存在的问题，在 `baseline.md` 里标注出来，本 change 不负责修，只要求迁移后失败集合不扩大。
