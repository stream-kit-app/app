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

Open an overlay from the list to edit `App.svelte` and `context.json` in CodeMirror. The Svelte editor combines `codemirror-lang-svelte` syntax highlighting with an in-browser language server (LSP) for diagnostics, autocomplete, and hover info for Svelte syntax and `@stream-kit/overlay-sdk` imports. The virtual workspace includes Svelte 5 rune types (`$state`, `$derived`, etc.) and a `svelte.config.js` with `runes: true`.

Use **Save & build** to compile changes. The preview iframe refreshes from the local overlay server.

## Overlay project structure

Each overlay is stored under app data:

```
overlays/<id>/
  manifest.json
  context.json
  src/App.svelte
  dist/
    index.html
    main.js
    app.compiled.js
    overlay.css
```

- **manifest.json** — metadata (name, size, expected events)
- **context.json** — static context injected as `window.__OVERLAY_CONTEXT__`
- **src/App.svelte** — your overlay UI and event handlers
- **dist/** — build output served to OBS

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

| Field | Description |
|-------|-------------|
| Overlay | Target overlay instance |
| Event | Handler name in your overlay (e.g. `message`, `alert`) |
| Payload | Optional JSON with `{variable}` interpolation; leave empty to send full trigger data |

Example: Twitch **Chat Message** trigger → **Send to Overlay** (event `message`) → chat overlay `handlers.message`.

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

| Template | Events | Purpose |
|----------|--------|---------|
| blank | `event` | Minimal starter |
| chat | `message`, `clear` | Chat message list |
| alert | `alert`, `clear` | Temporary alert popup |

## Related documentation

- [Actions](./actions.md)
- [Variables](./variables.md)
- [Handlers](./handlers.md)
