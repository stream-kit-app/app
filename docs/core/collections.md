# Collections

The Core plugin provides named key-value collections with string keys and string values. Collections are created explicitly and can be session-only or persistent.

See also:

- [Handlers](./handlers.md) — collection handler fields
- [Triggers](./triggers.md) — collection triggers
- [Variables](./variables.md) — flat variables vs structured collections

## Lifetimes

| Lifetime | Storage | Duration |
|----------|---------|----------|
| **Session** | In-memory | App start until app closes |
| **Persistent** | `PluginStore` key `collections` | Survives restarts |

**Collection names are globally unique.** A name can exist only once, either as a session collection or as a persistent collection — not both. Choose session or persistent only when creating a collection with **Create collection**. Other handlers select a collection by name; the store resolves the lifetime automatically.

Collections must be created with the **Create collection** handler before other operations. Other handlers show a dropdown of existing collections and fail with a warning toast when no collection is selected or the collection does not exist.

When a collection is selected in a handler, use the database icon next to the **Collection name** field to open a popover with all current key → value pairs.

## Dashboard management

The Dashboard (`/`) includes a **Collections** widget for creating and editing collections without building actions first.

| Action | Description |
|--------|-------------|
| Create collection | Name + lifetime (session or persistent) |
| Edit collection | Add, update, or delete key → value entries |
| Clear collection | Remove all entries but keep the collection |
| Delete collection | Remove the collection entirely |

Changes made on the dashboard use the same `CollectionStore` as action handlers and fire the same collection triggers (`Collection created`, `Collection value changed`). Session collections show a warning that data is lost when the app closes.

The action editor popover remains available for quick read-only inspection while configuring handlers.

## Handlers

All collection handlers live under **Core → Collection** in the action editor.

| Handler | Description |
|---------|-------------|
| Create collection | Creates an empty collection with the chosen lifetime |
| Set value | Upserts a key (creates or overwrites) |
| Update value | Updates an existing key only |
| Get value | Reads a value into an action variable |
| Has key | Writes `true` or `false` to an action variable |
| Delete key | Removes a single key |
| Clear collection | Removes all keys but keeps the collection |
| Delete collection | Removes the collection entirely |

Value fields support `{variable}` interpolation from trigger context, global variables, user variables, and action-scoped variables.

### Example: scoreboard

1. **Create collection** — name `scores`, lifetime Session
2. **Set value** — collection `scores`, key `{username}`, value `{score}`
3. **Get value** — collection `scores`, key `player1`, target `player1Score`

## Triggers

Collection triggers live under **Core → Collection** in the trigger picker.

| Trigger | Fires when |
|---------|------------|
| Collection created | A collection is created via the Create collection handler |
| Collection value changed | A key is set, updated, deleted, or a collection is cleared |

Triggers are global: every enabled action with a collection trigger listens to all collection events. Use conditions to filter by collection name, key, lifetime, change type, or values.

### Collection created conditions

| Condition | Description |
|-----------|-------------|
| Collection name | Text match on the collection name (empty = any) |
| Lifetime | Any, Session, or Persistent |

### Collection value changed conditions

| Condition | Description |
|-----------|-------------|
| Collection name | Text match on the collection name |
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

### Collection created

```typescript
{
  collectionName: string;
  lifetime: 'session' | 'persistent';
}
```

Available as `{collectionName}` and `{lifetime}` in handlers.

### Collection value changed

```typescript
{
  collectionName: string;
  lifetime: 'session' | 'persistent';
  key: string;
  value: string;           // empty when a key is deleted
  previousValue?: string;
  changeType: 'set' | 'update' | 'delete' | 'clear';
}
```

Available as `{collectionName}`, `{lifetime}`, `{key}`, `{value}`, `{previousValue}`, and `{changeType}`.

## Plugin API

Other plugins can read and write collections via `CorePluginApi`:

```typescript
const core = app.plugins.tryGet<CorePluginApi>('core');

core?.collections.get('scores', 'player1');
core?.collections.has('settings', 'theme');
core?.collections.getLifetime('scores');
core?.collections.listCollectionNames();
core?.collections.listCollections();
core?.collections.listEntries('scores');
core?.collections.collectionExists('scores');
```

Mutations:

```typescript
await core?.collections.create('scores', 'session');
await core?.collections.set('scores', 'player1', '100');
await core?.collections.update('scores', 'player1', '120');
await core?.collections.deleteKey('scores', 'player1');
await core?.collections.clear('scores');
await core?.collections.delete('scores');
```

Subscribe to collection events:

```typescript
core?.collections.subscribe('created', (context) => { /* ... */ });
core?.collections.subscribe('changed', (context) => { /* ... */ });
core?.collections.subscribe('deleted', (context) => { /* ... */ });
```

Mutations are also available through action handlers. The dashboard Collections widget uses the same API.

## Storage

Persistent collections are stored in the Core plugin store file (`plugin.core.json`) under the key `collections`:

```json
{
  "collections": {
    "scores": {
      "player1": "100",
      "player2": "85"
    }
  }
}
```

Legacy installs may still have a `maps` key; it is migrated to `collections` automatically on load.

Session collections exist only in memory and are lost when the app closes.
