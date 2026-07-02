# @stream-kit/app-types

Thin compatibility package that re-exports all types from `@stream-kit/plugin`.

**Location:** `packages/app-types/`  
**NPM name:** `@stream-kit/app-types`

## Purpose

Some tooling and older references expect types under an `@stream-kit/app-types` package name. This package avoids duplicating definitions:

```ts
// packages/app-types/src/index.ts
export type * from '@stream-kit/plugin';
```

## Usage

```ts
import type { Plugin, PluginAppApi } from '@stream-kit/app-types';
```

For new code, prefer importing directly from `@stream-kit/plugin`:

```ts
import type { Plugin, PluginAppApi } from '@stream-kit/plugin';
```

## Dependencies

| Package | Role |
|---------|------|
| `@stream-kit/plugin` | Source of all exported types |

There is no build step. TypeScript resolves types from source via the `exports` field in `package.json`.

## Related exports

The app package also exposes a runtime alias:

```ts
import type { Plugin } from '@stream-kit/app/api';
```

That entry re-exports `@stream-kit/plugin` as well. Use `@stream-kit/plugin` as the canonical import path for plugin development.
