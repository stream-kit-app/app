# Dashboard

The Dashboard is the home page of Stream Kit (`/`). It shows a customizable grid of widgets that summarize app state after boot completes.

Source: `packages/app/src/routes/+page.svelte`  
Components: `packages/app/src/lib/components/core/dashboard/`  
Architecture: [widgets.md](widgets.md)

## Layout

The dashboard is a **4-column CSS grid**. Each widget spans 1–4 columns. Order (`sort_order`) and width (`columns`) are persisted in SQLite (`dashboard_widgets`). Widgets flow left-to-right, top-to-bottom in sort order.

## Edit mode

Use **Customize** in the page header to:

- Drag widgets by the handle to reorder (via `@dnd-kit-svelte`)
- Set widget width with the column selector (1–4)
- Remove widgets from the dashboard
- Add widgets with **Add widget** (lists definitions from enabled plugins and app built-ins)

Outside edit mode, the grid is static (no drag).

## Default widgets

On first launch, the dashboard is seeded with:

| Widget | Source | Columns |
|--------|--------|---------|
| Actions | `app:stat-actions` | 1 |
| Plugins | `app:stat-plugins` | 1 |
| Commands | `bot:commands` | 1 |
| Log entries | `core:logs` | 1 |
| Connections | `app:connections` | 2 |
| Plugin status | `app:plugin-status` | 2 |
| Collections | `core:collections` | 4 |

## Widget content

### App built-ins

- **Actions / Plugins** — stat cards with links to `/actions` and `/plugins`
- **Connections** — Twitch, YouTube, OBS, and WebSocket status
- **Plugin status** — read-only plugin list with configuration badges

### Core plugin

- **Log entries** — count with link to `/logs`
- **Maps** — full map management (create, edit, delete)

### Bot plugin

- **Commands** — command count and timer subtitle

When a plugin is disabled, its widgets show “Widget unavailable” but remain on the layout until removed.

## Reactivity

Widget components subscribe to plugin APIs and core services where needed (connections, logs, collections). Stats read from `app.actions` and `app.plugins` on each render cycle.

## i18n

All user-facing strings use the app i18n system (`en` / `nl`). Translation keys live in `packages/app/src/lib/locales/`.
