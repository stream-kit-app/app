import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { getFieldValue } from '../get-field-value';

function delay(ms: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

export const createDelayHandler = () =>
	({
		name: 'Delay',
		fields: [
			{
				type: 'text',
				name: 'Duration (ms)',
				placeholder: '1000',
				defaultValue: '1000',
				required: true
			}
		],
		execute: async (_action, handler, _context, next) => {
			const durationText = getFieldValue(handler.fields, 'duration-ms');
			const duration = Number(typeof durationText === 'string' ? durationText : '0');

			if (!Number.isFinite(duration) || duration < 0) {
				return;
			}

			await delay(Math.round(duration));
			next();
		}
	}) satisfies HandlerDefinitionProps;
