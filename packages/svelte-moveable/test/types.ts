// Compile-time checks of the published type declarations, written the way a user would (pnpm test:type).
import { mount } from "svelte";
import Moveable from "../dist/index.js";

const target = document.createElement("div");

// Props are typed and event callback props receive moveable's event types.
const moveable = mount(Moveable, {
    target,
    props: {
        target,
        draggable: true,
        throttleDrag: 1,
        onDrag: e => {
            const transform: string = e.transform;

            e.target.style.transform = transform;
        },
    },
});

mount(Moveable, {
    target,
    props: {
        // @ts-expect-error draggable is a boolean
        draggable: "yes",
    },
});

// Moveable's methods are on the component instance.
const rect: { offsetWidth: number } = moveable.getRect();

moveable.updateRect();
moveable.getInstance().updateRect();

export { rect };
