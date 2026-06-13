import type { PluginAppApi } from '@stream-kit/plugin';
import type { TwitchPluginApi } from './twitch';

export function getTwitch(app: PluginAppApi): TwitchPluginApi {
	return app.plugins.get<TwitchPluginApi>('twitch');
}

export function tryGetTwitch(app: PluginAppApi): TwitchPluginApi | undefined {
	return app.plugins.tryGet<TwitchPluginApi>('twitch');
}
