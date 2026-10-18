import { prefix, getControlTransform, calculatePosition, convertTransformOriginArray } from "../utils";
import { Renderer, OriginOptions, MoveableManagerInterface } from "../types";
import { makeAble } from "./AbleManager";
import { minus } from "@scena/matrix";

export default makeAble("origin", {
    props: ["origin", "svgOrigin"] as const,
    render(moveable: MoveableManagerInterface<OriginOptions>, React: Renderer): any[] {
        const { zoom, svgOrigin, groupable } = moveable.props;
        const {
            beforeOrigin, rotation, svg, allMatrix, is3d,
            left, top, offsetWidth, offsetHeight,
        } = moveable.getState();

        let originStyle!: Record<string, any>;

        if (!groupable && svg && svgOrigin) {
            const [originX, originY] = convertTransformOriginArray(svgOrigin, offsetWidth, offsetHeight);
            const n = is3d ? 4 : 3;
            const result = calculatePosition(
                allMatrix,
                [originX, originY],
                n,
            );
            originStyle = getControlTransform(rotation, zoom!, minus(result, [left, top]));
        } else {
            originStyle = getControlTransform(rotation, zoom!, beforeOrigin);
        }
        return [
            <div className={prefix("control", "origin")} style={originStyle} key="beforeOrigin"></div>,
        ];
    },
});
