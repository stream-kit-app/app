import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { OutputStateContext } from '../../contexts';
import { OBS_EVENTS } from '../../lib/event-hub';
import { createSimpleActivate, createDeactivate } from '../../lib/trigger-helpers';
import { subscribeObsEvent } from '../../lib/websocket-setup';

export const createReplayBufferStartedTrigger = (_app: PluginAppApi) =>
	({
		name: 'Replay Buffer Started',
		activate: createSimpleActivate((handler) =>
			subscribeObsEvent<OutputStateContext>(OBS_EVENTS.REPLAY_BUFFER_STARTED, handler)
		),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;

export const createReplayBufferStoppedTrigger = (_app: PluginAppApi) =>
	({
		name: 'Replay Buffer Stopped',
		activate: createSimpleActivate((handler) =>
			subscribeObsEvent<OutputStateContext>(OBS_EVENTS.REPLAY_BUFFER_STOPPED, handler)
		),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;

export const createReplayBufferSavedTrigger = (_app: PluginAppApi) =>
	({
		name: 'Replay Saved',
		activate: createSimpleActivate((handler) =>
			subscribeObsEvent<OutputStateContext>(OBS_EVENTS.REPLAY_BUFFER_SAVED, handler)
		),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
