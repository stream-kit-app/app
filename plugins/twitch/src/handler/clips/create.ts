import type { App } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { resolveBroadcasterId } from '../../lib/handler-helpers';

export const createClipHandler = (app: App) =>
	({
		id: 'twitch-clip-create',
		name: 'Create Clip',
		execute: (_action, _handler, context) => {
			const broadcasterId = resolveBroadcasterId(context as { broadcasterId?: string }, app);

			if (!broadcasterId) {
				return;
			}

			void app.twitch.client?.clips.createClip({ channel: broadcasterId });
		}
	}) satisfies HandlerDefinitionProps;
