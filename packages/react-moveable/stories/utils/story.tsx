import * as React from "react";
import type { StoryObj } from "@storybook/react-vite";
import type { Preview } from "../../.storybook/addons/code-preview/render";

import { convertReactTemplate, convertPath, makeArgs, convertTemplate } from "../utils";
import { DEFAULT_CSS_TEMPLATE } from "../templates/default";

type AppComponent = React.ComponentType<any>;
type Play = NonNullable<StoryObj["play"]>;

/**
 * The code croffle generates next to each App (`pnpm bake`).
 * croffle does not generate every framework for every story, so a missing file only skips its tab.
 */
const GENERATED_TABS: Array<Omit<Preview, "template"> & { path: string; raw?: boolean }> = [
    { path: "script/$name/App.html", tab: "Script", description: "HTML", language: "html", raw: true },
    { path: "script/$name/App.js", tab: "Script", description: "JavaScript", language: "tsx" },
    { path: "vue3/$name/App.vue", tab: "Vue3", language: "html" },
    { path: "svelte/$name/App.svelte", tab: "Svelte", language: "html" },
    { path: "lit/$name/App.ts", tab: "Lit", language: "tsx" },
];

export interface AppStoryOptions {
    /**
     * `import.meta.glob("./*App.tsx", { eager: true })` of the story file's own directory.
     * Used to find the file of `App`.
     */
    apps: Record<string, unknown>;
    /**
     * `import.meta.glob("./{*App.tsx,script/**,vue3/**,svelte/**,lit/**}", { query: "?raw", import: "default", eager: true })`
     * of the story file's own directory: the React source and the code croffle generated from it.
     */
    sources: Record<string, string>;
    argTypes?: Record<string, any>;
    args?: Record<string, any>;
}

/**
 * Builds `render`, `args`, `argTypes` and the code tabs (`parameters.preview`) of a story that renders `App`.
 */
export function appStory(App: AppComponent, { apps, sources, argTypes = {}, args }: AppStoryOptions) {
    const file = Object.keys(apps).find(path => (apps[path] as { default?: unknown }).default === App);
    const reactCode = file && sources[file];

    if (!reactCode) {
        throw new Error(`Cannot find the source of ${App.displayName || App.name} in the story's directory.`);
    }
    const name = file.replace(/^\.\/(.+)\.tsx$/, "$1");
    const generated = (path: string) => sources[`./${path.replace("$name", name)}`];
    const previews: Preview[] = [
        {
            tab: "React",
            template: convertReactTemplate(convertPath(reactCode)),
            copy: true,
            language: "tsx",
        },
        {
            tab: "CSS",
            template: DEFAULT_CSS_TEMPLATE,
            copy: true,
            language: "css",
        },
    ];
    GENERATED_TABS.forEach(({ path, raw, ...preview }) => {
        const code = generated(path);

        if (code) {
            previews.push({
                ...preview,
                template: raw ? code : convertTemplate(code, /"\$preview_([^"]+)"/g),
                copy: true,
            });
        }
    });

    return {
        render: (props: Record<string, any>) => <App {...props} />,
        argTypes,
        args: {
            ...makeArgs(argTypes),
            ...args,
        },
        parameters: {
            preview: previews,
        },
    } satisfies StoryObj;
}

/**
 * Plays run in development and in tests, but not in the published Storybook.
 */
export function devPlay(play: Play): Play | undefined {
    return import.meta.env.MODE === "production" ? undefined : play;
}
