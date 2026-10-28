import { beforeEach, inject } from "vitest";
import { page, server } from "vitest/browser";

// Storybook's preview puts the story's layout class on <body> (every story here uses the default "padded"),
// which offsets the canvas by 1rem. addon-vitest renders stories without it; add it so that plays measuring
// page coordinates see the same layout as in Storybook.
document.body.classList.add("sb-show-main", "sb-main-padded");

// Vitest names failure screenshots after the test file and the test, which both story projects share (one per
// framework, see vitest.config.mts): take them here instead, in a directory per project.
declare module "vitest" {
    export interface ProvidedContext {
        storybookProject: string;
    }
}

beforeEach(({ task, onTestFailed }) => {
    onTestFailed(async () => {
        const file = task.file.name.split("/").pop();
        const name = task.fullTestName.replace(/\W/g, "-");

        await page.screenshot({
            path: `${server.config.attachmentsDir}/failure-screenshots/${inject("storybookProject")}/${file}/${name}.png`,
        });
    });
});
