import type { HandlerDefinitionProps, PluginAppApi } from '@stream-kit/plugin';

import { emitFeedback } from '../lib/api-bridge';
import { resolveFieldText } from '../lib/get-field-value';
import { streamDeck } from '../lib/instances';
import { aliasField } from './shared';

export function createSetTitleHandler(app: PluginAppApi) {
	return {
		name: 'Set Title',
		fields: [
			aliasField(),
			{
				type: 'text',
				name: 'Title',
				placeholder: '{alias}'
			}
		],
		execute: async (_action, handler, context, next) => {
			const alias = resolveFieldText(handler.fields, 'alias', context.data).trim();
			const title = resolveFieldText(handler.fields, 'title', context.data);

			const payload = streamDeck.buildFeedbackPayload(alias || undefined, { title });
			await emitFeedback(app, 'setTitle', payload);
			next();
		}
	} satisfies HandlerDefinitionProps;
}
