import type { PluginAppApi } from '@stream-kit/plugin';

import type { BotSettings } from '../settings/bot-settings';
import type { TimerPlatform, TimerRecord, TimerTriggerContext } from '../timers/app/lib/stored-timer';

type TwitchStreamApi = {
	readonly userId?: string;
	readonly isConnected?: boolean;
	readonly client?: {
		streams: {
			getStreamByUserId(userId: string): Promise<{ startDate: Date } | null>;
		};
	};
};

type YouTubeStreamApi = {
	readonly isLive?: boolean;
	readonly liveChatId?: string;
};

type TimerState = {
	nextDueAt: number;
	linesSinceSend: number;
};

export type RunTimerFn = (id: string, data: TimerTriggerContext) => void;

export class TimerScheduler {
	private tickTimer: ReturnType<typeof setInterval> | undefined;
	private chatLineCount = 0;
	private timerStates = new Map<string, TimerState>();

	constructor(
		private readonly app: PluginAppApi,
		private readonly settings: BotSettings,
		private getTimers: () => TimerRecord[],
		private runTimer: RunTimerFn
	) {}

	start(): void {
		this.stop();
		this.syncStates();
		this.tickTimer = setInterval(() => {
			void this.tick();
		}, 30_000);
	}

	stop(): void {
		if (this.tickTimer) {
			clearInterval(this.tickTimer);
			this.tickTimer = undefined;
		}
	}

	onChatLine(): void {
		this.chatLineCount += 1;
		void this.tick();
	}

	private syncStates(): void {
		const timers = this.getTimers();

		for (const timer of timers) {
			if (!this.timerStates.has(timer.id)) {
				this.timerStates.set(timer.id, this.createState(timer));
			}
		}

		for (const id of this.timerStates.keys()) {
			if (!timers.some((timer) => timer.id === id)) {
				this.timerStates.delete(id);
			}
		}
	}

	private createState(timer: TimerRecord): TimerState {
		return {
			nextDueAt: Date.now() + this.randomIntervalMs(timer),
			linesSinceSend: 0
		};
	}

	private randomIntervalMs(timer: TimerRecord): number {
		const min = timer.intervalMinSec * 1000;
		const max = timer.intervalMaxSec * 1000;

		return min + Math.floor(Math.random() * (max - min + 1));
	}

	private async isPlatformLive(platform: TimerPlatform): Promise<boolean> {
		if (platform === 'twitch') {
			const twitch = this.app.plugins.tryGet<TwitchStreamApi>('twitch');

			if (!twitch?.isConnected || !twitch.userId || !twitch.client?.streams) {
				return false;
			}

			const stream = await twitch.client.streams.getStreamByUserId(twitch.userId);

			return stream != null;
		}

		const youtube = this.app.plugins.tryGet<YouTubeStreamApi>('youtube');

		return Boolean(youtube?.isLive && youtube.liveChatId);
	}

	private async isTimerLive(timer: TimerRecord): Promise<boolean> {
		for (const platform of timer.platforms) {
			if (await this.isPlatformLive(platform)) {
				return true;
			}
		}

		return false;
	}

	private async tick(): Promise<void> {
		if (!this.settings.enabled) {
			return;
		}

		this.syncStates();

		const now = Date.now();

		for (const timer of this.getTimers()) {
			if (!timer.enabled || timer.handlers.length === 0) {
				continue;
			}

			const state = this.timerStates.get(timer.id);

			if (!state) {
				continue;
			}

			if (timer.onlineOnly && !(await this.isTimerLive(timer))) {
				continue;
			}

			if (timer.minChatLines > 0 && this.chatLineCount - state.linesSinceSend < timer.minChatLines) {
				continue;
			}

			if (now < state.nextDueAt) {
				continue;
			}

			state.nextDueAt = now + this.randomIntervalMs(timer);
			state.linesSinceSend = this.chatLineCount;

			this.runTimer(timer.id, {
				timerId: timer.id,
				name: timer.name,
				platforms: timer.platforms,
				firedAt: new Date().toISOString()
			});
		}
	}
}
