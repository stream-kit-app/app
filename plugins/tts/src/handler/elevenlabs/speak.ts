import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { resolveFieldText, resolveVoiceFieldText } from '../../get-field-value';
import { elevenlabs } from '../../lib/elevenlabs';
import { elevenlabsModelSelectField } from '../../lib/elevenlabs/models';
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
			elevenlabsVoiceSelectField({ required: false }),
			elevenlabsModelSelectField({ required: false })
		],
		execute: async (_action, handler, context, next) => {
			const text = resolveFieldText(handler.fields, 'text', context);
			const resolvedVoice = resolveVoiceFieldText(handler.fields, context);
			const resolvedModel = resolveFieldText(handler.fields, 'model', context);
			const voiceId = resolvedVoice?.trim() ? resolvedVoice.trim() : elevenlabs.defaultVoice;
			const modelId = resolvedModel?.trim() ? resolvedModel.trim() : elevenlabs.modelId;

			if (typeof text !== 'string' || !text.trim()) {
				return;
			}

			if (!voiceId) {
				return;
			}

			await elevenlabs.speak(text.trim(), voiceId, { modelId });
			next();
		}
	} satisfies HandlerDefinitionProps;
};
