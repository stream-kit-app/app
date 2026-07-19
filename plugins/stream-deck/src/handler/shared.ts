import type { HandlerFieldDefinition } from '@stream-kit/plugin';

export function aliasField(): HandlerFieldDefinition {
	return {
		type: 'text',
		name: 'Alias',
		placeholder: 'Leave empty to use last pressed key'
	};
}
