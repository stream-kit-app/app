import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { callObs } from '../../lib/obs-call';

export const createStartVirtualCamHandler = (app: PluginAppApi) =>
	({
		name: 'Start Virtual Camera',
		execute: (_action, _handler, _context, next) => {
			void callObs(app, 'StartVirtualCam', undefined, { label: 'Start Virtual Camera' });
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createStopVirtualCamHandler = (app: PluginAppApi) =>
	({
		name: 'Stop Virtual Camera',
		execute: (_action, _handler, _context, next) => {
			void callObs(app, 'StopVirtualCam', undefined, { label: 'Stop Virtual Camera' });
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createToggleVirtualCamHandler = (app: PluginAppApi) =>
	({
		name: 'Toggle Virtual Camera',
		execute: (_action, _handler, _context, next) => {
			void callObs(app, 'ToggleVirtualCam', undefined, { label: 'Toggle Virtual Camera' });
			next();
		}
	}) satisfies HandlerDefinitionProps;
