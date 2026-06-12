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

## Maps API

Read-only access to map data. Mutations happen through action handlers.

```typescript
core.maps.get(mapName: string, key: string): string | undefined
```

Reads a value from a map. Returns `undefined` when the map or key does not exist.

```typescript
core.maps.has(mapName: string, key: string): boolean
```

Returns whether a key exists in a map.

```typescript
core.maps.getLifetime(mapName: string): MapLifetime | undefined
```

Returns the lifetime of a map by name, or `undefined` when the map does not exist.

```typescript
core.maps.listMapNames(): string[]
```

Returns all map names. Names are globally unique across session and persistent maps.

```typescript
core.maps.listEntries(mapName: string): MapEntry[]
```

Returns all key → value pairs in a map, sorted by key. Returns an empty array when the map does not exist.

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
│       ├── maps/             # MapStore
│       └── logs/             # ActionLogService
```

The plugin has no direct Tauri dependency. All platform interaction goes through `PluginAppApi` injected by the app at boot.
