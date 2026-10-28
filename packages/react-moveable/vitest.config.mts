import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";

// Every story renders and plays once per framework (the `framework` global, see .storybook/preview.tsx).
function storybookProject(framework: "react" | "vue") {
    return {
        plugins: [
            storybookTest({
                configDir: fileURLToPath(new URL("./.storybook", import.meta.url)),
                // Every story is rendered at 1280×720, the size the previous test runner used.
                initialGlobals: { viewport: { value: "test" }, framework },
                // `react-only`: stories without a Vue version. `vue-known-issue`: known failures in Vue, reported as skipped.
                tags: framework === "vue" ? { exclude: ["react-only"], skip: ["vue-known-issue"] } : undefined,
            }),
        ],
        test: {
            name: `storybook-${framework}`,
            setupFiles: ["./.storybook/vitest.setup.ts"],
            // The directory of the project's failure screenshots (.storybook/vitest.setup.ts)
            provide: { storybookProject: `storybook-${framework}` },
            browser: {
                enabled: true,
                headless: true,
                provider: playwright(),
                instances: [{ browser: "chromium" as const }],
                // Taken by .storybook/vitest.setup.ts, under `.vitest/attachments/failure-screenshots/<project>/`.
                screenshotFailures: false,
            },
        },
    };
}

export default defineConfig({
    test: {
        projects: [
            {
                test: {
                    name: "unit",
                    include: [".storybook/**/*.test.ts"],
                    environment: "node",
                },
            },
            storybookProject("react"),
            storybookProject("vue"),
        ],
    },
});
