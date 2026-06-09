import type { ModalProps } from './modal/modal.svelte';
import type { Plugin } from './plugins';
import type { RegisterPluginOptions } from './plugins/installed-plugin';

import { invoke } from '@tauri-apps/api/core';
import { SvelteMap } from 'svelte/reactivity';

import { translate } from '$lib/i18n';

import { Actions } from './action/action.svelte';
import { Bootable } from './bootable.svelte';
import { Confirm } from './confirm';
import { Menu } from './menu';
import { Modal } from './modal';
import { OAuth } from './oauth';
import { Opener } from './opener';
import { Plugins } from './plugins';
import { PluginMenuPages } from './plugins/plugin-menu-pages.svelte';
import { createPluginAppApi } from './plugins/app-api';
import { Settings } from './settings';
import { Toast } from './toast';

export class App extends Bootable {
	public menu = new Menu();
	public plugins = new Plugins();
	public pluginMenuPages = new PluginMenuPages();
	public actions = new Actions();
	public settings = new Settings();
	public oauth = new OAuth();
	public opener = new Opener();

	public bootables: Bootable[] = $state.raw([]);

	public modals = new SvelteMap<string, Modal>();
	public confirm = new Confirm();
	public toast = new Toast();

	public isBooting: boolean = $state(false);

	async boot(): Promise<this> {
		this.isBooting = true;

		await this.plugins.boot(this);

		for (const bootable of this.bootables) {
			await bootable.boot();
		}

		this.isBooting = false;

		return this;
	}

	public createModal(props: ModalProps): Modal {
		const modal = new Modal({
			id: props.id,
			title: props.title,
			description: props.description,
			content: props.content,
			props: props.props,
			size: props.size
		});
		this.modals.set(modal.id, modal);

		return modal;
	}

	public async use(plugin: Plugin, options: RegisterPluginOptions = {}): Promise<void> {
		try {
			const registration = await plugin(createPluginAppApi(this));
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

	public async playAudio(blob: Blob, volume: number): Promise<void> {
		const data = Array.from(new Uint8Array(await blob.arrayBuffer()));
		await invoke('play_audio', { data, volume: Math.min(1, Math.max(0, volume)) });
	}
}
