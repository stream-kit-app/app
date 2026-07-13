import type { App } from '../../app.svelte';
import type { Action } from '../../action/action.svelte';
import type { ActionHandler } from '../../action/action-handler.svelte';
import type { HandlerTriggerContext } from '../../action/handler-context';
import type {
	HandlerDefinitionProps,
	HandlerNext
} from '../../action/handler/types';
import type { HandlerFieldValue, ResolvedHandlerFieldDefinition } from '../../action/handler/field';
import { getHandlerFieldDefinition, getHandlerFieldValue, resolveOneOfFieldValue } from '../../action/handler-field';
import { interpolateVariables, isOneOfFieldValue } from '@stream-kit/core';

const JSON_NUMBER_PATTERN = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/;
const SINGLE_VARIABLE_PATTERN = /^\{([a-zA-Z_][a-zA-Z0-9_]*)\}$/;

/**
 * Returns the value as a bare JSON literal (number, boolean, or null) when it
 * looks like one. Otherwise returns null (treat as string or structured JSON).
 */
function asJsonScalarLiteral(value: string): string | null {
	if (JSON_NUMBER_PATTERN.test(value)) {
		return value;
	}

	if (value === 'true' || value === 'false' || value === 'null') {
		return value;
	}

	return null;
}

/** Insert a variable value into a JSON template as the correct JSON fragment. */
function asJsonTemplateLiteral(value: string): string {
	const scalar = asJsonScalarLiteral(value);

	if (scalar !== null) {
		return scalar;
	}

	try {
		JSON.parse(value);
		return value;
	} catch {
		return JSON.stringify(value);
	}
}

function tryParseJson(value: string): unknown {
	try {
		return JSON.parse(value);
	} catch {
		return value;
	}
}

function resolveVariables(
	app: App,
	context: HandlerTriggerContext
): Record<string, string> {
	const core = app.plugins.tryGet<{
		variables: { resolve: (ctx: HandlerTriggerContext) => Record<string, string> };
	}>('core');

	return core?.variables.resolve(context) ?? {};
}

function resolveJsonPayload(
	template: string | undefined,
	variables: Record<string, string>
): unknown {
	if (!template?.trim()) {
		return undefined;
	}

	let resolved = template;

	for (const [key, value] of Object.entries(variables)) {
		resolved = resolved.replaceAll(`"{${key}}"`, asJsonTemplateLiteral(value));

		const escaped = JSON.stringify(value).slice(1, -1);
		resolved = resolved.replaceAll(`{${key}}`, escaped);
	}

	try {
		return JSON.parse(resolved);
	} catch {
		return resolved;
	}
}

function resolveVariablePayload(
	template: string | undefined,
	variables: Record<string, string>
): unknown {
	if (!template?.trim()) {
		return undefined;
	}

	const trimmed = template.trim();
	const singleVariable = trimmed.match(SINGLE_VARIABLE_PATTERN);

	if (singleVariable) {
		const raw = variables[singleVariable[1] ?? ''];

		if (raw === undefined) {
			return undefined;
		}

		return tryParseJson(raw);
	}

	return tryParseJson(interpolateVariables(trimmed, variables));
}

function resolvePayload(
	app: App,
	payloadDefinition: ResolvedHandlerFieldDefinition | undefined,
	payloadField: HandlerFieldValue | undefined,
	context: HandlerTriggerContext
): unknown {
	const normalized = payloadDefinition
		? resolveOneOfFieldValue(payloadDefinition, payloadField)
		: isOneOfFieldValue(payloadField)
			? payloadField
			: undefined;

	if (!normalized) {
		return context.data;
	}

	const variables = resolveVariables(app, context);
	const variant = normalized.variant === 'json' ? 'custom' : normalized.variant;
	const active = normalized.values[variant] ?? normalized.values[normalized.variant];

	if (typeof active !== 'string' || !active.trim()) {
		return context.data;
	}

	if (variant === 'variable') {
		return resolveVariablePayload(active, variables);
	}

	const payload = resolveJsonPayload(active, variables);

	return payload === undefined ? context.data : payload;
}

export const createSendToOverlayHandler = (app: App) =>
	({
		name: 'Send to Overlay',
		fields: [
			{
				type: 'select',
				name: 'Overlay',
				required: true,
				placeholder: 'Select an overlay',
				items: async () =>
					app.overlay.items.map((overlay) => ({
						value: overlay.id,
						label: overlay.name
					}))
			},
			{
				type: 'combobox',
				name: 'Event',
				required: true,
				placeholder: 'message',
				allowCustomValue: true,
				itemsReloadFromField: 'overlay',
				items: ({ getFieldValue }) => {
					const overlayId = getFieldValue('overlay');

					if (typeof overlayId !== 'string' || !overlayId.trim()) {
						return [];
					}

					const overlay = app.overlay.items.find((item) => item.id === overlayId.trim());

					return (overlay?.expectedEvents ?? []).map((event) => ({
						value: event,
						label: event
					}));
				}
			},
			{
				type: 'one-of',
				name: 'Payload',
				defaultVariant: 'custom',
				variants: [
					{
						id: 'custom',
						label: 'JSON',
						field: {
							type: 'json',
							name: 'Payload',
							useContextVariables: true,
							placeholder: '{"username":"{username}","message":"{message}"}'
						}
					},
					{
						id: 'variable',
						label: 'Variable',
						field: {
							type: 'text',
							name: 'Variable',
							useContextVariables: true,
							placeholder: '{message}'
						}
					}
				]
			}
		],
		execute: async (
			_action: Action,
			handler: ActionHandler,
			context: HandlerTriggerContext,
			next: HandlerNext
		) => {
			const overlayId = getHandlerFieldValue(handler.fields, 'overlay');
			const event = getHandlerFieldValue(handler.fields, 'event');
			const payloadField = getHandlerFieldValue(handler.fields, 'payload');

			if (typeof overlayId !== 'string' || !overlayId.trim()) {
				app.toast.create({
					title: 'Send to Overlay failed',
					description: 'Select an overlay.',
					variant: 'error'
				});
				return;
			}

			if (typeof event !== 'string' || !event.trim()) {
				app.toast.create({
					title: 'Send to Overlay failed',
					description: 'Enter an event name.',
					variant: 'error'
				});
				return;
			}

			const payloadDefinition = getHandlerFieldDefinition(handler.fieldDefinitions, 'payload');

			try {
				const payload = resolvePayload(app, payloadDefinition, payloadField, context);

				await app.overlay.broadcast(overlayId.trim(), event.trim(), payload);
				next();
			} catch (error) {
				app.toast.create({
					title: 'Send to Overlay failed',
					description:
						error instanceof Error ? error.message : 'Failed to send overlay event.',
					variant: 'error'
				});
			}
		}
	}) satisfies HandlerDefinitionProps;
