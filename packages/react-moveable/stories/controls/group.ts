import { makeArgType, makeLink, makeTypeLink } from "../utils";

export const DEFAULT_GROUPPABLE_GROUP_CONTROLS = {
    hideChildMoveableDefaultLines: makeArgType({
        type: "boolean",
        description: makeLink("hideChildMoveableDefaultLines"),
        defaultValue: false,
    }),
};
export const DEFAULT_RESIZABLE_GROUP_CONTROLS = {
    maxWidth: makeArgType({
        type: "number",
        description: makeTypeLink("OnResizeStart", "setMax"),
        defaultValue: 0,
    }),
    maxHeight: makeArgType({
        type: "number",
        description: makeTypeLink("OnResizeStart", "setMax"),
        defaultValue: 0,
    }),
    minWidth: makeArgType({
        type: "number",
        description: makeTypeLink("OnResizeStart", "setMin"),
        defaultValue: 0,
    }),
    minHeight: makeArgType({
        type: "number",
        description: makeTypeLink("OnResizeStart", "setMin"),
        defaultValue: 0,
    }),
    keepRatio: makeArgType({
        type: "boolean",
        description: makeLink("keepRatio"),
        defaultValue: true,
    }),
};

export const DEFAULT_SCALABLE_GROUP_CONTROLS = {
    keepRatio: makeArgType({
        type: "boolean",
        description: makeLink("keepRatio"),
        defaultValue: true,
    }),
};
