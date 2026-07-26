import type { RankingsPlatform, UserRankingRecord } from './types';

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

export function formatPlatformUserId(platform: RankingsPlatform, localId: string): string {
	const trimmed = localId.trim();

	if (!trimmed) {
		return `${platform}:`;
	}

	if (trimmed.startsWith(`${platform}:`)) {
		return trimmed;
	}

	const existingPlatform = parsePlatformFromUserId(trimmed);

	if (existingPlatform !== 'unknown' && trimmed.includes(':')) {
		return trimmed;
	}

	return `${platform}:${trimmed}`;
}

export function extractUserId(data: unknown, platform: RankingsPlatform = 'unknown'): string | undefined {
	if (!data || typeof data !== 'object') {
		return undefined;
	}

	const record = data as Record<string, unknown>;

	for (const key of USER_ID_KEYS) {
		const value = record[key];

		if (typeof value === 'string' && value.trim()) {
			return formatPlatformUserId(platform, value);
		}
	}

	const username = extractUsername(data);

	if (!username) {
		return undefined;
	}

	return formatPlatformUserId(platform, username.toLowerCase());
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

	const userId = extractUserId(data, platform) ?? formatPlatformUserId(platform, username.toLowerCase());

	return { userId, username, platform };
}

export function parsePlatformFromUserId(userId: string): RankingsPlatform {
	const [prefix] = userId.split(':', 2);

	if (prefix === 'twitch' || prefix === 'youtube') {
		return prefix;
	}

	return 'unknown';
}

export function localIdFromUserId(userId: string): string {
	const separator = userId.indexOf(':');

	if (separator === -1) {
		return userId;
	}

	return userId.slice(separator + 1);
}

/** True when the id uses a numeric platform id (e.g. `twitch:123456`) rather than a username key. */
export function isNumericPlatformUserId(userId: string): boolean {
	return /^\d+$/.test(localIdFromUserId(userId));
}

export function platformsCompatible(
	left: RankingsPlatform,
	right: RankingsPlatform
): boolean {
	return left === right || left === 'unknown' || right === 'unknown';
}

export function usernamesMatch(left: string, right: string): boolean {
	return left.trim().toLowerCase() === right.trim().toLowerCase();
}

export function findUserByIdentity<
	T extends { userId: string; username: string; platform: RankingsPlatform }
>(
	users: T[],
	input: { userId: string; username?: string; platform?: RankingsPlatform }
): T | undefined {
	const direct = users.find((user) => user.userId === input.userId);

	if (direct) {
		return direct;
	}

	const username = input.username?.trim();

	if (!username) {
		return undefined;
	}

	const platform = input.platform ?? parsePlatformFromUserId(input.userId);

	return users.find(
		(user) =>
			usernamesMatch(user.username, username) && platformsCompatible(user.platform, platform)
	);
}

/**
 * Rebind only when upgrading toward a more stable id (username-key → numeric),
 * never when that would downgrade a numeric id back to a username key.
 */
export function shouldRebindUserId(
	existing: UserRankingRecord,
	canonical: { userId: string; username: string; platform: RankingsPlatform }
): boolean {
	if (
		existing.userId === canonical.userId ||
		!usernamesMatch(existing.username, canonical.username) ||
		!platformsCompatible(existing.platform, canonical.platform)
	) {
		return false;
	}

	const existingNumeric = isNumericPlatformUserId(existing.userId);
	const canonicalNumeric = isNumericPlatformUserId(canonical.userId);

	if (canonicalNumeric && !existingNumeric) {
		return true;
	}

	if (!canonicalNumeric && existingNumeric) {
		return false;
	}

	return canonicalNumeric;
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
