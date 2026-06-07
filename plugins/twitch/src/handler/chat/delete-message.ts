import type { App } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import type { ChatMessageContext } from '../../contexts';
import { getFieldValue } from '../../get-field-value';
import { resolveBroadcasterId } from '../../lib/handler-helpers';

export const createDeleteMessageHandler = (app: App) =>
	({
		id: 'twitch-chat-delete-message',
		name: 'Delete Message',
		fields: [
			{
				type: 'text',
				key: 'messageId',
				name: 'Message ID',
				placeholder: 'Leave empty to use trigger message'
			}
		],
		execute: (_action, handler, context) => {
			const fieldMessageId = getFieldValue(handler.fields, 'messageId');
			const ctx = context as ChatMessageContext;
			const messageId =
				(typeof fieldMessageId === 'string' && fieldMessageId.trim()) ||
				ctx.msg?.id ||
				undefined;
			const broadcasterId = ctx.msg?.channelId ?? resolveBroadcasterId(ctx, app);

			if (!broadcasterId || !messageId) {
				return;
			}

			void app.twitch.client?.moderation.deleteChatMessages(broadcasterId, messageId);
		}
	}) satisfies HandlerDefinitionProps;
