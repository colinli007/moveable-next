---
"@moveable-next/vue3": minor
---

Add `makeMoveable(ables)`, which returns a Moveable component with only the given ables, so that bundlers leave the other ables out. It replaces the vanilla `makeMoveable` that the package re-exported. The ables to combine (`Draggable`, `Resizable`, ...) are exported as in `@moveable-next/vanilla`.
