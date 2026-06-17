import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import type { OutputStateContext } from '../../contexts';
import { OBS_EVENTS } from '../../lib/event-hub';
import { createTestOutputStateContext } from '../../lib/test-contexts';
import { createOnTest, createSimpleActivate, createDeactivate } from '../../lib/trigger-helpers';
import { subscribeObsEvent } from '../../lib/websocket-setup';

function createOutputStateTrigger(name: string, eventKey: string) {
	return (_app: PluginAppApi) =>
		({
			name,
			activate: createSimpleActivate((handler) =>
				subscribeObsEvent<OutputStateContext>(eventKey, handler)
			),
			onTest: createOnTest(() => createTestOutputStateContext()),
			deactivate: createDeactivate()
		}) satisfies TriggerDefinitionProps;
}

export const createStreamStartingTrigger = createOutputStateTrigger(
	'Stream Starting',
	OBS_EVENTS.STREAM_STARTING
);

export const createStreamStoppingTrigger = createOutputStateTrigger(
	'Stream Stopping',
	OBS_EVENTS.STREAM_STOPPING
);

export const createStreamReconnectingTrigger = createOutputStateTrigger(
	'Stream Reconnecting',
	OBS_EVENTS.STREAM_RECONNECTING
);
