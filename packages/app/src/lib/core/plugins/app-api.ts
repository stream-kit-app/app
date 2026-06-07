import type { HandlerDefinitionProps } from '../action/handler';
import type { TriggerDefinitionProps } from '../action/trigger';
import type { App } from '../app.svelte';
import type { ConfirmOptions } from '../confirm';
import type { MenuItem } from '../menu/types';
import type { Modal } from '../modal';
import type { ModalProps } from '../modal/modal.svelte';
import type { OAuthStartOptions } from '../oauth';
import type { ToastCreateProps } from '../toast';

import type { UnlistenFn } from '@tauri-apps/api/event';

export type PluginAppApi = {
	plugins: {
		get<T>(key: string): T;
		tryGet<T>(key: string): T | undefined;
	};
	toast: {
		create(props: ToastCreateProps): void;
		dismiss(id: string): void;
	};
	confirm: {
		ask(options: ConfirmOptions): Promise<boolean>;
	};
	modal: {
		create(props: ModalProps): Modal;
	};
	menu: {
		add(item: MenuItem): MenuItem;
		remove(path: string): void;
	};
	audio: {
		play(blob: Blob, volume: number): Promise<void>;
	};
	oauth: {
		start(options: OAuthStartOptions): Promise<number>;
		onUrl(callback: (url: string) => void): Promise<UnlistenFn>;
		onInvalidUrl(callback: (url: string) => void): Promise<UnlistenFn>;
	};
	opener: {
		openUrl(url: string): Promise<void>;
	};
};

export type PluginDefinitionCollections = {
	triggers?: TriggerDefinitionProps[];
	handlers?: HandlerDefinitionProps[];
};

export function createPluginAppApi(app: App): PluginAppApi {
	return {
		plugins: {
			get: <T>(key: string) => app.plugins.get<T>(key),
			tryGet: <T>(key: string) => app.plugins.tryGet<T>(key)
		},
		toast: {
			create: (props) => {
				app.toast.create(props);
			},
			dismiss: (id) => app.toast.dismiss(id)
		},
		confirm: {
			ask: (options) => app.confirm.ask(options)
		},
		modal: {
			create: (props) => app.createModal(props)
		},
		menu: {
			add: (item) => app.menu.add(item),
			remove: (path) => app.menu.remove(path)
		},
		audio: {
			play: (blob, volume) => app.playAudio(blob, volume)
		},
		oauth: {
			start: (options) => app.oauth.start(options),
			onUrl: (callback) => app.oauth.onUrl(callback),
			onInvalidUrl: (callback) => app.oauth.onInvalidUrl(callback)
		},
		opener: {
			openUrl: (url) => app.opener.openUrl(url)
		}
	};
}
