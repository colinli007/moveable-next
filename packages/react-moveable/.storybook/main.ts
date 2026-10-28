import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";
import { mergeConfig } from "vite";
import "./readme.ts";

const config: StorybookConfig = {
    framework: "@storybook/react-vite",
    stories: [
        "../stories/**/*.mdx",
        "../stories/**/*.stories.@(ts|tsx)",
    ],
    addons: [
        "@storybook/addon-docs",
        "@storybook/addon-vitest",
        "storybook-dark-mode",
        // The code tabs (React / CSS) of `parameters.preview`.
        fileURLToPath(import.meta.resolve("./addons/code-preview/preset.ts")),
    ],
    tags: {
        // Stories that only exist for tests: hidden in the sidebar by default, still tested.
        "hidden-test": { defaultFilterSelection: "exclude" },
    },
    core: {
        disableTelemetry: true,
        disableWhatsNewNotifications: true,
    },
    // This Storybook is the library's demo, not a project being set up: hide Storybook's onboarding checklist.
    features: {
        sidebarOnboardingChecklist: false,
        menuOnboardingChecklist: false,
    },
    typescript: {
        // The story apps only take `Record<string, any>` props, so docgen has nothing to show.
        reactDocgen: false,
    },
    viteFinal: config => mergeConfig(config, {
        // The react-vite framework expects the project to bring the React plugin; the Vue examples (`*App.vue`) need Vue's.
        plugins: [
            react(),
            // `<custom-element>` in the 99-Tests examples is a native custom element, not a Vue component.
            vue({ template: { compilerOptions: { isCustomElement: tag => tag === "custom-element" } } }),
        ],
        // `@/stories`, `@/react-moveable`, `@/vue3-moveable` and `@moveable-next/helper` come from the `paths` of tsconfig.json.
        resolve: { tsconfigPaths: true },
    }),
};

export default config;
