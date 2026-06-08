import type { HandlerDefinitionProps } from '@stream-kit/core';

export const createGreetHandler = (): HandlerDefinitionProps => ({
	id: 'hello-world-greet',
	name: 'Show greeting',
	fields: [
		{
			type: 'text',
			key: 'message',
			name: 'Message',
			required: true,
			placeholder: 'Hello from Stream Kit!'
		}
	],
	execute: (_action, handler, _context) => {
		const messageField = handler.fields.find((field) => field.key === 'message');
		const message =
			typeof messageField?.value === 'string' && messageField.value.trim()
				? messageField.value.trim()
				: 'Hello from Stream Kit!';

		console.info(`[hello-world] ${message}`);
	}
});
