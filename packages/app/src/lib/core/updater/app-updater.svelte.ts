import type { Update } from '@tauri-apps/plugin-updater';

import { getVersion } from '@tauri-apps/api/app';
import { invoke } from '@tauri-apps/api/core';
import { relaunch } from '@tauri-apps/plugin-process';
import { check } from '@tauri-apps/plugin-updater';

import { translate } from '#lib/i18n.js';

import { getApp } from '../registry';

const UPDATE_TOAST_ID = 'app-update-install';

/** Whole megabytes, for the progress bar (the toast shows `done / total`). */
function toMb(bytes: number): number {
	return Math.round(bytes / (1024 * 1024));
}

class AppUpdater {
	isChecking = $state(false);
	isInstalling = $state(false);
	currentVersion = $state<string | null>(null);
	isStoreInstall = $state(false);
	lastCheckedAt = $state<Date | null>(null);

	private loadPromise: Promise<void> | null = null;

	async load(): Promise<void> {
		if (!this.loadPromise) {
			this.loadPromise = this.runLoad().catch((error) => {
				this.loadPromise = null;
				throw error;
			});
		}

		return this.loadPromise;
	}

	async checkOnStartup(): Promise<void> {
		const app = getApp();
		await app.settings.ensureLoaded();

		if (!app.settings.checkAppUpdatesOnStartup) {
			return;
		}

		await this.check({ silent: true });
	}

	async check(options: { silent?: boolean } = {}): Promise<void> {
		const silent = options.silent ?? false;

		if (this.isChecking || this.isInstalling) {
			return;
		}

		await this.load();

		if (import.meta.env.DEV) {
			if (!silent) {
				getApp().toast.create({
					title: translate('Updates'),
					description: translate('Updates are not checked in development mode.'),
					variant: 'default'
				});
			}
			return;
		}

		if (this.isStoreInstall) {
			if (!silent) {
				getApp().toast.create({
					title: translate('Updates'),
					description: translate('App updates are managed by the Microsoft Store.'),
					variant: 'default'
				});
			}
			return;
		}

		this.isChecking = true;

		try {
			const update = await check();
			this.lastCheckedAt = new Date();

			if (!update) {
				if (!silent) {
					getApp().toast.create({
						title: translate("You're up to date"),
						description: translate('Stream Kit is up to date.'),
						variant: 'success'
					});
				}
				return;
			}

			await this.promptAndInstall(update);
		} catch (error) {
			console.error('Failed to check for app updates', error);

			if (!silent) {
				getApp().toast.create({
					title: translate('Update check failed'),
					description:
						error instanceof Error
							? error.message
							: translate('Could not check for updates'),
					variant: 'warning'
				});
			}
		} finally {
			this.isChecking = false;
		}
	}

	private async runLoad(): Promise<void> {
		const [version, storeInstall] = await Promise.all([
			getVersion(),
			invoke<boolean>('is_store_install')
		]);

		this.currentVersion = version;
		this.isStoreInstall = storeInstall;
	}

	private async promptAndInstall(update: Update): Promise<void> {
		const confirmed = await getApp().confirm.ask({
			title: translate('Update available'),
			description: translate('Version {version} is available. Install and restart now?', {
				version: update.version
			}),
			confirmLabel: translate('Install and restart'),
			cancelLabel: translate('Later')
		});

		if (!confirmed) {
			return;
		}

		this.isInstalling = true;

		// The download takes a while and the installer only closes the app at the end;
		// without feedback "Install and restart" looks like it did nothing.
		const toast = getApp().toast.create({
			id: UPDATE_TOAST_ID,
			title: translate('Downloading update…'),
			description: translate('Stream Kit restarts when the update is installed.'),
			duration: 0
		});
		let totalBytes = 0;
		let downloadedBytes = 0;
		let shownMb = -1;

		try {
			await update.downloadAndInstall((event) => {
				if (event.event === 'Started') {
					totalBytes = event.data.contentLength ?? 0;
					return;
				}

				if (event.event === 'Progress') {
					downloadedBytes += event.data.chunkLength;
					const mb = toMb(downloadedBytes);
					if (totalBytes > 0 && mb !== shownMb) {
						shownMb = mb;
						toast.update({ progress: { done: mb, total: toMb(totalBytes) } });
					}
					return;
				}

				toast.update({
					title: translate('Installing update…'),
					description: translate('Stream Kit closes and restarts in a moment.'),
					progress: undefined
				});
			});
			await relaunch();
		} catch (error) {
			console.error('Failed to install app update', error);
			getApp().toast.create({
				id: UPDATE_TOAST_ID,
				title: translate('Could not install the update'),
				description:
					error instanceof Error
						? error.message
						: translate('Could not install the update'),
				variant: 'warning'
			});
		} finally {
			this.isInstalling = false;
		}
	}
}

export const appUpdater = new AppUpdater();
