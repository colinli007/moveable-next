import Pinchable from "./Pinchable";
import Rotatable from "./Rotatable";
import Draggable from "./Draggable";
import Resizable from "./Resizable";
import Scalable from "./Scalable";
import Warpable from "./Warpable";
import Snappable from "./Snappable";
import DragArea from "./DragArea";
import Origin from "./Origin";
import Scrollable from "./Scrollable";
import Default from "./Default";
import Padding from "./Padding";
import Clippable from "./Clippable";
import OriginDraggable from "./OriginDraggable";
import Roundable from "./Roundable";
import Groupable from "./Groupable";
import BeforeRenderable from "./BeforeRenderable";
import Renderable from "./Renderable";
import Clickable from "./Clickable";
import edgeDraggable from "./edgeDraggable";
import IndividualGroupable from "./IndividualGroupable";
import { camelize, pushSet } from "@daybrush/utils";
import { Able } from "../types";

// The tuple type is written out so that the declaration refers to each able by `typeof`.
// Inferred, it expands every able's type, and tsc references the types that this file
// doesn't import through the package entry (`import("..")`), which pulls React's types
// into `@moveable-next/react/types`.
export const MOVEABLE_ABLES: readonly [
    typeof BeforeRenderable,
    typeof Default, typeof Snappable, typeof Pinchable,
    typeof Draggable, typeof edgeDraggable,
    typeof Resizable, typeof Scalable, typeof Warpable, typeof Rotatable,
    typeof Scrollable, typeof Padding, typeof Origin,
    typeof OriginDraggable,
    typeof Clippable, typeof Roundable, typeof Groupable, typeof IndividualGroupable,
    typeof Clickable,
    typeof DragArea,
    typeof Renderable,
] = [
    BeforeRenderable,
    Default, Snappable, Pinchable,
    Draggable, edgeDraggable,
    Resizable, Scalable, Warpable, Rotatable,
    Scrollable, Padding, Origin,
    OriginDraggable,
    Clippable, Roundable, Groupable, IndividualGroupable,
    Clickable,
    DragArea,
    Renderable,
];


export const MOVEABLE_EVENTS = /*#__PURE__*/(MOVEABLE_ABLES as readonly Able[]).reduce((current, able) => {
    (able.events || []).forEach(name => {
        pushSet(current, name);
    });
    return current;
}, [] as any[]) as Array<typeof MOVEABLE_ABLES[number]["events"][number]>;

export const MOVEABLE_PROPS = /*#__PURE__*/(MOVEABLE_ABLES as readonly Able[]).reduce((current, able) => {
    (able.props || []).forEach(name => {
        pushSet(current, name);
    });
    return current;
}, [] as any[]) as Array<typeof MOVEABLE_ABLES[number]["props"][number]>;


export const MOVEABLE_REACT_EVENTS = /*#__PURE__*/MOVEABLE_EVENTS.map(name => {
    return camelize(`on ${name}`);
}) as Array<`on${Capitalize<typeof MOVEABLE_ABLES[number]["events"][number]>}`>;

