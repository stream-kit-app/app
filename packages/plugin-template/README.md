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
- Register plugin menu pages with declarative page definitions from `@stream-kit/app/api`.
- Do not pass Svelte components, compiled HTML, raw HTML, or `{@html}` for plugin menu pages.
- Button blocks may define an `onClick` handler when they need plugin-owned behavior.
- Bundle all other runtime dependencies into `dist/index.js`.
- Stream Kit generates a unique installed plugin key from the manifest name and adds a suffix if needed.
- Menu item keys, form keys, and handler/trigger ids are generated and scoped by Stream Kit.

## Declarative menu page example

```ts
import type { Plugin } from '@stream-kit/app/api';

const plugin: Plugin = (app) => ({
	name: 'Hello World',
	menuItems: [
		{
			title: 'Hello World',
			icon: 'ri:hand-heart-line',
			children: [
				{
					title: 'Overview',
					page: {
						title: 'Overview',
						blocks: [
							{ type: 'text', text: 'Rendered by Stream Kit.' },
							{
								type: 'button',
								label: 'Show toast',
								onClick: () => app.toast.create({ title: 'Hello World' })
							}
						]
					}
				}
			]
		}
	]
});

export default plugin;
```

## Install in Stream Kit

1. Open the Plugins page in the app.
2. Click **Plugin installeren**.
3. Select your `plugin.zip`.
4. Enable the plugin from the plugin card.

Installed plugins start disabled until you enable them manually.
