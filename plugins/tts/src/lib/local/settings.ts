import type {
	PluginAppApi,
	PluginSettingsFieldDefinition,
	PluginSettingsFieldSectionDefinition
} from '@stream-kit/plugin';

import { MAX_TTS_VOLUME } from '../player';
import { errorMessage } from '../settings-helpers';
import {
	local,
	LOCAL_DEFAULT_VOICE_SETTING_KEY,
	LOCAL_VOLUME_SETTING_KEY,
	resolveDefaultVoiceFromSettings,
	resolveVolumeFromSettings
} from './service';
import {
	formatLocalVoiceLabel,
	loadLocalCatalogVoiceItems,
	loadLocalVoiceItems,
	localVoiceSelectSettingsField
} from './voices';

const TEST_PHRASE = 'This is a local text-to-speech test.';

const hasInstalledVoices = () => local.getInstalledVoices().length > 0;

export function createLocalTtsVoiceSelectField(app: PluginAppApi): PluginSettingsFieldDefinition {
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
		itemsReload: () => `${local.voices.length}:${local.getInstalledVoices().length}`,
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

export function createLocalSettingsSection(
	app: PluginAppApi
): PluginSettingsFieldSectionDefinition {
	const { translate } = app.i18n;

	return {
		type: 'section',
		title: 'Local TTS',
		description: 'Offline text-to-speech powered by Piper.',
		icon: 'ri:computer-line',
		collapsible: true,
		badge: () => {
			if (!local.runtimeInstalled) {
				return { label: translate('Runtime required'), variant: 'warning' };
			}

			if (!hasInstalledVoices()) {
				return { label: translate('No voices'), variant: 'outline' };
			}

			return { label: translate('Ready'), variant: 'success' };
		},
		fields: [
			{
				type: 'section',
				title: 'Runtime',
				visible: () => !local.runtimeInstalled,
				fields: [
					{
						type: 'alert',
						name: 'Piper runtime required',
						description:
							'Download the Piper runtime once before installing voices. Voice downloads will install it automatically.',
						variant: 'warning'
					},
					{
						type: 'button',
						name: 'Download Piper runtime',
						variant: 'outline',
						onClick: async () => {
							app.toast.create({
								title: translate('Downloading Piper runtime'),
								description: translate('This only needs to be done once.'),
								variant: 'default'
							});

							try {
								await local.ensureRuntime();
								app.toast.create({
									title: translate('Piper runtime installed'),
									description: translate('You can now download voices.'),
									variant: 'success'
								});
							} catch (error) {
								app.toast.create({
									title: translate('Runtime download failed'),
									description: errorMessage(error),
									variant: 'error'
								});
							}
						}
					}
				]
			},
			{
				type: 'section',
				title: 'Voices',
				fields: [
					createLocalTtsVoiceSelectField(app),
					localVoiceSelectSettingsField({
						key: LOCAL_DEFAULT_VOICE_SETTING_KEY,
						emptyLabel: 'Select a default voice',
						visible: hasInstalledVoices,
						sync: 'device'
					}),
					{
						key: LOCAL_VOLUME_SETTING_KEY,
						type: 'slider',
						name: 'Local TTS volume',
						min: 0,
						max: MAX_TTS_VOLUME * 100,
						defaultValue: 100,
						visible: hasInstalledVoices
					},
					{
						type: 'button',
						name: 'Test voice',
						variant: 'outline',
						visible: ({ getValue }) => {
							const voiceId = resolveDefaultVoiceFromSettings(
								getValue,
								local.defaultVoice
							);

							return Boolean(voiceId && local.isVoiceInstalled(voiceId));
						},
						onClick: async ({ getValue }) => {
							const voiceId = resolveDefaultVoiceFromSettings(
								getValue,
								local.defaultVoice
							);

							if (!voiceId) {
								app.toast.create({
									title: translate('Default voice required'),
									description: translate(
										'Select a default voice before testing.'
									),
									variant: 'error'
								});
								return;
							}

							try {
								await local.testVoice(
									voiceId,
									TEST_PHRASE,
									resolveVolumeFromSettings(getValue) ?? local.volume
								);
								app.toast.create({
									title: translate('Test started'),
									description: translate('Playing the test phrase.'),
									variant: 'success'
								});
							} catch (error) {
								app.toast.create({
									title: translate('Test failed'),
									description: errorMessage(error),
									variant: 'error'
								});
							}
						}
					}
				]
			}
		]
	};
}
