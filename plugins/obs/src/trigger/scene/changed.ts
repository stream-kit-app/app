import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import { OBS_EVENTS } from '../../lib/event-hub';
import { createSceneMatchTrigger } from '../../lib/scene-trigger';

export const createSceneChangedTrigger = (app: PluginAppApi) =>
	createSceneMatchTrigger(app, {
		name: 'Scene Changed',
		eventKey: OBS_EVENTS.SCENE_CHANGED
	}) satisfies TriggerDefinitionProps;

export { createPreviewSceneChangedTrigger } from '../../lib/scene-trigger';
