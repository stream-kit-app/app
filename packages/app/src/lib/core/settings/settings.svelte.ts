import {
	clearPluginDevModes,
	getCheckPluginUpdatesOnStartup,
	getDeveloperMode,
	getPluginDevModes,
	removePluginDevMode,
	saveCheckPluginUpdatesOnStartup,
	saveDeveloperMode,
	setPluginDevMode
} from './settings-store';

export class Settings {
	developerMode = $state(false);
	checkPluginUpdatesOnStartup = $state(true);
	pluginDevModes = $state<Record<string, boolean>>({});
	private hasLoaded = false;

	async load(): Promise<void> {
		this.developerMode = await getDeveloperMode();
		this.checkPluginUpdatesOnStartup = await getCheckPluginUpdatesOnStartup();
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

	async setPluginDevMode(pluginKey: string, enabled: boolean): Promise<void> {
		this.pluginDevModes = await setPluginDevMode(pluginKey, enabled);
	}

	async clearPluginDevMode(pluginKey: string): Promise<void> {
		const { [pluginKey]: _removed, ...remaining } = this.pluginDevModes;
		this.pluginDevModes = remaining;
		await removePluginDevMode(pluginKey);
	}
}
