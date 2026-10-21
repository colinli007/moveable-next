# Contributing

## Setup

- Node 22.20.0 (`nvm use` reads `.nvmrc`).
- pnpm, at the version in the root `package.json` `packageManager` field (Corepack or a global pnpm switches to it).

```sh
pnpm install
pnpm --filter @moveable-next/react exec playwright install chromium   # once, for the browser tests
```

All behavior lives in `packages/react-moveable`; the vanilla, croact and Vue 3 packages wrap its build. `pnpm storybook` starts the development environment on port 6006.

## Checks

CI runs all of these on every push and pull request:

```sh
pnpm lint                 # ESLint on the libraries' src, then duplicate dependency ranges
pnpm doc                  # API docs with TypeDoc (warnings are errors)
pnpm packages:build       # builds every package, including the type tests
pnpm test                 # story tests, unit tests, browser tests of the wrappers (needs the build)
pnpm --filter @moveable-next/react typecheck:stories
```

## Changesets

A pull request that changes what users of a published package get (behavior, types, dependencies, the published files) needs a changeset:

```sh
pnpm changeset
```

Pick the affected packages and the bump type, and write a summary for the changelog; commit the generated file in `.changeset/` with your change. Changes to tests, stories, docs or CI don't need one.

`@moveable-next/react`, `@moveable-next/croact`, `@moveable-next/vanilla` and `@moveable-next/vue3` always share one version: a changeset for any of them releases all four. `@moveable-next/helper` is versioned on its own.

## Releases

Releases are published by the `Release` workflow:

1. When changesets reach `main`, the workflow runs all checks and then opens or updates a "Version Packages" pull request with the new versions and changelogs.
2. Merging that pull request runs the checks again and publishes the packages whose version isn't on npm yet, with git tags and GitHub releases.

The workflow authenticates with npm trusted publishing, so there is no npm token, and every version carries a provenance attestation. The version pull request is created by the workflow's token, which doesn't trigger other workflows, so it shows no checks; they run on `main` before anything is published.

The only exception is the first version of a package that isn't on npm yet: npm can configure trusted publishing only for an existing package. A maintainer publishes it once from `main` with `pnpm release` (logged in with `npm login`), then adds the trusted publisher on npmjs.com: repository `colinli007/moveable-next`, workflow `release.yml`, environment `npm`.
