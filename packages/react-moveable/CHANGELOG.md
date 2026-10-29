# @moveable-next/react

## 0.2.0

### Minor Changes

- [#8](https://github.com/colinli007/moveable-next/pull/8) [`8fef438`](https://github.com/colinli007/moveable-next/commit/8fef438ce5c1d512d199921212f6de93eee9dfcf) Thanks [@colinli007](https://github.com/colinli007)! - `makeMoveable` tree-shakes again: with only some ables combined, bundlers leave the other ables (and the default `Moveable`) out, which stopped working when the build target became ES2022. `Moveable.defaultAbles` is now a getter, so assigning it no longer has an effect; use `makeMoveable` to choose the ables. `InitialMoveable.getAllAbles()` returns every able in effect for a Moveable class, and the props of the ables every Moveable has are exported as the `DefaultAbleProps` type. The types of `Snappable`, `Scrollable` and `Roundable` now match `Able`, so they can be passed to `makeMoveable` without type errors.

### Patch Changes

- [#6](https://github.com/colinli007/moveable-next/pull/6) [`7d0d537`](https://github.com/colinli007/moveable-next/commit/7d0d537fd151ca9adc7a5e0ce7dd4a7c5a8a71ea) Thanks [@colinli007](https://github.com/colinli007)! - With `container` set, the control box stayed hidden (`visibility: hidden`) when Moveable was first rendered with its target, and so did the box of each target with `individualGroupable`: only renders without `container` rendered again after mount, which is what makes the box visible. Moveable now renders again after mount in both cases; positions are still measured once.

- [#6](https://github.com/colinli007/moveable-next/pull/6) [`f54e201`](https://github.com/colinli007/moveable-next/commit/f54e201cfb88441e41d131648f1e04ebb2c5b45d) Thanks [@colinli007](https://github.com/colinli007)! - Remove the private `warpSelf` option, which only the Vue 3 component used. It is no longer listed in `PROPERTIES`.

## 0.1.2

No changes in this release.

## 0.1.1

### Patch Changes

- [#1](https://github.com/colinli007/moveable-next/pull/1) [`c04d1b1`](https://github.com/colinli007/moveable-next/commit/c04d1b16ce10b35f7a76a582266f6a965d937703) Thanks [@colinli007](https://github.com/colinli007)! - README links to the demo, Storybook, API documentation, handbook, issues and license now point to this project's site and repository instead of upstream's.

## 0.1.0

### Minor Changes

- [`4521bae`](https://github.com/colinli007/moveable-next/commit/4521bae9ca7b34a19a5eb83f480c99d146d34039) Thanks [@colinli007](https://github.com/colinli007)! - First release under the `@moveable-next` scope, forked from [`react-moveable@0.56.0`](https://github.com/daybrush/moveable/blob/react-moveable%400.56.0/packages/react-moveable/CHANGELOG.md). Differences from the upstream package:
  
  - The build targets ES2022 instead of ES5; transpile it yourself if you support older browsers.
  - Entry points are declared in `exports`: `@moveable-next/react` and `@moveable-next/react/types`. Paths outside `exports` can't be imported, and Node loads the CommonJS build for both `import` and `require`.
  - `react` is an optional peer dependency (`^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0`).
  - `@moveable-next/react/types` no longer pulls in React's types.
