import type {
	ElevenLabsNumericVoiceSetting,
	ElevenLabsVoiceSettings
} from '../../lib/elevenlabs/types';
import type { HandlerDefinitionProps, PluginAppApi } from '@stream-kit/plugin';

import { resolveFieldText, resolveNumberField, resolveVoiceFieldText } from '../../get-field-value';
import { elevenlabs } from '../../lib/elevenlabs';
import { elevenlabsModelSelectField } from '../../lib/elevenlabs/models';
import { clampVoiceSetting } from '../../lib/elevenlabs/service';
import { elevenlabsVoiceSelectField } from '../../lib/elevenlabs/voices';
import { createSpeakErrorReporter } from '../../lib/speak-errors';
import { TTS_TEXT_VARIABLES } from '../../lib/variables';
import { SPEAK_TIMEOUT_MS } from '../../lib/player';

const VOICE_SETTING_KEYS: { key: string; setting: ElevenLabsNumericVoiceSetting }[] = [
	{ key: 'stability', setting: 'stability' },
	{ key: 'similarity', setting: 'similarityBoost' },
	{ key: 'style', setting: 'style' },
	{ key: 'speed', setting: 'speed' }
];

export const createElevenLabsSpeakHandler = (app: PluginAppApi) => {
	const reportError = createSpeakErrorReporter(app, 'ElevenLabs');

	return {
		name: 'Speak Text',
		// Synthesis plus playback (each clip is capped at ~2 minutes by the player).
		timeout: SPEAK_TIMEOUT_MS,
		fields: [
			{
				type: 'text',
				name: 'Text',
				required: true,
				placeholder: '{message}',
				variables: TTS_TEXT_VARIABLES
			},
			elevenlabsVoiceSelectField({ required: false }),
			elevenlabsModelSelectField({ required: false }),
			{
				key: 'stability',
				type: 'text',
				name: 'Stability',
				description: 'Optional, 0–1. Leave empty to use the default from the TTS settings.',
				placeholder: 'Use default',
				variables: TTS_TEXT_VARIABLES
			},
			{
				key: 'similarity',
				type: 'text',
				name: 'Similarity',
				description: 'Optional, 0–1. Leave empty to use the default from the TTS settings.',
				placeholder: 'Use default',
				variables: TTS_TEXT_VARIABLES
			},
			{
				key: 'style',
				type: 'text',
				name: 'Style exaggeration',
				description: 'Optional, 0–1. Leave empty to use the default from the TTS settings.',
				placeholder: 'Use default',
				variables: TTS_TEXT_VARIABLES
			},
			{
				key: 'speed',
				type: 'text',
				name: 'Speed',
				description:
					'Optional, 0.7–1.2. Leave empty to use the default from the TTS settings.',
				placeholder: 'Use default',
				variables: TTS_TEXT_VARIABLES
			}
		],
		execute: async (_action, handler, context, next) => {
			const text = resolveFieldText(handler.fields, 'text', context);
			const resolvedVoice = resolveVoiceFieldText(handler.fields, context);
			const resolvedModel = resolveFieldText(handler.fields, 'model', context);
			const voiceId = resolvedVoice?.trim() ? resolvedVoice.trim() : elevenlabs.defaultVoice;
			// Empty: the voice's own model applies, then the default model (resolved in speak).
			const modelId = resolvedModel?.trim() || undefined;

			if (typeof text !== 'string' || !text.trim()) {
				return;
			}

			if (!voiceId) {
				reportError.missingVoice();
				next();
				return;
			}

			const voiceSettings: Partial<ElevenLabsVoiceSettings> = {};

			for (const field of VOICE_SETTING_KEYS) {
				const value = resolveNumberField(handler.fields, field.key, context);

				if (value !== undefined) {
					voiceSettings[field.setting] = clampVoiceSetting(field.setting, value);
				}
			}

			try {
				await elevenlabs.speak(text.trim(), voiceId, { modelId, voiceSettings });
			} catch (error) {
				reportError.failed(error);
			}

			next();
		}
	} satisfies HandlerDefinitionProps;
};
