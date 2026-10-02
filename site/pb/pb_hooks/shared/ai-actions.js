/// <reference path="../../pb_data/types.d.ts" />

/**
 * Prompt, output schema and request builder for the AI action generator route
 * (`ai_actions.pb.js`). Handlers run in isolated runtimes, so they must
 * `require()` this module.
 */

const DEFAULT_MODEL = 'claude-opus-5-5';
const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const ANTHROPIC_VERSION = '2023-06-01';
const FALLBACK_BETA = 'server-side-fallback-2026-07-01';

const MAX_PROMPT_CHARS = 2000;
const MAX_CATALOG_CHARS = 400000;
const MAX_ATTEMPT_CHARS = 60000;
const MAX_ERRORS = 50;
const DAILY_LIMIT = 50;

const SYSTEM_PROMPT = `You build automations ("actions") for Stream Kit, a desktop streaming toolkit.
The user describes an automation in natural language (often Dutch or English). You return one action as JSON matching the output schema.

An action has:
- name: short descriptive name in the user's language.
- triggers: one or more events that start the action. A trigger fires when ANY of its conditions pass (conditions narrow it down; no conditions = always fires).
- handlers: an ordered chain of steps that run when a trigger fires.

Trigger:
- triggerTypeId: an id from the catalog "triggers" list. Never invent ids.
- conditionsJson: a JSON-encoded ConditionGroupNode, the root group:
  {"kind":"group","id":"root","children":[ ... ]}
  A child condition is {"kind":"condition","id":"<unique>","key":"<condition key from catalog>","value":<value>,"negate":false,"operator":"and"}.
  The first child has no operator; following siblings carry "and" or "or". Nested groups ({"kind":"group","id":"<unique>","children":[...]}) are only allowed directly under root.
  Use "{\\"kind\\":\\"group\\",\\"id\\":\\"root\\",\\"children\\":[]}" when no conditions are needed.

Handler:
- handlerTypeId: an id from the catalog "handlers" list. Never invent ids.
- fields: one entry per field you set, using the field "key" from the catalog. valueJson is the JSON-encoded value (e.g. "\\"hello\\"", "true", "5").
  Omit fields to keep their default. Always fill required fields.
- thenHandlers / elseHandlers: only for the If handler (core:core:utility:if); leave empty arrays for every other handler.

Value shapes per field/condition type:
- text, code, hotkey, color, select-file-or-folder, combobox, cron-expression: string
- select: one of the listed item values (string)
- switch, checkbox: boolean
- slider: number
- json: string containing JSON
- key-value-list: [{"key":"...","value":"..."}]
- select-text: {"type":"<operator from items>","value":"..."}
- text-select-text: {"path":"...","type":"<operator>","value":"..."}
- condition-group: a ConditionGroupNode like trigger conditions, using the field's condition keys
- one-of: {"variant":"<variant id>","values":{"<variant id>":<value for that variant's field>}}

Variables:
- Text fields support {variable} placeholders (letters, digits, underscore; no dots).
- Trigger variables are listed per trigger in the catalog; handler outputs become available to later handlers.
- Only use variables that exist for the chosen trigger or earlier handlers.

Rules:
- Use only trigger ids, handler ids, field keys and condition keys that appear in the catalog. Ids are case sensitive.
- Prefer the simplest chain that does what the user asked.
- Use placeholder ids like "t1", "h1", "c1"; the app replaces them.
- If something cannot be done with the available triggers or handlers, do not guess: build what you can and explain what is missing in "notes" (in the user's language).
- If a previous attempt and validation errors are given, return a corrected action that fixes every error.`;

function fieldSchema() {
	return {
		type: 'object',
		additionalProperties: false,
		required: ['key', 'valueJson'],
		properties: {
			key: { type: 'string' },
			valueJson: { type: 'string' }
		}
	};
}

function handlerSchema(nextRef) {
	const branch = nextRef
		? { type: 'array', items: { $ref: nextRef } }
		: { type: 'array', items: { type: 'object', additionalProperties: false, properties: {} } };

	return {
		type: 'object',
		additionalProperties: false,
		required: ['id', 'handlerTypeId', 'fields', 'thenHandlers', 'elseHandlers'],
		properties: {
			id: { type: 'string' },
			handlerTypeId: { type: 'string' },
			fields: { type: 'array', items: fieldSchema() },
			thenHandlers: branch,
			elseHandlers: branch
		}
	};
}

/** Structured output schema; recursion is not supported, so If nesting is capped at 3 levels. */
const OUTPUT_SCHEMA = {
	type: 'object',
	additionalProperties: false,
	required: ['name', 'group', 'triggers', 'handlers', 'notes'],
	$defs: {
		handler0: handlerSchema('#/$defs/handler1'),
		handler1: handlerSchema('#/$defs/handler2'),
		handler2: handlerSchema(null)
	},
	properties: {
		name: { type: 'string' },
		group: { type: 'string' },
		triggers: {
			type: 'array',
			items: {
				type: 'object',
				additionalProperties: false,
				required: ['id', 'triggerTypeId', 'conditionsJson'],
				properties: {
					id: { type: 'string' },
					triggerTypeId: { type: 'string' },
					conditionsJson: { type: 'string' }
				}
			}
		},
		handlers: { type: 'array', items: { $ref: '#/$defs/handler0' } },
		notes: { type: 'array', items: { type: 'string' } }
	}
};

/**
 * Validates and normalizes the client payload. Throws `BadRequestError` on bad input.
 * @returns {{ prompt: string, catalog: string, previousAttempt: string | null, errors: string[] }}
 */
function parseRequestBody(body) {
	if (!body || typeof body !== 'object') {
		throw new BadRequestError('Invalid request body.');
	}

	const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
	if (!prompt) {
		throw new BadRequestError('A description is required.');
	}
	if (prompt.length > MAX_PROMPT_CHARS) {
		throw new BadRequestError('The description is too long.');
	}

	const catalog = typeof body.catalog === 'string' ? body.catalog : '';
	if (!catalog || catalog.length > MAX_CATALOG_CHARS) {
		throw new BadRequestError('Invalid catalog.');
	}

	let previousAttempt = null;
	if (body.previousAttempt != null) {
		if (typeof body.previousAttempt !== 'string' || body.previousAttempt.length > MAX_ATTEMPT_CHARS) {
			throw new BadRequestError('Invalid previous attempt.');
		}
		previousAttempt = body.previousAttempt;
	}

	const errors = Array.isArray(body.errors)
		? body.errors
				.filter((error) => typeof error === 'string')
				.slice(0, MAX_ERRORS)
				.map((error) => error.slice(0, 500))
		: [];

	return { prompt, catalog, previousAttempt, errors };
}

function buildMessages(input) {
	const messages = [{ role: 'user', content: input.prompt }];

	if (input.previousAttempt) {
		messages.push({ role: 'assistant', content: input.previousAttempt });
		messages.push({
			role: 'user',
			content:
				'The action above failed validation:\n- ' +
				input.errors.join('\n- ') +
				'\nReturn a corrected action.'
		});
	}

	return messages;
}

function buildRequest(model, input) {
	return {
		model,
		max_tokens: 16000,
		fallbacks: 'default',
		output_config: {
			effort: 'medium',
			format: { type: 'json_schema', schema: OUTPUT_SCHEMA }
		},
		system: [
			{ type: 'text', text: SYSTEM_PROMPT },
			{
				type: 'text',
				text: 'Catalog of available triggers and handlers:\n' + input.catalog,
				cache_control: { type: 'ephemeral' }
			}
		],
		messages: buildMessages(input)
	};
}

/** Last text block of a Messages API response, or `null`. */
function responseText(json) {
	const content = json && Array.isArray(json.content) ? json.content : [];
	for (let i = content.length - 1; i >= 0; i--) {
		if (content[i] && content[i].type === 'text' && typeof content[i].text === 'string') {
			return content[i].text;
		}
	}
	return null;
}

function usageDay(nowMs) {
	return new Date(nowMs || Date.now()).toISOString().slice(0, 10);
}

module.exports = {
	DEFAULT_MODEL,
	ANTHROPIC_URL,
	ANTHROPIC_VERSION,
	FALLBACK_BETA,
	DAILY_LIMIT,
	parseRequestBody,
	buildRequest,
	responseText,
	usageDay
};
