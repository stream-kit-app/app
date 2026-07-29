/** Cancelled memberships remain entitled for 30 days. */
export const SUBSCRIPTION_GRACE_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * Parse a PocketBase date (ISO or `YYYY-MM-DD HH:mm:ss.SSSZ`) to epoch ms.
 */
export function parsePbDateToMs(value: unknown): number | null {
	if (value == null) {
		return null;
	}

	if (typeof value === 'number' && Number.isFinite(value)) {
		return value;
	}

	if (value instanceof Date) {
		const ms = value.getTime();
		return Number.isFinite(ms) ? ms : null;
	}

	if (typeof value !== 'string') {
		return null;
	}

	const trimmed = value.trim();
	if (!trimmed) {
		return null;
	}

	const normalized = trimmed.includes('T') ? trimmed : trimmed.replace(' ', 'T');
	const ms = Date.parse(normalized);
	return Number.isFinite(ms) ? ms : null;
}

/** Format epoch ms as a PocketBase-friendly date string. */
export function formatEndsAtIso(ms: number): string {
	return new Date(ms).toISOString().replace('T', ' ');
}

/**
 * Whether a membership currently unlocks cloud features.
 * Active → true; cancelled with endsAt in the future → true; otherwise false.
 */
export function isMembershipEntitled(
	membership: { status?: unknown; endsAt?: unknown },
	nowMs = Date.now()
): boolean {
	const status = typeof membership.status === 'string' ? membership.status : '';
	if (status === 'active') {
		return true;
	}
	if (status === 'cancelled') {
		const endsAtMs = parsePbDateToMs(membership.endsAt);
		return endsAtMs != null && endsAtMs > nowMs;
	}
	return false;
}
