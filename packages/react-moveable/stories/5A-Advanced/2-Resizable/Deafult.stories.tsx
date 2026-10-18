import type { Meta, StoryObj } from "@storybook/react-vite";
import { appStory } from "../../utils/story";
import ReactFixedDirectionApp from "./ReactFixedDirectionApp";
import ReactFlexApp from "./ReactFlexApp";
import ReactGroupMinSizeApp from "./ReactGroupMinSizeApp";
import ReactWithEdgeControlApp from "./ReactWithEdgeControlApp";

const apps = import.meta.glob("./*App.tsx", { eager: true });
const sources = import.meta.glob<string>("./{*App.tsx,*.css}", {
    query: "?raw",
    import: "default",
    eager: true,
});


export default {
    title: "Advacned Resizable",
} satisfies Meta;

export const AdvancedResizableFixedDirection = {
    name: "Resizable & Scalable with fixed direction",
    ...appStory(ReactFixedDirectionApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const AdvancedResizableFlex = {
    name: "Resizable with display: flex",
    ...appStory(ReactFlexApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const AdvancedResizableGroupMinSize = {
    name: "Limit Sizes with Group",
    ...appStory(ReactGroupMinSizeApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const AdvancedResizableEdgeControl = {
    name: "Using Edges and Controls with Draggable, Resizable, and Scalable",
    ...appStory(ReactWithEdgeControlApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;
