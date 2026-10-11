import React from "react";
import { addons, types, useArgs, useParameter } from "storybook/manager-api";
import { AddonPanel, SyntaxHighlighter, TabsView } from "storybook/internal/components";
import { renderTabs, type Preview } from "./render";

const ADDON_ID = "moveable/code-preview";

function CodePreview() {
    const previews = useParameter<Preview[]>("preview", []);
    const [args] = useArgs();
    // Keep the selected tab while switching stories; fall back to the first one when a story lacks it.
    const [selected, setSelected] = React.useState<string>();
    const tabs = renderTabs(previews, args);

    if (!tabs.length) {
        return null;
    }
    return <TabsView
        selected={tabs.some(({ tab }) => tab === selected) ? selected : tabs[0].tab}
        onSelectionChange={setSelected}
        tabs={tabs.map(({ tab, codes }) => ({
            id: tab,
            title: tab,
            children: codes.map(({ description, language, copy, text }, i) => <div key={i}>
                {description && <p>{description}</p>}
                <SyntaxHighlighter language={language} copyable={copy} showLineNumbers bordered padded>
                    {text}
                </SyntaxHighlighter>
            </div>),
        }))}
    />;
}

addons.register(ADDON_ID, () => {
    addons.add(`${ADDON_ID}/panel`, {
        type: types.PANEL,
        title: "Code Preview",
        paramKey: "preview",
        render: ({ active }) => <AddonPanel active={!!active}>
            <CodePreview />
        </AddonPanel>,
    });
});
