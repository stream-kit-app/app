import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { callObs } from '../../lib/obs-call';

export const createStartRecordingHandler = (app: PluginAppApi) =>
	({
		name: 'Start Recording',
		execute: (_action, _handler, _context, next) => {
			void callObs(app, 'StartRecord', undefined, { label: 'Start Recording' });
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createStopRecordingHandler = (app: PluginAppApi) =>
	({
		name: 'Stop Recording',
		execute: (_action, _handler, _context, next) => {
			void callObs(app, 'StopRecord', undefined, { label: 'Stop Recording' });
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createToggleRecordHandler = (app: PluginAppApi) =>
	({
		name: 'Toggle Recording',
		execute: (_action, _handler, _context, next) => {
			void callObs(app, 'ToggleRecord', undefined, { label: 'Toggle Recording' });
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createPauseRecordHandler = (app: PluginAppApi) =>
	({
		name: 'Pause Recording',
		execute: (_action, _handler, _context, next) => {
			void callObs(app, 'PauseRecord', undefined, { label: 'Pause Recording' });
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createResumeRecordHandler = (app: PluginAppApi) =>
	({
		name: 'Resume Recording',
		execute: (_action, _handler, _context, next) => {
			void callObs(app, 'ResumeRecord', undefined, { label: 'Resume Recording' });
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createSplitRecordHandler = (app: PluginAppApi) =>
	({
		name: 'Split Recording File',
		execute: (_action, _handler, _context, next) => {
			void callObs(app, 'SplitRecordFile', undefined, { label: 'Split Recording File' });
			next();
		}
	}) satisfies HandlerDefinitionProps;
