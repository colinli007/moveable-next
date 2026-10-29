import type { Meta, StoryObj } from "@storybook/react-vite";
import { appStory } from "../utils/story";
import ReactTreeShakingApp from "./ReactTreeShakingApp";

const apps = import.meta.glob("./*App.tsx", { eager: true });
const vueApps = import.meta.glob("./*App.vue", { import: "default" });
const sources = import.meta.glob<string>("./{*App.tsx,*App.vue,*.css}", {
    query: "?raw",
    import: "default",
    eager: true,
});



export default {
    title: "Support Tree Shaking",
} satisfies Meta;


export const TreeShaking = {
    name: "Use only Draggable, Resizable, Rotatable",
    ...appStory(ReactTreeShakingApp, {
        apps,
        sources,
        vueApps,
    }),
} satisfies StoryObj;
