import type { Meta, StoryObj } from "@storybook/react-vite";
import { appStory } from "../../utils/story";
import ReactClippableApp from "./ReactClippableApp";
import ReactClippedAreaApp from "./ReactClippedAreaApp";
import ReactClipSnapApp from "./ReactClipSnapApp";
import ReactClippableResizableKeepRatioApp from "./ReactClippableResizableKeepRatioApp";

const apps = import.meta.glob("./*App.tsx", { eager: true });
const sources = import.meta.glob<string>("./{*App.tsx,script/**,vue3/**,svelte/**,lit/**}", {
    query: "?raw",
    import: "default",
    eager: true,
});


export default {
    title: "Adavanced Clippable",
} satisfies Meta;

export const AdvancedClippable = {
    name: "Clippable with Drag, Resize, Rotate",
    ...appStory(ReactClippableApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;


export const AdvancedClippableClippedArea = {
    name: "Drag, Resize, Rotate with Clipped Area (Testing)",
    ...appStory(ReactClippedAreaApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;


export const AdvancedClippableClipSnap = {
    name: "Clip & Snap",
    ...appStory(ReactClipSnapApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const AdvancedClippableResizableKeepRatio = {
    name: "keepRatio for both clippable and resizeable",
    ...appStory(ReactClippableResizableKeepRatioApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;
