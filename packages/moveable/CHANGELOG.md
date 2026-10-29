# @moveable-next/vanilla

## 0.2.0

### Minor Changes

- [#8](https://github.com/colinli007/moveable-next/pull/8) [`4d01a29`](https://github.com/colinli007/moveable-next/commit/4d01a292dfe96aa9f444b27d89ba22cc431302b2) Thanks [@colinli007](https://github.com/colinli007)! - Add `makeMoveable(ables)`, which returns a Moveable class with only the given ables, and export the ables that can be combined: `Draggable`, `Resizable`, `Scalable`, `Rotatable`, `Warpable`, `Clippable`, `EdgeDraggable`, `Snappable`, `Roundable` and `Pinchable`. Bundlers leave the other ables out. In the UMD build they are on the global: `Moveable.makeMoveable([Moveable.Draggable])`. The option properties of a Moveable class are now defined on its prototype when its first instance is created, not when the module is loaded.

### Patch Changes

- [#6](https://github.com/colinli007/moveable-next/pull/6) [`f54e201`](https://github.com/colinli007/moveable-next/commit/f54e201cfb88441e41d131648f1e04ebb2c5b45d) Thanks [@colinli007](https://github.com/colinli007)! - Switching between a single target, a group and no target no longer leaves the previous control boxes in the DOM, and `destroy()` removes all of them. With a selector that matches several targets, there is no hidden control box in front of the group's any more. Moveable is now rendered through a portal into the parent element instead of taking that element over (croact's self mode, which keeps every replaced root element), so the control box is still a child of the parent element and positions are computed as before.
- Updated dependencies [[`7d0d537`](https://github.com/colinli007/moveable-next/commit/7d0d537fd151ca9adc7a5e0ce7dd4a7c5a8a71ea), [`8fef438`](https://github.com/colinli007/moveable-next/commit/8fef438ce5c1d512d199921212f6de93eee9dfcf), [`f54e201`](https://github.com/colinli007/moveable-next/commit/f54e201cfb88441e41d131648f1e04ebb2c5b45d)]:
  - @moveable-next/react@0.2.0
  - @moveable-next/croact@0.2.0

## 0.1.2

### Patch Changes

- Updated dependencies []:
  - @moveable-next/croact@0.1.2
  - @moveable-next/react@0.1.2

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
