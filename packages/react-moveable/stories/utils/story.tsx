import * as React from "react";
import { createApp, h, shallowReactive, type Component } from "vue";
import type { StoryObj } from "@storybook/react-vite";
import type { Framework, Preview } from "../../.storybook/addons/code-preview/render";

import { convertReactTemplate, convertVueTemplate, makeArgs } from "../utils";
import { DEFAULT_CSS_TEMPLATE } from "../templates/default";

type AppComponent = React.ComponentType<any>;
type Play = NonNullable<StoryObj["play"]>;

interface CommonAppStoryOptions {
    /**
     * `import.meta.glob("./*App.tsx", { eager: true })` of the story file's own directory.
     * Used to find the file of `App`.
     */
    apps: Record<string, unknown>;
    /**
     * `import.meta.glob("./{*App.tsx,*App.vue,*.css}", { query: "?raw", import: "default", eager: true })`
     * of the story file's own directory: the source of the Apps and the style files they import.
     */
    sources: Record<string, string>;
    argTypes?: Record<string, any>;
    args?: Record<string, any>;
}

export type AppStoryOptions = CommonAppStoryOptions & ({
    /**
     * `import.meta.glob("./*App.vue", { import: "default" })` of the story file's own directory.
     * The Vue version of `ReactXxxApp.tsx` is `VueXxxApp.vue`, loaded only while Vue is selected.
     */
    vueApps: Record<string, () => Promise<unknown>>;
} | {
    /**
     * The story only has a React version. Tag it `react-only` too: the Vue tests leave those out.
     */
    vue: false;
});

/**
 * The code tabs of one framework: the App's code, the default styles and the style files the App imports.
 */
function codeTabs(
    framework: Framework,
    appTab: Omit<Preview, "framework">,
    file: string,
    code: string,
    sources: Record<string, string>,
): Preview[] {
    // e.g. `import "./snap.css";`, in either quotes, with or without the semicolon
    const styles = Array.from(code.matchAll(/^import\s+["'](\.\/[^"']+\.css)["'];?$/gm), ([, path]) => {
        const css = sources[path];

        if (css === undefined) {
            throw new Error(`Cannot find ${path} imported by ${file} in the story's sources.`);
        }
        return { tab: "CSS", description: path.slice(2), template: css, copy: true, language: "css" } as const;
    });
    const tabs: Array<Omit<Preview, "framework">> = [
        appTab,
        { tab: "CSS", template: DEFAULT_CSS_TEMPLATE, copy: true, language: "css" },
        ...styles,
    ];

    return tabs.map(tab => ({ ...tab, framework }));
}

/**
 * The Vue version of the App in `file`: `./ReactXxxApp.tsx` → `./VueXxxApp.vue`, in the same directory.
 */
function vueVersion(file: string, vueApps: Record<string, () => Promise<unknown>>, sources: Record<string, string>) {
    const vueFile = file.replace(/^\.\/(?:React)?(\w+)\.tsx$/, "./Vue$1.vue");
    const load = vueApps[vueFile];
    const vueCode = sources[vueFile];

    if (!load || vueCode === undefined) {
        throw new Error(`Cannot find ${vueFile}, the Vue version of ${file}, in the story's directory.`);
    }
    return {
        load,
        previews: codeTabs("vue", {
            tab: "Vue",
            template: convertVueTemplate(vueCode),
            copy: true,
            language: "html",
            singleQuote: true,
        }, vueFile, vueCode, sources),
    };
}

/**
 * Mounts the Vue App the way an application does, with the story's args as its (reactive) props.
 */
function VueRoot({ app, args }: { app: Component; args: Record<string, any> }) {
    const elementRef = React.useRef<HTMLDivElement>(null);
    const [props] = React.useState(() => shallowReactive({ ...args }));

    React.useEffect(() => {
        // Only the args the App declares: the others would fall through to its root element as attributes.
        const names = Object.keys((app as { props?: object }).props ?? {});
        const vueApp = createApp({
            render: () => h(app, Object.fromEntries(names.map(name => [name, props[name]]))),
        });

        vueApp.mount(elementRef.current!);
        return () => vueApp.unmount();
    }, [app, props]);
    React.useEffect(() => {
        Object.assign(props, args);
    }, [props, args]);
    return <div ref={elementRef} />;
}

/**
 * Builds `render`, `args`, `argTypes` and the code tabs (`parameters.preview`) of a story that renders `App`,
 * or its Vue version while Vue is selected (the `framework` global).
 * The React and Vue tabs are the Apps' own source, the CSS tab the default styles plus the style files the App imports.
 */
export function appStory(App: AppComponent, options: AppStoryOptions) {
    const { apps, sources, argTypes = {}, args } = options;
    const file = Object.keys(apps).find(path => (apps[path] as { default?: unknown }).default === App);
    const reactCode = file && sources[file];

    if (!reactCode) {
        throw new Error(`Cannot find the source of ${App.displayName || App.name} in the story's directory.`);
    }
    const vue = "vueApps" in options ? vueVersion(file, options.vueApps, sources) : undefined;
    const previews = [
        ...codeTabs("react", {
            tab: "React",
            template: convertReactTemplate(reactCode),
            copy: true,
            language: "tsx",
        }, file, reactCode, sources),
        ...(vue?.previews ?? []),
    ];

    return {
        // Loaders run before every render, so the Vue App is there before the story renders and plays.
        loaders: vue ? [async ({ globals }) => ({
            vueApp: globals.framework === "vue" ? await vue.load() : undefined,
        })] : [],
        render: (props: Record<string, any>, { globals, loaded }) => {
            if (globals.framework !== "vue") {
                return <App {...props} />;
            }
            return vue
                ? <VueRoot app={loaded.vueApp} args={props} />
                : <p>The Vue 3 version of Moveable doesn't support this example.</p>;
        },
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
