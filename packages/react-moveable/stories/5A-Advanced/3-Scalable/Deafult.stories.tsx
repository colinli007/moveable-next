import type { Meta, StoryObj } from "@storybook/react-vite";
import { appStory } from "../../utils/story";
import ReactScalableMinMaxApp from "./ReactScalableMinMaxApp";

const apps = import.meta.glob("./*App.tsx", { eager: true });
const sources = import.meta.glob<string>("./{*App.tsx,*.css}", {
    query: "?raw",
    import: "default",
    eager: true,
});


export default {
    title: "Advacned Scalable",
} satisfies Meta;

export const AdvancedScalableMinMax = {
    name: "Scalable with min, max size",
    ...appStory(ReactScalableMinMaxApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;
