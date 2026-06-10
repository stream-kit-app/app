import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { StudioModeContext } from '../../contexts';
import { OBS_EVENTS } from '../../lib/event-hub';
import { createSimpleActivate, createDeactivate } from '../../lib/trigger-helpers';
import { subscribeObsEvent } from '../../lib/websocket-setup';

export const createStudioModeEnabledTrigger = (_app: PluginAppApi) =>
	({
		name: 'Studio Mode Enabled',
		activate: createSimpleActivate((handler) =>
			subscribeObsEvent<StudioModeContext>(OBS_EVENTS.STUDIO_MODE_ENABLED, handler)
		),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;

export const createStudioModeDisabledTrigger = (_app: PluginAppApi) =>
	({
		name: 'Studio Mode Disabled',
		activate: createSimpleActivate((handler) =>
			subscribeObsEvent<StudioModeContext>(OBS_EVENTS.STUDIO_MODE_DISABLED, handler)
		),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
