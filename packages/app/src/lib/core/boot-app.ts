import corePlugin from '@stream-kit/plugin-core';
import commandsPlugin from '@stream-kit/plugin-commands';
import ttsPlugin from '@stream-kit/plugin-tts';
import twitchPlugin from '@stream-kit/plugin-twitch';
import youtubePlugin from '@stream-kit/plugin-youtube';

import {
	initPluginDevWatcher,
	syncPluginDevWatchers
} from './plugins/plugin-dev-watcher';
import { discoverAndLoadInstalledPlugins } from './plugins/plugin-loader';
import { settings } from './settings';
import { app } from './app-init';

let bootPromise: Promise<void> | null = null;

export function bootApp(): Promise<void> {
	if (!bootPromise) {
		bootPromise = (async () => {
			await app.use(corePlugin, { key: 'core', source: 'builtin' });
			await app.use(twitchPlugin, { key: 'twitch', source: 'builtin' });
			await app.use(youtubePlugin, { key: 'youtube', source: 'builtin' });
			await app.use(ttsPlugin, { key: 'tts', source: 'builtin' });
			await app.use(commandsPlugin, { key: 'commands', source: 'builtin' });
			await discoverAndLoadInstalledPlugins(app);
			await app.plugins.load(app);
			await app.boot();
			await app.actions.load();
			await app.commands.load();
			await app.commands.activate(app);
			await settings.load();
			await initPluginDevWatcher();
			await syncPluginDevWatchers(app);
		})();
	}

	return bootPromise;
}
