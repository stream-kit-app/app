import type { App } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { getFieldValue } from '../../get-field-value';
import { resolveBroadcasterId } from '../../lib/handler-helpers';

export const createCommercialHandler = (app: App) =>
	({
		id: 'twitch-channel-commercial',
		name: 'Run Commercial',
		fields: [
			{
				type: 'text',
				key: 'length',
				name: 'Length (seconds)',
				placeholder: '30, 60, 90, 120, 150, or 180'
			}
		],
		execute: (_action, handler, context) => {
			const lengthValue = getFieldValue(handler.fields, 'length');
			const broadcasterId = resolveBroadcasterId(context as { broadcasterId?: string }, app);
			const length = Number.parseInt(
				typeof lengthValue === 'string' ? lengthValue : '30',
				10
			) as 30 | 60 | 90 | 120 | 150 | 180;

			if (!broadcasterId) {
				return;
			}

			void app.twitch.client?.channels.startChannelCommercial(broadcasterId, length);
		}
	}) satisfies HandlerDefinitionProps;
