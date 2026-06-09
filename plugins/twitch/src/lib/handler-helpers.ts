import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerTriggerContext } from '@stream-kit/core';

import { getBroadcasterId, getBroadcasterName, getChannelFromContext } from './broadcaster';

export function resolveBroadcasterId(
	context: HandlerTriggerContext,
	app: PluginAppApi
): string | undefined {
	const data = context.data as { broadcasterId?: string } | undefined;

	return data?.broadcasterId || getBroadcasterId(app);
}

export function resolveChannel(context: HandlerTriggerContext, app: PluginAppApi): string | undefined {
	const data = context.data as { channel?: string } | undefined;

	return getChannelFromContext(data ?? {}, app);
}

export function resolveUserFromContext(
	context: HandlerTriggerContext,
	fieldUser?: string
): { userId?: string; userName?: string } {
	if (fieldUser?.trim()) {
		return { userName: fieldUser.trim() };
	}

	const data = context.data as { user?: string; userId?: string } | undefined;

	return {
		userId: data?.userId,
		userName: data?.user
	};
}

export { getBroadcasterId, getBroadcasterName };
