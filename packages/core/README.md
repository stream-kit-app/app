# @stream-kit/core

Platform-neutral runtime utilities shared by Stream Kit, first-party plugins, and external plugins.

This package has no Svelte, Tauri, or UI dependencies. Optional Twurple peer dependencies provide types for Twitch chat payloads.

## When to use it

Import from `@stream-kit/core` when you need runtime helpers inside handler, trigger, or command logic:

```ts
import {
	getFieldValue,
	interpolateVariables,
	parseCommand,
	matchCommandPattern
} from '@stream-kit/core';
```

Import the plugin contract and app API types from `@stream-kit/plugin` instead. See the [Plugin Authoring API](https://docs.stream-kit.app/developers/plugin-api).

`@stream-kit/plugin` re-exports most helpers from this package for convenience, but importing from `@stream-kit/core` directly keeps plugin bundles smaller when you only need helpers.

## Installation

External plugins should add both packages as dev dependencies and **externalize** them at build time:

```bash
npm install --save-dev @stream-kit/core @stream-kit/plugin
```

At runtime the Stream Kit app host resolves `@stream-kit/core` from the plugin import map. Do not bundle this package into your plugin entry.

## Exports

### Variable interpolation

| Export | Description |
|--------|-------------|
| `interpolateVariables` | Replace `{variable}` placeholders in strings |
| `contextToVariables` | Convert a handler trigger context to a variable map |
| `contextValueToVariableString` | Serialize a context value for variable storage |

### Handler fields

| Export | Description |
|--------|-------------|
| `getFieldValue` | Read a value from a handler field instance by key |
| `getOneOfFieldValue` | Read the active variant of a one-of field |
| `isOneOfFieldValue` | Type guard for one-of field values |
| `resolveFieldText` | Resolve text/variable field content to a string |
| `resolveOneOfFieldText` | Resolve one-of field text to a string |

### Chat commands

| Export | Description |
|--------|-------------|
| `parseCommand` | Parse a command definition string |
| `parseCommandMessage` | Parse command tokens from a chat message |
| `matchCommandPattern` | Match a message against a command pattern |
| `extractCommandArgNames` | List named `<placeholder>` tokens in a pattern |
| `hasCommandArgPlaceholders` | Check whether a pattern uses argument placeholders |
| `RESERVED_COMMAND_ARG_NAMES` | Built-in argument names you should not override |
| `enrichChatMessageWithCommand` | Attach parsed command data to a chat message context |
| `findCommandConditionPattern` | Extract a condition pattern from command context |

### Cron / schedule

| Export | Description |
|--------|-------------|
| `computeCronNextRun` | Calculate the next run time for a cron expression |
| `isValidCronExpression` | Validate cron syntax |
| `normalizeCronExpression` | Normalize user input to canonical form |
| `getCronValidationError` | Human-readable validation error |
| `getCronNextRunLabel` | Formatted label for the next scheduled run |
| `getCronFieldCount` | Number of fields in the expression |
| `splitCronParts` | Split an expression into field parts |
| `getLocalTimezone` | Detect the local IANA timezone |
| `CRON_FIELD_COUNT`, `CRON_FIELD_KEYS`, `DEFAULT_CRON_PRESETS` | Constants and presets |

### Types

| Export | Description |
|--------|-------------|
| `HandlerTriggerContext` | Context passed to handler execute functions |
| `HandlerFieldInstance`, `HandlerFieldValue`, … | Handler field value types |
| `CommandMatch`, `ParsedCommandMessage` | Command parsing results |
| `TwitchChatMessage`, `TwitchChatUserInfo`, … | Twitch chat payload shapes |
| `CronFieldKey`, `CronPreset` | Schedule-related types |

## Example

```ts
import { getFieldValue, interpolateVariables } from '@stream-kit/core';
import type { HandlerExecuteFn } from '@stream-kit/plugin';

const execute: HandlerExecuteFn = async (handler, context) => {
	const template = getFieldValue(handler.fields, 'message');
	const text =
		typeof template === 'string'
			? interpolateVariables(template, context.variables)
			: '';

	await context.next({ message: text });
};
```

## Monorepo development

```bash
pnpm --filter @stream-kit/core build
pnpm --filter @stream-kit/core check
pnpm --filter @stream-kit/core dev
```

## Further reading

- [Plugin Authoring API](https://docs.stream-kit.app/developers/plugin-api)
- [Plugin getting started](https://docs.stream-kit.app/developers/plugin-getting-started)
