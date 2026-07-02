# Packages

Stream Kit is a pnpm monorepo. Shared libraries live under `packages/`; first-party plugins live under `plugins/`; the public website lives in `site/`.

This section documents the six workspace packages in `packages/`.

## Package overview

| Package | NPM name | Role |
|---------|----------|------|
| [App](./app.md) | `@stream-kit/app` | Desktop application (SvelteKit + Tauri) and plugin host |
| [Core](./core.md) | `@stream-kit/core` | Platform-neutral runtime helpers shared by app and plugins |
| [Plugin](./plugin.md) | `@stream-kit/plugin` | Public TypeScript API for plugin authors |
| [UI](./ui.md) | `@stream-kit/ui` | Shared Svelte 5 UI primitives |
| [App types](./app-types.md) | `@stream-kit/app-types` | Compatibility re-export of the plugin API |
| [Plugin template](./plugin-template.md) | `@stream-kit/plugin-template` | Starter project for external plugins |

## Dependency graph

```text
@stream-kit/app
├── @stream-kit/core
├── @stream-kit/plugin
│   └── @stream-kit/core
├── @stream-kit/ui
│   └── @stream-kit/core
└── (dev) first-party plugins from plugins/*

@stream-kit/app-types
└── @stream-kit/plugin

@stream-kit/plugin-template
├── @stream-kit/core
└── (dev) @stream-kit/app, @stream-kit/plugin
```

## Build order

The root `build:packages` script builds shared packages before the app plugin host:

1. `@stream-kit/plugin` — bundles public `.d.ts` and runtime re-exports
2. `@stream-kit/core` — ESM bundle + declarations
3. `@stream-kit/ui` — type-check only (source is consumed directly)
4. First-party plugins under `plugins/*`
5. `@stream-kit/app build:plugin-host` — import map + host bundles in `static/plugin-host/`

During development, `pnpm dev` runs watchers for UI, plugin API, core, all first-party plugins, and the Tauri app in parallel.

## Related documentation

- [Plugin getting started](../plugins/getting-started.md) — step-by-step author guide
- [Plugin development](../plugins/development.md) — workflow for building and linking plugins
- [Plugin authoring API](../plugins/api.md) — full public contract from `@stream-kit/plugin`
- [Core plugin](../core/README.md) — built-in handlers, triggers, and variables (`plugins/core/`)
