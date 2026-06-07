import type { App } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { getFieldValue } from '../../get-field-value';
import { resolveBroadcasterId } from '../../lib/handler-helpers';

export const createShieldModeHandler = (app: App) =>
	({
		id: 'twitch-mod-shield',
		name: 'Toggle Shield Mode',
		fields: [
			{
				type: 'switch',
				key: 'enabled',
				name: 'Enable Shield Mode',
				required: true
			}
		],
		execute: (_action, handler, context) => {
			const broadcasterId = resolveBroadcasterId(context as { broadcasterId?: string }, app);
			const enabled = getFieldValue(handler.fields, 'enabled') === true;

			if (!broadcasterId) {
				return;
			}

			void app.twitch.client?.moderation.updateShieldModeStatus(broadcasterId, enabled);
		}
	}) satisfies HandlerDefinitionProps;
