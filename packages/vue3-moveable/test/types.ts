// Compile-time checks of the published type declarations, written the way a user would (pnpm test:type).
import { defineComponent, h } from "vue";
import Moveable, { VueMoveable, makeMoveable, Draggable, DraggableProps } from "../declaration";

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

// A component of some ables has their props and events, and Moveable's methods.
const Draggables = makeMoveable<DraggableProps>([Draggable]);

h(Draggables, {
    draggable: true,
    throttleDrag: 1,
    onDrag: e => {
        const transform: string = e.transform;

        return transform;
    },
    onRender: e => e.cssText,
});
// @ts-expect-error draggable is a boolean
h(Draggables, { draggable: "yes" });

const draggables = {} as InstanceType<typeof Draggables>;
const draggable: boolean | undefined = draggables.draggable;

draggables.updateRect();
// @ts-expect-error scalable is not one of its ables
draggables.scalable;

defineComponent({ components: { Draggables } });

export { rect, draggable };
