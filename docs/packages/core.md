# @stream-kit/core

Platform-neutral runtime utilities shared by the app, first-party plugins, and external plugins. This package has **no** Svelte, Tauri, or UI dependencies (optional Twurple types for Twitch chat messages).

**Location:** `packages/core/`  
**NPM name:** `@stream-kit/core`

## When to use it

Import from `@stream-kit/core` when you need runtime helpers inside handler or trigger logic:

```ts
import {
	getFieldValue,
	interpolateVariables,
	parseCommand,
	matchCommandPattern
} from '@stream-kit/core';
```

Import types and the full plugin contract from `@stream-kit/plugin` instead. See [Plugin authoring API](../plugins/api.md).

`@stream-kit/plugin` re-exports most `@stream-kit/core` helpers for convenience, so plugin authors can often import everything from `@stream-kit/plugin` alone.

## Modules

### Variable interpolation

| Export | Description |
|--------|-------------|
| `interpolateVariables` | Replace `{{variable}}` placeholders in strings |
| `contextToVariables` | Convert a handler trigger context to variable map |
| `contextValueToVariableString` | Serialize a context value for variable storage |

### Handler fields

| Export | Description |
|--------|-------------|
| `getFieldValue` | Read a scalar value from a handler field instance |
| `getOneOfFieldValue` | Read the active variant of a one-of field |
| `isOneOfFieldValue` | Type guard for one-of field values |
| `resolveFieldText` | Resolve text/variable field content to a string |
| `resolveOneOfFieldText` | Resolve one-of field text to a string |

### Chat commands

| Export | Description |
|--------|-------------|
| `parseCommand` | Parse a command definition string |
| `parseCommandMessage` | Match a chat message against a command pattern |
| `matchCommandPattern` | Low-level pattern matching |
| `extractCommandArgNames` | List named placeholders in a pattern |
| `hasCommandArgPlaceholders` | Check whether a pattern uses argument placeholders |
| `RESERVED_COMMAND_ARG_NAMES` | Built-in argument names plugins should not override |
| `enrichChatMessageWithCommand` | Attach parsed command data to a chat message context |
| `findCommandConditionPattern` | Extract condition pattern from command context |

### Cron / schedule

| Export | Description |
|--------|-------------|
| `computeCronNextRun` | Calculate next run time for a cron expression |
| `isValidCronExpression` | Validate cron syntax |
| `normalizeCronExpression` | Normalize user input to canonical form |
| `getCronValidationError` | Human-readable validation error |
| `getCronNextRunLabel` | Formatted label for next scheduled run |
| `getCronFieldCount` | Number of fields in the expression |
| `splitCronParts` | Split expression into field parts |
| `getLocalTimezone` | Detect local IANA timezone |
| `CRON_FIELD_COUNT`, `CRON_FIELD_KEYS`, `DEFAULT_CRON_PRESETS` | Constants and presets |

### Types

| Export | Description |
|--------|-------------|
| `HandlerTriggerContext` | Context passed to handler execute functions |
| `HandlerFieldInstance`, `HandlerFieldValue`, … | Handler field value types |
| `CommandMatch`, `ParsedCommandMessage` | Command parsing results |
| `TwitchChatMessage`, `TwitchChatUserInfo`, … | Twitch chat payload shapes |
| `CronFieldKey`, `CronPreset` | Schedule-related types |

## Build

```bash
pnpm --filter @stream-kit/core build
```

The build produces:

- `dist/index.js` — ESM bundle (esbuild, platform-neutral)
- `dist/index.d.ts` — TypeScript declarations

`pnpm dev` watches `src/**/*.ts` and rebuilds on change.

## Dependencies

| Package | Role |
|---------|------|
| `croner` | Cron parsing and next-run calculation |
| `@twurple/*` (optional peer) | Types for Twitch chat integration |

## Tests

Unit tests live next to source files (for example `parse-command.test.ts`). Run checks via:

```bash
pnpm --filter @stream-kit/core check
```
