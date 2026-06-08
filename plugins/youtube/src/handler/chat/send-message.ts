import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { resolveFieldText } from '../../get-field-value';
import { resolveLiveChatId } from '../../lib/handler-helpers';
import { getYouTube } from '../../lib/plugin-api';
import { CHAT_TEXT_VARIABLES } from '../../lib/variables';

export const createSendMessageHandler = (app: PluginAppApi) =>
	({
		id: 'youtube-chat-send',
		name: 'Send Message',
		fields: [
			{
				type: 'text',
				key: 'message',
				name: 'Message',
				required: true,
				placeholder: 'Hello {username}, welcome!',
				variables: CHAT_TEXT_VARIABLES
			}
		],
		execute: (_action, handler, context) => {
			const message = resolveFieldText(handler.fields, 'message', context);
			const liveChatId = resolveLiveChatId(context as { liveChatId?: string }, app);
			const client = getYouTube(app).client;

			if (typeof message !== 'string' || !message.trim() || !liveChatId || !client) {
				return;
			}

			void client.insertLiveChatMessage(liveChatId, message.trim());
		}
	}) satisfies HandlerDefinitionProps;
