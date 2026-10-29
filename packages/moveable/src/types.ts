import {
    DefaultAbleProps,
    MoveableDefaultProps,
    MoveableEvents,
    MoveableInterface,
} from "@moveable-next/react/types";
import EventEmitter from "@scena/event-emitter";
import type Moveable from "./Moveable";

export interface WithEventStop {
    stop: () => any;
}
export type MoveableEventsParameters = {
    [key in keyof MoveableEvents]: MoveableEvents[key] & WithEventStop;
};

/**
 * The options in the props `Props` of ables: the props that are not events (`on` + event name).
 */
export type MoveableOptionsOf<Props> = {
    [key in keyof Props as key extends `on${Capitalize<string>}` ? never : key]?: Props[key];
};

/**
 * The event parameters in the props `Props` of ables, by event name: `onDragStart` becomes `dragStart`.
 */
export type MoveableEventsOf<Props> = {
    [key in keyof Props as key extends `on${infer Name extends Capitalize<string>}` ? Uncapitalize<Name> : never]-?:
    Parameters<Extract<Props[key], (...args: any[]) => any>>[0];
};

/**
 * The props of a Moveable made by {@link makeMoveable} whose ables have the props `T`:
 * `T` and the props every Moveable has.
 */
export type MadeMoveableProps<T> = MoveableDefaultProps & DefaultAbleProps & T;

/**
 * An instance of a class made by {@link makeMoveable}, whose ables have the props `T`.
 * Besides those of `T`, it has the options and events every Moveable has.
 */
export type MadeMoveable<T, Props = MadeMoveableProps<T>>
    = MoveableOptionsOf<Props>
    // Declared below with the options of `Props`, not `any`
    & Omit<MoveableInterface, "setState" | "forceUpdate">
    & EventEmitter<{ [key in keyof MoveableEventsOf<Props>]: MoveableEventsOf<Props>[key] & WithEventStop }>
    & {
        /**
         * Sets several options at once. `callback` is called after the change is applied.
         */
        setState(state: MoveableOptionsOf<Props>, callback?: () => any): void;
        /**
         * Renders Moveable again. `callback` is called after rendering.
         */
        forceUpdate(callback?: () => any): void;
    };

/**
 * A class made by {@link makeMoveable}, whose ables have the props `T`.
 */
export type MadeMoveableClass<T>
    = Pick<typeof Moveable, "getAbleInfo">
    & (new (
        parentElement: HTMLElement,
        options?: MoveableOptionsOf<MadeMoveableProps<T>>,
    ) => MadeMoveable<T>);

export * from "@moveable-next/react/types";
