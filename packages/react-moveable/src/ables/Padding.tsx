import { prefix, makeMatrixCSS, getPaddingBox } from "../utils";
import { Renderer, MoveableManagerInterface } from "../types";
import { createWarpMatrix } from "@scena/matrix";
import { makeAble } from "./AbleManager";

export default makeAble("padding", {
    props: ["padding"] as const,
    render(moveable: MoveableManagerInterface, React: Renderer): any[] {
        const props = moveable.props;
        if (props.dragArea) {
            return [];
        }
        const {
            left,
            top,
            right,
            bottom,
        } = getPaddingBox(props.padding || {});
        const {
            renderPoses,
            pos1,
            pos2,
            pos3,
            pos4,
        } = moveable.getState();

        const poses = [pos1, pos2, pos3, pos4];
        const paddingDirections: number[][] = [];

        if (left > 0) {
            paddingDirections.push([0, 2]);
        }
        if (top > 0) {
            paddingDirections.push([0, 1]);
        }
        if (right > 0) {
            paddingDirections.push([1, 3]);
        }
        if (bottom > 0) {
            paddingDirections.push([2, 3]);
        }
        return paddingDirections.map(([dir1, dir2], i) => {
            const paddingPos1 = poses[dir1];
            const paddingPos2 = poses[dir2];
            const paddingPos3 = renderPoses[dir1];
            const paddingPos4 = renderPoses[dir2];

            const h = createWarpMatrix(
                [0, 0],
                [100, 0],
                [0, 100],
                [100, 100],
                paddingPos1,
                paddingPos2,
                paddingPos3,
                paddingPos4,
            );
            if (!h.length) {
                return undefined;
            }
            return (<div key={`padding${i}`} className={prefix("padding")} style={{
                transform: makeMatrixCSS(h, true),
            }}></div>);
        });
    },
});
