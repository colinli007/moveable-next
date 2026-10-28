import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { appStory, devPlay } from "../../utils/story";
import { rotate, wait } from "@/stories/utils/testing";
import ReactCustomOriginApp from "./ReactCustomOriginApp";
import ReactRotateWithControlsApp from "./ReactRotateWithControlsApp";
import ReactRotateWithResizeApp from "./ReactRotateWithResizeApp";
import ReactSetRotationApp from "./ReactSetRotationApp";

const apps = import.meta.glob("./*App.tsx", { eager: true });
const vueApps = import.meta.glob("./*App.vue", { import: "default" });
const sources = import.meta.glob<string>("./{*App.tsx,*App.vue,*.css}", {
    query: "?raw",
    import: "default",
    eager: true,
});


export default {
    title: "Advanced Rotatable",
} satisfies Meta;

export const AdvancedRotatableCustomOrigin = {
    name: "rotate with custom origin",
    ...appStory(ReactCustomOriginApp, {
        apps,
        sources,
        vueApps,
    }),
} satisfies StoryObj;

export const AdvancedRotatableRotateWithControls = {
    name: "rotate with direction controls",
    ...appStory(ReactRotateWithControlsApp, {
        apps,
        sources,
        vueApps,
    }),
} satisfies StoryObj;

export const AdvancedRotatableRotateWithResize = {
    name: "rotate with resize",
    ...appStory(ReactRotateWithResizeApp, {
        apps,
        sources,
        vueApps,
    }),
} satisfies StoryObj;

export const AdvancedSetRotation = {
    name: "customize the rotation value ",
    ...appStory(ReactSetRotationApp, {
        apps,
        sources,
        vueApps,
    }),
    play: devPlay(async ({ canvasElement }) => {
        await wait();

        const target = canvasElement.querySelector<HTMLElement>(".target.rotatable")!;
        const rotationControl = canvasElement.querySelector<HTMLElement>(`.moveable-control-box .moveable-rotation-control`)!;

        await rotate({
            target: rotationControl,
            start: 0,
            end: 70,
            duration: 100,
            interval: 10,
            baseTarget: target,
        });
        expect(target.style.transform).toBe("translate(0px, 0px) rotate(90deg)");
    }),
} satisfies StoryObj;
