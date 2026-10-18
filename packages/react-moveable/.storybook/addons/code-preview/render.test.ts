import { describe, expect, it } from "vitest";
import { convertTemplate } from "../../../stories/utils";
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
});

describe("renderTabs", () => {
    it("groups templates by tab in order", () => {
        const previews: Preview[] = [
            { tab: "React", template: "react", language: "tsx", copy: true },
            { tab: "CSS", template: ".target {}", language: "css" },
            { tab: "CSS", template: [[".snap { width: ", "px; }"], ["value"]], language: "css", description: "snap.css" },
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
