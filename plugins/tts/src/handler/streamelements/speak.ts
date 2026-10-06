import type { HandlerDefinitionProps, PluginAppApi } from '@stream-kit/plugin';

import { resolveFieldText, resolveVoiceFieldText } from '../../get-field-value';
import { createSpeakErrorReporter } from '../../lib/speak-errors';
import { streamelements } from '../../lib/streamelements';
import { voiceSelectField } from '../../lib/streamelements/voices';
import { TTS_TEXT_VARIABLES } from '../../lib/variables';
import { SPEAK_TIMEOUT_MS } from '../../lib/player';

export const createStreamElementsSpeakHandler = (app: PluginAppApi) => {
	const reportError = createSpeakErrorReporter(app, 'StreamElements');

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

			voiceSelectField({ required: false })
		],

		execute: async (_action, handler, context, next) => {
			const text = resolveFieldText(handler.fields, 'text', context);
			const resolvedVoice = resolveVoiceFieldText(handler.fields, context);
			const voiceId = resolvedVoice?.trim()
				? resolvedVoice.trim()
				: streamelements.defaultVoice;

			if (typeof text !== 'string' || !text.trim()) {
				return;
			}

			if (!voiceId) {
				reportError.missingVoice();
				next();
				return;
			}

			try {
				await streamelements.speak(text.trim(), voiceId);
			} catch (error) {
				reportError.failed(error);
			}

			next();
		}
	} satisfies HandlerDefinitionProps;
};
