# @moveable-next/vue3

## 0.1.1

### Patch Changes

- [#1](https://github.com/colinli007/moveable-next/pull/1) [`c04d1b1`](https://github.com/colinli007/moveable-next/commit/c04d1b16ce10b35f7a76a582266f6a965d937703) Thanks [@colinli007](https://github.com/colinli007)! - README links to the demo, Storybook, API documentation, handbook, issues and license now point to this project's site and repository instead of upstream's.
- Updated dependencies [[`c04d1b1`](https://github.com/colinli007/moveable-next/commit/c04d1b16ce10b35f7a76a582266f6a965d937703)]:
  - @moveable-next/vanilla@0.1.1

## 0.1.0

### Minor Changes

- [`4521bae`](https://github.com/colinli007/moveable-next/commit/4521bae9ca7b34a19a5eb83f480c99d146d34039) Thanks [@colinli007](https://github.com/colinli007)! - First release under the `@moveable-next` scope, forked from [`vue3-moveable@0.28.0`](https://github.com/daybrush/moveable/blob/vue3-moveable%400.28.0/packages/vue3-moveable/CHANGELOG.md). Differences from the upstream package:
  
  - `vue` is a peer dependency (`^3.5.0`).
  - The build targets ES2022, the entry point is declared in `exports`, and `require("@moveable-next/vue3")` works.
  - The type declarations no longer pull in React's types, so type checking works without `@types/react` even when `skipLibCheck` is off.

### Patch Changes

- Updated dependencies [[`4521bae`](https://github.com/colinli007/moveable-next/commit/4521bae9ca7b34a19a5eb83f480c99d146d34039)]:
  - @moveable-next/vanilla@0.1.0
