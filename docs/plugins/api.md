# Plugin Authoring API

External plugins import their public contract from `@stream-kit/plugin`.

**First plugin?** See [Plugin getting started](./getting-started.md).

## Import conventions

| Need | Package | Notes |
|------|---------|-------|
| Types (`Plugin`, `PluginAppApi`, definitions) | `@stream-kit/plugin` | Use `import type` |
| Runtime helpers (`getFieldValue`, `parseCommand`, cron) | `@stream-kit/core` | Preferred for helpers |
| `BaseDirectory`, `SeekMode` | `@stream-kit/plugin` | Required for `app.fs` options |
| Platform features | `app` (`PluginAppApi`) | Filesystem, toast, process, hotkeys, action queues, audio, store |

Never import `@tauri-apps/*` in plugin code.

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

## Definition IDs

Trigger and handler definitions receive a stable ID when they are registered. IDs are derived from the plugin manifest `key` and slugified definition names along the tree path, for example:

- `twitch:twitch:chat:chat-message`
- `core:core:map:get-value`

These IDs are persisted in saved actions. They stay the same across app restarts, plugin load order, and plugin reloads.

Optional explicit IDs:

```ts
{
	id: 'chat-message',
	name: 'Chat Message',
	// ...
}
```

When `id` is set on a definition, it is appended to the parent scope (`twitch:chat:chat-message` if the parent scope is `twitch:chat`). Use explicit IDs only when two siblings would slugify to the same value.

Legacy actions that still reference old index-based IDs (for example `twitch:twitch-4:chat-1:chat-message-1`) are migrated automatically on startup.

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

## Filesystem (`app.fs`)

Plugins access the filesystem through `app.fs`. Import `BaseDirectory` from `@stream-kit/plugin` for relative paths:

```ts
import { BaseDirectory } from '@stream-kit/plugin';

await app.fs.mkdir('logs', { baseDir: BaseDirectory.AppData, recursive: true });

const text = await app.fs.readTextFile('config.json', {
	baseDir: BaseDirectory.AppConfig
});

await app.fs.writeTextFile('logs/events.log', line, {
	baseDir: BaseDirectory.AppData,
	append: true
});
```

`app.fs` also supports directory listing, file handles (`open` / `create`), copying, renaming, watching, and native file/folder pickers via `app.fs.select`.

See [Plugin getting started](./getting-started.md#filesystem-appfs) for common `BaseDirectory` values and zip plugin constraints.

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

## Plugin updates

Optional manifest fields for self-hosted updates:

- `updateManifestUrl` — HTTPS URL to the published manifest
- `downloadUrl` — HTTPS URL to the zip for this version (required in the remote manifest used for updates)
- `sha256` — optional zip integrity check

See [updates.md](./updates.md) for the author workflow.

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

## Dashboard widgets

Plugins can register dashboard widgets alongside menu pages. Widgets reuse `customViews` for their Svelte components.

```ts
import type { Plugin, PluginWidgetProps } from '@stream-kit/plugin';

const plugin: Plugin = (app) => ({
  name: 'My Plugin',
  customViews: {
    'my-widget': MyWidget
  },
  widgets: [
    {
      key: 'my-widget',
      title: 'My Widget',
      description: 'Optional subtitle in the add-widget dialog',
      icon: 'ri:layout-grid-line',
      columns: 2, // default width: 1 | 2 | 3 | 4
      view: 'my-widget'
    }
  ]
});
```

Widget components receive `PluginWidgetProps`:

```svelte
<script lang="ts">
  import type { PluginWidgetProps } from '@stream-kit/plugin';

  let { app }: PluginWidgetProps = $props();
  const t = $derived(app.i18n.t);
</script>
```

Users place widget instances on the dashboard from the app UI. Layout (order and column width) is persisted in SQLite. See [widgets.md](../core/widgets.md).

### Actions and modals

```ts
const handler = app.actions.findHandler('send-message');
const handlers = app.actions.getHandlers();

const modal = app.modal.get('edit-item') ?? app.modal.create({ ... });
```

### Global hotkeys (`app.hotkeys`)

Register system-wide keyboard shortcuts (desktop only, via Tauri global-shortcut):

```ts
const unsubscribe = app.hotkeys.register('Shift+P', (context) => {
  console.log(context.shortcut, context.modifiers, context.key);
});

unsubscribe();
```

Returns an unsubscribe function. If the shortcut is already taken by another application, registration fails gracefully and a warning toast is shown.

### Action queues (`app.actionQueues`)

Control and observe action execution queues:

```ts
app.actionQueues.pause(queueId);
app.actionQueues.resume(queueId);

const stats = app.actionQueues.stats(queueId);

const unsubscribe = app.actionQueues.on('job_started', (context) => {
  console.log(context.queueName, context.job?.actionName);
});
```

Events: `paused`, `resumed`, `idle`, `job_enqueued`, `job_started`, `job_completed`.

Read `app.actionQueues.definitions` for the list of configured queues.

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

## Handler field types

Handler definitions can include a `fields` array. Common field types include `text`, `select`, `combobox`, `select-file-or-folder`, `checkbox`, `switch`, `code`, and `key-value-list`.

### `one-of` (tabbed input)

Use `one-of` when the user should pick **one of several input methods** for the same logical value (for example a file path typed manually vs chosen with a file picker).

```ts
{
	type: 'one-of',
	name: 'Media file',
	required: true,
	defaultVariant: 'path',
	variants: [
		{
			id: 'path',
			label: 'Path',
			field: {
				type: 'text',
				name: 'Path',
				placeholder: 'C:/Videos/clip.mp4'
			}
		},
		{
			id: 'file',
			label: 'File',
			field: {
				type: 'select-file-or-folder',
				mode: 'file',
				name: 'File'
			}
		}
	]
}
```

Stored value shape:

```ts
{
	variant: 'path',
	values: {
		path: 'C:/Videos/clip.mp4',
		file: ''
	}
}
```

Inactive variant values are preserved when switching tabs. Validation applies to the **active** variant only.

Read values in handler `execute` with:

```ts
import { getOneOfFieldValue, resolveOneOfFieldText } from '@stream-kit/core';

const oneOf = getOneOfFieldValue(handler.fields, 'media-file');
const filePath = resolveOneOfFieldText(handler.fields, 'media-file', context, toVariables);
```

#### Legacy migration

When replacing multiple flat fields with a single `one-of`, use `migrateFrom` so existing saved actions keep their values:

```ts
migrateFrom: [
	{
		keys: ['media-file-path', 'media-file'],
		variantMap: {
			'media-file-path': 'path',
			'media-file': 'file'
		}
	}
]
```

Nested `one-of` fields inside variants are not supported in v1.

## Command parsing

`@stream-kit/core` exposes helpers for chat command names and argument patterns:

```ts
import {
	matchCommandPattern,
	parseCommand,
	parseCommandMessage,
	enrichChatMessageWithCommand,
	hasCommandArgPlaceholders,
	extractCommandArgNames,
	RESERVED_COMMAND_ARG_NAMES
} from '@stream-kit/core';

// First token only (legacy)
parseCommand('!setalias CoolUser'); // "setalias"

// Full pattern match with arguments
matchCommandPattern('setalias <target>', '!setalias CoolUser');
// { command: "setalias", args: { target: "CoolUser" } }

// Enrich trigger context from saved Command conditions
enrichChatMessageWithCommand(chatContext, trigger.conditions);
```

Patterns use `<argName>` placeholders. The last placeholder is greedy and captures the rest of the message. Use `{argName}` in handler text fields via `interpolateVariables`.
