import type { ElevenLabsVoice } from './types';
import type {
	HandlerFieldDefinition,
	PluginSettingsFieldDefinition,
	SelectItem,
	SettingsContext,
	SettingsVisibilityContext
} from '@stream-kit/plugin';

import { getTrimmedValue } from '../settings-helpers';
import { createVoiceOneOfField } from '../voice-one-of-field';
import { fetchElevenLabsVoices } from './api';
import { elevenlabs } from './service';

export function formatElevenLabsVoiceLabel(voice: ElevenLabsVoice): string {
	const languagePart = voice.language ? ` (${voice.language})` : '';

	return `${voice.name}${languagePart} · ${voice.id}`;
}

export function formatElevenLabsVoiceName(voice: ElevenLabsVoice): string {
	const languagePart = voice.language ? ` (${voice.language})` : '';

	return `${voice.name}${languagePart}`;
}

function toElevenLabsSelectItem(voice: ElevenLabsVoice): SelectItem {
	return {
		value: voice.id,
		label: formatElevenLabsVoiceLabel(voice)
	};
}

export async function loadElevenLabsVoiceItems(): Promise<SelectItem[]> {
	if (!elevenlabs.isConfigured) {
		return [];
	}

	try {
		const voices = await elevenlabs.fetchVoices();

		return voices.map(toElevenLabsSelectItem);
	} catch {
		return [];
	}
}

export function elevenlabsVoiceSelectItems(emptyOption: SelectItem): () => Promise<SelectItem[]> {
	return async () => [emptyOption, ...(await loadElevenLabsVoiceItems())];
}

export function elevenlabsVoiceSelectField(
	options: { name?: string; emptyLabel?: string; required?: boolean } = {}
): HandlerFieldDefinition {
	return createVoiceOneOfField(
		{
			type: 'select',
			name: options.name ?? 'Voice',
			placeholder: options.emptyLabel ?? 'Use default voice',
			loadingPlaceholder: 'Loading voices…',
			required: options.required,
			items: elevenlabsVoiceSelectItems({
				value: '',
				label: options.emptyLabel ?? 'Use default voice'
			})
		},
		{ name: options.name, required: options.required }
	);
}

function elevenlabsVoiceSelectSettingsItems(): (context: SettingsContext) => Promise<SelectItem[]> {
	return async (context) => {
		const apiKey = getTrimmedValue(context.getValue, 'elevenlabsApiKey');

		if (!apiKey) {
			return [];
		}

		try {
			const voices = await fetchElevenLabsVoices(apiKey);

			return voices.map(toElevenLabsSelectItem);
		} catch {
			return [];
		}
	};
}

export function elevenlabsVoiceSelectSettingsField(
	options: {
		key?: string;
		name?: string;
		emptyLabel?: string;
		required?: boolean;
		visible?: (context: SettingsVisibilityContext) => boolean;
	} = {}
): PluginSettingsFieldDefinition {
	return {
		...(options.key ? { key: options.key } : {}),
		type: 'combobox',
		name: options.name ?? 'Default voice',
		placeholder: options.emptyLabel ?? 'Select a default voice',
		loadingPlaceholder: 'Loading voices…',
		required: options.required,
		visible: options.visible,
		items: elevenlabsVoiceSelectSettingsItems(),
		itemsReload: (context) => context.getValue('elevenlabsApiKey')
	};
}
