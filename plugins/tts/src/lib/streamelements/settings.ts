import type { PluginAppApi, PluginSettingsFieldSectionDefinition } from '@stream-kit/plugin';

import { MAX_TTS_VOLUME } from '../player';
import { getTrimmedValue, hasValue } from '../settings-helpers';
import { streamelements } from './service';
import { voiceSelectSettingsField } from './voices';

const API_KEY = 'apiKey';

export function createStreamElementsSettingsSection(
	app: PluginAppApi
): PluginSettingsFieldSectionDefinition {
	const { translate } = app.i18n;

	return {
		type: 'section',
		title: 'StreamElements',
		description: 'Cloud voices via your StreamElements overlay token.',
		icon: 'ri:cloud-line',
		collapsible: true,
		badge: ({ getValue }) =>
			hasValue(getValue, API_KEY)
				? { label: translate('Connected'), variant: 'success' }
				: { label: translate('Not configured'), variant: 'outline' },
		fields: [
			{
				type: 'section',
				title: 'Connection',
				fields: [
					{
						type: 'alert',
						name: 'API key required',
						description:
							'Paste your StreamElements overlay token to use StreamElements voices.',
						variant: 'warning',
						visible: ({ getValue }) => !hasValue(getValue, API_KEY)
					},
					{
						key: API_KEY,
						type: 'text',
						inputType: 'password',
						name: 'StreamElements overlay token',
						placeholder: 'Paste your StreamElements overlay token',
						secret: true,
						sync: 'device'
					},
					{
						type: 'button',
						name: 'Test API key',
						variant: 'outline',
						visible: ({ getValue }) => hasValue(getValue, API_KEY),
						onClick: async ({ getValue }) => {
							const apiKey = getTrimmedValue(getValue, API_KEY);

							if (!apiKey) {
								app.toast.create({
									title: translate('API key required'),
									description: translate(
										'Enter your overlay API key before testing.'
									),
									variant: 'error'
								});

								return;
							}

							try {
								const voiceCount = await streamelements.testConnection(apiKey);

								app.toast.create({
									title: translate('Connection successful'),
									description: translate('Found {count} voices.', {
										count: voiceCount
									}),
									variant: 'success'
								});
							} catch {
								app.toast.create({
									title: translate('Connection failed'),
									description: translate(
										'Could not reach StreamElements. Check your API key.'
									),
									variant: 'error'
								});
							}
						}
					}
				]
			},
			{
				type: 'section',
				title: 'Voice',
				visible: ({ getValue }) => hasValue(getValue, API_KEY),
				fields: [
					voiceSelectSettingsField({
						key: 'defaultVoice',
						name: 'StreamElements default voice',
						emptyLabel: 'Select a default voice'
					}),
					{
						key: 'volume',
						type: 'slider',
						name: 'StreamElements volume',
						min: 0,
						max: MAX_TTS_VOLUME * 100,
						defaultValue: 100
					}
				]
			}
		]
	};
}
