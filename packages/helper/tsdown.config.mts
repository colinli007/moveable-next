import { defineConfig, type UserConfig } from "tsdown";
import { sharedOptions } from "../../config/build.mjs";

const common: UserConfig = sharedOptions(import.meta.dirname);
// ESM / CJS keep every dependency external; nothing from node_modules may be bundled.
const library: UserConfig = {
    ...common,
    deps: { onlyBundle: [] },
};
// The UMD bundle is self-contained.
const umd: UserConfig = {
    ...common,
    entry: "src/index.umd.ts",
    format: "umd",
    globalName: "MoveableHelper",
    // Runs in browsers: resolve browser builds, not the `node` export conditions.
    platform: "browser",
    deps: { alwaysBundle: [/./], onlyBundle: false },
};

export default defineConfig([
    {
        ...library,
        entry: "src/index.ts",
        format: "esm",
        outputOptions: { entryFileNames: "helper.esm.js" },
    },
    {
        ...library,
        entry: "src/index.umd.ts",
        format: "cjs",
        outputOptions: { entryFileNames: "helper.cjs.js", exports: "default" },
    },
    {
        ...umd,
        outputOptions: { entryFileNames: "helper.js", exports: "default" },
    },
    {
        ...umd,
        minify: true,
        outputOptions: { entryFileNames: "helper.min.js", exports: "default" },
    },
]);
