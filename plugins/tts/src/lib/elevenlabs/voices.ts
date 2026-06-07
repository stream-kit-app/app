import type {
	SettingsContext,
	SettingsFieldDefinition,
	SettingsVisibilityContext
} from '@stream-kit/app/api';
import type { HandlerFieldDefinition, SelectItem } from '@stream-kit/core';

import { fetchElevenLabsVoices } from './api';
import { elevenlabs } from './service';

export async function loadElevenLabsVoiceItems(): Promise<SelectItem[]> {
	if (!elevenlabs.isConfigured) {
		return [];
	}

	try {
		const voices = await elevenlabs.fetchVoices();

		return voices.map((voice) => ({
			value: voice.id,
			label: voice.language ? `${voice.name} (${voice.language})` : voice.name
		}));
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
	return {
		type: 'select',
		key: 'voice',
		name: options.name ?? 'Voice',
		placeholder: options.emptyLabel ?? 'Use default voice',
		loadingPlaceholder: 'Loading voices…',
		required: options.required,
		items: elevenlabsVoiceSelectItems({
			value: '',
			label: options.emptyLabel ?? 'Use default voice'
		})
	};
}

function elevenlabsVoiceSelectSettingsItems(): (context: SettingsContext) => Promise<SelectItem[]> {
	return async (context) => {
		const apiKey = String(context.getValue('elevenlabsApiKey') ?? '').trim();

		if (!apiKey) {
			return [];
		}

		try {
			const voices = await fetchElevenLabsVoices(apiKey);

			return voices.map((voice) => ({
				value: voice.id,
				label: voice.language ? `${voice.name} (${voice.language})` : voice.name
			}));
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
		type: 'combobox',
		key: options.key ?? 'elevenlabsDefaultVoice',
		name: options.name ?? 'Default voice',
		placeholder: options.emptyLabel ?? 'Select a default voice',
		loadingPlaceholder: 'Loading voices…',
		required: options.required,
		visible: options.visible,
		items: elevenlabsVoiceSelectSettingsItems(),
		itemsReload: (context) => context.getValue('elevenlabsApiKey')
	};
}
