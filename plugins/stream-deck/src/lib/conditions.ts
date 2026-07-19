import type { ConditionDefinition, ConditionGroupNode, FieldValue } from '@stream-kit/plugin';

import { matchText } from './match-text';
import { evaluateWith } from './trigger-helpers';
import type { StreamDeckEventContext } from './types';

const textMatchOperators = [
	{ value: 'equals', label: 'Equals' },
	{ value: 'contains', label: 'Contains' },
	{ value: 'startsWith', label: 'Starts with' },
	{ value: 'endsWith', label: 'Ends with' }
] as const;

export function aliasCondition(): ConditionDefinition {
	return {
		type: 'select-text',
		name: 'Alias',
		placeholder: 'Button alias',
		defaultValue: { type: 'equals', value: '' },
		items: [...textMatchOperators]
	};
}

export function actionCondition(): ConditionDefinition {
	return {
		type: 'select-text',
		name: 'Action UUID',
		placeholder: 'app.stream-kit.streamdeck.run-action',
		defaultValue: { type: 'equals', value: '' },
		items: [...textMatchOperators]
	};
}

export function deviceCondition(): ConditionDefinition {
	return {
		type: 'select-text',
		name: 'Device',
		placeholder: 'Device id',
		defaultValue: { type: 'equals', value: '' },
		items: [...textMatchOperators]
	};
}

export function streamDeckFilterConditions(): ConditionDefinition[] {
	return [aliasCondition(), actionCondition(), deviceCondition()];
}

function evaluateTextMatch(actual: string | undefined, value: FieldValue): boolean {
	if (!value || typeof value !== 'object' || !('value' in value)) {
		return true;
	}

	const match = value as { type: string; value: string };

	if (!match.value?.trim()) {
		return true;
	}

	return matchText(actual ?? '', match.type, match.value);
}

export function validateStreamDeckEvent(
	conditions: ConditionGroupNode,
	context: unknown
): boolean {
	const event = context as StreamDeckEventContext;

	return evaluateWith(conditions, context, {
		alias: (value) => evaluateTextMatch(event.alias, value),
		'action-uuid': (value) => evaluateTextMatch(event.action, value),
		device: (value) => evaluateTextMatch(event.device, value)
	});
}
