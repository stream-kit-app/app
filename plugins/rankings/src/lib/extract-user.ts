import type { RankingsPlatform } from './types';

const USERNAME_KEYS = ['username', 'userName', 'user', 'login'] as const;
const USER_ID_KEYS = ['userId', 'user_id'] as const;

export function extractUsername(data: unknown): string | undefined {
	if (!data || typeof data !== 'object') {
		return undefined;
	}

	const record = data as Record<string, unknown>;

	for (const key of USERNAME_KEYS) {
		const value = record[key];

		if (typeof value === 'string' && value.trim()) {
			return value.trim();
		}
	}

	return undefined;
}

export function extractUserId(data: unknown, platform: RankingsPlatform = 'unknown'): string | undefined {
	if (!data || typeof data !== 'object') {
		return undefined;
	}

	const record = data as Record<string, unknown>;

	for (const key of USER_ID_KEYS) {
		const value = record[key];

		if (typeof value === 'string' && value.trim()) {
			return `${platform}:${value.trim()}`;
		}
	}

	const username = extractUsername(data);

	if (!username) {
		return undefined;
	}

	return `${platform}:${username.toLowerCase()}`;
}

export function extractPlatform(data: unknown): RankingsPlatform {
	if (!data || typeof data !== 'object') {
		return 'unknown';
	}

	const record = data as Record<string, unknown>;
	const platform = record.platform;

	if (platform === 'twitch' || platform === 'youtube') {
		return platform;
	}

	if ('broadcasterId' in record || 'bits' in record || 'msg' in record) {
		return 'twitch';
	}

	return 'unknown';
}

export function resolveUserIdentity(
	data: unknown,
	platformOverride?: RankingsPlatform
): { userId: string; username: string; platform: RankingsPlatform } | null {
	const platform = platformOverride ?? extractPlatform(data);
	const username = extractUsername(data);

	if (!username) {
		return null;
	}

	const userId = extractUserId(data, platform) ?? `${platform}:${username.toLowerCase()}`;

	return { userId, username, platform };
}

export function formatWatchTime(seconds: number): string {
	const totalMinutes = Math.floor(seconds / 60);
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;

	if (hours > 0) {
		return `${hours}h ${minutes}m`;
	}

	return `${minutes}m`;
}
