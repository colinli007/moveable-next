import type { SupportedLanguage } from "storybook/internal/components";

/**
 * A template is either plain code or `[strings, values]`: the code is `strings` interleaved with `values`,
 * where a value that names an arg is replaced by the arg's current value (`convertTemplate` in stories/utils.ts).
 */
export type Template = string | [strings: string[], values: string[]];

/**
 * The frameworks an example is written in: the `framework` global (see .storybook/preview.tsx).
 */
export type Framework = "react" | "vue";

/**
 * One entry of the `preview` story parameter.
 */
export interface Preview {
    tab: string;
    template: Template;
    description?: string;
    language: SupportedLanguage;
    copy?: boolean;
    /**
     * The entry is shown while this framework is selected.
     */
    framework: Framework;
    /**
     * Writes strings in the values with single quotes: the Vue templates put the values in double-quoted attributes (`:prop="..."`).
     */
    singleQuote?: boolean;
}

export interface CodeTab {
    tab: string;
    codes: Array<Pick<Preview, "description" | "language" | "copy"> & { text: string }>;
}

function stringify(value: unknown, singleQuote?: boolean) {
    const json = JSON.stringify(value);

    // Every string literal of the JSON, with `'` escaped instead of `"`.
    return singleQuote ? json?.replace(/"((?:[^"\\]|\\.)*)"/g, (_, text: string) => `'${text.replace(/'/g, "\\'")}'`) : json;
}

export function renderTemplate(template: Template, args: Record<string, unknown>, singleQuote?: boolean): string {
    if (typeof template === "string") {
        return template.trim();
    }
    const [strings, values] = template;

    return strings.reduce((code, string, i) => {
        const name = values[i];
        const value = name === undefined ? "" : name in args ? stringify(args[name], singleQuote) : name;

        return code + string + value;
    }, "").trim();
}

/**
 * Renders every template with the current args and groups them by tab, keeping their order.
 */
export function renderTabs(previews: Preview[], args: Record<string, unknown>): CodeTab[] {
    const tabs: CodeTab[] = [];

    previews.forEach(({ tab, template, description, language, copy, singleQuote }) => {
        let codeTab = tabs.find(t => t.tab === tab);

        if (!codeTab) {
            codeTab = { tab, codes: [] };
            tabs.push(codeTab);
        }
        codeTab.codes.push({ description, language, copy, text: renderTemplate(template, args, singleQuote) });
    });
    return tabs;
}
