import type { Meta, StoryObj } from "@storybook/react-vite";
import { appStory } from "../utils/story";
import { DEFAULT_SCROLLABLE_CONTROLS } from "../controls/default";
import ReactScrollableApp from "./ReactScrollableApp";

const apps = import.meta.glob("./*App.tsx", { eager: true });
const vueApps = import.meta.glob("./*App.vue", { import: "default" });
const sources = import.meta.glob<string>("./{*App.tsx,*App.vue,*.css}", {
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
        vueApps,
        argTypes: {
            ...DEFAULT_SCROLLABLE_CONTROLS,
        },
    }),
} satisfies StoryObj;
