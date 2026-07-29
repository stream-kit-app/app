import type { HandlerDefinitionProps } from '../action/handler';
import type { HandlerTriggerContext } from '../action/handler-context';
import type { TriggerDefinitionProps } from '../action/trigger';
import type { App } from '../app.svelte';
import type { CommandRecord, NewCommandRecord } from '$lib/types/command-types';
import type { NewActionRecord } from '../action/stored-action';
import { createFilesystemApi } from '../filesystem/create-api';
import { isTcpPortReachable } from '../network/tcp-port';
import { getVideoFileDurationMs } from '../media/file-duration';
import { withResourceLock } from '../resource-lock';
import { getSettingsFieldValue } from '../settings/settings-field';
import { db } from '$db/index';
import { registerPluginMigrations, type PluginMigration } from '$db/plugin-migrations';
import { getI18n, translate, type TranslationKey } from '$lib/i18n';

import type {
	CommandRuntimeFactory,
	PluginAppApi,
	PluginDbClient
} from './plugin-app-api.types';

export type { CommandRuntimeFactory, PluginAppApi } from './plugin-app-api.types';

export type BotPluginApi = {
	commands: {
		registerRuntime: (factory: CommandRuntimeFactory) => void;
		getSnapshot: () => CommandRecord[];
		runById: (id: string, context: HandlerTriggerContext) => boolean;
		findByTrigger: (trigger: string) => CommandRecord | undefined;
		create: (
			input: NewCommandRecord,
			options?: { ownerPluginKey?: string }
		) => Promise<CommandRecord>;
		update: (
			id: string,
			input: Omit<NewCommandRecord, 'id'>,
			options?: { ownerPluginKey?: string }
		) => Promise<CommandRecord>;
		delete: (id: string) => Promise<boolean>;
		deleteByOwner: (ownerPluginKey: string) => Promise<number>;
	};
};

/** @deprecated Use BotPluginApi */
export type CommandsPluginApi = BotPluginApi;

export type PluginDefinitionCollections = {
	triggers?: TriggerDefinitionProps[];
	handlers?: HandlerDefinitionProps[];
};

export type PluginAppScope = {
	pluginKey?: string;
};

type BotCommandsService = {
	registerRuntime: (factory: CommandRuntimeFactory) => void;
	getSnapshot: () => CommandRecord[];
	runById: (id: string, context: HandlerTriggerContext) => boolean;
	findByTrigger: (trigger: string) => { toRecord: () => CommandRecord } | undefined;
	createFromRecord: (
		input: NewCommandRecord,
		options?: { ownerPluginKey?: string }
	) => Promise<CommandRecord>;
	updateFromRecord: (
		id: string,
		input: Omit<NewCommandRecord, 'id'>,
		options?: { ownerPluginKey?: string }
	) => Promise<CommandRecord>;
	deleteById: (id: string) => Promise<boolean>;
	deleteByOwner: (ownerPluginKey: string) => Promise<number>;
};

function getCommandsApi(app: App): BotCommandsService | undefined {
	return app.plugins.tryGet<{ commands?: BotCommandsService }>('bot')?.commands;
}

function requireCommandsApi(app: App): BotCommandsService {
	const commands = getCommandsApi(app);

	if (!commands) {
		throw new Error('Bot plugin is not loaded');
	}

	return commands;
}

function resolveOwnerPluginKey(
	scope: PluginAppScope | undefined,
	options?: { ownerPluginKey?: string }
): string | undefined {
	return options?.ownerPluginKey ?? scope?.pluginKey;
}

function createCommandsApi(app: App, scope?: PluginAppScope) {
	return {
		registerRuntime: (factory: CommandRuntimeFactory) => {
			getCommandsApi(app)?.registerRuntime(factory);
		},
		getSnapshot: () => getCommandsApi(app)?.getSnapshot() ?? [],
		runById: (id: string, context: HandlerTriggerContext) =>
			getCommandsApi(app)?.runById(id, context) ?? false,
		findByTrigger: (trigger: string) => {
			const command = getCommandsApi(app)?.findByTrigger(trigger);

			return command?.toRecord();
		},
		create: (input: NewCommandRecord, options?: { ownerPluginKey?: string }) =>
			requireCommandsApi(app).createFromRecord(input, {
				ownerPluginKey: resolveOwnerPluginKey(scope, options)
			}),
		update: (
			id: string,
			input: Omit<NewCommandRecord, 'id'>,
			options?: { ownerPluginKey?: string }
		) =>
			requireCommandsApi(app).updateFromRecord(id, input, {
				ownerPluginKey: resolveOwnerPluginKey(scope, options)
			}),
		delete: (id: string) => requireCommandsApi(app).deleteById(id),
		deleteByOwner: (ownerPluginKey: string) =>
			requireCommandsApi(app).deleteByOwner(ownerPluginKey)
	};
}

export function createPluginAppApi(app: App, scope?: PluginAppScope): PluginAppApi {
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
			},
			getSettingsContext: (pluginKey) => {
				const plugin = app.plugins.find(pluginKey);

				if (!plugin) {
					return undefined;
				}

				return plugin.createContext(app);
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
			create: (props) =>
				app.createModal({
					...props,
					contentHost: 'plugin'
				}),
			get: (id: string) => app.modals.get(id)
		},
		menu: {
			add: app.menu.addPlugin.bind(app.menu),
			remove: app.menu.remove.bind(app.menu)
		},
		toolbar: {
			set: app.toolbar.set.bind(app.toolbar),
			reset: app.toolbar.reset.bind(app.toolbar)
		},
		fs: createFilesystemApi(app.fs),
		audio: {
			play: app.audio.play.bind(app.audio),
			playFile: app.audio.playFile.bind(app.audio),
			stop: app.audio.stop.bind(app.audio)
		},
		userFiles: {
			isCloudUrl: app.userFiles.isCloudUrl.bind(app.userFiles),
			resolveUrl: app.userFiles.resolveUrl.bind(app.userFiles),
			resolveAuthenticatedUrl: app.userFiles.resolveAuthenticatedUrl.bind(app.userFiles),
			list: app.userFiles.list.bind(app.userFiles),
			upload: app.userFiles.upload.bind(app.userFiles),
			remove: app.userFiles.remove.bind(app.userFiles),
			getQuota: app.userFiles.getQuota.bind(app.userFiles),
			fetchBlob: app.userFiles.fetchBlob.bind(app.userFiles),
			pick: async (options) => {
				const { openCloudFilePicker } = await import(
					'$lib/components/core/user-files/open-cloud-file-picker'
				);
				return openCloudFilePicker({
					filters: options?.extensions
						? [{ name: 'Files', extensions: options.extensions }]
						: undefined,
					mimePrefix: options?.mimePrefix
				});
			}
		},
		media: {
			getFileDurationMs: getVideoFileDurationMs
		},
		network: {
			isTcpPortReachable
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
		hotkeys: {
			register: app.hotkeys.register.bind(app.hotkeys),
			isRegistered: app.hotkeys.isRegistered.bind(app.hotkeys),
			trigger: app.hotkeys.trigger.bind(app.hotkeys)
		},
		actionQueues: {
			get definitions() {
				return app.actionQueues.definitions;
			},
			pause: app.actionQueues.pause.bind(app.actionQueues),
			resume: app.actionQueues.resume.bind(app.actionQueues),
			stats: app.actionQueues.stats.bind(app.actionQueues),
			on: app.actionQueues.on.bind(app.actionQueues)
		},
		db: {
			registerMigrations: (pluginKey: string, migrations: PluginMigration[]) => {
				registerPluginMigrations(pluginKey, migrations);
			},
			getClient: (): PluginDbClient => db
		},
		i18n: {
			t: (key: TranslationKey, params?: Record<string, string | number | null | undefined>) => {
				const i18n = getI18n();

				if (!i18n) {
					return key;
				}

				return i18n.t(
					key,
					params as Record<string, string | number> | undefined
				);
			},
			translate
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
			runById: (id: number, context: HandlerTriggerContext) => app.actions.runById(id, context),
			findHandler: (id: string) => app.actions.actions.find(id),
			getHandlers: () => app.actions.actions.items,
			create: (input: NewActionRecord, options?: { ownerPluginKey?: string }) =>
				app.actions.createFromRecord(input, {
					ownerPluginKey: resolveOwnerPluginKey(scope, options)
				}),
			update: (
				id: number,
				input: Omit<NewActionRecord, 'id'>,
				options?: { ownerPluginKey?: string }
			) =>
				app.actions.updateFromRecord(id, input, {
					ownerPluginKey: resolveOwnerPluginKey(scope, options)
				}),
			delete: (id: number) => app.actions.delete(id),
			deleteByOwner: (ownerPluginKey: string) => app.actions.deleteByOwner(ownerPluginKey),
			getSnapshot: () => app.actions.getSnapshot()
		},
		commands: createCommandsApi(app, scope),
		auth: {
			get user() {
				return app.auth.user;
			},
			get isAuthenticated() {
				return app.auth.isAuthenticated;
			},
			login: app.auth.login.bind(app.auth),
			register: app.auth.register.bind(app.auth),
			logout: app.auth.logout.bind(app.auth),
			onChange: app.auth.onChange.bind(app.auth)
		},
		oauth: {
			start: app.oauth.start.bind(app.oauth),
			onUrl: app.oauth.onUrl.bind(app.oauth),
			onInvalidUrl: app.oauth.onInvalidUrl.bind(app.oauth)
		},
		opener: {
			openUrl: app.opener.openUrl.bind(app.opener)
		},
		overlay: {
			get items() {
				return app.overlay.items.map((overlay) => ({
					id: overlay.id,
					name: overlay.name,
					expectedEvents: overlay.expectedEvents ?? []
				}));
			},
			broadcast: (overlayId: string, event: string, payload?: unknown) =>
				app.overlay.broadcast(overlayId, event, payload)
		},
		api: createApiServerApi(app, scope),
		withResourceLock
	} satisfies PluginAppApi;
}

function createApiServerApi(app: App, scope?: PluginAppScope) {
	function prefix(name: string): string {
		const trimmed = name.trim();
		if (!scope?.pluginKey) {
			return trimmed;
		}

		const pluginPrefix = `plugin:${scope.pluginKey}:`;
		if (trimmed.startsWith(pluginPrefix) || trimmed.startsWith('plugin:')) {
			return trimmed;
		}

		return `${pluginPrefix}${trimmed}`;
	}

	return {
		registerMethod: (
			name: string,
			handler: (params: unknown) => unknown | Promise<unknown>
		) => {
			app.apiServer.registerMethod(prefix(name), handler, scope?.pluginKey);
		},
		emit: (event: string, payload?: unknown) => app.apiServer.emit(prefix(event), payload),
		unregisterMethods: () => {
			if (scope?.pluginKey) {
				app.apiServer.unregisterMethodsByOwner(scope.pluginKey);
			}
		}
	};
}

let pluginAppInstance: PluginAppApi | undefined;

export function getPluginAppApi(app: App): PluginAppApi {
	pluginAppInstance ??= createPluginAppApi(app);
	return pluginAppInstance;
}
