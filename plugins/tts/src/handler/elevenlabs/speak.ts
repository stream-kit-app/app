import type { HandlerDefinitionProps } from '@stream-kit/core';

import { getFieldValue, resolveFieldText } from '../../get-field-value';
import { elevenlabs } from '../../lib/elevenlabs';
import { elevenlabsVoiceSelectField } from '../../lib/elevenlabs/voices';
import { TTS_TEXT_VARIABLES } from '../../lib/variables';

export const createElevenLabsSpeakHandler = () => {
	return {
		name: 'Speak Text',
		fields: [
			{
				type: 'text',
				name: 'Text',
				required: true,
				placeholder: '{message}',
				variables: TTS_TEXT_VARIABLES
			},
			elevenlabsVoiceSelectField({ required: false })
		],
		execute: async (_action, handler, context, next) => {
			const text = resolveFieldText(handler.fields, 'text', context);
			const voiceField = getFieldValue(handler.fields, 'voice');
			const voiceId =
				typeof voiceField === 'string' && voiceField.trim()
					? voiceField.trim()
					: elevenlabs.defaultVoice;

			if (typeof text !== 'string' || !text.trim()) {
				return;
			}

			if (!voiceId) {
				return;
			}

			await elevenlabs.speak(text.trim(), voiceId);
			next();
		}
	} satisfies HandlerDefinitionProps;
};
