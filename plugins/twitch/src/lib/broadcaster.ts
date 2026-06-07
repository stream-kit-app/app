import type { App } from '@stream-kit/app/api';

export function getBroadcasterId(app: App): string | undefined {
	return app.twitch.userId;
}

export function getBroadcasterName(app: App): string | undefined {
	return app.twitch.token?.userName ?? undefined;
}

export function getChannelFromContext(
	context: { channel?: string },
	app: App
): string | undefined {
	return context.channel ?? getBroadcasterName(app);
}
