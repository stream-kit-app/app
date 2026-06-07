import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { getFieldValue, resolveFieldText } from '../../get-field-value';
import { resolveBroadcasterId, resolveChannel } from '../../lib/handler-helpers';
import { CHAT_TEXT_VARIABLES } from '../../lib/variables';
import { getTwitch } from '../../lib/plugin-api';

export const createSendMessageHandler = (app: PluginAppApi) => {
	return {
		id: 'twitch-chat-send',
		name: 'Send Message',
		fields: [
			{
				type: 'text',
				key: 'message',
				name: 'Message',
				required: true,
				placeholder: 'Hello {username}, welcome!',
				variables: CHAT_TEXT_VARIABLES
			},
			{
				type: 'switch',
				key: 'as-bot',
				name: 'As bot',
				required: false,
				placeholder: 'Send message as bot'
			}
		],
		execute: (_action, handler, context) => {
			const message = resolveFieldText(handler.fields, 'message', context);
			const asBot = getFieldValue(handler.fields, 'as-bot') === true;
			const channel = resolveChannel(context as { channel?: string }, app);
			const broadcasterId = resolveBroadcasterId(context as { broadcasterId?: string }, app);

			if (typeof message !== 'string' || !message.trim() || !channel) {
				return;
			}

			if (asBot && broadcasterId && getTwitch(app).userId && getTwitch(app).client) {
				void getTwitch(app).client.chat.sendChatMessageAsApp(
					getTwitch(app).userId,
					broadcasterId,
					message.trim()
				);
				return;
			}

			void getTwitch(app).chat?.say(channel, message.trim());
		}
	} satisfies HandlerDefinitionProps;
};
