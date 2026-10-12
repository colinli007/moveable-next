// Build options shared by every package's tsdown config. Kept free of third-party
// imports so the root does not need to depend on tsdown.
import fs from "node:fs";
import path from "node:path";

/**
 * Header comment prepended to every build output, in the format the former
 * `@daybrush/builder` produced: the copyright line comes from the package's LICENSE
 * when it has one, otherwise from `author`.
 *
 * @param {string} packageDir directory containing the package's package.json
 * @returns {string}
 */
export function banner(packageDir) {
    const pkg = JSON.parse(fs.readFileSync(path.join(packageDir, "package.json"), "utf8"));
    const author = pkg.author ? pkg.author.name || pkg.author : "";
    const licensePath = path.join(packageDir, "LICENSE");
    const licenseCopyright = fs.existsSync(licensePath)
        ? fs.readFileSync(licensePath, "utf8").match(/^copy.*$/im)?.[0]
        : undefined;

    return `/*
${licenseCopyright || `Copyright (c) ${author}`}
name: ${pkg.name}
license: ${pkg.license}
author: ${author}
repository: ${pkg.repository.url}
version: ${pkg.version}
*/`;
}

/**
 * Options every build output shares. Declarations are emitted by tsc
 * (`declaration` script), not by tsdown.
 *
 * @param {string} packageDir directory containing the package's package.json
 */
export function sharedOptions(packageDir) {
    return {
        target: "es2022",
        sourcemap: true,
        dts: false,
        banner: banner(packageDir),
    };
}
