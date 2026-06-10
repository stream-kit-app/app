import type { HandlerDefinitionProps } from '../action/handler';
import type { HandlerTriggerContext } from '../action/handler-context';
import type { TriggerDefinitionProps } from '../action/trigger';
import type { App } from '../app.svelte';
import type { CommandRecord } from '$lib/types/command-types';
import { createFilesystemApi } from '../filesystem/create-api';
import { registerPluginMigrations, type PluginMigration } from '$db/plugin-migrations';

export type CommandRuntimeFactory = (app: PluginAppApi) => () => void;

export type CommandsPluginApi = {
	commands: {
		registerRuntime: (factory: CommandRuntimeFactory) => void;
		getSnapshot: () => CommandRecord[];
		runById: (id: number, context: HandlerTriggerContext) => boolean;
		findByTrigger: (
			trigger: string
		) => { id: number; toRecord: () => Record<string, unknown> } | undefined;
	};
};

export type PluginDefinitionCollections = {
	triggers?: TriggerDefinitionProps[];
	handlers?: HandlerDefinitionProps[];
};

function getCommandsApi(app: App) {
	return app.plugins.tryGet<CommandsPluginApi>('commands')?.commands;
}

export function createPluginAppApi(app: App) {
	return {
		plugins: {
			get: app.plugins.get.bind(app.plugins),
			tryGet: app.plugins.tryGet.bind(app.plugins)
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
	};
}

export type PluginAppApi = ReturnType<typeof createPluginAppApi>;
