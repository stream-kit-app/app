# Dashboard

The Dashboard is the home page of Stream Kit (`/`). It provides a read-only overview of the app state after boot completes.

Source: `packages/app/src/routes/+page.svelte`  
Components: `packages/app/src/lib/components/core/dashboard/`

## Overview

The Dashboard aggregates data from the global `app` singleton and plugin APIs. It does not expose configuration controls — use the **Plugins** page or plugin-specific pages (for example Bot → Overview) to change settings.

## Sections

### Stat cards

| Card | Data source | Link |
|------|-------------|------|
| Actions | Enabled count / total from `app.actions.items` | `/actions` |
| Plugins | Configured count / enabled total from `app.plugins.items` | `/plugins` |
| Commands | Bot command count; timers shown as subtitle | — |
| Log entries | Total entries from `CorePluginApi.logs` | `/logs` |

When the Bot plugin is unavailable, the Commands card shows `—` with a “Bot plugin unavailable” subtitle.

### Connections

Live status for:

- **Twitch** — `twitch.isConnected`
- **YouTube** — `youtube.isConnected` and optional Live badge
- **OBS** — connection state, connecting state, and version when connected
- **WebSocket** — connected count / total saved connections

### Plugin status

Compact read-only list of all registered plugins with enabled/disabled and configured/BROKEN/not configured badges. Mirrors the status logic from the Plugins page cards without toggles or configure actions.

## Reactivity

Plugin connection APIs and the core logs API expose `subscribe()` listeners. The Dashboard uses the same `$effect` + revision pattern as the Logs page and PluginCard so connection badges and log counts update in real time.

## i18n

All user-facing strings use the app i18n system (`en` / `nl`). Translation keys live in `packages/app/src/lib/locales/`.
