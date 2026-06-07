import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { resolveBroadcasterId } from '../../lib/handler-helpers';
import { getTwitch } from '../../lib/plugin-api';

export const createRaidCancelHandler = (app: PluginAppApi) =>
	({
		id: 'twitch-channel-raid-cancel',
		name: 'Cancel Raid',
		execute: (_action, _handler, context) => {
			const broadcasterId = resolveBroadcasterId(context as { broadcasterId?: string }, app);

			if (!broadcasterId) {
				return;
			}

			void getTwitch(app).client?.raids.cancelRaid(broadcasterId);
		}
	}) satisfies HandlerDefinitionProps;
