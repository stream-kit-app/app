import botPlugin, {
	BotSettings,
	Commands,
	ModerationRules,
	Timers
} from '@stream-kit/plugin-bot';
import corePlugin from '@stream-kit/plugin-handlers';
import obsPlugin from '@stream-kit/plugin-obs';
import ttsPlugin from '@stream-kit/plugin-tts';
import twitchPlugin from '@stream-kit/plugin-twitch';
import websocketPlugin from '@stream-kit/plugin-websocket';
import youtubePlugin from '@stream-kit/plugin-youtube';

import { app } from './app-init';
import { initPluginDevWatcher, syncPluginDevWatchers } from './plugins/plugin-dev-watcher';
import { discoverAndLoadInstalledPlugins } from './plugins/plugin-loader';

let bootPromise: Promise<void> | null = null;

const commands = new Commands();
const timers = new Timers();
const moderation = new ModerationRules();
const botSettings = new BotSettings();

export function bootApp(): Promise<void> {
	if (!bootPromise) {
		bootPromise = (async () => {
			await app.use(corePlugin, { key: 'core', source: 'builtin' });
			await app.use(twitchPlugin, { key: 'twitch', source: 'builtin' });
			await app.use(youtubePlugin, { key: 'youtube', source: 'builtin' });
			await app.use(obsPlugin, { key: 'obs', source: 'builtin' });
			await app.use(ttsPlugin, { key: 'tts', source: 'builtin' });
			await app.use(botPlugin(commands, timers, moderation, botSettings), {
				key: 'bot',
				source: 'builtin'
			});
			await app.use(websocketPlugin, { key: 'websocket', source: 'builtin' });

			await discoverAndLoadInstalledPlugins(app);

			await app.plugins.load(app);
			await app.boot();
			await app.actions.load();
			await app.plugins.ready(app);
			await app.settings.load();

			await initPluginDevWatcher();
			await syncPluginDevWatchers(app);
		})();
	}

	return bootPromise;
}
