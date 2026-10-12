import path from "node:path";
import { defineConfig, type UserConfig } from "tsdown";
import { sharedOptions } from "../../config/build.mjs";

const shared = sharedOptions(import.meta.dirname);

// ESM / CJS: dependencies stay external; React imports are renamed to croact and
// react-moveable to its croact build, croact-moveable.
const library: UserConfig = {
    ...shared,
    deps: {
        // Types-only subpath (`export * from "react-moveable/types"`): its runtime entry is
        // an empty file, so bundling it drops the re-export instead of importing a stub.
        alwaysBundle: ["react-moveable/types"],
        neverBundle: ["react"],
        onlyBundle: [],
    },
};
const paths = {
    "react": "croact",
    "react-moveable": "croact-moveable",
};
// UMD: self-contained, with croact in place of React. The bundled react-moveable build
// imports react from its own location, where croact is not installed, so the alias
// points at this package's croact.
const croact = path.join(import.meta.dirname, "node_modules/croact");
const umd: UserConfig = {
    ...shared,
    entry: "src/index.umd.ts",
    format: "umd",
    globalName: "Moveable",
    // Runs in browsers: resolve browser builds, not the `node` export conditions.
    platform: "browser",
    alias: {
        "react": croact,
        "react-dom": croact,
    },
    deps: { alwaysBundle: [/./], onlyBundle: false },
};

export default defineConfig([
    {
        ...library,
        entry: "src/index.ts",
        format: "esm",
        outputOptions: { entryFileNames: "moveable.esm.js", paths },
    },
    {
        ...library,
        entry: "src/index.umd.ts",
        format: "cjs",
        outputOptions: { entryFileNames: "moveable.cjs.js", exports: "default", paths },
    },
    {
        ...umd,
        outputOptions: { entryFileNames: "moveable.js", exports: "default" },
    },
    {
        ...umd,
        minify: true,
        outputOptions: { entryFileNames: "moveable.min.js", exports: "default" },
    },
]);
