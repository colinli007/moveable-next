# @moveable-next/react

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
