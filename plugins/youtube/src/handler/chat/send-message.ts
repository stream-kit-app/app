import type { PluginAppApi } from '@stream-kit/plugin';
import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { resolveFieldText } from '../../get-field-value';
import { resolveLiveChatId } from '../../lib/handler-helpers';
import { getYouTube } from '../../lib/plugin-api';
import { CHAT_TEXT_VARIABLES } from '../../lib/variables';

export const createSendMessageHandler = (app: PluginAppApi) =>
	({
		name: 'Send Message',
		fields: [
			{
				type: 'text',
				name: 'Message',
				required: true,
				placeholder: 'Hello {username}, welcome!',
				variables: CHAT_TEXT_VARIABLES
			}
		],
		execute: (_action, handler, context, next) => {
			const message = resolveFieldText(handler.fields, 'message', context);
			const liveChatId = resolveLiveChatId(context, app);
			const client = getYouTube(app).client;

			if (typeof message !== 'string' || !message.trim() || !liveChatId || !client) {
				return;
			}

			void client.insertLiveChatMessage(liveChatId, message.trim());
			next();
		}
	}) satisfies HandlerDefinitionProps;
