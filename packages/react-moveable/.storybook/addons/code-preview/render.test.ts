import { describe, expect, it } from "vitest";
import { convertReactTemplate, convertTemplate, convertVueTemplate } from "../../../stories/utils";
import { renderTabs, renderTemplate, type Preview } from "./render";

describe("renderTemplate", () => {
    it("returns plain code as is", () => {
        expect(renderTemplate("  .target {}\n", { draggable: true })).toBe(".target {}");
    });
    it("replaces boolean, number and array args with their current values", () => {
        const template = convertTemplate(`<Moveable
    draggable={props.draggable}
    throttleDrag={props.throttleDrag}
    renderDirections={props.renderDirections}
/>`);

        expect(renderTemplate(template, {
            draggable: false,
            throttleDrag: 10,
            renderDirections: ["n", "s"],
        })).toBe(`<Moveable
    draggable={false}
    throttleDrag={10}
    renderDirections={["n","s"]}
/>`);
    });
    it("keeps the name of a value that is not an arg", () => {
        expect(renderTemplate([["a ", " b"], ["unknown"]], {})).toBe("a unknown b");
    });
    it("writes strings with single quotes when asked, so that they fit in double-quoted attributes", () => {
        const template = convertTemplate(`<Moveable
    :rootContainer="props.rootContainer"
    :elementGuidelines="props.elementGuidelines"
    :snapDirections="props.snapDirections"
    :throttleDrag="props.throttleDrag"
/>`);
        const args = {
            rootContainer: "it's",
            elementGuidelines: [".a", ".b"],
            snapDirections: { top: true, bottom: false },
            throttleDrag: 1,
        };

        expect(renderTemplate(template, args, true)).toBe(`<Moveable
    :rootContainer="'it\\'s'"
    :elementGuidelines="['.a','.b']"
    :snapDirections="{'top':true,'bottom':false}"
    :throttleDrag="1"
/>`);
    });
});

describe("convertReactTemplate", () => {
    it("replaces the package alias and drops the props parameter", () => {
        const code = `import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    return <Moveable draggable={props.draggable} />;
}`;

        expect(renderTemplate(convertReactTemplate(code), { draggable: true })).toBe(`import Moveable from "@moveable-next/react";

export default function App() {
    return <Moveable draggable={true} />;
}`);
    });
});

describe("convertVueTemplate", () => {
    it("replaces the package alias and drops a one-line props declaration", () => {
        const code = `<script setup lang="ts">
import Moveable from "@/vue3-moveable";
const props = defineProps<{ draggable: boolean }>();
</script>
<template>
    <Moveable :draggable="props.draggable" />
</template>`;

        expect(renderTemplate(convertVueTemplate(code), { draggable: false }, true)).toBe(`<script setup lang="ts">
import Moveable from "@moveable-next/vue3";
</script>
<template>
    <Moveable :draggable="false" />
</template>`);
    });
    it("drops a props declaration spanning several lines", () => {
        const code = `<script setup lang="ts">
import { ref } from "vue";
const props = defineProps<{
    draggable: boolean;
    renderDirections: Array<string>;
}>();
const targetRef = ref<HTMLElement | null>(null);
</script>`;

        expect(renderTemplate(convertVueTemplate(code), {}, true)).toBe(`<script setup lang="ts">
import { ref } from "vue";
const targetRef = ref<HTMLElement | null>(null);
</script>`);
    });
    it("keeps calls whose names end with App", () => {
        expect(renderTemplate(convertVueTemplate(`createApp(App).mount("#app");`), {})).toBe(`createApp(App).mount("#app");`);
    });
});

describe("renderTabs", () => {
    it("groups templates by tab in order", () => {
        const previews: Preview[] = [
            { tab: "React", template: "react", language: "tsx", copy: true, framework: "react" },
            { tab: "CSS", template: ".target {}", language: "css", framework: "react" },
            { tab: "CSS", template: [[".snap { width: ", "px; }"], ["value"]], language: "css", description: "snap.css", framework: "react" },
        ];

        expect(renderTabs(previews, { value: 1 })).toEqual([
            { tab: "React", codes: [{ description: undefined, language: "tsx", copy: true, text: "react" }] },
            {
                tab: "CSS",
                codes: [
                    { description: undefined, language: "css", copy: undefined, text: ".target {}" },
                    { description: "snap.css", language: "css", copy: undefined, text: ".snap { width: 1px; }" },
                ],
            },
        ]);
    });
});
