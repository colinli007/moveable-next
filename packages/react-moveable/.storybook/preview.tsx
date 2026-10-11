import * as React from "react";
import type { Preview } from "@storybook/react-vite";
import { Controls, Primary, Title, useOf } from "@storybook/addon-docs/blocks";
import { themes } from "storybook/theming";
import { INITIAL_VIEWPORTS } from "storybook/viewport";
// The base styles every example relies on (the CSS tab shows default.css).
import "../stories/common.css";
import "../stories/templates/default.css";

function StoryName() {
    const { story } = useOf("story", ["story"]);

    return <h2 className="sbdocs-subtitle">{story.name}</h2>;
}

const preview: Preview = {
    tags: ["autodocs"],
    parameters: {
        options: {
            // Keep the numbered directory order (1-Basic, 2-Combination, ..., 9A-Components).
            // Storybook evaluates this function from its source text, so it cannot carry type annotations.
            // @ts-expect-error -- `a` and `b` are index entries (`title`, `importPath`).
            storySort: (a, b) => a.title === b.title
                ? 0
                : a.importPath.localeCompare(b.importPath, undefined, { numeric: true }),
        },
        docs: {
            page: () => <>
                <Title />
                <StoryName />
                <Primary />
                <Controls />
            </>,
        },
        controls: {
            expanded: true,
            hideNoControlsWarning: true,
        },
        viewport: {
            options: {
                ...INITIAL_VIEWPORTS,
                // The size the interaction tests run at (selected in vitest.config.ts).
                test: {
                    name: "Test (1280 × 720)",
                    styles: { width: "1280px", height: "720px" },
                    type: "desktop",
                },
            },
        },
        darkMode: {
            stylePreview: true,
            light: { ...themes.light },
            dark: { ...themes.dark },
        },
    },
};

export default preview;
