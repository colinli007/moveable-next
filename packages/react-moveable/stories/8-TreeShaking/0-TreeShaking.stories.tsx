import type { Meta, StoryObj } from "@storybook/react-vite";
import { appStory } from "../utils/story";
import TreeShakingApp from "./TreeShakingApp";

const apps = import.meta.glob("./*App.tsx", { eager: true });
const sources = import.meta.glob<string>("./{*App.tsx,*.css}", {
    query: "?raw",
    import: "default",
    eager: true,
});



export default {
    title: "Support Tree Shaking",
} satisfies Meta;


export const TreeShaking = {
    name: "Use only Draggable, Resizable, Rotatable",
    // @moveable-next/vanilla and @moveable-next/vue3 have no makeMoveable.
    tags: ["react-only"],
    ...appStory(TreeShakingApp, {
        apps,
        sources,
        vue: false,
    }),
} satisfies StoryObj;
