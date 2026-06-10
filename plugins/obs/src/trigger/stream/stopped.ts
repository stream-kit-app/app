import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { OutputStateContext } from '../../contexts';
import { OBS_EVENTS } from '../../lib/event-hub';
import { createSimpleActivate, createDeactivate } from '../../lib/trigger-helpers';
import { subscribeObsEvent } from '../../lib/websocket-setup';

export const createStreamStoppedTrigger = (_app: PluginAppApi) =>
	({
		name: 'Stream Stopped',
		activate: createSimpleActivate((handler) =>
			subscribeObsEvent<OutputStateContext>(OBS_EVENTS.STREAM_STOPPED, handler)
		),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
