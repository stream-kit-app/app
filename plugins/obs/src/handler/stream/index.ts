import type { PluginAppApi } from '@stream-kit/plugin';
import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { callObs } from '../../lib/obs-call';

export const createStartStreamHandler = (app: PluginAppApi) =>
	({
		name: 'Start Stream',
		execute: (_action, _handler, _context, next) => {
			void callObs(app, 'StartStream', undefined, { label: 'Start Stream' });
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createStopStreamHandler = (app: PluginAppApi) =>
	({
		name: 'Stop Stream',
		execute: (_action, _handler, _context, next) => {
			void callObs(app, 'StopStream', undefined, { label: 'Stop Stream' });
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createToggleStreamHandler = (app: PluginAppApi) =>
	({
		name: 'Toggle Stream',
		execute: (_action, _handler, _context, next) => {
			void callObs(app, 'ToggleStream', undefined, { label: 'Toggle Stream' });
			next();
		}
	}) satisfies HandlerDefinitionProps;
