import ttsPlugin from '@stream-kit/plugin-tts';
import twitchPlugin from '@stream-kit/plugin-twitch';
import youtubePlugin from '@stream-kit/plugin-youtube';

import { App } from './app.svelte';
import { discoverAndLoadInstalledPlugins } from './plugins/plugin-loader';
import { registerApp } from './registry';

export const app = new App();
registerApp(app);
await app.use(twitchPlugin, { key: 'twitch', source: 'builtin' });
await app.use(youtubePlugin, { key: 'youtube', source: 'builtin' });
await app.use(ttsPlugin, { key: 'tts', source: 'builtin' });
await discoverAndLoadInstalledPlugins(app);
await app.plugins.load(app);
await app.boot();
