import type { HandlerDefinitionProps } from '@stream-kit/plugin';
import type { PluginAppApi } from '@stream-kit/plugin';

import { getFieldValue } from '../../get-field-value';
import { playAudioFilesFromFolder } from '../../lib/audio';
import { resolveVolume, volumeField } from './volume-field';

export const createPlayAudioFolderHandler = (app: PluginAppApi) => {
	return {
		name: 'Play all audio from folder',
		fields: [
			{
				type: 'select-file-or-folder',
				mode: 'folder' as const,
				name: 'Folder',
				required: true
			},
			volumeField
		],
		execute: async (_action, handler, _context, next) => {
			const folderPath = getFieldValue(handler.fields, 'folder');

			if (typeof folderPath !== 'string' || !folderPath.trim()) {
				return;
			}

			await playAudioFilesFromFolder(app, folderPath.trim(), resolveVolume(handler.fields));
			next();
		}
	} satisfies HandlerDefinitionProps;
};
