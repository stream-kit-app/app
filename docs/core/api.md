# CorePluginApi

The Core plugin exposes a typed API via the plugin `api` field. Other plugins or app routes can access it with `app.plugins.tryGet<CorePluginApi>('core')`.

Types are exported from `@stream-kit/plugin-handlers`:

```typescript
import type {
  CorePluginApi,
  ActionLogEntry,
  ActionLogAppendInput,
  ActionLogLevel,
  MapLifetime,
  VariableScope
} from '@stream-kit/plugin-handlers';
```

## Variables API

```typescript
core.variables.resolve(context: HandlerTriggerContext): Record<string, string>
```

Builds the full variable object for interpolation (trigger + global + user + action).

```typescript
core.variables.resolveTriggerContext(data: unknown): Record<string, string>
```

Builds trigger-context variables only (includes plugin context enrichers; excludes global, user-store, and action-scoped variables). Used by the action editor trigger variable popover.

```typescript
core.variables.get(
  scope: VariableScope,
  key: string,
  context: HandlerTriggerContext
): string | undefined
```

Reads a single variable from the given scope.

```typescript
core.variables.set(
  scope: VariableScope,
  key: string,
  value: string,
  context: HandlerTriggerContext
): Promise<{ ok: true } | { ok: false; reason: 'missing-user' }>
```

Writes a variable. Global/user are persisted; action is in-memory only.

```typescript
core.variables.listKeys(
  scope: VariableScope,
  context?: HandlerTriggerContext
): string[]
```

Returns all keys in a scope. User scope requires `context` with a username.

## Collections API

Read and write collection data. Mutations are also available through action handlers and the dashboard Collections widget.

```typescript
core.collections.get(collectionName: string, key: string): string | undefined
```

Reads a value from a collection. Returns `undefined` when the collection or key does not exist.

```typescript
core.collections.has(collectionName: string, key: string): boolean
```

Returns whether a key exists in a collection.

```typescript
core.collections.getLifetime(collectionName: string): CollectionLifetime | undefined
```

Returns the lifetime of a collection by name, or `undefined` when the collection does not exist.

```typescript
core.collections.listCollectionNames(): string[]
```

Returns all collection names. Names are globally unique across session and persistent collections.

```typescript
core.collections.listCollections(): CollectionSummary[]
```

Returns all collections with their lifetime, sorted by name.

```typescript
core.collections.listEntries(collectionName: string): CollectionEntry[]
```

Returns all key → value pairs in a collection, sorted by key. Returns an empty array when the collection does not exist.

```typescript
core.collections.collectionExists(collectionName: string): boolean
```

Returns whether a collection exists.

```typescript
core.collections.create(collectionName: string, lifetime: CollectionLifetime): Promise<CollectionCreateResult>
```

Creates an empty collection. Fails with `already-exists` or `invalid-name`.

```typescript
core.collections.set(collectionName: string, key: string, value: string): Promise<CollectionMutationResult>
```

Upserts a key in an existing collection.

```typescript
core.collections.update(collectionName: string, key: string, value: string): Promise<CollectionMutationResult>
```

Updates an existing key only.

```typescript
core.collections.deleteKey(collectionName: string, key: string): Promise<CollectionMutationResult>
```

Removes a single key from a collection.

```typescript
core.collections.clear(collectionName: string): Promise<CollectionMutationResult>
```

Removes all keys but keeps the collection.

```typescript
core.collections.delete(collectionName: string): Promise<CollectionMutationResult>
```

Deletes a collection entirely. Emits a `deleted` event.

```typescript
core.collections.subscribe(event: 'created' | 'changed' | 'deleted', listener): () => void
```

Subscribe to collection lifecycle events. Returns an unsubscribe function.

## Logs API

```typescript
core.logs.append(input: ActionLogAppendInput): Promise<ActionLogEntry>
```

Adds a log entry (memory + disk).

```typescript
core.logs.getEntries(): ActionLogEntry[]
```

Returns a copy of all in-memory entries.

```typescript
core.logs.clear(): Promise<void>
```

Clears all entries (memory + disk file).

```typescript
core.logs.subscribe(listener: () => void): () => void
```

Subscribes to changes. Returns an unsubscribe function.

```typescript
core.logs.revision: number
```

Increments on every change; useful for making Svelte `$derived` reactive.

## Example: logs page

```svelte
<script lang="ts">
  import type { CorePluginApi } from '@stream-kit/plugin-handlers';
  import { app } from '$lib/core';

  const core = $derived(app.plugins.tryGet<CorePluginApi>('core'));
  let revision = $state(0);

  const entries = $derived.by(() => {
    revision;
    return core?.logs.getEntries() ?? [];
  });

  $effect(() => {
    if (!core) return;
    revision = core.logs.revision;
    return core.logs.subscribe(() => {
      revision = core.logs.revision;
    });
  });
</script>
```

## Architecture

```
plugins/core/
├── src/
│   ├── index.ts              # Plugin definition, handler/trigger registration
│   ├── handler/              # Handler implementations
│   ├── trigger/              # Process triggers
│   └── lib/
│       ├── plugin-api.ts     # CorePluginApi types
│       ├── variables/        # VariableStore
│       ├── collections/      # CollectionStore
│       └── logs/             # ActionLogService
```

The plugin has no direct Tauri dependency. All platform interaction goes through `PluginAppApi` injected by the app at boot.
