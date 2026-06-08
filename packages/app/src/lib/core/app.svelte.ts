import type { ModalProps } from './modal/modal.svelte';

import { invoke } from '@tauri-apps/api/core';
import { SvelteMap } from 'svelte/reactivity';

import { Actions } from './action/action.svelte';
import { Bootable } from './bootable.svelte';
import { Confirm } from './confirm';
import { Menu } from './menu';
import { Modal } from './modal';
import { OAuth } from './oauth';
import { Opener } from './opener';
import { Plugins, type Plugin, type PluginRegistration } from './plugins';
import { createPluginAppApi } from './plugins/app-api';
import { Settings } from './settings';
import { Toast } from './toast';

export class App extends Bootable {
	public menu = new Menu();
	public plugins = new Plugins();
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

	public async use(plugin: Plugin): Promise<void> {
		try {
			const registration = await plugin(createPluginAppApi(this));

			if (!this.isPluginRegistration(registration)) {
				this.toast.create({
					title: 'Plugin kon niet geladen worden',
					description: 'Een plugin gaf geen geldige registratie terug.',
					variant: 'warning'
				});
				return;
			}

			const registeredPlugin = this.plugins.register(registration);
			registeredPlugin.registerDefinitions(this);
		} catch (error) {
			console.warn('Failed to load plugin', error);
			this.toast.create({
				title: 'Plugin kon niet geladen worden',
				description: error instanceof Error ? error.message : 'Onbekende plugin fout.',
				variant: 'warning'
			});
		}
	}

	public async playAudio(blob: Blob, volume: number): Promise<void> {
		const data = Array.from(new Uint8Array(await blob.arrayBuffer()));
		await invoke('play_audio', { data, volume: Math.min(1, Math.max(0, volume)) });
	}

	private isPluginRegistration(value: unknown): value is PluginRegistration {
		return (
			typeof value === 'object' &&
			value !== null &&
			'key' in value &&
			'name' in value &&
			typeof value.key === 'string' &&
			typeof value.name === 'string'
		);
	}
}
