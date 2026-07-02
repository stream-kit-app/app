import type {
	SettingsContext,
	SettingsFieldDefinition,
	SettingsVisibilityContext
} from '@stream-kit/plugin';
import type { HandlerFieldDefinition, SelectItem } from '@stream-kit/plugin';

import { fetchStreamElementsVoices } from './api';
import { streamelements } from './service';
import { createVoiceOneOfField } from '../voice-one-of-field';

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
	return createVoiceOneOfField(
		{
			type: 'select',
			name: options.name ?? 'Voice',
			placeholder: options.emptyLabel ?? 'Use default voice',
			loadingPlaceholder: 'Loading voices…',
			required: options.required,
			items: voiceSelectItems({
				value: '',
				label: options.emptyLabel ?? 'Use default voice'
			})
		},
		{ name: options.name, required: options.required }
	);
}

function voiceSelectSettingsItems(): (context: SettingsContext) => Promise<SelectItem[]> {
	return async (context) => {
		const apiKey = String(context.getValue('apiKey') ?? '').trim();

		if (!apiKey) {
			return [];
		}

		try {
			const voices = await fetchStreamElementsVoices(apiKey);

			return voices.map((voice) => ({
				value: voice.id,
				label: `${voice.name} (${voice.languageName})`
			}));
		} catch {
			return [];
		}
	};
}

export function voiceSelectSettingsField(
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
		type: 'select',
		name: options.name ?? 'Default voice',
		placeholder: options.emptyLabel ?? 'Select a default voice',
		loadingPlaceholder: 'Loading voices…',
		required: options.required,
		visible: options.visible,
		items: voiceSelectSettingsItems(),
		itemsReload: (context) => context.getValue('apiKey')
	};
}
