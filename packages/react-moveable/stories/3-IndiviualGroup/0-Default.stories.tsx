import type { Meta, StoryObj } from "@storybook/react-vite";
import { appStory } from "../utils/story";
import {
    DEFAULT_ROTATABLE_CONTROLS,
    DEFAULT_DRAGGABLE_CONTROLS,
    DEFAULT_SCALABLE_CONTROLS,
} from "../controls/default";
import ReactDraggableScalableRotatableApp from "./ReactDraggableScalableRotatableApp";
import ReactIndividualGroupablePropsApp from "./ReactIndividualGroupablePropsApp";

const apps = import.meta.glob("./*App.tsx", { eager: true });
const sources = import.meta.glob<string>("./{*App.tsx,script/**,vue3/**,svelte/**,lit/**}", {
    query: "?raw",
    import: "default",
    eager: true,
});


export default {
    title: "Individual Group",
} satisfies Meta;

export const IndividualGroupDraggableScalableRotatable = {
    name: "Draggable & Scalable & Rotatable",
    ...appStory(ReactDraggableScalableRotatableApp, {
        apps,
        sources,
        argTypes: {
            ...DEFAULT_SCALABLE_CONTROLS,
            ...DEFAULT_ROTATABLE_CONTROLS,
            ...DEFAULT_DRAGGABLE_CONTROLS,
        },
    }),
} satisfies StoryObj;

export const IndividualGroupGroupableProps = {
    name: "Use Individual Groupable Props",
    ...appStory(ReactIndividualGroupablePropsApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;
