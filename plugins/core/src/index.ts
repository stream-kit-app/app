import type { Plugin, PluginSettingsContext } from '@stream-kit/app/api';

import { createPlayAudioFileHandler } from './handler/audio/play-file';
import { createPlayAudioFolderHandler } from './handler/audio/play-folder';
import { createDelayHandler } from './handler/delay';
import { createRunProgramHandler } from './handler/program/run';
import { createRunScriptHandler } from './handler/script/run';
import { configureAudioPlayback } from './lib/audio';
import { isProcessWatcherEnabled, shouldRunProcessWatcher } from './lib/process-settings';
import { createProcessTrigger } from './trigger/process-trigger';

async function syncWatcherFromContext(context: PluginSettingsContext): Promise<void> {
	const { app } = context;

	try {
		await app.process.sync(shouldRunProcessWatcher(context));
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		console.error('Process Watcher failed to sync', error);
		app.toast.create({
			title: 'Process Watcher failed',
			description: message,
			variant: 'error'
		});
	}
}

const plugin: Plugin = (app) => {
	return {
		name: 'Core',
		description:
			'Core handlers and system triggers for audio playback, delays, scripts, and process events.',
		icon: 'ri:settings-3-line',
		isConfigured: () => true,
		settings: [
			{
				type: 'switch',
				name: 'Process Watcher',
				defaultValue: false
			},
			{
				type: 'alert',
				name: 'Background polling off',
				description:
					'Process triggers start the watcher automatically. Enable this to keep polling active in the background.',
				variant: 'warning',
				visible: ({ getValue }) => !isProcessWatcherEnabled(getValue)
			}
		],
		triggers: [
			{
				name: 'Processes',
				children: [
					createProcessTrigger(app, 'started'),
					createProcessTrigger(app, 'stopped')
				]
			}
		],
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
					{
						name: 'Program',
						children: [createRunProgramHandler(app)]
					},
					createDelayHandler()
				]
			}
		],
		onBoot: () => {
			configureAudioPlayback(app);
		},
		onEnable: syncWatcherFromContext,
		onReady: syncWatcherFromContext,
		onSave: syncWatcherFromContext,
		onDisable: async ({ app: pluginApp }) => {
			await pluginApp.process.sync(false);
		}
	};
};

export default plugin;
