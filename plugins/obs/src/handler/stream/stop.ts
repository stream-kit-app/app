import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { getObs } from '../../lib/plugin-api';

export const createStopStreamHandler = (app: PluginAppApi) =>
	({
		name: 'Stop Stream',
		execute: () => {
			const client = getObs(app).client;

			if (!client) {
				return;
			}

			void client.call('StopStream');
		}
	}) satisfies HandlerDefinitionProps;
