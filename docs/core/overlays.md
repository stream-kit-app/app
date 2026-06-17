# Overlays

Stream Kit includes a local overlay server for OBS browser sources. Overlays are Svelte projects stored in app data, editable in the app, and served at `http://127.0.0.1:<port>/o/<overlay-id>/`.

## OBS browser source setup

1. Open **Overlays** in the app and create an overlay from a template.
2. Click **Save & build** in the editor so the overlay is compiled to static files.
3. Copy the browser source URL from the overlays list or editor.
4. In OBS, add a **Browser** source and paste the URL.
5. Set width and height to match the overlay dimensions shown in the app.

The overlay server starts automatically when the app boots (default port `7891`). You can stop or restart it from the Overlays page.

## Editing overlays

Open an overlay from the list to edit `App.svelte` and additional source files in CodeMirror. Use the **+** button next to the file tabs to add components or modules (`.svelte`, `.svelte.ts`, `.ts`, or `.json`). New files start as an unnamed tab—type a file name and press Enter to create the file. Import custom files from `App.svelte` with relative paths.

Follow the standard TypeScript/Svelte import convention so imports resolve in both the editor and the build:

- Svelte components keep the `.svelte` extension: `import Counter from './Counter.svelte'`.
- TypeScript modules are imported **without** the `.ts` extension: `import { test } from './test'` (not `./test.ts`).

> Use extensionless relative imports for TypeScript modules (for example `import { test } from './test'`, not `./test.ts`). This matches how the overlay bundler resolves modules.

The editor and preview are shown side by side in resizable panels; drag the handle between them to adjust the split. Your panel sizes are remembered between sessions. The overlay editor uses CodeMirror with syntax highlighting, bracket matching, code folding, find-in-file (`Ctrl+F`), JSON parse diagnostics, and Prettier formatting. Changed files are formatted automatically on autosave; you can also format manually with `Shift+Alt+F` or the toolbar **Format** button.

Changes autosave and rebuild automatically. The preview iframe refreshes from the local overlay server. While editing, the preview pane includes a docked **Console** at the bottom that shows build errors and `console.log` / `console.warn` / `console.error` output from the running overlay preview (captured only when the overlay runs inside the editor iframe, not in OBS).

Adding, renaming, or deleting a file rebuilds immediately, so newly created files become importable and the preview updates without a manual page refresh.

### Open in editor

Use **Open in editor** in the editor header to open the overlay project folder in Cursor or VS Code. The on-disk project matches **Download ZIP** (Vite, TypeScript, vendored `@stream-kit/overlay-sdk`, and all source files). Pending changes are saved before the folder opens.

Run `pnpm install` and `pnpm run dev` in that folder to preview with live events while Stream Kit is running. The scaffold sets your overlay id in `index.html` and proxies `/ws` to the local overlay server (default port 7891).

### Download as ZIP

Use **Download ZIP** in the editor header to export the overlay as a standalone, runnable Svelte project (Vite + Svelte + TypeScript). The archive is built from the same on-disk project files. After unzipping, run `npm install` and `npm run dev` to preview the overlay on its own.

## Overlay project structure

Each overlay is stored under app data:

```
overlays/<id>/
  manifest.json
  package.json
  vite.config.ts
  svelte.config.js
  tsconfig.json
  index.html
  README.md
  vendor/
    overlay-sdk/
  src/
    App.svelte
    main.ts
    …custom files…
  dist/
    index.html
    main.js
    app.compiled.js
    overlay.css
```

- **manifest.json** — Stream Kit metadata (name, size, expected events); not included in ZIP export
- **package.json**, **vite.config.ts**, etc. — standalone Vite project scaffold (same as ZIP export). `vite.config.ts` proxies `/ws` to the overlay server; `index.html` includes `window.__OVERLAY_CONTEXT__.overlayId` for external dev
- **src/** — overlay source edited in the app (entry is always `App.svelte`)
- **dist/** — OBS build output served to the overlay server; not included in ZIP export

## Overlay SDK

User overlays import `@stream-kit/overlay-sdk` (served at `/overlay-sdk/index.js`).

```typescript
import { createOverlay } from '@stream-kit/overlay-sdk';

createOverlay({
  handlers: {
    message: (payload) => {
      // handle action events
    }
  }
});
```

`createOverlay`:

- Reads `window.__OVERLAY_CONTEXT__` for `overlayId` and static `context`
- Connects to `ws://127.0.0.1:<port>/ws?overlayId=<id>`
- Routes WebSocket messages to named handlers
- Reconnects automatically if the connection drops

## Sending events from actions

Use the built-in **Overlay → Send to Overlay** handler in the action editor:

| Field   | Description                                                                          |
| ------- | ------------------------------------------------------------------------------------ |
| Overlay | Target overlay instance                                                              |
| Event   | Handler name in your overlay (e.g. `message`, `alert`)                               |
| Payload | Optional JSON with `{variable}` interpolation; leave empty to send full trigger data |

Example: Twitch **Chat Message** trigger → **Send to Overlay** (event `message`) → chat overlay `handlers.message`.

Use `{msg}` in the payload to pass the full Twitch chat message object (JSON). The shape is typed as `TwitchChatMessage` in `@stream-kit/core` — import it in overlay code for autocomplete and validation.

```json
{
	"message": "Hello Kappa",
	"badges": [
		{
			"id": "subscriber",
			"version": "12",
			"url": "https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/3"
		}
	],
	"emotes": [
		{
			"id": "425618",
			"positions": ["6-10"],
			"url": "https://static-cdn.jtvnw.net/emoticons/v2/425618/default/dark/3.0"
		}
	],
	"userInfo": {
		"displayName": "Viewer",
		"color": "#9147FF"
	}
}
```

Badge URLs are resolved via the Twitch API when you connect (IRC only provides badge set + version, not the CDN path). Emote URLs use Twitch's v2 CDN format. Third-party emotes (BTTV, FFZ, 7TV) are not included.

## WebSocket event format

```json
{
	"overlayId": "twitch-chat",
	"event": "message",
	"payload": { "username": "viewer", "message": "Hello!" },
	"timestamp": 1718380800000
}
```

## Templates

Built-in starter templates:

| Template | Events             | Purpose               |
| -------- | ------------------ | --------------------- |
| blank    | `event`            | Minimal starter       |
| chat     | `message`, `clear` | Chat message list     |
| alert    | `alert`, `clear`   | Temporary alert popup |

## Related documentation

- [Actions](./actions.md)
- [Variables](./variables.md)
- [Handlers](./handlers.md)
