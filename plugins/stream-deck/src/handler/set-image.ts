import type { HandlerDefinitionProps, PluginAppApi } from '@stream-kit/plugin';

import { emitFeedback } from '../lib/api-bridge';
import { resolveFieldText } from '../lib/get-field-value';
import { streamDeck } from '../lib/instances';
import { aliasField } from './shared';

export function createSetImageHandler(app: PluginAppApi) {
	return {
		name: 'Set Image',
		fields: [
			aliasField(),
			{
				type: 'text',
				name: 'Image',
				placeholder: 'data:image/png;base64,… or path/URL'
			}
		],
		execute: async (_action, handler, context, next) => {
			const alias = resolveFieldText(handler.fields, 'alias', context.data).trim();
			const image = resolveFieldText(handler.fields, 'image', context.data).trim();

			if (!image) {
				app.toast.create({
					title: app.i18n.translate('Stream Deck image is required'),
					variant: 'warning'
				});
				next();
				return;
			}

			const payload = streamDeck.buildFeedbackPayload(alias || undefined, { image });
			await emitFeedback(app, 'setImage', payload);
			next();
		}
	} satisfies HandlerDefinitionProps;
}
