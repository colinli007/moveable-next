import type { SupportedLanguage } from "storybook/internal/components";

/**
 * A template is either plain code or `[strings, values]`: the code is `strings` interleaved with `values`,
 * where a value that names an arg is replaced by the arg's current value (`convertTemplate` in stories/utils.ts).
 */
export type Template = string | [strings: string[], values: string[]];

/**
 * One entry of the `preview` story parameter.
 */
export interface Preview {
    tab: string;
    template: Template;
    description?: string;
    language: SupportedLanguage;
    copy?: boolean;
}

export interface CodeTab {
    tab: string;
    codes: Array<Pick<Preview, "description" | "language" | "copy"> & { text: string }>;
}

export function renderTemplate(template: Template, args: Record<string, unknown>): string {
    if (typeof template === "string") {
        return template.trim();
    }
    const [strings, values] = template;

    return strings.reduce((code, string, i) => {
        const name = values[i];
        const value = name === undefined ? "" : name in args ? JSON.stringify(args[name]) : name;

        return code + string + value;
    }, "").trim();
}

/**
 * Renders every template with the current args and groups them by tab, keeping their order.
 */
export function renderTabs(previews: Preview[], args: Record<string, unknown>): CodeTab[] {
    const tabs: CodeTab[] = [];

    previews.forEach(({ tab, template, description, language, copy }) => {
        let codeTab = tabs.find(t => t.tab === tab);

        if (!codeTab) {
            codeTab = { tab, codes: [] };
            tabs.push(codeTab);
        }
        codeTab.codes.push({ description, language, copy, text: renderTemplate(template, args) });
    });
    return tabs;
}
