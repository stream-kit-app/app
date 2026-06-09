import type { ModalProps } from './modal/modal.svelte';
import type { Plugin, PluginRegistration } from './plugins';
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

			if (!this.isPluginRegistration(registration)) {
				this.toast.create({
					title: translate('Plugin could not be loaded'),
					description: translate('A plugin returned an invalid registration.'),
					variant: 'warning'
				});
				return;
			}

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

	private isPluginRegistration(value: unknown): value is PluginRegistration {
		if (
			typeof value !== 'object' ||
			value === null ||
			!('key' in value) ||
			!('name' in value) ||
			typeof value.key !== 'string' ||
			typeof value.name !== 'string'
		) {
			return false;
		}

		const menuItems = (value as PluginRegistration).menuItems;

		if (menuItems === undefined) {
			return true;
		}

		return Array.isArray(menuItems) && menuItems.every((item) => this.isPluginMenuItem(item));
	}

	private isPluginMenuItem(value: unknown): boolean {
		if (typeof value !== 'object' || value === null) {
			return false;
		}

		const item = value as Record<string, unknown>;
		const children = item.children;

		if (
			typeof item.key !== 'string' ||
			typeof item.title !== 'string' ||
			typeof item.icon !== 'string'
		) {
			return false;
		}

		if (children !== undefined && !Array.isArray(children)) {
			return false;
		}

		if ('component' in item || 'props' in item || 'html' in item) {
			return false;
		}

		if (Array.isArray(children) && children.length > 0) {
			if ('page' in item) {
				return false;
			}

			return children.every((child) => {
				if (typeof child !== 'object' || child === null) {
					return false;
				}

				const childItem = child as Record<string, unknown>;

				return (
					typeof childItem.key === 'string' &&
					typeof childItem.title === 'string' &&
					!('children' in childItem) &&
					!('component' in childItem) &&
					!('props' in childItem) &&
					this.isPluginPage(childItem.page)
				);
			});
		}

		return this.isPluginPage(item.page);
	}

	private isPluginPage(value: unknown): boolean {
		if (typeof value !== 'object' || value === null) {
			return false;
		}

		const page = value as Record<string, unknown>;

		return (
			(page.title === undefined || typeof page.title === 'string') &&
			(page.description === undefined || typeof page.description === 'string') &&
			Array.isArray(page.blocks) &&
			page.blocks.every((block) => this.isPluginPageBlock(block))
		);
	}

	private isPluginPageBlock(value: unknown): boolean {
		if (typeof value !== 'object' || value === null) {
			return false;
		}

		const block = value as Record<string, unknown>;

		if (typeof block.type !== 'string' || 'html' in block || 'component' in block || 'action' in block) {
			return false;
		}

		switch (block.type) {
			case 'heading':
				return (
					typeof block.title === 'string' &&
					(block.subtitle === undefined || typeof block.subtitle === 'string') &&
					(block.level === undefined || this.isHeadingLevel(block.level))
				);
			case 'text':
				return typeof block.text === 'string';
			case 'alert':
				return (
					(block.title === undefined || typeof block.title === 'string') &&
					(block.description === undefined || typeof block.description === 'string') &&
					(block.variant === undefined || this.isOneOf(block.variant, ['default', 'success', 'error', 'warning']))
				);
			case 'badge':
				return (
					typeof block.label === 'string' &&
					(block.variant === undefined ||
						this.isOneOf(block.variant, [
							'default',
							'secondary',
							'outline',
							'ghost',
							'destructive',
							'success',
							'warning',
							'link'
						]))
				);
			case 'card':
				return (
					(block.title === undefined || typeof block.title === 'string') &&
					(block.description === undefined || typeof block.description === 'string') &&
					Array.isArray(block.blocks) &&
					block.blocks.every((child) => this.isPluginPageBlock(child))
				);
			case 'stack':
				return (
					Array.isArray(block.blocks) &&
					block.blocks.every((child) => this.isPluginPageBlock(child))
				);
			case 'grid':
				return (
					(block.columns === undefined || this.isOneOf(block.columns, [1, 2, 3])) &&
					Array.isArray(block.blocks) &&
					block.blocks.every((child) => this.isPluginPageBlock(child))
				);
			case 'button':
				return (
					typeof block.label === 'string' &&
					typeof block.onClick === 'function' &&
					(block.variant === undefined || this.isButtonVariant(block.variant))
				);
			case 'form':
				return (
					typeof block.key === 'string' &&
					(block.title === undefined || typeof block.title === 'string') &&
					(block.description === undefined || typeof block.description === 'string') &&
					(block.submitLabel === undefined || typeof block.submitLabel === 'string') &&
					(block.successMessage === undefined || typeof block.successMessage === 'string') &&
					Array.isArray(block.fields) &&
					block.fields.every((field) => this.isPluginPageFormItem(field))
				);
			default:
				return false;
		}
	}

	private isPluginPageFormItem(value: unknown): boolean {
		if (typeof value !== 'object' || value === null) {
			return false;
		}

		const item = value as Record<string, unknown>;

		if (item.type === 'section') {
			return (
				(item.title === undefined || typeof item.title === 'string') &&
				(item.description === undefined || typeof item.description === 'string') &&
				Array.isArray(item.fields) &&
				item.fields.every((field) => this.isPluginPageFormField(field))
			);
		}

		return this.isPluginPageFormField(item);
	}

	private isPluginPageFormField(value: unknown): boolean {
		if (typeof value !== 'object' || value === null) {
			return false;
		}

		const field = value as Record<string, unknown>;

		if (
			typeof field.type !== 'string' ||
			typeof field.key !== 'string' ||
			typeof field.name !== 'string' ||
			'visible' in field ||
			'onClick' in field
		) {
			return false;
		}

		const hasBase =
			(field.placeholder === undefined || typeof field.placeholder === 'string') &&
			(field.defaultValue === undefined ||
				['string', 'boolean', 'number'].includes(typeof field.defaultValue)) &&
			(field.required === undefined || typeof field.required === 'boolean');

		if (!hasBase) {
			return false;
		}

		switch (field.type) {
			case 'text':
				return field.inputType === undefined || this.isOneOf(field.inputType, ['text', 'password']);
			case 'switch':
			case 'checkbox':
				return true;
			case 'select':
			case 'combobox':
				return (
					Array.isArray(field.items) &&
					field.items.every((item) => this.isSelectItem(item)) &&
					(field.loadingPlaceholder === undefined ||
						typeof field.loadingPlaceholder === 'string')
				);
			case 'slider':
				return (
					typeof field.min === 'number' &&
					typeof field.max === 'number' &&
					(field.step === undefined || typeof field.step === 'number')
				);
			case 'alert':
				return (
					(field.description === undefined || typeof field.description === 'string') &&
					(field.variant === undefined || this.isOneOf(field.variant, ['default', 'success', 'error', 'warning']))
				);
			default:
				return false;
		}
	}

	private isSelectItem(value: unknown): boolean {
		if (typeof value !== 'object' || value === null) {
			return false;
		}

		const item = value as Record<string, unknown>;

		return typeof item.value === 'string' && typeof item.label === 'string';
	}

	private isHeadingLevel(value: unknown): boolean {
		return this.isOneOf(value, [1, 2, 3, 4, 5, 6]);
	}

	private isButtonVariant(value: unknown): boolean {
		return this.isOneOf(value, [
			'default',
			'secondary',
			'outline',
			'ghost',
			'destructive',
			'link'
		]);
	}

	private isOneOf(value: unknown, values: unknown[]): boolean {
		return values.includes(value);
	}
}
