# Overlays

Stream Kit includes a local overlay server for OBS browser sources. Overlays are projects stored in app data, edited in your own code editor, and served at `http://127.0.0.1:<port>/o/<overlay-uuid>/`. Each overlay gets a stable UUID when created; the browser source URL and action handlers keep working when you rename the display name.

## OBS browser source setup

1. Open **Overlays** in the app and create an overlay. Choose a framework starter (Svelte, React, Vue, Preact, Solid, Lit, or plain HTML + JavaScript).
2. Click **Open in editor** and follow the project `README.md`:
   - Framework overlays: `pnpm install` then `pnpm run build`
   - Vanilla HTML overlays: ready immediately (files live in `dist/`)
3. Copy the browser source URL from the overlays list.
4. In OBS, add a **Browser** source and paste the URL.

The overlay server starts automatically when the app boots (default port `7891`) and keeps running while the app is open.

## Managing overlays

Rename an overlay from the edit button next to its name on the card. The overlay UUID, browser source URL, and **Send to Overlay** action references stay the same — only the display name and project README metadata are updated.

Use **Configure** on an overlay card to open its detail page: a live preview on the left and user settings on the right. Settings are saved per overlay instance in the app database; the schema is declared by the overlay author in `manifest.json`.

## Configure page and user settings

Each overlay can declare a JSON settings schema in `manifest.json`. Stream Kit renders those fields on the configure page (`/overlays/<id>`) using the same field types as plugin settings (text, switch, checkbox, select with static items, slider, and sections). Changes are saved automatically after a short debounce and pushed to the overlay preview via the `overlay:settings` WebSocket event.

User values are stored in the app database (`overlays.config`). Default values come from the manifest. When you bump `version` in the manifest, Stream Kit merges new fields without overwriting existing user values.

Omit `settings` or set `"settings": []` to have no user settings on the configure page. Svelte starter templates ship with example settings only at creation time; removing them from `manifest.json` is not overwritten when you reload the configure page.

Example manifest excerpt:

```json
{
	"version": 1,
	"settings": [
		{
			"type": "section",
			"title": "Appearance",
			"fields": [
				{ "type": "text", "key": "title", "name": "Title", "defaultValue": "Alerts" },
				{ "type": "slider", "key": "duration", "name": "Duration (s)", "min": 1, "max": 30, "defaultValue": 5 }
			]
		}
	],
	"testHandlers": [
		{ "label": "Fake follow", "event": "test:follow" },
		{ "label": "Fake chat", "event": "test:chat", "payload": { "username": "TestUser", "message": "Hello!" } }
	]
}
```

**JSON limitations:** manifest settings cannot use dynamic plugin-only field types (`button`, `alert`, `table`, `select-values`, combobox with dynamic items, or `visible` callbacks).

### Editor autocomplete

Each overlay project includes `overlay-manifest.schema.json` beside `manifest.json`. The manifest references it via:

```json
{
	"$schema": "./overlay-manifest.schema.json"
}
```

Open the overlay folder in VS Code or Cursor to get autocomplete, validation, and hover docs for settings fields, test handlers, and framework values. Stream Kit adds the schema file automatically when you open the configure page or create a new overlay.

The canonical schema lives in the repo at `packages/app/src/lib/core/overlay/overlay-manifest.schema.json`.

### Receiving settings in overlay code

When an overlay connects over WebSocket, Stream Kit sends the current user config immediately:

```json
{
	"overlayId": "<uuid>",
	"event": "overlay:settings",
	"payload": { "title": "Alerts", "duration": 5 },
	"timestamp": 1718380800000
}
```

The same event is broadcast again when settings change on the configure page (auto-saved after a debounce). Handle `overlay:settings` in your WebSocket handler map (see `src/overlay.ts` in framework starters).

Reserved event name: `overlay:settings` — do not use this name for custom action events.

## Plugin dependencies

Overlays can declare `requiredPlugins` in `manifest.json` — an array of plugin keys (same convention as plugin `dependencies`). When a required plugin is missing or disabled:

- The overlay is **unavailable**: broadcast and test mode are blocked until dependencies are satisfied.
- The overlays list and configure page show which plugins are missing or disabled.
- Availability recovers automatically when you install or enable the required plugins (no separate overlay toggle).

Example:

```json
{
	"requiredPlugins": ["core", "twitch"]
}
```

## Recommended action presets

Overlays cannot register trigger or handler code. Instead, authors can ship **action presets** under `actions` in `manifest.json`. Each preset describes a user action (trigger types + **Send to Overlay** handler fields) that the user can install from the configure page after confirming.

Preset rules:

- `actions[].key` — stable idempotency key; installed keys are tracked in the database so presets are not duplicated.
- `__overlay__` in the handler `overlay` field is replaced with the overlay UUID at install time.
- `conditions` on triggers are optional; omit for an empty root group.
- Do not use `overlay:settings` as a send event.

Example preset (Twitch chat → overlay):

```json
{
	"requiredPlugins": ["core", "twitch"],
	"actions": [
		{
			"key": "chat-to-overlay",
			"name": "Chat → Overlay",
			"enabled": true,
			"triggers": [
				{
					"triggerTypeId": "twitch:twitch:chat:chat-message"
				}
			],
			"handlers": [
				{
					"handlerTypeId": "overlay:overlay:send-to-overlay",
					"fields": [
						{ "key": "overlay", "value": "__overlay__" },
						{ "key": "event", "value": "chat:message" },
						{
							"key": "payload",
							"value": "{\"username\":\"{username}\",\"message\":\"{message}\"}"
						}
					]
				}
			]
		}
	]
}
```

Find trigger and handler type IDs in the action editor (hover/type picker) or in plugin documentation. The Svelte starter includes a sample preset using the Core hotkey trigger and `test:sample` event.

On the configure page, open **Recommended actions**, select presets, and click **Install recommended actions**. Installed presets remain tracked even if you delete the action later (use re-install by clearing `installed_action_keys` in the database or adding a new preset key).

## Test mode

Authors declare test buttons in `manifest.json` under `testHandlers`. Each entry has a `label`, an `event` name, and an optional `payload`. Stream Kit shows these buttons on the configure page; clicking one broadcasts the event to the overlay preview (and any connected OBS browser source).

Implement the corresponding handler in your overlay code. For example, a chat overlay might listen for `test:chat` and render a fake message; an alerts overlay might listen for `test:follow` and show a sample follow animation.

The Svelte starter includes example settings, a test handler, and demo handlers in `src/App.svelte`.

## Editing overlays

Stream Kit does not include an in-app code editor. Use **Open in editor** to open the overlay project in Cursor or VS Code.

If no local editor is installed, Stream Kit opens the project folder in your file manager, copies the path to the clipboard, and opens [vscode.dev](https://vscode.dev) in your browser. Because of browser security, vscode.dev cannot open a local path automatically — open the folder manually or drag it into the browser window (Chrome and Edge).

Use **Open folder** to open the project directory at any time, **Build** to run `pnpm install` (if needed) and `pnpm run build` from the app, or **Download ZIP** to export a portable copy of the project (includes `manifest.json`; excludes `dist/` and `node_modules/`).

## Importing overlays

On the **Overlays** page, click **Import overlay** and select a ZIP archive. The archive must contain `manifest.json` at the project root (or inside a single top-level folder). Stream Kit validates the manifest, extracts the project into app data, and registers the overlay in the database.

- If an overlay with the same id already exists, Stream Kit asks whether to replace it.
- User settings from a previous install are **not** included in the ZIP — imported overlays start with manifest default settings.
- Recommended action presets are **not** installed automatically; use the configure page to install them after import.
- Framework overlays show **Not built** until you run **Build** (exported ZIPs do not include `dist/`).

Round-trip workflow: **Download ZIP** from an overlay card, then **Import overlay** on the same or another machine.

## Overlay project structure

Each overlay is stored under app data:

```
overlays/<id>/
  manifest.json       # Stream Kit metadata (included in ZIP export)
  README.md
  package.json        # framework overlays only
  vite.config.ts      # framework overlays only
  .env                # VITE_OVERLAY_ID for framework overlays
  src/                # framework source
  dist/               # served to OBS (build output or vanilla files)
```

- **manifest.json** — name, framework, expected events, optional settings schema, test handlers, required plugins, and action presets
- **dist/** — static files served by the overlay server at `/o/<id>/`
- **Vanilla** overlays ship with `dist/index.html` and `dist/app.js` ready to use

## WebSocket connection

Overlays connect to Stream Kit with a raw WebSocket. No SDK is required.

```javascript
const OVERLAY_ID = 'my-overlay'; // set in .env as VITE_OVERLAY_ID or hardcoded in vanilla dist/app.js
const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
const ws = new WebSocket(`${protocol}//${location.host}/ws?overlayId=${OVERLAY_ID}`);

ws.onmessage = (event) => {
	const { event: name, payload } = JSON.parse(event.data);
	// handle event by name
};
```

During local development, `pnpm run dev` proxies `/ws` to the Stream Kit overlay server (default `http://127.0.0.1:7891`).

### WebSocket event format

```json
{
	"overlayId": "my-overlay",
	"event": "message",
	"payload": { "username": "viewer", "message": "Hello!" },
	"timestamp": 1718380800000
}
```

## Sending events from actions

Use the built-in **Overlay → Send to Overlay** handler in the action editor:

| Field   | Description                                                                          |
| ------- | ------------------------------------------------------------------------------------ |
| Overlay | Target overlay instance                                                              |
| Event   | Handler name in your overlay code (e.g. `message`, `alert`); combobox lists `expectedEvents` from the selected overlay |
| Payload | Optional JSON with `{variable}` interpolation; leave empty to send full trigger data |

Example: Twitch **Chat Message** trigger → **Send to Overlay** (event `message`) → your overlay handles `message` in its WebSocket `onmessage` handler.

## Framework starters

| Framework | Tooling            | OBS-ready after create |
| --------- | ------------------ | ---------------------- |
| Svelte    | Vite + Svelte 5    | After `pnpm build`     |
| React     | Vite + React       | After `pnpm build`     |
| Vue       | Vite + Vue         | After `pnpm build`     |
| Preact    | Vite + Preact      | After `pnpm build`     |
| Solid     | Vite + Solid       | After `pnpm build`     |
| Lit       | Vite + Lit         | After `pnpm build`     |
| Vanilla   | HTML + JavaScript  | Immediately            |

Each starter includes a minimal WebSocket listener for a sample `event` handler. Extend the connection logic in `src/overlay.ts` (framework overlays) or `dist/app.js` (vanilla).

## Build status

The overlays list shows **Ready** when `dist/index.html` exists, or **Not built** when you still need to run `pnpm build` (framework overlays only).

If OBS loads an overlay that is not built yet, the server returns a short HTML page with build instructions.

## Related documentation

- [Actions](./actions.md)
- [Variables](./variables.md)
- [Handlers](./handlers.md)
