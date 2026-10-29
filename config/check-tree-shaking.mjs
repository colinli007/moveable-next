// Tree-shaking check run at the end of the builds of react-moveable, moveable and vue3-moveable
// (`node ../../config/check-tree-shaking.mjs` in the package directory). It bundles two pieces of
// user code with the package's ESM build: one that combines Draggable, Resizable and Rotatable with
// `makeMoveable`, and one that imports the default export. The first must not contain the other
// ables, and must be clearly smaller than the second. Packages of this repository are bundled,
// third-party dependencies stay external, so only moveable's own code is measured.
// tsdown is resolved from the package that runs the check, so the root does not depend on it.
import fs from "node:fs";
import { createRequire } from "node:module";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const COMBINED_ABLES = ["draggable", "resizable", "rotatable"];
// Every Moveable has these: `getTotalAbles()` adds the first four, `triggerAble` calls the others.
const ALWAYS_ABLES = ["groupable", "individualGroupable", "dragArea", "beforeRenderable", "renderable"];
// The combined bundle measured 0.66 of the full one when the check was added.
const MAX_SIZE_RATIO = 0.75;

const packageDir = process.cwd();
const require = createRequire(path.join(packageDir, "package.json"));
const { build } = await import(pathToFileURL(require.resolve("tsdown")).href);
const distFile = JSON.stringify(path.join(packageDir, "dist/moveable.esm.js"));

/**
 * Names of the ables defined at the top level of an unminified bundle: the `name` key of an
 * object literal (one tab deep), or a `makeAble("name", ...)` call (which the build marks as pure).
 *
 * @param {string} code
 * @returns {string[]}
 */
function getAbleNames(code) {
    return [...code.matchAll(/^var [\w$]+ = (?:\{\n(?:\t.*\n)*?\tname: |(?:\/\* @__PURE__ \*\/ )?makeAble\()"(\w+)"/gm)].map(match => match[1]);
}

/**
 * @param {string} dir temporary directory for the entry file
 * @param {string} name
 * @param {string} source user code
 * @param {boolean} minify
 * @returns {Promise<string>} the bundled code
 */
async function bundle(dir, name, source, minify) {
    const entry = path.join(dir, `${name}.js`);

    fs.writeFileSync(entry, source);
    const { bundles } = await build({
        config: false,
        cwd: packageDir,
        entry: [entry],
        // tsdown empties outDir before building, even without writing: never the package's dist.
        outDir: path.join(dir, "out"),
        format: "esm",
        platform: "browser",
        minify,
        sourcemap: false,
        dts: false,
        write: false,
        logLevel: "silent",
        deps: { neverBundle: true, alwaysBundle: [/^@moveable-next\//], onlyBundle: false },
    });
    return bundles.flatMap(({ chunks }) => chunks.map(chunk => chunk.code)).join("\n");
}

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "moveable-tree-shaking-"));

try {
    const combinedSource = `import { makeMoveable, Draggable, Resizable, Rotatable } from ${distFile};
export default makeMoveable([Draggable, Resizable, Rotatable]);
`;
    const fullSource = `export { default } from ${distFile};\n`;
    const fullAbles = getAbleNames(await bundle(dir, "full", fullSource, false));
    const combinedAbles = getAbleNames(await bundle(dir, "combined", combinedSource, false));
    const fullSize = (await bundle(dir, "full", fullSource, true)).length;
    const combinedSize = (await bundle(dir, "combined", combinedSource, true)).length;
    const ratio = combinedSize / fullSize;
    const keptAbles = combinedAbles.filter(name => !COMBINED_ABLES.includes(name) && !ALWAYS_ABLES.includes(name));
    const kb = size => `${(size / 1024).toFixed(1)}KB`;

    console.log(`tree-shaking: ${COMBINED_ABLES.join(", ")} ${kb(combinedSize)} / full ${kb(fullSize)} (${ratio.toFixed(2)})`);
    // The able definitions are found by the output format of rolldown; finding none means the
    // format changed and the check would pass without checking anything.
    if (!fullAbles.length) {
        console.error("tree-shaking: no able definitions found in the full bundle, update getAbleNames.");
        process.exitCode = 1;
    }
    if (keptAbles.length) {
        console.error(`tree-shaking: ables that are not combined are kept: ${keptAbles.join(", ")}`);
        process.exitCode = 1;
    }
    if (ratio > MAX_SIZE_RATIO) {
        console.error(`tree-shaking: the combined bundle is larger than ${MAX_SIZE_RATIO} of the full one.`);
        process.exitCode = 1;
    }
} finally {
    fs.rmSync(dir, { recursive: true, force: true });
}
