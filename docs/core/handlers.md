# Core handlers

All handlers live under **Core** in the action editor.

## Audio

### Play audio file

Plays a single audio file through the app audio player.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Audio file | file | yes | mp3, wav, ogg, flac, aac, m4a |

The file is read via `app.fs.readFile` and played as a blob.

### Play all audio from folder

Plays all audio files in a folder sequentially (sorted by filename).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Folder | folder | yes | Folder containing audio files |

Files are queued and played one after another.

---

## Script

### Run script

Runs TypeScript-like user code in a sandboxed `Function` context.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Script | code (TypeScript) | yes | Default template with `export default (context) => { ... }` |

The script receives an array of `HandlerTriggerContext` objects:

```typescript
export default (context: HandlerTriggerContext[]) => {
  const [{ trigger, data }] = context;
  // trigger: name of the trigger that fired
  // data: full payload from that trigger
};
```

Type annotations are stripped at compile time. Errors are shown as toasts.

---

## Program

### Run program

Launches an external program via `app.process.run`.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Program | file | yes | exe, bat, cmd, ps1, com, msi |
| Working directory | folder | no | Working directory for the process |
| Arguments | text | no | Command-line arguments; supports `{variables}` |
| Environment variables | key-value list | no | Environment variables; values support interpolation |
| Hide window | switch | no | Hide the process window |
| Run in shell | checkbox | no | Run via shell |

Arguments and environment variables are resolved through the variable system before execution. The process is not awaited (`waitSeconds: 0`).

---

## Variables

### Set variable

Stores a value in the selected scope.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| Scope | select | Action | Global, User, or Action |
| Variable name | text | — | Variable name (required) |
| Value | text | — | Value; supports `{variables}` |

For **User** scope, a username in the trigger context is required (`username`, `userName`, `user`, or `login`). Otherwise a warning toast is shown.

### Get variable

Reads a variable from a scope and stores the result in an action variable.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| From scope | select | Global | Source scope |
| Variable name | text | — | Variable to read (required) |
| Target name | text | — | Action variable to write the result into (required) |

Missing values are stored as an empty string in the target.

---

## Utility

### Log

Writes a log entry to the action log system.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| Message | text | — | Message; supports `{variables}` (required) |
| Level | select | Info | Info, Warning, Error, or Debug |

Each entry also includes `actionId`, `actionName`, and `trigger` from the current execution context. See [Logging](./logging.md).

---

## Delay

Pauses the handler chain for a given duration.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| Duration (ms) | text | `1000` | Duration in milliseconds (required) |

Invalid or negative values are ignored (handler stops without calling `next()`).
