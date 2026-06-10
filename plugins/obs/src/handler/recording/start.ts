import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { getObs } from '../../lib/plugin-api';

export const createStartRecordingHandler = (app: PluginAppApi) =>
	({
		name: 'Start Recording',
		execute: () => {
			const client = getObs(app).client;

			if (!client) {
				return;
			}

			void client.call('StartRecord');
		}
	}) satisfies HandlerDefinitionProps;
