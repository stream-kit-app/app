import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { resolveFieldText } from '../../get-field-value';
import { durationMsField, transitionSelectField } from '../../lib/field-builders';
import { callObs } from '../../lib/obs-call';

export const createSetTransitionHandler = (app: PluginAppApi) =>
	({
		name: 'Set Transition',
		fields: [transitionSelectField(app, { name: 'Transition' })],
		execute: (_action, handler, context, next) => {
			const transitionName = resolveFieldText(handler.fields, 'transition', context);

			if (typeof transitionName !== 'string' || !transitionName.trim()) {
				return;
			}

			void callObs(
				app,
				'SetCurrentSceneTransition',
				{ transitionName: transitionName.trim() },
				{ label: 'Set Transition' }
			);
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createSetTransitionDurationHandler = (app: PluginAppApi) =>
	({
		name: 'Set Transition Duration',
		fields: [durationMsField({ name: 'Duration (ms)', placeholder: '300' })],
		execute: (_action, handler, context, next) => {
			const durationText = resolveFieldText(handler.fields, 'duration-ms', context);
			const transitionDuration = Number(durationText);

			if (!Number.isFinite(transitionDuration) || transitionDuration < 0) {
				app.toast.create({
					title: 'Set Transition Duration failed',
					description: 'Enter a valid duration in milliseconds.',
					variant: 'error'
				});
				return;
			}

			void callObs(
				app,
				'SetCurrentSceneTransitionDuration',
				{ transitionDuration: Math.round(transitionDuration) },
				{ label: 'Set Transition Duration' }
			);
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createTriggerStudioTransitionHandler = (app: PluginAppApi) =>
	({
		name: 'Trigger Studio Transition',
		execute: (_action, _handler, _context, next) => {
			void callObs(app, 'TriggerStudioModeTransition', undefined, {
				label: 'Trigger Studio Transition'
			});
			next();
		}
	}) satisfies HandlerDefinitionProps;
