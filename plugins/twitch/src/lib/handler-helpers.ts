import type { App } from '@stream-kit/app/api';

import { getBroadcasterId, getBroadcasterName, getChannelFromContext } from './broadcaster';

export function resolveBroadcasterId(
	context: { broadcasterId?: string },
	app: App
): string | undefined {
	return context.broadcasterId || getBroadcasterId(app);
}

export function resolveChannel(
	context: { channel?: string },
	app: App
): string | undefined {
	return getChannelFromContext(context, app);
}

export function resolveUserFromContext(
	context: { user?: string; userId?: string },
	fieldUser?: string
): { userId?: string; userName?: string } {
	if (fieldUser?.trim()) {
		return { userName: fieldUser.trim() };
	}

	return {
		userId: context.userId,
		userName: context.user
	};
}

export { getBroadcasterId, getBroadcasterName };
