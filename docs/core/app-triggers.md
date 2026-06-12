# App triggers

The Core plugin provides application lifecycle triggers under **App** in the trigger picker.

## Triggers

| Trigger | Event |
|---------|-------|
| App Started | The app has finished booting |
| App Exit | The user closes the application window |

Neither trigger has conditions — they fire for every matching event.

## App Started

Fires once per session after the full boot sequence completes:

1. Plugins load and boot
2. Enabled actions are loaded and their triggers activate
3. Plugins receive `onReady`
4. **`App Started` fires**

If an action with this trigger is enabled later (after boot), the trigger fires immediately on activation so you do not miss the started event.

## App Exit

Fires when the user requests to close the main window (Tauri `CloseRequested` event).

Exit triggers run **fire-and-forget**: the window closes without waiting for handler chains to finish. Use this for best-effort cleanup only.

The close listener is registered lazily when the first **App Exit** trigger is activated.

## Trigger context

Both triggers provide an `AppLifecycleContext`:

```typescript
{
  event: 'started' | 'exit';
  timestamp: string; // ISO 8601
}
```

These fields are available as trigger variables in handlers.

## Testing

Both triggers support **Test** via a simulated `AppLifecycleContext` (see `createTestAppLifecycleContext`).

## Related documentation

- [Process triggers](./triggers.md) — OS process started/stopped
- [Schedule triggers](./schedule-triggers.md) — cron and scheduled date/time
