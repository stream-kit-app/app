import ttsPlugin from '@stream-kit/plugin-tts';
import twitchPlugin from '@stream-kit/plugin-twitch';

import { App } from './app.svelte';
import { registerApp } from './registry';

export const app = new App();
registerApp(app);
await app.use(twitchPlugin);
await app.use(ttsPlugin);
await app.boot();
