import type { PluginAppApi } from '@stream-kit/plugin';
import { getTwitch } from './plugin-api';

export function getBroadcasterId(app: PluginAppApi): string | undefined {
	return getTwitch(app).userId;
}

export function getBroadcasterName(app: PluginAppApi): string | undefined {
	return getTwitch(app).token?.userName ?? undefined;
}

export function getChannelFromContext(
	context: { channel?: string },
	app: PluginAppApi
): string | undefined {
	return context.channel ?? getBroadcasterName(app);
}