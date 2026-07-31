import {
	clearPluginDevModes,
	getCheckPluginUpdatesOnStartup,
	getDeveloperMode,
	getOfflineCloudFilesMirror,
	getOfflineCloudFilesMirrorUserId,
	getPluginDevModes,
	removePluginDevMode,
	saveCheckPluginUpdatesOnStartup,
	saveDeveloperMode,
	saveOfflineCloudFilesMirror,
	saveOfflineCloudFilesMirrorUserId,
	setPluginDevMode
} from './settings-store';

export class Settings {
	developerMode = $state(false);
	checkPluginUpdatesOnStartup = $state(true);
	/** Mirror cloud `user_files` to AppData and prefer local paths (device-local, default off). */
	offlineCloudFilesMirror = $state(false);
	/** Last account id used for the offline mirror (kept for logged-out local path reads). */
	offlineCloudFilesMirrorUserId = $state<string | null>(null);
	pluginDevModes = $state<Record<string, boolean>>({});
	private hasLoaded = false;

	async load(): Promise<void> {
		this.developerMode = await getDeveloperMode();
		this.checkPluginUpdatesOnStartup = await getCheckPluginUpdatesOnStartup();
		this.offlineCloudFilesMirror = await getOfflineCloudFilesMirror();
		this.offlineCloudFilesMirrorUserId = await getOfflineCloudFilesMirrorUserId();
		this.pluginDevModes = await getPluginDevModes();
		this.hasLoaded = true;
	}

	async ensureLoaded(): Promise<void> {
		if (!this.hasLoaded) {
			await this.load();
		}
	}

	isPluginDevMode(pluginKey: string): boolean {
		return this.developerMode && (this.pluginDevModes[pluginKey] ?? false);
	}

	async setDeveloperMode(enabled: boolean): Promise<void> {
		this.developerMode = enabled;
		await saveDeveloperMode(enabled);

		if (!enabled) {
			this.pluginDevModes = {};
			await clearPluginDevModes();
		}
	}

	async setCheckPluginUpdatesOnStartup(enabled: boolean): Promise<void> {
		this.checkPluginUpdatesOnStartup = enabled;
		await saveCheckPluginUpdatesOnStartup(enabled);
	}

	async setOfflineCloudFilesMirror(enabled: boolean): Promise<void> {
		this.offlineCloudFilesMirror = enabled;
		await saveOfflineCloudFilesMirror(enabled);
	}

	async setOfflineCloudFilesMirrorUserId(userId: string | null): Promise<void> {
		this.offlineCloudFilesMirrorUserId = userId;
		await saveOfflineCloudFilesMirrorUserId(userId);
	}

	async setPluginDevMode(pluginKey: string, enabled: boolean): Promise<void> {
		this.pluginDevModes = await setPluginDevMode(pluginKey, enabled);
	}

	async clearPluginDevMode(pluginKey: string): Promise<void> {
		const { [pluginKey]: _removed, ...remaining } = this.pluginDevModes;
		this.pluginDevModes = remaining;
		await removePluginDevMode(pluginKey);
	}
}
