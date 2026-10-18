import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { appStory, devPlay } from "../utils/story";
import { wait } from "../utils/testing";
import ReactPathApp from "./ReactPathApp";
import ReactSVGSVGApp from "./ReactSVGSVGApp";
import ReactSVGCircleApp from "./ReactSVGCircleApp";
import ReactSVGLineApp from "./ReactSVGLineApp";
import ReactSVGGApp from "./ReactSVGGApp";
import ReactSVGTargetGApp from "./ReactSVGTargetGApp";
import ReactSVGGroupApp from "./ReactSVGGroupApp";
import ReactOriginApp from "./ReactOriginApp";
import ReactOriginFillboxApp from "./ReactOriginFillboxApp";
import ReactSVGForeignObjectApp from "./ReactSVGForeignObjectApp";
import ReactSVGForeignObjectInnerApp from "./ReactSVGForeignObjectInnerApp";

const apps = import.meta.glob("./*App.tsx", { eager: true });
const sources = import.meta.glob<string>("./{*App.tsx,*.css}", {
    query: "?raw",
    import: "default",
    eager: true,
});

export default {
    title: "SVG",
} satisfies Meta;

export const SVGPathElement = {
    name: "SVGPathElement",
    ...appStory(ReactPathApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;
export const SVGSVGElement = {
    name: "SVGSVGElement",
    ...appStory(ReactSVGSVGApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const SVGCircle = {
    name: "Circle",
    ...appStory(ReactSVGCircleApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const SVGLine = {
    name: "Line",
    ...appStory(ReactSVGLineApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const SVGG = {
    name: "SVGElement with G tag",
    ...appStory(ReactSVGGApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const SVGTargetG = {
    name: "SVGElement with target G tag",
    ...appStory(ReactSVGTargetGApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;


export const SVGGroup = {
    name: "SVG Group",
    ...appStory(ReactSVGGroupApp, {
        apps,
        sources,
    }),
    play: devPlay(async ({ canvasElement }) => {
        await wait();

        const area = canvasElement.querySelector<HTMLElement>(".moveable-area")!;

        expect(area.style.width).toBe("191px");
        expect(area.style.height).toBe("57px");
        expect(area.style.transform).toBe("translate(0px, 0px) rotate(0deg) scale(1, 1)");
    }),
} satisfies StoryObj;


export const SVGOrigin = {
    name: "SVGPathElement with center origin",
    ...appStory(ReactOriginApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;


export const SVGFillboxOrigin = {
    name: "SVGPathElement with center origin and transform fill-box",
    ...appStory(ReactOriginFillboxApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;




export const SVGForeignObject = {
    name: "SVGForeignObject",
    ...appStory(ReactSVGForeignObjectApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;


export const SVGForeignObjectInner = {
    name: "SVGForeignObject div",
    ...appStory(ReactSVGForeignObjectInnerApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;
