# Stream Kit Plugin Template

Boilerplate for building installable Stream Kit plugins.

## Quick start

1. Copy this folder to a new plugin project.
2. Update `manifest.json` and `src/index.ts`.
3. Install dependencies from the monorepo root with `pnpm install`.
4. Develop with hot rebuild:

```bash
pnpm --filter @stream-kit/plugin-template dev
```

5. Build a distributable zip:

```bash
pnpm --filter @stream-kit/plugin-template package
```

The zip is written to `packages/plugin-template/dist/plugin.zip`.

## Zip layout

```text
plugin.zip
├── manifest.json
└── dist/
    └── index.js
```

## Authoring rules

- Use `import type` from `@stream-kit/app/api` for plugin types.
- Use `@stream-kit/core` for handler/trigger prop types and `interpolateVariables`.
- Bundle all other runtime dependencies into `dist/index.js`.
- Keep `manifest.json` `key` in sync with the `key` returned by your plugin factory.
- Do not use built-in plugin keys such as `twitch` or `tts`.

## Install in Stream Kit

1. Open the Plugins page in the app.
2. Click **Plugin installeren**.
3. Select your `plugin.zip`.
4. Enable the plugin from the plugin card.

Installed plugins start disabled until you enable them manually.
