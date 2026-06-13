import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { getFieldValue, resolveFieldText } from '../../get-field-value';
import { streamelements } from '../../lib/streamelements';
import { voiceSelectField } from '../../lib/streamelements/voices';
import { TTS_TEXT_VARIABLES } from '../../lib/variables';

export const createStreamElementsSpeakHandler = () => {
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

			voiceSelectField({ required: false })
		],

		execute: async (_action, handler, context, next) => {
			const text = resolveFieldText(handler.fields, 'text', context);
			const voiceField = getFieldValue(handler.fields, 'voice');

			const voiceId =
				typeof voiceField === 'string' && voiceField.trim()
					? voiceField.trim()
					: streamelements.defaultVoice;

			if (typeof text !== 'string' || !text.trim()) {
				return;
			}

			if (!voiceId) {
				return;
			}

			await streamelements.speak(text.trim(), voiceId);

			next();
		}
	} satisfies HandlerDefinitionProps;
};
