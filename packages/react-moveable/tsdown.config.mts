import { defineConfig, type UserConfig } from "tsdown";
import { sharedOptions } from "../../config/build.mjs";

const common: UserConfig = {
    ...sharedOptions(import.meta.dirname),
    // `jsx: react`: croact / preact-moveable replace the `react` module, and croact has no jsx-runtime.
    tsconfig: "tsconfig.build.json",
    deps: {
        // React is not declared as a dependency yet; it becomes a peerDependency
        // once the published React range is decided (ROADMAP step 6).
        neverBundle: ["react", "react-dom"],
        onlyBundle: [],
    },
};

export default defineConfig([
    {
        ...common,
        entry: "src/index.ts",
        format: "esm",
        outputOptions: { entryFileNames: "moveable.esm.js" },
    },
    {
        ...common,
        entry: "src/index.umd.ts",
        format: "cjs",
        outputOptions: { entryFileNames: "moveable.cjs.js", exports: "default" },
    },
]);
