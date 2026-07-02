import type {
	SettingsContext,
	SettingsFieldDefinition,
	SettingsVisibilityContext
} from '@stream-kit/plugin';
import type { HandlerFieldDefinition, SelectItem } from '@stream-kit/plugin';

import type { ElevenLabsVoice } from './types';

import { fetchElevenLabsVoices } from './api';
import { elevenlabs } from './service';
import { createVoiceOneOfField } from '../voice-one-of-field';

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
		const apiKey = String(context.getValue('elevenlabsApiKey') ?? '').trim();

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
): SettingsFieldDefinition {
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
