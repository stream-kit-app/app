# Actions

User-configured actions are managed on the **Actions** page (`/actions`) in the app.

## Groups

Each action belongs to a **group** (default: `default`). Groups are shown as sections on the Actions page. Set or change a group in the action editor.

## Reordering

On the Actions page you can drag items to change layout:

| Drag target | Effect |
|-------------|--------|
| Action handle (left of the row) | Reorder within a group, or move the action into another group |
| Group handle (left of the group heading) | Reorder entire group sections |

In the action editor, triggers and handlers can be reordered with the drag handle on each row. Handler order is the execution order when an action runs.

Order is stored in the local database (`group_sort_order`, `sort_order`) and persists across restarts.

When you change an action’s group in the editor, it is placed at the end of that group.

## Related docs

- [Handlers](./handlers.md) — handler chains inside an action
- [Triggers](./triggers.md) — what starts an action
- [Schedule triggers](./schedule-triggers.md) — time-based triggers
- [Variables](./variables.md) — interpolation in handler fields
