import type {
	HandlerDefinitionProps,
	PluginAppApi
} from '@stream-kit/plugin';

import { getFieldValue, resolveFieldText, resolveOneOfFieldText } from '../../get-field-value';
import { setActionVariables } from '../../lib/action-variables';
import {
	mediaActionField,
	mediaCursorMsField,
	mediaFileOneOfField,
	mediaInputSelectField,
	mediaOffsetMsField,
	restartMediaPlaybackField
} from '../../lib/field-builders';
import { callObs, callObsWithResponse } from '../../lib/obs-call';

function buildMediaInputSettings(
	inputKind: string | undefined,
	filePath: string
): { local_file: string } | { playlist: Array<{ value: string; hidden: boolean; selected: boolean }> } {
	if (inputKind === 'vlc_source') {
		return {
			playlist: [
				{
					value: filePath,
					hidden: false,
					selected: true
				}
			]
		};
	}

	return { local_file: filePath };
}

export const createTriggerMediaActionHandler = (app: PluginAppApi) =>
	({
		name: 'Trigger Media Action',
		fields: [mediaInputSelectField(app), mediaActionField()],
		execute: (_action, handler, context, next) => {
			const inputName = resolveFieldText(handler.fields, 'media-input', context);
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

export const createSetMediaInputFileHandler = (app: PluginAppApi) =>
	({
		name: 'Set Media Input File',
		fields: [mediaInputSelectField(app), mediaFileOneOfField(), restartMediaPlaybackField()],
		execute: async (_action, handler, context, next) => {
			const inputName = resolveFieldText(handler.fields, 'media-input', context);
			const filePath = resolveOneOfFieldText(handler.fields, 'media-file', context);
			const restartPlayback = getFieldValue(handler.fields, 'restart-playback');

			if (typeof inputName !== 'string' || !inputName.trim()) {
				return;
			}

			if (!filePath) {
				app.toast.create({
					title: 'Set Media Input File failed',
					description: 'Enter a media file path or choose a file.',
					variant: 'error'
				});
				return;
			}

			const settingsResponse = await callObsWithResponse<{ inputKind?: string }>(
				app,
				'GetInputSettings',
				{ inputName: inputName.trim() },
				{ label: 'Set Media Input File' }
			);

			const updated = await callObs(
				app,
				'SetInputSettings',
				{
					inputName: inputName.trim(),
					inputSettings: buildMediaInputSettings(settingsResponse?.inputKind, filePath),
					overlay: true
				},
				{ label: 'Set Media Input File' }
			);

			if (!updated) {
				return;
			}

			setActionVariables(context, {
				mediaFilePath: filePath
			});

			if (restartPlayback !== false && restartPlayback !== 'false') {
				await callObs(
					app,
					'TriggerMediaInputAction',
					{
						inputName: inputName.trim(),
						mediaAction: 'OBS_WEBSOCKET_MEDIA_INPUT_ACTION_RESTART'
					},
					{ label: 'Set Media Input File' }
				);
			}

			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createSetMediaCursorHandler = (app: PluginAppApi) =>
	({
		name: 'Set Media Cursor',
		fields: [mediaInputSelectField(app), mediaCursorMsField()],
		execute: (_action, handler, context, next) => {
			const inputName = resolveFieldText(handler.fields, 'media-input', context);
			const cursorText = resolveFieldText(handler.fields, 'cursor-ms', context);
			const mediaCursor = Number(cursorText);

			if (typeof inputName !== 'string' || !inputName.trim()) {
				return;
			}

			if (!Number.isFinite(mediaCursor) || mediaCursor < 0) {
				app.toast.create({
					title: 'Set Media Cursor failed',
					description: 'Enter a valid cursor position in milliseconds.',
					variant: 'error'
				});
				return;
			}

			void callObs(
				app,
				'SetMediaInputCursor',
				{
					inputName: inputName.trim(),
					mediaCursor
				},
				{ label: 'Set Media Cursor' }
			);
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createOffsetMediaCursorHandler = (app: PluginAppApi) =>
	({
		name: 'Offset Media Cursor',
		fields: [mediaInputSelectField(app), mediaOffsetMsField()],
		execute: (_action, handler, context, next) => {
			const inputName = resolveFieldText(handler.fields, 'media-input', context);
			const offsetText = resolveFieldText(handler.fields, 'offset-ms', context);
			const mediaCursorOffset = Number(offsetText);

			if (typeof inputName !== 'string' || !inputName.trim()) {
				return;
			}

			if (!Number.isFinite(mediaCursorOffset)) {
				app.toast.create({
					title: 'Offset Media Cursor failed',
					description: 'Enter a valid offset in milliseconds.',
					variant: 'error'
				});
				return;
			}

			void callObs(
				app,
				'OffsetMediaInputCursor',
				{
					inputName: inputName.trim(),
					mediaCursorOffset
				},
				{ label: 'Offset Media Cursor' }
			);
			next();
		}
	}) satisfies HandlerDefinitionProps;

export const createGetMediaStatusHandler = (app: PluginAppApi) =>
	({
		name: 'Get Media Status',
		fields: [mediaInputSelectField(app)],
		execute: async (_action, handler, context, next) => {
			const inputName = resolveFieldText(handler.fields, 'media-input', context);

			if (typeof inputName !== 'string' || !inputName.trim()) {
				return;
			}

			const response = await callObsWithResponse<{
				mediaState?: string;
				mediaDuration?: number | null;
				mediaCursor?: number | null;
			}>(
				app,
				'GetMediaInputStatus',
				{ inputName: inputName.trim() },
				{ label: 'Get Media Status' }
			);

			if (!response) {
				return;
			}

			setActionVariables(context, {
				mediaState: response.mediaState,
				mediaDuration: response.mediaDuration,
				mediaCursor: response.mediaCursor
			});
			next();
		}
	}) satisfies HandlerDefinitionProps;