import Moveable from "react-moveable";
import { PreactMoveableInterface } from "./types";

export default Moveable as any as new (...args: any[]) => PreactMoveableInterface;
