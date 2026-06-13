import type { PluginAppApi } from '@stream-kit/plugin';
import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { resolveBroadcasterId } from '../../lib/handler-helpers';
import { getTwitch } from '../../lib/plugin-api';

export const createClipHandler = (app: PluginAppApi) =>
	({
		name: 'Create Clip',
		execute: (_action, _handler, context, next) => {
			const broadcasterId = resolveBroadcasterId(context, app);

			if (!broadcasterId) {
				return;
			}

			void getTwitch(app).client?.clips.createClip({ channel: broadcasterId });
			next();
		}
	}) satisfies HandlerDefinitionProps;
