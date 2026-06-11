# Action logging

The Core plugin manages action logs via `ActionLogService`. Logs are visible on the **Logs** page (`/logs`) in the app.

## Log entry

```typescript
type ActionLogEntry = {
  id: string;           // UUID
  timestamp: number;    // Unix ms
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  actionId?: number;
  actionName?: string;
  trigger?: string;
};
```

## Writing

The **Log** handler is the primary way to add entries. The API (`core.logs.append`) can also be used programmatically.

On each append:

1. Entry is added to the in-memory ring buffer (max **500** entries)
2. Entry is appended to the log file on disk
3. Subscribers are notified (`revision` increment)

## Persistence

| Property | Value |
|----------|-------|
| Location | `AppData/logs/actions.ndjson` |
| Format | NDJSON (one JSON object per line) |
| API | `app.fs.writeTextFile` with `append: true` |

On startup, existing lines are read; malformed lines are skipped. Only the last 500 entries are kept in memory.

## Logs page

The `/logs` app route uses `LogViewer` from `@stream-kit/ui` and fetches data via:

```typescript
const core = app.plugins.tryGet<CorePluginApi>('core');
const entries = core?.logs.getEntries() ?? [];
```

### LogViewer features

- Filter by level (All, Info, Warning, Error, Debug)
- Search by message, action name, or trigger
- Auto-scroll
- Copy per line
- JSON messages are auto-formatted
- Clear logs (clears memory and disk file)

## Programmatic usage

```typescript
import type { CorePluginApi } from '@stream-kit/plugin-handlers';

const core = app.plugins.tryGet<CorePluginApi>('core');

await core?.logs.append({
  level: 'info',
  message: 'Something happened',
  actionName: 'My action',
  trigger: 'Twitch · Chat message'
});

// React to changes
const unsubscribe = core?.logs.subscribe(() => {
  console.log(core.logs.revision, core.logs.getEntries());
});

await core?.logs.clear();
```
