import type {
	PluginSettingsFieldDefinition,
	SettingsContext,
	SettingsVisibilityContext
} from '@stream-kit/plugin';
import type { HandlerFieldDefinition, SelectItem } from '@stream-kit/plugin';

import { local } from './service';
import { createVoiceOneOfField } from '../voice-one-of-field';

export function formatLocalVoiceLabel(voice: {
	id: string;
	name: string;
	language: string;
	quality: string;
}): string {
	return `${voice.name} (${voice.language}, ${voice.quality}) · ${voice.id}`;
}

export async function loadLocalCatalogVoiceItems(): Promise<SelectItem[]> {
	if (local.voices.length === 0) {
		await local.refreshVoices();
	}

	return local.voices.map((voice) => ({
		value: voice.id,
		label: voice.installed
			? `${formatLocalVoiceLabel(voice)} · installed`
			: formatLocalVoiceLabel(voice)
	}));
}

export async function loadLocalVoiceItems(): Promise<SelectItem[]> {
	if (local.voices.length === 0) {
		await local.refreshVoices();
	}

	return local.getInstalledVoices().map((voice) => ({
		value: voice.id,
		label: formatLocalVoiceLabel(voice)
	}));
}

export function localVoiceSelectItems(emptyOption: SelectItem): () => Promise<SelectItem[]> {
	return async () => [emptyOption, ...(await loadLocalVoiceItems())];
}

export function localVoiceSelectField(
	options: { name?: string; emptyLabel?: string; required?: boolean } = {}
): HandlerFieldDefinition {
	return createVoiceOneOfField(
		{
			type: 'select',
			name: options.name ?? 'Voice',
			placeholder: options.emptyLabel ?? 'Use default voice',
			loadingPlaceholder: 'Loading voices…',
			required: options.required,
			items: localVoiceSelectItems({
				value: '',
				label: options.emptyLabel ?? 'Use default voice'
			})
		},
		{ name: options.name, required: options.required }
	);
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

