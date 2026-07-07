# @stream-kit/plugin

Public TypeScript API for Stream Kit plugin authors.

Types are extracted from the app source and bundled into a standalone declaration file. Runtime helpers are re-exported from `@stream-kit/core`; filesystem enums ship from this package.

## When to use it

Use `@stream-kit/plugin` for everything that defines or types your plugin:

```ts
import type {
	Plugin,
	PluginAppApi,
	HandlerDefinitionProps,
	TriggerDefinitionProps
} from '@stream-kit/plugin';

import { getFieldValue, interpolateVariables } from '@stream-kit/core';
import { BaseDirectory } from '@stream-kit/plugin';
```

| Need | Package | Notes |
|------|---------|-------|
| Types (`Plugin`, `PluginAppApi`, definitions) | `@stream-kit/plugin` | Use `import type` |
| Runtime helpers (`getFieldValue`, `parseCommand`, cron) | `@stream-kit/core` | Preferred for helpers |
| `BaseDirectory`, `SeekMode` | `@stream-kit/plugin` | Required for `app.fs` options |
| Svelte UI (custom views/widgets only) | `@stream-kit/ui` | Dev dependency; externalize at build time |
| Platform features | `app` (`PluginAppApi`) | Filesystem, toast, process, hotkeys, audio, store |

Never import `@tauri-apps/*` in plugin code. Use `app.fs`, `app.process`, and other `PluginAppApi` surfaces instead.

## Installation

External plugins add this package as a dev dependency and externalize it at build time:

```bash
npm install --save-dev @stream-kit/plugin @stream-kit/core
```

For custom Svelte views or dashboard widgets (built-in-style plugins only), also add:

```bash
npm install --save-dev @stream-kit/ui
```

At runtime the Stream Kit app host resolves `@stream-kit/plugin` from the plugin import map. **Do not bundle** `@stream-kit/plugin`, `@stream-kit/core`, or `@stream-kit/ui` into your plugin entry.

The npm package ships `dist/index.js`, but Stream Kit always loads the host bundle at runtime. Keep host modules externalized in your Vite or Rollup config.

## Plugin shape

```ts
import type { Plugin } from '@stream-kit/plugin';

const plugin: Plugin = (app) => ({
	name: 'My Plugin',
	handlers: [],
	triggers: [],
	menuItems: []
});

export default plugin;
```

The app host dynamically imports your plugin entry from the installed manifest.

## What this package exports

### Plugin contract

- `Plugin`, `PluginRegistration` — entry function and return shape
- `PluginAppApi` — filesystem, audio, process, OAuth, toast, plugins, db, …
- `PluginStore` — per-plugin JSON persistence (`plugin.{key}.json`)
- `PluginPublicApi` — optional API surface for other plugins via `app.plugins.get(key)`

### Actions

- `Action`, `ActionHandler`, `ActionTrigger`
- `HandlerDefinitionProps`, `HandlerExecuteFn`, `HandlerNext`
- `TriggerDefinitionProps`, `TriggerTestFn`, `TriggerValidateFormFn`
- Handler field types (`HandlerFieldDefinition`, `HandlerFieldValue`, one-of variants, …)
- Condition tree types (`ConditionNode`, `Operator`, …)

### Settings and UI schema

- `PluginSettingsFieldDefinition`, `PluginSettingsFieldSectionDefinition`
- `PluginPageDefinition`, `PluginPageBlock`, form block types
- `PluginMenuItemDefinition`, `PluginWidgetDefinition`
- `PluginCustomViewProps` — for Svelte custom views registered by built-in npm plugins

Declarative menu pages are rendered by Stream Kit with `@stream-kit/ui`. Zip-distributed plugins must use page blocks only; do not pass Svelte components or raw HTML for menu pages.

### Platform types

- Filesystem: `BaseDirectory`, `SeekMode`, `FileHandle` (type), `ReadFileOptions`, `WatchEvent`, …
- Process: `RunProgramOptions`, `ProcessEventContext`
- Lifecycle: `AppLifecycleEvent`, `AppLifecycleContext`
- Core plugin API types: `CorePluginApi`, `VariableScope`, collection types
- Bot command types: `CommandRecord`, `CommandPermissions`, …
- TTS: `LocalTtsVoiceInfo`, `LocalTtsRuntimeInfo`

### Runtime re-exports from `@stream-kit/core`

`getFieldValue`, `interpolateVariables`, cron helpers, command parsers, and related types are re-exported so plugin code can use a single import path when convenient.

## Subpath stubs

Type-only subpaths exist for tooling that expects separate entry points:

| Subpath | Purpose |
|---------|---------|
| `@stream-kit/plugin/action` | Action-related type stubs |
| `@stream-kit/plugin/utils` | Utility type stubs |

Runtime code should import helpers from `@stream-kit/core` and `BaseDirectory` / `SeekMode` from `@stream-kit/plugin`.

## IDE hover and autocomplete

JSDoc in the source types flows into `dist/index.d.ts` when this package is built. Hover on imports from `@stream-kit/plugin` and `@stream-kit/core`, and on `app.` methods in handler `execute` functions, to read parameter descriptions and examples without leaving the editor.

## Monorepo development

```bash
pnpm --filter @stream-kit/plugin build
pnpm --filter @stream-kit/plugin check
pnpm --filter @stream-kit/plugin dev
```

When the app API changes, rebuild `@stream-kit/plugin` before publishing to npm or syncing the [plugin-starter](https://github.com/stream-kit-app/plugin-starter) template.

## Further reading

- [Plugin getting started](https://docs.stream-kit.app/developers/plugin-getting-started)
- [Plugin Authoring API](https://docs.stream-kit.app/developers/plugin-api)
- [plugin-starter template](https://github.com/stream-kit-app/plugin-starter/generate) — recommended starting point for external authors
