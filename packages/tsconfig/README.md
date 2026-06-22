# @matsugov/tsconfig

Shared TypeScript configurations for every package and site in this monorepo. Each preset extends `base.json` and only adds the bits that vary per surface, so per-project `tsconfig.json` files stay short (paths, includes, plugins).

## Presets

| File           | Use for                                                               | Notes                                                              |
| -------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `base.json`    | Anything else (Node scripts, plain TS libs).                          | Strict, ESM, bundler resolution, `noEmit`.                         |
| `library.json` | Workspace packages (`@matsugov/ui`, `@msb/js-sdk`, `@msb/map`, etc.). | Extends `base` + `jsx: react-jsx` for component packages.          |
| `nextjs.json`  | Next.js app tsconfigs (`sites/msb`, `sites/widgets`, `sites/myprop`). | Extends `base` + `jsx: preserve` and the `next` TypeScript plugin. |

## Usage

```jsonc
// sites/myapp/tsconfig.json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@matsugov/tsconfig/nextjs.json",
  "compilerOptions": {
    "paths": { "@/*": ["./*"] },
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"],
}
```

Add the package as a dev dependency on each consumer:

```jsonc
"devDependencies": {
  "@matsugov/tsconfig": "workspace:^"
}
```

## Overriding

Anything in the consumer's `compilerOptions` wins — that's how `sites/myprop` keeps its `module: nodenext` setup and how `packages/ui` adds the `next` plugin even though it extends the library preset. Override sparingly; if you find yourself overriding the same option in every consumer, lift it into the relevant preset.
