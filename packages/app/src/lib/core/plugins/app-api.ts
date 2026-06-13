import type { HandlerDefinitionProps } from '../action/handler';
import type { HandlerTriggerContext } from '../action/handler-context';
import type { TriggerDefinitionProps } from '../action/trigger';
import type { App } from '../app.svelte';
import type { CommandRecord } from '$lib/types/command-types';
import { createFilesystemApi } from '../filesystem/create-api';
import { getSettingsFieldValue } from '../settings/settings-field';
import { registerPluginMigrations, type PluginMigration } from '$db/plugin-migrations';

import type {
	CommandRuntimeFactory,
	PluginAppApi
} from './plugin-app-api.types';

export type { CommandRuntimeFactory, PluginAppApi } from './plugin-app-api.types';

export type BotPluginApi = {
	commands: {
		registerRuntime: (factory: CommandRuntimeFactory) => void;
		getSnapshot: () => CommandRecord[];
		runById: (id: number, context: HandlerTriggerContext) => boolean;
		findByTrigger: (
			trigger: string
		) => { id: number; toRecord: () => Record<string, unknown> } | undefined;
	};
};

/** @deprecated Use BotPluginApi */
export type CommandsPluginApi = BotPluginApi;

export type PluginDefinitionCollections = {
	triggers?: TriggerDefinitionProps[];
	handlers?: HandlerDefinitionProps[];
};

function getCommandsApi(app: App) {
	return app.plugins.tryGet<BotPluginApi>('bot')?.commands;
}

export function createPluginAppApi(app: App): PluginAppApi {
	return {
		plugins: {
			get: app.plugins.get.bind(app.plugins),
			tryGet: app.plugins.tryGet.bind(app.plugins),
			getSettingValue: (pluginKey, settingKey) => {
				const plugin = app.plugins.find(pluginKey);

				if (!plugin) {
					return undefined;
				}

				return getSettingsFieldValue(plugin.fields, settingKey);
			}
		},
		toast: {
			create: app.toast.create.bind(app.toast),
			dismiss: app.toast.dismiss.bind(app.toast)
		},
		confirm: {
			ask: app.confirm.ask.bind(app.confirm)
		},
		modal: {
			create: app.createModal.bind(app)
		},
		menu: {
			add: app.menu.addPlugin.bind(app.menu),
			remove: app.menu.remove.bind(app.menu)
		},
		fs: createFilesystemApi(app.fs),
		audio: {
			play: app.audio.play.bind(app.audio)
		},
		localTts: {
			listVoices: app.localTts.listVoices.bind(app.localTts),
			getRuntimeInfo: app.localTts.getRuntimeInfo.bind(app.localTts),
			downloadRuntime: app.localTts.downloadRuntime.bind(app.localTts),
			downloadVoice: app.localTts.downloadVoice.bind(app.localTts),
			deleteVoice: app.localTts.deleteVoice.bind(app.localTts),
			synthesize: app.localTts.synthesize.bind(app.localTts)
		},
		lifecycle: {
			get started() {
				return app.lifecycle.started;
			},
			onStarted: app.lifecycle.onStarted.bind(app.lifecycle),
			onExit: app.lifecycle.onExit.bind(app.lifecycle),
			getContext: app.lifecycle.getContext.bind(app.lifecycle)
		},
		process: {
			get running() {
				return app.process.running;
			},
			sync: app.process.sync.bind(app.process),
			onStarted: app.process.onStarted.bind(app.process),
			onStopped: app.process.onStopped.bind(app.process),
			run: app.process.run.bind(app.process)
		},
		db: {
			registerMigrations: (pluginKey: string, migrations: PluginMigration[]) => {
				registerPluginMigrations(pluginKey, migrations);
			}
		},
		actions: {
			reactivateAll: () => {
				for (const action of app.actions.items) {
					if (!action.enabled) {
						continue;
					}

					app.actions.deactivate(action);
					app.actions.activate(action);
				}
			},
			hasEnabledProcessTrigger: () => app.actions.hasEnabledProcessTrigger(),
			runById: (id: number, context: HandlerTriggerContext) => app.actions.runById(id, context)
		},
		commands: {
			registerRuntime: (factory: CommandRuntimeFactory) => {
				getCommandsApi(app)?.registerRuntime(factory);
			},
			getSnapshot: () => getCommandsApi(app)?.getSnapshot() ?? [],
			runById: (id: number, context: HandlerTriggerContext) =>
				getCommandsApi(app)?.runById(id, context) ?? false,
			findByTrigger: (trigger: string) => {
				const command = getCommandsApi(app)?.findByTrigger(trigger);

				if (!command || command.id == null) {
					return undefined;
				}

				return command.toRecord();
			}
		},
		oauth: {
			start: app.oauth.start.bind(app.oauth),
			onUrl: app.oauth.onUrl.bind(app.oauth),
			onInvalidUrl: app.oauth.onInvalidUrl.bind(app.oauth)
		},
		opener: {
			openUrl: app.opener.openUrl.bind(app.opener)
		}
	} satisfies PluginAppApi;
}
