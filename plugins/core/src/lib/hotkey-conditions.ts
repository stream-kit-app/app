import type { ConditionDefinition } from '@stream-kit/plugin';
import type { HandlerFieldDefinition } from '@stream-kit/plugin';

export function hotkeyCondition(): ConditionDefinition {
	return {
		type: 'hotkey',
		name: 'Hotkey',
		placeholder: 'Click and press keys…',
		required: true
	};
}

export function hotkeyHandlerField(): HandlerFieldDefinition {
	return {
		type: 'hotkey',
		name: 'Hotkey',
		key: 'hotkey',
		placeholder: 'Click and press keys…',
		required: true
	};
}
