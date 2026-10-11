import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// The Introduction docs page is the repository README (stories/0-Introduction/readme.mdx, git-ignored).
const readme = readFileSync(fileURLToPath(new URL("../../../README.md", import.meta.url)), "utf-8");
const introduction = new URL("../stories/0-Introduction/", import.meta.url);

mkdirSync(introduction, { recursive: true });
writeFileSync(new URL("readme.mdx", introduction), `import { Meta } from "@storybook/addon-docs/blocks";

<Meta title="Introduction" />

${readme}`);
