import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { callObs } from '../../lib/obs-call';

export const createStartVirtualCamHandler = (app: PluginAppApi) =>
	({
		name: 'Start Virtual Camera',
		execute: () => {
			void callObs(app, 'StartVirtualCam', undefined, { label: 'Start Virtual Camera' });
		}
	}) satisfies HandlerDefinitionProps;

export const createStopVirtualCamHandler = (app: PluginAppApi) =>
	({
		name: 'Stop Virtual Camera',
		execute: () => {
			void callObs(app, 'StopVirtualCam', undefined, { label: 'Stop Virtual Camera' });
		}
	}) satisfies HandlerDefinitionProps;

export const createToggleVirtualCamHandler = (app: PluginAppApi) =>
	({
		name: 'Toggle Virtual Camera',
		execute: () => {
			void callObs(app, 'ToggleVirtualCam', undefined, { label: 'Toggle Virtual Camera' });
		}
	}) satisfies HandlerDefinitionProps;
