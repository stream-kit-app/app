import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { getFieldValue } from '../../get-field-value';
import { resolveBroadcasterId } from '../../lib/handler-helpers';
import { getTwitch } from '../../lib/plugin-api';

export const createCommercialHandler = (app: PluginAppApi) =>
	({
		name: 'Run Commercial',
		fields: [
			{
				type: 'text',
				name: 'Length (seconds)',
				placeholder: '30, 60, 90, 120, 150, or 180'
			}
		],
		execute: (_action, handler, context, next) => {
			const lengthValue = getFieldValue(handler.fields, 'length');
			const broadcasterId = resolveBroadcasterId(context, app);
			const length = Number.parseInt(
				typeof lengthValue === 'string' ? lengthValue : '30',
				10
			) as 30 | 60 | 90 | 120 | 150 | 180;

			if (!broadcasterId) {
				return;
			}

			void getTwitch(app).client?.channels.startChannelCommercial(broadcasterId, length);
			next();
		}
	}) satisfies HandlerDefinitionProps;
