// Fails when a third-party dependency is declared by two or more workspace packages
// without `catalog:`, so its version is only ever written in pnpm-workspace.yaml.
// peerDependencies and `workspace:` dependencies are not checked.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifests = [
    "package.json",
    ...fs.readdirSync(path.join(root, "packages"))
        .map(name => `packages/${name}/package.json`)
        .filter(file => fs.existsSync(path.join(root, file))),
];
const declarations = new Map();

for (const file of manifests) {
    const pkg = JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));

    for (const field of ["dependencies", "devDependencies"]) {
        for (const [name, range] of Object.entries(pkg[field] ?? {})) {
            if (range.startsWith("workspace:")) {
                continue;
            }
            if (!declarations.has(name)) {
                declarations.set(name, []);
            }
            declarations.get(name).push({ pkg: pkg.name, range });
        }
    }
}

const duplicates = [...declarations].filter(([, list]) => list.length > 1 && list.some(({ range }) => range !== "catalog:"));

for (const [name, list] of duplicates) {
    console.error(`${name}: ${list.map(({ pkg, range }) => `${pkg} (${range})`).join(", ")}`);
}
if (duplicates.length) {
    console.error("\nDeclared by several packages: move these to the catalog in pnpm-workspace.yaml and use \"catalog:\".");
    process.exit(1);
}
