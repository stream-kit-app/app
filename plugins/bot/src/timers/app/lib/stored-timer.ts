export type TimerPlatform = 'twitch' | 'youtube';

export type TimerRecord = {
	id: number;
	name: string;
	messages: string[];
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
