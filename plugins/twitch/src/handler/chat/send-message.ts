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

			if (typeof message !== 'string' || !message.trim()) {
				next();
				return;
			}

			const trimmed = message.trim();

			// As bot only needs a broadcaster id — do not require IRC channel first.
			if (asBot) {
				if (!broadcasterId) {
					app.toast.create({
						title: 'Send message failed',
						description: 'Connect Twitch (or provide a broadcaster) to send as bot.',
						variant: 'warning'
					});
					next();
					return;
				}

				void getTwitch(app).sendChatMessageAsBot(broadcasterId, trimmed);
				next();
				return;
			}

			if (!channel) {
				app.toast.create({
					title: 'Send message failed',
					description: 'No Twitch channel available to send to.',
					variant: 'warning'
				});
				next();
				return;
			}

			void getTwitch(app).chat?.say(channel, trimmed);
			next();
		}
	} satisfies HandlerDefinitionProps;
};
