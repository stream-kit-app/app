import type { ConditionDefinition } from '@stream-kit/plugin';

export function hotkeyCondition(): ConditionDefinition {
	return {
		type: 'hotkey',
		name: 'Hotkey',
		placeholder: 'Click and press keys…',
		required: true
	};
}
