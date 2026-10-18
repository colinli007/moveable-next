import type { Meta, StoryObj } from "@storybook/react-vite";
import { appStory } from "../utils/story";
import ReactDimensionViewableApp from "./ReactDimensionViewableApp";
import ReactEditableApp from "./ReactEditableApp";
import ReactCustomRotatableApp from "./ReactCustomRotatableApp";
import ReactMouseEnterLeaveApp from "./ReactMouseEnterLeaveApp";
import ReactDragTargetAbleApp from "./ReactDragTargetAbleApp";

const apps = import.meta.glob("./*App.tsx", { eager: true });
const sources = import.meta.glob<string>("./{*App.tsx,*.css}", {
    query: "?raw",
    import: "default",
    eager: true,
});

export default {
    title: "Make Custom Able",
} satisfies Meta;

export const CustomAbleDimensionViewable = {
    name: "DimensionViewable",
    ...appStory(ReactDimensionViewableApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const CustomAbleEditable = {
    name: "Editable",
    ...appStory(ReactEditableApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const CustomAbleRotatble = {
    name: "Custom Rotatable",
    ...appStory(ReactCustomRotatableApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const CustomAbleMouseEnterLeave = {
    name: "Mouse Enter & Leave",
    ...appStory(ReactMouseEnterLeaveApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;


export const CustomAbleDragTarget = {
    name: "DragTarget",
    ...appStory(ReactDragTargetAbleApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;
