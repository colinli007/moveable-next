import { Able } from "@moveable-next/react/types";
import MoveableManager from "./MoveableManager";
import { MadeMoveableClass } from "./types";

/**
 * Makes a Moveable class with only the given ables (and those every Moveable has), so that
 * bundlers can leave the other ables out. The class is used like the default {@link Moveable}.
 *
 * @param ables - the ables, such as {@link Draggable} and {@link Resizable}
 * @returns the Moveable class; `T` is the props of the ables, which type its options and events
 * @example
 * import { makeMoveable, Draggable, Resizable, DraggableProps, ResizableProps } from "@moveable-next/vanilla";
 *
 * const DragResize = makeMoveable<DraggableProps & ResizableProps>([Draggable, Resizable]);
 * const moveable = new DragResize(document.body, {
 *     target: document.querySelector(".target"),
 *     draggable: true,
 *     resizable: true,
 * });
 *
 * moveable.on("drag", e => {
 *     e.target.style.transform = e.transform;
 * });
 * @see [Storybook](../../../../storybook/?path=/story/support-tree-shaking--tree-shaking)
 */
export function makeMoveable<T extends Record<string, any> = {}>(ables: Array<Able<T>>): MadeMoveableClass<T> {
    return class Moveable extends MoveableManager {
        protected static get ables(): readonly Able<any>[] {
            return ables;
        }
    } as unknown as MadeMoveableClass<T>;
}
