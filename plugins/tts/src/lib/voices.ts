import type { SettingsFieldDefinition } from '@stream-kit/app/api';
import type { HandlerFieldDefinition, SelectItem } from '@stream-kit/core';

import { streamelements } from './streamelements';

export async function loadVoiceItems(): Promise<SelectItem[]> {
	if (!streamelements.isConfigured) {
		return [];
	}

	try {
		const voices = await streamelements.fetchVoices();

		return voices.map((voice) => ({
			value: voice.id,
			label: `${voice.name} (${voice.languageName})`
		}));
	} catch {
		return [];
	}
}

export function voiceSelectItems(emptyOption: SelectItem): () => Promise<SelectItem[]> {
	return async () => [emptyOption, ...(await loadVoiceItems())];
}

export function voiceSelectField(
	options: { name?: string; emptyLabel?: string; required?: boolean } = {}
): HandlerFieldDefinition {
	return {
		type: 'select',
		key: 'voice',
		name: options.name ?? 'Voice',
		placeholder: options.emptyLabel ?? 'Use default voice',
		loadingPlaceholder: 'Loading voices…',
		required: options.required,
		items: voiceSelectItems({
			value: '',
			label: options.emptyLabel ?? 'Use default voice'
		})
	};
}

export function voiceSelectSettingsField(
	options: {
		key?: string;
		name?: string;
		emptyLabel?: string;
		required?: boolean;
	} = {}
): SettingsFieldDefinition {
	return {
		type: 'select',
		key: options.key ?? 'defaultVoice',
		name: options.name ?? 'Default voice',
		placeholder: options.emptyLabel ?? 'Select a default voice',
		loadingPlaceholder: 'Loading voices…',
		required: options.required,
		items: voiceSelectItems({
			value: '',
			label: options.emptyLabel ?? 'Select a default voice'
		})
	};
}
