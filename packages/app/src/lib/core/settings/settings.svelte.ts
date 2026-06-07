import type { LazyStore } from '@tauri-apps/plugin-store';

import type { SettingsSectionProps } from './types';

import { LazyStore as LazyStoreClass } from '@tauri-apps/plugin-store';
import { SvelteMap } from 'svelte/reactivity';

import { getApp, tryGetApp } from '../registry';

import { SettingsSection } from './settings-section.svelte';

const SETTINGS_MENU_PATH = '/settings';

export class Settings {
	items: SettingsSection[] = $state.raw([]);
	private stores = new SvelteMap<string, LazyStore>();

	getStore(key: string): LazyStore {
		const existing = this.stores.get(key);

		if (existing) {
			return existing;
		}

		const store = new LazyStoreClass(`${key}.json`);
		this.stores.set(key, store);

		return store;
	}

	add(props: SettingsSectionProps): SettingsSection {
		if (this.find(props.key)) {
			throw new Error(`Settings section with key ${props.key} already exists`);
		}

		const section = new SettingsSection(props, this.getStore(props.key));
		this.items = [...this.items, section];
		this.syncMenu();

		return section;
	}

	remove(key: string): void {
		this.items = this.items.filter((item) => item.key !== key);
		this.syncMenu();
	}

	syncMenu(): void {
		const app = tryGetApp();

		if (!app?.menu.find(SETTINGS_MENU_PATH)) {
			return;
		}

		const children = this.items.map((section) => ({
			path: `/settings/${section.key}`,
			title: section.title
		}));

		app.menu.setChildren(SETTINGS_MENU_PATH, children.length > 0 ? children : undefined);
	}

	find(key: string): SettingsSection | undefined {
		return this.items.find((item) => item.key === key);
	}

	async load(): Promise<void> {
		const app = getApp();

		for (const section of this.items) {
			await section.load();
			await section.onLoad?.(section.createContext(app));
		}
	}

	async save(key: string): Promise<boolean> {
		const app = getApp();
		const section = this.find(key);

		if (!section?.validate(app)) {
			return false;
		}

		await section.save();
		await section.onSave?.(section.createContext(app));

		getApp().toast.create({
			title: 'Settings saved',
			description: `${section.title} has been saved successfully`,
			variant: 'success'
		});

		return true;
	}
}
