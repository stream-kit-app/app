import type { PluginAppApi } from '@stream-kit/plugin';

import type { RankingsService } from '../app/lib/rankings.svelte';

type ActiveViewer = {
	username: string;
	joinedAt: number;
	lastAwardSlot: number;
};

type TwitchChatClient = {
	onJoin(handler: (channel: string, user: string) => void): { unbind(): void };
	onPart(handler: (channel: string, user: string) => void): { unbind(): void };
};

type TwitchPluginApi = {
	isConnected?: boolean;
	chat?: TwitchChatClient;
};

export class WatchTimeTracker {
	private unsubscribeJoinPart: (() => void) | null = null;
	private intervalId: ReturnType<typeof setInterval> | null = null;
	private activeViewers = new Map<string, ActiveViewer>();

	constructor(
		private readonly app: PluginAppApi,
		private readonly rankings: RankingsService
	) {}

	start(): void {
		this.stop();
		this.bindJoinPart();
		this.intervalId = setInterval(() => {
			void this.awardIntervalPoints();
		}, this.rankings.settings.awardIntervalSeconds * 1000);
	}

	stop(): void {
		this.unsubscribeJoinPart?.();
		this.unsubscribeJoinPart = null;

		if (this.intervalId != null) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}

		this.activeViewers.clear();
	}

	private getTwitch(): TwitchPluginApi | undefined {
		return this.app.plugins.tryGet<TwitchPluginApi>('twitch');
	}

	private bindJoinPart(): void {
		const twitch = this.getTwitch();
		const chat = twitch?.chat;

		if (!chat || !twitch?.isConnected || !this.rankings.settings.watchTimeEnabled) {
			return;
		}

		const onJoin = (_channel: string, user: string) => {
			const key = user.toLowerCase();

			this.activeViewers.set(key, {
				username: user,
				joinedAt: Date.now(),
				lastAwardSlot: Math.floor(Date.now() / (this.rankings.settings.awardIntervalSeconds * 1000))
			});
		};

		const onPart = (_channel: string, user: string) => {
			this.activeViewers.delete(user.toLowerCase());
		};

		const joinListener = chat.onJoin(onJoin);
		const partListener = chat.onPart(onPart);

		this.unsubscribeJoinPart = () => {
			joinListener.unbind();
			partListener.unbind();
		};
	}

	private async awardIntervalPoints(): Promise<void> {
		if (!this.rankings.settings.watchTimeEnabled) {
			return;
		}

		const twitch = this.getTwitch();

		if (!twitch?.isConnected) {
			return;
		}

		const intervalMs = this.rankings.settings.awardIntervalSeconds * 1000;
		const currentSlot = Math.floor(Date.now() / intervalMs);
		const pointsPerInterval = Math.max(
			0,
			Math.floor((this.rankings.settings.pointsPerMinute * this.rankings.settings.awardIntervalSeconds) / 60)
		);

		if (pointsPerInterval <= 0) {
			return;
		}

		for (const [key, viewer] of this.activeViewers) {
			if (viewer.lastAwardSlot >= currentSlot) {
				continue;
			}

			viewer.lastAwardSlot = currentSlot;
			this.activeViewers.set(key, viewer);

			const userId = `twitch:${key}`;

			await this.rankings.addWatchTime({
				userId,
				username: viewer.username,
				platform: 'twitch',
				seconds: this.rankings.settings.awardIntervalSeconds
			});

			await this.rankings.addPoints({
				userId,
				username: viewer.username,
				platform: 'twitch',
				amount: pointsPerInterval,
				source: 'watch-time'
			});
		}
	}
}
