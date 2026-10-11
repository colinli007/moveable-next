import type { Meta, StoryObj } from "@storybook/react-vite";
import { appStory } from "../utils/story";
import {
    DEFAULT_DRAGGABLE_CONTROLS, DEFAULT_ORIGIN_DRAGGABLE_CONTROLS, DEFAULT_RESIZABLE_CONTROLS,
    DEFAULT_ROTATABLE_CONTROLS,
    DEFAULT_SCALABLE_CONTROLS,
} from "../controls/default";
import ReactDraggableResizableRotatableApp from "./ReactDraggableResizableRotatableApp";
import ReactDraggableScalableRotatableApp from "./ReactDraggableScalableRotatableApp";
import ReactDraggableOriginDraggableRotatableApp from "./ReactDraggableOriginDraggableRotatableApp";
import ReactAllInOneApp from "./ReactAllInOneApp";

const apps = import.meta.glob("./*App.tsx", { eager: true });
const sources = import.meta.glob<string>("./{*App.tsx,script/**,vue3/**,svelte/**,lit/**}", {
    query: "?raw",
    import: "default",
    eager: true,
});

export default {
    title: "Able Combination",
} satisfies Meta;

export const CombinationDraggableResizableRotatble = {
    name: "Draggable & Resizable & Rotatable",
    ...appStory(ReactDraggableResizableRotatableApp, {
        apps,
        sources,
        argTypes: {
            ...DEFAULT_DRAGGABLE_CONTROLS,
            ...DEFAULT_RESIZABLE_CONTROLS,
            ...DEFAULT_ROTATABLE_CONTROLS,
        },
    }),
} satisfies StoryObj;
export const CombinationDraggableScalableRotatable = {
    name: "Draggable & Scalable & Rotatable",
    ...appStory(ReactDraggableScalableRotatableApp, {
        apps,
        sources,
        argTypes: {
            ...DEFAULT_DRAGGABLE_CONTROLS,
            ...DEFAULT_SCALABLE_CONTROLS,
            ...DEFAULT_ROTATABLE_CONTROLS,
        },
    }),
} satisfies StoryObj;
export const CombinationDraggableOriginRotatable = {
    name: "Draggable & OriginDraggable & Rotatable",
    ...appStory(ReactDraggableOriginDraggableRotatableApp, {
        apps,
        sources,
        argTypes: {
            ...DEFAULT_ORIGIN_DRAGGABLE_CONTROLS,
            ...DEFAULT_DRAGGABLE_CONTROLS,
            ...DEFAULT_ROTATABLE_CONTROLS,
        },
    }),
} satisfies StoryObj;

export const CombinationAllInOne = {
    name: "All In One",
    ...appStory(ReactAllInOneApp, {
        apps,
        sources,
        argTypes: {
            ...DEFAULT_ORIGIN_DRAGGABLE_CONTROLS,
            ...DEFAULT_DRAGGABLE_CONTROLS,
            ...DEFAULT_SCALABLE_CONTROLS,
            ...DEFAULT_ROTATABLE_CONTROLS,
        },
    }),
} satisfies StoryObj;
