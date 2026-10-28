import { afterEach, describe, expect, it } from "vitest";
import { createApp, h, ref, shallowReactive, vShow, withDirectives } from "vue";
import VanillaMoveable from "@moveable-next/vanilla";
import Moveable from "../dist/moveable.esm.js";
import { createTarget, drag, mouse } from "../../../config/testing/browser";

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
// `containerStyle` is the style of the element the app is mounted in, the parent of the component.
function mount(initialProps: Record<string, unknown>, containerStyle = "") {
    const props = shallowReactive(initialProps);
    const moveable = ref();
    const container = document.body.appendChild(document.createElement("div"));

    container.style.cssText = containerStyle;
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
    return { props, moveable: moveable.value, el: moveable.value.$el as HTMLElement, container, unmount };
}

// Whether the lines of the control box lie on the edges of the target (within a pixel).
function linesOnTarget(el: HTMLElement, target: HTMLElement) {
    const lines = Array.from(el.querySelectorAll(".moveable-line")).map(line => line.getBoundingClientRect());
    const rect = target.getBoundingClientRect();

    return lines.length > 0 && [
        Math.min(...lines.map(line => line.left)) - rect.left,
        Math.min(...lines.map(line => line.top)) - rect.top,
        Math.max(...lines.map(line => line.right)) - rect.right,
        Math.max(...lines.map(line => line.bottom)) - rect.bottom,
    ].every(delta => Math.abs(delta) <= 1);
}

// Control boxes that are not inside another one: a group's own box, not the boxes of its targets.
function topLevelBoxes(el: HTMLElement) {
    return Array.from(el.querySelectorAll<HTMLElement>(".moveable-control-box"))
        .filter(box => !box.parentElement!.closest(".moveable-control-box"));
}

describe("vue3-moveable", () => {
    it("renders the control box for the target in a root element without a box", async () => {
        const { el, moveable } = mount({ target: target() });

        expect(getComputedStyle(el).display).toBe("contents");
        expect(topLevelBoxes(el)).toEqual([moveable.getControlBoxElement()]);
        await expect.poll(() => el.querySelectorAll(".moveable-line").length).toBe(4);
    });

    it("shows the boxes of an individual group by selector", async () => {
        const targets = [target(), target()];

        targets.forEach(el => el.classList.add("individual-target"));
        const { el } = mount({ target: ".individual-target", individualGroupable: true });

        await expect.poll(() => Array.from(el.querySelectorAll<HTMLElement>(".moveable-control-box"))
            .filter(box => box.querySelector(":scope > .moveable-line"))
            .map(box => getComputedStyle(box).visibility)).toEqual(["visible", "visible"]);
    });

    it("keeps only the control box in use while the targets change", async () => {
        const [a, b] = [target(), target()];
        const { props, el } = mount({ target: a });
        // The number of target boxes in the top-level box: a group holds one per target.
        const steps: Array<[HTMLElement | HTMLElement[], number]> = [[[a, b], 2], [[], 0], [a, 0], [[a, b], 2]];

        for (const [next, targetBoxes] of steps) {
            props.target = next;
            await expect.poll(() => topLevelBoxes(el).map(box => box.querySelectorAll(".moveable-control-box").length))
                .toEqual([targetBoxes]);
        }
    });

    // `container` back to unset: positions are computed in the parent of the component again.
    for (const unsetContainer of [false, true]) {
        it(`draws the lines on the target's edges when its parent is offset${unsetContainer ? ", after container is unset" : ""}`, async () => {
            const { container, el, props, moveable } = mount({}, "position: relative; left: 100px; top: 80px; width: 400px; height: 300px;");
            // A target inside the parent, which only exists once the app is mounted.
            const inner = container.appendChild(document.createElement("div"));

            inner.style.cssText = "position: absolute; left: 50px; top: 50px; width: 100px; height: 100px;";
            props.target = inner;
            if (unsetContainer) {
                props.container = document.body;
                // Vanilla moveable applies option changes asynchronously (croact setState)
                await expect.poll(() => moveable.getManager().props.container).toBe(document.body);
                props.container = undefined;
            }
            await expect.poll(() => linesOnTarget(el, inner)).toBe(true);
        });
    }


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

    it("does not pass native DOM events of the same name to the listeners", () => {
        const calls: unknown[] = [];
        const clickTarget = target();
        const { moveable } = mount({ target: clickTarget, draggable: true, onClick: (e: unknown) => calls.push(e) });
        const { left, top } = clickTarget.getBoundingClientRect();

        // moveable's click: pressed and released on the target without moving (needs `draggable` to listen on the target)
        clickTarget.dispatchEvent(mouse("mousedown", left + 10, top + 10));
        clickTarget.dispatchEvent(mouse("mouseup", left + 10, top + 10));
        // the browser's click on the control box, which bubbles to the root element
        moveable.getControlBoxElement().dispatchEvent(mouse("click", left, top));

        expect(calls.length).toBeGreaterThan(0);
        expect(calls.filter(e => e instanceof MouseEvent)).toHaveLength(0);
    });

    it("proxies moveable methods through the component ref", () => {
        const { moveable } = mount({ target: target() });
        const rect = moveable.getRect();

        expect([rect.offsetWidth, rect.offsetHeight]).toEqual([200, 100]);
    });

    it("restores the root element without a box after v-show hides and shows it", async () => {
        const visible = ref(true);
        const moveable = ref();
        const container = document.body.appendChild(document.createElement("div"));
        const app = createApp({
            render: () => withDirectives(h(Moveable, { target: target(), ref: moveable }), [[vShow, visible.value]]),
        });

        app.mount(container);
        cleanups.push(() => {
            app.unmount();
            container.remove();
        });
        const el = moveable.value.$el as HTMLElement;

        visible.value = false;
        await expect.poll(() => getComputedStyle(el).display).toBe("none");
        visible.value = true;
        await expect.poll(() => getComputedStyle(el).display).toBe("contents");
        expect(getComputedStyle(moveable.value.getControlBoxElement()).display).toBe("block");
    });

    it("snaps like moveable created in the parent when snapContainer is the parent", async () => {
        // The guideline at x = 200 of the parent; the target's right edge is dragged to 195.
        const options = { draggable: true, snappable: true, snapThreshold: 10, verticalGuidelines: [200] };
        const transforms: string[] = [];

        for (const create of ["vanilla", "vue"]) {
            const parent = document.body.appendChild(document.createElement("div"));
            const inner = parent.appendChild(document.createElement("div"));

            parent.style.cssText = "position: relative; left: 100px; top: 80px; width: 400px; height: 300px;";
            inner.style.cssText = "position: absolute; left: 50px; top: 50px; width: 100px; height: 100px;";
            cleanups.push(() => parent.remove());

            let transform = "";
            const onDrag = (e: any) => {
                transform = e.transform;
            };

            if (create === "vanilla") {
                const vanilla = new VanillaMoveable(parent, { ...options, target: inner, snapContainer: parent });

                vanilla.on("drag", onDrag);
                cleanups.push(() => vanilla.destroy());
            } else {
                const app = createApp({
                    render: () => h(Moveable, { ...options, target: inner, snapContainer: parent, onDrag }),
                });
                const mountPoint = parent.appendChild(document.createElement("div"));

                app.mount(mountPoint);
                cleanups.push(() => app.unmount());
            }
            await expect.poll(() => parent.querySelectorAll(".moveable-line").length).toBeGreaterThan(0);
            drag(inner, [45, 0]);
            transforms.push(transform);
        }
        // dragged by 45px, snapped to the guideline
        expect(transforms[0]).toContain("translate(50px, 0px)");
        expect(transforms[1]).toBe(transforms[0]);
    });

    it("destroys moveable when unmounted", async () => {
        const { container, unmount } = mount({ target: target() });

        await expect.poll(() => container.querySelectorAll(".moveable-line").length).toBe(4);
        unmount();
        expect(container.querySelectorAll(".moveable-control-box")).toHaveLength(0);
    });
});
