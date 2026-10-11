import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        name: "helper",
        environment: "happy-dom",
        include: ["test/**/*.spec.ts"],
    },
});
