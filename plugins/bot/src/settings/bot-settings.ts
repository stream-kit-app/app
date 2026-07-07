import type { PluginStore } from '@stream-kit/plugin';

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

	async load(store: PluginStore): Promise<void> {
		const saved = await store.get<BotSettingsSnapshot>(SETTINGS_KEY);

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

	async save(store: PluginStore): Promise<void> {
		await store.set(SETTINGS_KEY, this.getSnapshot());
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
