import { MoveableProps, Able } from "./types";
import { MOVEABLE_ABLES } from "./ables/consts";
import { InitialMoveable } from "./InitialMoveable";

export default class Moveable<T = {}> extends InitialMoveable<MoveableProps & T> {
    // A getter, not a static field: static fields are emitted as `static {}` blocks, which
    // bundlers keep as side effects, so the class and every able could not be tree-shaken.
    public static get defaultAbles(): Able[] {
        return MOVEABLE_ABLES as any;
    }
}
