import type { App, Plugin } from '@stream-kit/app/api';

import { createStreamElementsSpeakHandler } from './handler/streamelements/speak';
import { streamelements } from './lib/streamelements';
import { voiceSelectSettingsField } from './lib/voices';

export const SETTINGS_KEY = 'tts-streamelements';

const plugin: Plugin = async (app: App): Promise<void> => {
	app.settings.add({
		key: 'twitch-settings',
		title: 'Twitch',
		description: 'Configure the Twitch settings.',
		fields: [
			{
				type: 'text',
				key: 'apiKey',
				name: 'API key'
			}
		]
	});
	app.settings.add({
		key: SETTINGS_KEY,
		title: 'TTS',
		description: 'Configure the TTS engine and settings.',
		fields: [
			{
				type: 'section',
				title: 'Connection',
				description: 'Authenticate with your StreamElements overlay.',
				fields: [
					{
						type: 'text',
						inputType: 'password',
						key: 'apiKey',
						name: 'Overlay API key',
						placeholder: 'Paste your StreamElements overlay token',
						required: true
					},
					{
						type: 'button',
						key: 'test',
						name: 'Test connection',
						onClick: async ({ settings }) => {
							const apiKey = String(
								(await settings.get<string>('apiKey')) ?? ''
							).trim();

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
					}
				]
			},
			{
				type: 'section',
				title: 'Playback',
				fields: [
					{
						type: 'slider',
						key: 'volume',
						name: 'Volume',
						min: 0,
						max: 100,
						defaultValue: 100
					},
					voiceSelectSettingsField({
						name: 'Default voice',
						emptyLabel: 'Select a default voice'
					})
				]
			}
		],
		onLoad: () => streamelements.syncFromStore(),
		onSave: () => streamelements.syncFromStore()
	});

	app.handlerDefinitions.add({
		id: 'tts',
		name: 'TTS',
		children: [
			{
				id: 'tts-streamelements',
				name: 'StreamElements',
				children: [createStreamElementsSpeakHandler()]
			}
		]
	});

	await streamelements.boot(app);
};

export default plugin;
export { streamelements } from './lib/streamelements';
