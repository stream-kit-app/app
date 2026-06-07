import type { Plugin } from '@stream-kit/app/api';

import { createElevenLabsSpeakHandler } from './handler/elevenlabs/speak';
import { createStreamElementsSpeakHandler } from './handler/streamelements/speak';
import { elevenlabs } from './lib/elevenlabs';
import { elevenlabsModelSelectSettingsField } from './lib/elevenlabs/models';
import { elevenlabsVoiceSelectSettingsField } from './lib/elevenlabs/voices';
import { streamelements } from './lib/streamelements';
import { voiceSelectSettingsField } from './lib/streamelements/voices';

export const SETTINGS_KEY = 'tts';

const plugin: Plugin = (app) => {
	return {
		key: SETTINGS_KEY,
		name: 'TTS',
		description: 'Configure the TTS engine and settings.',
		icon: 'ri:speaker-3-line',
		dependencies: ['twitch'],
		isConfigured: ({ getValue }) =>
			Boolean(String(getValue('apiKey') ?? '').trim()) ||
			Boolean(String(getValue('elevenlabsApiKey') ?? '').trim()),
		settings: [
			{
				type: 'section',
				title: 'StreamElements',
				description: 'StreamElements integration',
				fields: [
					{
						type: 'alert',
						key: 'apiKeyAlert',
						name: 'API key',
						description: 'Enter your StreamElements overlay token',
						variant: 'success',
						visible: ({ getValue }) => Boolean(String(getValue('apiKey') ?? '').trim())
					},
					{
						type: 'text',
						inputType: 'password',
						key: 'apiKey',
						name: 'API key',
						placeholder: 'Paste your StreamElements overlay token'
					},
					{
						type: 'button',
						key: 'test',
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
						type: 'slider',
						key: 'volume',
						name: 'Volume',
						min: 0,
						max: 100,
						defaultValue: 100,
						visible: ({ getValue }) => Boolean(String(getValue('apiKey') ?? '').trim())
					},
					voiceSelectSettingsField({
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
						type: 'text',
						inputType: 'password',
						key: 'elevenlabsApiKey',
						name: 'API key',
						placeholder: 'Paste your ElevenLabs API key'
					},
					{
						type: 'button',
						key: 'elevenlabsTest',
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
						visible: ({ getValue }) =>
							Boolean(String(getValue('elevenlabsApiKey') ?? '').trim())
					}),
					{
						type: 'slider',
						key: 'elevenlabsVolume',
						name: 'Volume',
						min: 0,
						max: 100,
						defaultValue: 100,
						visible: ({ getValue }) =>
							Boolean(String(getValue('elevenlabsApiKey') ?? '').trim())
					},
					elevenlabsVoiceSelectSettingsField({
						name: 'Default voice',
						emptyLabel: 'Select a default voice',
						visible: ({ getValue }) =>
							Boolean(String(getValue('elevenlabsApiKey') ?? '').trim())
					})
				]
			}
		],
		onLoad: async () => {
			await streamelements.syncFromStore();
			await elevenlabs.syncFromStore();
		},
		onSave: async () => {
			await streamelements.syncFromStore();
			await elevenlabs.syncFromStore();
		},
		onBoot: async ({ store }) => {
			await streamelements.boot(app, store);
			await elevenlabs.boot(app, store);
		},
		handlers: [
			{
				id: 'tts',
				name: 'TTS',
				children: [
					{
						id: 'tts-streamelements',
						name: 'StreamElements',
						children: [createStreamElementsSpeakHandler()]
					},
					{
						id: 'tts-elevenlabs',
						name: 'ElevenLabs',
						children: [createElevenLabsSpeakHandler()]
					}
				]
			}
		]
	};
};


export default plugin;
export { streamelements } from './lib/streamelements';
export { elevenlabs } from './lib/elevenlabs';
