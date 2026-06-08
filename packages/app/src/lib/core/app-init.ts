import ttsPlugin from '@stream-kit/plugin-tts';
import twitchPlugin from '@stream-kit/plugin-twitch';

import { App } from './app.svelte';
import { discoverAndLoadInstalledPlugins } from './plugins/plugin-loader';
import { registerApp } from './registry';

export const app = new App();
registerApp(app);
await app.use(twitchPlugin, { source: 'builtin' });
await app.use(ttsPlugin, { source: 'builtin' });
await discoverAndLoadInstalledPlugins(app);
await app.plugins.load(app);
await app.boot();
