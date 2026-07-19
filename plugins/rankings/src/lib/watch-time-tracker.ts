import type { PluginAppApi } from '@stream-kit/plugin';

import type { RankingsService } from '../app/lib/rankings.svelte';
import { formatPlatformUserId } from './extract-user';

type ActiveViewer = {
	username: string;
	userId?: string;
	joinedAt: number;
	lastAwardSlot: number;
};

type TwitchChatClient = {
	onJoin(handler: (channel: string, user: string) => void): { unbind(): void };
	onPart(handler: (channel: string, user: string) => void): { unbind(): void };
};

type HelixChatChatter = {
	userId: string;
	userName: string;
};

type TwitchPluginApi = {
	isConnected?: boolean;
	userId?: string;
	chat?: TwitchChatClient;
	client?: {
		chat: {
			getChatters(
				broadcasterId: string,
				pagination?: { after?: string; limit?: number }
			): Promise<{ data: HelixChatChatter[]; cursor?: string | null }>;
		};
	};
	subscribe?(listener: () => void): () => void;
};

export class WatchTimeTracker {
	private unsubscribeJoinPart: (() => void) | null = null;
	private unsubscribeTwitch: (() => void) | null = null;
	private intervalId: ReturnType<typeof setInterval> | null = null;
	private activeViewers = new Map<string, ActiveViewer>();
	private running = false;

	constructor(
		private readonly app: PluginAppApi,
		private readonly rankings: RankingsService
	) {}

	start(options?: { clearViewers?: boolean }): void {
		this.stop({ clearViewers: options?.clearViewers ?? true });
		this.running = true;
		this.bindTwitchState();
		this.bindJoinPart();
		this.restartInterval();
	}

	/** Rebind listeners and refresh the interval without dropping active viewers. */
	restart(): void {
		if (!this.running) {
			this.start({ clearViewers: false });
			return;
		}

		this.unsubscribeJoinPart?.();
		this.unsubscribeJoinPart = null;
		this.bindJoinPart();
		this.restartInterval();
	}

	stop(options?: { clearViewers?: boolean }): void {
		this.running = false;
		this.unsubscribeJoinPart?.();
		this.unsubscribeJoinPart = null;
		this.unsubscribeTwitch?.();
		this.unsubscribeTwitch = null;

		if (this.intervalId != null) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}

		if (options?.clearViewers !== false) {
			this.activeViewers.clear();
		}
	}

	private restartInterval(): void {
		if (this.intervalId != null) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}

		const intervalMs = Math.max(1, this.rankings.settings.awardIntervalSeconds) * 1000;

		this.intervalId = setInterval(() => {
			void this.awardIntervalPoints();
		}, intervalMs);
	}

	private getTwitch(): TwitchPluginApi | undefined {
		return this.app.plugins.tryGet<TwitchPluginApi>('twitch');
	}

	private currentAwardSlot(): number {
		const intervalMs = Math.max(1, this.rankings.settings.awardIntervalSeconds) * 1000;
		return Math.floor(Date.now() / intervalMs);
	}

	private markPresent(username: string, userId?: string): void {
		const key = username.toLowerCase();
		const existing = this.activeViewers.get(key);

		if (existing) {
			if (userId && !existing.userId) {
				existing.userId = userId;
				this.activeViewers.set(key, existing);
			}
			return;
		}

		this.activeViewers.set(key, {
			username,
			userId,
			joinedAt: Date.now(),
			lastAwardSlot: this.currentAwardSlot()
		});
	}

	private bindTwitchState(): void {
		if (this.unsubscribeTwitch) {
			return;
		}

		const twitch = this.getTwitch();

		if (!twitch?.subscribe) {
			return;
		}

		this.unsubscribeTwitch = twitch.subscribe(() => {
			if (!this.running || !this.rankings.settings.watchTimeEnabled) {
				return;
			}

			this.unsubscribeJoinPart?.();
			this.unsubscribeJoinPart = null;
			this.bindJoinPart();
		});
	}

	private bindJoinPart(): void {
		if (this.unsubscribeJoinPart || !this.rankings.settings.watchTimeEnabled) {
			return;
		}

		const twitch = this.getTwitch();
		const chat = twitch?.chat;

		if (!chat || !twitch?.isConnected) {
			return;
		}

		const onJoin = (_channel: string, user: string) => {
			this.markPresent(user);
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

	private ensureJoinPartBound(): void {
		if (!this.running || this.unsubscribeJoinPart || !this.rankings.settings.watchTimeEnabled) {
			return;
		}

		this.bindJoinPart();
	}

	private async syncChattersFromHelix(twitch: TwitchPluginApi): Promise<void> {
		const broadcasterId = twitch.userId;
		const client = twitch.client;

		if (!broadcasterId || !client?.chat?.getChatters) {
			return;
		}

		const present = new Map<string, HelixChatChatter>();
		let cursor: string | undefined;

		try {
			do {
				const page = await client.chat.getChatters(broadcasterId, {
					after: cursor,
					limit: 1000
				});

				for (const chatter of page.data ?? []) {
					if (!chatter?.userName) {
						continue;
					}

					present.set(chatter.userName.toLowerCase(), chatter);
				}

				cursor = page.cursor ?? undefined;
			} while (cursor);
		} catch (error) {
			console.warn('[rankings] Failed to sync Twitch chatters for watch time', error);
			return;
		}

		for (const chatter of present.values()) {
			this.markPresent(chatter.userName, chatter.userId);
		}

		for (const key of this.activeViewers.keys()) {
			if (!present.has(key)) {
				this.activeViewers.delete(key);
			}
		}
	}

	private resolveViewerUserId(viewer: ActiveViewer): string {
		if (viewer.userId) {
			return formatPlatformUserId('twitch', viewer.userId);
		}

		const key = viewer.username.toLowerCase();
		const fallbackId = formatPlatformUserId('twitch', key);
		const match = this.rankings.resolveUser({
			userId: fallbackId,
			username: viewer.username,
			platform: 'twitch'
		});

		return match?.userId ?? fallbackId;
	}

	private async awardIntervalPoints(): Promise<void> {
		if (!this.rankings.settings.watchTimeEnabled) {
			return;
		}

		this.ensureJoinPartBound();

		const twitch = this.getTwitch();

		if (!twitch?.isConnected) {
			return;
		}

		await this.syncChattersFromHelix(twitch);

		const currentSlot = this.currentAwardSlot();
		const pointsPerInterval = Math.max(
			0,
			Math.floor(
				(this.rankings.settings.pointsPerMinute * this.rankings.settings.awardIntervalSeconds) / 60
			)
		);

		for (const [key, viewer] of this.activeViewers) {
			if (viewer.lastAwardSlot >= currentSlot) {
				continue;
			}

			viewer.lastAwardSlot = currentSlot;
			this.activeViewers.set(key, viewer);

			const userId = this.resolveViewerUserId(viewer);

			await this.rankings.addWatchTime({
				userId,
				username: viewer.username,
				platform: 'twitch',
				seconds: this.rankings.settings.awardIntervalSeconds
			});

			if (pointsPerInterval <= 0) {
				continue;
			}

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
