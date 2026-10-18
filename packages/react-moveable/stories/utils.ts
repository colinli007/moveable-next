// "See API" links point to the TypeDoc pages of the same site: Storybook is served from `storybook/`
// and the docs from `release/latest/doc/` (see config/copy-demo-files.mjs). They are 404 in `pnpm storybook`.
const API_URL = "../release/latest/doc/";

export function makeLink(property: string) {
    return `<a href="${API_URL}classes/Moveable.html#${property.toLowerCase()}" target="_blank">See API</a>`;
}
export function makeTypeLink(typeName: string, member?: string) {
    const anchor = member ? `#${member.toLowerCase()}` : "";

    return `<a href="${API_URL}interfaces/${typeName}.html${anchor}" target="_blank">See API</a>`;
}

export function makeArgType(param: {
    type: "text" | "radio" | "object" | "number" | "boolean" | "inline-radio";
    description?: string;
    defaultValue: any;
    value?: any;
    category?: string;
    control?: Record<string, any>;
    table?: Record<string, any>;
}) {
    return {
        control: param.type,
        ...(param.control || {}),
        table: {
            defaultValue: { summary: param.defaultValue },
            category: param.category,
            ...(param.table || {}),
        },
        description: param.description,
        value: "value" in param ? param.value : param.defaultValue,
    };
}
export function makeArgs(argTypes: any) {
    return Object.keys(argTypes).reduce((prev, cur) => {
        prev[cur] = argTypes[cur].value;

        return prev;
    }, {} as Record<string, any>);
}

export function convertReactTemplate(text: string) {
    // `@/react-moveable` is the stories' alias of the package source (`paths` in tsconfig.json).
    const previewText = text.replace(/"@\/react-moveable"/g, "\"@moveable-next/react\"");

    return convertTemplate(previewText);
}

export function convertTemplate(text: string): [string[], string[]] {
    const previewText = text.replace(/App\([^)]*\)/g, "App()");
    const regex = /props\.([a-zA-Z0-9_]+)/g;
    let result: RegExpExecArray | null;
    let index = 0;

    const strings: string[] = [];
    const values: string[] = [];

    // eslint-disable-next-line no-cond-assign
    while (result = regex.exec(previewText)) {
        strings.push(previewText.slice(index, result.index));
        values.push(result[1]);
        index = result.index + result[0].length;
    }

    strings.push(previewText.slice(index));
    return [strings, values];
}
