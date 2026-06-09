import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { getFieldValue, resolveFieldText } from '../../get-field-value';
import { resolveBroadcasterId } from '../../lib/handler-helpers';
import { CHAT_TEXT_VARIABLES } from '../../lib/variables';
import { getTwitch } from '../../lib/plugin-api';

export const createAnnouncementHandler = (app: PluginAppApi) =>
	({
		name: 'Send Announcement',
		fields: [
			{
				type: 'text',
				name: 'Message',
				required: true,
				placeholder: 'Announcement text',
				variables: CHAT_TEXT_VARIABLES
			},
			{
				type: 'text',
				name: 'Color',
				placeholder: 'primary, blue, green, orange, purple'
			}
		],
		execute: (_action, handler, context) => {
			const message = resolveFieldText(handler.fields, 'message', context);
			const color = getFieldValue(handler.fields, 'color');
			const broadcasterId = resolveBroadcasterId(context, app);

			if (typeof message !== 'string' || !message.trim() || !broadcasterId) {
				return;
			}

			void getTwitch(app).client?.chat.sendAnnouncement(broadcasterId, {
				message: message.trim(),
				color: (typeof color === 'string' ? color : 'primary') as
					| 'primary'
					| 'blue'
					| 'green'
					| 'orange'
					| 'purple'
			});
		}
	}) satisfies HandlerDefinitionProps;
