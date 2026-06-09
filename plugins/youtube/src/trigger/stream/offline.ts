import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import { subscribeStreamOffline } from '../../lib/broadcast-setup';
import { createSimpleActivate, createDeactivate } from '../../lib/trigger-helpers';

export const createStreamOfflineTrigger = (_app: PluginAppApi) =>
	({
		name: 'Stream Offline',
		activate: createSimpleActivate((handler) => subscribeStreamOffline(handler)),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
