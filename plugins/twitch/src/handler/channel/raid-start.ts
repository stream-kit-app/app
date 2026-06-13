import type { PluginAppApi } from '@stream-kit/plugin';
import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { getFieldValue } from '../../get-field-value';
import { resolveBroadcasterId } from '../../lib/handler-helpers';
import { getTwitch } from '../../lib/plugin-api';

export const createRaidStartHandler = (app: PluginAppApi) =>
	({
		name: 'Start Raid',
		fields: [
			{
				type: 'text',
				name: 'Target Channel',
				required: true,
				placeholder: 'Channel to raid'
			}
		],
		execute: (_action, handler, context, next) => {
			const target = getFieldValue(handler.fields, 'target');
			const broadcasterId = resolveBroadcasterId(context, app);

			if (typeof target !== 'string' || !target.trim() || !broadcasterId) {
				return;
			}

			void getTwitch(app).client?.raids.startRaid(broadcasterId, target.trim());
			next();
		}
	}) satisfies HandlerDefinitionProps;
