import type { App } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { getFieldValue } from '../../get-field-value';
import { resolveBroadcasterId } from '../../lib/handler-helpers';

export const createRaidStartHandler = (app: App) =>
	({
		id: 'twitch-channel-raid-start',
		name: 'Start Raid',
		fields: [
			{
				type: 'text',
				key: 'target',
				name: 'Target Channel',
				required: true,
				placeholder: 'Channel to raid'
			}
		],
		execute: (_action, handler, context) => {
			const target = getFieldValue(handler.fields, 'target');
			const broadcasterId = resolveBroadcasterId(context as { broadcasterId?: string }, app);

			if (typeof target !== 'string' || !target.trim() || !broadcasterId) {
				return;
			}

			void app.twitch.client?.raids.startRaid(broadcasterId, target.trim());
		}
	}) satisfies HandlerDefinitionProps;
