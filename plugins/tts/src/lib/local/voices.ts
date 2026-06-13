import type {
	PluginSettingsFieldDefinition,
	SettingsContext,
	SettingsVisibilityContext
} from '@stream-kit/plugin';
import type { HandlerFieldDefinition, SelectItem } from '@stream-kit/plugin';

import { local } from './service';

export async function loadLocalCatalogVoiceItems(): Promise<SelectItem[]> {
	if (local.voices.length === 0) {
		await local.refreshVoices();
	}

	return local.voices.map((voice) => ({
		value: voice.id,
		label: voice.installed
			? `${voice.name} (${voice.language}) · installed`
			: `${voice.name} (${voice.language})`
	}));
}

export async function loadLocalVoiceItems(): Promise<SelectItem[]> {
	if (local.voices.length === 0) {
		await local.refreshVoices();
	}

	return local.getInstalledVoices().map((voice) => ({
		value: voice.id,
		label: `${voice.name} (${voice.language})`
	}));
}

export function localVoiceSelectItems(emptyOption: SelectItem): () => Promise<SelectItem[]> {
	return async () => [emptyOption, ...(await loadLocalVoiceItems())];
}

export function localVoiceSelectField(
	options: { name?: string; emptyLabel?: string; required?: boolean } = {}
): HandlerFieldDefinition {
	return {
		type: 'select',
		name: options.name ?? 'Voice',
		placeholder: options.emptyLabel ?? 'Use default voice',
		loadingPlaceholder: 'Loading voices…',
		required: options.required,
		items: localVoiceSelectItems({
			value: '',
			label: options.emptyLabel ?? 'Use default voice'
		})
	};
}

function localVoiceSelectSettingsItems(): (context: SettingsContext) => Promise<SelectItem[]> {
	return async () => loadLocalVoiceItems();
}

export function localVoiceSelectSettingsField(
	options: {
		name?: string;
		emptyLabel?: string;
		required?: boolean;
		visible?: (context: SettingsVisibilityContext) => boolean;
	} = {}
): PluginSettingsFieldDefinition {
	return {
		type: 'combobox',
		name: options.name ?? 'Local TTS default voice',
		placeholder: options.emptyLabel ?? 'Select a default voice',
		loadingPlaceholder: 'Loading voices…',
		required: options.required,
		visible: options.visible,
		items: localVoiceSelectSettingsItems(),
		itemsReload: () => local.getInstalledVoices().length
	};
}

