import type { RolePlatform } from '../app/lib/stored-role';

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

export function formatPlatformUserId(platform: RolePlatform, localId: string): string {
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

export function extractUserId(
	data: unknown,
	platform: RolePlatform = 'unknown'
): string | undefined {
	if (!data || typeof data !== 'object') {
		return undefined;
	}

	const record = data as Record<string, unknown>;

	for (const key of USER_ID_KEYS) {
		const value = record[key];

		if (typeof value === 'string' && value.trim()) {
			return formatPlatformUserId(platform, value);
		}

		if (typeof value === 'number' && Number.isFinite(value)) {
			return formatPlatformUserId(platform, String(value));
		}
	}

	const username = extractUsername(data);

	if (!username) {
		return undefined;
	}

	return formatPlatformUserId(platform, username.toLowerCase());
}

export function extractPlatform(data: unknown): RolePlatform {
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
	platformOverride?: RolePlatform
): { userId: string; username: string; platform: RolePlatform } | null {
	const platform = platformOverride ?? extractPlatform(data);
	const username = extractUsername(data);

	if (!username) {
		return null;
	}

	const userId =
		extractUserId(data, platform) ?? formatPlatformUserId(platform, username.toLowerCase());

	return { userId, username, platform };
}

export function parsePlatformFromUserId(userId: string): RolePlatform {
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

export function usernamesMatch(left: string, right: string): boolean {
	return left.trim().toLowerCase() === right.trim().toLowerCase();
}

export function memberMatchesIdentity(
	memberId: string,
	memberName: string | undefined,
	identity: { userId: string; username?: string; platform?: RolePlatform }
): boolean {
	if (memberId === identity.userId) {
		return true;
	}

	const username = identity.username?.trim();

	if (!username) {
		return false;
	}

	if (memberName && usernamesMatch(memberName, username)) {
		return true;
	}

	return usernamesMatch(localIdFromUserId(memberId), username);
}
