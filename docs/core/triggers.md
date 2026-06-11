# Process triggers

The Core plugin provides two system triggers under **Processes**:

| Trigger | Event |
|---------|-------|
| Process Started | A process was started on the system |
| Process Stopped | A process was stopped |

## Conditions

Both triggers have one condition: **Name** (select-text).

| Operator | Description |
|----------|-------------|
| Starts with | Name starts with |
| Ends with | Name ends with |
| Contains | Name contains |
| Equals | Name equals |

The match value can be interpolated with variables:

- `{executable}` — executable file
- `{name}` — process name
- `{fullPath}` — full path

### Matching

The plugin compares against multiple candidates:

- `executable` (without `.exe` suffix)
- `name` (without `.exe` suffix)
- Filename from `fullPath`
- Full `fullPath` (raw string)

An empty match value always matches (condition is always true).

## Process watcher

Process events come from `app.process.onStarted` / `app.process.onStopped`.

The watcher is synced when:

- A trigger is activated (`activate` calls `app.process.sync(true)`)
- Plugin setting **Process Watcher** is enabled
- At least one enabled process trigger exists in an action

On trigger deactivation, the subscription is disposed. When the plugin is disabled, the watcher is stopped.

## Trigger context

Process events provide a `ProcessEventContext`:

```typescript
{
  executable?: string;
  name?: string;
  fullPath?: string;
}
```

These fields are available as trigger variables in handlers and conditions.

## Testing

Both triggers support **Test** via a simulated `ProcessEventContext` (see `createTestProcessEventContext`).
