import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { SceneChangedContext } from '../../contexts';
import { evaluateSceneMatch, sceneMatchCondition } from '../../lib/conditions';
import { OBS_EVENTS } from '../../lib/event-hub';
import {
	createActivate,
	createDeactivate,
	evaluateWith
} from '../../lib/trigger-helpers';
import { subscribeObsEvent } from '../../lib/websocket-setup';

export const createSceneChangedTrigger = (_app: PluginAppApi) =>
	({
		name: 'Scene Changed',
		conditions: [sceneMatchCondition()],
		validate: (conditions, context) => {
			const ctx = context as SceneChangedContext;

			return evaluateWith(conditions, context, {
				'scene-name': (value) => evaluateSceneMatch(ctx.sceneName, value)
			});
		},
		activate: createActivate(
			_app,
			(handler) => subscribeObsEvent<SceneChangedContext>(OBS_EVENTS.SCENE_CHANGED, handler),
			(conditions, context) => {
				const ctx = context as SceneChangedContext;

				return evaluateWith(conditions, context, {
					'scene-name': (value) => evaluateSceneMatch(ctx.sceneName, value)
				});
			}
		),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
