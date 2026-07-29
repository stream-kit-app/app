import type { PluginAppApi, PluginAppRecordCollectionApi, PluginStore } from '@stream-kit/plugin';

export type BotPlatformSettings = {
	twitch: boolean;
	youtube: boolean;
};

export type BotSettingsSnapshot = {
	enabled: boolean;
	prefix: string;
	platforms: BotPlatformSettings;
	moderationEnabled: boolean;
	sendAsBot: boolean;
};

const SETTINGS_KEY = 'botSettings';
const BOT_SETTINGS_ID = 'botsettings0001';
const BOT_SETTINGS_COLLECTION = 'botSettings';
const RECORDS_MIGRATION_KEY = '__records_migrated_botSettings_v1';

const DEFAULT_SETTINGS: BotSettingsSnapshot = {
	enabled: true,
	prefix: '!',
	platforms: {
		twitch: true,
		youtube: true
	},
	moderationEnabled: true,
	sendAsBot: true
};

export class BotSettings {
	enabled = DEFAULT_SETTINGS.enabled;
	prefix = DEFAULT_SETTINGS.prefix;
	platforms: BotPlatformSettings = { ...DEFAULT_SETTINGS.platforms };
	moderationEnabled = DEFAULT_SETTINGS.moderationEnabled;
	sendAsBot = DEFAULT_SETTINGS.sendAsBot;
	private store?: PluginStore;
	private app?: PluginAppApi;
	private unsubscribeRecords?: () => void;

	bind(store: PluginStore, app: PluginAppApi): void {
		if (this.store === store && this.app === app) {
			return;
		}

		this.unsubscribeRecords?.();
		this.store = store;
		this.app = app;
		this.unsubscribeRecords = app
			.records.open<BotSettingsSnapshot>(BOT_SETTINGS_COLLECTION)
			.onChange(() => {
				void this.load();
			});
	}

	private requireContext(): { store: PluginStore; app: PluginAppApi } {
		if (!this.store || !this.app) {
			throw new Error('BotSettings service has not been bound to a plugin store');
		}

		return { store: this.store, app: this.app };
	}

	private async migrate(store: PluginStore, app: PluginAppApi): Promise<void> {
		if (await store.get<boolean>(RECORDS_MIGRATION_KEY)) {
			return;
		}

		const records = app.records.open<BotSettingsSnapshot>(BOT_SETTINGS_COLLECTION);
		const existing = await records.list();

		if (existing.length === 0) {
			const saved = await store.get<BotSettingsSnapshot>(SETTINGS_KEY);
			if (saved) {
				await records.create({ ...saved, id: BOT_SETTINGS_ID });
			}
		}

		await store.set(RECORDS_MIGRATION_KEY, true);
		await store.delete(SETTINGS_KEY);
	}

	private async getSavedSettings(
		records: PluginAppRecordCollectionApi
	): Promise<(BotSettingsSnapshot & { id: string }) | undefined> {
		return (
			(await records.get<BotSettingsSnapshot>(BOT_SETTINGS_ID)) ??
			(await records.list<BotSettingsSnapshot>())[0]
		);
	}

	async load(): Promise<void> {
		const { store, app } = this.requireContext();
		const records = app.records.open<BotSettingsSnapshot>(BOT_SETTINGS_COLLECTION);
		await this.migrate(store, app);
		await app.waitForConfigSync();
		const saved = await this.getSavedSettings(records);

		if (!saved) {
			return;
		}

		this.enabled = saved.enabled ?? DEFAULT_SETTINGS.enabled;
		this.prefix = saved.prefix?.trim() || DEFAULT_SETTINGS.prefix;
		this.platforms = {
			twitch: saved.platforms?.twitch ?? DEFAULT_SETTINGS.platforms.twitch,
			youtube: saved.platforms?.youtube ?? DEFAULT_SETTINGS.platforms.youtube
		};
		this.moderationEnabled = saved.moderationEnabled ?? DEFAULT_SETTINGS.moderationEnabled;
		this.sendAsBot = saved.sendAsBot ?? DEFAULT_SETTINGS.sendAsBot;
	}

	async save(): Promise<void> {
		const { store, app } = this.requireContext();
		const records = app.records.open<BotSettingsSnapshot>(BOT_SETTINGS_COLLECTION);
		await this.migrate(store, app);
		const existing = await this.getSavedSettings(records);

		if (existing) {
			await records.update(existing.id, this.getSnapshot());
		} else {
			await records.create({ ...this.getSnapshot(), id: BOT_SETTINGS_ID });
		}
	}

	getSnapshot(): BotSettingsSnapshot {
		return {
			enabled: this.enabled,
			prefix: this.prefix.trim() || DEFAULT_SETTINGS.prefix,
			platforms: { ...this.platforms },
			moderationEnabled: this.moderationEnabled,
			sendAsBot: this.sendAsBot
		};
	}
}
