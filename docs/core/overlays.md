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

## Editing overlays

Stream Kit does not include an in-app code editor. Use **Open in editor** to open the overlay project in Cursor or VS Code.

If no local editor is installed, Stream Kit opens the project folder in your file manager, copies the path to the clipboard, and opens [vscode.dev](https://vscode.dev) in your browser. Because of browser security, vscode.dev cannot open a local path automatically — open the folder manually or drag it into the browser window (Chrome and Edge).

Use **Open folder** to open the project directory at any time, **Build** to run `pnpm install` (if needed) and `pnpm run build` from the app, or **Download ZIP** to export a standalone copy of the project (without `dist/` or Stream Kit `manifest.json`).

## Overlay project structure

Each overlay is stored under app data:

```
overlays/<id>/
  manifest.json       # Stream Kit metadata (not included in ZIP export)
  README.md
  package.json        # framework overlays only
  vite.config.ts      # framework overlays only
  .env                # VITE_OVERLAY_ID for framework overlays
  src/                # framework source
  dist/               # served to OBS (build output or vanilla files)
```

- **manifest.json** — name, framework, expected events
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
| Event   | Handler name in your overlay code (e.g. `message`, `alert`)                          |
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
