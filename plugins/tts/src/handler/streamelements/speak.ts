import type { HandlerDefinitionProps } from '@stream-kit/core';

import { getFieldValue, resolveFieldText } from '../../get-field-value';
import { streamelements } from '../../lib/streamelements';
import { voiceSelectField } from '../../lib/streamelements/voices';
import { TTS_TEXT_VARIABLES } from '../../lib/variables';

export const createStreamElementsSpeakHandler = () => {
	return {
		id: 'tts-streamelements-speak',
		name: 'Speak Text',
		fields: [
			{
				type: 'text',
				key: 'text',
				name: 'Text',
				required: true,
				placeholder: '{message}',
				variables: TTS_TEXT_VARIABLES
			},
			voiceSelectField({ required: false })
		],
		execute: (_action, handler, context) => {
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

			void streamelements.speak(text.trim(), voiceId);
		}
	} satisfies HandlerDefinitionProps;
};
