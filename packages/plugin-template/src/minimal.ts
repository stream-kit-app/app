/**
 * Minimal Stream Kit plugin reference.
 *
 * Copy this file to `src/index.ts` when starting a new plugin, or compare it with
 * the full page-block showcase in `src/index.ts`.
 *
 * Requires `manifest.json` with a matching `key` (for example `hello-world`).
 */
import type { Plugin } from '@stream-kit/plugin';
import { BaseDirectory } from '@stream-kit/plugin';

import { createGreetHandler } from './handler/greet';

type PluginSettings = {
	greeting: string;
};

const SETTINGS_KEY = 'settings';
const LOG_FILE = 'logs/greeting.log';

const plugin: Plugin = (app) => {
	let settings: PluginSettings = { greeting: 'Hello from Stream Kit!' };

	return {
		name: 'Hello World',
		description: 'Minimal plugin example with store, handler, and filesystem.',
		icon: 'ri:hand-heart-line',
		handlers: [createGreetHandler()],
		onLoad: async ({ store }) => {
			const saved = await store.get<PluginSettings>(SETTINGS_KEY);
			if (saved) {
				settings = saved;
			}

			await app.fs.mkdir('logs', { baseDir: BaseDirectory.AppData, recursive: true });
		},
		onSave: async ({ store }) => {
			await store.set(SETTINGS_KEY, settings);
		},
		onEnable: async () => {
			await app.fs.writeTextFile(LOG_FILE, `${new Date().toISOString()} ${settings.greeting}\n`, {
				baseDir: BaseDirectory.AppData,
				append: true
			});

			app.toast.create({
				title: 'Hello World',
				description: settings.greeting,
				variant: 'success'
			});
		}
	};
};

export default plugin;
