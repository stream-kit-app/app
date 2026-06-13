import type { PluginAppApi } from '@stream-kit/plugin';
import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { callObs } from '../../lib/obs-call';

export const createStartReplayBufferHandler = (app: PluginAppApi) =>
	({
		name: 'Start Replay Buffer',
		execute: (_action, _handler, _context, next) => {
			void callObs(app, 'StartReplayBuffer', undefined, { label: 'Start Replay Buffer' });
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createStopReplayBufferHandler = (app: PluginAppApi) =>
	({
		name: 'Stop Replay Buffer',
		execute: (_action, _handler, _context, next) => {
			void callObs(app, 'StopReplayBuffer', undefined, { label: 'Stop Replay Buffer' });
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createToggleReplayBufferHandler = (app: PluginAppApi) =>
	({
		name: 'Toggle Replay Buffer',
		execute: (_action, _handler, _context, next) => {
			void callObs(app, 'ToggleReplayBuffer', undefined, { label: 'Toggle Replay Buffer' });
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createSaveReplayBufferHandler = (app: PluginAppApi) =>
	({
		name: 'Save Replay Buffer',
		execute: (_action, _handler, _context, next) => {
			void callObs(app, 'SaveReplayBuffer', undefined, { label: 'Save Replay Buffer' });
			next();
		}
	}) satisfies HandlerDefinitionProps;
