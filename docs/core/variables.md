# Variables

The Core plugin variable system supports three scopes and automatic interpolation in text fields.

## Scopes

| Scope | Lifetime | Storage | Username required |
|-------|----------|---------|-------------------|
| **Global** | Permanent | `PluginStore` (`variables` key) | No |
| **User** | Permanent per user | `PluginStore` (`users` key) | Yes |
| **Action** | Single action run | In-memory (`context.actionVariables`) | No |

### Global

Shared across all actions and triggers. Suitable for settings like a bot prefix or stream name.

### User

Per user (e.g. viewer). The username is derived from trigger data using these fields (in order):

1. `username`
2. `userName`
3. `user`
4. `login`

Without a username, Set/Get for user scope fails with a warning.

### Action

Only available during the current action run. Ideal as temporary storage between handlers in the same chain (e.g. Get variable → Log).

`actionVariables` is initialized as `{}` when `runHandlers()` starts.

## Interpolation

Text fields in handlers support `{variableName}` syntax. Pattern: `\{([a-zA-Z_][a-zA-Z0-9_]*)\}`.

Missing variables are replaced with an empty string.

### Resolution priority

When building the variable object for interpolation, this order applies (later wins on name conflict):

1. **Trigger context** — string/number/boolean fields from `context.data`, plus top-level objects serialized as JSON (e.g. Twitch `msg`)
2. **Global** — stored global variables
3. **User** — variables for the current user
4. **Action** — `context.actionVariables`

Handlers that use interpolation:

- Log (message)
- Set variable (value)
- Run program (arguments, environment variables)

## Storage

Global and user variables are stored in the Core plugin store:

```
variables  → Record<string, string>                    // global
users      → Record<username, Record<key, value>>     // per user
```

Variables are loaded in `onEnable` and written immediately on `set()`.

## Examples

**Log with trigger data:**

```
Message: {username} has {amount} points
```

**Action chain:**

1. Get variable — From: Global, Name: `greeting`, Target: `msg`
2. Log — Message: `{msg} for {username}`

**User counter (pseudo):**

1. Get variable — From: User, Name: `visits`, Target: `count`
2. Set variable — Scope: Action, Name: `newCount`, Value: `{count}` *(requires custom increment logic in a script)*
3. Set variable — Scope: User, Name: `visits`, Value: `{newCount}`

> There is no dedicated management page for global/user variables yet; use Set/Get handlers or the API.

## Action editor

The action editor provides variable reference popovers to help when writing `{variable}` placeholders.

### Trigger variables (per trigger)

An info icon next to each trigger title opens a popover listing variables available from that trigger's context. Keys are derived from the trigger's `onTest` dummy data using the same top-level extraction as runtime interpolation (`string`, `number`, `boolean` fields only).

Click a variable to copy `{key}` to the clipboard.

**Limitations:**

- Triggers without `onTest` show an empty state
- Object variables such as `msg` (Twitch chat) or `raw` (YouTube) are serialized as JSON strings for interpolation
- Test data values may differ from live data (e.g. `role`), but keys are generally accurate
- A few triggers use incorrect test factories; their key lists may be wrong until test contexts are fixed

### Global variables (Triggers section)

An info icon next to the **Triggers** heading opens a popover listing all global variable keys from the Core plugin store (`core.variables.listKeys('global')`).

Click a variable to copy `{key}` to the clipboard.
