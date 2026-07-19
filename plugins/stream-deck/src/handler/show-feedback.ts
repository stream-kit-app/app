import type { HandlerDefinitionProps, PluginAppApi } from '@stream-kit/plugin';

import { emitFeedback } from '../lib/api-bridge';
import { resolveFieldText } from '../lib/get-field-value';
import { streamDeck } from '../lib/instances';
import { aliasField } from './shared';

export function createShowOkHandler(app: PluginAppApi) {
	return {
		name: 'Show OK',
		fields: [aliasField()],
		execute: async (_action, handler, context, next) => {
			const alias = resolveFieldText(handler.fields, 'alias', context.data).trim();
			const payload = streamDeck.buildFeedbackPayload(alias || undefined, {});
			await emitFeedback(app, 'showOk', payload);
			next();
		}
	} satisfies HandlerDefinitionProps;
}

export function createShowAlertHandler(app: PluginAppApi) {
	return {
		name: 'Show Alert',
		fields: [aliasField()],
		execute: async (_action, handler, context, next) => {
			const alias = resolveFieldText(handler.fields, 'alias', context.data).trim();
			const payload = streamDeck.buildFeedbackPayload(alias || undefined, {});
			await emitFeedback(app, 'showAlert', payload);
			next();
		}
	} satisfies HandlerDefinitionProps;
}
