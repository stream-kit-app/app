import type {
	SettingsContext,
	SettingsFieldDefinition,
	SettingsVisibilityContext
} from '@stream-kit/plugin';
import type { SelectItem } from '@stream-kit/plugin';

import { fetchElevenLabsModels } from './api';

function elevenlabsModelSelectSettingsItems(): (context: SettingsContext) => Promise<SelectItem[]> {
	return async (context) => {
		const apiKey = String(context.getValue('elevenlabsApiKey') ?? '').trim();

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
): SettingsFieldDefinition {
	return {
		type: 'select',
		name: options.name ?? 'Model',
		placeholder: options.emptyLabel ?? 'Select a model',
		loadingPlaceholder: 'Loading models…',
		required: options.required,
		visible: options.visible,
		items: elevenlabsModelSelectSettingsItems(),
		itemsReload: (context) => context.getValue('elevenlabsApiKey')
	};
}
