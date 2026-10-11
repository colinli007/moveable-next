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
    it("replaces the quoted placeholders croffle generates", () => {
        const template = convertTemplate(`draggable: "$preview_draggable",`, /"\$preview_([^"]+)"/g);

        expect(renderTemplate(template, { draggable: true })).toBe("draggable: true,");
    });
    it("keeps the name of a value that is not an arg", () => {
        expect(renderTemplate([["a ", " b"], ["unknown"]], {})).toBe("a unknown b");
    });
});

describe("renderTabs", () => {
    it("groups templates by tab in order", () => {
        const previews: Preview[] = [
            { tab: "React", template: "react", language: "tsx", copy: true },
            { tab: "Script", template: "html", language: "html", description: "HTML" },
            { tab: "Script", template: [["const a = ", ";"], ["value"]], language: "tsx", description: "JavaScript" },
        ];

        expect(renderTabs(previews, { value: 1 })).toEqual([
            { tab: "React", codes: [{ description: undefined, language: "tsx", copy: true, text: "react" }] },
            {
                tab: "Script",
                codes: [
                    { description: "HTML", language: "html", copy: undefined, text: "html" },
                    { description: "JavaScript", language: "tsx", copy: undefined, text: "const a = 1;" },
                ],
            },
        ]);
    });
});
