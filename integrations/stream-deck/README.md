# Stream Kit — Stream Deck plugin

Elgato Stream Deck plugin that connects to Stream Kit’s inbound WebSocket API Server.

## Prerequisites

- Stream Deck 6.9+ (Node.js plugin host)
- Stream Kit with **Settings → API Server** enabled and an access token
- Stream Kit **Stream Deck** plugin enabled (for triggers, button registry, and feedback handlers)
- Optional: `@elgato/cli` globally (`npm i -g @elgato/cli`) for link/restart

## Develop

```bash
pnpm install
pnpm --filter @stream-kit/streamdeck-plugin build
pnpm --filter @stream-kit/streamdeck-plugin link
pnpm --filter @stream-kit/streamdeck-plugin watch
```

Or after installing the CLI:

```bash
cd integrations/stream-deck
pnpm build
streamdeck link app.stream-kit.streamdeck.sdPlugin
pnpm watch
```

## Configure

1. In Stream Kit: enable API Server, copy the token.
2. In Stream Deck: add **Stream Kit → Run Action** (or Toggle / Dial).
3. In the Property Inspector: paste host (`127.0.0.1`), port (`7892`), and token.
4. Set the Stream Kit **Action ID** (numeric id from Actions) and optional **Alias**.

## Actions

| Action | Purpose |
| --- | --- |
| Run Action | `actions.runById` on keyDown + report key events |
| Toggle Action | Alternate two action ids and flip key state |
| Dial Control | Report dial/touch events; optional action on rotate/push |

Feedback from Stream Kit handlers (`Set Title`, `Set Image`, …) arrives via `plugin:stream-deck.*` events.
