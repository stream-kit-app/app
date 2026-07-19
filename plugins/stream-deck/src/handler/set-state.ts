import type { HandlerDefinitionProps, PluginAppApi } from '@stream-kit/plugin';

import { emitFeedback } from '../lib/api-bridge';
import { resolveFieldText } from '../lib/get-field-value';
import { streamDeck } from '../lib/instances';
import { aliasField } from './shared';

export function createSetStateHandler(app: PluginAppApi) {
	return {
		name: 'Set State',
		fields: [
			aliasField(),
			{
				type: 'text',
				name: 'State',
				placeholder: '0 or 1'
			}
		],
		execute: async (_action, handler, context, next) => {
			const alias = resolveFieldText(handler.fields, 'alias', context.data).trim();
			const stateRaw = resolveFieldText(handler.fields, 'state', context.data).trim();
			const state = Number(stateRaw);

			if (!Number.isFinite(state) || (state !== 0 && state !== 1)) {
				app.toast.create({
					title: app.i18n.translate('Stream Deck state must be 0 or 1'),
					variant: 'warning'
				});
				next();
				return;
			}

			const payload = streamDeck.buildFeedbackPayload(alias || undefined, { state });
			await emitFeedback(app, 'setState', payload);
			next();
		}
	} satisfies HandlerDefinitionProps;
}
