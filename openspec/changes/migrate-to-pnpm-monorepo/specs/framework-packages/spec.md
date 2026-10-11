## Purpose

定义本仓库对外提供哪些框架包，以及 Storybook 中示例代码覆盖哪些框架，作为后续新增或下线框架支持时的依据。

## ADDED Requirements

### Requirement: 受支持的框架包集合
仓库 SHALL 只包含以下工作区包：react-moveable、preact-moveable、croact-moveable、moveable（原生 JS）、lit-moveable、vue3-moveable、svelte-moveable，以及工具包 @moveable/helper。

#### Scenario: 工作区包清单
- **WHEN** 列出 pnpm 工作区中的所有包
- **THEN** 结果恰好是上述 8 个包（外加私有的根包），不包含 vue-moveable、ngx-moveable、snappable 或独立的 storybook 包

### Requirement: 不支持 Vue 2 与 Angular
仓库 MUST NOT 包含 Vue 2 或 Angular 的包装包、构建步骤、依赖或生成产物，构建流程也 MUST NOT 依赖任何仅为 Angular 服务的代码生成步骤。

#### Scenario: 构建不依赖 Angular 常量生成
- **WHEN** 执行全量构建
- **THEN** 流程中不包含从 react-moveable 产物生成 Angular inputs / outputs 常量的步骤，且构建成功

#### Scenario: 依赖树中没有 Angular 与 Vue 2 工具链
- **WHEN** 检查锁文件
- **THEN** 不存在 `@angular/*`、`@vue/cli-service`、`ng-packagr` 等仅为 Vue 2 / Angular 服务的依赖；`vue-template-compiler` 只允许作为 Vue 3 类型检查工具链（`vue-tsc` → `@vue/language-core`）的传递依赖出现

### Requirement: Storybook 示例代码只覆盖受支持框架
由 React story 自动转译生成的多框架示例代码，以及 Storybook 中展示的代码 tab，SHALL 只覆盖 React、原生 Script、Vue 3、Svelte、Lit（外加 CSS tab）。

#### Scenario: 生成示例代码
- **WHEN** 开发者执行示例代码转译命令（bake）
- **THEN** 只生成 script、vue3、svelte、lit 目录，不生成 vue2 或 angular 目录

#### Scenario: 查看 story 的代码面板
- **WHEN** 在 Storybook 中打开任意带代码预览的 story
- **THEN** 代码 tab 中没有 "Vue2" 或 "Angular"，且其余 tab 正常显示
