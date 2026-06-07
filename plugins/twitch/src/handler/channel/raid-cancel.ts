import type { App } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { resolveBroadcasterId } from '../../lib/handler-helpers';

export const createRaidCancelHandler = (app: App) =>
	({
		id: 'twitch-channel-raid-cancel',
		name: 'Cancel Raid',
		execute: (_action, _handler, context) => {
			const broadcasterId = resolveBroadcasterId(context as { broadcasterId?: string }, app);

			if (!broadcasterId) {
				return;
			}

			void app.twitch.client?.raids.cancelRaid(broadcasterId);
		}
	}) satisfies HandlerDefinitionProps;
