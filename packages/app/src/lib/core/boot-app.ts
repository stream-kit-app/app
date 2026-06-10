import corePlugin from '@stream-kit/plugin-handlers';
import { Commands, commandsPlugin } from '@stream-kit/plugin-commands';
import obsPlugin from '@stream-kit/plugin-obs';
import ttsPlugin from '@stream-kit/plugin-tts';
import twitchPlugin from '@stream-kit/plugin-twitch';
import youtubePlugin from '@stream-kit/plugin-youtube';

import {
	initPluginDevWatcher,
	syncPluginDevWatchers
} from './plugins/plugin-dev-watcher';
import { discoverAndLoadInstalledPlugins } from './plugins/plugin-loader';
import { app } from './app-init';

let bootPromise: Promise<void> | null = null;

const commands = new Commands();

export function bootApp(): Promise<void> {
	if (!bootPromise) {
		bootPromise = (async () => {
			await app.use(corePlugin, { key: 'core', source: 'builtin' });
			await app.use(twitchPlugin, { key: 'twitch', source: 'builtin' });
			await app.use(youtubePlugin, { key: 'youtube', source: 'builtin' });
			await app.use(obsPlugin, { key: 'obs', source: 'builtin' });
			await app.use(ttsPlugin, { key: 'tts', source: 'builtin' });
			await app.use(commandsPlugin(commands), { key: 'commands', source: 'builtin' });
			await discoverAndLoadInstalledPlugins(app);
			await app.plugins.load(app);
			await app.boot();
			await app.actions.load();
			await app.settings.load();
			await initPluginDevWatcher();
			await syncPluginDevWatchers(app);
		})();
	}

	return bootPromise;
}
