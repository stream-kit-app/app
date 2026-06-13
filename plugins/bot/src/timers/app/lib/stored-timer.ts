import type { StoredActionHandler } from '@stream-kit/plugin/action';

export type TimerPlatform = 'twitch' | 'youtube';

export type TimerTriggerContext = {
	timerId: string;
	name: string;
	platforms: TimerPlatform[];
	firedAt: string;
};

export type TimerRecord = {
	id: string;
	name: string;
	handlers: StoredActionHandler[];
	intervalMinSec: number;
	intervalMaxSec: number;
	minChatLines: number;
	enabled: boolean;
	platforms: TimerPlatform[];
	onlineOnly: boolean;
	createdAt: Date;
	updatedAt: Date;
};

export type NewTimerRecord = Omit<TimerRecord, 'id' | 'createdAt' | 'updatedAt'>;

export const DEFAULT_TIMER_PLATFORMS: TimerPlatform[] = ['twitch', 'youtube'];
