import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { getObs } from '../../lib/plugin-api';

export const createStartStreamHandler = (app: PluginAppApi) =>
	({
		name: 'Start Stream',
		execute: () => {
			const client = getObs(app).client;

			if (!client) {
				return;
			}

			void client.call('StartStream');
		}
	}) satisfies HandlerDefinitionProps;
