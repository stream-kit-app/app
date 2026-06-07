import type { ModalProps } from './modal/modal.svelte';

import { invoke } from '@tauri-apps/api/core';
import { SvelteMap } from 'svelte/reactivity';

import { Actions } from './action/action.svelte';
import { HandlerDefinitions } from './action/handler';
import { TriggerDefinitions } from './action/trigger';
import { Bootable } from './bootable.svelte';
import { Confirm } from './confirm';
import { Menu } from './menu';
import { Modal } from './modal';
import { Settings } from './settings';
import { Toast } from './toast';
import { twitch } from './twitch';

export type Plugin = (app: App) => void | Promise<void>;

export class App extends Bootable {
	public twitch = twitch;

	public menu = new Menu();
	public triggerDefinitions = new TriggerDefinitions();
	public handlerDefinitions = new HandlerDefinitions();
	public actions = new Actions();
	public settings = new Settings();

	public bootables: Bootable[] = $state.raw([twitch]);

	public modals = new SvelteMap<string, Modal>();
	public confirm = new Confirm();
	public toast = new Toast();

	public isBooting: boolean = $state(false);

	async boot(): Promise<this> {
		this.isBooting = true;

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

	public use(plugin: Plugin): void | Promise<void> {
		return plugin(this);
	}

	public async playAudio(blob: Blob, volume: number): Promise<void> {
		const data = Array.from(new Uint8Array(await blob.arrayBuffer()));
		await invoke('play_audio', { data, volume: Math.min(1, Math.max(0, volume)) });
	}
}
