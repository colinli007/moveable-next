// Compile-time checks of the published type declarations, written the way a user would (pnpm test:type).
// test/checkTypes.mjs also asserts that compiling this file never pulls in React's types.
import Moveable, {
    MoveableOptions, OnDrag, OnRender, getElementInfo, makeAble,
    makeMoveable, Draggable, Resizable, Rotatable, DraggableProps, ResizableProps, RotatableProps,
} from "../declaration";

const options: MoveableOptions = {
    target: document.querySelector<HTMLElement>(".target"),
    draggable: true,
    throttleDrag: 1,
};
const moveable = new Moveable(document.body, options);

// Options are properties of the instance.
moveable.resizable = true;

// Event parameters carry moveable's event types plus `stop`.
moveable.on("drag", e => {
    const event: OnDrag = e;

    event.target.style.transform = e.transform;
    e.stop();
});

// @ts-expect-error draggable is a boolean
moveable.setState({ draggable: "yes" });

// Methods and helpers.
const rect: { offsetWidth: number } = moveable.getRect();

moveable.updateRect();
getElementInfo(document.body);
makeAble("custom", { props: ["custom"] as const });

// The default export is a class.
class CustomMoveable extends Moveable {}
const instance: InstanceType<typeof Moveable> = new CustomMoveable(document.body);

// A Moveable of some ables has their options and events, and those of the ables every Moveable has.
const DragResizeRotate = makeMoveable<DraggableProps & ResizableProps & RotatableProps>([Draggable, Resizable, Rotatable]);
const made = new DragResizeRotate(document.body, { target: document.body, draggable: true, rotatable: true });

made.resizable = true;
made.on("drag", e => {
    const event: OnDrag = e;

    event.target.style.transform = e.transform;
    e.stop();
});
made.on("render", e => {
    const event: OnRender = e;

    return event.transform;
});
made.setState({ throttleRotate: 10 }, () => made.updateRect());

// @ts-expect-error scalable is not one of its ables
made.scalable = true;
// @ts-expect-error scale is not one of its events
made.on("scale", () => {});
// @ts-expect-error scalable is not one of its ables
new DragResizeRotate(document.body, { scalable: true });
// @ts-expect-error draggable is a boolean
made.setState({ draggable: "yes" });

export { rect, instance };
