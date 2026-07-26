import type { PluginUpdateInfo } from './plugin-update';

import { invoke } from '@tauri-apps/api/core';

import { translate } from '$lib/i18n';

import { getApp } from '../registry';
import { checkAllPluginUpdates, canApplyPluginUpdates } from './plugin-update';
import type { InstalledPluginManifest } from './installed-plugin';

class PluginUpdates {
	updates = $state<PluginUpdateInfo[]>([]);
	isChecking = $state(false);
	lastCheckedAt = $state<Date | null>(null);
	checkError = $state<string | null>(null);

	get availableCount(): number {
		return this.updates.length;
	}

	getUpdate(key: string): PluginUpdateInfo | undefined {
		return this.updates.find((update) => update.key === key);
	}

	hasUpdate(key: string): boolean {
		return this.updates.some((update) => update.key === key);
	}

	async check(silent = false): Promise<void> {
		if (this.isChecking) {
			return;
		}

		this.isChecking = true;
		this.checkError = null;

		try {
			const installed = await invoke<InstalledPluginManifest[]>('list_installed_plugins');
			this.updates = await checkAllPluginUpdates(installed);
			this.lastCheckedAt = new Date();
		} catch (error) {
			this.checkError = error instanceof Error ? error.message : 'Unknown error';

			if (!silent) {
				throw error;
			}
		} finally {
			this.isChecking = false;
		}
	}

	removeUpdate(key: string): void {
		this.updates = this.updates.filter((update) => update.key !== key);
	}

	async apply(key: string): Promise<void> {
		if (!canApplyPluginUpdates()) {
			throw new Error(
				translate(
					'Plugin updates cannot be installed while Stream Kit is running in development mode.'
				)
			);
		}

		const update = this.getUpdate(key);

		if (!update) {
			throw new Error(`No pending update for plugin "${key}"`);
		}

		const { applyPluginUpdate } = await import('./plugin-update');
		await applyPluginUpdate(getApp(), update);
		this.removeUpdate(key);
	}
}

export const pluginUpdates = new PluginUpdates();
