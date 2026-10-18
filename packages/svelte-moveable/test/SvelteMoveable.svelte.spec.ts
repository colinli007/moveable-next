import { afterEach, describe, expect, it } from "vitest";
import { flushSync, mount, unmount, type Component } from "svelte";
import Moveable from "../dist/index.js";
import BindThisUsage from "./BindThisUsage.svelte";
import { createTarget, drag } from "../../../config/testing/browser";

const cleanups: Array<() => void> = [];

afterEach(() => {
    // Unmount components before removing their targets.
    cleanups.splice(0).reverse().forEach(cleanup => cleanup());
});

function target() {
    const el = createTarget();

    cleanups.push(() => el.remove());
    return el;
}

// Props are $state, so changing them updates the component the way a parent's template does.
function render(component: Component<any, any>, initialProps: Record<string, unknown>) {
    const props = $state(initialProps);
    const container = document.body.appendChild(document.createElement("div"));
    const instance = mount(component, { target: container, props });
    let mounted = true;
    const destroy = () => {
        mounted && unmount(instance);
        mounted = false;
    };

    flushSync();
    cleanups.push(() => {
        destroy();
        container.remove();
    });
    return { props, instance, el: container.firstElementChild as HTMLElement, unmount: destroy };
}

describe("svelte-moveable", () => {
    it("renders the control box for the target", async () => {
        const { el } = render(Moveable, { target: target() });

        // warpSelf: the root element itself is the control box, lines and controls are its children
        expect(el.classList.contains("moveable-control-box")).toBe(true);
        await expect.poll(() => el.querySelectorAll(".moveable-line").length).toBe(4);
    });

    it("passes prop changes after mount to moveable", async () => {
        const events: string[] = [];
        const dragTarget = target();
        const { props, instance, el } = render(Moveable, {
            target: dragTarget,
            draggable: true,
            rotatable: false,
            onDragStart: () => events.push("dragStart"),
            onDrag: () => events.push("drag"),
        });

        expect(el.querySelector(".moveable-rotation")).toBeNull();
        props.rotatable = true;
        await expect.poll(() => el.querySelector(".moveable-rotation")).not.toBeNull();

        props.draggable = false;
        // Vanilla moveable applies option changes asynchronously (croact setState).
        // getInstance() rather than a proxied method, so this also runs against the Svelte 4 component.
        await expect.poll(() => instance.getInstance().getManager().props.draggable).toBe(false);
        drag(dragTarget, [50, 30]);
        expect(events).toHaveLength(0);
    });

    it("calls the event callback props", () => {
        const events: Array<[string, any]> = [];
        const dragTarget = target();

        render(Moveable, {
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

    it("proxies moveable methods through the component instance", () => {
        const { instance } = render(Moveable, { target: target() });
        const rect = instance.getRect();

        expect([rect.offsetWidth, rect.offsetHeight]).toEqual([200, 100]);
        expect(instance.getInstance().getRect().offsetWidth).toBe(200);
    });

    it("destroys moveable when unmounted", async () => {
        const { el, unmount } = render(Moveable, { target: target() });

        await expect.poll(() => el.querySelectorAll(".moveable-line").length).toBe(4);
        unmount();
        expect(el.querySelectorAll(".moveable-line, .moveable-control")).toHaveLength(0);
    });

    it("can be unmounted right after mounting", async () => {
        const { unmount } = render(Moveable, { target: target() });

        unmount();
        // Work deferred during mount must not reach the destroyed moveable (it would be an unhandled error).
        await new Promise(resolve => setTimeout(resolve));
    });

    it("works through a component reference from bind:this", () => {
        const events: any[] = [];
        const dragTarget = target();
        // A callback, not the array itself: $state would proxy the array and keep pushes off `events`.
        const { instance } = render(BindThisUsage, { target: dragTarget, record: (e: any) => events.push(e) });

        drag(dragTarget, [50, 30]);
        expect(events.at(-1).transform).toContain("translate(50px, 30px)");
        expect(instance.getMoveable().getRect().offsetWidth).toBe(200);
    });
});
