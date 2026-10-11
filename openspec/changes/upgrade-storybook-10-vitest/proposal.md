## Why

react-moveable 的 Storybook 是本仓库唯一的行为测试手段，但它停在 Storybook 6.5 + webpack 4。这套组合在 Node 22 下只能靠 `--openssl-legacy-provider` 运行；每次启动都会报 preset 加载失败；用到的 `@storybook/jest`、`@storybook/testing-library`、`addon-storyshots` 都已弃用，代码 tab 面板依赖的 `storybook-addon-preview` 也已停止维护。更关键的是，现有的 137 个测试里只有 26 个 play 在真正检查行为，其余 111 个 story 在测试模式下渲染为空，从来没有被真正渲染过。

后续还要替换库的构建工具、升级框架包装、最终以 `@moveable-next` 发布，这些都会改变产物。所以要先把测试换成可长期维护的现代方案，让每个 story 都真实渲染，后面的工作才有可靠的安全网。原则是**替换老的配置和不再维护的包，而不是在老版本上打补丁**。

## What Changes

- Storybook 6.5.16 升级到 **10.6.1**，framework 改用 `@storybook/react-vite`，配套 **Vite 8 + `@vitejs/plugin-react` 6**；`.storybook/main.*` 改为 ESM；关闭 Storybook CLI 的遥测
- 交互测试从 `@storybook/test-runner` 改为 **`@storybook/addon-vitest`**（**Vitest 5** 浏览器模式 + Playwright）；所有 story 都作为测试真实渲染，有 play 的再执行断言；测试失败时把截图统一输出到一个目录
- 137 个 story 全部改写为 **CSF3**：`name`、`tags` 写成字面量；`require()`、`require.resolve`、`!!raw-loader!` 这些 webpack 专有写法，改为 ESM import 和 `import.meta.glob`。同时修复现有 `add()` 中 `args` 没有被展开的 bug：`Scalable keepRatio Test` 改为真正以 `keepRatio: true` 运行，这是有意的偏离
- 代码 tab 面板（React / Script / Vue3 / Svelte / Lit / CSS，随 controls 实时替换参数）从已停维的 `storybook-addon-preview` 移植为仓库内的本地 addon
- 取消运行时的 facade hack（修改 `__STORYBOOK_CLIENT_API__`），改用 Storybook 的 tags 机制：测试专用 story 默认不在侧边栏显示但照常测试；发布构建中 play 不自动执行
- **去掉 `pnpm-workspace.yaml` 中全局强制的 typescript override**，改为由各个包自己声明 TS 版本：react-moveable 和 helper 升到 **5.9.3**（SB10 要求 `moduleResolution: bundler`，这个选项从 TS 5.0 起才有），其余包暂时保持 4.8.4，等各自的升级 change 再处理；croffle 按它自己声明的依赖使用 TS 4.5，`croffle.config.js` 与它共用同一个 TS 实例。stories 用单独的 tsconfig，库本身的 tsconfig 不动
- helper 的 jest 24 / ts-jest 测试改为 Vitest，并和 story 类型检查一起接入 CI。这个测试在当前严格布局下已经跑不起来，也从来没有进过 CI
- 构建和测试都先执行 croffle bake，保证多框架代码 tab 在 CI 和发布的 demo 中稳定存在
- 删除 `pnpm-workspace.yaml` 中只为 Storybook 6 服务的 `@storybook/*` override
- `storybook-dark-mode` 升级到 5.x；readme 由 `.stories.mdx` 改为 `.mdx` 文档；只在 story 里用到的 daybrush 组件（keycon、react-keycon、react-infinite-viewer、@scena/react-guides）升级到最新版。react-selecto 是库的运行时依赖，不在此列：只删除 devDependencies 里重复的那一条
- **BREAKING（开发流程）**：删除 webpack 4 及其 loader（babel-loader、ts-loader、raw-loader、css-loader、fork-ts-checker-webpack-plugin），以及 test-runner、http-server、concurrently、wait-on、jest、jest-image-snapshot、`@daybrush/tester`、addon-storyshots、addon-coverage、mdx2-csf、addon-google-analytics；删除 `EXEC_TEST`、`SKIP_TEST` 两个环境变量、`test:fail` / `test:fail-build` / `test:fail-ci` 脚本，以及 `NODE_OPTIONS=--openssl-legacy-provider`
- 删除 `.storybook/manager.js` 中上游作者的 Google Analytics ID：fork 的 Storybook 不应该再向上游上报统计
- CI 改为执行 Vitest，测试失败时上传 Vitest 自动生成的失败截图

Node（22.20.0）和 pnpm（11.28.2）保持不变。React 仍为 16，它是库支持的最低版本，是否升级留给发布 change 决定。

不在本次范围，作为后续 change 的路线：
1. 库构建工具替换：用 Vite 库模式替换 `@daybrush/builder` 和各个 rollup 插件；lint 改为 ESLint 10 flat config + typescript-eslint 8；TypeScript 升到 6（`target`、`moduleResolution` 现代化）
2. 框架包装升级：Vue 工具链、Svelte 5 / SvelteKit、Lit 3
3. 文档与部署：TypeDoc 替换 `@daybrush/jsdoc`，gh-pages 升级
4. 以 `@moveable-next` 作用域发布：exports、React peer 范围、changesets

## Capabilities

### New Capabilities

（无）

### Modified Capabilities

- `monorepo-tooling`：「Storybook 交互测试可在受支持的运行时运行」改为测试范围从「play 结果」扩大到「所有 story 真实渲染」，失败截图统一输出，去掉 OpenSSL 相关场景；新增「CI 执行全部自动化检查」（story 测试、helper 单元测试、story 类型检查）；新增「发布的 Storybook 不自动执行交互」「测试专用 story 默认不在侧边栏显示」「Storybook 不向外部统计服务上报」三条需求
- `framework-packages`：「Storybook 示例代码只覆盖受支持框架」补充一个场景：代码 tab 中的参数随 controls 实时更新。这是现有行为，因为面板要移植，所以写进 spec 防止丢失

## Impact

- `packages/react-moveable`：`.storybook/`（main、preview、manager、`preview-head.html` 改写，新增本地 code-preview addon 和 Vitest setup）、`stories/**`（21 个 story 文件改为 CSF3，重写 `stories/utils/story.tsx`，`stories/templates/default.ts` 中的 raw-loader 也一并替换）、`global.d.ts`、`.eslintrc`、`.gitignore`、`croffle.config.js`、`package.json`（依赖与脚本）、新增 `vitest.config.ts` 和 stories 专用 tsconfig
- `packages/helper`：测试从 jest 改为 Vitest
- 根目录与 `pnpm-workspace.yaml`：删除 typescript 和 `@storybook/*` 的 override，各包自行声明 TS 版本；`allowBuilds` 按新依赖重新审批；根目录新增只汇总各包配置的 Vitest projects
- react-moveable、helper：TS 升到 5.9.3 后验证构建产物和 declaration，与当前基线对比；其余包的 TS 版本不变：不内联 react-moveable 的产物应逐字节一致，内联了它的产物（croact、preact、moveable、lit）只允许出现与 react-moveable 相同的差异
- croffle：`croffle.config.js` 改为使用 croffle 自己的 TS 实例，bake 结果与基线对比
- CI：`.github/workflows/run-e2e.yml`
- 文档：`CLAUDE.md`（命令、测试方式、环境变量约定）
- croffle bake 的生成逻辑不变，只改变 story 读取生成结果的方式
- `build:storybook` 仍然输出到 `demo/storybook`，demo 部署流程不变
