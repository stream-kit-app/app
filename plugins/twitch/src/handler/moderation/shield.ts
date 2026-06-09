import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { getFieldValue } from '../../get-field-value';
import { resolveBroadcasterId } from '../../lib/handler-helpers';
import { getTwitch } from '../../lib/plugin-api';

export const createShieldModeHandler = (app: PluginAppApi) =>
	({
		name: 'Toggle Shield Mode',
		fields: [
			{
				type: 'switch',
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

			void getTwitch(app).client?.moderation.updateShieldModeStatus(broadcasterId, enabled);
		}
	}) satisfies HandlerDefinitionProps;
