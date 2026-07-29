import type { Plugin } from '@stream-kit/plugin';

import { configureFieldValueResolver } from './get-field-value';
import { createElevenLabsSpeakHandler } from './handler/elevenlabs/speak';
import { createLocalSpeakHandler } from './handler/local/speak';
import { createSkipTtsHandler } from './handler/skip';
import { createStreamElementsSpeakHandler } from './handler/streamelements/speak';
import { elevenlabs } from './lib/elevenlabs';
import { elevenlabsModelSelectSettingsField } from './lib/elevenlabs/models';
import { createElevenLabsVoiceOverviewField } from './lib/elevenlabs/settings';
import { elevenlabsVoiceSelectSettingsField } from './lib/elevenlabs/voices';
import { local, resolveDefaultVoiceFromSettings, resolveVolumeFromSettings } from './lib/local';
import { LOCAL_DEFAULT_VOICE_SETTING_KEY, LOCAL_VOLUME_SETTING_KEY } from './lib/local/service';
import { createLocalTtsVoiceSelectField } from './lib/local/settings';
import { localVoiceSelectSettingsField } from './lib/local/voices';
import { streamelements } from './lib/streamelements';
import { voiceSelectSettingsField } from './lib/streamelements/voices';

export const SETTINGS_KEY = 'tts';

const plugin: Plugin = (app) => {
	configureFieldValueResolver(app);
	// Make the app bridge available before any lifecycle hook runs (onLoad
	// refreshes voices before onEnable, which is where the service is fully started).
	local.setApp(app);

	return {
		key: SETTINGS_KEY,
		name: 'TTS',
		description: 'Configure the TTS engine and settings.',
		icon: 'ri:speaker-3-line',
		dependencies: ['twitch'],
		api: {
			subscribe: (listener: () => void) => local.subscribe(listener)
		},
		isConfigured: ({ getValue }) =>
			Boolean(String(getValue('apiKey') ?? '').trim()) ||
			Boolean(String(getValue('elevenlabsApiKey') ?? '').trim()) ||
			local.isConfigured,
		settings: [
			{
				type: 'section',
				title: 'Local TTS',
				description: 'Offline text-to-speech powered by Piper.',
				fields: [
					{
						type: 'alert',
						name: 'Piper runtime ready',
						description: 'The Piper runtime is installed on this device.',
						variant: 'success',
						visible: () => local.runtimeInstalled
					},
					{
						type: 'alert',
						name: 'Piper runtime required',
						description:
							'Download the Piper runtime once before installing voices. Voice downloads will install it automatically.',
						variant: 'warning',
						visible: () => !local.runtimeInstalled
					},
					{
						type: 'button',
						name: 'Download Piper runtime',
						variant: 'outline',
						visible: () => !local.runtimeInstalled,
						onClick: async () => {
							app.toast.create({
								title: 'Downloading Piper runtime',
								description: 'This only needs to be done once.',
								variant: 'default'
							});

							try {
								await local.ensureRuntime();
								app.toast.create({
									title: 'Piper runtime installed',
									description: 'You can now download voices.',
									variant: 'success'
								});
							} catch (error) {
								const message =
									error instanceof Error ? error.message : String(error);
								app.toast.create({
									title: 'Runtime download failed',
									description: message,
									variant: 'error'
								});
							}
						}
					},
					createLocalTtsVoiceSelectField(app),
					localVoiceSelectSettingsField({
						key: LOCAL_DEFAULT_VOICE_SETTING_KEY,
						emptyLabel: 'Select a default voice',
						visible: () => local.getInstalledVoices().length > 0,
						sync: 'device'
					}),
					{
						key: LOCAL_VOLUME_SETTING_KEY,
						type: 'slider',
						name: 'Local TTS volume',
						min: 0,
						max: 100,
						defaultValue: 100,
						visible: () => local.getInstalledVoices().length > 0
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
									title: 'Default voice required',
									description: 'Select a default voice before testing.',
									variant: 'error'
								});
								return;
							}

							try {
								await local.testVoice(
									voiceId,
									'This is a local text-to-speech test.',
									resolveVolumeFromSettings(getValue) ?? local.volume
								);
								app.toast.create({
									title: 'Test started',
									description: 'Playing the test phrase.',
									variant: 'success'
								});
							} catch (error) {
								const message =
									error instanceof Error ? error.message : String(error);
								app.toast.create({
									title: 'Test failed',
									description: message,
									variant: 'error'
								});
							}
						}
					}
				]
			},
			{
				type: 'section',
				title: 'StreamElements',
				description: 'StreamElements integration',
				fields: [
					{
						type: 'alert',
						name: 'API key',
						description: 'Enter your StreamElements overlay token',
						variant: 'success',
						visible: ({ getValue }) => Boolean(String(getValue('apiKey') ?? '').trim())
					},
					{
						key: 'apiKey',
						type: 'text',
						inputType: 'password',
						name: 'API key',
						placeholder: 'Paste your StreamElements overlay token',
						secret: true,
						sync: 'device'
					},
					{
						type: 'button',
						name: 'Test API key',
						variant: 'outline',
						visible: ({ getValue }) => Boolean(String(getValue('apiKey') ?? '').trim()),
						onClick: async ({ getValue }) => {
							const apiKey = String(getValue('apiKey') ?? '').trim();

							if (!apiKey) {
								app.toast.create({
									title: 'API key required',
									description: 'Enter your overlay API key before testing.',
									variant: 'error'
								});

								return;
							}

							try {
								const voiceCount = await streamelements.testConnection(apiKey);

								app.toast.create({
									title: 'Connection successful',
									description: `Found ${voiceCount} voices.`,
									variant: 'success'
								});
							} catch {
								app.toast.create({
									title: 'Connection failed',
									description:
										'Could not reach StreamElements. Check your API key.',
									variant: 'error'
								});
							}
						}
					},
					{
						key: 'volume',
						type: 'slider',
						name: 'Volume',
						min: 0,
						max: 100,
						defaultValue: 100,
						visible: ({ getValue }) => Boolean(String(getValue('apiKey') ?? '').trim())
					},
					voiceSelectSettingsField({
						key: 'defaultVoice',
						name: 'Default voice',
						emptyLabel: 'Select a default voice',
						visible: ({ getValue }) => Boolean(String(getValue('apiKey') ?? '').trim())
					})
				]
			},
			{
				type: 'section',
				title: 'ElevenLabs',
				description: 'ElevenLabs integration',
				fields: [
					{
						key: 'elevenlabsApiKey',
						type: 'text',
						inputType: 'password',
						name: 'Elevenlabs API key',
						placeholder: 'Paste your ElevenLabs API key',
						secret: true,
						sync: 'device'
					},
					{
						type: 'button',
						name: 'Test API key',
						variant: 'outline',
						visible: ({ getValue }) =>
							Boolean(String(getValue('elevenlabsApiKey') ?? '').trim()),
						onClick: async ({ getValue }) => {
							const apiKey = String(getValue('elevenlabsApiKey') ?? '').trim();

							if (!apiKey) {
								app.toast.create({
									title: 'API key required',
									description: 'Enter your ElevenLabs API key before testing.',
									variant: 'error'
								});

								return;
							}

							try {
								const voiceCount = await elevenlabs.testConnection(apiKey);

								app.toast.create({
									title: 'Connection successful',
									description: `Found ${voiceCount} voices.`,
									variant: 'success'
								});
							} catch {
								app.toast.create({
									title: 'Connection failed',
									description: 'Could not reach ElevenLabs. Check your API key.',
									variant: 'error'
								});
							}
						}
					},
					elevenlabsModelSelectSettingsField({
						key: 'elevenlabsModelId',
						visible: ({ getValue }) =>
							Boolean(String(getValue('elevenlabsApiKey') ?? '').trim())
					}),
					{
						key: 'elevenlabsVolume',
						type: 'slider',
						name: 'Elevenlabs volume',
						min: 0,
						max: 100,
						defaultValue: 100,
						visible: ({ getValue }) =>
							Boolean(String(getValue('elevenlabsApiKey') ?? '').trim())
					},
					elevenlabsVoiceSelectSettingsField({
						key: 'elevenlabsDefaultVoice',
						name: 'Elevenlabs default voice',
						emptyLabel: 'Select a default voice',
						visible: ({ getValue }) =>
							Boolean(String(getValue('elevenlabsApiKey') ?? '').trim())
					}),
					createElevenLabsVoiceOverviewField(app)
				]
			}
		],
		handlers: [
			{
				name: 'TTS',
				children: [
					createSkipTtsHandler(),
					{
						name: 'Local',
						children: [createLocalSpeakHandler()]
					},
					{
						name: 'StreamElements',
						children: [createStreamElementsSpeakHandler()]
					},
					{
						name: 'ElevenLabs',
						children: [createElevenLabsSpeakHandler()]
					}
				]
			}
		],
		onLoad: async ({ store }) => {
			elevenlabs.ensureStore(store);
			await streamelements.syncFromStore();
			await elevenlabs.syncFromStore();
			await local.syncFromStore();
			await local.refreshVoices();
		},
		onSave: async () => {
			await streamelements.syncFromStore();
			await elevenlabs.syncFromStore();
			await local.syncFromStore();
		},
		onEnable: async ({ store }) => {
			await streamelements.boot(app, store);
			await elevenlabs.boot(app, store);
			await local.boot(app, store);
		}
	};
};

export default plugin;
export { streamelements } from './lib/streamelements';
export { elevenlabs } from './lib/elevenlabs';
export { local } from './lib/local';
