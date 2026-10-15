// Compile-time checks of the published type declarations, written the way a user would (pnpm test:type).
import { defineComponent, h } from "vue";
import Moveable, { VueMoveable } from "../declaration";

// Props are typed and event listeners receive moveable's event types.
h(Moveable, {
    draggable: true,
    throttleDrag: 1,
    onDrag: e => {
        const transform: string = e.transform;

        return transform;
    },
});

// @ts-expect-error draggable is a boolean
h(Moveable, { draggable: "yes" });

// Moveable's methods are on the component instance.
const moveable = {} as InstanceType<typeof Moveable>;
const rect: { offsetWidth: number } = moveable.getRect();

moveable.updateRect();

// Usable as a child component.
defineComponent({ components: { Moveable, VueMoveable } });

export { rect };
