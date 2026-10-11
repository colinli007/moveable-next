import { fileURLToPath } from "node:url";

// Storybook expects manager entries as file paths, not URLs.
export const managerEntries = (entries: string[] = []) => [
    ...entries,
    fileURLToPath(import.meta.resolve("./manager.tsx")),
];
