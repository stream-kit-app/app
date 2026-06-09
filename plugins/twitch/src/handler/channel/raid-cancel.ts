import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { resolveBroadcasterId } from '../../lib/handler-helpers';
import { getTwitch } from '../../lib/plugin-api';

export const createRaidCancelHandler = (app: PluginAppApi) =>
	({
		name: 'Cancel Raid',
		execute: (_action, _handler, context) => {
			const broadcasterId = resolveBroadcasterId(context, app);

			if (!broadcasterId) {
				return;
			}

			void getTwitch(app).client?.raids.cancelRaid(broadcasterId);
		}
	}) satisfies HandlerDefinitionProps;
