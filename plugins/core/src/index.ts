import type { Plugin, PluginSettingsContext } from '@stream-kit/app/api';

import { createPlayAudioFileHandler } from './handler/audio/play-file';
import { createPlayAudioFolderHandler } from './handler/audio/play-folder';
import { createDelayHandler } from './handler/delay';
import { createLogHandler } from './handler/log';
import { createRunProgramHandler } from './handler/program/run';
import { createRunScriptHandler } from './handler/script/run';
import { createGetVariableHandler } from './handler/variable/get';
import { createSetVariableHandler } from './handler/variable/set';
import { configureAudioPlayback } from './lib/audio';
import type { CorePluginContext } from './lib/core-context';
import { ActionLogService } from './lib/logs/action-log';
import { isProcessWatcherEnabled, shouldRunProcessWatcher } from './lib/process-settings';
import type { CorePluginApi } from './lib/plugin-api';
import { ScheduleService } from './lib/schedule-service';
import { VariableStore } from './lib/variables/variable-store';
import { createCronTrigger } from './trigger/cron-trigger';
import { createProcessTrigger } from './trigger/process-trigger';
import { createScheduledTrigger } from './trigger/scheduled-trigger';

export type {
	ActionLogAppendInput,
	ActionLogEntry,
	ActionLogLevel,
	CorePluginApi,
	VariableScope
} from './lib/plugin-api';

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

async function syncSchedulesFromContext(context: PluginSettingsContext): Promise<void> {
	await syncWatcherFromContext(context);
	context.app.actions.reactivateAll();
}

const plugin: Plugin = (app) => {
	const variables = new VariableStore();
	const logs = new ActionLogService();
	const scheduleService = new ScheduleService();

	const ctx: CorePluginContext = { app, variables, logs };

	const api: CorePluginApi = {
		variables: {
			resolve: variables.resolve.bind(variables),
			get: variables.get.bind(variables),
			set: variables.set.bind(variables),
			listKeys: variables.listKeys.bind(variables)
		},
		logs: {
			append: (input) => logs.append(app.fs, input),
			getEntries: logs.getEntries.bind(logs),
			clear: () => logs.clear(app.fs),
			subscribe: logs.subscribe.bind(logs),
			get revision() {
				return logs.revision;
			}
		}
	};

	return {
		name: 'Core',
		description:
			'Core handlers and system triggers for audio playback, delays, scripts, process events, schedules, variables, and logging.',
		icon: 'ri:settings-3-line',
		isConfigured: () => true,
		api,
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
				name: 'Core',
				children: [
					createCronTrigger(app, scheduleService),
					createScheduledTrigger(app, scheduleService)
				]
			},
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
						children: [createRunProgramHandler(ctx)]
					},
					{
						name: 'Variables',
						children: [
							createSetVariableHandler(ctx),
							createGetVariableHandler(ctx)
						]
					},
					{
						name: 'Utility',
						children: [createLogHandler(ctx)]
					},
					createDelayHandler()
				]
			}
		],
		onBoot: async ({ store }) => {
			variables.bindStore(store);
			configureAudioPlayback(app);
			await variables.load();
			await logs.load(app.fs);
		},
		onEnable: syncSchedulesFromContext,
		onReady: syncWatcherFromContext,
		onSave: syncWatcherFromContext,
		onDisable: async ({ app: pluginApp }) => {
			scheduleService.stop();
			await pluginApp.process.sync(false);
		}
	};
};

export default plugin;
