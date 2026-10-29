---
"@moveable-next/vanilla": minor
---

Add `makeMoveable(ables)`, which returns a Moveable class with only the given ables, and export the ables that can be combined: `Draggable`, `Resizable`, `Scalable`, `Rotatable`, `Warpable`, `Clippable`, `EdgeDraggable`, `Snappable`, `Roundable` and `Pinchable`. Bundlers leave the other ables out. In the UMD build they are on the global: `Moveable.makeMoveable([Moveable.Draggable])`. The option properties of a Moveable class are now defined on its prototype when its first instance is created, not when the module is loaded.
