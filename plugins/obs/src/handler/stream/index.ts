import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { callObs } from '../../lib/obs-call';

export const createStartStreamHandler = (app: PluginAppApi) =>
	({
		name: 'Start Stream',
		execute: () => {
			void callObs(app, 'StartStream', undefined, { label: 'Start Stream' });
		}
	}) satisfies HandlerDefinitionProps;

export const createStopStreamHandler = (app: PluginAppApi) =>
	({
		name: 'Stop Stream',
		execute: () => {
			void callObs(app, 'StopStream', undefined, { label: 'Stop Stream' });
		}
	}) satisfies HandlerDefinitionProps;

export const createToggleStreamHandler = (app: PluginAppApi) =>
	({
		name: 'Toggle Stream',
		execute: () => {
			void callObs(app, 'ToggleStream', undefined, { label: 'Toggle Stream' });
		}
	}) satisfies HandlerDefinitionProps;
