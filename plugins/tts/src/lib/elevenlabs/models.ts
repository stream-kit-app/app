import type {
	HandlerFieldDefinition,
	PluginSettingsFieldDefinition,
	SelectItem,
	SettingsContext,
	SettingsVisibilityContext
} from '@stream-kit/plugin';

import { getTrimmedValue } from '../settings-helpers';
import { fetchElevenLabsModels } from './api';
import { elevenlabs } from './service';

export async function loadElevenLabsModelItems(): Promise<SelectItem[]> {
	if (!elevenlabs.isConfigured) {
		return [];
	}

	try {
		const models = await fetchElevenLabsModels(elevenlabs.apiKey!);

		return models.map((model) => ({
			value: model.id,
			label: model.name
		}));
	} catch {
		return [];
	}
}

export function elevenlabsModelSelectItems(emptyOption: SelectItem): () => Promise<SelectItem[]> {
	return async () => [emptyOption, ...(await loadElevenLabsModelItems())];
}

export function elevenlabsModelSelectField(
	options: { name?: string; emptyLabel?: string; required?: boolean } = {}
): HandlerFieldDefinition {
	return {
		type: 'select',
		name: options.name ?? 'Model',
		placeholder: options.emptyLabel ?? 'Use default model',
		loadingPlaceholder: 'Loading models…',
		required: options.required ?? false,
		items: elevenlabsModelSelectItems({
			value: '',
			label: options.emptyLabel ?? 'Use default model'
		})
	};
}

function elevenlabsModelSelectSettingsItems(): (context: SettingsContext) => Promise<SelectItem[]> {
	return async (context) => {
		const apiKey = getTrimmedValue(context.getValue, 'elevenlabsApiKey');

		if (!apiKey) {
			return [];
		}

		try {
			const models = await fetchElevenLabsModels(apiKey);

			return models.map((model) => ({
				value: model.id,
				label: model.name
			}));
		} catch {
			return [];
		}
	};
}

export function elevenlabsModelSelectSettingsField(
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
		type: 'select',
		name: options.name ?? 'ElevenLabs model',
		placeholder: options.emptyLabel ?? 'Select a model',
		loadingPlaceholder: 'Loading models…',
		required: options.required,
		visible: options.visible,
		items: elevenlabsModelSelectSettingsItems(),
		itemsReload: (context) => context.getValue('elevenlabsApiKey')
	};
}
