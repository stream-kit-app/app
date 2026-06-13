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

- Use `import type` from `@stream-kit/plugin` or `@stream-kit/app-types` for plugin types.
- Use `@stream-kit/core` for runtime helpers such as `getFieldValue`, `resolveFieldText`, `interpolateVariables`, and `parseCommand`.
- Register plugin menu pages with declarative page definitions from `@stream-kit/plugin`.
- Do not pass Svelte components, compiled HTML, raw HTML, or `{@html}` for **external zip** plugin menu pages.
- Built-in npm plugins may register `customViews` with Svelte components; zip plugins must stay blocks-only.
- Button blocks may define an `onClick` handler when they need plugin-owned behavior.
- Bundle all other runtime dependencies into `dist/index.js`.
- Set a stable `key` in `manifest.json`. Stream Kit uses that key for install paths, settings, and dependencies.
- Menu item keys, form keys, and handler/trigger ids are generated and scoped by Stream Kit.

## Declarative menu page example

```ts
import type { Plugin } from '@stream-kit/plugin';

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

## Handler context

Handlers receive a single `HandlerTriggerContext` object:

```ts
import type { HandlerDefinitionProps } from '@stream-kit/plugin';

export const createGreetHandler = (): HandlerDefinitionProps => ({
	name: 'Greet chatter',
	execute: (_action, handler, context) => {
		const data = context.data as { user?: string };
		console.info(`Hello ${data.user ?? 'there'} (trigger: ${context.trigger})`);
	}
});
```

Script handlers receive an array. The platform wraps the context automatically when running user scripts:

```ts
export default (context: HandlerTriggerContext[]) => {
	const [{ trigger, data }] = context;
};
```

## Install in Stream Kit

1. Open the Plugins page in the app.
2. Click **Install plugin** or, in developer mode, **Link dev plugin** and select `manifest.json`.
3. For zip distribution, select your `plugin.zip`.
4. Enable the plugin from the plugin card.
5. For local development, enable **Dev mode** on the plugin card after running the plugin's own `pnpm dev` command.

Installed plugins start disabled until you enable them manually.
