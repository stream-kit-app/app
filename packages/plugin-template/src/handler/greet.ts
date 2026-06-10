import type { HandlerDefinitionProps } from '@stream-kit/core';

export const createGreetHandler = (): HandlerDefinitionProps => ({
	name: 'Show greeting',
	fields: [
		{
			type: 'text',
			name: 'Message',
			required: true,
			placeholder: 'Hello from Stream Kit!'
		}
	],
	execute: (_action, handler, _context, next) => {
		const messageField = handler.fields[0];
		const message =
			typeof messageField?.value === 'string' && messageField.value.trim()
				? messageField.value.trim()
				: 'Hello from Stream Kit!';

		console.info(`[hello-world] ${message}`);
		next();
	}
});
