import type { HandlerFieldVariable } from '@stream-kit/core';

export const SCENE_VARIABLE: HandlerFieldVariable = {
	key: 'scene',
	label: 'Scene name'
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
	set('streamState', record.outputState);
	set('recordState', record.outputState);
	set('outputState', record.outputState);
	set('outputActive', record.outputActive);

	return variables;
}
