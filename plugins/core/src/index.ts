import type {

	Plugin,

	PluginAppApi,

	PluginSettingsContext,

	SettingsVisibilityContext

} from '@stream-kit/plugin';



import { createPlayAudioFileHandler } from './handler/audio/play-file';

import { createPlayAudioFolderHandler } from './handler/audio/play-folder';

import { createClearCollectionHandler } from './handler/collection/clear';

import { createCreateCollectionHandler } from './handler/collection/create';

import { createDeleteCollectionHandler } from './handler/collection/delete';

import { createDeleteCollectionKeyHandler } from './handler/collection/delete-key';

import { createGetCollectionValueHandler } from './handler/collection/get';

import { createHasCollectionKeyHandler } from './handler/collection/has-key';

import { createSetCollectionValueHandler } from './handler/collection/set';

import { createUpdateCollectionValueHandler } from './handler/collection/update';

import { createDelayHandler } from './handler/delay';

import { createLogHandler } from './handler/log';

import { createRunProgramHandler } from './handler/program/run';

import { createRunScriptHandler } from './handler/script/run';

import { createIfHandler } from './handler/utility/if';

import { createGetVariableHandler } from './handler/variable/get';

import { createSetVariableHandler } from './handler/variable/set';

import { configureAudioPlayback } from './lib/audio';

import type { CorePluginContext } from './lib/core-context';

import { ActionLogService } from './lib/logs/action-log';

import { isProcessWatcherEnabled, shouldRunProcessWatcher } from './lib/process-settings';

import type { CorePluginApi } from './lib/plugin-api';

import { ScheduleService } from './lib/schedule-service';

import { CollectionStore } from './lib/collections/collection-store';

import { registerContextVariableEnricher } from './lib/variables/context-enrichers';

import { VariableStore } from './lib/variables/variable-store';

import { createAppLifecycleTrigger } from './trigger/app-lifecycle-trigger';

import { createCollectionCreatedTrigger } from './trigger/collection-created';

import { createCollectionValueChangedTrigger } from './trigger/collection-value-changed';

import { createCronTrigger } from './trigger/cron-trigger';

import { createProcessTrigger } from './trigger/process-trigger';

import { createScheduledTrigger } from './trigger/scheduled-trigger';

import CollectionsWidget from './widgets/collections-widget.svelte';

import LogsWidget from './widgets/logs-widget.svelte';



export type {

	ActionLogAppendInput,

	ActionLogEntry,

	ActionLogLevel,

	CorePluginApi,

	CollectionChangedContext,

	CollectionCreateResult,

	CollectionCreatedContext,

	CollectionDeletedContext,

	CollectionLifetime,

	CollectionMutationResult,

	CollectionStoreEvent,

	CollectionSummary,

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

	const collections = new CollectionStore();

	const scheduleService = new ScheduleService();



	const ctx: CorePluginContext = { app, variables, logs, collections };



	const api: CorePluginApi = {

		variables: {

			resolve: variables.resolve.bind(variables),

			resolveTriggerContext: variables.resolveTriggerContext.bind(variables),

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

		collections: {

			get: collections.get.bind(collections),

			has: collections.has.bind(collections),

			getLifetime: collections.getLifetime.bind(collections),

			listCollectionNames: collections.listCollectionNames.bind(collections),

			listCollections: collections.listCollections.bind(collections),

			listEntries: collections.listEntries.bind(collections),

			collectionExists: collections.collectionExists.bind(collections),

			create: collections.create.bind(collections),

			set: collections.set.bind(collections),

			update: collections.update.bind(collections),

			deleteKey: collections.deleteKey.bind(collections),

			clear: collections.clear.bind(collections),

			delete: collections.delete.bind(collections),

			subscribe: collections.subscribe.bind(collections)

		},

		registerContextVariableEnricher

	};



	return {

		name: 'Core',

		description:

			'Core handlers and system triggers for audio playback, delays, scripts, process events, schedules, variables, collections, and logging.',

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

						name: 'Collection',

						children: [

							createCollectionCreatedTrigger(collections),

							createCollectionValueChangedTrigger(collections)

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

						name: 'Collection',

						children: [

							createCreateCollectionHandler(ctx),

							createSetCollectionValueHandler(ctx),

							createUpdateCollectionValueHandler(ctx),

							createGetCollectionValueHandler(ctx),

							createHasCollectionKeyHandler(ctx),

							createDeleteCollectionKeyHandler(ctx),

							createClearCollectionHandler(ctx),

							createDeleteCollectionHandler(ctx)

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

		onEnable: async (context: PluginSettingsContext) => {

			const { store } = context;

			variables.bindStore(store);

			collections.bindStore(store);

			configureAudioPlayback(app);

			await variables.load();

			await collections.load();

			await logs.load(app.fs);

			await syncSchedulesFromContext(context);

		},

		onReady: syncWatcherFromContext,

		onSave: syncWatcherFromContext,

		onDisable: async ({ app: pluginApp }: PluginSettingsContext) => {

			scheduleService.stop();

			await pluginApp.process.sync(false);

		},

		customViews: {

			'logs-widget': LogsWidget,

			'collections-widget': CollectionsWidget

		},

		widgets: [

			{

				key: 'collections',

				title: 'Collections',

				description: 'Store and edit key-value data used by action handlers.',

				icon: 'ri:database-2-line',

				columns: 4,

				view: 'collections-widget'

			},

			{

				key: 'logs',

				title: 'Log entries',

				icon: 'ri:file-list-3-line',

				columns: 1,

				view: 'logs-widget'

			}

		]

	};

};



export default plugin as Plugin;

