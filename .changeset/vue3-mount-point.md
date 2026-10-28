---
"@moveable-next/vue3": minor
---

The root element of the component is now a mount point without a box (`display: contents`) that holds the control box, instead of being the control box itself; positions are still computed in the parent of the component unless `container` is set. Code that used `$el` as the control box should call `getControlBoxElement()` through the component ref, and classes for the control box go in the `className` prop: attributes set on the component fall through to the mount point. Switching targets no longer leaves control boxes behind (see `@moveable-next/vanilla`).
