import type { App } from '../../app.svelte';
import type { Action } from '../../action/action.svelte';
import type { ActionHandler } from '../../action/action-handler.svelte';
import type { HandlerTriggerContext } from '../../action/handler-context';
import type {
	HandlerDefinitionProps,
	HandlerNext
} from '../../action/handler/types';
import { getHandlerFieldValue } from '../../action/handler-field';

const JSON_NUMBER_PATTERN = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/;

/**
 * Returns the value as a bare JSON literal (number, boolean, or null) when it
 * looks like one, so a quoted placeholder such as `"{prediction}"` becomes a
 * real number instead of a string. Otherwise returns null (treat as string).
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

function resolvePayload(
	app: App,
	template: string | undefined,
	context: HandlerTriggerContext
): unknown {
	if (!template?.trim()) {
		return context.data;
	}

	const core = app.plugins.tryGet<{
		variables: { resolve: (ctx: HandlerTriggerContext) => Record<string, string> };
	}>('core');
	const variables = core?.variables.resolve(context) ?? {};

	let resolved = template;

	for (const [key, value] of Object.entries(variables)) {
		// A standalone quoted placeholder is cast to a JSON number/boolean/null
		// when the value looks like one; otherwise it stays a JSON string.
		const literal = asJsonScalarLiteral(value);
		resolved = resolved.replaceAll(`"{${key}}"`, literal ?? JSON.stringify(value));

		// Embedded placeholders (inside a larger string) get the escaped value.
		const escaped = JSON.stringify(value).slice(1, -1);
		resolved = resolved.replaceAll(`{${key}}`, escaped);
	}

	try {
		return JSON.parse(resolved);
	} catch {
		return resolved;
	}
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
				type: 'json',
				name: 'Payload',
				useContextVariables: true,
				placeholder: '{"username":"{username}","message":"{message}"}'
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
			const payloadTemplate = getHandlerFieldValue(handler.fields, 'payload');

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

			try {
				const payload = resolvePayload(
					app,
					typeof payloadTemplate === 'string' ? payloadTemplate : undefined,
					context
				);

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
