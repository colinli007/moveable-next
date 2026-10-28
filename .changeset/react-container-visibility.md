---
"@moveable-next/react": patch
---

With `container` set, the control box stayed hidden (`visibility: hidden`) when Moveable was first rendered with its target, and so did the box of each target with `individualGroupable`: only renders without `container` rendered again after mount, which is what makes the box visible. Moveable now renders again after mount in both cases; positions are still measured once.
