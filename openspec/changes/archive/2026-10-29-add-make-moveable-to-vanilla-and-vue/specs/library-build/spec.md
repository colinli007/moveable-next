## ADDED Requirements

### Requirement: 产物支持按 able 裁剪
react-moveable、moveable、vue3-moveable 的 ESM 产物中，默认导出和没有被引用的 able MUST NOT 带有使打包工具无法删除它们的副作用（例如类的静态块、顶层的未标注调用）。

这条约束 SHALL 有自动化检查，在这三个包各自的构建最后执行：用本包产物打包一段只组合 Draggable、Resizable、Rotatable 的使用方代码（本仓库的包一起打包，第三方依赖作为外部模块），断言打包结果中没有其它 able（以 able 的 `name` 判断），并断言体积不超过引入默认导出时的固定比例；任一断言不满足时构建失败。

#### Scenario: 引入副作用时构建失败
- **WHEN** 某个改动让默认 `Moveable` 或某个 able 在产物中重新带有副作用（例如把 `static get defaultAbles()` 改回静态字段）
- **THEN** 该包的构建失败，输出中能看到被保留的 able 名称

#### Scenario: 正常构建
- **WHEN** 执行全量构建
- **THEN** 三个包的检查都通过，输出组合三个 able 与全量的体积

## MODIFIED Requirements

### Requirement: 原生 moveable 的装饰器属性在产物中可用
原生 moveable 的选项属性访问器和方法代理 SHALL 定义在类的原型上，可以通过实例访问，MUST NOT 被同名的实例字段遮住。它们 SHALL 按类组合的 able 生成（默认 `Moveable` 是全部 able），在类的第一个实例创建时生成，MUST NOT 在模块加载时就以全部 able 生成（否则只引入 `makeMoveable` 时无法删掉其余 able）。

#### Scenario: 原生 moveable 的属性
- **WHEN** 使用 moveable 的产物创建实例，给一个选项属性（如 `draggable`）赋值后再读取
- **THEN** 读取到的是刚赋的值，并且这个值已经传给内部的 Moveable 组件

#### Scenario: 组合部分 able 的类
- **WHEN** 用 `makeMoveable([Draggable])` 创建的类 `new` 一个实例
- **THEN** 实例上有 `draggable` 等 Draggable 的选项属性和全部方法代理，可以赋值和读取
