// Type test of the published declarations (pnpm test:type), run at the end of the build.
// Besides reporting type errors, it fails when React's types take part in the compilation:
// users of the vanilla and Vue 3 packages usually have no @types/react, so the declarations
// must not reach react-moveable's React components. In this workspace @types/react is always
// resolvable from react-moveable, so the file list is checked instead of a missing module error.
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const configPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../tsconfig.test.json");
const { config } = ts.readConfigFile(configPath, ts.sys.readFile);
const { options, fileNames } = ts.parseJsonConfigFileContent(config, ts.sys, path.dirname(configPath));
const program = ts.createProgram(fileNames, options);

const diagnostics = ts.getPreEmitDiagnostics(program);
const reactFiles = program.getSourceFiles()
    .map(file => file.fileName)
    .filter(fileName => fileName.includes("/@types/react/"));

if (diagnostics.length) {
    console.error(ts.formatDiagnosticsWithColorAndContext(diagnostics, {
        getCanonicalFileName: fileName => fileName,
        getCurrentDirectory: ts.sys.getCurrentDirectory,
        getNewLine: () => ts.sys.newLine,
    }));
}
if (reactFiles.length) {
    console.error("React's types are part of the compilation:");
    reactFiles.forEach(fileName => console.error(`  ${fileName}`));
    console.error("Run `tsc -p tsconfig.test.json --explainFiles` to see which declaration imports them.");
}
if (diagnostics.length || reactFiles.length) {
    process.exit(1);
}
