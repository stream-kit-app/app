# Maps

The Core plugin provides named key-value maps, similar to JavaScript `Map`, with string keys and string values. Maps are created explicitly and can be session-only or persistent.

See also:

- [Handlers](./handlers.md) — map handler fields
- [Triggers](./triggers.md) — map triggers
- [Variables](./variables.md) — flat variables vs structured maps

## Lifetimes

| Lifetime | Storage | Duration |
|----------|---------|----------|
| **Session** | In-memory | App start until app closes |
| **Persistent** | `PluginStore` key `maps` | Survives restarts |

**Map names are globally unique.** A name can exist only once, either as a session map or as a persistent map — not both. Choose session or persistent only when creating a map with **Create map**. Other handlers select a map by name; the store resolves the lifetime automatically.

Maps must be created with the **Create map** handler before other operations. Other handlers show a dropdown of existing maps and fail with a warning toast when no map is selected or the map does not exist.

When a map is selected in a handler, use the map icon next to the **Map name** field to open a popover with all current key → value pairs.

## Handlers

All map handlers live under **Core → Map** in the action editor.

| Handler | Description |
|---------|-------------|
| Create map | Creates an empty map with the chosen lifetime |
| Set value | Upserts a key (creates or overwrites) |
| Update value | Updates an existing key only |
| Get value | Reads a value into an action variable |
| Has key | Writes `true` or `false` to an action variable |
| Delete key | Removes a single key |
| Clear map | Removes all keys but keeps the map |
| Delete map | Removes the map entirely |

Value fields support `{variable}` interpolation from trigger context, global variables, user variables, and action-scoped variables.

### Example: scoreboard

1. **Create map** — name `scores`, lifetime Session
2. **Set value** — map `scores`, key `{username}`, value `{score}`
3. **Get value** — map `scores`, key `player1`, target `player1Score`

## Triggers

Map triggers live under **Core → Map** in the trigger picker.

| Trigger | Fires when |
|---------|------------|
| Map created | A map is created via the Create map handler |
| Map value changed | A key is set, updated, deleted, or a map is cleared |

Triggers are global: every enabled action with a map trigger listens to all map events. Use conditions to filter by map name, key, lifetime, change type, or values.

### Map created conditions

| Condition | Description |
|-----------|-------------|
| Map name | Text match on the map name (empty = any) |
| Lifetime | Any, Session, or Persistent |

### Map value changed conditions

| Condition | Description |
|-----------|-------------|
| Map name | Text match on the map name |
| Key | Text match on the key (empty = any) |
| Lifetime | Any, Session, or Persistent |
| Change type | Any, Set, Update, Delete, or Clear |
| Previous value | Text match on the old value (empty = any) |
| Value | Text match on the new value (empty = any) |

**Change types:**

- **Set** — a new key was added
- **Update** — an existing key was changed
- **Delete** — a key was removed
- **Clear** — all keys were removed at once

## Trigger context

### Map created

```typescript
{
  mapName: string;
  lifetime: 'session' | 'persistent';
}
```

Available as `{mapName}` and `{lifetime}` in handlers.

### Map value changed

```typescript
{
  mapName: string;
  lifetime: 'session' | 'persistent';
  key: string;
  value: string;           // empty when a key is deleted
  previousValue?: string;
  changeType: 'set' | 'update' | 'delete' | 'clear';
}
```

Available as `{mapName}`, `{lifetime}`, `{key}`, `{value}`, `{previousValue}`, and `{changeType}`.

## Plugin API

Other plugins can read maps via `CorePluginApi`:

```typescript
const core = app.plugins.tryGet<CorePluginApi>('core');

core?.maps.get('scores', 'player1');
core?.maps.has('settings', 'theme');
core?.maps.getLifetime('scores');
core?.maps.listMapNames();
```

Mutations are only available through action handlers, not the public API.

## Storage

Persistent maps are stored in the Core plugin store file (`plugin.core.json`) under the key `maps`:

```json
{
  "maps": {
    "scores": {
      "player1": "100",
      "player2": "85"
    }
  }
}
```

Session maps exist only in memory and are lost when the app closes.
