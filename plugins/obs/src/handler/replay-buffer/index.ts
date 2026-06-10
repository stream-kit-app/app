import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { callObs } from '../../lib/obs-call';

export const createStartReplayBufferHandler = (app: PluginAppApi) =>
	({
		name: 'Start Replay Buffer',
		execute: () => {
			void callObs(app, 'StartReplayBuffer', undefined, { label: 'Start Replay Buffer' });
		}
	}) satisfies HandlerDefinitionProps;

export const createStopReplayBufferHandler = (app: PluginAppApi) =>
	({
		name: 'Stop Replay Buffer',
		execute: () => {
			void callObs(app, 'StopReplayBuffer', undefined, { label: 'Stop Replay Buffer' });
		}
	}) satisfies HandlerDefinitionProps;

export const createToggleReplayBufferHandler = (app: PluginAppApi) =>
	({
		name: 'Toggle Replay Buffer',
		execute: () => {
			void callObs(app, 'ToggleReplayBuffer', undefined, { label: 'Toggle Replay Buffer' });
		}
	}) satisfies HandlerDefinitionProps;

export const createSaveReplayBufferHandler = (app: PluginAppApi) =>
	({
		name: 'Save Replay Buffer',
		execute: () => {
			void callObs(app, 'SaveReplayBuffer', undefined, { label: 'Save Replay Buffer' });
		}
	}) satisfies HandlerDefinitionProps;
