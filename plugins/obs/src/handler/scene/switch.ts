import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { resolveFieldText } from '../../get-field-value';
import { getObs } from '../../lib/plugin-api';
import { SCENE_TEXT_VARIABLES } from '../../lib/variables';

export const createSwitchSceneHandler = (app: PluginAppApi) =>
	({
		name: 'Switch Scene',
		fields: [
			{
				type: 'text',
				name: 'Scene name',
				required: true,
				placeholder: 'Main',
				variables: SCENE_TEXT_VARIABLES
			}
		],
		execute: (_action, handler, context) => {
			const sceneName = resolveFieldText(handler.fields, 'scene-name', context);
			const client = getObs(app).client;

			if (typeof sceneName !== 'string' || !sceneName.trim() || !client) {
				return;
			}

			void client.call('SetCurrentProgramScene', { sceneName: sceneName.trim() });
		}
	}) satisfies HandlerDefinitionProps;
