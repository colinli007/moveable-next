import { defineConfig, type UserConfig } from "tsdown";
import { sharedOptions } from "../../config/build.mjs";

const shared = sharedOptions(import.meta.dirname);

const library: UserConfig = {
    ...shared,
    entry: "src/index.ts",
    deps: {
        // lit is not declared as a dependency yet; it becomes a peerDependency
        // with the Lit 3 upgrade (ROADMAP step 4).
        neverBundle: [/^lit(\/|$)/],
        onlyBundle: [],
    },
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
    {
        ...shared,
        entry: "src/index.ts",
        format: "umd",
        globalName: "UMD",
        // Runs in browsers: resolve browser builds, not the `node` (SSR) export conditions.
        platform: "browser",
        deps: { alwaysBundle: [/./], onlyBundle: false },
        outputOptions: { entryFileNames: "moveable.umd.js", exports: "named" },
    },
]);
