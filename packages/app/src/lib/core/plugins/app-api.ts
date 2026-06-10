import type { HandlerDefinitionProps } from '../action/handler';
import type { TriggerDefinitionProps } from '../action/trigger';
import type { App } from '../app.svelte';
import { createFilesystemApi } from '../filesystem/create-api';

export type PluginDefinitionCollections = {
	triggers?: TriggerDefinitionProps[];
	handlers?: HandlerDefinitionProps[];
};

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
		actions: {
			reactivateAll: () => {
				for (const action of app.actions.items) {
					if (!action.enabled) {
						continue;
					}

					app.actions.deactivate(action);
					app.actions.activate(action);
				}
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
