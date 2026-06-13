# Core handlers

All handlers live under **Core** in the action editor.

## Handler chain execution

Handlers run top to bottom in the order shown in the editor. Each handler calls
`next()` to continue the chain.

- A handler **stops** the chain by intentionally not calling `next()` (this is how
  the **If** handler skips the rest of the chain when its condition fails).
- A handler that **throws** is treated as an unexpected failure: the error is
  logged and the chain continues with the next handler rather than aborting.
- Async handlers are awaited, so handlers run sequentially and earlier handlers'
  side effects (such as action variables) are available to later ones.

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

Runs TypeScript-like user code inside an isolated Web Worker. The worker has its
own global scope with no access to the app, the DOM, or Tauri APIs, so a script
can only read the trigger context passed to it and write action variables back.

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

Notes:

- Type annotations are stripped before execution. Errors are shown as toasts.
- The handler **awaits** the script, so any action variables it sets are visible
  to later handlers in the chain.
- Scripts run with a time limit (5 seconds). A script that exceeds it is
  terminated and reported as an error.
- Only changes to `context[].actionVariables` are returned to the chain; other
  mutations stay inside the worker.

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

## Maps

Named key-value stores with session or persistent lifetime. See [Maps](./maps.md) for lifetimes, triggers, and examples.

All map handlers except **Create map** use a **Map name** dropdown that lists every existing map (labels show session or persistent). Create a map first before using the other handlers. Map names are globally unique.

### Create map

Creates an empty map. Fails if the name already exists (session or persistent).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| Map name | text | — | Unique map name (required) |
| Lifetime | select | Session | Session or Persistent — set only at creation |

### Set value

Upserts a key in an existing map. Creates the key if it does not exist, or overwrites it if it does.

| Field | Type | Description |
|-------|------|-------------|
| Map name | combobox | Existing maps (label shows session or persistent) |
| Key | text | Key to set (required); supports trigger, global, user, and action variables |
| Value | text | Value; supports trigger, global, user, and action variables |

### Update value

Updates an existing key only. Fails if the map or key does not exist.

| Field | Type | Description |
|-------|------|-------------|
| Map name | combobox | Existing maps |
| Key | text | Key to update (required) |
| Value | text | New value; supports `{variables}` |

### Get value

Reads a value from a map into an action variable.

| Field | Type | Description |
|-------|------|-------------|
| Map name | combobox | Existing maps |
| Key | text | Key to read (required); supports trigger, global, user, and action variables |
| Target name | text | Action variable to write into (required) |

### Has key

Checks whether a key exists and writes `true` or `false` to an action variable.

| Field | Type | Description |
|-------|------|-------------|
| Map name | combobox | Existing maps |
| Key | text | Key to check (required); supports trigger, global, user, and action variables |
| Target name | text | Action variable for the result (required) |

### Delete key

Removes a single key from a map.

| Field | Type | Description |
|-------|------|-------------|
| Map name | combobox | Existing maps |
| Key | text | Key to delete (required) |

### Clear map

Removes all keys from a map but keeps the map itself.

| Field | Type | Description |
|-------|------|-------------|
| Map name | combobox | Existing maps |

### Delete map

Removes the entire map from the registry.

| Field | Type | Description |
|-------|------|-------------|
| Map name | combobox | Existing maps |

---

## Utility

### If

Evaluates a text condition and continues the handler chain only when it passes. When the condition fails, all remaining handlers are skipped.

The action editor shows a live summary above the inputs, using the same style as trigger conditions (for example: **if** `{score}` *is empty*).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Condition | text-select-text | yes | Left: variable or text to check; middle: operator; right: comparison value (not used for empty checks) |
| Not | checkbox | no | Inverts the result (passes when the match fails) |

**Operators:** equals, contains, starts with, ends with, is empty.

For **Is empty**, only the left field is used. Use the **Not** checkbox to invert the check (passes when the value is not empty). A value is empty when it is missing, whitespace-only, or an empty string (for example after **Get value** on a non-existent map key).

Both the left and right fields support `{variable}` interpolation from trigger data, global variables, user variables, and action-scoped variables set earlier in the chain.

Example chain:

1. **Get value** — map `scores`, key `{username}`, target `score`
2. **If** — `{score}` is empty
3. **Log** — runs only when the user has no score yet

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
