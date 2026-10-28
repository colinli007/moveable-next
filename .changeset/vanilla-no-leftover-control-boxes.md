---
"@moveable-next/vanilla": patch
---

Switching between a single target, a group and no target no longer leaves the previous control boxes in the DOM, and `destroy()` removes all of them. With a selector that matches several targets, there is no hidden control box in front of the group's any more. Moveable is now rendered through a portal into the parent element instead of taking that element over (croact's self mode, which keeps every replaced root element), so the control box is still a child of the parent element and positions are computed as before.
