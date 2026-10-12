## MODIFIED Requirements

### Requirement: 按依赖顺序构建全部包
仓库 SHALL 提供一条根命令，按包之间的依赖拓扑顺序构建所有可发布的工作区包：被依赖的包先于依赖它的包完成构建。

#### Scenario: 全量构建
- **WHEN** 开发者在根目录执行全量构建命令
- **THEN** react-moveable 先构建，croact-moveable 与 preact-moveable 在其后，moveable 在 croact-moveable 之后，lit-moveable、vue3-moveable、svelte-moveable 在 moveable 之后，helper 独立构建，且全部成功产出 `dist`

#### Scenario: 构建产物与迁移前一致
- **WHEN** 替换构建工具或升级 TypeScript 之后执行全量构建，并与替换前保存的产物基线比较
- **THEN** 以下各项与基线一致：每个产物的导出名集合，CJS 产物 `require` 后的形状，外部模块清单，UMD 产物内联的包和全局变量名，头部注释，`declaration/` 的文件列表。不一致的地方必须逐项说明原因并记录在对应 change 中，比如语法目标改变、新增 sourcemap、修正依赖声明

#### Scenario: 构建过程中没有未解析的模块
- **WHEN** 执行全量构建
- **THEN** 构建输出中不出现「无法解析的 import」或「依赖未声明、被当作外部模块」之类的警告，没有例外

#### Scenario: moveable 的 UMD 产物自包含
- **WHEN** 检查 `packages/moveable/dist/moveable.js` 与 `moveable.min.js`
- **THEN** 满足 `library-build` 中「UMD 产物自包含」的要求：croact 与 react-moveable 的代码已被内联，产物中不存在对外部模块或依赖全局变量的引用

### Requirement: CI 执行全部自动化检查
CI SHALL 在每次推送和 pull request 时执行仓库中全部自动化检查：所有可发布包的全量构建、react-moveable 的 story 交互测试、helper 的单元测试、story 代码的类型检查。其中任何一项失败，流水线 SHALL 失败。

#### Scenario: 单元测试失败
- **WHEN** helper 的某个单元测试失败
- **THEN** CI 流水线失败，并能在日志中看到失败的测试名称

#### Scenario: story 类型错误
- **WHEN** 某个 story 文件存在 TypeScript 类型错误
- **THEN** CI 流水线失败，即使这个 story 在浏览器中仍然能够渲染

#### Scenario: 构建失败
- **WHEN** 任一可发布包的构建或类型声明生成失败
- **THEN** CI 流水线失败，并能在日志中看到失败的包名
