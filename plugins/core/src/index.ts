import type {
	Plugin,
	PluginAppApi,
	PluginSettingsContext,
	SettingsVisibilityContext
} from '@stream-kit/app/api';

import { createPlayAudioFileHandler } from './handler/audio/play-file';
import { createPlayAudioFolderHandler } from './handler/audio/play-folder';
import { createDelayHandler } from './handler/delay';
import { createLogHandler } from './handler/log';
import { createIfHandler } from './handler/utility/if';
import { createRunProgramHandler } from './handler/program/run';
import { createRunScriptHandler } from './handler/script/run';
import { createClearMapHandler } from './handler/map/clear';
import { createCreateMapHandler } from './handler/map/create';
import { createDeleteMapHandler } from './handler/map/delete';
import { createDeleteMapKeyHandler } from './handler/map/delete-key';
import { createGetMapValueHandler } from './handler/map/get';
import { createHasMapKeyHandler } from './handler/map/has-key';
import { createSetMapValueHandler } from './handler/map/set';
import { createUpdateMapValueHandler } from './handler/map/update';
import { createGetVariableHandler } from './handler/variable/get';
import { createSetVariableHandler } from './handler/variable/set';
import { configureAudioPlayback } from './lib/audio';
import type { CorePluginContext } from './lib/core-context';
import { ActionLogService } from './lib/logs/action-log';
import { isProcessWatcherEnabled, shouldRunProcessWatcher } from './lib/process-settings';
import type { CorePluginApi } from './lib/plugin-api';
import { ScheduleService } from './lib/schedule-service';
import { MapStore } from './lib/maps/map-store';
import { VariableStore } from './lib/variables/variable-store';
import { createAppLifecycleTrigger } from './trigger/app-lifecycle-trigger';
import { createCronTrigger } from './trigger/cron-trigger';
import { createMapCreatedTrigger } from './trigger/map-created';
import { createMapValueChangedTrigger } from './trigger/map-value-changed';
import { createProcessTrigger } from './trigger/process-trigger';
import { createScheduledTrigger } from './trigger/scheduled-trigger';

export type {
	ActionLogAppendInput,
	ActionLogEntry,
	ActionLogLevel,
	CorePluginApi,
	MapLifetime,
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

const plugin = (app: PluginAppApi) => {
	const variables = new VariableStore();
	const logs = new ActionLogService();
	const maps = new MapStore();
	const scheduleService = new ScheduleService();

	const ctx: CorePluginContext = { app, variables, logs, maps };

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
		},
		maps: {
			get: maps.get.bind(maps),
			has: maps.has.bind(maps),
			getLifetime: maps.getLifetime.bind(maps),
			listMapNames: maps.listMapNames.bind(maps),
			listEntries: maps.listEntries.bind(maps)
		}
	};

	return {
		name: 'Core',
		description:
			'Core handlers and system triggers for audio playback, delays, scripts, process events, schedules, variables, maps, and logging.',
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
				visible: ({ getValue }: SettingsVisibilityContext) => !isProcessWatcherEnabled(getValue)
			}
		],
		triggers: [
			{
				name: 'Core',
				children: [
					createCronTrigger(app, scheduleService),
					createScheduledTrigger(app, scheduleService),
					{
						name: 'Map',
						children: [
							createMapCreatedTrigger(maps),
							createMapValueChangedTrigger(maps)
						]
					}
				]
			},
			{
				name: 'Processes',
				children: [
					createProcessTrigger(app, 'started'),
					createProcessTrigger(app, 'stopped')
				]
			},
			{
				name: 'App',
				children: [
					createAppLifecycleTrigger(app, 'started'),
					createAppLifecycleTrigger(app, 'exit')
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
						name: 'Map',
						children: [
							createCreateMapHandler(ctx),
							createSetMapValueHandler(ctx),
							createUpdateMapValueHandler(ctx),
							createGetMapValueHandler(ctx),
							createHasMapKeyHandler(ctx),
							createDeleteMapKeyHandler(ctx),
							createClearMapHandler(ctx),
							createDeleteMapHandler(ctx)
						]
					},
					{
						name: 'Utility',
						children: [createIfHandler(ctx), createLogHandler(ctx)]
					},
					createDelayHandler()
				]
			}
		],
		onBoot: async ({ store }: PluginSettingsContext) => {
			variables.bindStore(store);
			maps.bindStore(store);
			configureAudioPlayback(app);
			await variables.load();
			await maps.load();
			await logs.load(app.fs);
		},
		onEnable: syncSchedulesFromContext,
		onReady: syncWatcherFromContext,
		onSave: syncWatcherFromContext,
		onDisable: async ({ app: pluginApp }: PluginSettingsContext) => {
			scheduleService.stop();
			await pluginApp.process.sync(false);
		}
	};
};

export default plugin as Plugin;
