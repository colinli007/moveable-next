## MODIFIED Requirements

### Requirement: 受支持的框架包集合
仓库 SHALL 只包含以下工作区包：react-moveable、croact-moveable、moveable（原生 JS）、vue3-moveable，以及工具包 @moveable/helper。仓库不支持 Preact、Lit、Svelte，不提供它们的框架包。

#### Scenario: 工作区包清单
- **WHEN** 列出 pnpm 工作区中的所有包
- **THEN** 结果恰好是上述 5 个包（外加私有的根包），不包含 preact-moveable、lit-moveable、svelte-moveable、vue-moveable、ngx-moveable、snappable 或独立的 storybook 包

### Requirement: 框架包装的浏览器测试
仓库 SHALL 为框架包装包提供在真实浏览器中运行的自动化测试。测试 SHALL 针对包的构建产物，也就是使用者实际安装的代码，并由根目录的测试命令和其它测试一起执行。目前覆盖 vue3-moveable。

#### Scenario: 根目录统一执行
- **WHEN** 在根目录构建全部包之后执行测试命令
- **THEN** vue3-moveable 的浏览器测试和 react-moveable、helper 的测试一起执行，并全部通过

#### Scenario: 包装失效时失败
- **WHEN** vue3-moveable 的产物中，属性（prop）、事件或方法的转发有一项失效
- **THEN** 测试失败，并能看到失败的测试名称

#### Scenario: 失败时保留截图
- **WHEN** 从根目录执行测试时有框架包装的浏览器测试失败
- **THEN** 失败测试的浏览器截图输出到与 story 测试相同的目录，CI 中作为流水线产物一并上传

## REMOVED Requirements

### Requirement: lit-moveable 的行为
**Reason**: 仓库不再支持 Lit，lit-moveable 已删除。
**Migration**: 在 Lit 中直接使用原生 moveable（`new Moveable(container, options)`）。

### Requirement: svelte-moveable 的组件行为
**Reason**: 仓库不再支持 Svelte，svelte-moveable 已删除。
**Migration**: 在 Svelte 中直接使用原生 moveable（在 `onMount` 中 `new Moveable(container, options)`，卸载时 `destroy()`）。
