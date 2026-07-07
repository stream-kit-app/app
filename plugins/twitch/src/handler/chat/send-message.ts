import type { PluginAppApi } from '@stream-kit/plugin';
import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { getFieldValue, resolveFieldText } from '../../get-field-value';
import { resolveBroadcasterId, resolveChannel } from '../../lib/handler-helpers';
import { CHAT_TEXT_VARIABLES } from '../../lib/variables';
import { getTwitch } from '../../lib/plugin-api';

export const createSendMessageHandler = (app: PluginAppApi) => {
	return {
		name: 'Send Message',
		fields: [
			{
				type: 'text',
				name: 'Message',
				required: true,
				placeholder: 'Hello {username}, welcome!',
				variables: CHAT_TEXT_VARIABLES
			},
			{
				type: 'switch',
				name: 'As bot',
				required: false,
				placeholder: 'Send message as bot'
			}
		],
		execute: (_action, handler, context, next) => {
			const message = resolveFieldText(handler.fields, 'message', context);
			const asBot = getFieldValue(handler.fields, 'as-bot') === true;
			const channel = resolveChannel(context, app);
			const broadcasterId = resolveBroadcasterId(context, app);

			if (typeof message !== 'string' || !message.trim() || !channel) {
				return;
			}

			if (asBot && broadcasterId) {
				void getTwitch(app).sendChatMessageAsBot(broadcasterId, message.trim());
				next();
				return;
			}

			void getTwitch(app).chat?.say(channel, message.trim());
			next();
		}
	} satisfies HandlerDefinitionProps;
};
