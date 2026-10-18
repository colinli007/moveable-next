/**
 * @packageDocumentation
 *
 * @categoryDescription Clickable
 * Whether to trigger the `click` and `clickGroup` events when the target or the group is clicked.
 *
 * @categoryDescription Clippable
 * Whether to clip the target.
 *
 * @categoryDescription Core
 * The options, events and types of Moveable itself, shared by all ables.
 *
 * @categoryDescription Draggable
 * Draggable refers to the ability to drag and move targets.
 *
 * @categoryDescription Group
 * You can make targets moveable.
 *
 * @categoryDescription IndividualGroup
 * Create targets individually, not as a group.
 *
 * @categoryDescription OriginDraggable
 * Whether to drag origin (default: false)
 *
 * @categoryDescription Pinchable
 * Whether or not target can be pinched with draggable, resizable, scalable, rotatable (default: false)
 *
 * @categoryDescription Resizable
 * Resizable indicates whether the target's width and height can be increased or decreased.
 *
 * @categoryDescription Rotatable
 * Rotatable indicates whether the target can be rotated.
 *
 * @categoryDescription Roundable
 * Whether to show and drag or double click border-radius
 *
 * @categoryDescription Scalable
 * Scalable indicates whether the target's x and y can be scale of transform.
 *
 * @categoryDescription Scrollable
 * Whether or not target can be scrolled to the scroll container (default: false)
 *
 * @categoryDescription Snappable
 * Whether or not target can be snapped to the guideline. (default: false)
 *
 * @categoryDescription Warpable
 * Warpable indicates whether the target can be warped(distorted, bented).
 */
export { default as Moveable } from "../../packages/moveable/src";
export * from "../../packages/moveable/src";
