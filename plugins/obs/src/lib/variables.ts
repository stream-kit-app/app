import type { HandlerFieldVariable } from '@stream-kit/core';

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

export const SCENE_TEXT_VARIABLES: HandlerFieldVariable[] = [SCENE_VARIABLE];
export const INPUT_TEXT_VARIABLES: HandlerFieldVariable[] = [INPUT_VARIABLE];
export const TRANSITION_TEXT_VARIABLES: HandlerFieldVariable[] = [TRANSITION_VARIABLE];
export const HOTKEY_TEXT_VARIABLES: HandlerFieldVariable[] = [HOTKEY_VARIABLE];

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
	set('input', record.inputName);
	set('inputName', record.inputName);
	set('inputUuid', record.inputUuid);
	set('transition', record.transitionName);
	set('transitionName', record.transitionName);
	set('transitionUuid', record.transitionUuid);
	set('hotkey', record.hotkeyName);
	set('hotkeyName', record.hotkeyName);
	set('streamState', record.outputState);
	set('recordState', record.outputState);
	set('outputState', record.outputState);
	set('outputActive', record.outputActive);
	set('inputMuted', record.inputMuted);
	set('inputEnabled', record.inputEnabled);
	set('studioModeEnabled', record.studioModeEnabled);
	set('mediaAction', record.mediaAction);

	return variables;
}
