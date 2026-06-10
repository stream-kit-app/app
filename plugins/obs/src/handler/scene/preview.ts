import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { resolveFieldText } from '../../get-field-value';
import { sceneSelectField } from '../../lib/field-builders';
import { callObs } from '../../lib/obs-call';

export const createSetPreviewSceneHandler = (app: PluginAppApi) =>
	({
		name: 'Set Preview Scene',
		fields: [sceneSelectField(app, { name: 'Scene' })],
		execute: (_action, handler, context) => {
			const sceneName = resolveFieldText(handler.fields, 'scene', context);

			if (typeof sceneName !== 'string' || !sceneName.trim()) {
				return;
			}

			void callObs(
				app,
				'SetCurrentPreviewScene',
				{ sceneName: sceneName.trim() },
				{ label: 'Set Preview Scene' }
			);
		}
	}) satisfies HandlerDefinitionProps;
