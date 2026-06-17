import type { HandlerFieldVariable } from '@stream-kit/plugin';

export const SCENE_VARIABLE: HandlerFieldVariable = {
	key: 'scene',
	label: 'Scene name'
};

export const INPUT_VARIABLE: HandlerFieldVariable = {
	key: 'input',
	label: 'Input name'
};

export const TRANSITION_VARIABLE: HandlerFieldVariable = {
	key: 'transition',
	label: 'Transition name'
};

export const HOTKEY_VARIABLE: HandlerFieldVariable = {
	key: 'hotkey',
	label: 'Hotkey name'
};

export const STREAM_STATE_VARIABLE: HandlerFieldVariable = {
	key: 'streamState',
	label: 'Stream state'
};

export const RECORD_STATE_VARIABLE: HandlerFieldVariable = {
	key: 'recordState',
	label: 'Recording state'
};

export const FILTER_VARIABLE: HandlerFieldVariable = {
	key: 'filter',
	label: 'Filter name'
};

export const MEDIA_STATE_VARIABLE: HandlerFieldVariable = {
	key: 'mediaState',
	label: 'Media state'
};

export const MEDIA_ACTION_VARIABLE: HandlerFieldVariable = {
	key: 'mediaAction',
	label: 'Media action'
};

export const RECORD_PATH_VARIABLE: HandlerFieldVariable = {
	key: 'outputPath',
	label: 'Recording path'
};

export const SCENE_TEXT_VARIABLES: HandlerFieldVariable[] = [SCENE_VARIABLE];
export const INPUT_TEXT_VARIABLES: HandlerFieldVariable[] = [INPUT_VARIABLE];
export const TRANSITION_TEXT_VARIABLES: HandlerFieldVariable[] = [TRANSITION_VARIABLE];
export const HOTKEY_TEXT_VARIABLES: HandlerFieldVariable[] = [HOTKEY_VARIABLE];
export const FILTER_TEXT_VARIABLES: HandlerFieldVariable[] = [INPUT_VARIABLE, FILTER_VARIABLE];

export function contextToVariables(context: unknown): Record<string, string> {
	if (!context || typeof context !== 'object') {
		return {};
	}

	const record = context as Record<string, unknown>;
	const variables: Record<string, string> = {};

	const set = (key: string, value: unknown) => {
		if (value === undefined || value === null) {
			return;
		}

		variables[key] = String(value);
	};

	set('scene', record.sceneName);
	set('sceneName', record.sceneName);
	set('sceneUuid', record.sceneUuid);
	set('input', record.inputName ?? record.sourceName);
	set('inputName', record.inputName ?? record.sourceName);
	set('inputUuid', record.inputUuid);
	set('filter', record.filterName);
	set('filterName', record.filterName);
	set('sourceName', record.sourceName);
	set('filterEnabled', record.filterEnabled);
	set('transition', record.transitionName);
	set('transitionName', record.transitionName);
	set('transitionUuid', record.transitionUuid);
	set('hotkey', record.hotkeyName);
	set('hotkeyName', record.hotkeyName);
	set('streamState', record.outputState);
	set('recordState', record.outputState);
	set('outputState', record.outputState);
	set('outputActive', record.outputActive);
	set('outputPath', record.outputPath);
	set('newOutputPath', record.newOutputPath);
	set('inputMuted', record.inputMuted);
	set('inputEnabled', record.inputEnabled);
	set('studioModeEnabled', record.studioModeEnabled);
	set('mediaAction', record.mediaAction);
	set('mediaState', record.mediaState);
	set('mediaDuration', record.mediaDuration);
	set('mediaCursor', record.mediaCursor);
	set('streamActive', record.streamActive);
	set('streamDuration', record.streamDuration);
	set('streamBytes', record.streamBytes);
	set('streamSkippedFrames', record.streamSkippedFrames);
	set('streamTotalFrames', record.streamTotalFrames);
	set('streamCongestion', record.streamCongestion);
	set('streamReconnecting', record.streamReconnecting);
	set('streamTimecode', record.streamTimecode);
	set('recordActive', record.recordActive);
	set('recordPaused', record.recordPaused);
	set('recordDuration', record.recordDuration);
	set('recordBytes', record.recordBytes);
	set('recordTimecode', record.recordTimecode);

	return variables;
}
