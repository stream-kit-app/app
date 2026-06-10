import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { SceneChangedContext } from '../contexts';
import { evaluateSceneMatch, sceneMatchCondition } from './conditions';
import { OBS_EVENTS } from './event-hub';
import { createTestSceneChangedContext } from './test-contexts';
import { createActivate, createDeactivate, createOnTest, evaluateWith } from './trigger-helpers';
import { subscribeObsEvent } from './websocket-setup';

export function createSceneMatchTrigger(
	_app: PluginAppApi,
	options: { name: string; eventKey: string }
): TriggerDefinitionProps {
	const validateScene = (conditions: Parameters<typeof evaluateWith>[0], context: unknown) => {
		const ctx = context as SceneChangedContext;

		return evaluateWith(conditions, context, {
			'scene-name': (value) => evaluateSceneMatch(ctx.sceneName, value)
		});
	};

	return {
		name: options.name,
		conditions: [sceneMatchCondition()],
		validate: validateScene,
		activate: createActivate(
			_app,
			(handler) => subscribeObsEvent<SceneChangedContext>(options.eventKey, handler),
			validateScene
		),
		deactivate: createDeactivate(),
		onTest: createOnTest(() => createTestSceneChangedContext())
	};
}

export function createPreviewSceneChangedTrigger(app: PluginAppApi): TriggerDefinitionProps {
	return createSceneMatchTrigger(app, {
		name: 'Preview Scene Changed',
		eventKey: OBS_EVENTS.PREVIEW_SCENE_CHANGED
	});
}
