import { defineConfig, type UserConfig } from "tsdown";
import { sharedOptions } from "../../config/build.mjs";

const library: UserConfig = {
    ...sharedOptions(import.meta.dirname),
    entry: "src/index.ts",
    deps: { onlyBundle: [] },
};

export default defineConfig([
    {
        ...library,
        format: "esm",
        outputOptions: { entryFileNames: "moveable.esm.js" },
    },
    {
        ...library,
        format: "cjs",
        outputOptions: { entryFileNames: "moveable.cjs.js", exports: "named" },
    },
]);
