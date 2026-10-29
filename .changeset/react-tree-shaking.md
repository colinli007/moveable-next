---
"@moveable-next/react": minor
---

`makeMoveable` tree-shakes again: with only some ables combined, bundlers leave the other ables (and the default `Moveable`) out, which stopped working when the build target became ES2022. `Moveable.defaultAbles` is now a getter, so assigning it no longer has an effect; use `makeMoveable` to choose the ables. `InitialMoveable.getAllAbles()` returns every able in effect for a Moveable class, and the props of the ables every Moveable has are exported as the `DefaultAbleProps` type. The types of `Snappable`, `Scrollable` and `Roundable` now match `Able`, so they can be passed to `makeMoveable` without type errors.
