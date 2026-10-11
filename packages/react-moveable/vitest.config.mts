import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";

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
            {
                plugins: [
                    storybookTest({
                        configDir: fileURLToPath(new URL("./.storybook", import.meta.url)),
                        // Every story is rendered at 1280×720, the size the previous test runner used.
                        initialGlobals: { viewport: { value: "test" } },
                    }),
                ],
                test: {
                    name: "storybook",
                    setupFiles: ["./.storybook/vitest.setup.ts"],
                    browser: {
                        enabled: true,
                        headless: true,
                        provider: playwright(),
                        instances: [{ browser: "chromium" }],
                        // addon-vitest turns failure screenshots off unless they are set explicitly.
                        // They are written to `.vitest/attachments/failure-screenshots/` under the Vitest root.
                        screenshotFailures: true,
                    },
                },
            },
        ],
    },
});
