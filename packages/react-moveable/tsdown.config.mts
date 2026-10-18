import { defineConfig, type UserConfig } from "tsdown";
import { sharedOptions } from "../../config/build.mjs";

const common: UserConfig = {
    ...sharedOptions(import.meta.dirname),
    // `jsx: react`: croact-moveable replaces the `react` module with croact, which has no jsx-runtime.
    tsconfig: "tsconfig.build.json",
    deps: { onlyBundle: [] },
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
