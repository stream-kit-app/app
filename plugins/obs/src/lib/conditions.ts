import type { ConditionDefinition, FieldValue } from '@stream-kit/core';

import { matchText } from '../match-text';

export const sceneMatchOperators = [
	{ value: 'startsWith', label: 'Starts with' },
	{ value: 'endsWith', label: 'Ends with' },
	{ value: 'contains', label: 'Contains' },
	{ value: 'equals', label: 'Equals' }
] as const;

export function sceneMatchCondition(name = 'Scene name'): ConditionDefinition {
	return {
		type: 'select-text',
		name,
		placeholder: 'Scene name',
		defaultValue: { type: 'equals', value: '' },
		items: [...sceneMatchOperators]
	};
}

export function evaluateSceneMatch(sceneName: string, value: FieldValue): boolean {
	const match = value as { type: string; value: string };

	if (!match.value?.trim()) {
		return true;
	}

	return matchText(sceneName, match.type, match.value);
}
