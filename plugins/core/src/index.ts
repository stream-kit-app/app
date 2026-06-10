import type { Plugin } from '@stream-kit/app/api';

import { createPlayAudioFileHandler } from './handler/audio/play-file';
import { createPlayAudioFolderHandler } from './handler/audio/play-folder';
import { createDelayHandler } from './handler/delay';
import { createRunScriptHandler } from './handler/script/run';
import { configureAudioPlayback } from './lib/audio';

const plugin: Plugin = (app) => {
	return {
		name: 'Core',
		description: 'Core handlers for audio playback, delays, and custom scripts.',
		icon: 'ri:settings-3-line',
		isConfigured: () => true,
		onBoot: () => {
			configureAudioPlayback(app);
		},
		handlers: [
			{
				name: 'Core',
				children: [
					{
						name: 'Audio',
						children: [
							createPlayAudioFileHandler(app),
							createPlayAudioFolderHandler(app)
						]
					},
					{
						name: 'Script',
						children: [createRunScriptHandler(app)]
					},
					createDelayHandler()
				]
			}
		]
	};
};

export default plugin;
