import type { PluginAppApi } from '@stream-kit/plugin';

import type { DiscordPluginApi } from './discord';

export function getDiscord(app: PluginAppApi): DiscordPluginApi {
	return app.plugins.get<DiscordPluginApi>('discord');
}

export function tryGetDiscord(app: PluginAppApi): DiscordPluginApi | undefined {
	return app.plugins.tryGet<DiscordPluginApi>('discord');
}
