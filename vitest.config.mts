import { defineConfig } from "vitest/config";

// Each package declares its own Vitest projects.
export default defineConfig({
    test: {
        projects: ["packages/*/vitest.config.mts"],
    },
});
