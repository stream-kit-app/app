import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import type { ChatMessageContext } from '../../contexts';
import { getFieldValue } from '../../get-field-value';
import { getYouTube } from '../../lib/plugin-api';

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
		execute: (_action, handler, context) => {
			const fieldMessageId = getFieldValue(handler.fields, 'messageId');
			const triggerData = context.data as ChatMessageContext;
			const messageId =
				(typeof fieldMessageId === 'string' && fieldMessageId.trim()) ||
				triggerData.raw?.id ||
				undefined;
			const client = getYouTube(app).client;

			if (!messageId || !client) {
				return;
			}

			void client.deleteLiveChatMessage(messageId);
		}
	}) satisfies HandlerDefinitionProps;
