import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { OutputStateContext } from '../../contexts';
import { OBS_EVENTS } from '../../lib/event-hub';
import { createTestOutputStateContext } from '../../lib/test-contexts';
import { createOnTest, createSimpleActivate, createDeactivate } from '../../lib/trigger-helpers';
import { subscribeObsEvent } from '../../lib/websocket-setup';

export const createVirtualCamStartedTrigger = (_app: PluginAppApi) =>
	({
		name: 'Virtual Camera Started',
		activate: createSimpleActivate((handler) =>
			subscribeObsEvent<OutputStateContext>(OBS_EVENTS.VIRTUALCAM_STARTED, handler)
		),
		onTest: createOnTest(() => createTestOutputStateContext()),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;

export const createVirtualCamStoppedTrigger = (_app: PluginAppApi) =>
	({
		name: 'Virtual Camera Stopped',
		activate: createSimpleActivate((handler) =>
			subscribeObsEvent<OutputStateContext>(OBS_EVENTS.VIRTUALCAM_STOPPED, handler)
		),
		onTest: createOnTest(() => createTestOutputStateContext()),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
