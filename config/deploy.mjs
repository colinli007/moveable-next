// Copies build outputs into ./demo before `demo:deploy` pushes it to gh-pages.
// Mirrors the former lerna-helper `deployFileMap`: every target is cleared, then copied,
// and all of them are versioned with the moveable package version.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { version } = JSON.parse(fs.readFileSync(path.join(root, "packages/moveable/package.json"), "utf8"));

const deployFileMap = [
    {
        basePath: "packages/moveable/dist",
        dists: [`demo/release/${version}/dist`, "demo/release/latest/dist"],
    },
    {
        basePath: "packages/helper/dist",
        dists: [`demo/helper/release/${version}/dist`, "demo/helper/release/latest/dist"],
    },
    {
        basePath: "doc",
        dists: [`demo/release/${version}/doc`, "demo/release/latest/doc"],
    },
];

for (const { basePath, dists } of deployFileMap) {
    const source = path.join(root, basePath);

    for (const dist of dists) {
        const target = path.join(root, dist);

        fs.rmSync(target, { recursive: true, force: true });
        fs.mkdirSync(target, { recursive: true });
        fs.cpSync(source, target, { recursive: true });
        console.log(`${basePath} -> ${dist}`);
    }
}
