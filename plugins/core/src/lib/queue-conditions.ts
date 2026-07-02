import type { ConditionDefinition, PluginAppApi } from '@stream-kit/plugin';
import type { ActionQueueEventContext } from '@stream-kit/plugin';
import type { HandlerFieldDefinition } from '@stream-kit/plugin';

const QUEUE_ANY = 'any';

export const queueFilterItems = [{ value: QUEUE_ANY, label: 'Any' }] as const;

export function queueFilterCondition(app: PluginAppApi): ConditionDefinition {
	return {
		type: 'select',
		name: 'Queue',
		defaultValue: QUEUE_ANY,
		items: () => [
			{ value: QUEUE_ANY, label: 'Any' },
			...app.actionQueues.definitions.map((queue) => ({
				value: String(queue.id),
				label: queue.name
			}))
		]
	};
}

export function evaluateQueueFilterMatch(
	context: ActionQueueEventContext,
	value: string
): boolean {
	const filter = value.trim();

	if (!filter || filter === QUEUE_ANY) {
		return true;
	}

	const queueId = Number(filter);

	if (!Number.isFinite(queueId)) {
		return false;
	}

	return context.queueId === queueId;
}

export function queueSelectField(app: PluginAppApi): HandlerFieldDefinition {
	return {
		type: 'combobox',
		name: 'Queue',
		key: 'queue',
		placeholder: 'Select a queue',
		loadingPlaceholder: 'Loading queues…',
		required: true,
		items: () =>
			app.actionQueues.definitions.map((queue) => ({
				value: String(queue.id),
				label: queue.name
			}))
	};
}

export function parseQueueId(value: unknown): number | null {
	if (typeof value !== 'string' && typeof value !== 'number') {
		return null;
	}

	const queueId = Number(value);

	return Number.isFinite(queueId) ? queueId : null;
}
