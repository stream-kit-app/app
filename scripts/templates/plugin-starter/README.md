# Stream Kit Plugin Starter

Starter project for building installable [Stream Kit](https://stream-kit.app) plugins.

## Quick start

1. Install dependencies:

```bash
pnpm install
```

2. Update `manifest.json` with your plugin `key`, `name`, and `version`.

3. Start from [`src/minimal.ts`](src/minimal.ts) for a short reference plugin, or keep [`src/index.ts`](src/index.ts) for the full declarative page block showcase.

4. Develop with hot rebuild:

```bash
pnpm dev
```

5. Link the plugin in Stream Kit:

   - Open **Plugins**, enable **Developer mode**
   - Click **Link dev plugin** and select this folder's `manifest.json`
   - Enable the plugin and turn on **Dev mode** on the plugin card

6. Build a distributable zip:

```bash
pnpm package
```

The zip is written to `dist/plugin.zip`.

## Documentation

- [Plugin getting started](https://docs.stream-kit.app/developers/plugin-getting-started)
- [Plugin authoring API](https://docs.stream-kit.app/developers/plugin-api)
- [Installing plugins](https://docs.stream-kit.app/developers/installing-plugins)

## Authoring rules

| Import from | Use for |
|-------------|---------|
| `@stream-kit/plugin` (type-only) | `Plugin`, `PluginAppApi`, handler/trigger definitions, settings schema |
| `@stream-kit/plugin` (value) | `BaseDirectory`, `SeekMode` |
| `@stream-kit/core` | Runtime helpers: `getFieldValue`, `interpolateVariables`, `parseCommand`, cron helpers |
| `@stream-kit/ui` (optional) | Svelte components for custom views and dashboard widgets (built-in-style plugins only) |

- Never import `@tauri-apps/*` in plugin code. Use `app.fs`, `app.process`, and other `PluginAppApi` surfaces instead.
- Register plugin menu pages with declarative page definitions from `@stream-kit/plugin`.
- External zip plugins must use declarative blocks only (no custom Svelte views).
- Bundle all other runtime dependencies into `dist/index.js`.
- Externalize host modules (`@stream-kit/plugin`, `@stream-kit/core`, `svelte`, `@stream-kit/ui`, …).

### Custom Svelte views (optional)

Zip plugins use declarative page blocks only. If you build a **built-in-style** plugin with custom Svelte views or dashboard widgets, add the UI package as a dev dependency:

```bash
pnpm add -D @stream-kit/ui@^{{SDK_UI_VERSION}}
```

At runtime Stream Kit resolves `@stream-kit/ui` from the plugin host import map. **Do not bundle** it into `dist/index.js`. Match the UI package version to the Stream Kit app version you target.

## Zip layout

```text
plugin.zip
├── manifest.json
└── dist/
    └── index.js
```

## License

MIT — see [LICENSE](LICENSE).
