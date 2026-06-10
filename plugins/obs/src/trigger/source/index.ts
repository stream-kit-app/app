import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import { OBS_EVENTS } from '../../lib/event-hub';
import { createInputMatchTrigger, createMediaMatchTrigger } from '../../lib/match-triggers';

export const createInputMutedTrigger = (app: PluginAppApi) =>
	createInputMatchTrigger(app, {
		name: 'Input Muted',
		eventKey: OBS_EVENTS.INPUT_MUTED
	}) satisfies TriggerDefinitionProps;

export const createInputUnmutedTrigger = (app: PluginAppApi) =>
	createInputMatchTrigger(app, {
		name: 'Input Unmuted',
		eventKey: OBS_EVENTS.INPUT_UNMUTED
	}) satisfies TriggerDefinitionProps;

export const createInputShownTrigger = (app: PluginAppApi) =>
	createInputMatchTrigger(app, {
		name: 'Input Shown',
		eventKey: OBS_EVENTS.INPUT_SHOWN
	}) satisfies TriggerDefinitionProps;

export const createInputHiddenTrigger = (app: PluginAppApi) =>
	createInputMatchTrigger(app, {
		name: 'Input Hidden',
		eventKey: OBS_EVENTS.INPUT_HIDDEN
	}) satisfies TriggerDefinitionProps;

export const createMediaStartedTrigger = (app: PluginAppApi) =>
	createMediaMatchTrigger(app, {
		name: 'Media Started',
		eventKey: OBS_EVENTS.MEDIA_STARTED
	}) satisfies TriggerDefinitionProps;

export const createMediaEndedTrigger = (app: PluginAppApi) =>
	createMediaMatchTrigger(app, {
		name: 'Media Ended',
		eventKey: OBS_EVENTS.MEDIA_ENDED
	}) satisfies TriggerDefinitionProps;
