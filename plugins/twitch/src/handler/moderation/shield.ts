import type { PluginAppApi } from '@stream-kit/plugin';
import type { HandlerDefinitionProps } from '@stream-kit/plugin';

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
		execute: (_action, handler, context, next) => {
			const broadcasterId = resolveBroadcasterId(context, app);
			const enabled = getFieldValue(handler.fields, 'enabled') === true;

			if (!broadcasterId) {
				return;
			}

			void getTwitch(app).client?.moderation.updateShieldModeStatus(broadcasterId, enabled);
			next();
		}
	}) satisfies HandlerDefinitionProps;
