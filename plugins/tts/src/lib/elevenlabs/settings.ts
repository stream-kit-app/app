import type { ElevenLabsNumericVoiceSetting, ElevenLabsVoiceSettings } from './types';
import type {
	PluginAppApi,
	PluginSettingsFieldDefinition,
	PluginSettingsFieldSectionDefinition,
	SettingsContext,
	SettingsVisibilityContext
} from '@stream-kit/plugin';

import { MAX_TTS_VOLUME } from '../player';
import { errorMessage, getTrimmedValue, hasValue } from '../settings-helpers';
import { elevenlabsModelSelectSettingsField } from './models';
import { clampVoiceSetting, elevenlabs, ELEVENLABS_STORE_KEYS } from './service';
import { ELEVENLABS_VOICE_SETTING_RANGES } from './types';
import { elevenlabsVoiceTuning } from './voice-tuning.svelte';
import { elevenlabsVoiceSelectSettingsField } from './voices';

const API_KEY = ELEVENLABS_STORE_KEYS.apiKey;
const TEST_PHRASE = 'This is an ElevenLabs text-to-speech test.';

const whenConfigured = ({ getValue }: SettingsVisibilityContext) => hasValue(getValue, API_KEY);

function voiceSettingSlider(
	setting: ElevenLabsNumericVoiceSetting,
	name: string
): PluginSettingsFieldDefinition {
	const { min, max, defaultValue } = ELEVENLABS_VOICE_SETTING_RANGES[setting];

	return {
		key: ELEVENLABS_STORE_KEYS[setting],
		type: 'slider',
		name,
		min,
		max,
		step: 0.05,
		unit: '',
		defaultValue
	};
}

function resolveTestVolume(getValue: SettingsVisibilityContext['getValue']): number {
	const voiceVolume = elevenlabsVoiceTuning.getVolume(
		getTrimmedValue(getValue, ELEVENLABS_STORE_KEYS.defaultVoice)
	);

	if (voiceVolume !== null) {
		return voiceVolume / 100;
	}

	return (Number(getValue(ELEVENLABS_STORE_KEYS.volume) ?? 100) || 0) / 100;
}

function readVoiceSettings(
	getValue: SettingsVisibilityContext['getValue']
): ElevenLabsVoiceSettings {
	const read = (setting: ElevenLabsNumericVoiceSetting) => {
		const value = Number(getValue(ELEVENLABS_STORE_KEYS[setting]));

		return Number.isFinite(value)
			? clampVoiceSetting(setting, value)
			: ELEVENLABS_VOICE_SETTING_RANGES[setting].defaultValue;
	};

	return {
		stability: read('stability'),
		similarityBoost: read('similarityBoost'),
		style: read('style'),
		speed: read('speed'),
		useSpeakerBoost: getValue(ELEVENLABS_STORE_KEYS.speakerBoost) !== false
	};
}

export function createElevenLabsSettingsSection(
	app: PluginAppApi
): PluginSettingsFieldSectionDefinition {
	const { translate } = app.i18n;

	return {
		type: 'section',
		title: 'ElevenLabs',
		description: 'Cloud voices from ElevenLabs.',
		icon: 'ri:voiceprint-line',
		collapsible: true,
		badge: (context) =>
			whenConfigured(context)
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
							'Paste an API key from your ElevenLabs profile to use ElevenLabs voices.',
						variant: 'warning',
						visible: (context) => !whenConfigured(context)
					},
					{
						key: API_KEY,
						type: 'text',
						inputType: 'password',
						name: 'ElevenLabs API key',
						placeholder: 'Paste your ElevenLabs API key',
						secret: true,
						sync: 'device'
					},
					{
						type: 'button',
						name: 'Test API key',
						variant: 'outline',
						visible: whenConfigured,
						onClick: async ({ getValue }) => {
							try {
								const voiceCount = await elevenlabs.testConnection(
									getTrimmedValue(getValue, API_KEY)
								);

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
										'Could not reach ElevenLabs. Check your API key.'
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
				visible: whenConfigured,
				fields: [
					elevenlabsVoiceSelectSettingsField({
						key: ELEVENLABS_STORE_KEYS.defaultVoice,
						name: 'ElevenLabs default voice',
						emptyLabel: 'Select a default voice'
					}),
					elevenlabsModelSelectSettingsField({
						key: ELEVENLABS_STORE_KEYS.modelId,
						name: 'ElevenLabs default model'
					}),
					{
						key: ELEVENLABS_STORE_KEYS.volume,
						type: 'slider',
						name: 'ElevenLabs volume',
						min: 0,
						max: MAX_TTS_VOLUME * 100,
						defaultValue: 100
					},
					{
						type: 'button',
						name: 'Test voice',
						variant: 'outline',
						visible: ({ getValue }) =>
							hasValue(getValue, ELEVENLABS_STORE_KEYS.defaultVoice),
						onClick: async ({ getValue }) => {
							try {
								await elevenlabs.speak(
									TEST_PHRASE,
									getTrimmedValue(getValue, ELEVENLABS_STORE_KEYS.defaultVoice),
									{
										// The voice's own model wins over the default, like live TTS.
										modelId:
											elevenlabsVoiceTuning.getModelId(
												getTrimmedValue(
													getValue,
													ELEVENLABS_STORE_KEYS.defaultVoice
												)
											) ||
											getTrimmedValue(
												getValue,
												ELEVENLABS_STORE_KEYS.modelId
											),
										// Per-voice tuning wins over the global sliders, like live TTS.
										voiceSettings: {
											...readVoiceSettings(getValue),
											...elevenlabsVoiceTuning.get(
												getTrimmedValue(
													getValue,
													ELEVENLABS_STORE_KEYS.defaultVoice
												)
											)
										},
										// The voice's own volume wins over the slider, like live TTS.
										volume: resolveTestVolume(getValue)
									}
								);
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
			},
			{
				type: 'section',
				title: 'Voice tuning',
				description: 'Fine-tune how the default voice sounds.',
				icon: 'ri:equalizer-line',
				collapsible: true,
				visible: whenConfigured,
				fields: [
					voiceSettingSlider('stability', 'Stability'),
					voiceSettingSlider('similarityBoost', 'Similarity'),
					voiceSettingSlider('style', 'Style exaggeration'),
					voiceSettingSlider('speed', 'Speed'),
					{
						key: ELEVENLABS_STORE_KEYS.speakerBoost,
						type: 'switch',
						name: 'Speaker boost',
						defaultValue: true
					}
				]
			},
			{
				type: 'section',
				title: 'Privacy',
				visible: whenConfigured,
				fields: [
					{
						key: ELEVENLABS_STORE_KEYS.privacy,
						type: 'switch',
						name: "Don't store messages and audio at ElevenLabs",
						defaultValue: true
					},
					{
						type: 'alert',
						name: 'Privacy',
						description:
							'Enterprise accounts use zero-retention mode, so ElevenLabs never stores the text or audio. Other accounts get each message removed from the ElevenLabs history right after it is generated.',
						variant: 'default',
						visible: ({ getValue }) => getValue(ELEVENLABS_STORE_KEYS.privacy) !== false
					},
					{
						type: 'alert',
						name: 'History is kept',
						description:
							'ElevenLabs stores every TTS message and its audio in your history.',
						variant: 'warning',
						visible: ({ getValue }) => getValue(ELEVENLABS_STORE_KEYS.privacy) === false
					}
				]
			},
			{
				type: 'section',
				title: 'Voice library',
				icon: 'ri:list-unordered',
				collapsible: true,
				visible: whenConfigured,
				fields: [
					{
						type: 'alert',
						name: 'Manage voices',
						description:
							'Preview voices, tune each voice and clone your own voice under TTS → ElevenLabs voices in the sidebar. Per-voice tuning overrides the voice tuning above.',
						variant: 'default'
					}
				]
			}
		]
	};
}
