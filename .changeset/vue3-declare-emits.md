---
"@moveable-next/vue3": patch
---

The component declares moveable's events in `emits`. Listeners whose names are also native DOM events, such as `@click` and `@drag`, no longer fall through to the root element as native listeners, so `@click` only receives moveable's `click` event instead of also receiving the browser's `MouseEvent` when the control box is clicked.
