import * as React from "react";
import type { StoryObj } from "@storybook/react-vite";
import type { Preview } from "../../.storybook/addons/code-preview/render";

import { convertReactTemplate, makeArgs } from "../utils";
import { DEFAULT_CSS_TEMPLATE } from "../templates/default";

type AppComponent = React.ComponentType<any>;
type Play = NonNullable<StoryObj["play"]>;

export interface AppStoryOptions {
    /**
     * `import.meta.glob("./*App.tsx", { eager: true })` of the story file's own directory.
     * Used to find the file of `App`.
     */
    apps: Record<string, unknown>;
    /**
     * `import.meta.glob("./{*App.tsx,*.css}", { query: "?raw", import: "default", eager: true })`
     * of the story file's own directory: the source of the Apps and the style files they import.
     */
    sources: Record<string, string>;
    argTypes?: Record<string, any>;
    args?: Record<string, any>;
}

/**
 * Builds `render`, `args`, `argTypes` and the code tabs (`parameters.preview`) of a story that renders `App`.
 * The React tab is the App's own source, the CSS tab the default styles plus the style files the App imports.
 */
export function appStory(App: AppComponent, { apps, sources, argTypes = {}, args }: AppStoryOptions) {
    const file = Object.keys(apps).find(path => (apps[path] as { default?: unknown }).default === App);
    const reactCode = file && sources[file];

    if (!reactCode) {
        throw new Error(`Cannot find the source of ${App.displayName || App.name} in the story's directory.`);
    }
    // e.g. `import "./snap.css";`, in either quotes, with or without the semicolon
    const styles: Preview[] = Array.from(reactCode.matchAll(/^import\s+["'](\.\/[^"']+\.css)["'];?$/gm), ([, path]) => {
        const css = sources[path];

        if (css === undefined) {
            throw new Error(`Cannot find ${path} imported by ${file} in the story's sources.`);
        }
        return { tab: "CSS", description: path.slice(2), template: css, copy: true, language: "css" };
    });
    const previews: Preview[] = [
        {
            tab: "React",
            template: convertReactTemplate(reactCode),
            copy: true,
            language: "tsx",
        },
        {
            tab: "CSS",
            template: DEFAULT_CSS_TEMPLATE,
            copy: true,
            language: "css",
        },
        ...styles,
    ];

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
