import type { PluginAppApi } from '@stream-kit/app/api';

import { getYouTube } from './plugin-api';

export function resolveLiveChatId(
	context: { liveChatId?: string },
	app: PluginAppApi
): string | undefined {
	return context.liveChatId || getYouTube(app).liveChatId;
}

export function resolveChannelTitle(
	context: { channel?: string },
	app: PluginAppApi
): string | undefined {
	return context.channel || getYouTube(app).channelTitle;
}
