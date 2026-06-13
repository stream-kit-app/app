import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import type { OutputStateContext } from '../../contexts';
import { OBS_EVENTS } from '../../lib/event-hub';
import { createTestOutputStateContext } from '../../lib/test-contexts';
import { createOnTest, createSimpleActivate, createDeactivate } from '../../lib/trigger-helpers';
import { subscribeObsEvent } from '../../lib/websocket-setup';

export const createRecordingStoppedTrigger = (_app: PluginAppApi) =>
	({
		name: 'Recording Stopped',
		activate: createSimpleActivate((handler) =>
			subscribeObsEvent<OutputStateContext>(OBS_EVENTS.RECORDING_STOPPED, handler)
		),
		onTest: createOnTest(() => createTestOutputStateContext()),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
