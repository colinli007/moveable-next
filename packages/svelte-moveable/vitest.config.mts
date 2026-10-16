import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { playwright } from "@vitest/browser-playwright";

// Tests against the built output (dist), so build the packages first.
// The plugin compiles dist's .svelte files the way a consumer's bundler does.
export default defineConfig({
    plugins: [svelte({ configFile: false })],
    test: {
        projects: [
            {
                extends: true,
                test: {
                    name: "browser",
                    include: ["test/**/*.spec.ts"],
                    exclude: ["test/**/*.ssr.spec.ts"],
                    browser: {
                        enabled: true,
                        headless: true,
                        provider: playwright(),
                        instances: [{ browser: "chromium" }],
                    },
                },
            },
            {
                extends: true,
                test: {
                    // Node environment: the plugin compiles the server version of the component.
                    name: "ssr",
                    include: ["test/**/*.ssr.spec.ts"],
                    environment: "node",
                },
            },
        ],
    },
});
