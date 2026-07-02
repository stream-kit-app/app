import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { getFieldValue } from '@stream-kit/core';

export const createGreetHandler = (): HandlerDefinitionProps => ({
	name: 'Show greeting',
	fields: [
		{
			key: 'message',
			type: 'text',
			name: 'Message',
			required: true,
			placeholder: 'Hello from Stream Kit!'
		}
	],
	execute: (_action, handler, _context, next) => {
		const message = getFieldValue(handler.fields, 'message');
		const text =
			typeof message === 'string' && message.trim()
				? message.trim()
				: 'Hello from Stream Kit!';

		console.info(`[hello-world] ${text}`);
		next();
	}
});
