// Compile-time checks of the published type declarations, written the way a user would (pnpm test:type).
// test/checkTypes.mjs also asserts that compiling this file never pulls in React's types.
import Moveable, { MoveableOptions, OnDrag, getElementInfo, makeAble } from "../declaration";

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

export { rect };
