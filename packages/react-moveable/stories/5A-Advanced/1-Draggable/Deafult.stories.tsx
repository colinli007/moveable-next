import type { Meta, StoryObj } from "@storybook/react-vite";
import { appStory } from "../../utils/story";
import ReactEdgeDraggableWithEdgeApp from "./ReactEdgeDraggableWithEdgeApp";

const apps = import.meta.glob("./*App.tsx", { eager: true });
const vueApps = import.meta.glob("./*App.vue", { import: "default" });
const sources = import.meta.glob<string>("./{*App.tsx,*App.vue,*.css}", {
    query: "?raw",
    import: "default",
    eager: true,
});


export default {
    title: "advanced Draggable",
} satisfies Meta;

export const AdvancedDraggableEdgeDraggable = {
    name: "edgeDraggable with edge",
    ...appStory(ReactEdgeDraggableWithEdgeApp, {
        apps,
        sources,
        vueApps,
    }),
} satisfies StoryObj;
