import type { HandlerDefinitionProps, PluginAppApi } from '@stream-kit/plugin';

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
import { waitForMediaPlayback } from '../../lib/media-playback-wait';

const PLAYBACK_MEDIA_ACTIONS = new Set([
	'OBS_WEBSOCKET_MEDIA_INPUT_ACTION_PLAY',
	'OBS_WEBSOCKET_MEDIA_INPUT_ACTION_RESTART',
	'OBS_WEBSOCKET_MEDIA_INPUT_ACTION_NEXT',
	'OBS_WEBSOCKET_MEDIA_INPUT_ACTION_PREVIOUS'
]);

function withMediaInputLock<T>(
	app: PluginAppApi,
	inputName: string,
	fn: () => Promise<T>
): Promise<T> {
	if (typeof app.withResourceLock !== 'function') {
		return fn();
	}

	return app.withResourceLock(`obs:media-input:${inputName.trim().toLowerCase()}`, fn);
}

function isRemoteMediaPath(path: string): boolean {
	return /^https?:\/\//i.test(path.trim());
}

function buildMediaInputSettings(
	inputKind: string | undefined,
	filePath: string
):
	| { local_file: string; is_local_file: true }
	| { playlist: Array<{ value: string; hidden: boolean; selected: boolean }> } {
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

	// Always use local-file mode. FFmpeg still opens http(s) URLs here.
	// Network mode (`is_local_file: false`) reconnects when a finite file ends,
	// which looks like an endless replay loop.
	return {
		is_local_file: true,
		local_file: filePath
	};
}

function normalizeMediaFilePath(path: string): string {
	const trimmed = path.trim();

	try {
		if (trimmed.startsWith('/api/files/')) {
			return trimmed.split(/[?#]/)[0].replace(/\\/g, '/').toLowerCase();
		}

		if (isRemoteMediaPath(trimmed)) {
			const parsed = new URL(trimmed);
			if (parsed.pathname.includes('/api/files/')) {
				return parsed.pathname.toLowerCase();
			}
			return `${parsed.origin}${parsed.pathname}`.toLowerCase();
		}
	} catch {
		// Fall through to local-path normalization.
	}

	return trimmed.replace(/\\/g, '/').toLowerCase();
}

function getCurrentMediaFilePath(
	inputKind: string | undefined,
	inputSettings: Record<string, unknown> | undefined
): string | undefined {
	if (!inputSettings) {
		return undefined;
	}

	if (inputKind === 'vlc_source') {
		const playlist = inputSettings.playlist;

		if (!Array.isArray(playlist) || playlist.length === 0) {
			return undefined;
		}

		const selected = playlist.find(
			(item) =>
				item &&
				typeof item === 'object' &&
				'selected' in item &&
				(item as { selected?: boolean }).selected
		) as { value?: string } | undefined;
		const entry = selected ?? (playlist[0] as { value?: string });

		return typeof entry?.value === 'string' ? entry.value : undefined;
	}

	if (inputSettings.is_local_file === false) {
		const input = inputSettings.input;
		return typeof input === 'string' ? input : undefined;
	}

	const localFile = inputSettings.local_file;

	return typeof localFile === 'string' ? localFile : undefined;
}

function mediaPathsMatch(
	currentPath: string,
	resolvedPath: string,
	inputSettings?: Record<string, unknown>
): boolean {
	if (normalizeMediaFilePath(currentPath) !== normalizeMediaFilePath(resolvedPath)) {
		return false;
	}

	// Relative cloud refs previously written as `local_file` are not playable.
	if (isRemoteMediaPath(resolvedPath) && !isRemoteMediaPath(currentPath)) {
		return false;
	}

	// Network mode reconnects forever for finite HTTP files — force rewrite to local_file.
	if (isRemoteMediaPath(resolvedPath) && inputSettings?.is_local_file === false) {
		return false;
	}

	return true;
}

async function resolveObsMediaPath(app: PluginAppApi, filePath: string): Promise<string> {
	if (!app.userFiles.isCloudUrl(filePath)) {
		return filePath;
	}

	return app.userFiles.resolveLocalPath(filePath);
}

async function restartMediaInput(
	app: PluginAppApi,
	inputName: string,
	label: string
): Promise<boolean> {
	// A single RESTART replays from the beginning whether the source is currently
	// playing or stopped. We deliberately avoid a STOP+RESTART pair because the
	// STOP emits a `MediaInputPlaybackEnded` event that is indistinguishable from
	// the real end of playback and would resolve the playback wait too early.
	return callObs(
		app,
		'TriggerMediaInputAction',
		{
			inputName,
			mediaAction: 'OBS_WEBSOCKET_MEDIA_INPUT_ACTION_RESTART'
		},
		{ label }
	);
}

export const createTriggerMediaActionHandler = (app: PluginAppApi) =>
	({
		name: 'Trigger Media Action',
		fields: [mediaInputSelectField(app), mediaActionField()],
		execute: async (_action, handler, context, next) => {
			const inputName = resolveFieldText(handler.fields, 'media-input', context);
			const mediaAction = getFieldValue(handler.fields, 'media-action');

			if (
				typeof inputName !== 'string' ||
				!inputName.trim() ||
				typeof mediaAction !== 'string'
			) {
				return;
			}

			const trimmed = inputName.trim();
			const shouldWaitForPlayback = PLAYBACK_MEDIA_ACTIONS.has(mediaAction);
			let completed = false;

			await withMediaInputLock(app, trimmed, async () => {
				const updated = await callObs(
					app,
					'TriggerMediaInputAction',
					{
						inputName: trimmed,
						mediaAction
					},
					{ label: 'Trigger Media Action' }
				);

				if (!updated) {
					return;
				}

				if (shouldWaitForPlayback) {
					// Duration comes from OBS here since we do not know the file.
					await waitForMediaPlayback(app, trimmed);
				}

				completed = true;
			});

			if (!completed) {
				return;
			}

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

			let resolvedPath: string;
			try {
				resolvedPath = await resolveObsMediaPath(app, filePath);
			} catch (error) {
				app.toast.create({
					title: 'Set Media Input File failed',
					description:
						error instanceof Error
							? error.message
							: 'Could not resolve cloud media file URL.',
					variant: 'error'
				});
				return;
			}

			const settingsResponse = await callObsWithResponse<{
				inputKind?: string;
				inputSettings?: Record<string, unknown>;
			}>(
				app,
				'GetInputSettings',
				{ inputName: inputName.trim() },
				{ label: 'Set Media Input File' }
			);

			const inputKind = settingsResponse?.inputKind;
			const currentPath = getCurrentMediaFilePath(inputKind, settingsResponse?.inputSettings);
			const sameFile =
				currentPath !== undefined &&
				mediaPathsMatch(currentPath, resolvedPath, settingsResponse?.inputSettings);
			const shouldRestart = restartPlayback !== false && restartPlayback !== 'false';
			const trimmed = inputName.trim();

			// Probe the file length up front so the running indicator can stay
			// active for the full clip, independent of OBS playback events.
			let expectedDurationMs: number | null = null;

			if (shouldRestart) {
				expectedDurationMs = await app.media.getFileDurationMs(resolvedPath).catch(() => null);
			}

			let completed = false;

			await withMediaInputLock(app, trimmed, async () => {
				if (sameFile) {
					setActionVariables(context, {
						mediaFilePath: filePath
					});

					if (shouldRestart) {
						const restarted = await restartMediaInput(app, trimmed, 'Set Media Input File');

						if (restarted) {
							await waitForMediaPlayback(app, trimmed, { expectedDurationMs });
						}
					}

					completed = true;
					return;
				}

				const updated = await callObs(
					app,
					'SetInputSettings',
					{
						inputName: trimmed,
						inputSettings: buildMediaInputSettings(inputKind, resolvedPath),
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

				if (shouldRestart) {
					const restarted = await restartMediaInput(app, trimmed, 'Set Media Input File');

					if (restarted) {
						await waitForMediaPlayback(app, trimmed, { expectedDurationMs });
					}
				}

				completed = true;
			});

			if (!completed) {
				return;
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

export const createRestartInstantReplayHandler = (app: PluginAppApi) =>
	({
		name: 'Restart Instant Replay',
		fields: [mediaInputSelectField(app, { name: 'Replay source' })],
		execute: async (_action, handler, context, next) => {
			const inputName = resolveFieldText(handler.fields, 'media-input', context);

			if (typeof inputName !== 'string' || !inputName.trim()) {
				return;
			}

			const trimmed = inputName.trim();
			let completed = false;

			await withMediaInputLock(app, trimmed, async () => {
				const restarted = await restartMediaInput(app, trimmed, 'Restart Instant Replay');

				if (!restarted) {
					return;
				}

				await waitForMediaPlayback(app, trimmed);
				completed = true;
			});

			if (!completed) {
				return;
			}

			next();
		}
	}) satisfies HandlerDefinitionProps;
