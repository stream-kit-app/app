import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import { OBS_EVENTS } from '../../lib/event-hub';
import { createFilterMatchTrigger } from '../../lib/match-triggers';

export const createFilterEnabledTrigger = (app: PluginAppApi) =>
	createFilterMatchTrigger(app, {
		name: 'Filter Enabled',
		eventKey: OBS_EVENTS.FILTER_ENABLED
	}) satisfies TriggerDefinitionProps;

export const createFilterDisabledTrigger = (app: PluginAppApi) =>
	createFilterMatchTrigger(app, {
		name: 'Filter Disabled',
		eventKey: OBS_EVENTS.FILTER_DISABLED
	}) satisfies TriggerDefinitionProps;
