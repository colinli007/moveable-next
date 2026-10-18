import { defineConfig, type UserConfig } from "tsdown";
import { sharedOptions } from "../../config/build.mjs";

// Bundles @moveable-next/react's ESM build and renames its React imports to croact.
// The renamed modules stay external, so this is an output rename, not an alias.
const common: UserConfig = {
    ...sharedOptions(import.meta.dirname),
    deps: {
        alwaysBundle: ["@moveable-next/react"],
        neverBundle: ["react", "react-dom", "react-css-styled"],
        onlyBundle: [],
    },
    inputOptions: {
        // CJS builds resolve with node main fields first; bundle react-moveable's ESM build.
        resolve: { mainFields: ["module", "main"] },
    },
};
const paths = {
    "react": "croact",
    "react-dom": "croact",
    "react-css-styled": "croact-css-styled",
};

export default defineConfig([
    {
        ...common,
        entry: "src/index.ts",
        format: "esm",
        outputOptions: { entryFileNames: "moveable.esm.js", paths },
    },
    {
        ...common,
        entry: "src/index.umd.ts",
        format: "cjs",
        outputOptions: { entryFileNames: "moveable.cjs.js", exports: "default", paths },
    },
]);
