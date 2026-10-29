// The ables that can be combined with makeMoveable. Their types are written out: inferred, they
// refer to React's types through react-moveable's entry (see test/checkTypes.mjs).
import {
    Draggable as DraggableAble,
    Resizable as ResizableAble,
    Scalable as ScalableAble,
    Rotatable as RotatableAble,
    Warpable as WarpableAble,
    Clippable as ClippableAble,
    EdgeDraggable as EdgeDraggableAble,
    Snappable as SnappableAble,
    Roundable as RoundableAble,
    Pinchable as PinchableAble,
} from "@moveable-next/react";
import {
    Able,
    DraggableProps,
    ResizableProps,
    ScalableProps,
    RotatableProps,
    WarpableProps,
    ClippableProps,
    SnappableProps,
    RoundableProps,
    PinchableProps,
} from "@moveable-next/react/types";

/**
 * The able of {@link DraggableOptions}, for {@link makeMoveable}.
 * @category Draggable
 */
export const Draggable: Able<DraggableProps> = DraggableAble;
/**
 * The able of {@link ResizableOptions}, for {@link makeMoveable}.
 * @category Resizable
 */
export const Resizable: Able<ResizableProps> = ResizableAble;
/**
 * The able of {@link ScalableOptions}, for {@link makeMoveable}.
 * @category Scalable
 */
export const Scalable: Able<ScalableProps> = ScalableAble;
/**
 * The able of {@link RotatableOptions}, for {@link makeMoveable}.
 * @category Rotatable
 */
export const Rotatable: Able<RotatableProps> = RotatableAble;
/**
 * The able of {@link WarpableOptions}, for {@link makeMoveable}.
 * @category Warpable
 */
export const Warpable: Able<WarpableProps> = WarpableAble;
/**
 * The able of {@link ClippableOptions}, for {@link makeMoveable}.
 * @category Clippable
 */
export const Clippable: Able<ClippableProps> = ClippableAble;
/**
 * The able of {@link DraggableOptions.edgeDraggable}, for {@link makeMoveable}. Combine it with {@link Draggable}.
 * @category Draggable
 */
export const EdgeDraggable: Able<DraggableProps> = EdgeDraggableAble;
/**
 * The able of {@link SnappableOptions}, for {@link makeMoveable}.
 * @category Snappable
 */
export const Snappable: Able<SnappableProps> = SnappableAble;
/**
 * The able of {@link RoundableOptions}, for {@link makeMoveable}.
 * @category Roundable
 */
export const Roundable: Able<RoundableProps> = RoundableAble;
/**
 * The able of {@link PinchableOptions}, for {@link makeMoveable}.
 * @category Pinchable
 */
export const Pinchable: Able<PinchableProps> = PinchableAble;
