import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import { OBS_EVENTS } from '../../lib/event-hub';
import { createTransitionMatchTrigger } from '../../lib/match-triggers';

export const createTransitionStartedTrigger = (app: PluginAppApi) =>
	createTransitionMatchTrigger(app, {
		name: 'Transition Started',
		eventKey: OBS_EVENTS.TRANSITION_STARTED
	}) satisfies TriggerDefinitionProps;

export const createTransitionEndedTrigger = (app: PluginAppApi) =>
	createTransitionMatchTrigger(app, {
		name: 'Transition Ended',
		eventKey: OBS_EVENTS.TRANSITION_ENDED
	}) satisfies TriggerDefinitionProps;
