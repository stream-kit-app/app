import type { HandlerDefinitionProps } from '@stream-kit/core';
import type { PluginAppApi } from '@stream-kit/app/api';

import { getFieldValue } from '../../get-field-value';
import { playAudioFile } from '../../lib/audio';

const AUDIO_FILTERS = [
	{
		name: 'Audio',
		extensions: ['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a']
	}
];

export const createPlayAudioFileHandler = (app: PluginAppApi) => {
	return {
		name: 'Play audio file',
		fields: [
			{
				type: 'select-file-or-folder',
				mode: 'file' as const,
				name: 'Audio file',
				filters: AUDIO_FILTERS,
				required: true
			}
		],
		execute: (_action, handler, _context, next) => {
			const filePath = getFieldValue(handler.fields, 'audio-file');

			if (typeof filePath !== 'string' || !filePath.trim()) {
				return;
			}

			void playAudioFile(app, filePath.trim());
			next();
		}
	} satisfies HandlerDefinitionProps;
};
