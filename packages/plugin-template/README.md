# Stream Kit Plugin Template

Boilerplate for building installable Stream Kit plugins.

## Quick start

1. Copy this folder to a new plugin project (or use it in-place inside the monorepo).
2. Start from [`src/minimal.ts`](src/minimal.ts) for a short reference plugin, or keep [`src/index.ts`](src/index.ts) as a full UI block showcase.
3. Update `manifest.json` and your plugin entry file.
4. Install dependencies from the monorepo root with `pnpm install`.
5. Develop with hot rebuild:

```bash
pnpm --filter @stream-kit/plugin-template dev
```

6. Build a distributable zip:

```bash
pnpm --filter @stream-kit/plugin-template package
```

The zip is written to `packages/plugin-template/dist/plugin.zip`.

See [Plugin getting started](../../docs/plugins/getting-started.md) for the full author guide.

## Zip layout

```text
plugin.zip
├── manifest.json
└── dist/
    └── index.js
```

## Authoring rules

| Import from | Use for |
|-------------|---------|
| `@stream-kit/plugin` (type-only) | `Plugin`, `PluginAppApi`, handler/trigger definitions, settings schema |
| `@stream-kit/plugin` (value) | `BaseDirectory`, `SeekMode` |
| `@stream-kit/core` | Runtime helpers: `getFieldValue`, `interpolateVariables`, `parseCommand`, cron helpers |

- Never import `@tauri-apps/*` in plugin code. Use `app.fs`, `app.process`, and other `PluginAppApi` surfaces instead.
- Register plugin menu pages with declarative page definitions from `@stream-kit/plugin`.
- Do not pass Svelte components, compiled HTML, raw HTML, or `{@html}` for **external zip** plugin menu pages.
- Built-in npm plugins may register `customViews` with Svelte components; zip plugins must stay blocks-only.
- Button blocks may define an `onClick` handler when they need plugin-owned behavior.
- Bundle all other runtime dependencies into `dist/index.js`.
- Externalize host modules (`@stream-kit/plugin`, `@stream-kit/core`, `svelte`, `@stream-kit/ui`, …).
- Set a stable `key` in `manifest.json`. Stream Kit uses that key for install paths, settings, and dependencies.

## Reference files

| File | Purpose |
|------|---------|
| [`src/minimal.ts`](src/minimal.ts) | Minimal plugin: store, handler, `app.fs` + `BaseDirectory` |
| [`src/index.ts`](src/index.ts) | Full declarative page block showcase |
| [`src/handler/greet.ts`](src/handler/greet.ts) | Example handler using `getFieldValue` |

## Install in Stream Kit

1. Open the Plugins page in the app.
2. Click **Install plugin** or, in developer mode, **Link dev plugin** and select `manifest.json`.
3. For zip distribution, select your `plugin.zip`.
4. Enable the plugin from the plugin card.
5. For local development, enable **Dev mode** on the plugin card after running the plugin's own `pnpm dev` command.

Installed plugins start disabled until you enable them manually.
