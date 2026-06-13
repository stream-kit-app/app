import type { PluginAppApi } from '@stream-kit/plugin';
import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { getFieldValue, resolveFieldText } from '../../get-field-value';
import { getSceneItemId } from '../../lib/catalog';
import {
	filterNameField,
	inputSelectField,
	mediaActionField,
	sceneSelectField,
	textContentField,
	volumeDbField
} from '../../lib/field-builders';
import { callObs } from '../../lib/obs-call';
import { getObs } from '../../lib/plugin-api';

export const createMuteInputHandler = (app: PluginAppApi) =>
	({
		name: 'Mute Input',
		fields: [inputSelectField(app, { name: 'Input' })],
		execute: (_action, handler, context, next) => {
			const inputName = resolveFieldText(handler.fields, 'input', context);

			if (typeof inputName !== 'string' || !inputName.trim()) {
				return;
			}

			void callObs(
				app,
				'SetInputMute',
				{ inputName: inputName.trim(), inputMuted: true },
				{ label: 'Mute Input' }
			);
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createUnmuteInputHandler = (app: PluginAppApi) =>
	({
		name: 'Unmute Input',
		fields: [inputSelectField(app, { name: 'Input' })],
		execute: (_action, handler, context, next) => {
			const inputName = resolveFieldText(handler.fields, 'input', context);

			if (typeof inputName !== 'string' || !inputName.trim()) {
				return;
			}

			void callObs(
				app,
				'SetInputMute',
				{ inputName: inputName.trim(), inputMuted: false },
				{ label: 'Unmute Input' }
			);
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createToggleInputMuteHandler = (app: PluginAppApi) =>
	({
		name: 'Toggle Input Mute',
		fields: [inputSelectField(app, { name: 'Input' })],
		execute: (_action, handler, context, next) => {
			const inputName = resolveFieldText(handler.fields, 'input', context);

			if (typeof inputName !== 'string' || !inputName.trim()) {
				return;
			}

			void callObs(
				app,
				'ToggleInputMute',
				{ inputName: inputName.trim() },
				{ label: 'Toggle Input Mute' }
			);
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createSetInputVolumeHandler = (app: PluginAppApi) =>
	({
		name: 'Set Input Volume',
		fields: [
			inputSelectField(app, { name: 'Input' }),
			volumeDbField({ name: 'Volume (dB)', placeholder: '0.0' })
		],
		execute: (_action, handler, context, next) => {
			const inputName = resolveFieldText(handler.fields, 'input', context);
			const volumeText = resolveFieldText(handler.fields, 'volume-db', context);
			const inputVolumeDb = Number(volumeText);

			if (typeof inputName !== 'string' || !inputName.trim()) {
				return;
			}

			if (!Number.isFinite(inputVolumeDb)) {
				app.toast.create({
					title: 'Set Input Volume failed',
					description: 'Enter a valid volume in decibels.',
					variant: 'error'
				});
				return;
			}

			void callObs(
				app,
				'SetInputVolume',
				{
					inputName: inputName.trim(),
					inputVolumeDb
				},
				{ label: 'Set Input Volume' }
			);
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createSetInputTextHandler = (app: PluginAppApi) =>
	({
		name: 'Set Input Text',
		fields: [inputSelectField(app, { name: 'Input' }), textContentField({ name: 'Text' })],
		execute: (_action, handler, context, next) => {
			const inputName = resolveFieldText(handler.fields, 'input', context);
			const text = resolveFieldText(handler.fields, 'text', context);

			if (typeof inputName !== 'string' || !inputName.trim() || typeof text !== 'string') {
				return;
			}

			void callObs(
				app,
				'SetInputSettings',
				{
					inputName: inputName.trim(),
					inputSettings: { text },
					overlay: true
				},
				{ label: 'Set Input Text' }
			);
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createTriggerMediaActionHandler = (app: PluginAppApi) =>
	({
		name: 'Trigger Media Action',
		fields: [inputSelectField(app, { name: 'Input' }), mediaActionField()],
		execute: (_action, handler, context, next) => {
			const inputName = resolveFieldText(handler.fields, 'input', context);
			const mediaAction = getFieldValue(handler.fields, 'media-action');

			if (typeof inputName !== 'string' || !inputName.trim() || typeof mediaAction !== 'string') {
				return;
			}

			void callObs(
				app,
				'TriggerMediaInputAction',
				{
					inputName: inputName.trim(),
					mediaAction
				},
				{ label: 'Trigger Media Action' }
			);
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createShowSceneItemHandler = (app: PluginAppApi) =>
	({
		name: 'Show Scene Item',
		fields: [
			sceneSelectField(app, { name: 'Scene' }),
			inputSelectField(app, { name: 'Source' })
		],
		execute: async (_action, handler, context, next) => {
			const sceneName = resolveFieldText(handler.fields, 'scene', context);
			const sourceName = resolveFieldText(handler.fields, 'source', context);

			if (
				typeof sceneName !== 'string' ||
				!sceneName.trim() ||
				typeof sourceName !== 'string' ||
				!sourceName.trim()
			) {
				return;
			}

			const sceneItemId = await getSceneItemId(app, sceneName.trim(), sourceName.trim());

			if (sceneItemId === undefined) {
				app.toast.create({
					title: 'Show Scene Item failed',
					description: 'Could not find that source in the selected scene.',
					variant: 'error'
				});
				return;
			}

			void callObs(
				app,
				'SetSceneItemEnabled',
				{
					sceneName: sceneName.trim(),
					sceneItemId,
					sceneItemEnabled: true
				},
				{ label: 'Show Scene Item' }
			);
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createHideSceneItemHandler = (app: PluginAppApi) =>
	({
		name: 'Hide Scene Item',
		fields: [
			sceneSelectField(app, { name: 'Scene' }),
			inputSelectField(app, { name: 'Source' })
		],
		execute: async (_action, handler, context, next) => {
			const sceneName = resolveFieldText(handler.fields, 'scene', context);
			const sourceName = resolveFieldText(handler.fields, 'source', context);

			if (
				typeof sceneName !== 'string' ||
				!sceneName.trim() ||
				typeof sourceName !== 'string' ||
				!sourceName.trim()
			) {
				return;
			}

			const sceneItemId = await getSceneItemId(app, sceneName.trim(), sourceName.trim());

			if (sceneItemId === undefined) {
				app.toast.create({
					title: 'Hide Scene Item failed',
					description: 'Could not find that source in the selected scene.',
					variant: 'error'
				});
				return;
			}

			void callObs(
				app,
				'SetSceneItemEnabled',
				{
					sceneName: sceneName.trim(),
					sceneItemId,
					sceneItemEnabled: false
				},
				{ label: 'Hide Scene Item' }
			);
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createToggleFilterHandler = (app: PluginAppApi) =>
	({
		name: 'Toggle Filter',
		fields: [inputSelectField(app, { name: 'Input' }), filterNameField()],
		execute: async (_action, handler, context, next) => {
			const inputName = resolveFieldText(handler.fields, 'input', context);
			const filterName = resolveFieldText(handler.fields, 'filter-name', context);

			if (
				typeof inputName !== 'string' ||
				!inputName.trim() ||
				typeof filterName !== 'string' ||
				!filterName.trim()
			) {
				return;
			}

			const client = getObs(app).client;

			if (!client) {
				app.toast.create({
					title: 'Toggle Filter failed',
					description: 'OBS Studio is not connected.',
					variant: 'warning'
				});
				return;
			}

			try {
				const response = (await client.call('GetSourceFilter', {
					sourceName: inputName.trim(),
					filterName: filterName.trim()
				})) as { filterEnabled?: boolean };

				await callObs(
					app,
					'SetSourceFilterEnabled',
					{
						sourceName: inputName.trim(),
						filterName: filterName.trim(),
						filterEnabled: !response.filterEnabled
					},
					{ label: 'Toggle Filter' }
				);
				next();
			} catch (error) {
				const message =
					error instanceof Error ? error.message : 'Unknown OBS WebSocket error.';

				app.toast.create({
					title: 'Toggle Filter failed',
					description: message,
					variant: 'error'
				});
			}
		}
	}) satisfies HandlerDefinitionProps;
