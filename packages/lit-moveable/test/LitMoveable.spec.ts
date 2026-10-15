import { afterEach, describe, expect, it } from "vitest";
import type { LitMoveable } from "../src";
import "../dist/moveable.esm.js";
import { createTarget, drag } from "../../../config/testing/browser";

const created: HTMLElement[] = [];

afterEach(() => {
    // Remove only what is still attached: removing a <lit-moveable> twice destroys it twice and throws.
    created.splice(0).forEach(el => el.isConnected && el.remove());
});

function track<T extends HTMLElement>(el: T) {
    created.push(el);
    return el;
}

async function createMoveable(props: Partial<LitMoveable>) {
    const el = document.createElement("lit-moveable");

    Object.assign(el, props);
    document.body.appendChild(track(el));
    await el.updateComplete;
    return el;
}

function recordEvents(el: HTMLElement, names: string[]) {
    const events: CustomEvent[] = [];

    names.forEach(name => el.addEventListener(name, e => events.push(e as CustomEvent)));
    return events;
}

describe("lit-moveable", () => {
    it("renders the control box for the target", async () => {
        const target = track(createTarget());
        const el = await createMoveable({ target });

        // warpSelf: the element itself is the control box, lines and controls are its children
        expect(el.classList.contains("moveable-control-box")).toBe(true);
        await expect.poll(() => el.querySelectorAll(".moveable-line").length).toBe(4);
    });

    it("passes property changes after the first render to moveable", async () => {
        const target = track(createTarget());
        const el = await createMoveable({ target, litDraggable: true });

        expect(el.querySelector(".moveable-rotation")).toBeNull();
        el.rotatable = true;
        await el.updateComplete;
        await expect.poll(() => el.querySelector(".moveable-rotation")).not.toBeNull();

        el.litDraggable = false;
        await el.updateComplete;
        // Vanilla moveable applies option changes asynchronously (croact setState)
        await expect.poll(() => el.getManager().props.draggable).toBe(false);
        const events = recordEvents(el, ["litDragStart", "litDrag"]);

        drag(target, [50, 30]);
        expect(events).toHaveLength(0);
    });

    it("dispatches lit-prefixed drag events", async () => {
        const target = track(createTarget());
        const el = await createMoveable({ target, litDraggable: true });
        const events = recordEvents(el, ["litDragStart", "litDrag", "litDragEnd"]);

        drag(target, [50, 30]);

        expect(events.map(e => e.type)).toEqual(["litDragStart", "litDrag", "litDragEnd"]);
        expect(events[1].detail.transform).toContain("translate(50px, 30px)");
    });

    it("proxies moveable methods", async () => {
        const target = track(createTarget());
        const el = await createMoveable({ target });
        const rect = el.getRect();

        expect([rect.offsetWidth, rect.offsetHeight]).toEqual([200, 100]);
    });

    it("destroys moveable when removed", async () => {
        const target = track(createTarget());
        const el = await createMoveable({ target });

        await expect.poll(() => el.querySelectorAll(".moveable-line").length).toBe(4);
        el.remove();
        expect(el.querySelectorAll(".moveable-line, .moveable-control")).toHaveLength(0);
    });
});
