import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";
import react from "eslint-plugin-react";
import tseslint from "typescript-eslint";

export default defineConfig(
    // Only the TS sources below are linted; ESLint would otherwise also pick up every
    // JS file, including build outputs in dist/.
    globalIgnores(["**/*.{js,mjs,cjs}"]),
    {
        files: [
            "packages/{react-moveable,helper,croact-moveable,preact-moveable,moveable,lit-moveable,vue3-moveable}/src/**/*.{ts,tsx}",
            // .svelte files are not linted; svelte-check checks their TypeScript during the build.
            "packages/svelte-moveable/src/**/*.ts",
        ],
        // Only the recommended react rules: some others still call context APIs removed in ESLint 10.
        extends: [js.configs.recommended, tseslint.configs.recommended, react.configs.flat.recommended],
        plugins: {
            "@stylistic": stylistic,
        },
        settings: {
            // Lowest supported React version; "detect" fails because the root does not install react.
            react: { version: "16.8" },
        },
        rules: {
            "no-console": "error",
            // Mixed destructuring assignments such as `[delta, dist, rotation] = getRotateInfo(...)`
            // cannot declare just one target as const.
            "prefer-const": ["error", { destructuring: "all" }],
            "@typescript-eslint/no-inferrable-types": ["error", {
                ignoreParameters: true,
                ignoreProperties: false,
            }],
            "@typescript-eslint/no-this-alias": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-empty-object-type": "off",
            "@typescript-eslint/no-unsafe-function-type": "off",
            "@typescript-eslint/no-wrapper-object-types": "off",
            "@typescript-eslint/no-require-imports": "off",
            // `manager && manager.destroy()` and `gesto && (gesto.options.x = y)` are the
            // codebase's idiom; the assigning form cannot be written with `?.`.
            "@typescript-eslint/no-unused-expressions": ["error", {
                allowShortCircuit: true,
                allowTernary: true,
            }],
            // Members added at runtime by decorators or mixins (@Properties, @withMethods)
            // are typed through an interface merged with the class.
            "@typescript-eslint/no-unsafe-declaration-merging": "off",
            // no-inner-declarations stays off (dropped from recommended in ESLint 9): the sources
            // are ES modules, always strict, where block-level function declarations are block scoped.
            "@stylistic/indent": ["error", 4],
            "@stylistic/semi": ["error", "always"],
            "@stylistic/no-extra-semi": "error",
            "@stylistic/no-mixed-spaces-and-tabs": "error",
            "@stylistic/max-len": ["error", {
                code: 120,
                comments: 400,
                ignoreTemplateLiterals: true,
                ignorePattern: "^\\s*type\\s.+=\\s*",
            }],
            // The old core rule only checked arrays, objects, imports and exports; unlisted
            // keys default to "never", so every other position is spelled out as "ignore".
            "@stylistic/comma-dangle": ["error", {
                arrays: "always-multiline",
                objects: "always-multiline",
                imports: "always-multiline",
                exports: "always-multiline",
                functions: "ignore",
                generics: "ignore",
                enums: "ignore",
                tuples: "ignore",
                importAttributes: "ignore",
                dynamicImports: "ignore",
            }],
        },
    },
);
