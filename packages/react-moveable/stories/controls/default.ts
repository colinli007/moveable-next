import { makeArgType, makeLink, makeTypeLink } from "../utils";

export const SCALE_CONTROLS = {
    "containerScale": makeArgType({
        type: "number",
        description: "container's scale",
        defaultValue: 1,
    }),
};

export const DEFAULT_CONTROLS = {
    padding: makeArgType({
        type: "object",
        description: makeLink("padding"),
        defaultValue: { left: 0, top: 0, right: 0, bottom: 0 },
    }),
    hideDefaultLines: makeArgType({
        type: "boolean",
        description: makeLink("hideDefaultLines"),
        defaultValue: false,
    }),
};


export const DEFAULT_SCROLLABLE_CONTROLS = {
    threshold: makeArgType({
        type: "number",
        description: makeLink("scrollOptions"),
        defaultValue: 30,
    }),
    throttleTime: makeArgType({
        type: "number",
        description: makeLink("scrollOptions"),
        defaultValue: 0,
    }),
    checkScrollEvent: makeArgType({
        type: "boolean",
        description: makeLink("scrollOptions"),
        defaultValue: false,
    }),
};

export const DEFAULT_DRAGGABLE_CONTROLS = {
    draggable: makeArgType({
        type: "boolean",
        description: makeLink("draggable"),
        defaultValue: true,
    }),
    throttleDrag: makeArgType({
        type: "number",
        description: makeLink("throttleDrag"),
        defaultValue: 1,
    }),
    edgeDraggable: makeArgType({
        type: "boolean",
        description: makeLink("edgeDraggable"),
        defaultValue: false,
    }),
    throttleDragRotate: makeArgType({
        type: "number",
        description: makeLink("throttleDragRotate"),
        defaultValue: 0,
    }),
    startDragRotate: makeArgType({
        type: "number",
        description: makeLink("startDragRotate"),
        defaultValue: 0,
    }),
};

export const DEFAULT_RESIZABLE_CONTROLS = {
    resizable: makeArgType({
        type: "boolean",
        description: makeLink("resizable"),
        defaultValue: true,
    }),
    edge: makeArgType({
        type: "object",
        description: makeLink("edge"),
        defaultValue: [],
    }),
    maxWidth: makeArgType({
        type: "text",
        description: makeTypeLink("OnResizeStart", "setMax"),
        defaultValue: "auto",
    }),
    maxHeight: makeArgType({
        type: "text",
        description: makeTypeLink("OnResizeStart", "setMax"),
        defaultValue: "auto",
    }),
    minWidth: makeArgType({
        type: "text",
        description: makeTypeLink("OnResizeStart", "setMin"),
        defaultValue: "auto",
    }),
    minHeight: makeArgType({
        type: "text",
        description: makeTypeLink("OnResizeStart", "setMin"),
        defaultValue: "auto",
    }),
    keepRatio: makeArgType({
        type: "boolean",
        description: makeLink("keepRatio"),
        defaultValue: false,
    }),
    throttleResize: makeArgType({
        type: "number",
        description: makeLink("throttleResize"),
        defaultValue: 1,
    }),
    renderDirections: makeArgType({
        type: "object",
        description: makeLink("renderDirections"),
        defaultValue: ["nw", "n", "ne", "w", "e", "sw", "s", "se"],
    }),
};

export const DEFAULT_SCALABLE_CONTROLS = {
    scalable: makeArgType({
        type: "boolean",
        description: makeLink("scalable"),
        defaultValue: true,
    }),
    keepRatio: makeArgType({
        type: "boolean",
        description: makeLink("keepRatio"),
        defaultValue: false,
    }),
    throttleScale: makeArgType({
        type: "number",
        description: makeLink("throttleScale"),
        defaultValue: 0,
    }),
    renderDirections: makeArgType({
        type: "object",
        description: makeLink("renderDirections"),
        defaultValue: ["nw", "n", "ne", "w", "e", "sw", "s", "se"],
    }),
};

export const DEFAULT_ROTATABLE_CONTROLS = {
    rotatable: makeArgType({
        type: "boolean",
        description: makeLink("rotatable"),
        defaultValue: true,
    }),
    throttleRotate: makeArgType({
        type: "number",
        description: makeLink("throttleRotate"),
        defaultValue: 0,
    }),
    rotationPosition: makeArgType({
        type: "inline-radio",
        description: makeLink("rotationPosition"),
        defaultValue: "top",
        control: {
            options: [
                "top",
                "left",
                "right",
                "bottom",
                "top-left",
                "top-right",
                "bottom-left",
                "bottom-right",
                "left-top",
                "right-top",
                "left-bottom",
                "right-bottom",
                "none",
                ["top", "left"],
                ["top", "bottom"],
            ],
        },
    }),
};
export const DEFAULT_WARPABLE_CONTROLS = {
    warpable: makeArgType({
        type: "boolean",
        description: makeLink("warpable"),
        defaultValue: true,
    }),
    renderDirections: makeArgType({
        type: "object",
        description: makeLink("renderDirections"),
        defaultValue: ["nw", "n", "ne", "w", "e", "sw", "s", "se"],
    }),
};

export const DEFAULT_SNAPPABLE_CONTROLS = {
    snappable: makeArgType({
        type: "boolean",
        description: makeLink("snappable"),
        defaultValue: true,
    }),
    snapDirections: makeArgType({
        type: "object",
        description: makeLink("snapDirections"),
        defaultValue: { top: true, left: true, bottom: true, right: true },
    }),
    snapHorizontalThreshold: makeArgType({
        type: "number",
        description: makeLink("snapHorizontalThreshold"),
        defaultValue: 5,
    }),
    snapVerticalThreshold: makeArgType({
        type: "number",
        description: makeLink("snapVerticalThreshold"),
        defaultValue: 5,
    }),
};
export const DEFAULT_SNAPPABLE_GUIDELINES_CONTROLS = {
    verticalGuidelines: makeArgType({
        type: "object",
        description: makeLink("verticalGuidelines"),
        defaultValue: [50, 150, 250, 450, 550],
    }),
    horizontalGuidelines: makeArgType({
        type: "object",
        description: makeLink("horizontalGuidelines"),
        defaultValue: [0, 100, 200, 400, 500],
    }),
};
export const DEFAULT_SNAPPABLE_ELEMENTS_CONTROLS = {
    snapDirections: makeArgType({
        type: "object",
        description: makeLink("snapDirections"),
        defaultValue: { top: true, left: true, bottom: true, right: true, center: true, middle: true },
    }),
    elementSnapDirections: makeArgType({
        type: "object",
        description: makeLink("elementSnapDirections"),
        defaultValue: { top: true, left: true, bottom: true, right: true, center: true, middle: true },
    }),
    snapGap: makeArgType({
        type: "boolean",
        description: makeLink("snapGap"),
        defaultValue: true,
    }),
    isDisplaySnapDigit: makeArgType({
        type: "boolean",
        description: makeLink("isDisplaySnapDigit"),
        defaultValue: true,
    }),
    isDisplayInnerSnapDigit: makeArgType({
        type: "boolean",
        description: makeLink("isDisplayInnerSnapDigit"),
        defaultValue: false,
    }),
    snapDigit: makeArgType({
        type: "number",
        description: makeLink("snapDigit"),
        defaultValue: 0,
    }),
    maxSnapElementGuidelineDistance: makeArgType({
        type: "number",
        description: makeLink("maxSnapElementGuidelineDistance"),
        defaultValue: Infinity,
    }),
};
export const DEFAULT_SNAP_GRID_CONTROLS = {
    snappable: makeArgType({
        type: "boolean",
        description: makeLink("snappable"),
        defaultValue: true,
    }),
    isDisplayGridGuidelines: makeArgType({
        type: "boolean",
        description: makeLink("isDisplayGridGuidelines"),
        defaultValue: false,
    }),
    snapGridWidth: makeArgType({
        type: "number",
        description: makeLink("snapGridWidth"),
        defaultValue: 10,
    }),
    snapGridHeight: makeArgType({
        type: "number",
        description: makeLink("snapGridHeight"),
        defaultValue: 10,
    }),
};

export const DEFAULT_SNAP_CONTAINER_CONTROLS = {
    snapContainer: makeArgType({
        type: "text",
        description: makeLink("snapContainer"),
        defaultValue: ".snapContainer",
    }),
};
export const DEFAULT_BOUNDS_CONTROLS = {
    snappable: makeArgType({
        type: "boolean",
        description: makeLink("snappable"),
        defaultValue: true,
    }),
    bounds: makeArgType({
        type: "object",
        description: makeLink("bounds"),
        defaultValue: { left: 0, top: 0, right: 0, bottom: 0, position: "css" },
    }),
};
export const DEFAULT_INNER_BOUNDS_CONTROLS = {
    snappable: makeArgType({
        type: "boolean",
        description: makeLink("snappable"),
        defaultValue: true,
    }),
    innerBounds: makeArgType({
        type: "object",
        description: makeLink("innerBounds"),
        defaultValue: { left: 0, top: 0, width: 100, height: 100 },
    }),
};



export const DEFAULT_ORIGIN_DRAGGABLE_CONTROLS = {
    originDraggable: makeArgType({
        type: "boolean",
        description: makeLink("originDraggable"),
        defaultValue: true,
    }),
    originRelative: makeArgType({
        type: "boolean",
        description: makeLink("originRelative"),
        defaultValue: true,
    }),
};


export const DEFAULT_CLIPPABLE_CONTROLS = {
    clippable: makeArgType({
        type: "boolean",
        description: makeLink("clippable"),
        defaultValue: true,
    }),
    clipRelative: makeArgType({
        type: "boolean",
        description: makeLink("clipRelative"),
        defaultValue: false,
    }),
    clipArea: makeArgType({
        type: "boolean",
        description: makeLink("clipArea"),
        defaultValue: false,
    }),
    dragWithClip: makeArgType({
        type: "boolean",
        description: makeLink("dragWithClip"),
        defaultValue: false,
    }),
    defaultClipPath: makeArgType({
        type: "inline-radio",
        description: makeLink("defaultClipPath"),
        defaultValue: "inset",
        control: {
            options: [
                "circle",
                "inset",
                "ellipse",
                "rect",
                "polygon",
            ],
        },
    }),
    clipTargetBounds: makeArgType({
        type: "boolean",
        description: makeLink("clipTargetBounds"),
        defaultValue: false,
    }),
    keepRatio: makeArgType({
        type: "boolean",
        description: makeLink("keepRatio"),
        defaultValue: false,
    }),
};
