import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { callObs } from '../../lib/obs-call';

export const createEnableStudioModeHandler = (app: PluginAppApi) =>
	({
		name: 'Enable Studio Mode',
		execute: () => {
			void callObs(
				app,
				'SetStudioModeEnabled',
				{ studioModeEnabled: true },
				{ label: 'Enable Studio Mode' }
			);
		}
	}) satisfies HandlerDefinitionProps;

export const createDisableStudioModeHandler = (app: PluginAppApi) =>
	({
		name: 'Disable Studio Mode',
		execute: () => {
			void callObs(
				app,
				'SetStudioModeEnabled',
				{ studioModeEnabled: false },
				{ label: 'Disable Studio Mode' }
			);
		}
	}) satisfies HandlerDefinitionProps;
