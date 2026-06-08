import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import { subscribeStreamOnline } from '../../lib/broadcast-setup';
import { createSimpleActivate, createDeactivate } from '../../lib/trigger-helpers';

export const createStreamOnlineTrigger = (_app: PluginAppApi) =>
	({
		id: 'youtube-stream-online',
		name: 'Stream Online',
		activate: createSimpleActivate((handler) => subscribeStreamOnline(handler)),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
