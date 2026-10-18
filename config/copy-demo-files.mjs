// The last step of `demo:build`: copies the package builds and the API docs into ./demo,
// which then is the whole site that the "Deploy demo" workflow publishes to GitHub Pages.
// Every target is cleared before copying, so local rebuilds never keep removed files.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const demoFileMap = [
    { source: "packages/moveable/dist", target: "demo/release/latest/dist" },
    { source: "packages/helper/dist", target: "demo/helper/release/latest/dist" },
    { source: "doc", target: "demo/release/latest/doc" },
];

for (const { source, target } of demoFileMap) {
    const targetPath = path.join(root, target);

    fs.rmSync(targetPath, { recursive: true, force: true });
    fs.cpSync(path.join(root, source), targetPath, { recursive: true });
    console.log(`${source} -> ${target}`);
}
