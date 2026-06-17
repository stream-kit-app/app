import type { PluginAppApi } from '@stream-kit/plugin';
import type { HandlerFieldDefinition, SelectItem } from '@stream-kit/plugin';

import { loadHotkeyItems, loadInputItems, loadSceneItems, loadTransitionItems, loadFilterItems, loadFilterKindItems, loadMediaInputItems } from './catalog';
import {
	HOTKEY_TEXT_VARIABLES,
	INPUT_TEXT_VARIABLES,
	SCENE_TEXT_VARIABLES,
	TRANSITION_TEXT_VARIABLES,
	FILTER_TEXT_VARIABLES
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

export function mediaInputSelectField(
	app: PluginAppApi,
	options: FieldOptions = {}
): HandlerFieldDefinition {
	return {
		type: 'select',
		name: options.name ?? 'Media input',
		placeholder: options.placeholder ?? 'Select a media input',
		loadingPlaceholder: options.loadingPlaceholder ?? 'Loading media inputs…',
		required: options.required ?? true,
		items: selectItems(loadMediaInputItems)(app)
	};
}

export function filterSelectField(
	app: PluginAppApi,
	options: FieldOptions = {}
): HandlerFieldDefinition {
	return {
		type: 'combobox',
		name: options.name ?? 'Filter',
		placeholder: options.placeholder ?? 'Select a filter',
		loadingPlaceholder: options.loadingPlaceholder ?? 'Loading filters…',
		required: options.required ?? true,
		allowCustomValue: true,
		itemsReloadFromField: 'input',
		items: (context) => {
			const inputName = context.getFieldValue('input');

			if (typeof inputName !== 'string' || !inputName.trim()) {
				return [];
			}

			return loadFilterItems(app, inputName);
		}
	};
}

export function filterKindSelectField(
	app: PluginAppApi,
	options: FieldOptions = {}
): HandlerFieldDefinition {
	return {
		type: 'select',
		name: options.name ?? 'Filter kind',
		placeholder: options.placeholder ?? 'Select a filter kind',
		loadingPlaceholder: options.loadingPlaceholder ?? 'Loading filter kinds…',
		required: options.required ?? true,
		items: selectItems(loadFilterKindItems)(app)
	};
}

export function filterNameTextField(options: FieldOptions = {}): HandlerFieldDefinition {
	return {
		type: 'text',
		name: options.name ?? 'Filter name',
		placeholder: options.placeholder ?? 'Color Correction',
		required: options.required ?? true,
		variables: FILTER_TEXT_VARIABLES
	};
}

export function mediaCursorMsField(options: FieldOptions = {}): HandlerFieldDefinition {
	return {
		type: 'text',
		name: options.name ?? 'Cursor (ms)',
		placeholder: options.placeholder ?? '0',
		required: options.required ?? true
	};
}

export function mediaOffsetMsField(options: FieldOptions = {}): HandlerFieldDefinition {
	return {
		type: 'text',
		name: options.name ?? 'Offset (ms)',
		placeholder: options.placeholder ?? '1000',
		required: options.required ?? true
	};
}

const MEDIA_FILE_FILTERS = [
	{
		name: 'Media files',
		extensions: ['mp4', 'mkv', 'mov', 'webm', 'avi', 'mp3', 'wav', 'ogg', 'flac', 'm4a']
	},
	{ name: 'All files', extensions: ['*'] }
];

export function mediaFileOneOfField(options: FieldOptions = {}): HandlerFieldDefinition {
	return {
		type: 'one-of',
		name: options.name ?? 'Media file',
		required: options.required ?? true,
		defaultVariant: 'path',
		migrateFrom: [
			{
				keys: ['media-file-path', 'media-file'],
				variantMap: {
					'media-file-path': 'path',
					'media-file': 'file'
				}
			}
		],
		variants: [
			{
				id: 'path',
				label: 'Path',
				field: {
					type: 'text',
					name: 'Path',
					placeholder: 'C:/Videos/clip.mp4 or {mediaPath}',
					variables: INPUT_TEXT_VARIABLES
				}
			},
			{
				id: 'file',
				label: 'File',
				field: {
					type: 'select-file-or-folder',
					mode: 'file',
					name: 'File',
					filters: MEDIA_FILE_FILTERS
				}
			}
		]
	};
}

export function restartMediaPlaybackField(options: FieldOptions = {}): HandlerFieldDefinition {
	return {
		type: 'checkbox',
		name: options.name ?? 'Restart playback',
		defaultValue: true,
		required: options.required ?? false
	};
}

export function captionTextField(options: FieldOptions = {}): HandlerFieldDefinition {
	return {
		type: 'text',
		name: options.name ?? 'Caption text',
		placeholder: options.placeholder ?? 'Hello viewers!',
		required: options.required ?? true,
		variables: INPUT_TEXT_VARIABLES
	};
}

export function chapterNameField(options: FieldOptions = {}): HandlerFieldDefinition {
	return {
		type: 'text',
		name: options.name ?? 'Chapter name',
		placeholder: options.placeholder ?? 'Optional chapter name',
		required: options.required ?? false
	};
}

export function filterSettingsField(options: FieldOptions = {}): HandlerFieldDefinition {
	return {
		type: 'key-value-list',
		name: options.name ?? 'Filter settings',
		keyPlaceholder: 'Setting key',
		valuePlaceholder: 'Value',
		required: options.required ?? false
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
