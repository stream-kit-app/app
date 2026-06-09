import type { HandlerDefinitionProps } from '@stream-kit/core';
import type { PluginAppApi } from '@stream-kit/app/api';

import { getFieldValue } from '../../get-field-value';
import { playAudioFilesFromFolder } from '../../lib/audio';

export const createPlayAudioFolderHandler = (app: PluginAppApi) => {
	return {
		name: 'Play all audio from folder',
		fields: [
			{
				type: 'select-file-or-folder',
				mode: 'folder' as const,
				name: 'Folder',
				required: true
			}
		],
		execute: (_action, handler, _context) => {
			const folderPath = getFieldValue(handler.fields, 'folder');

			if (typeof folderPath !== 'string' || !folderPath.trim()) {
				return;
			}

			void playAudioFilesFromFolder(app, folderPath.trim());
		}
	} satisfies HandlerDefinitionProps;
};
