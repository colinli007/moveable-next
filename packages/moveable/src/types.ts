import {
    MoveableEvents,
} from "@moveable-next/react/types";

export interface WithEventStop {
    stop: () => any;
}
export type MoveableEventsParameters = {
    [key in keyof MoveableEvents]: MoveableEvents[key] & WithEventStop;
};
export * from "@moveable-next/react/types";
