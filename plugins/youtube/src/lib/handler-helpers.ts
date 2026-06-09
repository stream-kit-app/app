import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerTriggerContext } from '@stream-kit/core';

import { getYouTube } from './plugin-api';

export function resolveLiveChatId(
	context: HandlerTriggerContext,
	app: PluginAppApi
): string | undefined {
	const data = context.data as { liveChatId?: string } | undefined;

	return data?.liveChatId || getYouTube(app).liveChatId;
}

export function resolveChannelTitle(
	context: HandlerTriggerContext,
	app: PluginAppApi
): string | undefined {
	const data = context.data as { channel?: string } | undefined;

	return data?.channel || getYouTube(app).channelTitle;
}
