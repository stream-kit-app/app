import type { RecordModel } from 'pocketbase';

import {
	isMembershipEntitled,
	parsePbDateToMs
} from './subscription-entitlement';
import type { AuthAccount, AuthPublicSubscription, AuthPublicUser } from './types';

export const AUTH_AVATAR_MAX_BYTES = 5 * 1024 * 1024;
export const AUTH_AVATAR_MIME_TYPES = new Set([
	'image/jpeg',
	'image/png',
	'image/webp',
	'image/gif'
]);

/** Expand plan on a `user_subscriptions` list/get request. */
export const AUTH_MEMBERSHIP_EXPAND = 'subscription';

/** Strip trailing slash; return null when unset/blank. */
export function resolvePocketBaseUrl(raw: string | undefined | null): string | null {
	if (typeof raw !== 'string' || !raw.trim()) {
		return null;
	}
	return raw.trim().replace(/\/$/, '');
}

/** Map an expanded `subscriptions` catalog record to a public plan label. */
export function toPublicSubscription(plan: unknown): AuthPublicSubscription | null {
	if (!plan || typeof plan !== 'object') {
		return null;
	}

	const record = plan as Record<string, unknown>;
	if (record.enabled === false) {
		return null;
	}

	const key = typeof record.key === 'string' ? record.key.trim() : '';
	const name = typeof record.name === 'string' ? record.name.trim() : '';
	if (!key || !name) {
		return null;
	}

	const maxFileBytes =
		typeof record.maxFileBytes === 'number'
			? record.maxFileBytes
			: Number(record.maxFileBytes) || 0;
	const maxStorageBytes =
		typeof record.maxStorageBytes === 'number'
			? record.maxStorageBytes
			: Number(record.maxStorageBytes) || 0;

	return { key, name, maxFileBytes, maxStorageBytes };
}

/**
 * Map a `user_subscriptions` row (with `expand.subscription`) to a public plan label.
 * Active and cancelled-in-grace memberships are entitled; others yield `null`.
 */
export function toPublicSubscriptionFromMembership(
	membership: unknown
): AuthPublicSubscription | null {
	if (!membership || typeof membership !== 'object') {
		return null;
	}

	const record = membership as Record<string, unknown>;
	if (!isMembershipEntitled(record)) {
		return null;
	}

	const plan =
		record.expand && typeof record.expand === 'object'
			? (record.expand as Record<string, unknown>).subscription
			: undefined;

	const publicPlan = toPublicSubscription(plan);
	if (!publicPlan) {
		return null;
	}

	if (record.status === 'cancelled') {
		const endsAtMs = parsePbDateToMs(record.endsAt);
		if (endsAtMs != null) {
			return { ...publicPlan, endsAt: new Date(endsAtMs).toISOString() };
		}
	}

	return publicPlan;
}

export function toPublicUser(
	getFileUrl: (record: RecordModel, filename: string) => string,
	record: RecordModel | null | undefined,
	subscription: AuthPublicSubscription | null = null
): AuthPublicUser | null {
	if (!record?.id) {
		return null;
	}

	const avatar =
		typeof record.avatar === 'string' && record.avatar.length > 0 ? record.avatar : null;
	const name = typeof record.name === 'string' && record.name.trim() ? record.name.trim() : null;

	return {
		id: record.id,
		name,
		avatarUrl: avatar ? getFileUrl(record, avatar) : null,
		verified: Boolean(record.verified),
		subscription
	};
}

export function toAccount(
	getFileUrl: (record: RecordModel, filename: string) => string,
	record: RecordModel | null | undefined,
	subscription: AuthPublicSubscription | null = null
): AuthAccount | null {
	const publicUser = toPublicUser(getFileUrl, record, subscription);
	if (!publicUser || !record) {
		return null;
	}

	const email = typeof record.email === 'string' ? record.email : '';
	const avatar =
		typeof record.avatar === 'string' && record.avatar.length > 0 ? record.avatar : null;

	return {
		...publicUser,
		email,
		avatar
	};
}

export function validateAvatarFile(file: File): string | null {
	if (!AUTH_AVATAR_MIME_TYPES.has(file.type)) {
		return 'Avatar must be a JPEG, PNG, WebP, or GIF image.';
	}
	if (file.size > AUTH_AVATAR_MAX_BYTES) {
		return 'Avatar must be 5 MB or smaller.';
	}
	return null;
}

type PocketBaseFieldError = {
	message?: unknown;
};

function pocketBaseStatus(error: unknown): number | null {
	if (!error || typeof error !== 'object') {
		return null;
	}
	const status = 'status' in error ? (error as { status?: unknown }).status : undefined;
	return typeof status === 'number' ? status : null;
}

/** True when the PocketBase JS SDK aborted a duplicate in-flight request. */
export function isPocketBaseAutoCancelled(error: unknown): boolean {
	if (!error || typeof error !== 'object') {
		return false;
	}

	const status = pocketBaseStatus(error);
	const message =
		'message' in error && typeof (error as { message?: unknown }).message === 'string'
			? (error as { message: string }).message
			: '';

	if (status === 0 && /abort|autocancel/i.test(message)) {
		return true;
	}

	if (error instanceof Error && error.name === 'AbortError') {
		return true;
	}

	const cause = 'cause' in error ? (error as { cause?: unknown }).cause : undefined;
	if (cause instanceof Error && cause.name === 'AbortError') {
		return true;
	}

	return false;
}

/** True when PocketBase reports the record was not found (safe to create). */
export function isPocketBaseNotFound(error: unknown): boolean {
	return pocketBaseStatus(error) === 404;
}

/** True when PocketBase reports unauthorized (expired/invalid auth). */
export function isPocketBaseUnauthorized(error: unknown): boolean {
	return pocketBaseStatus(error) === 401;
}

/**
 * Prefer field-level PocketBase validation messages; fall back to top-level message.
 */
export function pocketBaseErrorMessage(error: unknown, fallback: string): string {
	if (error && typeof error === 'object') {
		const response =
			'response' in error && error.response && typeof error.response === 'object'
				? (error.response as { data?: unknown; message?: unknown })
				: 'data' in error && error.data && typeof error.data === 'object'
					? (error.data as { data?: unknown; message?: unknown })
					: null;

		const fieldData = response && 'data' in response ? response.data : null;
		if (fieldData && typeof fieldData === 'object') {
			const fieldMessages: string[] = [];
			for (const value of Object.values(fieldData as Record<string, PocketBaseFieldError>)) {
				if (value && typeof value === 'object' && typeof value.message === 'string') {
					const message = value.message.trim();
					if (message) {
						fieldMessages.push(message);
					}
				}
			}
			if (fieldMessages.length > 0) {
				return fieldMessages.join(' ');
			}
		}

		if (response && typeof response.message === 'string' && response.message.trim()) {
			return response.message.trim();
		}

		if ('message' in error) {
			const message = (error as { message?: unknown }).message;
			if (typeof message === 'string' && message.trim()) {
				return message.trim();
			}
		}
	}

	if (error instanceof Error && error.message.trim()) {
		return error.message.trim();
	}

	return fallback;
}

/** Thrown when account create succeeded but the follow-up sign-in failed. */
export class AuthCreatedButSignInFailedError extends Error {
	readonly email: string;

	constructor(email: string, message: string) {
		super(message);
		this.name = 'AuthCreatedButSignInFailedError';
		this.email = email;
	}
}
