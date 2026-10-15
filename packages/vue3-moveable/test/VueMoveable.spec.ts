import { afterEach, describe, expect, it } from "vitest";
import { createApp, h, ref, shallowReactive } from "vue";
import Moveable from "../dist/moveable.esm.js";
import { createTarget, drag } from "../../../config/testing/browser";

const cleanups: Array<() => void> = [];

afterEach(() => {
    // Unmount apps before removing their targets.
    cleanups.splice(0).reverse().forEach(cleanup => cleanup());
});

function target() {
    const el = createTarget();

    cleanups.push(() => el.remove());
    return el;
}

// Renders <Moveable v-bind="props" ref="moveable" /> the way a template does: props are reactive.
function mount(initialProps: Record<string, unknown>) {
    const props = shallowReactive(initialProps);
    const moveable = ref();
    const container = document.body.appendChild(document.createElement("div"));
    const app = createApp({ render: () => h(Moveable, { ...props, ref: moveable }) });
    let mounted = true;
    const unmount = () => {
        mounted && app.unmount();
        mounted = false;
    };

    app.mount(container);
    cleanups.push(() => {
        unmount();
        container.remove();
    });
    return { props, moveable: moveable.value, el: moveable.value.$el as HTMLElement, unmount };
}

describe("vue3-moveable", () => {
    it("renders the control box for the target", async () => {
        const { el } = mount({ target: target() });

        // warpSelf: the root element itself is the control box, lines and controls are its children
        expect(el.classList.contains("moveable-control-box")).toBe(true);
        await expect.poll(() => el.querySelectorAll(".moveable-line").length).toBe(4);
    });

    it("passes prop changes after mount to moveable", async () => {
        const events: string[] = [];
        const dragTarget = target();
        const { props, moveable, el } = mount({
            target: dragTarget,
            draggable: true,
            onDragStart: () => events.push("dragStart"),
            onDrag: () => events.push("drag"),
        });

        expect(el.querySelector(".moveable-rotation")).toBeNull();
        props.rotatable = true;
        await expect.poll(() => el.querySelector(".moveable-rotation")).not.toBeNull();

        props.draggable = false;
        // Vanilla moveable applies option changes asynchronously (croact setState)
        await expect.poll(() => moveable.getManager().props.draggable).toBe(false);
        drag(dragTarget, [50, 30]);
        expect(events).toHaveLength(0);
    });

    it("emits drag events", () => {
        const events: Array<[string, any]> = [];
        const dragTarget = target();

        mount({
            target: dragTarget,
            draggable: true,
            onDragStart: (e: any) => events.push(["dragStart", e]),
            onDrag: (e: any) => events.push(["drag", e]),
            onDragEnd: (e: any) => events.push(["dragEnd", e]),
        });
        drag(dragTarget, [50, 30]);

        expect(events.map(([name]) => name)).toEqual(["dragStart", "drag", "dragEnd"]);
        expect(events[1][1].transform).toContain("translate(50px, 30px)");
    });

    it("proxies moveable methods through the component ref", () => {
        const { moveable } = mount({ target: target() });
        const rect = moveable.getRect();

        expect([rect.offsetWidth, rect.offsetHeight]).toEqual([200, 100]);
    });

    it("destroys moveable when unmounted", async () => {
        const { el, unmount } = mount({ target: target() });

        await expect.poll(() => el.querySelectorAll(".moveable-line").length).toBe(4);
        unmount();
        expect(el.querySelectorAll(".moveable-line, .moveable-control")).toHaveLength(0);
    });
});
