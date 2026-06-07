import type { App } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import type { ChatMessageContext } from '../../contexts';
import { resolveBroadcasterId } from '../../lib/handler-helpers';

export const createClearChatHandler = (app: App) =>
	({
		id: 'twitch-chat-clear',
		name: 'Clear Chat',
		execute: (_action, _handler, context) => {
			const broadcasterId =
				(context as ChatMessageContext).msg?.channelId ??
				resolveBroadcasterId(context as { broadcasterId?: string }, app);

			if (!broadcasterId) {
				return;
			}

			void app.twitch.client?.moderation.deleteChatMessages(broadcasterId);
		}
	}) satisfies HandlerDefinitionProps;
