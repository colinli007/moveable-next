import type { Meta, StoryObj } from "@storybook/react-vite";
import { appStory } from "../../utils/story";
import ReactCustomGuidelinesApp from "./ReactCustomGuidelinesApp";
import ReactCustomElementGuidelinesApp from "./ReactCustomElementGuidelinesApp";

const apps = import.meta.glob("./*App.tsx", { eager: true });
const sources = import.meta.glob<string>("./{*App.tsx,script/**,vue3/**,svelte/**,lit/**}", {
    query: "?raw",
    import: "default",
    eager: true,
});


export default {
    title: "Advanced Snappable",
} satisfies Meta;

export const AdvancedSnappableCustomGuidelines = {
    name: "Guidelines with custom styles",
    ...appStory(ReactCustomGuidelinesApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const AdvancedSnappableCustomElementGuidelines = {
    name: "Element Guidelines with custom styles",
    ...appStory(ReactCustomElementGuidelinesApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;
