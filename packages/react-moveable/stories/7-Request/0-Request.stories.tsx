import type { Meta, StoryObj } from "@storybook/react-vite";
import { appStory } from "../utils/story";
import { DEFAULT_DRAGGABLE_CONTROLS, DEFAULT_RESIZABLE_CONTROLS } from "../controls/default";
import { makeArgType } from "../utils";
import ReactDraggableApp from "./ReactDraggableApp";
import ReactResizableApp from "./ReactResizableApp";
import ReactResizableDeltaApp from "./ReactResizableDeltaApp";
import ReactResizableGroupApp from "./ReactResizableGroupApp";
import ReactDraggableSnappableApp from "./ReactDraggableSnappableApp";
import ReactResizableSnappableApp from "./ReactResizableSnappableApp";
import ReactAlignApp from "./ReactAlignApp";

const apps = import.meta.glob("./*App.tsx", { eager: true });
const sources = import.meta.glob<string>("./{*App.tsx,script/**,vue3/**,svelte/**,lit/**}", {
    query: "?raw",
    import: "default",
    eager: true,
});



export default {
    title: "Request ables through a method",
} satisfies Meta;

export const RequestDraggable = {
    name: "Draggable",
    ...appStory(ReactDraggableApp, {
        apps,
        sources,
        argTypes: {
            containerScale: makeArgType({
                type: "number",
                description: `<a href="#" target="_blank">Container's scale</a>`,
                defaultValue: 1,
            }),
            ...DEFAULT_DRAGGABLE_CONTROLS,
        },
    }),
} satisfies StoryObj;

export const RequestResizable = {
    name: "Resizable",
    ...appStory(ReactResizableApp, {
        apps,
        sources,
        argTypes: {
            ...DEFAULT_RESIZABLE_CONTROLS,
        },
    }),
} satisfies StoryObj;

export const RequestResizableDelta = {
    name: "Resizable Delta",
    ...appStory(ReactResizableDeltaApp, {
        apps,
        sources,
        argTypes: {
            ...DEFAULT_RESIZABLE_CONTROLS,
        },
    }),
} satisfies StoryObj;

export const RequestResizableGroup = {
    name: "Resizable Group",
    ...appStory(ReactResizableGroupApp, {
        apps,
        sources,
        argTypes: {
            ...DEFAULT_RESIZABLE_CONTROLS,
        },
    }),
} satisfies StoryObj;



export const RequestDraggableSnappable = {
    name: "Draggable With Snappable",
    ...appStory(ReactDraggableSnappableApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const RequestResizableSnappable = {
    name: "Resizable With Snappable",
    ...appStory(ReactResizableSnappableApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;



export const RequestDraggableAlign = {
    name: "Align",
    ...appStory(ReactAlignApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;
