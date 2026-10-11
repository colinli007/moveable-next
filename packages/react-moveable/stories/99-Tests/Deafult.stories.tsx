import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { appStory, devPlay } from "../utils/story";
import { splitBracket, splitComma } from "@daybrush/utils";
import { findMoveable, pan, wait } from "../utils/testing";
import ReactNoTargetApp from "./ReactNoTargetApp";
import ReactATagApp from "./ReactATagApp";
import ReactInputApp from "./ReactInputApp";
import ReactSafariApp from "./ReactSafariApp";
import ReactCustomElementApp from "./ReactCustomElementApp";
import ReactCustomElementBoundsApp from "./ReactCustomElementBoundsApp";
import ReactAccuracyApp from "./ReactAccuracyApp";
import ReactLargeZoomElementGuidelinesApp from "./ReactLargeZoomElementGuidelinesApp";
import ReactFlexApp from "./ReactFlexApp";
import ReactWillChangeApp from "./ReactWillChangeApp";
import ReactStopDragApp from "./ReactStopDragApp";
import ReactClickApp from "./ReactClickApp";
import ReactNestedTargetApp from "./ReactNestedTargetApp";
import ReactZoomedCursorApp from "./ReactZoomedCursorApp";
import ReactHandleLargeNumberApp from "./ReactHandleLargeNumberApp";
import ReactOverflowApp from "./ReactOverflowApp";
import ReactDragTargetApp from "./ReactDragTargetApp";
import ReactDragStartGroupApp from "./ReactDragStartGroupApp";
import ReactChangingSnapContainerApp from "./ReactChangingSnapContainerApp";
import ReactFixedSnapApp from "./ReactFixedSnapApp";
import ReactZoomedTargetApp from "./ReactZoomedTargetApp";
import ReactTRSTargetApp from "./ReactTRSTargetApp";
import ReactZoomedSnapApp from "./ReactZoomedSnapApp";
import ReactRequestBoundsApp from "./ReactRequestBoundsApp";
import ReactRotateClippableApp from "./ReactRotateClippableApp";
import ReactAccurateElementGuidelineApp from "./ReactAccurateElementGuidelineApp";
import ReactAccurateElementGuideline2App from "./ReactAccurateElementGuideline2App";
import ReactDragAPIApp from "./ReactDragAPIApp";
import ReactChangeTargetsOnClickApp from "./ReactChangeTargetsOnClickApp";
import ReactScalableKeepRatioApp from "./ReactScalableKeepRatioApp";
import ReactIframeApp from "./ReactIframeApp";
import ReactGroupPaddingApp from "./ReactGroupPaddingApp";
import ReactTranslate50App from "./ReactTranslate50App";
import ReactNestedSVGApp from "./ReactNestedSVGApp";

const apps = import.meta.glob("./*App.tsx", { eager: true });
const sources = import.meta.glob<string>("./{*App.tsx,script/**,vue3/**,svelte/**,lit/**}", {
    query: "?raw",
    import: "default",
    eager: true,
});

export default {
    title: "Variable Situations",
} satisfies Meta;

export const TestsNoTarget = {
    name: "No Target",
    ...appStory(ReactNoTargetApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;
export const TestsClickATag = {
    name: "Click a tag",
    ...appStory(ReactATagApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const TestsInput = {
    name: "Any native input element",
    ...appStory(ReactInputApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;
export const TestsSafari = {
    name: "Test Control Box in Safari",
    ...appStory(ReactSafariApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;
export const TestsCustomElement = {
    name: "Test Custom Element Offset",
    ...appStory(ReactCustomElementApp, {
        apps,
        sources,
    }),
    play: devPlay(async ({ canvasElement }) => {
        await wait();
        const moveableElement = findMoveable(canvasElement);

        expect(moveableElement.style.transform).toBe("translate3d(60px, 192px, 0px)");
    }),
} satisfies StoryObj;
export const TestsCustomElementBounds = {
    name: "Test Custom Element with Bounds",
    ...appStory(ReactCustomElementBoundsApp, {
        apps,
        sources,
    }),
    play: devPlay(async ({ canvasElement }) => {
        await wait();
        const customElement = canvasElement.querySelector("custom-element")!;
        const innerMoveable = customElement!.shadowRoot!.querySelector<HTMLElement>(".moveable-control-box")!;

        expect(innerMoveable.style.transform).toBe("translate3d(50px, 50px, 0px)");
    }),
} satisfies StoryObj;
export const TestsAccuracy = {
    name: "Check drag accuracy when using bounds",
    ...appStory(ReactAccuracyApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const TestsLargeZoom = {
    name: "Check element guidelines accuracy when zoom is large",
    ...appStory(ReactLargeZoomElementGuidelinesApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const TestsFlex = {
    name: "Test flex element",
    ...appStory(ReactFlexApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const TestsWillChange = {
    name: "Test Container with will change",
    ...appStory(ReactWillChangeApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const TestsStopDrag = {
    name: "Stop drag if target is select, input, textarea",
    ...appStory(ReactStopDragApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const TestsClick = {
    name: "Stop Click event's Propagation for dragStart",
    ...appStory(ReactClickApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const TestsNestedTarget = {
    name: "Nested Moveable's target",
    ...appStory(ReactNestedTargetApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const TestsZoomedCursor = {
    name: "Zoomed Cursor",
    ...appStory(ReactZoomedCursorApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const TestsHandleLargeNumber = {
    name: "Test performance for large number instances",
    ...appStory(ReactHandleLargeNumberApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const TestsOverflow = {
    name: "Test overflow: auto target",
    ...appStory(ReactOverflowApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const TestsDragtarget = {
    name: "Test Drag Target",
    ...appStory(ReactDragTargetApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const TestsDragStart = {
    name: "Test Drag Start Group Manually",
    ...appStory(ReactDragStartGroupApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const TestsChangingSnapContainer = {
    name: "Test Changing Snap Container",
    ...appStory(ReactChangingSnapContainerApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const TestsFixedSnap = {
    name: "Test Snap with position: fixed",
    ...appStory(ReactFixedSnapApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;


export const TestsZoomedTarget = {
    name: "Test css zoomed target",
    ...appStory(ReactZoomedTargetApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;


export const TestsTRSTarget = {
    name: "Test css translate & rotate & scale target",
    ...appStory(ReactTRSTargetApp, {
        apps,
        sources,
    }),
    play: devPlay(async ({ canvasElement }) => {
        await wait();
        const target = canvasElement.querySelector<HTMLElement>(".target")!;
        const controlBox = canvasElement.querySelector<HTMLElement>(".moveable-control-box")!;


        // x1 => x2
        const line1 = controlBox.querySelector<HTMLElement>(`[data-line-key="render-line-0"]`)!;
        // y1 => y2
        const line2 = controlBox.querySelector<HTMLElement>(`[data-line-key="render-line-1"]`)!;

        // 100x 200
        expect(line1.style.width).toBe("101px");
        expect(line2.style.width).toBe("201px");
        expect(splitComma(splitBracket(controlBox.style.transform).value!).map(v => {
            return parseInt(v, 10);
        })).toEqual([243, 248, 0]);

        await pan({
            target,
            start: [0, 0],
            end: [100, 0],
            duration: 100,
            interval: 10,
        });
        expect(splitComma(splitBracket(target.style.transform).value!).map(v => {
            return parseInt(v, 10);
        })).toEqual([186, -25]);
        expect(splitComma(splitBracket(controlBox.style.transform).value!).map(v => {
            return parseInt(v, 10);
        })).toEqual([343, 248, 0]);
    }),
} satisfies StoryObj;

export const TestsZoomedSnap = {
    name: "Test snap for scaled target",
    ...appStory(ReactZoomedSnapApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const TestsRequestBounds = {
    name: "Test request with bounds",
    ...appStory(ReactRequestBoundsApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;

export const TestsRotateClippable = {
    name: "Test rotate & clippable",
    ...appStory(ReactRotateClippableApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;


export const TestsAccurateElementGuidelines = {
    name: "Test Accurate Element Guidelines",
    ...appStory(ReactAccurateElementGuidelineApp, {
        apps,
        sources,
    }),
    play: devPlay(async ({ canvasElement }) => {
        await wait();
        const target = canvasElement.querySelector<HTMLElement>(".target2")!;
        // const controlBox = canvasElement.querySelector<HTMLElement>(".moveable-control-box")!;

        await pan({
            target,
            start: [0, 0],
            end: [-1, -1],
            duration: 10,
            interval: 10,
        });
        expect(target.style.transform).toBe("translate(0px, 0px)");
        // expect(controlBox.style.transform).toBe("translate3d(200px, 200px, 0px)");
    }),
} satisfies StoryObj;

export const TestsAccurateElementGuidelines2 = {
    name: "Test Accurate Element Guidelines 0.2",
    ...appStory(ReactAccurateElementGuideline2App, {
        apps,
        sources,
    }),
    play: devPlay(async ({ canvasElement }) => {
        await wait();
        const target = canvasElement.querySelector<HTMLElement>(".target2")!;

        await pan({
            target,
            start: [0, 0],
            end: [-1, -1],
            duration: 10,
            interval: 10,
        });
        expect(target.style.transform).toBe("translate(0px, 0px)");
    }),
} satisfies StoryObj;

export const TestDragAPI = {
    name: "Test Drag API",
    ...appStory(ReactDragAPIApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;


export const TestChangeTargetsOnClick = {
    name: "Test Change Target on Click Group",
    ...appStory(ReactChangeTargetsOnClickApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;



export const TestScalableKeepRatio = {
    name: "Even if the size is 0, the ratio is maintained.",
    ...appStory(ReactScalableKeepRatioApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;



export const TestIframe = {
    name: "Test Iframe",
    ...appStory(ReactIframeApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;


export const TestGroupPadding = {
    name: "Test Show Group's Padding",
    ...appStory(ReactGroupPaddingApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;


export const TestTranslate50 = {
    name: "Test translate(-50%, -50%)",
    ...appStory(ReactTranslate50App, {
        apps,
        sources,
    }),
    play: devPlay(async ({ canvasElement }) => {
        await wait();
        const target = canvasElement.querySelector<HTMLElement>(".target")!;
        const controlBox = canvasElement.querySelector<HTMLElement>(".moveable-control-box")!;

        expect(controlBox.style.transform).toBe("translate3d(50px, 100px, 0px)");
        await pan({
            target,
            start: [0, 0],
            end: [100, 0],
            duration: 100,
            interval: 10,
        });
        expect(target.style.transform).toBe("translate(50px, -50px)");
        expect(controlBox.style.transform).toBe("translate3d(150px, 100px, 0px)");
    }),
} satisfies StoryObj;


export const TestNestedSVG = {
    name: "Test Nested SVG",
    ...appStory(ReactNestedSVGApp, {
        apps,
        sources,
    }),
} satisfies StoryObj;
