import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import type { ChatMessageContext } from '../../contexts';
import { resolveBroadcasterId } from '../../lib/handler-helpers';
import { getTwitch } from '../../lib/plugin-api';

export const createClearChatHandler = (app: PluginAppApi) =>
	({
		name: 'Clear Chat',
		execute: (_action, _handler, context) => {
			const broadcasterId =
				(context as ChatMessageContext).msg?.channelId ??
				resolveBroadcasterId(context as { broadcasterId?: string }, app);

			if (!broadcasterId) {
				return;
			}

			void getTwitch(app).client?.moderation.deleteChatMessages(broadcasterId);
		}
	}) satisfies HandlerDefinitionProps;
