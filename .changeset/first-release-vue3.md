---
"@moveable-next/vue3": minor
---

First release under the `@moveable-next` scope, forked from [`vue3-moveable@0.28.0`](https://github.com/daybrush/moveable/blob/vue3-moveable%400.28.0/packages/vue3-moveable/CHANGELOG.md). Differences from the upstream package:

- `vue` is a peer dependency (`^3.5.0`).
- The build targets ES2022, the entry point is declared in `exports`, and `require("@moveable-next/vue3")` works.
- The type declarations no longer pull in React's types, so type checking works without `@types/react` even when `skipLibCheck` is off.
