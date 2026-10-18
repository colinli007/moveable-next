import { IObject } from "@daybrush/utils";
import Gesto, * as GestoTypes from "gesto";
import CustomGesto from "./gesto/CustomGesto";
import { MoveableTargetInfo } from "./utils/getMoveableTargetInfo";
import { DragScrollOptions } from "@scena/dragscroll";
import { MOVEABLE_PROPS, MOVEABLE_EVENTS } from "./ables/consts";

export interface MoveableClientRect {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
    clientLeft?: number;
    clientTop?: number;
    clientWidth?: number;
    clientHeight?: number;
    scrollWidth?: number;
    scrollHeight?: number;
    overflow?: boolean;
}
export type MoveableManagerProps<T = {}> = {
    cssStyled: any;
    customStyledMap: Record<string, any>;
    wrapperMoveable?: MoveableManagerInterface | null;
    isWrapperMounted?: boolean;
    parentMoveable?: MoveableManagerInterface | null;
    parentPosition?: number[] | null;
    groupable?: boolean;
} & MoveableDefaultOptions & (unknown extends T ? IObject<any> : T);

export type AnyObject<T> = (unknown extends T ? IObject<any> : T);

export interface MoveablePosition {
    left: number;
    top: number;
    right: number;
    bottom: number;
    origin: number[];
    pos1: number[];
    pos2: number[];
    pos3: number[];
    pos4: number[];
    direction: 1 | -1;
}

/**
 */
export interface DefaultOptions {
    /**
     * The target(s) to indicate Moveable Control Box.
     * @default null
     */
    target?: SVGElement | HTMLElement | null;
    /**
     * The external target(s) to drag Moveable target(s)
     * @default target
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     * moveable.target = document.querySelector(".target");
     * moveable.dragTarget = document.querySelector(".dragTarget");
     */
    dragTarget?: MoveableRefType | null;
    /**
     * If dragTarget is set directly, taget itself cannot be dragged.
     * Whether to drag the target as well.
     * @default false
     */
    dragTargetSelf?: boolean;
    /**
     * Container area where drag works
     * @default window
     */
    dragContainer?: null | Window | MoveableRefType<HTMLElement>;
    /**
     * A container into which Moveables are inserted.
     * Set it only when used within the slot of Web Components or when the container is different.
     * @default parentElement
     */
    container?: SVGElement | HTMLElement | null;
    /**
     * Whether to warp itself to the container itself. Don't set it.
     * @private
     * @default false
     */
    warpSelf?: boolean;
    /**
     * Moveable Root Container (No Transformed Container)
     * @default parentElement
     * @see [Storybook](../../../../storybook/?path=/story/options--options-root-container)
     */
    rootContainer?: MoveableRefType<HTMLElement>;
    /**
     * If you want to set the dragging information to the viewer, refer to the following.
     * @default null
     * @see [Storybook](../../../../storybook/?path=/story/options--options-view-container)
     */
    viewContainer?: MoveableRefType<HTMLElement>;
    /**
     * Whether the target size is detected and updated whenever it changes.
     * It is more effective when used together with `useMutationObserver`.
     * @default false
     * @see [Storybook](../../../../storybook/?path=/story/options--options-resize-observer)
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     * moveable.useResizeObserver = true;
     */
    useResizeObserver?: boolean;
    /**
     * Whether the target size, pos in inline style is detected and updated whenever it changes.
     * It is more effective when used together with `useResizeObserver`.
     * @default false
     * @see [Storybook](../../../../storybook/?path=/story/options--options-mutation-observer)
     */
    useMutationObserver?: boolean;
    /**
     * Zooms in the elements of a moveable.
     * @default 1
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     * moveable.zoom = 2;
     */
    zoom?: number;
    /**
     * The default transformOrigin of the target can be set in advance.
     * @default ""
     */
    transformOrigin?: Array<string | number> | string | "";
    /**
     * You can add your custom able.
     * @default []
     */
    ables?: Able[];
    /**
     * You can specify the className of the moveable controlbox.
     * @default ""
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *   className: "",
     * });
     *
     * moveable.className = "moveable1";
     */
    className?: string;
    /**
     * Minimum distance to pinch.
     * @default 20
     */
    pinchThreshold?: number;
    /**
     * Whether the container containing the target becomes a pinch.
     * @default true
     */
    pinchOutside?: boolean;
    /**
     * Lets generate events of ables at the same time. (like Resizable, Scalable)
     * @default false
     */
    triggerAblesSimultaneously?: boolean;
    /**
     * Checks whether this is an element to input text or contentEditable, and prevents dragging.
     * @default false
     */
    checkInput?: boolean;
    /**
     * add nonce property to style for CSP.
     * @deprecated
     * @default ""
     */
    cspNonce?: string;
    /**
     * You can set the translateZ value of moveable.
     * @default 50
     */
    translateZ?: number | string;
    /**
     * Whether to hide the line corresponding to the rect of the target.
     * @default false
     */
    hideDefaultLines?: boolean;
    /**
     * Whether to prevent bubbling of events like mousedown, touchstart, etc.
     * @default false
     */
    stopPropagation?: boolean;
    /**
     * Whether to call preventDefault on touchstart or mousedown
     * @since 0.44.0
     * @default true
     */
    preventDefault?: boolean;
    /**
     * Whether to prevent dragging using the right mouse button
     * @default true
     */
    preventRightClick?: boolean;
    /**
     * Whether to prevent dragging using the wheel (middle) mouse button
     * @default true
     */
    preventWheelClick?: boolean;
    /**
     * Prevent click event on drag. (mousemove, touchmove)
     * @default true
     */
    preventClickEventOnDrag?: boolean;
    /**
     * Whether to drag the focused input
     * If `checkInput` is true, this option is not applied.
     * @since 0.47.0
     * @see [Storybook](../../../../storybook/?path=/story/options--options-drag-focused-input)
     * @default false
     */
    dragFocusedInput?: boolean;
    /**
     * Prevent click event on dragStart. (mousedown, touchstart)
     * @default false
     */
    preventClickDefault?: boolean;
    /**
     * You can use props in object format or custom props.
     * @default empty object
     */
    props?: Record<string, any>;
    /**
     * Data for first render
     * @default null
     */
    persistData?: PersistRectData | null;
    /**
     * Whether to accurately show the position of a movable control box
     * Because getBoundingClientRect is used, css zoom, transform: rotate between container and rootContainer cannot be used.
     * group is not supported.
     * @default false
     */
    useAccuratePosition?: boolean;
    /**
     * By adding padding to the line, you can increase the area of the line that can be clicked and dragged.
     * @since 0.43.0
     * @see [Storybook](../../../../storybook/?path=/story/options--options-line-padding)
     * @default 0
     */
    linePadding?: number;
    /**
     * By adding padding to the control, you can increase the area of the control that can be clicked and dragged.
     * Either `rotateAroundControls` or `displayAroundControls` can be used.
     * @since 0.44.0
     * @see [Storybook](../../../../storybook/?path=/story/options--options-control-padding)
     * @default 0
     */
    controlPadding?: number;
    /**
     * @private
     * single => group로 변환과정에 도형 유지를 위한 첫 렌더링 state
     */
    firstRenderState?: MoveableManagerState | null;
    /**
     * @private
     */
    requestStyles?: string[];
    /**
     * If you are using React 18's concurrent mode, use `flushSync` for UI sync.
     * @default empty function
     * @example
     * ```jsx
     * import { flushSync } from "react-dom";
     *
     * <Moveable flushSync={flushSync} />
     * ```
     */
    flushSync?: (callback: () => void) => void;
}
export interface MoveableDefaultOptions
    extends DefaultOptions, DragAreaOptions, OriginOptions, PaddingOptions {
}
export interface MatrixInfo {
    type: "offset" | "target" | "zoom";
    target: SVGElement | HTMLElement;
    matrix?: number[];
    origin?: number[];
    zoom?: number;
}
export type MoveableManagerState<T = {}> = {
    container: SVGElement | HTMLElement | null | undefined;
    disableNativeEvent: boolean;
    gestos: Record<string, Gesto | CustomGesto | null>;
    renderLines: number[][][];
    renderPoses: number[][];
    posDelta: number[];
    style: Partial<Writable<CSSStyleDeclaration>>;
    isPersisted?: boolean;
} & MoveableTargetInfo & T;

export interface ElementSizes {
    svg: boolean;
    offsetWidth: number;
    offsetHeight: number;
    clientWidth: number;
    clientHeight: number;
    inlineCSSWidth: number;
    inlineCSSHeight: number;
    cssWidth: number;
    cssHeight: number;
    contentWidth: number;
    contentHeight: number;
    minWidth: number;
    minHeight: number;
    maxWidth: number;
    maxHeight: number;
    minOffsetWidth: number;
    minOffsetHeight: number;
    maxOffsetWidth: number;
    maxOffsetHeight: number;
}

export type LineDirection = "n" | "e" | "s" | "w" | "nw" | "ne" | "sw" | "se";

export interface PaddingBox {
    /**
     * left padding
     */
    left?: number;
    /**
     * top padding
     */
    top?: number;
    /**
     * right padding
     */
    right?: number;
    /**
     * bottom padding
     */
    bottom?: number;
}

export interface Renderer {
    createElement(type: any, props?: any, ...children: any[]): any;
}

/**
 * @category Snappable
 */
export interface SnapGuideline {
    type: "horizontal" | "vertical";
    direction: string;
    hide?: boolean;
    element?: Element | null;

    isStart?: boolean;
    isEnd?: boolean;
    isCenter?: boolean;
    isInner?: boolean;
    grid?: boolean;

    pos: number[];
    size: number;
    className?: string;
    sizes?: number[];

    gap?: number;
    elementDirection?: string;
    elementRect?: SnapElementRect;
    gapRects?: SnapElementRect[];
}

/**
 * @category Snappable
 */
export interface SnapElementGuideline extends SnapGuideline {

}

/**
 * @category Snappable
 */
export interface SnapBoundInfo {
    isBound: boolean;
    isSnap: boolean;
    offset: number;
    dist: number;
    snapIndex?: number;
    bounds?: BoundInfo[];
    snap?: SnapInfo;
}
/**
 * @category Snappable
 */
export interface BoundInfo {
    direction?: "start" | "end";
    isBound: boolean;
    offset: number;
    pos: number;
}
/**
 * @category Snappable
 */
export interface SnapOffsetInfo {
    isSnap: boolean;
    offset: number;
    pos: number;
}
/**
 * @category Snappable
 */
export interface SnapDirectionInfo extends SnapInfo {
    direction: string;
}
/**
 * @category Snappable
 */
export interface SnapInfo {
    isSnap: boolean;
    index: number;
    direction: string;
    posInfos: SnapPosInfo[];
}
/**
 * @category Snappable
 */
export interface SnapPosInfo {
    pos: number;
    index: number;
    direction: string;
    guidelineInfos: SnapGuidelineInfo[];
}
/**
 * @category Snappable
 */
export interface SnapGuidelineInfo {
    dist: number;
    offset: number;
    direction: string;
    guideline: SnapGuideline;
}

/**
 * @category Snappable
 */
export interface RenderGuidelineInfo {
    key?: string;
    direction: string;
    classNames: string[];
    size: string;
    pos: string[];
    sizeValue: number;
    posValue: number[];
    zoom: number;
}
/**
 * @category Snappable
 */
export interface RenderGuidelineInnerInfo {
    key?: string;
    direction: string;
    classNames: Array<string | undefined>;
    size?: string;
    pos?: string[];
    sizeValue: number;
    posValue: number[];
    zoom: number;
}
export type ExcludeKeys<T extends IObject<any>, U> = Pick<T, Exclude<keyof T, U>>;

export interface MoveableProps extends
    MoveableDefaultProps,
    DraggableProps,
    DragAreaProps,
    OriginDraggableProps,
    RotatableProps,
    ResizableProps,
    ScalableProps,
    WarpableProps,
    PinchableProps,
    ExcludeKeys<GroupableProps, "targets" | "updateGroup">,
    IndividualGroupableProps,
    SnappableProps,
    ScrollableProps,
    ClippableProps,
    RoundableProps,
    BeforeRenderableProps,
    ClickableProps,
    RenderableProps {
}
export interface MoveableDefaultEvents {
    /**
     * When the targets of Moveable are changed, the `changeTargets` event is called.
     */
    onChangeTargets?: (e: OnChangeTargets) => void;
}

export interface MoveableInitalOptions extends ExcludeKeys<MoveableDefaultOptions, "target"> {
    /**
     * The target to indicate Moveable Control Box.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     * moveable.target = document.querySelector(".target");
     */
    target?: MoveableRefTargetType;
}

export interface MoveableDefaultProps extends MoveableInitalOptions, MoveableDefaultEvents {

}
export type MoveableRefTargetType = MoveableRefType | ArrayFormat<MoveableRefTargetType>;

export type MoveableRefTargetsResultType
    = Array<HTMLElement | SVGElement | string | null | MoveableRefTargetsResultType>;

export type MoveableRefType<T extends Element = HTMLElement | SVGElement>
    = string | (() => T) | MoveableRefObject<T> | T | null | undefined;
export interface MoveableRefObject<T extends Element = HTMLElement | SVGElement> {
    current: T | undefined | null;
}
export interface MoveableOptions extends
    MoveableInitalOptions,
    DraggableOptions,
    DragAreaOptions,
    OriginDraggableOptions,
    RotatableOptions,
    ResizableOptions,
    ScalableOptions,
    WarpableOptions,
    PinchableOptions,
    GroupableOptions,
    IndividualGroupableOptions,
    SnappableOptions,
    ScrollableOptions,
    ClippableOptions,
    RoundableOptions,
    ClickableOptions {
}

export type MoveableState = MoveableManagerState;

/**
 * You can make Able that can work in Moveable.
 * In Able, you can manage drag events, props, state, fire event props, and render elements.
 */
export interface Able<
    Props extends IObject<any> = IObject<any>,
    Events extends IObject<any> = IObject<any>
> {
    name: string;
    props?: readonly (keyof Props)[];
    events?: readonly (keyof Events)[];
    // Whether to always include in able. It is recommended to use always in frameworks other than react
    always?: boolean;
    ableGroup?: string;
    updateRect?: boolean;
    canPinch?: boolean;
    css?: string[];
    /**
     * You can request style. Specify the name of the style in camel case.
     * You can check it with `moveable.state.style`
     * @example
     * ["borderRadius", "top", "left"]
     */
    requestStyle?(): string[];
    /**
     * If you use group, you can request child style. Specify the name of the style in camel case.
     * You can check it with `moveable.state.style`
     * @example
     * ["borderRadius", "top", "left"]
     */
    requestChildStyle?(): string[];
    /**
     * You can specify the class name to be added to the Moveable control box.
     */
    className?(moveable: any): string;
    /**
     * You can specify the class name to be added to the Moveable View Container
     */
    viewClassName?(moveable: any): string;
    /**
     * Check how related to drag
     */
    dragRelation?: "strong" | "weak" | undefined | null | false,
    /**
     * Fired when the event is cleared
     */
    unset?(moveable: any): any;
    /**
     * Renders the React DOM structure for the able.
     */
    render?(moveable: any, renderer: Renderer): any;

    // Operates when a drag event occurs for the single target.
    dragStart?(moveable: any, e: any): any;
    drag?(moveable: any, e: any): any;
    dragEnd?(moveable: any, e: any): any;
    dragAfter?(moveable: any, e: any): any;

    // Operates when a pinch event occurs for the single target.
    pinchStart?(moveable: any, e: GestoTypes.OnPinchStart): any;
    pinch?(moveable: any, e: GestoTypes.OnPinch): any;
    pinchEnd?(moveable: any, e: GestoTypes.OnPinchEnd): any;

    // Condition that occurs dragControl
    dragControlCondition?(moveable: any, e: any): boolean;
    // Operates when a drag event occurs for the moveable control and single target.
    dragControlStart?(moveable: any, e: any): any;
    dragControl?(moveable: any, e: any): any;
    dragControlEnd?(moveable: any, e: any): any;
    dragControlAfter?(moveable: any, e: any): any;

    // Condition that occurs dragGroup
    dragGroupCondition?(moveable: any, e: any): boolean;
    // Operates when a drag event occurs for the multi target.
    dragGroupStart?(moveable: any, e: any): any;
    dragGroup?(moveable: any, e: any): any;
    dragGroupEnd?(moveable: any, e: any): any;

    // Operates when a pinch event occurs for the multi target.
    pinchGroupStart?(moveable: any, e: GestoTypes.OnPinchStart): any;
    pinchGroup?(moveable: any, e: GestoTypes.OnPinch): any;
    pinchGroupEnd?(moveable: any, e: GestoTypes.OnPinchEnd): any;

    // Condition that occurs dragGroupControl
    dragGroupControlCondition?(moveable: any, e: any): boolean;

    // Operates when a drag event occurs for the moveable control and multi target.
    dragGroupControlStart?(moveable: any, e: any): any;
    dragGroupControl?(moveable: any, e: any): any;
    dragGroupControlEnd?(moveable: any, e: any): any;

    // mouse enter event
    mouseEnter?(moveable: any, e: any): any;
    // mouse leave event
    mouseLeave?(moveable: any, e: any): any;

    // mouse enter event for group
    mouseGroupEnter?(moveable: any, e: any): any;
    // mouse leave event for group
    mouseGroupLeave?(moveable: any, e: any): any;


    // Execute the operation of able for external request
    request?(moveable: any): AbleRequester;
}

export interface OnEvent {
    /**
     * The Moveable instance
     */
    currentTarget: MoveableManagerInterface<Record<string, any>, Record<string, any>>;
    /**
     * The Moveable instance
     */
    moveable: MoveableManagerInterface<Record<string, any>, Record<string, any>>;
    /**
     * The Moveable's target
     */
    target: HTMLElement | SVGElement;
    /**
     * The horizontal coordinate within the application's client area at which the event occurred.
     */
    clientX: number;
    /**
     * The vertical coordinate within the application's client area at which the event occurred.
     */
    clientY: number;
    /**
     * Whether this is the first drag in the drag event
     */
    isFirstDrag: number;
    /**
     * Objects that can send information to the following events.
     */
    datas: IObject<any>;
    /**
     * The mouse or touch input event that is invoking the moveable event
     */
    inputEvent: any;
    /**
     * Stop the currently working able.
     */
    stopAble(): void;
    /**
     * Calling `stopDrag` in a drag-related event ends the drag.
     */
    stopDrag(): void;
    /**
     * Whether the event did not occur externally
     */
    isTrusted: boolean;

}
export interface OnEndEvent extends OnEvent {
    /**
     * This is the last dragged event. No, if you haven't dragged.
     */
    lastEvent: any | undefined;
    /**
     * Whether this moved
     */
    isDrag: boolean;
    /**
     * Whether it is double-click
     */
    isDouble: boolean;
}
export interface OnTransformStartEvent {
    /**
     * Set your original transform.
     * `transformIndex` is the sequence of functions used in the event.
     * If you use `setTransform`, you don't need to use `set` function.
     * @default transform of target's inline style
     */
    setTransform(transform: string | string[], transformIndex?: number): void;
    /**
     * `transformIndex` is the sequence of functions used in the event.
     * @default index with that property in transform or last
     */
    setTransformIndex(transformIndex: number): void;
}
export interface TransformObject extends CSSObject {
    /**
     * a target's next transform string value.
     */
    transform: string;
    /**
     * A transform obtained by the simultaneous occurrence of other events in the current event
     */
    afterTransform: string;
}
export interface OnTransformEvent extends TransformObject {
    /**
     * transform events causes a `drag` event. In some events, there may be no value.
     */
    drag: OnDrag;
}
export interface AbleRequestParam {
    /**
     * Run the request instantly. (requestStart, request, requestEnd happen at the same time)
     */
    isInstant?: boolean;
    [key: string]: any;
}
/**
 * @see {@link MoveableInterface.request | Request Method}
 * @see {@link DraggableRequestParam | Draggable Requester}
 * @see {@link ResizableRequestParam | Resizable Requester}
 * @see {@link ScalableRequestParam | Scalable Requester}
 * @see {@link RotatableRequestParam | Rotatable Requester}
 */
export interface Requester<RequestParam extends {} = AbleRequestParam> {
    /**
     * Continue executing the request.
     */
    request(param: RequestParam): this;
    /**
     * End the request.
     */
    requestEnd(): this;
}

export interface AbleRequester {
    isControl: boolean;
    requestStart(param: IObject<any>): IObject<any>;
    request(param: IObject<any>): IObject<any>;
    requestEnd(): IObject<any>;
}


export interface OnChangeTargets {
    /**
     * The Moveable instance
     */
    moveable: MoveableManagerInterface<any, any>;
    /**
     * The Moveable's targets
     */
    targets: Array<HTMLElement | SVGElement>;
}



/**
 * @category Pinchable
 */
export interface OnPinchStart extends OnEvent {
}
/**
 * @category Pinchable
 */
export interface OnPinch extends OnEvent {
}
/**
 * @category Pinchable
 */
export interface OnPinchEnd extends OnEndEvent { }
/**
 * When the drag starts, the dragStart event is called.
 * @category Draggable
 */
export interface OnDragStart extends OnEvent, OnTransformStartEvent {
    /**
     * You can set the start translate value.
     */
    set: (translate: number[]) => void;
}
/**
 * @category Draggable
 */
export interface OnDrag extends OnEvent, CSSObject {
    /**
     * The delta of [left, top]
     */
    beforeDelta: number[];
    /**
     * The distance of [left, top]
     */
    beforeDist: number[];
    /**
     * The position of [left, top]
     */
    beforeTranslate: number[];
    /**
     * The delta of [translateX, translateY]
     */
    delta: number[];
    /**
     * The distance of [translateX, translateY]
     */
    dist: number[];
    /**
     * The position of [translateX, translateY]
     */
    translate: number[];
    /**
     * a target's transform
     */
    transform: string;
    /**
     * a target's left
     */
    left: number;
    /**
     * a target's top
     */
    top: number;
    /**
     * a target's bottom
     */
    bottom: number;
    /**
     * a target's offset width
     */
    width: number;
    /**
     * a target's offset height
     */
    height: number;
    /**
     * a target's right
     */
    right: number;
    /**
     * Whether or not it is being pinched.
     */
    isPinch: boolean;
}
/**
 * @category Draggable
 */
export interface OnDragEnd extends OnEndEvent {
}

/**
 * @category OriginDraggable
 */
export interface OnDragOriginStart extends OnEvent {
    /**
     * dragOrigin causes a `dragStart` event.
     */
    dragStart: OnDragStart | false;
}

/**
 * @category OriginDraggable
 */
export interface OnDragOrigin extends OnEvent, CSSObject {
    /**
     * Offset width of target
     */
    width: number;
    /**
     * Offset height of target
     */
    height: number;
    /**
     * The delta of [x, y]
     */
    delta: number[];
    /**
     * The distance of [x, y]
     */
    dist: number[];
    /**
     * The target's moved transform-origin poses
     */
    origin: number[];
    /**
     * The target's moved transform-origin css
     */
    transformOrigin: string;
    /**
     * A transform obtained by the simultaneous occurrence of other events in the current event
     */
    afterTransform: string;
    /**
     * `dragOrigin` causes a `drag` event.
     */
    drag: OnDrag;

}
/**
 * @category OriginDraggable
 */
export interface OnDragOriginEnd extends OnEndEvent {
}

/**
 * @category Roundable
 */
export interface OnRoundStart extends OnEvent { }

/**
 * @category Roundable
 */
export interface OnRound extends OnEvent, CSSObject {
    /**
     * Offset width of target
     */
    width: number;
    /**
     * Offset height of target
     */
    height: number;
    /**
     * The delta of [x, y]
     */
    delta: number[];
    /**
     * The distance of [x, y]
     */
    dist: number[];
    /**
     * The target's moved border-radius's horizontal poses
     */
    horizontals: number[];
    /**
     * The target's moved border-radius's vertical poses
     */
    verticals: number[];
    /**
     * The target's moved border-radius
     */
    borderRadius: string;

}

/**
 * @category Roundable
 */
export interface OnRoundEnd extends OnEndEvent {
}


/**
 * @category Roundable
 */
export interface OnRoundGroupStart extends OnRoundStart {
    /**
     * moveable's targets
     */
    targets: Array<HTMLElement | SVGElement>;
    /**
     * moveable's child events
     */
    events: OnRoundStart[];
}

/**
 * @category Roundable
 */
export interface OnRoundGroup extends OnRound {
    /**
     * moveable's targets
     */
    targets: Array<HTMLElement | SVGElement>;
    /**
     * moveable's child events
     */
    events: OnRound[];
}

/**
 * @category Roundable
 */
export interface OnRoundGroupEnd extends OnRoundEnd {
    /**
     * moveable's targets
     */
    targets: Array<HTMLElement | SVGElement>;
    /**
     * moveable's child events
     */
    events: OnRoundEnd[];
}

/**
 * @category Scalable
 */
export interface OnScaleStart extends OnEvent, OnTransformStartEvent {
    /**
     * The direction of scale.
     */
    direction: number[];
    /**
     * scale causes a `dragStart` event.
     */
    dragStart: OnDragStart | false;
    /**
     * You can set the start scale value.
     */
    set: (scale: number[]) => void;
    /**
     * Set a fixed direction to scale.
     * @default Opposite direction
     */
    setFixedDirection: (startDirecition: number[]) => void;
    /**
     * Set the ratio of width and height.
     * @default offsetWidth / offsetHeight
     */
    setRatio: (ratio: number) => void;
    /**
     * You can set the min scale width, height value.
     * scale size = scale value * offset size
     * @default [-Infinity, -Infinity]
     */
    setMinScaleSize: (min: number[]) => void;
    /**
     * You can set the max scale width, height value.
     * scale size = scale value * offset size
     * @default [Infinity, Infinity]
     */
    setMaxScaleSize: (max: number[]) => void;
}

/**
 * @category Scalable
 */
export interface OnBeforeScale extends OnEvent {
    /**
     * Set a fixed direction to scale.
     * If fixedDirection is set, the scale values can be changed and can be reconfirmed as a return value.
     */
    setFixedDirection: (startDirecition: number[]) => number[];
    /**
     * fixedDirection set by rotateStart.
     */
    startFixedDirection: number[];
    /**
     * Set target's scale to scaling.
     */
    setScale: (scale: number[]) => void;
    /**
     * a target's scale before snap and throttle and format
     */
    scale: number[];
}


/**
 * @category Scalable
 */
export interface OnScale extends OnEvent, OnTransformEvent {
    /**
     * The direction of scale.
     */
    direction: number[];
    /**
     * a target's offsetWidth
     */
    offsetWidth: number;
    /**
     * a target's offsetHeight
     */
    offsetHeight: number;

    /**
     * a target's scale
     */
    scale: number[];
    /**
     * The distance of scale
     */
    dist: number[];
    /**
     * The delta of scale
     */
    delta: number[];

    /**
     * Whether or not it is being pinched.
     */
    isPinch: boolean;
}
/**
 * @category Scalable
 */
export interface OnScaleEnd extends OnEndEvent {
}

/**
 * @category Resizable
 */
export interface OnResizeStart extends OnEvent {
    /**
     * The direction of resize.
     */
    direction: number[];
    /**
     * First set (boundingWidth / boundingHeight) value
     */
    startRatio: number;
    /**
     * resize causes a `dragStart` event.
     */
    dragStart: OnDragStart | false;
    /**
     * You can set the css width, height value.
     */
    set: (size: number[]) => any;
    /**
     * You can set the css min offset width, min offset height value.
     * @default [minOffsetWidth, minOffsetHeight])
     */
    setMin: (minSize: Array<string | number>) => any;
    /**
     * You can set the css max offset width, max offset height value.
     * @default [maxOffsetWidth, maxOffsetHeight])
     */
    setMax: (maxSize: Array<string | number>) => any;
    /**
     * You can set the css origin
     * @default transformOrigin
     */
    setOrigin: (origin: Array<string | number>) => any;
    /**
     * Set a fixed direction to resize.
     * @default Opposite direction
     */
    setFixedDirection: (startDirecition: number[]) => any;
    /**
     * Set a fixed direction to resize.
     * @default Opposite position
     * @private
     */
    setFixedPosition: (startPosition: number[]) => any;
    /**
     * Set the ratio of width and height.
     * @default offsetWidth / offsetHeight
     */
    setRatio: (ratio: number) => any;
}

/**
 * @category Resizable
 */
export interface OnBeforeResize extends OnEvent {
    /**
     * Set a fixed direction to resize.
     * If fixedDirection is set, the boundingWidth and boundingHeight values can be changed and can be reconfirmed as a return value.
     */
    setFixedDirection: (startDirecition: number[]) => number[];
    /**
     * Set a fixed position to resize.
     * If fixedPosition is set, the boundingWidth and boundingHeight values can be changed and can be reconfirmed as a return value.
     * @private
     */
    setFixedPosition: (startPosition: number[]) => number[];
    /**
     * fixedDirection set by resizeStart.
     */
    startFixedDirection: number[];
    /**
     * fixedPosition set by resizeStart.
     * @private
     */
    startFixedPosition: number[];
    /**
     * Set the bounding size to resizing.
     */
    setSize: (size: number[]) => void;
    /**
     * a target's bounding width before snap and throttle and format
     */
    boundingWidth: number;
    /**
     * a target's bounding height before snap and throttle and format
     */
    boundingHeight: number;
}
export interface CSSObject {
    /**
     * You can get the style you can get from the event.
     */
    style: Record<string, string>;
    /**
     * You can get it as a cssText that you can get from that event.
     */
    cssText: string;
}
/**
 * @category Resizable
 */
export interface OnResize extends OnEvent, OnTransformEvent {
    /**
     * The direction of resize.
     */
    direction: number[];
    /**
     * a target's cssWidth
     */
    width: number;
    /**
     * a target's cssHeight
     */
    height: number;
    /**
     * a target's offset width as an integer with bounding width
     */
    offsetWidth: number;
    /**
     * a target's offset height as an integer with bounding height
     */
    offsetHeight: number;
    /**
     * a target's bounding width
     */
    boundingWidth: number;
    /**
     * a target's bounding height
     */
    boundingHeight: number;
    /**
     * The distance of [boundingWidth, boundingHeight]
     */
    dist: number[];
    /**
     * The delta of [boundingWidth, boundingHeight]
     */
    delta: number[];
    /**
     * First set (boundingWidth / boundingHeight) value
     */
    startRatio: number;
    /**
     * Whether or not it is being pinched.
     */
    isPinch: boolean;
}
/**
 * @category Resizable
 */
export interface OnResizeEnd extends OnEndEvent {
}
/**
 * @category Rotatable
 */
export interface OnRotateStart extends OnEvent, OnTransformStartEvent {
    /**
     * You can set the start rotate value.
     */
    set: (rotate: number) => void;
    /**
     * Set a fixed direction to rotate.
     * @default target's transformOrigin
     */
    setFixedDirection: (fixedDirection: number[]) => void;
    /**
     * Set a fixed position to rotate.
     * @default target's transformOrigin
     */
    setFixedPosition: (fixedPosition: number[]) => void;
    /**
     * rotate causes a `dragStart` event.
     */
    dragStart: OnDragStart | false;
    /**
     * rotate causes a `resizeStart` event.
     */
    resizeStart: OnResizeStart | false;
}
/**
 * Parameters for the `beforeRotate` event
 * @category Rotatable
 */
export interface OnBeforeRotate extends OnEvent {
    /**
     * The rotation degree before transform is applied before snap and throttle and format
     */
    beforeRotation: number;
    /**
     * The rotation degree before snap and throttle and format
     */
    rotation: number;
    /**
     * The client rotation degree before snap and throttle and format
     */
    absoluteRotation: number;
    /**
     * You can set the value of `rotation`.
     */
    setRotation(nextRotation: number): void;
}


/**
 * Parameters for the `rotate` event
 * @category Rotatable
 */
export interface OnRotate extends OnEvent, OnTransformEvent {
    /**
     * The distance of rotation degree before transform is applied
     */
    beforeDist: number;
    /**
     * The delta of rotation degree before transform is applied
     */
    beforeDelta: number;
    /**
     * The now rotation degree before transform is applied
     * @deprecated
     */
    beforeRotate: number;
    /**
     * The now rotation degree before transform is applied
     */
    beforeRotation: number;
    /**
     * The distance of rotation degree
     */
    dist: number;
    /**
     * The delta of rotation degree
     */
    delta: number;
    /**
     * The now rotation degree
     * @deprecated
     */
    rotate: number;
    /**
     * The now rotation degree
     */
    rotation: number;
    /**
     * The distance of client rotation degree
     */
    absoluteDist: number;
    /**
     * The delta of client rotation degree
     */
    absoluteDelta: number;
    /**
     * The now client rotation degree
     * @deprecated
     */
    absoluteRotate: number;
    /**
     * The now client rotation degree
     */
    absoluteRotation: number;
    /**
     * Whether or not it is being pinched.
     */
    isPinch: boolean;
    /**
     * rotate causes a `resize` event.
     */
    resize?: OnResize;
}
/**
 * @category Rotatable
 */
export interface OnRotateEnd extends OnEndEvent { }

/**
 * @category Warpable
 */
export interface OnWarpStart extends OnEvent, OnTransformStartEvent {
    /**
     * You can set the start matrix value.
     */
    set: (matrix: number[]) => any;
}
/**
 * @category Warpable
 */
export interface OnWarp extends OnEvent, CSSObject {
    /**
     * The delta of warp matrix
     */
    delta: number[];
    /**
     * The dist of warp matrix
     */
    dist: number[];
    /**
     * The calculated warp matrix
     */
    matrix: number[];
    /**
     * a target's transform
     */
    transform: string;
    /**
     * Multiply function that can multiply previous matrix by warp matrix
     */
    multiply: (matrix1: number[], matrix2: number[], n?: number) => number[];
}
/**
 * @category Warpable
 */
export interface OnWarpEnd extends OnEndEvent { }

/**
 * @category Draggable
 */
export interface OnDragGroupStart extends OnDragStart {
    /**
     * targets to drag
     */
    targets: Array<HTMLElement | SVGElement>;
    /**
     * Each `dragStart` event on the targets
     */
    events: OnDragStart[];
}

/**
 * @category Draggable
 */
export interface OnDragGroup extends OnDrag {
    /**
     * The dragging targets
     */
    targets: Array<HTMLElement | SVGElement>;
    /**
     * Each `drag` event on the targets
     */
    events: OnDrag[];
}
/**
 * @category Draggable
 */
export interface OnDragGroupEnd extends OnDragEnd {
    /**
     * The drag finished targets
     */
    targets: Array<HTMLElement | SVGElement>;
    /**
     * Each `dragEnd` event on the targets
     */
    events: OnDragEnd[];
}

/**
 * @category Rotatable
 */
export interface OnRotateGroupStart extends OnRotateStart {
    /**
     * targets to rotate
     */
    targets: Array<HTMLElement | SVGElement>;
    /**
     * Each `rotateStart` event on the targets
     */
    events: OnRotateStart[];
}

/**
 * Parameters for the `beforeRotateGroup` event
 * @category Rotatable
 */
export interface OnBeforeRotateGroup extends OnBeforeRotate {
    /**
     * The rotating targets
     */
    targets: Array<HTMLElement | SVGElement>;
}
/**
 * Parameters for the `rotateGroup` event
 * @category Rotatable
 */
export interface OnRotateGroup extends OnRotate {
    /**
     * The rotating targets
     */
    targets: Array<HTMLElement | SVGElement>;
    /**
     * Each `rotate` event on the targets
     */
    events: OnRotate[];
    /**
     * You can set the group's rotation.
     * @deprecated
     */
    set: (rotation: number) => any;
    /**
     * You can set the group's rotation.
     */
    setGroupRotation: (rotation: number) => any;
}

/**
 * @category Rotatable
 */
export interface OnRotateGroupEnd extends OnRotateEnd {
    /**
     * The rotate finished targets
     */
    targets: Array<HTMLElement | SVGElement>;
    /**
     * Each `rotateEnd` event on the targets
     */
    events: OnRotateEnd[];
}

/**
 * @category Resizable
 */
export interface OnResizeGroupStart extends OnResizeStart {
    /**
     * targets to resize
     */
    targets: Array<HTMLElement | SVGElement>;
    /**
     * Each `resizeStart` event on the targets
     */
    events: OnResizeStart[];
}

/**
 * @category Resizable
 */
export interface OnBeforeResizeGroup extends OnBeforeResize {
    /**
     * The resizing targets
     */
    targets: Array<HTMLElement | SVGElement>;
}

/**
 * @category Resizable
 */
export interface OnResizeGroup extends OnResize {
    /**
     * The resizing targets
     */
    targets: Array<HTMLElement | SVGElement>;
    /**
     * Each `resize`event on the targets
     */
    events: OnResize[];
}

/**
 * @category Resizable
 */
export interface OnResizeGroupEnd extends OnResizeEnd {
    /**
     * The resize finished targets
     */
    targets: Array<HTMLElement | SVGElement>;
    /**
     * Each `resizeEnd` event on the targets
     */
    events: OnResizeEnd[];
}

/**
 * @category Scalable
 */
export interface OnScaleGroupStart extends OnScaleStart {
    /**
     * targets to scale
     */
    targets: Array<HTMLElement | SVGElement>;
    /**
     * Each `scaleStart` & `dragStart` event on the targets
     */
    events: OnScaleStart[];
}

/**
 * @category Scalable
 */
export interface OnBeforeScaleGroup extends OnBeforeScale {
    /**
     * The scaling targets
     */
    targets: Array<HTMLElement | SVGElement>;
}

/**
 * @category Scalable
 */
export interface OnScaleGroup extends OnScale {
    /**
     * The scaling targets
     */
    targets: Array<HTMLElement | SVGElement>;
    /**
     * Each `scale` & `drag` event on the targets
     */
    events: OnScale[];
}

/**
 * @category Scalable
 */
export interface OnScaleGroupEnd extends OnScaleEnd {
    /**
     * The scale finished targets
     */
    targets: Array<HTMLElement | SVGElement>;
    /**
     * Each `scaleEnd` event on the targets
     */
    events: OnScaleEnd[];
}

/**
 * @category Pinchable
 */
export interface OnPinchGroupStart extends OnPinchStart {
    /**
     * targets to pinch
     */
    targets: Array<HTMLElement | SVGElement>;
}

/**
 * @category Pinchable
 */
export interface OnPinchGroup extends OnPinch {
    /**
     * targets to pinch
     */
    targets: Array<HTMLElement | SVGElement>;
}

/**
 * @category Pinchable
 */
export interface OnPinchGroupEnd extends OnPinchEnd {
    /**
     * The pinch finished targets
     */
    targets: Array<HTMLElement | SVGElement>;
}

export interface OnClick extends OnEvent {
    /**
     * Clicked element.
     */
    inputTarget: Element;
    /**
     * clicked moveable target
     */
    moveableTarget: HTMLElement | SVGElement | null;
    /**
     * Whether the clicked target is moveable target.
     */
    isTarget: boolean;
    /**
     * Whether the clicked target is a child of moveable target.
     */
    containsTarget: boolean;
    /**
     * Whether it is double-click
     */
    isDouble: boolean;
}

export interface OnClickGroup extends OnClick {
    /**
     * targets set to group.
     */
    targets: Element[];
    /**
     * The corresponding index among the targets set as a group.
     */
    targetIndex: number;
}

/**
 * `beforeRenderStart` event occurs before the first start of all events.
 */
export interface OnBeforeRenderStart extends OnEvent {
    /**
     * Whether or not it is being pinched.
     */
    isPinch: boolean;
    /**
     * Set your original transform.
     */
    setTransform(transform: string | string[]): any;
}

/**
 * `beforeRender` event occurs before the dragging of all events.
 */
export interface OnBeforeRender extends OnEvent {
    /**
     * Whether or not it is being pinched.
     */
    isPinch: boolean;
}

/**
 * `beforeRenderEnd` event occurs before the end of all events.
 */
export interface OnBeforeRenderEnd extends OnEvent {
    /**
     * Whether or not it is being dragged.
     */
    isPinch: boolean;
    /**
     * Whether or not it is being pinched.
     */
    isDrag: boolean;
}

export interface OnBeforeRenderGroupStart extends OnBeforeRenderStart {
    /**
     * targets set to group.
     */
    targets: Array<HTMLElement | SVGElement>;
    /**
     * children's `beforeRenderStart` events
     */
    events: OnBeforeRenderStart[];
}

export interface OnBeforeRenderGroup extends OnBeforeRender {
    /**
     * targets set to group.
     */
    targets: Array<HTMLElement | SVGElement>;
    /**
     * children's `beforeRender` events
     */
    events: OnBeforeRender[];
}

export interface OnBeforeRenderGroupEnd extends OnBeforeRenderEnd {
    /**
     * targets set to group.
     */
    targets: Array<HTMLElement | SVGElement>;
}

/**
 * `renderStart` event occurs at the first start of all events.
 */
export interface OnRenderStart extends OnEvent {
    /**
     * Whether or not it is being pinched.
     */
    isPinch: boolean;
}

/**
 * `render` event occurs before the target is drawn on the screen.
 */
export interface OnRender extends OnEvent, CSSObject {
    /**
     * a target's next transform string value.
     */
    transform: string;
    /**
     * Whether or not it is being pinched.
     */
    isPinch: boolean;
    /**
     * Return transform as a transform object.
     * `rotate` is a number and everything else is an array of numbers.
     */
    transformObject: Record<string, any>;
}

/**
 * `renderEnd` event occurs at the end of all events.
 */
export interface OnRenderEnd extends OnEvent, CSSObject {
    /**
     * a target's next transform string value.
     */
    transform: string;
    /**
     * Whether or not it is being dragged.
     */
    isPinch: boolean;
    /**
     * Whether or not it is being pinched.
     */
    isDrag: boolean;
    /**
     * Return transform as a transform object.
     * `rotate` is a number and everything else is an array of numbers.
     */
    transformObject: Record<string, any>;
}

export type EventInterface<T extends IObject<any> = {}> = {
    [key in keyof T]?: (e: T[key]) => any;
};

/**
 * @category Scrollable
 */
export interface OnScroll extends OnEvent {
    /**
     * The container corresponding to scrolling area (scrollContainer >= rootContainer >= container)
     */
    scrollContainer: HTMLElement;
    /**
     * The direction of scrolling [left, top]
     */
    direction: number[];
}

/**
 * @category Scrollable
 */
export interface OnScrollGroup extends OnScroll {
    /**
     * targets set to group.
     */
    targets: Array<HTMLElement | SVGElement>;
}

export interface OnRenderGroupStart extends OnRenderStart {
    /**
     * targets set to group.
     */
    targets: Array<HTMLElement | SVGElement>;
}

export interface OnRenderGroup extends OnRender {
    /**
     * targets set to group.
     */
    targets: Array<HTMLElement | SVGElement>;
    /**
     * Each `render` event on the targets
     */
    events: OnRender[];
}

export interface OnRenderGroupEnd extends OnRenderEnd {
    /**
     * targets set to group.
     */
    targets: Array<HTMLElement | SVGElement>;
    /**
     * Each `renderEnd` event on the targets
     */
    events: OnRenderEnd[];
}

/**
 * @category Draggable
 */
export interface DraggableOptions {
    /**
     * Whether or not target can be dragged. See {@link NotAMoveableSymbol}.
     * @default false
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.draggable = true;
     */
    draggable?: boolean;
    /**
     * throttle of x, y when drag.
     * @default 0
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.throttleDrag = 1;
     */
    throttleDrag?: number;
    /**
     * throttle of angle(degree) of x,y when drag.
     * @default 0
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.throttleDragRotate = 45;
     */
    throttleDragRotate?: number;
    /**
     * Hides the guidelines that appear when using the `throttleDragRotate` prop.
     * @default false
     */
    hideThrottleDragRotateLine?: boolean;
    /**
     * start angle(degree) of x,y for throttleDragRotate when drag.
     * @default 0
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * // 45, 135, 225, 315
     * moveable.throttleDragRotate = 90;
     * moveable.startDragRotate = 45;
     */
    startDragRotate?: number;
    /**
     * Whether to move by dragging the edge line
     * @default false
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *  draggable: true,
     *  edgeDraggable: false,
     * });
     *
     * moveable.edgeDraggable = true;
     */
    edgeDraggable?: boolean | Array<LineDirection>;
}
/**
 * @category Draggable
 */
export interface DraggableEvents {
    /**
     * When the drag starts, the dragStart event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, { draggable: true });
     * moveable.on("dragStart", ({ target }) => {
     *     console.log(target);
     * });
     */
    onDragStart: OnDragStart;
    /**
     * When dragging, the drag event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, { draggable: true });
     * moveable.on("drag", ({ target, transform }) => {
     *     target.style.transform = transform;
     * });
     */
    onDrag: OnDrag;
    /**
     * When the drag finishes, the dragEnd event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, { draggable: true });
     * moveable.on("dragEnd", ({ target, isDrag }) => {
     *     console.log(target, isDrag);
     * });
     */
    onDragEnd: OnDragEnd;

    /**
     * When the group drag starts, the `dragGroupStart` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     *     draggable: true
     * });
     * moveable.on("dragGroupStart", ({ targets }) => {
     *     console.log("onDragGroupStart", targets);
     * });
     */
    onDragGroupStart: OnDragGroupStart;
    /**
     * When the group drag, the `dragGroup` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     *     draggable: true
     * });
     * moveable.on("dragGroup", ({ targets, events }) => {
     *     console.log("onDragGroup", targets);
     *     events.forEach(ev => {
     *          // drag event
     *          console.log("onDrag left, top", ev.left, ev.top);
     *          // ev.target!.style.left = `${ev.left}px`;
     *          // ev.target!.style.top = `${ev.top}px`;
     *          console.log("onDrag translate", ev.dist);
     *          ev.target!.style.transform = ev.transform;)
     *     });
     * });
     */
    onDragGroup: OnDragGroup;
    /**
     * When the group drag finishes, the `dragGroupEnd` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     *     draggable: true
     * });
     * moveable.on("dragGroupEnd", ({ targets, isDrag }) => {
     *     console.log("onDragGroupEnd", targets, isDrag);
     * });
     */
    onDragGroupEnd: OnDragGroupEnd;
}

export interface DraggableProps extends DraggableOptions, EventInterface<DraggableEvents> {
}

/**
 * @category Draggable
 */
export interface DraggableState {
    dragInfo: {
        startRect: RectInfo;
        dist: number[];
    } | null;
}

export interface PaddingOptions {
    /**
     * Add padding around the target to increase the drag area.
     * @default null
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *  target: document.querySelector(".target"),
     *  padding: { left: 0, top: 0, right: 0, bottom: 0 },
     * });
     * moveable.padding = { left: 10, top: 10, right: 10, bottom: 10 },
     * moveable.updateRect();
     */
    padding?: PaddingBox | number;
}
export interface OriginOptions {
    /**
     * Whether or not the origin control box will be visible or not.
     * @default true
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.origin = true;
     */
    origin?: boolean;
    /**
     * Sets the transform origin based on the svg target. If not set, it is set as the transform origin based on the owner of svg.
     * @since 0.47.0
     * @default ""
     */
    svgOrigin?: string;
}
/**
 * The OriginDraggable's request parameter (`moveable.request("originDraggable", param)`):
 * - `x`: x position
 * - `y`: y position
 * - `deltaX`: x number to move
 * - `deltaY`: y number to move
 * - `deltaOrigin`: left, top number to move transform-origin
 * - `origin`: transform-origin position
 * - `isInstant`: Whether to execute the request instantly
 *
 * ```js
 * // Instantly Request (requestStart - request - requestEnd)
 * // Use Relative Value
 * moveable.request("originDraggable", { deltaX: 10, deltaY: 10 }, true);
 * // Use Absolute Value
 * moveable.request("originDraggable", { x: 200, y: 100 }, true);
 * // Use Transform Value
 * moveable.request("originDraggable", { deltaOrigin: [10, 0] }, true);
 * moveable.request("originDraggable", { origin: [100, 0] }, true);
 * // requestStart
 * const requester = moveable.request("originDraggable");
 *
 * // request
 * // Use Relative Value
 * requester.request({ deltaX: 10, deltaY: 10 });
 * requester.request({ deltaX: 10, deltaY: 10 });
 * requester.request({ deltaX: 10, deltaY: 10 });
 * // Use Absolute Value
 * moveable.request("originDraggable", { x: 200, y: 100 });
 * moveable.request("originDraggable", { x: 220, y: 100 });
 * moveable.request("originDraggable", { x: 240, y: 100 });
 *
 * // requestEnd
 * requester.requestEnd();
 * ```
 * @category OriginDraggable
 */
export interface OriginDraggableOptions {
    /**
     * Whether to drag origin.
     * @default false
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     originDraggable: true,
     * });
     * let translate = [0, 0];
     * moveable.on("dragOriginStart", e => {
     *     e.dragStart && e.dragStart.set(translate);
     * }).on("dragOrigin", e => {
     *     translate = e.drag.beforeTranslate;
     *     e.target.style.cssText
     *         = `transform-origin: ${e.transformOrigin};`
     *         + `transform: translate(${translate[0]}px, ${translate[1]}px)`;
     * }).on("dragOriginEnd", e => {
     *     console.log(e);
     * });
     */
    originDraggable?: boolean;
    /**
     * % Can be used instead of the absolute px.
     * @default true
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     originDraggable: true,
     *     originRelative: false,
     * });
     * moveable.originRelative = true;
     */
    originRelative?: boolean;
}
/**
 * @category OriginDraggable
 */
export interface OriginDraggableEvents {
    /**
     * When drag start the origin, the `dragOriginStart` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     originDraggable: true,
     * });
     * let translate = [0, 0];
     * moveable.on("dragOriginStart", e => {
     *     e.dragStart && e.dragStart.set(translate);
     * }).on("dragOrigin", e => {
     *     translate = e.drag.beforeTranslate;
     *     e.target.style.cssText
     *         = `transform-origin: ${e.transformOrigin};`
     *         + `transform: translate(${translate[0]}px, ${translate[1]}px)`;
     * }).on("dragOriginEnd", e => {
     *     console.log(e);
     * });
     */
    onDragOriginStart: OnDragOriginStart;
    /**
     * When drag the origin, the `dragOrigin` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     originDraggable: true,
     * });
     * let translate = [0, 0];
     * moveable.on("dragOriginStart", e => {
     *     e.dragStart && e.dragStart.set(translate);
     * }).on("dragOrigin", e => {
     *     translate = e.drag.beforeTranslate;
     *     e.target.style.cssText
     *         = `transform-origin: ${e.transformOrigin};`
     *         + `transform: translate(${translate[0]}px, ${translate[1]}px)`;
     * }).on("dragOriginEnd", e => {
     *     console.log(e);
     * });
     */
    onDragOrigin: OnDragOrigin;
    /**
     * When drag end the origin, the `dragOriginEnd` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     originDraggable: true,
     * });
     * let translate = [0, 0];
     * moveable.on("dragOriginStart", e => {
     *     e.dragStart && e.dragStart.set(translate);
     * }).on("dragOrigin", e => {
     *     translate = e.drag.beforeTranslate;
     *     e.target.style.cssText
     *         = `transform-origin: ${e.transformOrigin};`
     *         + `transform: translate(${translate[0]}px, ${translate[1]}px)`;
     * }).on("dragOriginEnd", e => {
     *     console.log(e);
     * });
     */
    onDragOriginEnd: OnDragOriginEnd;
}
export interface OriginDraggableProps extends OriginDraggableOptions, EventInterface<OriginDraggableEvents> {
}

/**
 * @category Roundable
 */
export interface RoundableOptions {
    /**
     * Whether to show and drag or double click border-radius.
     * @default false
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     roundable: true,
     *     roundRelative: false,
     * });
     * moveable.on("roundStart", e => {
     *     console.log(e);
     * }).on("round", e => {
     *     e.target.style.borderRadius = e.borderRadius;
     * }).on("roundEnd", e => {
     *     console.log(e);
     * });
     */
    roundable?: boolean;
    /**
     * % Can be used instead of the absolute px
     * @default false
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     roundable: true,
     *     roundRelative: false,
     * });
     * moveable.on("roundStart", e => {
     *     console.log(e);
     * }).on("round", e => {
     *     e.target.style.borderRadius = e.borderRadius;
     * }).on("roundEnd", e => {
     *     console.log(e);
     * });
     */
    roundRelative?: boolean;
    /**
     * Minimum number of round controls. It moves in proportion by control. [horizontal, vertical]
     * @default [0, 0]
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     roundable: true,
     *     roundRelative: false,
     *     minRoundControls: [0, 0],
     * });
     * moveable.minRoundControls = [1, 0];
     */
    minRoundControls?: number[];
    /**
     * Maximum number of round controls. It moves in proportion by control. [horizontal, vertical]
     * @default [4, 4]
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     roundable: true,
     *     roundRelative: false,
     *     maxRoundControls: [4, 4],
     * });
     * moveable.maxRoundControls = [1, 0];
     */
    maxRoundControls?: number[];
    /**
     * Whether you can add/delete round controls by double-clicking a line or control.
     * @default true
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     roundable: true,
     *     roundRelative: false,
     *     roundClickable: true,
     * });
     * moveable.roundClickable = false;
     */
    roundClickable?: boolean | "line" | "control";
    /**
     * Whether to show a round control that does not actually exist as a shadow
     * @default false
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     roundable: true,
     *     isDisplayShadowRoundControls: false,
     * });
     * moveable.isDisplayShadowRoundControls = true;
     */
    isDisplayShadowRoundControls?: boolean | "horizontal";
    /**
     * The padding value of the position of the round control
     * @default 0
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     roundable: true,
     *     roundPadding: 0,
     * });
     * moveable.roundPadding = 15;
     */
    roundPadding?: number;
}

/**
 * @category Roundable
 */
export interface RoundableEvents {
    /**
     * When drag start the clip area or controls, the `roundStart` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     roundable: true,
     *     roundRelative: false,
     * });
     * moveable.on("roundStart", e => {
     *     console.log(e);
     * }).on("round", e => {
     *     e.target.style.borderRadius = e.borderRadius;
     * }).on("roundEnd", e => {
     *     console.log(e);
     * });
     */
    onRoundStart: OnRoundStart;
    /**
     * When drag or double click the border area or controls, the `round` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     roundable: true,
     *     roundRelative: false,
     * });
     * moveable.on("roundStart", e => {
     *     console.log(e);
     * }).on("round", e => {
     *     e.target.style.borderRadius = e.borderRadius;
     * }).on("roundEnd", e => {
     *     console.log(e);
     * });
     */
    onRound: OnRound;
    /**
     * When drag end the border area or controls, the `roundEnd` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     roundable: true,
     *     roundRelative: false,
     * });
     * moveable.on("roundStart", e => {
     *     console.log(e);
     * }).on("round", e => {
     *     e.target.style.borderRadius = e.borderRadius;
     * }).on("roundEnd", e => {
     *     console.log(e);
     * });
     */
    onRoundEnd: OnRoundEnd;
    /**
     * When drag start the clip area or controls, the `roundGroupStart` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     targets: [target1, target2, target3],
     *     roundable: true,
     * });
     * moveable.on("roundGroupStart", e => {
     *     console.log(e.targets);
     * }).on("roundGroup", e => {
     *   e.events.forEach(ev => {
     *       ev.target.style.cssText += ev.cssText;
     *   });
     * }).on("roundGroupEnd", e => {
     *     console.log(e);
     * });
     */
    onRoundGroupStart: OnRoundGroupStart;
    /**
     * When drag or double click the border area or controls, the `roundGroup` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     targets: [target1, target2, target3],
     *     roundable: true,
     * });
     * moveable.on("roundGroupStart", e => {
     *     console.log(e.targets);
     * }).on("roundGroup", e => {
     *   e.events.forEach(ev => {
     *       ev.target.style.cssText += ev.cssText;
     *   });
     * }).on("roundGroupEnd", e => {
     *     console.log(e);
     * });
     */
    onRoundGroup: OnRoundGroup;
    /**
     * When drag end the border area or controls, the `roundGroupEnd` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     targets: [target1, target2, target3],
     *     roundable: true,
     * });
     * moveable.on("roundGroupStart", e => {
     *     console.log(e.targets);
     * }).on("roundGroup", e => {
     *     e.events.forEach(ev => {
     *         ev.target.style.cssText += ev.cssText;
     *     });
     * }).on("roundGroupEnd", e => {
     *     console.log(e);
     * });
     */
    onRoundGroupEnd: OnRoundGroupEnd;
}
export interface RoundableProps extends RoundableOptions, EventInterface<RoundableEvents> {
}

/**
 * @category Roundable
 */
export interface RoundableState {
    borderRadiusState?: string;
}
/**
 * @category Resizable
 */
export interface ResizableOptions extends RenderDirections {
    /**
     * Whether or not target can be resized.
     * @default false
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     resizable: false,
     * });
     *
     * moveable.resizable = true;
     */
    resizable?: boolean | ResizableOptions;
    /**
     * throttle of width, height when resize.
     * If throttleResize is set to less than 1, the target may shake.
     * @default 1
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *   resizable: true,
     *   throttleResize: 1,
     * });
     *
     * moveable.throttleResize = 0;
     */
    throttleResize?: number;
    /**
     * When resize or scale, keeps a ratio of the width, height.
     * @default false
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     scalable: true,
     * });
     *
     * moveable.keepRatio = true;
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *   resizable: true,
     * });
     *
     * moveable.keepRatio = true;
     */
    keepRatio?: boolean;
    /**
     * The size can be changed by format and throttle, but the ratio is maintained at the end. Forced true when using groups.
     * @default false
     */
    keepRatioFinally?: boolean;
    /**
     * Function to convert size for resize.
     * @default oneself
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *   resizable: true,
     *   resizeFormat: v => v,
     * });
     *
     * moveable.resizeFormat = (size: number[]) => ([Math.trunc(size[0]), Math.trunc(size[1])];
     */
    resizeFormat?: (size: number[]) => number[];
    /**
     * Whether to scale and resize through edge lines.
     * You can use "n", "w", "s", "e" in LineDirection array.
     * @default false
     */
    edge?: boolean | Array<LineDirection>;
    /**
     * Whether to recalculate when the size to be calculated is different from the actual size
     * @default true
     */
    checkResizableError?: boolean;
}
/**
 * the Resizable's request parameter
 */
export interface AbleRequesters {
    draggable: DraggableRequestParam;
    resizable: ResizableRequestParam;
    scalable: ScalableRequestParam;
    rotatable: RotatableRequestParam;
    [key: string]: AbleRequestParam;
}

/**
 * the Draggable's request parameter
 * @category Draggable
 * @example
 * // Instantly Request (requestStart - request - requestEnd)
 * // Use Relative Value
 * moveable.request("draggable", { deltaX: 10, deltaY: 10 }, true);
 * // Use Absolute Value
 * moveable.request("draggable", { x: 200, y: 100 }, true);
 *
 * // requestStart
 * const requester = moveable.request("draggable");
 *
 * // request
 * // Use Relative Value
 * requester.request({ deltaX: 10, deltaY: 10 });
 * requester.request({ deltaX: 10, deltaY: 10 });
 * requester.request({ deltaX: 10, deltaY: 10 });
 * // Use Absolute Value
 * moveable.request("draggable", { x: 200, y: 100 });
 * moveable.request("draggable", { x: 220, y: 100 });
 * moveable.request("draggable", { x: 240, y: 100 });
 *
 * // requestEnd
 * requester.requestEnd();
 */
export interface DraggableRequestParam extends AbleRequestParam {
    /**
     * x position
     */
    x?: number;
    /**
     * y position
     */
    y?: number;
    /**
     * X number to move
     */
    deltaX?: number;
    /**
     * Y number to move
     */
    deltaY?: number;
    /**
     * whether to use with `snappable`
     */
    useSnap?: boolean;
}

/**
 * the Resizable's request parameter
 * @category Resizable
 * @example
 * // Instantly Request (requestStart - request - requestEnd)
 * // Use Relative Value
 * moveable.request("resizable", { deltaWidth: 10, deltaHeight: 10 }, true);
 *
 * // Use Absolute Value
 * moveable.request("resizable", { offsetWidth: 100, offsetHeight: 100 }, true);
 *
 * // requestStart
 * const requester = moveable.request("resizable");
 *
 * // request
 * // Use Relative Value
 * requester.request({ deltaWidth: 10, deltaHeight: 10 });
 * requester.request({ deltaWidth: 10, deltaHeight: 10 });
 * requester.request({ deltaWidth: 10, deltaHeight: 10 });
 *
 * // Use Absolute Value
 * moveable.request("resizable", { offsetWidth: 100, offsetHeight: 100 });
 * moveable.request("resizable", { offsetWidth: 110, offsetHeight: 100 });
 * moveable.request("resizable", { offsetWidth: 120, offsetHeight: 100 });
 *
 * // requestEnd
 * requester.requestEnd();
 */
export interface ResizableRequestParam extends AbleRequestParam {
    /**
     * Direction to resize
     * @default [1, 1]
     */
    direction?: number[];
    /**
     * Whether to force keepRatio to resize
     */
    keepRatio?: boolean;
    /**
     * delta number of width
     */
    deltaWidth?: number;
    /**
     * delta number of height
     */
    deltaHeight?: number;
    /**
     * offset number of width
     */
    offsetWidth?: number;
    /**
     * offset number of height
     */
    offsetHeight?: number;
    horizontal?: boolean;
    /**
     * whether to use with `snappable`
     */
    useSnap?: boolean;
}

/**
 * @category Resizable
 */
export interface ResizableEvents {
    /**
     * When the resize starts, the resizeStart event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, { resizable: true });
     * moveable.on("resizeStart", ({ target }) => {
     *     console.log(target);
     * });
     */
    onResizeStart: OnResizeStart;
    /**
     * When resizing, `beforeResize` is called before `resize` occurs. In `beforeResize`, you can get and set the pre-value before resizing.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, { resizable: true });
     * moveable.on("beforeResize", ({ setFixedDirection }) => {
     *     if (shiftKey) {
     *        setFixedDirection([0, 0]);
     *     }
     * });
     * moveable.on("resize", ({ target, width, height, drag }) => {
     *     target.style.width = `${width}px`;
     *     target.style.height = `${height}px`;
     *     target.style.transform = drag.transform;
     * });
     */
    onBeforeResize: OnBeforeResize;
    /**
     * When resizing, the resize event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, { resizable: true });
     * moveable.on("resize", ({ target, width, height }) => {
     *     target.style.width = `${e.width}px`;
     *     target.style.height = `${e.height}px`;
     * });
     */
    onResize: OnResize;
    /**
     * When the resize finishes, the resizeEnd event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, { resizable: true });
     * moveable.on("resizeEnd", ({ target, isDrag }) => {
     *     console.log(target, isDrag);
     * });
     */
    onResizeEnd: OnResizeEnd;

    /**
     * When the group resize starts, the `resizeGroupStart` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     *     resizable: true
     * });
     * moveable.on("resizeGroupStart", ({ targets }) => {
     *     console.log("onResizeGroupStart", targets);
     * });
     */
    onResizeGroupStart: OnResizeGroupStart;
    /**
     * When resizing the group, `beforeResizeGroup` is called before `resizeGroup` occurs. In `beforeResizeGroup`, you can get and set the pre-value before resizing.
     */
    onBeforeResizeGroup: OnBeforeResizeGroup;
    /**
     * When the group resize, the `resizeGroup` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     *     resizable: true
     * });
     * moveable.on("resizeGroup", ({ targets, events }) => {
     *     console.log("onResizeGroup", targets);
     *     events.forEach(ev => {
     *         const offset = [
     *             direction[0] < 0 ? -ev.delta[0] : 0,
     *             direction[1] < 0 ? -ev.delta[1] : 0,
     *         ];
     *         // ev.drag is a drag event that occurs when the group resize.
     *         const left = offset[0] + ev.drag.beforeDist[0];
     *         const top = offset[1] + ev.drag.beforeDist[1];
     *         const width = ev.width;
     *         const top = ev.top;
     *     });
     * });
     */
    onResizeGroup: OnResizeGroup;
    /**
     * When the group resize finishes, the `resizeGroupEnd` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     *     resizable: true
     * });
     * moveable.on("resizeGroupEnd", ({ targets, isDrag }) => {
     *     console.log("onResizeGroupEnd", targets, isDrag);
     * });
     */
    onResizeGroupEnd: OnResizeGroupEnd;
}

export interface ResizableProps extends ResizableOptions, EventInterface<ResizableEvents> {
}


/**
 * @category Scalable
 */
export interface ScalableOptions extends RenderDirections {
    /**
     * Whether or not target can be scaled.
     * @default false
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.scalable = true;
     */
    scalable?: boolean | ScalableOptions;
    /**
     * throttle of scaleX, scaleY when scale.
     * @default 0
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.throttleScale = 0.1;
     */
    throttleScale?: number;
    /**
     * When resize or scale, keeps a ratio of the width, height.
     * @default false
     */
    keepRatio?: boolean;
    /**
     * Whether to scale and resize through edge lines.
     * You can use "n", "w", "s", "e" in LineDirection array.
     * @default false
     */
    edge?: boolean | Array<LineDirection>;
}


/**
 * the Scalable's request parameter
 * @category Scalable
 * @example
 * // Instantly Request (requestStart - request - requestEnd)
 * moveable.request("scalable", { deltaWidth: 10, deltaHeight: 10 }, true);
 *
 * // requestStart
 * const requester = moveable.request("scalable");
 *
 * // request
 * requester.request({ deltaWidth: 10, deltaHeight: 10 });
 * requester.request({ deltaWidth: 10, deltaHeight: 10 });
 * requester.request({ deltaWidth: 10, deltaHeight: 10 });
 *
 * // requestEnd
 * requester.requestEnd();
 */
export interface ScalableRequestParam extends AbleRequestParam {
    /**
     * Direction to scale
     * @default [1, 1]
     */
    direction?: number[];
    /**
     * Whether to force keepRatio to resize
     */
    keepRatio?: boolean;
    /**
     * delta number of width
     */
    deltaWidth?: number;
    /**
     * delta number of height
     */
    deltaHeight?: number;
    /**
     * whether to use with `snappable`
     */
    useSnap?: boolean;
}




/**
 * the Rotatable's request parameter
 * @category Rotatable
 * @example
 * // Instantly Request (requestStart - request - requestEnd)
 * moveable.request("rotatable", { deltaRotate: 10 }, true);
 *
 * * moveable.request("rotatable", { rotate: 10 }, true);
 *
 * // requestStart
 * const requester = moveable.request("rotatable");
 *
 * // request
 * requester.request({ deltaRotate: 10 });
 * requester.request({ deltaRotate: 10 });
 * requester.request({ deltaRotate: 10 });
 *
 * requester.request({ rotate: 10 });
 * requester.request({ rotate: 20 });
 * requester.request({ rotate: 30 });
 *
 * // requestEnd
 * requester.requestEnd();
 */
export interface RotatableRequestParam extends AbleRequestParam {
    /**
     * delta number of rotation
     * @default 0
     */
    deltaRotate?: number;
    /**
     * absolute number of moveable's rotation
     * @default 0
     */
    rotate?: number;
}


/**
 * @category Scalable
 */
export interface ScalableEvents {
    /**
     * When the scale starts, the scaleStart event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, { scalable: true });
     * moveable.on("scaleStart", ({ target }) => {
     *     console.log(target);
     * });
     */
    onScaleStart: OnScaleStart;
    /**
     * When scaling, `beforeScale` is called before `scale` occurs. In `beforeScale`, you can get and set the pre-value before scaling.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, { scalable: true });
     * moveable.on("beforeScale", ({ setFixedDirection }) => {
     *     if (shiftKey) {
     *        setFixedDirection([0, 0]);
     *     }
     * });
     * moveable.on("scale", ({ target, transform, dist }) => {
     *     target.style.transform = transform;
     * });
     */
    onBeforeScale: OnBeforeScale;
    /**
     * When scaling, the `scale` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, { scalable: true });
     * moveable.on("scale", ({ target, transform, dist }) => {
     *     target.style.transform = transform;
     * });
     */
    onScale: OnScale;
    /**
     * When the scale finishes, the `scaleEnd` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, { scalable: true });
     * moveable.on("scaleEnd", ({ target, isDrag }) => {
     *     console.log(target, isDrag);
     * });
     */
    onScaleEnd: OnScaleEnd;

    /**
     * When the group scale starts, the `scaleGroupStart` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     *     scalable: true
     * });
     * moveable.on("scaleGroupStart", ({ targets }) => {
     *     console.log("onScaleGroupStart", targets);
     * });
     */
    onScaleGroupStart: OnScaleGroupStart;
    /**
     * When scaling the group, `beforeScaleGroup` is called before `scaleGroup` occurs. In `beforeScaleGroup`, you can get and set the pre-value before scaling.
     */
    onBeforeScaleGroup: OnBeforeScaleGroup;
    /**
     * When the group scale, the `scaleGroup` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     *     scalable: true
     * });
     * moveable.on("scaleGroup", ({ targets, events }) => {
     *     console.log("onScaleGroup", targets);
     *     events.forEach(ev => {
     *         const target = ev.target;
     *         // ev.drag is a drag event that occurs when the group scale.
     *         const left = ev.drag.beforeDist[0];
     *         const top = ev.drag.beforeDist[1];
     *         const scaleX = ev.scale[0];
     *         const scaleY = ev.scale[1];
     *     });
     * });
     */
    onScaleGroup: OnScaleGroup;
    /**
     * When the group scale finishes, the `scaleGroupEnd` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     *     scalable: true
     * });
     * moveable.on("scaleGroupEnd", ({ targets, isDrag }) => {
     *     console.log("onScaleGroupEnd", targets, isDrag);
     * });
     */
    onScaleGroupEnd: OnScaleGroupEnd;
}
export interface ScalableProps extends ScalableOptions, EventInterface<ScalableEvents> {
}

/**
 * @category Snappable
 */
export interface GapGuideline extends SnapGuideline {
    renderPos: number[];
    inner?: boolean;
}
export interface RenderDirections {
    /**
     * Set directions to show the control box.
     * @default false if rotatable, ["n", "nw", "ne", "s", "se", "sw", "e", "w"] otherwise
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     warpable: true,
     *     renderDirections: ["n", "nw", "ne", "s", "se", "sw", "e", "w"],
     * });
     *
     * moveable.renderDirections = ["nw", "ne", "sw", "se"];
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     scalable: true,
     *   renderDirections: ["n", "nw", "ne", "s", "se", "sw", "e", "w"],
     * });
     *
     * moveable.renderDirections = ["nw", "ne", "sw", "se"];
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *   resizable: true,
     *   renderDirections: ["n", "nw", "ne", "s", "se", "sw", "e", "w"],
     * });
     *
     * moveable.renderDirections = ["nw", "ne", "sw", "se"];
     */
    renderDirections?: boolean | string[];
    /**
     * Whether to scale and resize through edge lines.
     * You can use "n", "w", "s", "e" in LineDirection array.
     * @default false
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     * moveable.edge = true;
     */
    edge?: boolean | Array<LineDirection>;
    /**
     * You can expand the area around the control.
     * Either `rotateAroundControls` or `displayAroundControls` can be used.
     * You can set the area through the `controlPadding` value.
     * @since 0.44.0
     * @see [Storybook](../../../../storybook/?path=/story/options--options-control-padding)
     * @default false
     */
    displayAroundControls?: boolean;
}

/**
 * @category Rotatable
 */
export type RotationPosition
    = "top" | "bottom"
    | "left" | "right"
    | "top-right" | "top-left"
    | "bottom-right" | "bottom-left"
    | "left-top" | "left-bottom"
    | "right-top" | "right-bottom"
    | "none";

/**
 * @category Rotatable
 */
export interface RotatableOptions extends RenderDirections {
    /**
     * Whether or not target can be rotated.
     * @default false
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.rotatable = true;
     */
    rotatable?: boolean | RotatableOptions;
    /**
     * You can specify the position of the rotation.
     * @default "top"
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *   rotationPosition: "top",
     * });
     *
     * moveable.rotationPosition = "bottom"
     */
    rotationPosition?: RotationPosition | RotationPosition[];
    /**
     * You can rotate around direction controls.
     * Either `rotateAroundControls` or `displayAroundControls` can be used.
     * @default 0
     */
    rotateAroundControls?: boolean;
    /**
     * Sets the control that will cause resize along with rotate. (Only Single Target, Only resizable, Beta)
     * @default null
     */
    resolveAblesWithRotatable?: Record<string, LineDirection[]> | null | undefined;
    /**
     * throttle of angle(degree) when rotate.
     * @default 0
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.throttleRotate = 1;
     */
    throttleRotate?: number;

    /**
     * Set additional rotationTargets.
     * @default null
     */
    rotationTarget?: MoveableRefType | ArrayFormat<MoveableRefType> | false;
}
/**
 * @category Rotatable
 */
export interface RotatableEvents {
    /**
     * When the rotate starts, the rotateStart event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, { rotatable: true });
     * moveable.on("rotateStart", ({ target }) => {
     *     console.log(target);
     * });
     */
    onRotateStart: OnRotateStart;
    /**
     * When rotating, `beforeRotate` is called before `rotate` occurs. In `beforeRotate`, you can get and set the pre-value before rotating.
     */
    onBeforeRotate: OnBeforeRotate;
    /**
     * When rotating, the rotate event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, { rotatable: true });
     * moveable.on("rotate", ({ target, transform, dist }) => {
     *     target.style.transform = transform;
     * });
     */
    onRotate: OnRotate;
    /**
     * When the rotate finishes, the rotateEnd event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, { rotatable: true });
     * moveable.on("rotateEnd", ({ target, isDrag }) => {
     *     console.log(target, isDrag);
     * });
     */
    onRotateEnd: OnRotateEnd;

    /**
     * When the group rotate starts, the `rotateGroupStart` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     *     rotatable: true
     * });
     * moveable.on("rotateGroupStart", ({ targets }) => {
     *     console.log("onRotateGroupStart", targets);
     * });
     */
    onRotateGroupStart: OnRotateGroupStart;
    /**
     * When rotating the group, `beforeRotateGroup` is called before `rotateGroup` occurs. In `beforeRotateGroup`, you can get and set the pre-value before rotating.
     */
    onBeforeRotateGroup: OnBeforeRotateGroup;
    /**
     * When the group rotate, the `rotateGroup` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     *     rotatable: true
     * });
     * moveable.on("rotateGroup", ({ targets, events }) => {
     *     console.log("onRotateGroup", targets);
     *     events.forEach(ev => {
     *         const target = ev.target;
     *         // ev.drag is a drag event that occurs when the group rotate.
     *         const left = ev.drag.beforeDist[0];
     *         const top = ev.drag.beforeDist[1];
     *         const deg = ev.beforeDist;
     *     });
     * });
     */
    onRotateGroup: OnRotateGroup;
    /**
     * When the group rotate finishes, the `rotateGroupEnd` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     *     rotatable: true
     * });
     * moveable.on("rotateGroupEnd", ({ targets, isDrag }) => {
     *     console.log("onRotateGroupEnd", targets, isDrag);
     * });
     */
    onRotateGroupEnd: OnRotateGroupEnd;
}
export interface RotatableProps extends RotatableOptions, EventInterface<RotatableEvents> {
}
/**
 * @category Warpable
 */
export interface WarpableOptions extends RenderDirections {
    /**
     * Whether or not target can be warped.
     * @default false
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.warpable = true;
     */
    warpable?: boolean;
}

/**
 * @category Warpable
 */
export interface WarpableEvents {
    /**
     * When the warp starts, the warpStart event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, { warpable: true });
     * moveable.on("warpStart", ({ target }) => {
     *     console.log(target);
     * });
     */
    onWarpStart: OnWarpStart;
    /**
     * When warping, the warp event is called.
     * @example
     * import Moveable from "moveable";
     * let matrix = [
     *  1, 0, 0, 0,
     *  0, 1, 0, 0,
     *  0, 0, 1, 0,
     *  0, 0, 0, 1,
     * ];
     * const moveable = new Moveable(document.body, { warpable: true });
     * moveable.on("warp", ({ target, transform, delta, multiply }) => {
     *    // target.style.transform = transform;
     *    matrix = multiply(matrix, delta);
     *    target.style.transform = `matrix3d(${matrix.join(",")})`;
     * });
     */
    onWarp: OnWarp;
    /**
     * When the warp finishes, the warpEnd event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, { warpable: true });
     * moveable.on("warpEnd", ({ target, isDrag }) => {
     *     console.log(target, isDrag);
     * });
     */
    onWarpEnd: OnWarpEnd;
}
export interface WarpableProps extends WarpableOptions, EventInterface<WarpableEvents> {
}

/**
 * @category Pinchable
 */
export interface PinchableOptions {
    /**
     * Whether or not target can be pinched with draggable, resizable, scalable, rotatable.
     * @default false
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.pinchable = true;
     */
    pinchable?: boolean | Array<"rotatable" | "resizable" | "scalable">;
}
/**
 * @category Pinchable
 */
export interface PinchableEvents {
    /**
     * When the pinch starts, the pinchStart event is called with part of scaleStart, rotateStart, resizeStart
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     rotatable: true,
     *     scalable: true,
     *     pinchable: true, // ["rotatable", "scalable"]
     * });
     * moveable.on("pinchStart", ({ target }) => {
     *     console.log(target);
     * });
     * moveable.on("rotateStart", ({ target }) => {
     *     console.log(target);
     * });
     * moveable.on("scaleStart", ({ target }) => {
     *     console.log(target);
     * });
     */
    onPinchStart: OnPinchStart;
    /**
     * When pinching, the pinch event is called with part of scale, rotate, resize
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     rotatable: true,
     *     scalable: true,
     *     pinchable: true, // ["rotatable", "scalable"]
     * });
     * moveable.on("pinch", ({ target }) => {
     *     console.log(target);
     * });
     * moveable.on("rotate", ({ target }) => {
     *     console.log(target);
     * });
     * moveable.on("scale", ({ target }) => {
     *     console.log(target);
     * });
     */
    onPinch: OnPinch;
    /**
     * When the pinch finishes, the pinchEnd event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     rotatable: true,
     *     scalable: true,
     *     pinchable: true, // ["rotatable", "scalable"]
     * });
     * moveable.on("pinchEnd", ({ target }) => {
     *     console.log(target);
     * });
     * moveable.on("rotateEnd", ({ target }) => {
     *     console.log(target);
     * });
     * moveable.on("scaleEnd", ({ target }) => {
     *     console.log(target);
     * });
     */
    onPinchEnd: OnPinchEnd;

    /**
     * When the group pinch starts, the `pinchGroupStart` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     *     pinchable: true
     * });
     * moveable.on("pinchGroupStart", ({ targets }) => {
     *     console.log("onPinchGroupStart", targets);
     * });
     */
    onPinchGroupStart: OnPinchGroupStart;
    /**
     * When the group pinch, the `pinchGroup` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     *     pinchable: true
     * });
     * moveable.on("pinchGroup", ({ targets, events }) => {
     *     console.log("onPinchGroup", targets);
     * });
     */
    onPinchGroup: OnPinchGroup;
    /**
     * When the group pinch finishes, the `pinchGroupEnd` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     *     pinchable: true
     * });
     * moveable.on("pinchGroupEnd", ({ targets, isDrag }) => {
     *     console.log("onPinchGroupEnd", targets, isDrag);
     * });
     */
    onPinchGroupEnd: OnPinchGroupEnd;
}
export interface PinchableProps
    extends PinchableOptions, ResizableProps, ScalableProps,
    RotatableProps, EventInterface<PinchableEvents> {
}

/**
 * @category Group
 */
export interface GroupableOptions {
    /**
     * Sets the initial rotation of the group.
     * @default 0
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *   target: [].slice.call(document.querySelectorAll(".target")),
     *   defaultGroupRotate: 0,
     * });
     *
     * moveable.defaultGroupRotate = 40;
     */
    defaultGroupRotate?: number;
    /**
     * Use the defaultGroupRotate even if the children's rotations match.
     * @default false
     */
    useDefaultGroupRotate?: boolean;
    /**
     * Sets the initial transform origin of the group.
     * @default  "50% 50%"
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *   target: [].slice.call(document.querySelectorAll(".target")),
     *   defaultGroupOrigin: "50% 50%",
     * });
     *
     * moveable.defaultGroupOrigin = "20% 40%";
     */
    defaultGroupOrigin?: string;
    /**
     * The nested groups of the targets, made from the nested arrays in `target`.
     * Moveable sets it itself when it renders a group.
     */
    targetGroups?: MoveableTargetGroupsType;
    /**
     * @private
     */
    groupable?: boolean;
    /**
     * Whether to hide the line in child moveable for group corresponding to the rect of the target.
     * @default false
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *   target: [].slice.call(document.querySelectorAll(".target")),
     *   hideChildMoveableDefaultLines: false,
     * });
     *
     * moveable.hideChildMoveableDefaultLines = true;
     */
    hideChildMoveableDefaultLines?: boolean;
    /**
     * Props that work when group
     * @example
     * ```js
     * {
     *     roundable: true,
     *     groupableProps: {
     *         roundable: false,
     *     },
     * }
     * ```
     */
    groupableProps?: Record<string, any>;
}

export type MoveableTargetGroupsType = Array<HTMLElement | SVGElement | MoveableTargetGroupsType>;


/**
 * @category IndividualGroup
 */
export interface IndividualGroupableOptions {
    /**
     * Create targets individually, not as a group.
     * @see [Storybook](../../../../storybook/?path=/story/individual-group--individual-group-draggable-scalable-rotatable)
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *   target: [].slice.call(document.querySelectorAll(".target")),
     *   individualGroupable: true,
     * });
     */
    individualGroupable?: boolean;
    /**
     * When using individualGroupable you can pass props to child moveable.
     * @see [Storybook](../../../../storybook/?path=/story/individual-group--individual-group-groupable-props)
     * @since 0.44.0
     */
    individualGroupableProps?: (
        element: HTMLElement | SVGElement | null | undefined,
        index: number,
    ) => Record<string, any> | undefined | null | void;
}

export interface IndividualGroupableProps extends IndividualGroupableOptions {
}

export interface GroupableProps extends GroupableOptions {
    targets?: Array<HTMLElement | SVGElement>;
    updateGroup?: boolean;
}

/**
 * @category Snappable
 */
export interface SnappableOptions {
    /**
     * Whether or not target can be snapped to the guideline.
     * @default false
     * @see {@link SnappableOptions}
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.snappable = true;
     */
    snappable?: boolean | string[];
    /**
     * A snap container that is the basis for snap, bounds, and innerBounds.
     * @default null
     * @see {@link SnappableOptions}
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.querySelector(".container"));
     *
     * moveable.snapContainer = document.body;
     */
    snapContainer?: MoveableRefType<HTMLElement | SVGElement>;
    /**
     * You can specify the directions to snap to the target.
     * @default true (true is all directions)
     * @see {@link SnappableOptions}
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *   snappable: true,
     *   snapDirections: true,
     * });
     * // snap center
     * moveable.snapDirections = { left: true, top: true, right: true, bottom: true, center: true, middle: true };
     */
    snapDirections?: boolean | SnapDirections;
    /**
     * You can specify the snap directions of elements.
     * @default true (true is all directions)
     * @see {@link SnappableOptions}
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *   snappable: true,
     *   elementSnapDirections: true,
     * });
     * // snap center
     * moveable.elementSnapDirections = { left: true, top: true, right: true, bottom: true, center: true, middle: true };
     */
    elementSnapDirections?: boolean | SnapDirections;
    /**
     * When you drag, make the gap snap in the element guidelines.
     * @default true
     * @see {@link SnappableOptions}
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *   snappable: true,
     *   snapElement: true,
     *   snapGap: true,
     * });
     *
     * moveable.snapGap = false;
     */
    snapGap?: boolean;
    /**
    /**
     * Distance value that can snap to guidelines.
     * Use `snapHorizontalThreshold` and `snapVerticalThreshold`
     * @default 0
     * @deprecated
     * @see {@link SnappableOptions}
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.snapThreshold = 5;
     */
    snapThreshold?: number;
    /**
     * Distance horizontal between horizontal value that can snap to guidelines.
     * @default 5
     */
    snapHorizontalThreshold?: number;
    /**
     * Distance Horizontal value that can snap to guidelines.
     * @default 5
     */
    snapVerticalThreshold?: number;
    /**
     * Distance value that render snapped guidelines.
     * @default 1
     */
    snapRenderThreshold?: number;
    /**
     * snap distance digits.
     * @default 0
     * @see {@link SnappableOptions}
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.snapDigit = 0
     */
    snapDigit?: number;
    /**
     * Whether to show guideline of snap by grid
     * @default false
     */
    isDisplayGridGuidelines?: boolean;
    /**
     * Snap works if `abs(current rotation - snapRotationDegrees) < snapRotationThreshold`.
     * @default 5
     */
    snapRotationThreshold?: number;
    /**
     * degree angles to snap to rotation
     * @default []
     */
    snapRotationDegrees?: number[];
    /**
     * If width size is greater than 0, you can vertical snap to the grid.
     * @default 0 (0 is not used)
     * @see {@link SnappableOptions}
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.snapGridWidth = 5;
     */
    snapGridWidth?: number;
    /**
     * If height size is greater than 0, you can horizontal snap to the grid.
     * @default 0 (0 is not used)
     * @see {@link SnappableOptions}
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.snapGridHeight = 5;
     */
    snapGridHeight?: number;
    /**
     * In the case of a group, if `snapGridWidth` and `snapGridHeight` are used, all children can be snapped.
     * Custom fixed directions are not yet allowed. Also, it cannot be applied if rotated.
     * @default false
     */
    snapGridAll?: boolean;
    /**
     * Whether to show snap distance.
     * @default true
     * @see {@link SnappableOptions}
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.isDisplaySnapDigit = true;
     */
    isDisplaySnapDigit?: boolean;
    /**
     * Whether to show element inner snap distance
     * @default false
     * @see {@link SnappableOptions}
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.isDisplayInnerSnapDigit = true;
     */
    isDisplayInnerSnapDigit?: boolean;
    /**
     * Add guidelines in the horizontal direction.
     * @default []
     * @see {@link SnappableOptions}
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.horizontalGuidelines = [100, 200, 500];
     */
    horizontalGuidelines?: Array<PosGuideline | number | string>;
    /**
     * Add guidelines in the vertical direction.
     * @default []
     * @see {@link SnappableOptions}
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.verticalGuidelines = [100, 200, 500];
     */
    verticalGuidelines?: Array<PosGuideline | number | string>;
    /**
     * Add guidelines for the element.
     * @default []
     * @see {@link SnappableOptions}
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.elementGuidelines = [
     *   document.querySelector(".element"),
     * ];
     */
    elementGuidelines?: Array<ElementGuidelineValueOption | MoveableRefType<Element>>;
    /**
     * Maximum distance to which element guidelines can be snapped.
     * @default Infinity
     */
    maxSnapElementGuidelineDistance?: number;
    /**
     * Maximum distance to which element gap guidelines can be snapped.
     * @default Infinity
     */
    maxSnapElementGapDistance?: number;
    /**
     * You can set up boundaries.
     * @default null
     * @see {@link SnappableOptions}
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.bounds = { left: 0, right: 1000, top: 0, bottom: 1000};
     */
    bounds?: BoundType | null;
    /**
     * You can set up inner boundaries.
     * @default null
     * @see {@link SnappableOptions}
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.innerBounds = { left: 500, top: 500, width: 100, height: 100};
     */
    innerBounds?: InnerBoundType | null;
    /**
     * You can set the text format of the distance shown in the guidelines.
     * @default oneself
     * @see {@link SnappableOptions}
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *  snappable: true,
     *  snapDistFormat: (v, type) => v,
     * });
     * moveable.snapDistFormat = (v, type) => `${v}px`;
     */
    snapDistFormat?: (distance: number, type: "vertical" | "horizontal") => number | string;
}

/**
 * @category Snappable
 */
export interface SnapDirections {
    /**
     * Whether to snap the top of the element
     * @default true
     */
    left?: boolean;
    /**
     * Whether to snap the left of the element
     * @default true
     */
    top?: boolean;
    /**
     * Whether to snap the right of the element
     * @default true
     */
    right?: boolean;
    /**
     * Whether to snap the bottom of the element
     * @default true
     */
    bottom?: boolean;
    /**
     * Whether to snap the center((left + right) / 2) of the element
     * @default false
     */
    center?: boolean;
    /**
     * Whether to snap the middle((top + bottom) / 2) of the element
     * @default false
     */
    middle?: boolean;
}
/**
 * @category Snappable
 */
export interface ElementGuidelineValue extends SnapDirections {
    /**
     * guideline element
     */
    element: Element;
    /**
     * class names to add to guideline
     * @default ""
     * @example
     *
     * ```css
     * .moveable-gap.red {
     *   background: red!important;
     * }
     * ```
     * ```css
     * .moveable-bold.red {
     *   background: red!important;
     * }
     * ```
     * ```css
     * .moveable-dashed.red {
     *   border-top-color: red!important;
     * }
     * ```
     */
    className?: string;
    /**
     * Whether to update the element size at every render
     * @default false
     */
    refresh?: boolean;
}



/**
 * @category Snappable
 */
export interface ElementGuidelineValueOption extends SnapDirections {
    /**
     * guideline element
     */
    element: MoveableRefType<Element>;
    /**
     * class names to add to guideline
     * @default ""
     */
    className?: string;
    /**
     * Whether to update the element size at every render
     * @default false
     */
    refresh?: boolean;
}
/**
 * @category Snappable
 */
export interface PosGuideline {
    /**
     * guideline pos
     */
    pos: number | string;
    /**
     * class names to add to guideline
     * @default ""
     */
    className?: string;
}
/**
 * @category Snappable
 */
export interface NumericPosGuideline extends PosGuideline {
    pos: number;
}
export interface ElementGuidelineValue extends SnapDirections {
    element: Element;
    className?: string;
    refresh?: boolean;
}
/**
 * @category Snappable
 */
export interface SnappableEvents {
    /**
     * When you drag or dragControl, the `snap` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     snappable: true
     * });
     * moveable.on("snap", e => {
     *     console.log("onSnap", e);
     * });
     */
    onSnap: OnSnap;
    /**
     * When the bounds or inner bounds that the target touches while snapping are changed, the `bound` event is called.
     */
    onBound: OnBound;
}
export interface SnappableProps extends SnappableOptions, EventInterface<SnappableEvents> {
}

/**
 * @category Snappable
 */
export interface OnSnap {
    /**
     * snapped verticalGuidelines, horizontalGuidelines,
     */
    guidelines: SnapGuideline[];
    /**
     * snapped elements (group by element)
     */
    elements: SnapGuideline[];
    /**
     * gaps is snapped guidelines that became gap snap between elements.
     */
    gaps: SnapGuideline[];
}

/**
 * @category Snappable
 */
export interface OnBound {
    bounds: {
        left: boolean;
        top: boolean;
        right: boolean;
        bottom: boolean;
    };
    innerBounds: {
        left: boolean;
        top: boolean;
        right: boolean;
        bottom: boolean;
    };
}
/**
 * @category Snappable
 */
export interface InnerBoundType {
    left: number;
    top: number;
    width: number;
    height: number;
}
/**
 * @category Snappable
 */
export interface BoundType {
    /**
     * If position is css, right and bottom are calculated as css right and css bottom of container.
     * @default "client"
     */
    position?: "client" | "css";
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
}

/**
 * @category Snappable
 */
export interface SnapDirectionPoses {
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
    center?: number;
    middle?: number;
}

export interface SnapElementRect extends ElementGuidelineValue {
    rect: SnapDirectionPoses;
}
/**
 * @category Snappable
 */
export interface SnappableState {
    staticGuidelines: SnapGuideline[];
    elementRects: SnapElementRect[];
    guidelines: SnapGuideline[];
    snapContainer: MoveableRefType<HTMLElement | SVGElement>;
    snapOffset: { left: number, top: number, bottom: number, right: number }
    snapRenderInfo?: SnapRenderInfo | null;
    snapThresholdInfo?: { multiples: number[]; offset: number[]; } | null;
    enableSnap: boolean;
}
/**
 * @category Snappable
 */
export interface SnapRenderInfo {
    render?: boolean;
    direction?: number[];
    snap?: boolean;
    center?: boolean;
    request?: boolean;
    externalPoses?: number[][];
    externalBounds?: BoundType | false | null;
}

/**
 * @category Scrollable
 */
export interface ScrollableOptions {
    /**
     * Whether or not target can be scrolled to the scroll container
     * @default false
     */
    scrollable?: boolean;
    /**
     * The container to which scroll is applied
     * @deprecated
     * @default container
     */
    scrollContainer?: MoveableRefType<HTMLElement>;
    /**
     * Expand the range of the scroll check area.
     * @deprecated
     * @default 0
     */
    scrollThreshold?: number;
    /**
     * Time interval that occurs when scrolling occurs when dragging is maintained
     * If set to 0, it does not occur.
     * @deprecated
     * @default 0
     */
    scrollThrottleTime?: number;
    /**
     * Sets a function to get the scroll position.
     * @deprecated
     * @default scrollContainer's scrollTop, scrollLeft
     */
    getScrollPosition?: (e: { scrollContainer: HTMLElement, direction: number[] }) => number[];
    /**
     * Option to scroll with dragging
     * @since 0.43.0
     * @see [Storybook](../../../../storybook/?path=/story/support-scroll--scrolling-scrollable)
     * @example
     * const scrollOptions = {
     *     container: () => viewer.getContainer(),
     *     threshold: 20,
     *     getScrollPosition: () => {
     *         return [
     *             viewer.getScrollLeft({ absolute: true }),
     *             viewer.getScrollTop({ absolute: true }),
     *         ];
     *     },
     * };
     */
    scrollOptions?: Partial<DragScrollOptions> | null;
}
/**
 * @category Scrollable
 */
export interface ScrollableEvents {
    /**
     * When the drag cursor leaves the scrollContainer, the `scroll` event occur to scroll.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: document.querySelector(".target"),
     * });
     * moveable.on("scroll", ({ scrollContainer, direction }) => {
     *   scrollContainer.scrollLeft += direction[0] * 10;
     *   scrollContainer.scrollTop += direction[1] * 10;
     * });
     */
    onScroll: OnScroll;
    /**
     * When the drag cursor leaves the scrollContainer, the `scrollGroup` event occur to scroll in group.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     * });
     * moveable.on("scroll", ({ scrollContainer, direction }) => {
     *   scrollContainer.scrollLeft += direction[0] * 10;
     *   scrollContainer.scrollTop += direction[1] * 10;
     * });
     */
    onScrollGroup: OnScrollGroup;
}
export interface ScrollableProps extends ScrollableOptions, EventInterface<ScrollableEvents> {
}

export interface DragAreaOptions {
    /**
     * Instead of firing an event on the target, we add it to the moveable control element. You can use click and clickGroup events.
     * Add an event to the moveable area instead of the target for stopPropagation.
     * @default if group, true, else fals
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *  dragArea: false,
     * });
     */
    dragArea?: boolean;
    /**
     * Set `pointerEvents: none;` css to pass events in dragArea.
     * @default false
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *  dragArea: false,
     * });
     */
    passDragArea?: boolean;
}
export interface DragAreaProps extends DragAreaOptions {
}
/**
 * @category Clickable
 */
export interface ClickableEvents {
    /**
     * When you click on the element, the `click` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: document.querySelector(".target"),
     * });
     * moveable.on("click", ({ hasTarget, containsTarget, targetIndex }) => {
     *     // If you click on an element other than the target and not included in the target, index is -1.
     *     console.log("onClickGroup", target, hasTarget, containsTarget, targetIndex);
     * });
     */
    onClick: OnClick;
    /**
     * When you click on the element inside the group, the `clickGroup` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     * });
     * moveable.on("clickGroup", ({ inputTarget, isTarget, containsTarget, targetIndex }) => {
     *     // If you click on an element other than the target and not included in the target, index is -1.
     *     console.log("onClickGroup", inputTarget, isTarget, containsTarget, targetIndex);
     * });
     */
    onClickGroup: OnClickGroup;
}

export interface ArrayFormat<T = any> {
    length: number;
    [key: number]: T;
}
/**
 * @category Clickable
 */
export interface ClickableOptions {
    /**
     * Whether to trigger the moveable's click event.
     * @default true
     */
    clickable?: boolean;
}
/**
 * @category Clickable
 */
export interface ClickableProps extends EventInterface<ClickableEvents>, ClickableOptions {
}
export interface BeforeRenderableEvents {
    /**
     * `beforeRenderStart` event occurs before the first start of all events.
     */
    onBeforeRenderStart: OnBeforeRenderStart;
    /**
     * `beforeRender` event occurs before the dragging of all events.
     */
    onBeforeRender: OnBeforeRender;
    /**
     * `beforeRenderEnd` event occurs before the end of all events.
     */
    onBeforeRenderEnd: OnBeforeRenderEnd;
    /**
     * `beforeRenderGroupStart` event occurs before the first start of all events in group.
     */
    onBeforeRenderGroupStart: OnBeforeRenderGroupStart;
    /**
     * `beforeRenderGroup` event occurs before the dragging of all events in group.
     */
    onBeforeRenderGroup: OnBeforeRenderGroup;
    /**
     * `beforeRenderGroupEnd` event occurs before the end of all events in group.
     */
    onBeforeRenderGroupEnd: OnBeforeRenderGroupEnd;
}
export interface BeforeRenderableProps extends EventInterface<BeforeRenderableEvents> {
}
export interface RenderableEvents {
    /**
     * `renderStart` event occurs at the first start of all events.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: document.querySelector(".target"),
     * });
     * moveable.on("renderStart", ({ target }) => {
     *     console.log("onRenderStart", target);
     * });
     */
    onRenderStart: OnRenderStart;
    /**
     * `render` event occurs before the target is drawn on the screen.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: document.querySelector(".target"),
     * });
     * moveable.on("render", ({ target }) => {
     *     console.log("onRender", target);
     * });
     */
    onRender: OnRender;
    /**
     * `renderEnd` event occurs at the end of all events.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: document.querySelector(".target"),
     * });
     * moveable.on("renderEnd", ({ target }) => {
     *     console.log("onRenderEnd", target);
     * });
     */
    onRenderEnd: OnRenderEnd;
    /**
     * `renderGroupStart` event occurs at the first start of all events in group.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     * });
     * moveable.on("renderGroupStart", ({ targets }) => {
     *     console.log("onRenderGroupStart", targets);
     * });
     */
    onRenderGroupStart: OnRenderGroupStart;
    /**
     * `renderGroup` event occurs before the target is drawn on the screen in group.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     * });
     * moveable.on("renderGroup", ({ targets }) => {
     *     console.log("onRenderGroup", targets);
     * });
     */
    onRenderGroup: OnRenderGroup;
    /**
     * `renderGroupEnd` event occurs at the end of all events in group.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     * });
     * moveable.on("renderGroupEnd", ({ targets }) => {
     *     console.log("onRenderGroupEnd", targets);
     * });
     */
    onRenderGroupEnd: OnRenderGroupEnd;
}
export interface RenderableProps extends EventInterface<RenderableEvents> {
}

/**
 * @category Clippable
 */
export interface ClippableOptions {
    /**
     * Whether to clip the target.
     * @default false
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     clippable: true,
     *     defaultClipPath: "inset",
     *     customClipPath: "",
     *     clipRelative: false,
     *     clipArea: false,
     *     dragWithClip: true,
     * });
     * moveable.on("clipStart", e => {
     *     console.log(e);
     * }).on("clip", e => {
     *     if (e.clipType === "rect") {
     *         e.target.style.clip = e.clipStyle;
     *     } else {
     *         e.target.style.clipPath = e.clipStyle;
     *     }
     * }).on("clipEnd", e => {
     *     console.log(e);
     * });
     */
    clippable?: boolean | ClippableOptions;
    /**
     * Whether to keep the ratio of size if your clipPath is 'inset', 'rect', 'ellipse' type
     * @default false
     */
    keepRatio?: boolean;
    /**
     * You can force the custom clipPath. (defaultClipPath < style < customClipPath < dragging clipPath)
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     clippable: true,
     *     defaultClipPath: "inset",
     *     customClipPath: "",
     *     clipRelative: false,
     *     clipArea: false,
     *     dragWithClip: true,
     * });
     * moveable.on("clipStart", e => {
     *     console.log(e);
     * }).on("clip", e => {
     *     if (e.clipType === "rect") {
     *         e.target.style.clip = e.clipStyle;
     *     } else {
     *         e.target.style.clipPath = e.clipStyle;
     *     }
     * }).on("clipEnd", e => {
     *     console.log(e);
     * });
     */
    customClipPath?: string;
    /**
     * If clippath is not set, the default value can be set. (defaultClipPath < style < customClipPath < dragging clipPath)
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     clippable: true,
     *     defaultClipPath: "inset",
     *     customClipPath: "",
     *     clipRelative: false,
     *     clipArea: false,
     *     dragWithClip: true,
     * });
     * moveable.on("clipStart", e => {
     *     console.log(e);
     * }).on("clip", e => {
     *     if (e.clipType === "rect") {
     *         e.target.style.clip = e.clipStyle;
     *     } else {
     *         e.target.style.clipPath = e.clipStyle;
     *     }
     * }).on("clipEnd", e => {
     *     console.log(e);
     * });
     */
    defaultClipPath?: string;
    /**
     * % Can be used instead of the absolute px (`rect` not possible)
     * @default false
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     clippable: true,
     *     defaultClipPath: "inset",
     *     customClipPath: "",
     *     clipRelative: false,
     *     clipArea: false,
     *     dragWithClip: true,
     * });
     * moveable.on("clipStart", e => {
     *     console.log(e);
     * }).on("clip", e => {
     *     if (e.clipType === "rect") {
     *         e.target.style.clip = e.clipStyle;
     *     } else {
     *         e.target.style.clipPath = e.clipStyle;
     *     }
     * }).on("clipEnd", e => {
     *     console.log(e);
     * });
     */
    clipRelative?: boolean;
    /**
     * When dragging the target, the clip also moves.
     * @default true
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     clippable: true,
     *     defaultClipPath: "inset",
     *     customClipPath: "",
     *     clipRelative: false,
     *     clipArea: false,
     *     dragWithClip: true,
     * });
     * moveable.on("clipStart", e => {
     *     console.log(e);
     * }).on("clip", e => {
     *     if (e.clipType === "rect") {
     *         e.target.style.clip = e.clipStyle;
     *     } else {
     *         e.target.style.clipPath = e.clipStyle;
     *     }
     * }).on("clipEnd", e => {
     *     console.log(e);
     * });
     */
    dragWithClip?: boolean;
    /**
     * You can drag the clip by setting clipArea.
     * @default false
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     clippable: true,
     *     defaultClipPath: "inset",
     *     customClipPath: "",
     *     clipRelative: false,
     *     clipArea: false,
     *     dragWithClip: true,
     * });
     * moveable.on("clipStart", e => {
     *     console.log(e);
     * }).on("clip", e => {
     *     if (e.clipType === "rect") {
     *         e.target.style.clip = e.clipStyle;
     *     } else {
     *         e.target.style.clipPath = e.clipStyle;
     *     }
     * }).on("clipEnd", e => {
     *     console.log(e);
     * });
     */
    clipArea?: boolean;
    /**
     * Whether the clip is bound to the target.
     * @default false
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     clippable: true,
     *     defaultClipPath: "inset",
     *     customClipPath: "",
     *     clipRelative: false,
     *     clipArea: false,
     *     dragWithClip: true,
     *     clipTargetBounds: true,
     * });
     * moveable.on("clipStart", e => {
     *     console.log(e);
     * }).on("clip", e => {
     *     if (e.clipType === "rect") {
     *         e.target.style.clip = e.clipStyle;
     *     } else {
     *         e.target.style.clipPath = e.clipStyle;
     *     }
     * }).on("clipEnd", e => {
     *     console.log(e);
     * });
     */
    clipTargetBounds?: boolean;
    /**
     * Add clip guidelines in the vertical direction.
     * @default []
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     clippable: true,
     *     defaultClipPath: "inset",
     *     customClipPath: "",
     *     clipRelative: false,
     *     clipArea: false,
     *     dragWithClip: true,
     *     clipVerticalGuidelines: [0, 100, 200],
     *     clipHorizontalGuidelines: [0, 100, 200],
     *     clipSnapThreshold: 5,
     * });
     */
    clipVerticalGuidelines?: Array<string | number>;
    /**
     * Add clip guidelines in the horizontal direction.
     * @default []
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     clippable: true,
     *     defaultClipPath: "inset",
     *     customClipPath: "",
     *     clipRelative: false,
     *     clipArea: false,
     *     dragWithClip: true,
     *     clipVerticalGuidelines: [0, 100, 200],
     *     clipHorizontalGuidelines: [0, 100, 200],
     *     clipSnapThreshold: 5,
     * });
     */
    clipHorizontalGuidelines?: Array<string | number>;
    /**
     * Distance value that can snap to clip guidelines.
     * @default 5
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     clippable: true,
     *     defaultClipPath: "inset",
     *     customClipPath: "",
     *     clipRelative: false,
     *     clipArea: false,
     *     dragWithClip: true,
     *     clipVerticalGuidelines: [0, 100, 200],
     *     clipHorizontalGuidelines: [0, 100, 200],
     *     clipSnapThreshold: 5,
     * });
     */
    clipSnapThreshold?: number;
}
/**
 * @category Clippable
 */
export interface ClippableEvents {
    /**
     * When drag start the clip area or controls, the `clipStart` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     clippable: true,
     *     defaultClipPath: "inset",
     *     customClipPath: "",
     *     clipRelative: false,
     *     clipArea: false,
     *     dragWithClip: true,
     * });
     * moveable.on("clipStart", e => {
     *     console.log(e);
     * }).on("clip", e => {
     *     if (e.clipType === "rect") {
     *         e.target.style.clip = e.clipStyle;
     *     } else {
     *         e.target.style.clipPath = e.clipStyle;
     *     }
     * }).on("clipEnd", e => {
     *     console.log(e);
     * });
     */
    onClipStart: OnClipStart;
    /**
     * When drag the clip area or controls, the `clip` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     clippable: true,
     *     defaultClipPath: "inset",
     *     customClipPath: "",
     *     clipRelative: false,
     *     clipArea: false,
     *     dragWithClip: true,
     * });
     * moveable.on("clipStart", e => {
     *     console.log(e);
     * }).on("clip", e => {
     *     if (e.clipType === "rect") {
     *         e.target.style.clip = e.clipStyle;
     *     } else {
     *         e.target.style.clipPath = e.clipStyle;
     *     }
     * }).on("clipEnd", e => {
     *     console.log(e);
     * });
     */
    onClip: OnClip;
    /**
     * When drag end the clip area or controls, the `clipEnd` event is called.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     clippable: true,
     *     defaultClipPath: "inset",
     *     customClipPath: "",
     *     clipRelative: false,
     *     clipArea: false,
     *     dragWithClip: true,
     * });
     * moveable.on("clipStart", e => {
     *     console.log(e);
     * }).on("clip", e => {
     *     if (e.clipType === "rect") {
     *         e.target.style.clip = e.clipStyle;
     *     } else {
     *         e.target.style.clipPath = e.clipStyle;
     *     }
     * }).on("clipEnd", e => {
     *     console.log(e);
     * });
     */
    onClipEnd: OnClipEnd;
}
export interface ClippableProps extends ClippableOptions, EventInterface<ClippableEvents> {
}
/**
 * @category Clippable
 */
export interface ClippableState {
    clipPathState?: string;
    snapBoundInfos?: { vertical: Required<SnapBoundInfo>, horizontal: Required<SnapBoundInfo> } | null;
}

/**
 * @category Clippable
 */
export interface OnClipStart extends OnEvent {
    /**
     * The clip type.
     */
    clipType: "polygon" | "circle" | "ellipse" | "inset" | "rect";
    /**
     * The control positions
     */
    poses: number[][];
    /**
     * CSS style of changed clip
     */
    clipStyle: string;
}
/**
 * @category Clippable
 */
export interface OnClip extends OnEvent, CSSObject {
    /**
     * The clip type.
     */
    clipType: "polygon" | "circle" | "ellipse" | "inset" | "rect";
    /**
     * The clip event type.
     */
    clipEventType: "added" | "changed" | "removed";
    /**
     * The control positions
     */
    poses: number[][];
    /**
     * x position of the distance the control has moved
     */
    distX: number;
    /**
     * y position of the distance the control has moved
     */
    distY: number;
    /**
     * CSS style of changed clip
     */
    clipStyle: string;
    /**
     * Splited CSS styles of changed clip
     */
    clipStyles: string[];

}
/**
 * @category Clippable
 */
export interface OnClipEnd extends OnEndEvent { }

export interface OnCustomDrag extends GestoTypes.Position {
    type: string;
    inputEvent: any;
    isDrag: boolean;
    isFirstDrag: boolean;
    datas: IObject<any>;
    originalDatas: IObject<any>;
    parentEvent: boolean;
    parentGesto: CustomGesto;
}

export type PersistRectData = Omit<Partial<RectInfo>, "children"> & {
    children?: Array<Partial<RectInfo>>;
};


export interface RectInfo {
    /**
     * The coordinates of the vertex 1
     */
    pos1: number[];
    /**
     * The coordinates of the vertex 2
     */
    pos2: number[];
    /**
     * The coordinates of the vertex 3
     */
    pos3: number[];
    /**
     * The coordinates of the vertex 4
     */
    pos4: number[];
    /**
     * left position of the target relative to the container
     */
    left: number;
    /**
     * top position of the target relative to the container
     */
    top: number;
    /**
     * The width of moveable element
     */
    width: number;
    /**
     * The height of moveable element
     */
    height: number;
    /**
     * The offset width of the target
     */
    offsetWidth: number;
    /**
     * The offset height of the target
     */
    offsetHeight: number;
    /**
     * The absolute transform origin
     */
    origin: number[];
    /**
     * The absolute transform origin before transformation
     */
    beforeOrigin: number[];
    /**
     * The target transform origin
     */
    transformOrigin: number[];
    /**
     * you can get the absolute rotation value
     */
    rotation: number;
    /**
     * If you use a group, you can get child moveables' rect info
     */
    children?: RectInfo[];
}

export interface GroupRect {
    pos1: number[];
    pos2: number[];
    pos3: number[];
    pos4: number[];
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    width: number;
    height: number;
    rotation: number;
}

export interface HitRect {
    /**
     * top position
     */
    top: number;
    /**
     * left position
     */
    left: number;
    /**
     * target's width
     */
    width?: number;
    /**
     * target's height
     */
    height?: number;
}

export interface MoveableManagerInterface<T = {}, U = {}> extends MoveableInterface {
    moveables?: MoveableManagerInterface[];
    props: MoveableManagerProps<T>;
    state: MoveableManagerState<U>;
    renderState: Record<string, any>;
    rotation: number;
    scale: number[];
    controlGesto: Gesto;
    targetGesto: Gesto;
    enabledAbles: Able[];
    controlAbles: Able[];
    targetAbles: Able[];
    areaElement: HTMLElement;
    controlBox: HTMLElement,
    isUnmounted: boolean;
    useCSS(tag: string, css: string): any;
    getContainer(): HTMLElement | SVGElement;
    getRotation(): number;
    getState(): MoveableManagerState<U>;
    triggerEvent(name: string, params: IObject<any>, isManager?: boolean): any;
}

export interface MoveableGroupInterface<T = {}, U = {}> extends MoveableManagerInterface<T, U> {
    props: MoveableManagerProps<T> & { targets: Array<HTMLElement | SVGElement> };
    moveables: MoveableManagerInterface[];
    transformOrigin: string;
    renderGroupRects: GroupRect[];
    getRequestChildStyles(): string[];
}

export interface MoveableInterface {
    /**
     * Get a manager that manages the moveable's state and props.
     * @returns The Rect Info
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * const manager = moveable.getManager(); // real moveable class instance
     */
    getManager(): MoveableManagerInterface<any, any>;
    /**
     * You can get the vertex information, position and offset size information of the target based on the container.
     * @returns The Rect Info
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * const rectInfo = moveable.getRect();
     */
    getRect(): RectInfo;
    /**
     * Get the able used in MoveableManager.
     * @param ableName - able name
     */
    getAble<T extends Able>(ableName: string): T | undefined;
    /**
     * Check if the target is an element included in the moveable.
     * @param target - the target
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * window.addEventListener("click", e => {
     *     if (!moveable.isMoveableElement(e.target)) {
     *         moveable.target = e.target;
     *     }
     * });
     */
    isMoveableElement(target: Element): boolean;
    /**
     * If the location or size of the target is changed, call the `.updateRect()` method.
     * Use the `useResizeObserver` and `useMutationObserver` props to update automatically.
     *
     * If the width, height, left, and top of all elements change, update the shape of the moveable.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * window.addEventListener("resize", e => {
     *     moveable.updateRect();
     * });
     */
    updateRect(type?: "Start" | "" | "End", isTarget?: boolean, isSetState?: boolean): void;
    /**
     * If the width, height, left, and top of the only target change, update the shape of the moveable.
     * Use `.updateRect()` method
     * @deprecated
     * Use `.updateRect()` method
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.updateTarget();
     */
    updateTarget(): void;
    /**
     * Request able through a method rather than an event.
     * At the moment of execution, requestStart is executed,
     * and then request and requestEnd can be executed through Requester.
     * @see {@link DraggableRequestParam | Draggable Requester}
     * @see {@link ResizableRequestParam | Resizable Requester}
     * @see {@link ScalableRequestParam | Scalable Requester}
     * @see {@link RotatableRequestParam | Rotatable Requester}
     * @see {@link OriginDraggableOptions | OriginDraggable Requester}
     * @param ableName - ableName
     * @param params - request to be able params.
     * @param isInstant - If isInstant is true, request and requestEnd are executed immediately.
     * @returns Able Requester. If there is no request in able, nothing will work.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * // Instantly Request (requestStart - request - requestEnd)
     * moveable.request("draggable", { deltaX: 10, deltaY: 10 }, true);
     *
     * // Start move
     * const requester = moveable.request("draggable");
     * requester.request({ deltaX: 10, deltaY: 10 });
     * requester.request({ deltaX: 10, deltaY: 10 });
     * requester.request({ deltaX: 10, deltaY: 10 });
     * requester.requestEnd();
     */
    request<
        RequestParam extends AbleRequesters[Name],
        Name extends string = string,
    >(ableName: Name, params?: RequestParam, isInstant?: boolean): Requester<RequestParam>;
    /**
     * moveable is the top level that manages targets
     * `Single`: MoveableManager instance
     * `Group`: MoveableGroup instance
     * `IndividualGroup`: MoveableIndividaulGroup instance
     * Returns leaf target MoveableManagers.
     */
    getMoveables(): MoveableManagerInterface[];
    /**
     * Returns the element of the control box.
     */
    getControlBoxElement(): HTMLElement;
    /**
     * Target element to be dragged in moveable
     */
    getDragElement(): HTMLElement | SVGElement | null | undefined;
    /**
     * Remove the Moveable object and the events.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.destroy();
     */
    destroy(): void;
    /**
     * You can drag start the Moveable through the external `MouseEvent`or `TouchEvent`. (Angular: ngDragStart)
     * @param e - external `MouseEvent`or `TouchEvent`
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * document.body.addEventListener("mousedown", e => {
     *     if (!moveable.isMoveableElement(e.target)) {
     *          moveable.dragStart(e);
     *     }
     * });
     */
    dragStart(e: MouseEvent | TouchEvent, target?: EventTarget | null): void;
    /**
     * Whether the coordinates are inside Moveable
     * @param clientX - x coordinate
     * @param clientY - y coordinate
     * @returns True if the coordinate is in moveable or false
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * document.body.addEventListener("mousedown", e => {
     *     if (moveable.isInside(e.clientX, e.clientY)) {
     *          console.log("inside");
     *     }
     * });
     */
    isInside(clientX: number, clientY: number): boolean;
    /**
     * Check if the moveable state is being dragged.
     * @param ableName - If you want to check if able is dragging, specify ableName.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * // false
     * console.log(moveable.isDragging());
     *
     * moveable.on("drag", () => {
     *   // true
     *   console.log(moveable.isDragging());
     * });
     */
    isDragging(ableName?: string): boolean;
    /**
     * Hit test an element or rect on a moveable target.
     * (100% = 100)
     * @param el - element or rect to test
     * @returns Get hit test rate (rate > 0 is hitted)
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * document.body.addEventListener("mousedown", e => {
     *     if (moveable.hitTest(e.target) > 0) {
     *          console.log("hiited");
     *     }
     * });
     */
    hitTest(el: Element | HitRect): number;
    setState(state: any, callback?: () => any): any;
    /**
     * User changes target and waits for target to change.
     * @see [Storybook](../../../../storybook/?path=/story/combination-with-other-components--components-selecto)
     * @example
     * document.querySelector(".target").addEventListener("mousedown", e => {
     *   moveable.waitToChangeTarget().then(() => {
     *      moveable.dragStart(e, e.currentTarget);
     *   });
     *   moveable.target = e.currentTarget;
     * });
     */
    waitToChangeTarget(): Promise<void>;
    forceUpdate(callback?: () => any): any;
    /**
     * If the element list corresponding to the selector among the targets is changed, it is updated.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *    target: ".target",
     * });
     *
     * moveable.updateSelectors();
     */
    updateSelectors(): void;
    /**
     * Get targets set in moveable through target or targets of props.
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *    target: [targetRef, ".target", document.querySelectorAll(".target")],
     * });
     *
     * console.log(moveable.getTargets());
     */
    getTargets(): Array<HTMLElement | SVGElement>;
    /**
     * You can stop the dragging currently in progress through a method from outside.
     * @returns The Rect Info
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.stopDrag();
     */
    stopDrag(type?: "target" | "control"): void;
}

export interface ControlPose {
    virtual?: boolean;
    vertical: number;
    horizontal: number;
    pos: number[];
    sub?: boolean;
    raw?: number;
    direction?: "n" | "e" | "s" | "w" | "nw" | "ne" | "sw" | "se" | "nesw";
}


export type AnyProps<T extends IObject<any>> = Required<{ [key in keyof T]: any }>;
export type UnionToIntersection<U> =
    (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

// export type MoveableEventsProps = Parameters<Required<MoveableProps>[keyof typeof MOVEABLE_EVENTS_PROPS_MAP]>[0];
export type MoveableEvents = {
    [key in typeof MOVEABLE_EVENTS[number]]
    : Parameters<Required<MoveableProps>[`on${Capitalize<key>}`]>[0];
};

export type Writable<T> = {
    -readonly [key in keyof T]: T[key];
};

// Mapped over `Pick` so each property keeps its declaration (and doc comment) from MoveableProps.
export type MoveableProperties = {
    -readonly [key in keyof Pick<MoveableProps, typeof MOVEABLE_PROPS[number]>]?: MoveableProps[key];
};

/**
 * @category Snappable
 */
export interface SnappableRenderType {
    type: "snap" | "bounds";
    pos: number;
}

export type ExcludeParams<T extends IObject<any>>
    = ExcludeKeys<T, keyof OnEvent>;
export type ExcludeEndParams<T extends IObject<any>>
    = ExcludeKeys<ExcludeParams<T>, "lastEvent" | "isDrag" | "isDouble">;
export type DefaultProps<Name extends string, AbleObject extends Partial<Able<any, any>>>
    = AbleObject extends { props: {} } ? AbleObject["props"] : { readonly [key in Name]: BooleanConstructor; };
