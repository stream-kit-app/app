# Schedule triggers

The Core plugin provides time-based Action triggers under **Core**:

| Trigger | Description |
|---------|-------------|
| Cron | Fires on a recurring cron schedule |
| Scheduled | Fires on a specific date, time, or both with repeat options |

These triggers integrate with the Actions system: when a schedule fires, the action runs its handler chain with a `ScheduleEventContext`.

## Cron

### Conditions

| Field | Required | Format |
|-------|----------|--------|
| Expression | Yes | Standard 5-field cron: `minute hour day month weekday` |

The expression field uses a compact cron input that opens a popover editor with field labels, presets, live validation, and a next-run preview.

Cron expressions use the standard **5-field** format (`minute hour day month weekday`). Six-field expressions with seconds are not supported.

Example expressions:

- `0 9 * * *` — every day at 09:00
- `0 9 * * 1-5` — weekdays at 09:00
- `*/15 * * * *` — every 15 minutes

Schedules use the **local system timezone**.

### Trigger context

```typescript
{
  kind: 'cron';
  firedAt: string;        // ISO timestamp when the action fired
  scheduledAt: string;    // ISO timestamp of the planned run
  cronExpression: string;
}
```

## Scheduled

### Conditions

| Field | Required | Format / values |
|-------|----------|-----------------|
| Date | No* | `YYYY-MM-DD` |
| Time | No* | `HH:mm` (24-hour) |
| Repeat | Yes | `once`, `daily`, or `weekly` |
| Weekday | Conditional | `mon`–`sun` (required for weekly without a date) |

\*At least one of **Date** or **Time** must be set.

### Repeat behaviour

| Repeat | Date | Time | Behaviour |
|--------|------|------|-----------|
| once | yes | no | Once at 00:00 on that date |
| once | no | yes | Once at the next occurrence of that time |
| once | yes | yes | Once at that exact date and time |
| daily | optional | yes | Every day at that time; optional start date skips runs before that date |
| daily | yes | no | Every day at 00:00 from the start date |
| weekly | yes | optional | Every week on the weekday of the date, at the given time (default 00:00) |
| weekly | no | yes | Every week on the chosen weekday at that time |

After a **once** schedule fires, it is removed from the scheduler automatically.

### Trigger context

```typescript
{
  kind: 'scheduled';
  firedAt: string;
  scheduledAt: string;
  date?: string;
  time?: string;
  repeat?: 'once' | 'daily' | 'weekly';
  weekday?: string;
}
```

## Scheduler

All schedule triggers share a central `ScheduleService` in the Core plugin:

- Each enabled trigger registers when its action is activated
- The service uses a timeout chain to wake at the next due time (not a fixed poll interval)
- When the Core plugin is disabled, all schedules are cleared
- When an action is disabled, its schedule entries are unregistered

## Limitations

- **Missed runs are not replayed** if the app was closed when a run was due
- **Timezone** follows the operating system local time (including DST changes)
- **Restart**: enabled actions re-activate their triggers and schedules are rebuilt from saved conditions

## Testing

Both triggers support **Test** in the action editor. Test uses a simulated `ScheduleEventContext` so you can verify handler chains without waiting for the next scheduled run.

See also: [Process triggers](./triggers.md)
