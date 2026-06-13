# Plugin Authoring API

External plugins import their public contract from `@stream-kit/plugin`.

Runtime helpers such as `getFieldValue`, `interpolateVariables`, and `parseCommand` come from `@stream-kit/core`.

## Package imports

```ts
import type {
	Plugin,
	PluginAppApi,
	PluginCustomViewProps,
	HandlerDefinitionProps,
	TriggerDefinitionProps,
	Action,
	ActionTrigger
} from '@stream-kit/plugin';

import { getFieldValue, interpolateVariables } from '@stream-kit/core';
```

`@stream-kit/app/api` remains available as a compatibility alias inside the app, but new plugins should use `@stream-kit/plugin`.

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

The app host dynamically imports the plugin entry from the installed manifest and calls `app.use(...)` internally.

## Persistence with PluginStore

Most plugins should persist data through the lifecycle `store` (`PluginStore`), backed by `plugin.{key}.json`:

```ts
onLoad: async ({ store }) => {
	const saved = await store.get<MySettings>('settings');
	if (saved) hydrate(saved);
},
onSave: async ({ store }) => {
	await store.set('settings', getSnapshot());
}
```

Use `store.get`, `store.set`, and `store.delete` for settings, lists, and other plugin-owned state. You do not need SQLite unless you have a specific reason to use `app.db`.

## Lifecycle hooks

| Hook | When it runs |
|------|----------------|
| `onLoad` | After settings are hydrated from the plugin store during startup |
| `onEnable` | When the plugin is enabled and dependencies are satisfied (startup and manual toggle) |
| `onReady` | After all plugins have enabled and actions are loaded |
| `onDisable` | When the plugin is disabled |
| `onSave` | After plugin settings are written to the store |

Use `onEnable` to start services and connect to external systems. Use `onReady` for work that depends on the full app (for example auto-connect after actions load).

## Host-provided modules

Plugin bundles must externalize host modules:

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

At runtime the app injects an import map:

- `@stream-kit/plugin` → `/plugin-host/plugin.js`
- `@stream-kit/plugin/action` → `/plugin-host/action.js`
- `@stream-kit/core` → `/plugin-host/core.js`
- `svelte` → `/plugin-host/svelte.js`
- `svelte/*` → `/plugin-host/svelte/*`
- `@stream-kit/ui/*` → `/plugin-host/@stream-kit/ui/*` (all Svelte exports from `@stream-kit/ui`, generated automatically)
- `@iconify/svelte` → `/plugin-host/@iconify/svelte.js`

`@stream-kit/ui` subpaths, vendor stubs, and the runtime import map are generated from `packages/ui/package.json` by `packages/app/plugin-host-config.mjs` when you run `pnpm build:plugin-host` or `pnpm sync:plugin-host`. Add new UI components by exporting them from `@stream-kit/ui`; no manual import-map entries are required.

To exclude a subpath from the plugin host (for example internal-only exports), add it to `PLUGIN_HOST_UI_EXCLUDED_SUBPATHS` in `plugin-host-config.mjs`.

Action form components and utilities are bundled at build time via aliases (monorepo first-party plugins only):

- `@stream-kit/plugin/action-ui/*` → app action components
- `@stream-kit/plugin/utils` → app `cn()` helper

## Custom plugin pages

Lifecycle hooks receive `app: PluginAppApi`. Custom Svelte views receive the same API as a prop.

Plugin Svelte components are compiled against the plugin-host runtime. The app mounts them with `mount()` from `/plugin-host/svelte.js` instead of rendering them as child components in the main Svelte tree.

```svelte
<script lang="ts">
	import type { PluginCustomViewProps } from '@stream-kit/plugin';

	let { app, title, description }: PluginCustomViewProps = $props();
	const t = app.i18n.t;
</script>
```

### i18n

```ts
app.i18n.t('Commands'); // in Svelte templates/components
app.i18n.translate('Saved'); // in .ts modules
```

### Actions and modals

```ts
const handler = app.actions.findHandler('send-message');
const handlers = app.actions.getHandlers();

const modal = app.modal.get('edit-item') ?? app.modal.create({ ... });
```

### Plugin settings store from a customView

```ts
const context = app.plugins.getSettingsContext('bot');
await context?.store.set('key', value);
```

## Manifest contract

Every plugin needs a stable manifest `key`:

```json
{
	"key": "hello-world",
	"name": "Hello World",
	"version": "0.1.0",
	"entry": "dist/index.js"
}
```

See [Plugin Development](./development.md) for the full workflow.
