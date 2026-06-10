import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerFieldDefinition, SelectItem } from '@stream-kit/core';

import { loadHotkeyItems, loadInputItems, loadSceneItems, loadTransitionItems } from './catalog';
import {
	HOTKEY_TEXT_VARIABLES,
	INPUT_TEXT_VARIABLES,
	SCENE_TEXT_VARIABLES,
	TRANSITION_TEXT_VARIABLES
} from './variables';

function selectItems(
	loader: (app: PluginAppApi) => Promise<SelectItem[]>,
	emptyOption?: SelectItem
): (app: PluginAppApi) => () => Promise<SelectItem[]> {
	return (app) => async () => {
		const items = await loader(app);
		return emptyOption ? [emptyOption, ...items] : items;
	};
}

type FieldOptions = {
	name?: string;
	placeholder?: string;
	loadingPlaceholder?: string;
	required?: boolean;
};

export function sceneSelectField(
	app: PluginAppApi,
	options: FieldOptions = {}
): HandlerFieldDefinition {
	return {
		type: 'select',
		name: options.name ?? 'Scene',
		placeholder: options.placeholder ?? 'Select a scene',
		loadingPlaceholder: options.loadingPlaceholder ?? 'Loading scenes…',
		required: options.required ?? true,
		items: selectItems(loadSceneItems)(app)
	};
}

export function sceneTextField(options: FieldOptions = {}): HandlerFieldDefinition {
	return {
		type: 'text',
		name: options.name ?? 'Scene name',
		placeholder: options.placeholder ?? 'Main',
		required: options.required ?? true,
		variables: SCENE_TEXT_VARIABLES
	};
}

export function inputSelectField(
	app: PluginAppApi,
	options: FieldOptions & { inputKind?: string } = {}
): HandlerFieldDefinition {
	const loader = options.inputKind
		? (pluginApp: PluginAppApi) => loadInputItems(pluginApp, options.inputKind)
		: loadInputItems;

	return {
		type: 'select',
		name: options.name ?? 'Input',
		placeholder: options.placeholder ?? 'Select an input',
		loadingPlaceholder: options.loadingPlaceholder ?? 'Loading inputs…',
		required: options.required ?? true,
		items: selectItems(loader)(app)
	};
}

export function inputTextField(options: FieldOptions = {}): HandlerFieldDefinition {
	return {
		type: 'text',
		name: options.name ?? 'Input name',
		placeholder: options.placeholder ?? 'Microphone',
		required: options.required ?? true,
		variables: INPUT_TEXT_VARIABLES
	};
}

export function transitionSelectField(
	app: PluginAppApi,
	options: FieldOptions = {}
): HandlerFieldDefinition {
	return {
		type: 'select',
		name: options.name ?? 'Transition',
		placeholder: options.placeholder ?? 'Select a transition',
		loadingPlaceholder: options.loadingPlaceholder ?? 'Loading transitions…',
		required: options.required ?? true,
		items: selectItems(loadTransitionItems)(app)
	};
}

export function transitionTextField(options: FieldOptions = {}): HandlerFieldDefinition {
	return {
		type: 'text',
		name: options.name ?? 'Transition name',
		placeholder: options.placeholder ?? 'Fade',
		required: options.required ?? true,
		variables: TRANSITION_TEXT_VARIABLES
	};
}

export function hotkeySelectField(
	app: PluginAppApi,
	options: FieldOptions = {}
): HandlerFieldDefinition {
	return {
		type: 'select',
		name: options.name ?? 'Hotkey',
		placeholder: options.placeholder ?? 'Select a hotkey',
		loadingPlaceholder: options.loadingPlaceholder ?? 'Loading hotkeys…',
		required: options.required ?? true,
		items: selectItems(loadHotkeyItems)(app)
	};
}

export function hotkeyTextField(options: FieldOptions = {}): HandlerFieldDefinition {
	return {
		type: 'text',
		name: options.name ?? 'Hotkey name',
		placeholder: options.placeholder ?? 'Start Streaming',
		required: options.required ?? true,
		variables: HOTKEY_TEXT_VARIABLES
	};
}

export function volumeDbField(options: FieldOptions = {}): HandlerFieldDefinition {
	return {
		type: 'text',
		name: options.name ?? 'Volume (dB)',
		placeholder: options.placeholder ?? '0.0',
		required: options.required ?? true
	};
}

export function durationMsField(options: FieldOptions = {}): HandlerFieldDefinition {
	return {
		type: 'text',
		name: options.name ?? 'Duration (ms)',
		placeholder: options.placeholder ?? '300',
		required: options.required ?? true
	};
}

export function filterNameField(options: FieldOptions = {}): HandlerFieldDefinition {
	return {
		type: 'text',
		name: options.name ?? 'Filter name',
		placeholder: options.placeholder ?? 'Color Correction',
		required: options.required ?? true
	};
}

export function textContentField(options: FieldOptions = {}): HandlerFieldDefinition {
	return {
		type: 'text',
		name: options.name ?? 'Text',
		placeholder: options.placeholder ?? 'Hello!',
		required: options.required ?? true,
		variables: INPUT_TEXT_VARIABLES
	};
}

export const MEDIA_ACTION_ITEMS: SelectItem[] = [
	{ value: 'OBS_WEBSOCKET_MEDIA_INPUT_ACTION_PLAY', label: 'Play' },
	{ value: 'OBS_WEBSOCKET_MEDIA_INPUT_ACTION_PAUSE', label: 'Pause' },
	{ value: 'OBS_WEBSOCKET_MEDIA_INPUT_ACTION_STOP', label: 'Stop' },
	{ value: 'OBS_WEBSOCKET_MEDIA_INPUT_ACTION_RESTART', label: 'Restart' },
	{ value: 'OBS_WEBSOCKET_MEDIA_INPUT_ACTION_NEXT', label: 'Next' },
	{ value: 'OBS_WEBSOCKET_MEDIA_INPUT_ACTION_PREVIOUS', label: 'Previous' }
];

export function mediaActionField(options: FieldOptions = {}): HandlerFieldDefinition {
	return {
		type: 'select',
		name: options.name ?? 'Media action',
		placeholder: options.placeholder ?? 'Select an action',
		required: options.required ?? true,
		items: MEDIA_ACTION_ITEMS
	};
}
