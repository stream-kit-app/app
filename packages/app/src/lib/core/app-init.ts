import ttsPlugin from '@stream-kit/plugin-tts';
import twitchPlugin from '@stream-kit/plugin-twitch';

import { App } from './app.svelte';
import { registerApp } from './registry';

export const app = await new App().boot();

registerApp(app);

app.use(twitchPlugin);
await app.use(ttsPlugin);
