import type { ConditionDefinition, FieldValue } from '@stream-kit/plugin';

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

export function inputMatchCondition(name = 'Input name'): ConditionDefinition {
	return {
		type: 'select-text',
		name,
		placeholder: 'Input name',
		defaultValue: { type: 'equals', value: '' },
		items: [...sceneMatchOperators]
	};
}

export function transitionMatchCondition(name = 'Transition name'): ConditionDefinition {
	return {
		type: 'select-text',
		name,
		placeholder: 'Transition name',
		defaultValue: { type: 'equals', value: '' },
		items: [...sceneMatchOperators]
	};
}

export function evaluateInputMatch(inputName: string, value: FieldValue): boolean {
	return evaluateSceneMatch(inputName, value);
}

export function evaluateTransitionMatch(transitionName: string, value: FieldValue): boolean {
	return evaluateSceneMatch(transitionName, value);
}

export function filterMatchCondition(name = 'Filter name'): ConditionDefinition {
	return {
		type: 'select-text',
		name,
		placeholder: 'Filter name',
		defaultValue: { type: 'equals', value: '' },
		items: [...sceneMatchOperators]
	};
}

export function evaluateFilterMatch(filterName: string, value: FieldValue): boolean {
	return evaluateSceneMatch(filterName, value);
}

export function mediaActionMatchCondition(name = 'Media action'): ConditionDefinition {
	return {
		type: 'select',
		name,
		placeholder: 'Any action',
		defaultValue: '',
		items: [
			{ value: '', label: 'Any action' },
			{ value: 'OBS_WEBSOCKET_MEDIA_INPUT_ACTION_PLAY', label: 'Play' },
			{ value: 'OBS_WEBSOCKET_MEDIA_INPUT_ACTION_PAUSE', label: 'Pause' },
			{ value: 'OBS_WEBSOCKET_MEDIA_INPUT_ACTION_STOP', label: 'Stop' },
			{ value: 'OBS_WEBSOCKET_MEDIA_INPUT_ACTION_RESTART', label: 'Restart' },
			{ value: 'OBS_WEBSOCKET_MEDIA_INPUT_ACTION_NEXT', label: 'Next' },
			{ value: 'OBS_WEBSOCKET_MEDIA_INPUT_ACTION_PREVIOUS', label: 'Previous' }
		]
	};
}

export function evaluateMediaActionMatch(mediaAction: string, value: FieldValue): boolean {
	if (typeof value !== 'string' || !value.trim()) {
		return true;
	}

	return mediaAction === value;
}
