## MODIFIED Requirements

### Requirement: 外部依赖与声明一致
ESM 和 CJS 产物 SHALL 把运行时依赖保留为外部 import 或 require，MUST NOT 内联它们。例外：croact-moveable SHALL 内联 react-moveable 的代码。产物中出现的每个外部模块所属的包，SHALL 在该包 `package.json` 的 `dependencies` 或 `peerDependencies` 中声明，没有例外：react-moveable 的 `react` 是 peerDependency，不再需要在构建配置中单独指定为外部模块。

#### Scenario: 外部模块都已声明
- **WHEN** 收集每个 ESM 和 CJS 产物中的外部模块，按包名去重
- **THEN** 每个包名都出现在该包的 `dependencies` 或 `peerDependencies` 中

#### Scenario: 运行时依赖不被内联
- **WHEN** 检查 react-moveable 的 ESM 产物
- **THEN** gesto、`@daybrush/utils`、react 等依赖以外部 import 的形式出现，产物中不包含它们的代码

#### Scenario: 严格布局下可以加载 CJS 产物
- **WHEN** 在 pnpm 严格布局下，从包自己的目录 `require` 它的 CJS 产物
- **THEN** 不出现 `Cannot find module` 错误
