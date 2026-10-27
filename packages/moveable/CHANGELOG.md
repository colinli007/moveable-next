# @moveable-next/vanilla

## 0.1.1

### Patch Changes

- [#1](https://github.com/colinli007/moveable-next/pull/1) [`c04d1b1`](https://github.com/colinli007/moveable-next/commit/c04d1b16ce10b35f7a76a582266f6a965d937703) Thanks [@colinli007](https://github.com/colinli007)! - README links to the demo, Storybook, API documentation, handbook, issues and license now point to this project's site and repository instead of upstream's.
- Updated dependencies [[`c04d1b1`](https://github.com/colinli007/moveable-next/commit/c04d1b16ce10b35f7a76a582266f6a965d937703)]:
  - @moveable-next/react@0.1.1
  - @moveable-next/croact@0.1.1

## 0.1.0

### Minor Changes

- [`4521bae`](https://github.com/colinli007/moveable-next/commit/4521bae9ca7b34a19a5eb83f480c99d146d34039) Thanks [@colinli007](https://github.com/colinli007)! - First release under the `@moveable-next` scope, forked from [`moveable@0.53.0`](https://github.com/daybrush/moveable/blob/moveable%400.53.0/packages/moveable/CHANGELOG.md). Differences from the upstream package:
  
  - The ESM and CommonJS builds target ES2022 instead of ES5; transpile them yourself if you support older browsers. The UMD builds (`dist/moveable.js`, `dist/moveable.min.js`) keep the syntax of the dependencies they inline.
  - Entry points are declared in `exports`: the package itself and the two UMD builds. Paths outside `exports` can't be imported, and Node loads the CommonJS build for both `import` and `require`.
  - The type declarations no longer pull in React's types, so type checking works without `@types/react` even when `skipLibCheck` is off.

### Patch Changes

- Updated dependencies [[`4521bae`](https://github.com/colinli007/moveable-next/commit/4521bae9ca7b34a19a5eb83f480c99d146d34039), [`4521bae`](https://github.com/colinli007/moveable-next/commit/4521bae9ca7b34a19a5eb83f480c99d146d34039)]:
  - @moveable-next/croact@0.1.0
  - @moveable-next/react@0.1.0
