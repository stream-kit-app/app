# Plugin Development

Stream Kit loads plugins from installed manifests. The app no longer registers first-party plugins directly at boot.

## Public API

Plugin authors should import types from `@stream-kit/plugin`:

```ts
import type { Plugin } from '@stream-kit/plugin';
```

See [Plugin Authoring API](./api.md) for the full public contract.

Runtime helpers such as `getFieldValue` and `interpolateVariables` come from `@stream-kit/core`.

## Manifest

Every plugin needs a `manifest.json` with a stable `key`:

```json
{
	"key": "hello-world",
	"name": "Hello World",
	"version": "0.1.0",
	"entry": "dist/index.js"
}
```

The `key` is used for install paths, settings files, and dependencies. Use lowercase letters, numbers, and hyphens only.

## Build Output

Every first-party plugin uses the shared Vite builder in [`plugins/create-vite-build-config.js`](../../plugins/create-vite-build-config.js):

```bash
pnpm --filter @stream-kit/plugin-twitch build
```

Each plugin has an identical `vite.build.config.js` that delegates to the shared config. **tsup is no longer used.**

External plugins must bundle to a single ESM entry file, usually `dist/index.js`, and externalize host modules:

```ts
external: [
	'@stream-kit/plugin',
	'@stream-kit/plugin/action',
	'@stream-kit/core',
	'svelte',
	'@stream-kit/ui',
	'bits-ui',
	'runed',
	'@iconify/svelte'
]
```

Svelte and `@stream-kit/ui` are **not** bundled into plugins. The app provides them through the plugin host import map so all plugins share one Svelte runtime and UI bundle.

Zip layout:

```text
plugin.zip
├── manifest.json
└── dist/
    └── index.js
```

## Local Development Workflow

1. Run the app:

```bash
pnpm --filter @stream-kit/app tauri dev
```

2. Run the plugin you are working on:

```bash
pnpm --filter @stream-kit/plugin-twitch dev
```

3. Link the plugin once:
   - In monorepo dev, first-party plugins listed in [`dev-plugins.json`](../../dev-plugins.json) are linked automatically on app boot.
   - For any other plugin project, open **Plugins**, enable **Developer mode** in Settings, then click **Link dev plugin** and choose the plugin's `manifest.json`.
   - If the Plugins page stays empty after boot, restart `pnpm dev` so Tauri picks up permission changes, then reload the app window.

4. Enable the plugin in the app.

5. Enable **Dev mode** on the plugin card.

When the plugin rebuilds its entry file, the app watches the source entry, mirrors the full plugin `dist/` output into app data, and reloads.

## Monorepo First-Party Plugins

The workspace keeps first-party plugins under `plugins/*`. Each plugin has:

- `manifest.json`
- `vite.build.config.js` (shared Vite builder)
- `dist/index.js` build output
- its own `pnpm dev` command (`vite build --watch`)

[`dev-plugins.json`](../../dev-plugins.json) is generated automatically from `plugins/*/manifest.json` when you run `pnpm build:plugin-host` or `pnpm sync:plugin-host`. New first-party plugins are picked up without editing that file manually.

## Distribution

Package a plugin with the template script:

```bash
pnpm --filter @stream-kit/plugin-template package
```

Users install the resulting zip from the Plugins page.

## Definition IDs

Triggers and handlers get stable IDs based on the manifest `key` and slugified names in the definition tree. You normally do not need to set `id` yourself.

If two sibling definitions would produce the same slug, set an explicit `id` on one of them. See [Plugin Authoring API](./api.md#definition-ids).

Saved actions store these IDs. Stream Kit migrates older index-based IDs automatically when actions are loaded.

## Plugin updates

Authors publish `manifest.json` and release zips on their own host (GitHub, GitLab, etc.). Add `updateManifestUrl` and `downloadUrl` to the manifest so Stream Kit can check for and install updates. See [updates.md](./updates.md).
