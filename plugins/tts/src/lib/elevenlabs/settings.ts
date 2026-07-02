import type { PluginAppApi, PluginSettingsFieldDefinition, SettingsContext } from '@stream-kit/plugin';

import { fetchElevenLabsVoices } from './api';
import { formatElevenLabsVoiceName } from './voices';

async function loadElevenLabsVoiceRows(context: SettingsContext) {
	const apiKey = String(context.getValue('elevenlabsApiKey') ?? '').trim();

	if (!apiKey) {
		return [];
	}

	try {
		const voices = await fetchElevenLabsVoices(apiKey);

		return voices.map((voice) => ({
			id: voice.id,
			name: formatElevenLabsVoiceName(voice)
		}));
	} catch {
		return [];
	}
}

export function createElevenLabsVoiceOverviewField(
	app: PluginAppApi
): PluginSettingsFieldDefinition {
	return {
		type: 'table',
		name: 'Elevenlabs voices',
		description:
			'Browse available ElevenLabs voices and their IDs for use in triggers and handlers.',
		rowKey: 'id',
		columns: [
			{ key: 'name', header: 'Voice' },
			{ key: 'id', header: 'Voice ID', mono: true }
		],
		actions: [
			{
				type: 'copy',
				key: 'copy-id',
				columnKey: 'id',
				ariaLabel: 'Copy voice ID',
				onCopy: async (context, row, voiceId) => {
					await navigator.clipboard.writeText(voiceId);

					app.toast.create({
						title: 'Voice ID copied',
						description: row.name ?? voiceId,
						variant: 'success'
					});
				}
			}
		],
		searchPlaceholder: 'Search by name, language, or id',
		loadingPlaceholder: 'Loading voices…',
		emptyLabel: 'No voices found.',
		visible: ({ getValue }) => Boolean(String(getValue('elevenlabsApiKey') ?? '').trim()),
		rows: loadElevenLabsVoiceRows,
		rowsReload: (context) => context.getValue('elevenlabsApiKey')
	};
}
