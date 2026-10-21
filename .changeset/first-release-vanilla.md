---
"@moveable-next/vanilla": minor
---

First release under the `@moveable-next` scope, forked from [`moveable@0.53.0`](https://github.com/daybrush/moveable/blob/moveable%400.53.0/packages/moveable/CHANGELOG.md). Differences from the upstream package:

- The ESM and CommonJS builds target ES2022 instead of ES5; transpile them yourself if you support older browsers. The UMD builds (`dist/moveable.js`, `dist/moveable.min.js`) keep the syntax of the dependencies they inline.
- Entry points are declared in `exports`: the package itself and the two UMD builds. Paths outside `exports` can't be imported, and Node loads the CommonJS build for both `import` and `require`.
- The type declarations no longer pull in React's types, so type checking works without `@types/react` even when `skipLibCheck` is off.
