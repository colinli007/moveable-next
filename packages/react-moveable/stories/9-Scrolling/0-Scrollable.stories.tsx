import type { Meta, StoryObj } from "@storybook/react-vite";
import { appStory } from "../utils/story";
import { DEFAULT_SCROLLABLE_CONTROLS } from "../controls/default";
import ReactScrollableApp from "./ReactScrollableApp";

const apps = import.meta.glob("./*App.tsx", { eager: true });
const sources = import.meta.glob<string>("./{*App.tsx,script/**,vue3/**,svelte/**,lit/**}", {
    query: "?raw",
    import: "default",
    eager: true,
});

export default {
    title: "Support Scroll",
} satisfies Meta;

export const ScrollingScrollable = {
    name: "Use Scrollable",
    ...appStory(ReactScrollableApp, {
        apps,
        sources,
        argTypes: {
            ...DEFAULT_SCROLLABLE_CONTROLS,
        },
    }),
} satisfies StoryObj;
