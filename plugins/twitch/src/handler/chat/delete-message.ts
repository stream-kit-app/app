import type { PluginAppApi } from '@stream-kit/plugin';
import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import type { ChatMessageContext } from '../../contexts';
import { getFieldValue } from '../../get-field-value';
import { resolveBroadcasterId } from '../../lib/handler-helpers';
import { getTwitch } from '../../lib/plugin-api';

export const createDeleteMessageHandler = (app: PluginAppApi) =>
	({
		name: 'Delete Message',
		fields: [
			{
				type: 'text',
				name: 'Message ID',
				placeholder: 'Leave empty to use trigger message'
			}
		],
		execute: (_action, handler, context, next) => {
			const fieldMessageId = getFieldValue(handler.fields, 'messageId');
			const triggerData = context.data as ChatMessageContext;
			const messageId =
				(typeof fieldMessageId === 'string' && fieldMessageId.trim()) ||
				triggerData.msg?.id ||
				undefined;
			const broadcasterId =
				triggerData.msg?.channelId ?? resolveBroadcasterId(context, app);

			if (!broadcasterId || !messageId) {
				return;
			}

			void getTwitch(app).client?.moderation.deleteChatMessages(broadcasterId, messageId);
			next();
		}
	}) satisfies HandlerDefinitionProps;
