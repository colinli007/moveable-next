import { defineConfig, type UserConfig } from "tsdown";
import { sharedOptions } from "../../config/build.mjs";

// Bundles react-moveable's ESM build and renames its React imports to preact/compat.
// The renamed modules stay external, so this is an output rename, not an alias.
const common: UserConfig = {
    ...sharedOptions(import.meta.dirname),
    entry: "src/preact-moveable/Moveable.ts",
    deps: {
        alwaysBundle: ["react-moveable"],
        // preact is not declared as a dependency yet; it becomes a peerDependency
        // once the published ranges are decided (ROADMAP step 6).
        neverBundle: ["react", "react-dom", "react-css-styled", "preact"],
        onlyBundle: [],
    },
    inputOptions: {
        // CJS builds resolve with node main fields first; bundle react-moveable's ESM build.
        resolve: { mainFields: ["module", "main"] },
    },
};
const paths = {
    "react": "preact/compat",
    "react-dom": "preact/compat",
    "react-css-styled": "preact-css-styled",
};

export default defineConfig([
    {
        ...common,
        format: "esm",
        outputOptions: { entryFileNames: "moveable.esm.js", paths },
    },
    {
        ...common,
        format: "cjs",
        outputOptions: { entryFileNames: "moveable.cjs.js", exports: "default", paths },
    },
]);
