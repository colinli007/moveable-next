## MODIFIED Requirements

### Requirement: Storybook 示例代码只覆盖受支持框架
由 React story 自动转译生成的多框架示例代码，以及 Storybook 中展示的代码 tab，SHALL 只覆盖 React、原生 Script、Vue 3、Svelte、Lit（外加 CSS tab）。代码 tab 中展示的参数值 SHALL 与 story 当前的参数（controls）保持一致。

#### Scenario: 生成示例代码
- **WHEN** 开发者执行示例代码转译命令（bake）
- **THEN** 只生成 script、vue3、svelte、lit 目录，不生成 vue2 或 angular 目录

#### Scenario: 查看 story 的代码面板
- **WHEN** 在 Storybook 中打开任意带代码预览的 story
- **THEN** 代码 tab 中没有 "Vue2" 或 "Angular"，且其余 tab 正常显示

#### Scenario: 代码随参数更新
- **WHEN** 在 controls 中修改某个 story 的参数（例如切换 `draggable`、修改 `throttleDrag`）
- **THEN** React、Script、Vue3、Svelte、Lit 各个代码 tab 中对应的参数值同步变为新值，复制得到的代码也是新值
