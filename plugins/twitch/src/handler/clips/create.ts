import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { resolveBroadcasterId } from '../../lib/handler-helpers';
import { getTwitch } from '../../lib/plugin-api';

export const createClipHandler = (app: PluginAppApi) =>
	({
		id: 'twitch-clip-create',
		name: 'Create Clip',
		execute: (_action, _handler, context) => {
			const broadcasterId = resolveBroadcasterId(context as { broadcasterId?: string }, app);

			if (!broadcasterId) {
				return;
			}

			void getTwitch(app).client?.clips.createClip({ channel: broadcasterId });
		}
	}) satisfies HandlerDefinitionProps;
