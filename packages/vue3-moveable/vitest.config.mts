import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";

// Browser tests against the built output (dist), so build the packages first.
export default defineConfig({
    test: {
        name: "vue3-moveable",
        include: ["test/**/*.spec.ts"],
        browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
        },
    },
});
