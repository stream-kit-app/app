import type { HandlerDefinitionProps, PluginAppApi } from '@stream-kit/plugin';

import { resolveFieldText } from '../../get-field-value';
import { getDiscord } from '../../lib/plugin-api';
import { MESSAGE_TEXT_VARIABLES } from '../../lib/variables';

export const createSendMessageHandler = (app: PluginAppApi) =>
	({
		name: 'Send Message',
		fields: [
			{
				type: 'text',
				name: 'Channel ID',
				required: true,
				placeholder: 'Discord channel snowflake',
				variables: MESSAGE_TEXT_VARIABLES
			},
			{
				type: 'text',
				name: 'Message',
				required: true,
				placeholder: 'Hello {user}!',
				variables: MESSAGE_TEXT_VARIABLES
			}
		],
		execute: (_action, handler, context, next) => {
			const channelId = resolveFieldText(handler.fields, 'channel-id', context);
			const message = resolveFieldText(handler.fields, 'message', context);

			if (
				typeof channelId !== 'string' ||
				!channelId.trim() ||
				typeof message !== 'string' ||
				!message.trim()
			) {
				return;
			}

			void getDiscord(app).sendMessage(channelId.trim(), message.trim());
			next();
		}
	}) satisfies HandlerDefinitionProps;
