import {
    prefix, triggerEvent,
    fillParams, calculatePoses, getRect, fillEndParams, convertCSSSize, fillCSSObject,
} from "../utils";
import {
    OnDragOriginStart, OnDragOrigin,
    OnDragOriginEnd, MoveableManagerInterface, DraggableProps, OriginDraggableProps, MoveableGroupInterface,
} from "../types";
import { hasClass, IObject } from "@daybrush/utils";
import { setDragStart, getDragDist, getNextMatrix } from "../gesto/GestoUtils";
import { minus, plus } from "@scena/matrix";
import Draggable from "./Draggable";
import CustomGesto, { setCustomDrag } from "../gesto/CustomGesto";

export default {
    name: "originDraggable",
    props: [
        "originDraggable",
        "originRelative",
    ] as const,
    events: [
        "dragOriginStart",
        "dragOrigin",
        "dragOriginEnd",
    ] as const,
    css: [
        `:host[data-able-origindraggable] .control.origin {
pointer-events: auto;
}`,
    ],
    dragControlCondition(_: any, e: any) {
        if (e.isRequest) {
            return e.requestAble === "originDraggable";
        }
        return hasClass(e.inputEvent.target, prefix("origin"));
    },
    dragControlStart(moveable: MoveableManagerInterface<OriginDraggableProps & DraggableProps>, e: any) {
        const { datas } = e;

        setDragStart(moveable, e);

        const params = fillParams<OnDragOriginStart>(moveable, e, {
            dragStart: Draggable.dragStart(
                moveable,
                new CustomGesto().dragStart([0, 0], e),
            ),
        });
        const result = triggerEvent(moveable, "onDragOriginStart", params);

        datas.startOrigin = moveable.state.transformOrigin;
        datas.startTargetOrigin = moveable.state.targetOrigin;
        datas.prevOrigin = [0, 0];
        datas.isDragOrigin = true;

        if (result === false) {
            datas.isDragOrigin = false;
            return false;
        }

        return params;
    },
    dragControl(moveable: MoveableManagerInterface<OriginDraggableProps & DraggableProps>, e: any) {
        const { datas, isPinch, isRequest } = e;

        if (!datas.isDragOrigin) {
            return false;
        }
        const [distX, distY] = getDragDist(e);
        const state = moveable.state;
        const {
            width,
            height,
            offsetMatrix,
            targetMatrix,
            is3d,
        } = state;
        const {
            originRelative = true,
        } = moveable.props;
        const n = is3d ? 4 : 3;
        let dist = [distX, distY];

        if (isRequest) {
            const distOrigin = e.distOrigin;
            if (distOrigin[0] || distOrigin[1]) {
                dist = distOrigin;
            }
        }
        const origin = plus(datas.startOrigin, dist);
        const targetOrigin = plus(datas.startTargetOrigin, dist);
        const delta = minus(dist, datas.prevOrigin);

        const nextMatrix = getNextMatrix(
            offsetMatrix,
            targetMatrix,
            origin,
            n,
        );

        const rect = moveable.getRect();
        const nextRect = getRect(calculatePoses(nextMatrix, width, height, n));

        const dragDelta = [
            rect.left - nextRect.left,
            rect.top - nextRect.top,
        ];

        datas.prevOrigin = dist;
        const transformOrigin = [
            convertCSSSize(targetOrigin[0], width, originRelative),
            convertCSSSize(targetOrigin[1], height, originRelative),
        ].join(" ");
        const result = Draggable.drag(
            moveable,
            setCustomDrag(e, moveable.state, dragDelta, !!isPinch, false),
        )!;
        const params = fillParams<OnDragOrigin>(moveable, e, {
            width,
            height,
            origin,
            dist,
            delta,
            transformOrigin,
            drag: result,
            ...fillCSSObject({
                transformOrigin,
                transform: result.transform,
            }, e),
            afterTransform: result.transform,
        });
        triggerEvent(moveable, "onDragOrigin", params);
        return params;
    },
    dragControlEnd(moveable: MoveableManagerInterface<OriginDraggableProps>, e: any) {
        const { datas } = e;

        if (!datas.isDragOrigin) {
            return false;
        }
        triggerEvent(moveable, "onDragOriginEnd",
            fillEndParams<OnDragOriginEnd>(moveable, e, {}));
        return true;
    },
    dragGroupControlCondition(moveable: any, e: any) {
        return this.dragControlCondition(moveable, e);
    },
    dragGroupControlStart(moveable: MoveableGroupInterface<OriginDraggableProps>, e: any) {
        const params = this.dragControlStart(moveable, e);

        if (!params) {
            return false;
        }

        return true;
    },
    dragGroupControl(moveable: MoveableGroupInterface<OriginDraggableProps>, e: any) {
        const params = this.dragControl(moveable, e);

        if (!params) {
            return false;
        }
        moveable.transformOrigin = params.transformOrigin;

        return true;
    },
    request(moveable: MoveableManagerInterface<any, any>) {
        const datas = {};
        const rect = moveable.getRect();
        let distX = 0;
        let distY = 0;

        const transformOrigin = rect.transformOrigin;
        const distOrigin = [0, 0];

        return {
            isControl: true,
            requestStart() {
                return { datas };
            },
            request(e: IObject<any>) {
                if ("deltaOrigin" in e) {
                    distOrigin[0] += e.deltaOrigin[0];
                    distOrigin[1] += e.deltaOrigin[1];
                } else if ("origin" in e) {
                    distOrigin[0] = e.origin[0] - transformOrigin[0];
                    distOrigin[1] = e.origin[1] - transformOrigin[1];
                } else {
                    if ("x" in e) {
                        distX = e.x - rect.left;
                    } else if ("deltaX" in e) {
                        distX += e.deltaX;
                    }
                    if ("y" in e) {
                        distY = e.y - rect.top;
                    } else if ("deltaY" in e) {
                        distY += e.deltaY;
                    }
                }

                return { datas, distX, distY, distOrigin };
            },
            requestEnd() {
                return { datas, isDrag: true };
            },
        };
    },
};
