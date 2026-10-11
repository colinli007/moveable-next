import type { Meta, StoryObj } from "@storybook/react-vite";
import { appStory } from "../utils/story";
import ReactSelectoApp from "./ReactSelectoApp";
import ReactSelectoMultipleGroupApp from "./ReactSelectoMultipleGroupApp";
import ReactSelectoMultipleGroupUngroupApp from "./ReactSelectoMultipleGroupUngroupApp";
import ReactSelectoNestedGroupApp from "./ReactSelectoNestedGroupApp";
import ReactInfiniteViewerApp from "./ReactInfiniteViewerApp";

const apps = import.meta.glob("./*App.tsx", { eager: true });
const sources = import.meta.glob<string>("./{*App.tsx,script/**,vue3/**,svelte/**,lit/**}", {
    query: "?raw",
    import: "default",
    eager: true,
});


export default {
    title: "Combination with Other Components",
} satisfies Meta;

export const ComponentsSelecto = {
    name: "Use Selecto",
    ...appStory(ReactSelectoApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const ComponentsSelectoWithMultipleGroup = {
    name: "Use Selecto with Multiple Group",
    ...appStory(ReactSelectoMultipleGroupApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const ComponentsSelectoWithGroupUngroup = {
    name: "Use Selecto with Group & Ungroup",
    ...appStory(ReactSelectoMultipleGroupUngroupApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;


export const ComponentsSelectoWithNestedGroup = {
    name: "Use Selecto with Nested Group",
    ...appStory(ReactSelectoNestedGroupApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;





export const ComponentsInfiniteViewer = {
    name: "Use Infinite Viewer",
    ...appStory(ReactInfiniteViewerApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;
