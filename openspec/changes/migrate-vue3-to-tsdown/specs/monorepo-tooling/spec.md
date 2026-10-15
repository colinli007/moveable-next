## MODIFIED Requirements

### Requirement: 代码检查
仓库 SHALL 提供一条根命令，对 7 个库包（react-moveable、helper、croact-moveable、preact-moveable、moveable、lit-moveable、vue3-moveable）`src` 下的全部 TypeScript 源码执行静态检查（lint）。检查只在没有错误、也没有警告时通过；检查 MUST NOT 依赖构建产物，也 MUST NOT 被任何包的构建命令隐式执行。

#### Scenario: 检查范围
- **WHEN** 开发者在根目录执行代码检查命令
- **THEN** 7 个库包 `src` 下的 `.ts`、`.tsx` 文件都被检查；`dist`、`declaration`、stories 和其它包的文件不被检查

#### Scenario: 当前代码通过检查
- **WHEN** 在没有改动的代码上执行代码检查命令
- **THEN** 命令以 0 退出，输出中没有错误和警告，也没有关于配置或插件本身的提示（例如未指定 React 版本）

#### Scenario: 发现问题时失败
- **WHEN** 任一库包的源码中出现违反规则的代码（例如未使用的 import，或缩进不是 4 个空格）
- **THEN** 命令以非 0 退出，输出中能看到文件路径、行号和规则名

#### Scenario: 不需要先构建
- **WHEN** 在全新克隆中安装依赖后，不执行任何构建就执行代码检查命令
- **THEN** 检查正常完成，结果与构建之后执行相同

### Requirement: CI 执行全部自动化检查
CI SHALL 在每次推送和 pull request 时执行仓库中全部自动化检查：库包源码的代码检查、所有可发布包的全量构建、react-moveable 的 story 交互测试、helper 的单元测试、框架包装的浏览器测试、story 代码的类型检查。其中任何一项失败，流水线 SHALL 失败。

#### Scenario: 单元测试失败
- **WHEN** helper 的某个单元测试失败
- **THEN** CI 流水线失败，并能在日志中看到失败的测试名称

#### Scenario: story 类型错误
- **WHEN** 某个 story 文件存在 TypeScript 类型错误
- **THEN** CI 流水线失败，即使这个 story 在浏览器中仍然能够渲染

#### Scenario: 构建失败
- **WHEN** 任一可发布包的构建或类型声明生成失败
- **THEN** CI 流水线失败，并能在日志中看到失败的包名

#### Scenario: 代码检查失败
- **WHEN** 任一库包的源码存在 lint 错误或警告
- **THEN** CI 流水线失败，并能在日志中看到对应的文件路径和规则名

#### Scenario: 框架包装测试失败
- **WHEN** lit-moveable 或 vue3-moveable 的某个浏览器测试失败
- **THEN** CI 流水线失败，并能在日志中看到失败的测试名称
