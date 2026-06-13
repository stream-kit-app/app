import type { PluginAppApi } from '@stream-kit/plugin';
import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { resolveFieldText } from '../../get-field-value';
import { sceneSelectField } from '../../lib/field-builders';
import { callObs } from '../../lib/obs-call';

export const createSwitchSceneHandler = (app: PluginAppApi) =>
	({
		name: 'Switch Scene',
		fields: [sceneSelectField(app, { name: 'Scene' })],
		execute: (_action, handler, context, next) => {
			const sceneName = resolveFieldText(handler.fields, 'scene', context);

			if (typeof sceneName !== 'string' || !sceneName.trim()) {
				return;
			}

			void callObs(
				app,
				'SetCurrentProgramScene',
				{ sceneName: sceneName.trim() },
				{ label: 'Switch Scene' }
			);
			next();
		}
	}) satisfies HandlerDefinitionProps;
