import type { PluginAppApi } from '@stream-kit/plugin';

import type { YouTubeApiClient } from './api-client';
import type { StreamContext } from '../contexts';
import { YOUTUBE_EVENTS } from './event-hub';
import type { YouTubeChannelInfo, YouTubeLiveStreamInfo } from './types';

type StreamHandler = (context: StreamContext) => void;

const streamHandlers = {
	online: new Set<StreamHandler>(),
	offline: new Set<StreamHandler>()
};

function emitOnline(context: StreamContext): void {
	for (const handler of streamHandlers.online) {
		handler(context);
	}
}

function emitOffline(context: StreamContext): void {
	for (const handler of streamHandlers.offline) {
		handler(context);
	}
}

export function startBroadcastMonitor(
	_client: PluginAppApi,
	client: YouTubeApiClient,
	channel: YouTubeChannelInfo,
	onStreamChange: (stream: YouTubeLiveStreamInfo | undefined) => void
): () => void {
	let wasLive = false;
	let pollingTimer: ReturnType<typeof setTimeout> | undefined;
	let stopped = false;
	let failures = 0;
	/** "Stream started" fires once per broadcast, even if polling flaps. */
	let announcedBroadcastId: string | undefined;

	const poll = async () => {
		if (stopped) {
			return;
		}

		let activeStream: YouTubeLiveStreamInfo | undefined;
		try {
			activeStream = await client.getActiveLiveStream();
			failures = 0;
		} catch (error) {
			// An outage or quota error says nothing about the stream: keep the current
			// state (don't fire offline/online) and try again with backoff.
			failures += 1;
			console.warn('[youtube] Broadcast check failed', error);
			if (!stopped) {
				pollingTimer = setTimeout(poll, Math.min(5_000 * 2 ** failures, 60_000));
			}
			return;
		}

		if (stopped) {
			return;
		}

		const isLive = activeStream != null;
		const baseContext: StreamContext = {
			channelId: channel.channelId,
			channel: channel.channelTitle,
			broadcastId: activeStream?.broadcastId,
			title: activeStream?.title
		};

		if (isLive && !wasLive) {
			if (activeStream?.broadcastId !== announcedBroadcastId) {
				announcedBroadcastId = activeStream?.broadcastId;
				emitOnline(baseContext);
			}
		} else if (!isLive && wasLive) {
			emitOffline({
				...baseContext,
				broadcastId: undefined,
				title: undefined
			});
		}

		wasLive = isLive;
		onStreamChange(activeStream);

		pollingTimer = setTimeout(poll, isLive ? 15_000 : 5_000);
	};

	void poll();

	return () => {
		stopped = true;

		if (pollingTimer) {
			clearTimeout(pollingTimer);
		}
	};
}

export function subscribeStreamOnline(handler: StreamHandler): () => void {
	streamHandlers.online.add(handler);

	return () => {
		streamHandlers.online.delete(handler);
	};
}

export function subscribeStreamOffline(handler: StreamHandler): () => void {
	streamHandlers.offline.add(handler);

	return () => {
		streamHandlers.offline.delete(handler);
	};
}

export { YOUTUBE_EVENTS };
