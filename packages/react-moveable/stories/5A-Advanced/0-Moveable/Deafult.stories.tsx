import type { Meta, StoryObj } from "@storybook/react-vite";
import { appStory } from "../../utils/story";
import ReactPositionFixedApp from "./ReactPositionFixedApp";
import ReactSelectFormApp from "./ReactSelectFormApp";
import ReactNoRelativeApp from "./ReactNoRelativeApp";

const apps = import.meta.glob("./*App.tsx", { eager: true });
const vueApps = import.meta.glob("./*App.vue", { import: "default" });
const sources = import.meta.glob<string>("./{*App.tsx,*App.vue,*.css}", {
    query: "?raw",
    import: "default",
    eager: true,
});

export default {
    title: "Advanced Moveable Settings",
} satisfies Meta;

export const AdancedMoveablePositionFixed = {
    name: "Target with position: fixed;",
    ...appStory(ReactPositionFixedApp, {
        apps,
        sources,
        vueApps,
    }),
} satisfies StoryObj;

export const AdancedMoveableSelectForm = {
    name: "Select Form",
    ...appStory(ReactSelectFormApp, {
        apps,
        sources,
        vueApps,
    }),
} satisfies StoryObj;

export const AdancedMoveableNoRelative = {
    name: "Static Body",
    ...appStory(ReactNoRelativeApp, {
        apps,
        sources,
        vueApps,
    }),
} satisfies StoryObj;
