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

## Cloning

You can duplicate actions, triggers, and handlers:

| Location | What it does |
|----------|--------------|
| Clone button on an action row | Opens a pre-filled draft named “Copy of …”. Save to create the new action. |
| Clone button in the action editor footer | Same as above while editing an existing action. |
| Clone button on a trigger or handler row | Inserts a copy directly after that item in the chain. Save the action to persist. |

Cloned triggers and handlers receive new instance IDs. Their configuration (conditions, field values) is deep-copied from the source.

## Related docs

- [Handlers](./handlers.md) — handler chains inside an action
- [Triggers](./triggers.md) — what starts an action
- [Schedule triggers](./schedule-triggers.md) — time-based triggers
- [Variables](./variables.md) — interpolation in handler fields
