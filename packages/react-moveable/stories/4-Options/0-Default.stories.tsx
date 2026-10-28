import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { appStory, devPlay } from "../utils/story";

import { makeArgType, makeLink } from "../utils";
import { pan, wait } from "../utils/testing";
import ReactUseResizeObserverApp from "./ReactUseResizeObserverApp";
import ReactUseResizeObserverGroupApp from "./ReactUseResizeObserverGroupApp";
import ReactUseResizeObserverIndividualGroupApp from "./ReactUseResizeObserverIndividualGroupApp";
import ReactUseMutationObserverApp from "./ReactUseMutationObserverApp";
import ReactPaddingApp from "./ReactPaddingApp";
import ReactLinePaddingApp from "./ReactLinePaddingApp";
import ReactControlPaddingApp from "./ReactControlPaddingApp";
import ReactCheckInputApp from "./ReactCheckInputApp";
import ReactDragFocusedInputApp from "./ReactDragFocusedInputApp";
import ReactViewContainerApp from "./ReactViewContainerApp";
import ReactPersistDataApp from "./ReactPersistDataApp";
import ReactGroupPersistDataApp from "./ReactGroupPersistDataApp";
import ReactIndividualGroupPersistDataApp from "./ReactIndividualGroupPersistDataApp";
import ReactTransformedApp from "./ReactTransformedApp";
import ReactRootContainerApp from "./ReactRootContainerApp";
import ReactZoomApp from "./ReactZoomApp";
import ReactUseAccuratePositionApp from "./ReactUseAccuratePositionApp";
import ReactDragTargetApp from "./ReactDragTargetApp";
import ReactDragTargetSelfApp from "./ReactDragTargetSelfApp";

const apps = import.meta.glob("./*App.tsx", { eager: true });
const vueApps = import.meta.glob("./*App.vue", { import: "default" });
const sources = import.meta.glob<string>("./{*App.tsx,*App.vue,*.css}", {
    query: "?raw",
    import: "default",
    eager: true,
});

export default {
    title: "Options",
} satisfies Meta;

export const OptionsResizeObserver = {
    name: "useResizeObserver",
    ...appStory(ReactUseResizeObserverApp, {
        apps,
        sources,
        vueApps,
    }),
} satisfies StoryObj;

export const OptionsResizeObserverGroup = {
    name: "useResizeObserver (Group)",
    ...appStory(ReactUseResizeObserverGroupApp, {
        apps,
        sources,
        vueApps,
    }),
} satisfies StoryObj;

export const OptionsResizeObserverIndividualGroup = {
    name: "useResizeObserver (Individual Group)",
    ...appStory(ReactUseResizeObserverIndividualGroupApp, {
        apps,
        sources,
        vueApps,
    }),
} satisfies StoryObj;

export const OptionsMutationObserver = {
    name: "useMutationObserver",
    ...appStory(ReactUseMutationObserverApp, {
        apps,
        sources,
        vueApps,
    }),
} satisfies StoryObj;


export const OptionsPadding = {
    name: "padding",
    ...appStory(ReactPaddingApp, {
        apps,
        sources,
        vueApps,
    }),
    play: devPlay(async ({ canvasElement }) => {
        await wait();

        // se direction control
        const seControl = canvasElement.querySelector<HTMLElement>(`.moveable-se`)!;

        await pan({
            target: seControl,
            start: [0, 0],
            end: [100, 50],
            duration: 100,
            interval: 10,
        });
        // width 100 + padding (10 + 20) 130 => 230
        // height 100 + padding (30 + 40) 170 => 220


        const paddingAreas = canvasElement.querySelectorAll<HTMLElement>(`.moveable-padding`);
        const widthLine = canvasElement.querySelector<HTMLElement>(`[data-line-key="render-line-0"]`)!;
        const heightLine = canvasElement.querySelector<HTMLElement>(`[data-line-key="render-line-1"]`)!;

        expect(Math.round(parseFloat(widthLine.style.width))).toBe(231);
        expect(Math.round(parseFloat(heightLine.style.width))).toBe(221);

        // left
        expect(Math.round(paddingAreas[0].getBoundingClientRect().width)).toBe(10);
        // top
        expect(Math.round(paddingAreas[1].getBoundingClientRect().height)).toBe(30);
        // right
        expect(Math.round(paddingAreas[2].getBoundingClientRect().width)).toBe(20);
        // bottom
        expect(Math.round(paddingAreas[3].getBoundingClientRect().height)).toBe(40);
        // expect(canvasElement.querySelector(`[data-line-key="render-line-0"]`)
    }),
} satisfies StoryObj;

export const OptionsLinePadding = {
    name: "linePadding",
    ...appStory(ReactLinePaddingApp, {
        apps,
        sources,
        vueApps,
        argTypes: {
            linePadding: makeArgType({
                type: "number",
                description: makeLink("linePadding"),
                defaultValue: 0,
                value: 10,
            }),
        },
    }),
} satisfies StoryObj;

export const OptionsControlPadding = {
    name: "controlPadding",
    ...appStory(ReactControlPaddingApp, {
        apps,
        sources,
        vueApps,
        argTypes: {
            controlPadding: makeArgType({
                type: "number",
                description: makeLink("controlPadding"),
                defaultValue: 0,
                value: 20,
            }),
        },
    }),
} satisfies StoryObj;


export const OptionsCheckInput = {
    name: "checkInput",
    ...appStory(ReactCheckInputApp, {
        apps,
        sources,
        vueApps,
    }),
} satisfies StoryObj;


export const OptionsDragFocusedInput = {
    name: "dragFocusedInput",
    ...appStory(ReactDragFocusedInputApp, {
        apps,
        sources,
        vueApps,
    }),
} satisfies StoryObj;


export const OptionsViewContainer = {
    name: "viewContainer (Cursor is applied in viewer during dragging)",
    ...appStory(ReactViewContainerApp, {
        apps,
        sources,
        vueApps,
    }),
} satisfies StoryObj;



export const OptionsPersistData = {
    name: "persistData (First render with persisted data)",
    ...appStory(ReactPersistDataApp, {
        apps,
        sources,
        vueApps,
    }),
} satisfies StoryObj;

export const OptionsPersistDataGroup = {
    name: "persistData (First render with persisted data, group)",
    ...appStory(ReactGroupPersistDataApp, {
        apps,
        sources,
        vueApps,
    }),
} satisfies StoryObj;


export const OptionsPersistDataIndividualGroup = {
    name: "persistData (First render with persisted data, individual group)",
    ...appStory(ReactIndividualGroupPersistDataApp, {
        apps,
        sources,
        vueApps,
    }),
} satisfies StoryObj;

export const OptionsRootContainer = {
    name: "rootContainer (css transformed container)",
    ...appStory(ReactTransformedApp, {
        apps,
        sources,
        vueApps,
    }),
} satisfies StoryObj;

export const OptionsRootContainerZoom = {
    name: "rootContainer (css zoomed container)",
    ...appStory(ReactRootContainerApp, {
        apps,
        sources,
        vueApps,
    }),
} satisfies StoryObj;

export const OptionsZoom = {
    name: "zoom (line, control)",
    ...appStory(ReactZoomApp, {
        apps,
        sources,
        vueApps,
    }),
} satisfies StoryObj;


export const OptionsAccuratePosition = {
    name: "useAccuratePosition (Render in a more accurate position)",
    ...appStory(ReactUseAccuratePositionApp, {
        apps,
        sources,
        vueApps,
    }),
} satisfies StoryObj;



export const OptionsDragTarget = {
    name: "other dragTarget",
    ...appStory(ReactDragTargetApp, {
        apps,
        sources,
        vueApps,
    }),
} satisfies StoryObj;



export const OptionsDragTargetSelf = {
    name: "dragTargetSelf with other dragTarget",
    ...appStory(ReactDragTargetSelfApp, {
        apps,
        sources,
        vueApps,
    }),
} satisfies StoryObj;
