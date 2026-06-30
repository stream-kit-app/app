# Dashboard Widgets

Stream Kit separates **widget definitions** (what a plugin or the app can offer) from **widget instances** (what the user placed on the dashboard).

## Definitions

Plugins register widgets on their `PluginRegistration` object:

```ts
widgets: [
  {
    key: 'commands',
    title: 'Commands',
    icon: 'ri:robot-2-line',
    columns: 1,
    view: 'commands-widget'
  }
],
customViews: {
  'commands-widget': CommandsWidget
}
```

Each widget references a `customViews` entry. The Svelte component receives `{ app: PluginAppApi }` as props (`PluginWidgetProps`). Render **body content only** — the app provides the widget card shell (border, header with `title` / `icon` / `description` from registration). Do not add your own page-level headings or outer card wrappers.

Definition IDs use the format `{source}:{key}`:

| Source | Example ID |
|--------|------------|
| App built-ins | `app:connections` |
| Plugin | `core:collections`, `bot:commands` |

Built-in widgets are registered from the app layer in [`register-builtin-widgets.ts`](../../packages/app/src/lib/core/dashboard/register-builtin-widgets.ts). Cross-plugin widgets (connections, stats) live in the app; core-owned features (collections, logs) live in the Core plugin.

## Instances

When a user adds a widget to the dashboard, an instance row is stored in SQLite (`dashboard_widgets`):

| Column | Description |
|--------|-------------|
| `definition_id` | e.g. `core:collections` |
| `columns` | Width span: 1–4 in a 4-column grid |
| `sort_order` | Position in the layout (0-based) |

On first boot with an empty table, a default layout is seeded to match the previous hardcoded dashboard.

## Runtime

- [`Dashboard`](../../packages/app/src/lib/core/dashboard/dashboard.svelte.ts) on `app.dashboard` holds definitions and instances.
- Plugins register definitions in `RegisteredPlugin.registerDefinitions()` when enabled.
- The dashboard page renders a 4-column CSS grid with drag-and-drop reordering in edit mode (`@dnd-kit-svelte`).
- Every widget is wrapped in an app-owned card shell (`dashboard-widget-card.svelte`) with a fixed border, header (title, icon, optional description from the widget definition), and body. Plugin components render **only** inside the body; they must not provide their own page-level titles or outer card chrome.

## Edit mode

Toggle **Customize** on the home page to:

- Drag widgets to reorder
- Change column width (1–4)
- Remove widgets
- Add widgets from available definitions (enabled plugins + built-ins)

Disabled plugins keep placed widgets visible with an “unavailable” state; they are hidden from the add-widget list.

## Related docs

- [Dashboard](dashboard.md) — user-facing overview
- [Plugin Authoring API](../plugins/api.md) — `widgets` registration
