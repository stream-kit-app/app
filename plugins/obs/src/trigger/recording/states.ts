import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import type { OutputStateContext } from '../../contexts';
import { OBS_EVENTS } from '../../lib/event-hub';
import { createTestOutputStateContext } from '../../lib/test-contexts';
import { createOnTest, createSimpleActivate, createDeactivate } from '../../lib/trigger-helpers';
import { subscribeObsEvent } from '../../lib/websocket-setup';

function createRecordingStateTrigger(name: string, eventKey: string) {
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

export const createRecordingPausedTrigger = createRecordingStateTrigger(
	'Recording Paused',
	OBS_EVENTS.RECORDING_PAUSED
);

export const createRecordingResumedTrigger = createRecordingStateTrigger(
	'Recording Resumed',
	OBS_EVENTS.RECORDING_RESUMED
);
