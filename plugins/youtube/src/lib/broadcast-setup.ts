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

	const poll = async () => {
		if (stopped) {
			return;
		}

		const activeStream = await client.getActiveLiveStream();
		const isLive = activeStream != null;
		const baseContext: StreamContext = {
			channelId: channel.channelId,
			channel: channel.channelTitle,
			broadcastId: activeStream?.broadcastId,
			title: activeStream?.title
		};

		if (isLive && !wasLive) {
			emitOnline(baseContext);
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
