import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { appStory, devPlay } from "../utils/story";
import {
    DEFAULT_BOUNDS_CONTROLS,
    DEFAULT_DRAGGABLE_CONTROLS,
    DEFAULT_INNER_BOUNDS_CONTROLS,
    DEFAULT_RESIZABLE_CONTROLS,
    DEFAULT_ROTATABLE_CONTROLS,
    DEFAULT_SCALABLE_CONTROLS,
    DEFAULT_SNAPPABLE_CONTROLS,
    DEFAULT_SNAPPABLE_ELEMENTS_CONTROLS,
    DEFAULT_SNAPPABLE_GUIDELINES_CONTROLS,
    DEFAULT_SNAP_CONTAINER_CONTROLS,
    DEFAULT_SNAP_GRID_CONTROLS,
} from "../controls/default";
import { makeArgType, makeLink } from "../utils";
import { pan, rotate, wait } from "../utils/testing";
import ReactSnapGuidelinesApp from "./ReactSnapGuidelinesApp";
import ReactSnapElementsApp from "./ReactSnapElementsApp";
import ReactSnapGridApp from "./ReactSnapGridApp";
import ReactSnapGridGroupApp from "./ReactSnapGridGroupApp";
import ReactBoundScalableApp from "./ReactBoundScalableApp";
import ReactBoundResizableApp from "./ReactBoundResizableApp";
import ReactBoundRotatableApp from "./ReactBoundRotatableApp";
import ReactBoundRotatableGroupApp from "./ReactBoundRotatableGroupApp";
import ReactSnapContainerApp from "./ReactSnapContainerApp";
import ReactInnerBoundResizableApp from "./ReactInnerBoundResizableApp";
import ReactMaxSnapElementApp from "./ReactMaxSnapElementApp";
import ReactSnapElementsGroupApp from "./ReactSnapElementsGroupApp";
import ReactSnapRotationsApp from "./ReactSnapRotationsApp";

const apps = import.meta.glob("./*App.tsx", { eager: true });
const sources = import.meta.glob<string>("./{*App.tsx,script/**,vue3/**,svelte/**,lit/**}", {
    query: "?raw",
    import: "default",
    eager: true,
});


export default {
    title: "Snap & Bound",
} satisfies Meta;

export const SnapGuidelines = {
    name: "Snap Guidelines",
    ...appStory(ReactSnapGuidelinesApp, {
        apps,
        sources,
        argTypes: {
            ...DEFAULT_SNAPPABLE_CONTROLS,
            ...DEFAULT_SNAPPABLE_GUIDELINES_CONTROLS,
            ...DEFAULT_DRAGGABLE_CONTROLS,
            ...DEFAULT_SCALABLE_CONTROLS,
        },
    }),
    play: devPlay(async ({ canvasElement }) => {
        await wait();
        const target = canvasElement.querySelector<HTMLElement>(".target")!;

        // from: left 100, top 150
        // to: left 52, top 2
        // result: left 49, top -1
        await pan({
            target,
            start: [0, 0],
            end: [-48, -148],
            duration: 20,
            interval: 10,
        });
        expect(target.style.transform).toBe("translate(-51px, -151px)");
    }),
} satisfies StoryObj;

export const SnapElements = {
    name: "Snap Elements",
    ...appStory(ReactSnapElementsApp, {
        apps,
        sources,
        argTypes: {
            ...DEFAULT_SNAPPABLE_CONTROLS,
            ...DEFAULT_SNAPPABLE_ELEMENTS_CONTROLS,
        },
    }),
} satisfies StoryObj;


export const SnapGrid = {
    name: "Snap Grid",
    ...appStory(ReactSnapGridApp, {
        apps,
        sources,
        argTypes: {
            ...DEFAULT_DRAGGABLE_CONTROLS,
            ...DEFAULT_SCALABLE_CONTROLS,
            ...DEFAULT_SNAP_GRID_CONTROLS,
        },
    }),
} satisfies StoryObj;


export const SnapGridGroup = {
    name: "Snap Grid Group (snapGridAll)",
    ...appStory(ReactSnapGridGroupApp, {
        apps,
        sources,
        argTypes: {
            ...DEFAULT_DRAGGABLE_CONTROLS,
            ...DEFAULT_RESIZABLE_CONTROLS,
        },
    }),
} satisfies StoryObj;

export const SnapBoundDragScale = {
    name: "Bound Drag & Scale",
    ...appStory(ReactBoundScalableApp, {
        apps,
        sources,
        argTypes: {
            ...DEFAULT_DRAGGABLE_CONTROLS,
            ...DEFAULT_SCALABLE_CONTROLS,
            ...DEFAULT_BOUNDS_CONTROLS,
        },
    }),
} satisfies StoryObj;

export const SnapBoundDragResize = {
    name: "Bound Drag & Resize",
    ...appStory(ReactBoundResizableApp, {
        apps,
        sources,
        argTypes: {
            ...DEFAULT_DRAGGABLE_CONTROLS,
            ...DEFAULT_RESIZABLE_CONTROLS,
            ...DEFAULT_BOUNDS_CONTROLS,
        },
    }),
} satisfies StoryObj;


export const SnapDragRotate = {
    name: "Bound Drag & Rotate",
    ...appStory(ReactBoundRotatableApp, {
        apps,
        sources,
        argTypes: {
            ...DEFAULT_DRAGGABLE_CONTROLS,
            ...DEFAULT_ROTATABLE_CONTROLS,
            ...DEFAULT_BOUNDS_CONTROLS,
        },
    }),
} satisfies StoryObj;

export const SnapDragRotateGroup = {
    name: "Bound Drag & Rotate Group",
    ...appStory(ReactBoundRotatableGroupApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const SnapSnapContainer = {
    name: "Use snapContainer option",
    ...appStory(ReactSnapContainerApp, {
        apps,
        sources,
        argTypes: {
            ...DEFAULT_SNAPPABLE_CONTROLS,
            ...DEFAULT_SNAP_CONTAINER_CONTROLS,
            ...DEFAULT_SNAPPABLE_GUIDELINES_CONTROLS,
            ...DEFAULT_BOUNDS_CONTROLS,
            ...DEFAULT_DRAGGABLE_CONTROLS,
        },
    }),
} satisfies StoryObj;

export const SnapInnerBoundResize = {
    name: "inner bound with resize",
    ...appStory(ReactInnerBoundResizableApp, {
        apps,
        sources,
        argTypes: {
            ...DEFAULT_INNER_BOUNDS_CONTROLS,
        },
    }),
} satisfies StoryObj;

export const SnapMaxiumDistance = {
    name: "Set maximum distance for guidelines",
    ...appStory(ReactMaxSnapElementApp, {
        apps,
        sources,
        argTypes: {
            maxSnapElementGuidelineDistance: makeArgType({
                type: "number",
                description: makeLink("maxSnapElementGuidelineDistance"),
                defaultValue: 100,
            }),
            maxSnapElementGapDistance: makeArgType({
                type: "number",
                description: makeLink("maxSnapElementGapDistance"),
                defaultValue: 80,
            }),
        },
    }),
} satisfies StoryObj;


export const SnapElementsGroup = {
    name: "Snap Elements (group)",
    ...appStory(ReactSnapElementsGroupApp, {
        apps,
        sources,
    }),
    play: devPlay(async ({ canvasElement }) => {
        await wait();
        const moveable = canvasElement.querySelector<HTMLElement>(".moveable-control-box")!;
        const target = canvasElement.querySelector<HTMLElement>(".moveable-area")!;

        await pan({
            target,
            start: [0, 0],
            end: [-118, -118],
            duration: 20,
            interval: 10,
        });
        expect(moveable.style.transform).toBe("translate3d(-1px, -1px, 0px)");
    }),
} satisfies StoryObj;


export const SnapRotations = {
    name: "Snap Rotations",
    ...appStory(ReactSnapRotationsApp, {
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
            end: 87,
            duration: 100,
            interval: 10,
            baseTarget: target,
        });
        expect(target.style.transform).toBe("translate(0px, 0px) rotate(90deg)");
    }),
} satisfies StoryObj;


// export * from "./9-maxSnapElement.stories";
