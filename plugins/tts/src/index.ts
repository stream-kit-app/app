import type { Plugin, PluginPageDefinition } from '@stream-kit/plugin';

import ElevenLabsVoicesPage from './app/ui/elevenlabs-voices-page.svelte';
import { configureFieldValueResolver } from './get-field-value';
import { createElevenLabsSpeakHandler } from './handler/elevenlabs/speak';
import { createLocalSpeakHandler } from './handler/local/speak';
import { createSkipTtsHandler } from './handler/skip';
import { createStreamElementsSpeakHandler } from './handler/streamelements/speak';
import { elevenlabs } from './lib/elevenlabs';
import { elevenlabsAccount } from './lib/elevenlabs/account.svelte';
import { createElevenLabsSettingsSection } from './lib/elevenlabs/settings';
import { elevenlabsVoiceTuning } from './lib/elevenlabs/voice-tuning.svelte';
import { local } from './lib/local';
import { createLocalSettingsSection } from './lib/local/settings';
import { hasValue } from './lib/settings-helpers';
import { streamelements } from './lib/streamelements';
import { createStreamElementsSettingsSection } from './lib/streamelements/settings';
import ElevenLabsAccountWidget from './widgets/elevenlabs-account-widget.svelte';

export const SETTINGS_KEY = 'tts';

const elevenlabsVoicesPage = {
	customView: 'elevenlabs-voices',
	title: 'ElevenLabs voices',
	description: 'Preview, tune and clone your ElevenLabs voices.'
} as unknown as PluginPageDefinition;

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
		api: {
			subscribe: (listener: () => void) => local.subscribe(listener)
		},
		isConfigured: ({ getValue }) =>
			hasValue(getValue, 'apiKey') ||
			hasValue(getValue, 'elevenlabsApiKey') ||
			local.isConfigured,
		settings: [
			createLocalSettingsSection(app),
			createElevenLabsSettingsSection(app),
			createStreamElementsSettingsSection(app)
		],
		customViews: {
			'elevenlabs-voices': ElevenLabsVoicesPage,
			'elevenlabs-account-widget': ElevenLabsAccountWidget
		},
		menuItems: [
			{
				title: 'TTS',
				icon: 'ri:speaker-3-line',
				children: [{ title: 'ElevenLabs voices', page: elevenlabsVoicesPage }]
			}
		],
		widgets: [
			{
				key: 'elevenlabs-account',
				title: 'ElevenLabs account',
				description: 'Credits, subscription and API key.',
				icon: 'ri:voiceprint-line',
				columns: 1,
				view: 'elevenlabs-account-widget'
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
						children: [createStreamElementsSpeakHandler(app)]
					},
					{
						name: 'ElevenLabs',
						children: [createElevenLabsSpeakHandler(app)]
					}
				]
			}
		],
		onLoad: async ({ store }) => {
			elevenlabs.ensureStore(store);
			await elevenlabsVoiceTuning.boot(app);
			await streamelements.syncFromStore();
			await elevenlabs.syncFromStore();
			await local.syncFromStore();
			await local.refreshVoices();
		},
		onSave: async () => {
			const previousApiKey = elevenlabs.apiKey;

			await streamelements.syncFromStore();
			await elevenlabs.syncFromStore();
			await local.syncFromStore();

			if (elevenlabs.apiKey !== previousApiKey) {
				void elevenlabsAccount.refresh();
			}
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
