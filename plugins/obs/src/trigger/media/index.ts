import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import { OBS_EVENTS } from '../../lib/event-hub';
import { createMediaActionMatchTrigger } from '../../lib/match-triggers';

export const createMediaActionTriggeredTrigger = (app: PluginAppApi) =>
	createMediaActionMatchTrigger(app, {
		name: 'Media Action Triggered',
		eventKey: OBS_EVENTS.MEDIA_ACTION_TRIGGERED
	}) satisfies TriggerDefinitionProps;
