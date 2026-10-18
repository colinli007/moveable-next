import MoveableManager from "./MoveableManager";

/**
 * Moveable is Draggable! Resizable! Scalable! Rotatable!
 *
 * Options are passed to the constructor and can be changed later as properties:
 * `new Moveable(container, { draggable: true })`, then `moveable.draggable = false`.
 *
 * Events are listened to with {@link on}: `moveable.on("drag", e => { ... })`.
 * Each event is documented on the `on` + event name member of {@link MoveableProps},
 * such as {@link DraggableEvents.onDrag | onDrag} for `drag`.
 */
export default class Moveable extends MoveableManager {}
