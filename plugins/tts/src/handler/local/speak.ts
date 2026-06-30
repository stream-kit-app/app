import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { resolveFieldText, resolveVoiceFieldText } from '../../get-field-value';
import { local } from '../../lib/local';
import { localVoiceSelectField } from '../../lib/local/voices';
import { TTS_TEXT_VARIABLES } from '../../lib/variables';

export const createLocalSpeakHandler = () => {
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
			localVoiceSelectField({ required: false })
		],
		execute: async (_action, handler, context, next) => {
			const text = resolveFieldText(handler.fields, 'text', context);
			const resolvedVoice = resolveVoiceFieldText(handler.fields, context);
			const voiceId = resolvedVoice?.trim() ? resolvedVoice.trim() : local.defaultVoice;

			if (typeof text !== 'string' || !text.trim()) {
				return;
			}

			if (!voiceId) {
				return;
			}

			await local.speak(text.trim(), voiceId);
			next();
		}
	} satisfies HandlerDefinitionProps;
};
