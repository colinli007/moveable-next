import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { appStory, devPlay } from "../utils/story";
import {
    DEFAULT_RESIZABLE_CONTROLS,
    DEFAULT_ROTATABLE_CONTROLS,
    DEFAULT_DRAGGABLE_CONTROLS,
    DEFAULT_SCALABLE_CONTROLS,
    DEFAULT_WARPABLE_CONTROLS,
    DEFAULT_CLIPPABLE_CONTROLS,
} from "../controls/default";

import { pan, pinch, rotate, wait } from "../utils/testing";
import { throttle } from "@daybrush/utils";
import { parseMat } from "css-to-mat";
import ReactDraggableApp from "./ReactDraggableApp";
import ReactResizableApp from "./ReactResizableApp";
import ReactScalableApp from "./ReactScalableApp";
import ReactRotatableApp from "./ReactRotatableApp";
import ReactWarpableApp from "./ReactWarpableApp";
import ReactClippableApp from "./ReactClippableApp";
import ReactRoundableApp from "./ReactRoundableApp";
import ReactOriginDraggableApp from "./ReactOriginDraggableApp";
import ReactPinchableApp from "./ReactPinchableApp";

const apps = import.meta.glob("./*App.tsx", { eager: true });
const sources = import.meta.glob<string>("./{*App.tsx,script/**,vue3/**,svelte/**,lit/**}", {
    query: "?raw",
    import: "default",
    eager: true,
});


export default {
    title: "Basic",
} satisfies Meta;

// temporary: a type error that does not affect rendering
export const typeErrorProbe: number = "not a number";

export const BasicDraggable = {
    name: "Draggable",
    ...appStory(ReactDraggableApp, {
        apps,
        sources,
        argTypes: {
            ...DEFAULT_DRAGGABLE_CONTROLS,
        },
    }),
    play: devPlay(async ({ canvasElement }) => {
        await wait();
        const target = canvasElement.querySelector<HTMLElement>(".target")!;
        const controlBox = canvasElement.querySelector<HTMLElement>(".moveable-control-box")!;

        expect(controlBox.style.transform).toBe("translate3d(100px, 150px, 0px)");
        await pan({
            target,
            start: [0, 0],
            end: [100, 0],
            duration: 100,
            interval: 10,
        });
        expect(target.style.transform).toBe("translate(100px, 0px)");
        expect(controlBox.style.transform).toBe("translate3d(200px, 150px, 0px)");
    }),
} satisfies StoryObj;

export const BasicResizable = {
    name: "Resizable",
    ...appStory(ReactResizableApp, {
        apps,
        sources,
        argTypes: {
            ...DEFAULT_RESIZABLE_CONTROLS,
        },
    }),
    play: devPlay(async ({ canvasElement }) => {
        await wait();

        const target = canvasElement.querySelector<HTMLElement>(".target")!;
        const resizeControl = canvasElement.querySelector<HTMLElement>(`.moveable-control-box [data-direction="se"]`)!;

        await pan({
            target: resizeControl,
            start: [0, 0],
            end: [100, 100],
            duration: 100,
            interval: 10,
        });
        expect(target.style.transform).toBe("translate(0px, 0px)");
        expect(target.style.width).toBe("200px");
        expect(target.style.height).toBe("200px");
    }),
} satisfies StoryObj;


export const BasicScalable = {
    name: "Scalable",
    ...appStory(ReactScalableApp, {
        apps,
        sources,
        argTypes: {
            ...DEFAULT_SCALABLE_CONTROLS,
        },
    }),
    play: devPlay(async ({ canvasElement }) => {
        await wait();

        const target = canvasElement.querySelector<HTMLElement>(".target")!;
        const resizeControl = canvasElement.querySelector<HTMLElement>(`.moveable-control-box [data-direction="se"]`)!;

        await pan({
            target: resizeControl,
            start: [0, 0],
            end: [50, 100],
            duration: 100,
            interval: 10,
        });
        expect(target.style.transform).toBe("translate(25px, 50px) scale(1.5, 2)");
    }),
} satisfies StoryObj;
export const BasicScalableKeepRatioTest = {
    name: "Scalable keepRatio Test",
    tags: ["hidden-test"],
    ...appStory(ReactScalableApp, {
        apps,
        sources,
        argTypes: {
            ...DEFAULT_SCALABLE_CONTROLS,
        },
        args: {
            keepRatio: true,
        },
    }),
    play: devPlay(async ({ canvasElement }) => {
        await wait();

        const target = canvasElement.querySelector<HTMLElement>(".target")!;
        const resizeControl = canvasElement.querySelector<HTMLElement>(`.moveable-control-box [data-direction="nw"]`)!;

        await pan({
            target: resizeControl,
            start: [0, 0],
            end: [300, 300],
            duration: 100,
            interval: 10,
        });
        expect(target.style.transform).toBe("translate(150px, 150px) scale(-2, -2)");
    }),
} satisfies StoryObj;

export const BaiscRotatable = {
    name: "Rotatable",
    ...appStory(ReactRotatableApp, {
        apps,
        sources,
        argTypes: {
            ...DEFAULT_ROTATABLE_CONTROLS,
        },
    }),
    play: devPlay(async ({ canvasElement }) => {
        await wait();

        const target = canvasElement.querySelector<HTMLElement>(".target")!;
        const rotationControl = canvasElement.querySelector<HTMLElement>(`.moveable-control-box .moveable-rotation-control`)!;

        await rotate({
            target: rotationControl,
            start: 0,
            end: 90,
            duration: 100,
            interval: 10,
            baseTarget: target,
        });
        expect(target.style.transform).toBe("translate(0px, 0px) rotate(90deg)");
    }),
} satisfies StoryObj;


export const BasicWarpable = {
    name: "Warpable",
    ...appStory(ReactWarpableApp, {
        apps,
        sources,
        argTypes: {
            ...DEFAULT_WARPABLE_CONTROLS,
        },
    }),
    play: devPlay(async ({ canvasElement }) => {
        await wait();

        const target = canvasElement.querySelector<HTMLElement>(".target")!;
        const seControl = canvasElement.querySelector<HTMLElement>(`.moveable-control-box [data-direction="se"]`)!;

        await pan({
            target: seControl,
            start: [0, 0],
            end: [10, 10],
            duration: 100,
            interval: 10,
        });
        const mat = parseMat(target.style.transform);

        [
            1.04545, 0.0454545, 0, -0.000909091,
            0.0454545, 1.04545, 0, -0.000909091,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ].forEach((v, i) => {
            expect(mat[i]).toBeCloseTo(v, 4);
        });
    }),
} satisfies StoryObj;


export const BasicClippable = {
    name: "Clippable",
    ...appStory(ReactClippableApp, {
        apps,
        sources,
        argTypes: {
            ...DEFAULT_DRAGGABLE_CONTROLS,
            ...DEFAULT_CLIPPABLE_CONTROLS,
        },
    }),
    play: devPlay(async ({ canvasElement }) => {
        await wait();

        const target = canvasElement.querySelector<HTMLElement>(".target")!;
        const seControl = canvasElement.querySelector<HTMLElement>(`.moveable-control-box [data-clip-index="4"]`)!;

        await pan({
            target: seControl,
            start: [0, 0],
            end: [-40, -40],
            duration: 100,
            interval: 10,
        });
        expect(target.style.clipPath).toBe(`inset(0px 40px 40px 0px)`);
    }),
} satisfies StoryObj;

export const BasicRoundable = {
    name: "Roundable",
    ...appStory(ReactRoundableApp, {
        apps,
        sources,
    }),
    play: devPlay(async ({ canvasElement }) => {
        await wait();

        const targets = canvasElement.querySelectorAll<HTMLElement>(".target")!;
        const moveables = canvasElement.querySelectorAll<HTMLElement>(".moveable-control-box")!;

        // first
        const radius0Control = moveables[0].querySelector<HTMLElement>(`[data-radius-index="0"]`)!;

        await pan({
            target: radius0Control,
            start: [0, 0],
            end: [10, 0],
            duration: 100,
            interval: 10,
        });
        expect(targets[0].style.borderRadius).toBe(`35px`);


        // second
        const radius1Control = moveables[1].querySelector<HTMLElement>(`[data-radius-index="1"]`)!;

        await pan({
            target: radius1Control,
            start: [0, 0],
            end: [-10, 0],
            duration: 100,
            interval: 10,
        });
        expect(targets[1].style.borderRadius).toBe(`25px 33px`);
    }),
} satisfies StoryObj;

export const BasicOriginDraggable = {
    name: "OriginDraggable",
    ...appStory(ReactOriginDraggableApp, {
        apps,
        sources,
    }),
    play: devPlay(async ({ canvasElement }) => {
        await wait();

        const target = canvasElement.querySelector<HTMLElement>(".target")!;
        const rotationControl = canvasElement.querySelector<HTMLElement>(`.moveable-control-box .moveable-rotation-control`)!;

        await rotate({
            target: rotationControl,
            start: 0,
            end: 60,
            duration: 100,
            interval: 10,
            baseTarget: target,
        });

        const clientRect1 = target.getBoundingClientRect();
        const originControl = canvasElement.querySelector<HTMLElement>(`.moveable-control-box .moveable-origin`)!;

        await pan({
            target: originControl,
            start: [0, 0],
            end: [30, 30],
            duration: 100,
            interval: 10,
        });

        const clientRect2 = target.getBoundingClientRect();
        expect(throttle(clientRect1.left, 0.1)).toBe(throttle(clientRect2.left, 0.1));
        expect(throttle(clientRect1.top, 0.1)).toBe(throttle(clientRect2.top, 0.1));
    }),
} satisfies StoryObj;



export const BasicPinchable = {
    name: "Pinchable",
    ...appStory(ReactPinchableApp, {
        apps,
        sources,
    }),
    play: devPlay(async ({ canvasElement }) => {
        await wait();
        const target = canvasElement.querySelector<HTMLElement>(".target")!;
        // const controlBox = canvasElement.querySelector<HTMLElement>(".moveable-control-box")!;

        await pinch({
            target,
            start: [0, 0],
            end: [100, 0],
            startOffset: [100, 0],
            endOffset: [-200, 0],
            duration: 100,
            interval: 10,
        });

        expect(target.style.transform).toBe(`translate(100px, 0px) rotate(-180deg) scale(2, 2)`);
    }),
} satisfies StoryObj;
