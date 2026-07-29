import type { ModalProps } from './modal/modal.svelte';
import type { Plugin } from './plugins/types';
import type { RegisterPluginOptions } from './plugins/installed-plugin';

import { SvelteMap } from 'svelte/reactivity';

import { translate } from '$lib/i18n';

import { Actions } from './action/action.svelte';
import { ActionQueues } from './action-queue/action-queues.svelte';
import { Audio } from './audio';
import { Auth } from './auth';
import { Bootable } from './bootable.svelte';
import { Confirm } from './confirm';
import { Dashboard } from './dashboard';
import { Filesystem } from './filesystem';
import { AppLifecycle } from './lifecycle';
import { Menu } from './menu';
import { Modal } from './modal';
import { PageHeader } from './page-header';
import { Toolbar } from './toolbar';
import { OAuth } from './oauth';
import { Opener } from './opener';
import { ApiServerService } from './api-server';
import { OverlayService } from './overlay/overlay-service.svelte';
import { createPluginAppApi } from './plugins/app-api';
import { PluginMenuPages } from './plugins/plugin-menu-pages.svelte';
import { Plugins } from './plugins/plugins.svelte';
import { ProcessWatcher } from './process';
import { HotkeyManager } from './hotkeys';
import { Settings } from './settings';
import { Toast } from './toast';
import { LocalTts } from './tts';
import { UserFiles } from './user-files';
import { ConfigSync } from './config-sync';
import { PluginRecordsService } from './plugin-records';

export class App extends Bootable {
	public menu = new Menu();
	public plugins = new Plugins();
	public pluginMenuPages = new PluginMenuPages();
	public actions = new Actions();
	public actionQueues = new ActionQueues();
	public dashboard = new Dashboard();
	public settings = new Settings();
	public auth = new Auth();
	public userFiles = new UserFiles(this.auth);
	public records = new PluginRecordsService();
	public configSync = new ConfigSync(this);
	public oauth = new OAuth();
	public opener = new Opener();
	public fs = new Filesystem();
	public audio = new Audio();
	public lifecycle = new AppLifecycle();
	public process = new ProcessWatcher();
	public hotkeys = new HotkeyManager();
	public localTts = new LocalTts();
	public overlay = new OverlayService();
	public apiServer = new ApiServerService();

	public modals = new SvelteMap<string, Modal>();
	public pageHeader = new PageHeader();
	public toolbar = new Toolbar();
	public confirm = new Confirm();
	public toast = new Toast();

	public isBooting: boolean = $state(false);

	async boot(): Promise<this> {
		this.isBooting = true;

		await this.plugins.boot(this);

		this.isBooting = false;

		return this;
	}

	public createModal(props: ModalProps): Modal {
		const modal = new Modal({
			id: props.id,
			title: props.title,
			description: props.description,
			content: props.content,
			header: props.header,
			footer: props.footer,
			scrollBody: props.scrollBody,
			props: props.props,
			size: props.size,
			contentHost: props.contentHost,
			onClose: props.onClose
		});
		this.modals.set(modal.id, modal);

		return modal;
	}

	public removeModal(id: string): void {
		this.modals.delete(id);
	}

	public async use(plugin: Plugin, options: RegisterPluginOptions = {}): Promise<void> {
		try {
			// Scope records/API to the install key so factory-captured `app` works in
			// triggers/handlers and lifecycle code that closes over the plugin factory arg.
			const registration = await plugin(
				createPluginAppApi(this, { pluginKey: options.key })
			);
			this.plugins.register(registration, options);
		} catch (error) {
			console.warn('Failed to load plugin', error);
			this.toast.create({
				title: translate('Plugin could not be loaded'),
				description:
					error instanceof Error ? error.message : translate('Unknown plugin error.'),
				variant: 'warning'
			});
		}
	}
}
