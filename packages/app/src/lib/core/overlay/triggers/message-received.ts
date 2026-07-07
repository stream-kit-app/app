import type { App } from '../../app.svelte';
import type { ConditionDefinition, FieldValue } from '../../action/trigger/condition';
import type { TriggerDefinitionProps } from '../../action/trigger/types';

import type { OverlayMessageContext } from '../contexts';
import { createTestOverlayMessageContext } from '../contexts';
import {
	evaluateEventMatch,
	evaluateJsonFieldMatch,
	evaluateOverlayMatch,
	eventMatchCondition,
	jsonFieldCondition,
	overlaySelectCondition
} from '../lib/conditions';
import { createActivate, createDeactivate, createOnTest, evaluateWith } from '../lib/trigger-helpers';
import { readOverlayManifest } from '../overlay-settings.svelte';

function eventNameCondition(app: App): ConditionDefinition {
	return {
		type: 'select',
		name: 'Event name',
		placeholder: 'Any event',
		items: async () => {
			const events = new Set<string>();

			for (const overlay of app.overlay.items) {
				try {
					const manifest = await readOverlayManifest(overlay.id);

					for (const event of manifest.outgoingEvents ?? []) {
						events.add(event);
					}
				} catch {
					// Ignore overlays without a readable manifest.
				}
			}

			return [...events].map((event) => ({ value: event, label: event }));
		}
	};
}

function evaluateEventNameMatch(event: string, value: FieldValue): boolean {
	if (typeof value !== 'string' || !value.trim()) {
		return true;
	}

	return event === value.trim();
}

export const createMessageReceivedTrigger = (app: App) =>
	({
		name: 'Message Received',
		conditions: [
			overlaySelectCondition(async () =>
				app.overlay.items.map((overlay) => ({
					value: overlay.id,
					label: overlay.name
				}))
			),
			eventNameCondition(app),
			eventMatchCondition(),
			jsonFieldCondition()
		],
		validate: (conditions, context) => {
			const ctx = context as OverlayMessageContext;

			return evaluateWith(conditions, context, {
				overlay: (value) => evaluateOverlayMatch(ctx.overlayId, value),
				'event-name': (value) => evaluateEventNameMatch(ctx.event, value),
				event: (value) => evaluateEventMatch(ctx.event, value),
				'json-field': (value) => evaluateJsonFieldMatch(ctx.payload, value)
			});
		},
		activate: createActivate<OverlayMessageContext>(
			(handler) => app.overlay.messages.onMessage(handler),
			(conditions, context) =>
				evaluateWith(conditions, context, {
					overlay: (value) => evaluateOverlayMatch(context.overlayId, value),
					'event-name': (value) => evaluateEventNameMatch(context.event, value),
					event: (value) => evaluateEventMatch(context.event, value),
					'json-field': (value) => evaluateJsonFieldMatch(context.payload, value)
				})
		),
		deactivate: createDeactivate(),
		onTest: createOnTest(() => createTestOverlayMessageContext())
	}) satisfies TriggerDefinitionProps;
