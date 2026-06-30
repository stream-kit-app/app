import type { PluginAppApi, PluginSettingsFieldDefinition } from '@stream-kit/plugin';

import { local } from './service';
import { formatLocalVoiceLabel, loadLocalCatalogVoiceItems, loadLocalVoiceItems } from './voices';

export function createLocalTtsVoiceSelectField(
	app: PluginAppApi
): PluginSettingsFieldDefinition {
	return {
		type: 'select-values',
		name: 'Voices',
		description: 'Download Piper voices for offline text-to-speech.',
		buttonLabel: 'Select values',
		dialogTitle: 'Download voices',
		searchPlaceholder: 'Search by name, language, or id',
		loadingPlaceholder: 'Loading voices…',
		emptySelectedLabel: 'No voices installed yet.',
		items: async () => loadLocalCatalogVoiceItems(),
		itemsReload: () =>
			`${local.voices.length}:${local.getInstalledVoices().length}`,
		selectedItems: async () => loadLocalVoiceItems(),
		selectedReload: () => local.getInstalledVoices().length,
		isChecked: (_context, voiceId) => local.isVoiceInstalled(voiceId),
		onCheck: async (_context, voiceId) => {
			const voice = local.voices.find((item) => item.id === voiceId);
			const label = voice ? formatLocalVoiceLabel(voice) : voiceId;

			app.toast.create({
				title: 'Downloading voice',
				description: `Downloading ${label}…`,
				variant: 'default'
			});

			try {
				await local.downloadVoice(voiceId);
				app.toast.create({
					title: 'Voice installed',
					description: `${label} is ready to use.`,
					variant: 'success'
				});
			} catch (error) {
				const message = error instanceof Error ? error.message : String(error);
				app.toast.create({
					title: 'Download failed',
					description: message,
					variant: 'error'
				});
				throw error;
			}
		},
		onUncheck: async (_context, voiceId) => {
			const voice = local.voices.find((item) => item.id === voiceId);
			const label = voice ? formatLocalVoiceLabel(voice) : voiceId;

			try {
				await local.removeVoice(voiceId);
				app.toast.create({
					title: 'Voice removed',
					description: `${label} was removed.`,
					variant: 'success'
				});
			} catch (error) {
				const message = error instanceof Error ? error.message : String(error);
				app.toast.create({
					title: 'Remove failed',
					description: message,
					variant: 'error'
				});
				throw error;
			}
		}
	};
}
