import { afterEach, describe, expect, it } from "vitest";
import Moveable, { makeMoveable, Draggable, Resizable, Rotatable } from "../dist/moveable.esm.js";
import { createTarget, drag } from "../../../config/testing/browser";

const cleanups: Array<() => void> = [];

afterEach(() => {
    cleanups.splice(0).reverse().forEach(cleanup => cleanup());
});

function target() {
    const el = createTarget();

    cleanups.push(() => el.remove());
    return el;
}

function element(parent: HTMLElement, cssText = "") {
    const el = parent.appendChild(document.createElement("div"));

    el.style.cssText = cssText;
    cleanups.push(() => el.remove());
    return el;
}

function create(parent: HTMLElement, options: Record<string, unknown>) {
    const moveable = new Moveable(parent, options);
    let destroyed = false;
    const destroy = () => {
        !destroyed && moveable.destroy();
        destroyed = true;
    };

    cleanups.push(destroy);
    return { moveable, destroy };
}

// Control boxes that are not inside another one: a group's own box, not the boxes of its targets.
function topLevelBoxes(parent: HTMLElement) {
    return Array.from(parent.querySelectorAll<HTMLElement>(".moveable-control-box"))
        .filter(box => !box.parentElement!.closest(".moveable-control-box"));
}

function describeBoxes(parent: HTMLElement) {
    return topLevelBoxes(parent).map(box => ({
        display: getComputedStyle(box).display,
        boxes: box.querySelectorAll(".moveable-control-box").length,
    }));
}

describe("moveable", () => {
    it("keeps only the control box in use while switching between a target, a group and no target", async () => {
        const parent = element(document.body);
        const [a, b] = [target(), target()];
        const { moveable } = create(parent, { target: [], draggable: true });
        const steps: Array<[Array<HTMLElement>, Array<{ display: string; boxes: number }>]> = [
            [[a, b], [{ display: "block", boxes: 2 }]],
            [[], [{ display: "none", boxes: 0 }]],
            [[a, b], [{ display: "block", boxes: 2 }]],
            [[a], [{ display: "block", boxes: 0 }]],
        ];

        for (const [targets, expected] of steps) {
            moveable.target = targets;
            // Vanilla moveable applies option changes asynchronously (croact setState)
            await expect.poll(() => describeBoxes(parent)).toEqual(expected);
        }
    });

    it("renders only the group when a selector matches several targets", async () => {
        const parent = element(document.body);

        [target(), target()].forEach(el => el.classList.add("selector-target"));
        create(parent, { target: ".selector-target", draggable: true });

        await expect.poll(() => describeBoxes(parent)).toEqual([{ display: "block", boxes: 2 }]);
    });

    it("removes all its control boxes on destroy and leaves the other children of the parent", async () => {
        const parent = element(document.body);
        const sibling = parent.appendChild(document.createElement("p"));
        const [a, b] = [target(), target()];
        const { moveable, destroy } = create(parent, { target: a, draggable: true });

        sibling.textContent = "sibling";
        for (const targets of [[a, b], [a], [a, b]]) {
            moveable.target = targets;
            // Wait for the newest box to be the one of this mode (a group holds the boxes of its targets).
            await expect.poll(() => topLevelBoxes(parent).at(-1)?.querySelectorAll(".moveable-control-box").length)
                .toBe(targets.length > 1 ? targets.length : 0);
        }
        destroy();

        expect(parent.querySelectorAll(".moveable-control-box")).toHaveLength(0);
        expect(Array.from(parent.children)).toEqual([sibling]);
        expect(sibling.textContent).toBe("sibling");
    });

    for (const [name, options] of [
        ["a target", { target: "single" }],
        ["an individual group of elements", { target: "array", individualGroupable: true }],
        ["an individual group by selector", { target: "selector", individualGroupable: true }],
    ] as const) {
        it(`shows the control boxes of ${name} after mount when container is set`, async () => {
            const parent = element(document.body);
            const targets = name === "a target" ? [target()] : [target(), target()];
            const className = `visible-target-${options.target}`;

            targets.forEach(el => el.classList.add(className));
            create(parent, {
                ...options,
                target: { single: targets[0], array: targets, selector: `.${className}` }[options.target],
                container: parent,
            });

            // the box of each target, not the individual group's box around them
            await expect.poll(() => Array.from(parent.querySelectorAll<HTMLElement>(".moveable-control-box"))
                .filter(box => box.querySelector(":scope > .moveable-line"))
                .map(box => getComputedStyle(box).visibility)).toEqual(targets.map(() => "visible"));
        });
    }

    for (const [name, cssText] of [
        ["offset", "position: relative; left: 100px; top: 80px;"],
        ["scaled", "position: relative; transform: scale(0.5); transform-origin: 0 0;"],
    ]) {
        it(`draws the lines on the target's edges in a ${name} parent`, async () => {
            const parent = element(document.body, `${cssText} width: 400px; height: 300px;`);
            const inner = element(parent, "position: absolute; left: 50px; top: 50px; width: 100px; height: 100px;");

            create(parent, { target: inner, draggable: true });

            await expect.poll(() => {
                const lines = Array.from(parent.querySelectorAll(".moveable-line"))
                    .map(line => line.getBoundingClientRect());
                const rect = inner.getBoundingClientRect();

                return lines.length && [
                    Math.min(...lines.map(line => line.left)) - rect.left,
                    Math.min(...lines.map(line => line.top)) - rect.top,
                    Math.max(...lines.map(line => line.right)) - rect.right,
                    Math.max(...lines.map(line => line.bottom)) - rect.bottom,
                ].every(delta => Math.abs(delta) <= 1);
            }).toBe(true);
        });
    }
});

describe("makeMoveable", () => {
    it("drags, resizes and rotates with the combined ables", async () => {
        const el = target();
        const DragResizeRotate = makeMoveable([Draggable, Resizable, Rotatable]);
        const made = new DragResizeRotate(document.body, { target: el, draggable: true, resizable: true, rotatable: true });
        const events: string[] = [];

        cleanups.push(() => made.destroy());
        for (const name of ["drag", "resize", "rotate", "render"]) {
            made.on(name, () => events.push(name));
        }
        const box = made.getControlBoxElement();

        await expect.poll(() => box.querySelectorAll(".moveable-line").length).toBeGreaterThan(0);
        drag(el, [50, 30]);
        drag(box.querySelector<HTMLElement>(".moveable-se")!, [20, 10]);
        drag(box.querySelector<HTMLElement>(".moveable-rotation-control")!, [60, 60]);

        expect(new Set(events)).toEqual(new Set(["drag", "resize", "rotate", "render"]));
    });

    it("keeps the option accessors that a subclass defines, and shares the ables of its class", () => {
        class CustomMoveable extends Moveable {
            get className() {
                return "custom";
            }
            set className(_: string) {}
        }
        const moveable = new CustomMoveable(document.body, { target: target() });

        cleanups.push(() => moveable.destroy());

        expect(moveable.className).toBe("custom");
        expect(CustomMoveable.getAbleInfo()).toBe(Moveable.getAbleInfo());
    });

    it("has the options of the combined ables as properties, and not the others", async () => {
        const Draggables = makeMoveable([Draggable]);
        const made = new Draggables(document.body, { target: target(), draggable: true, scalable: true });

        cleanups.push(() => made.destroy());
        made.draggable = false;

        // Vanilla moveable applies option changes asynchronously (croact setState)
        await expect.poll(() => made.draggable).toBe(false);
        expect(Object.getOwnPropertyDescriptor(Draggables.prototype, "draggable")?.set).toBeTypeOf("function");
        expect(Object.getOwnPropertyDescriptor(Draggables.prototype, "scalable")).toBeUndefined();
        expect(made.getRect().offsetWidth).toBe(200);
        // scalable is not combined: it renders no controls
        expect(made.getControlBoxElement().querySelectorAll(".moveable-control")).toHaveLength(0);
    });
});
