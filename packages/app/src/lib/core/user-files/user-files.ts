import type { RecordModel } from 'pocketbase';

import { translate } from '$lib/i18n';

import type { Auth } from '../auth/auth.svelte';
import { pocketBaseErrorMessage } from '../auth/auth-utils';

import { extensionOf, mimeForCloudUpload, mimeFromFileName } from './mime-from-name';
import type {
	UserFileRecord,
	UserFilesListOptions,
	UserFilesQuota,
	UserFilesUploadOptions
} from './types';

/** Refresh file tokens this many ms before assumed expiry. */
const FILE_TOKEN_REFRESH_MARGIN_MS = 30_000;
/** Conservative TTL when PocketBase does not expose expiry (tokens are short-lived). */
const FILE_TOKEN_TTL_MS = 90_000;

function matchesListFilters(record: UserFileRecord, options?: UserFilesListOptions): boolean {
	if (options?.mimePrefix) {
		const prefix = options.mimePrefix.toLowerCase();
		const mime = (record.mimeType || mimeFromFileName(record.originalName)).toLowerCase();
		if (!mime.startsWith(prefix)) {
			return false;
		}
	}
	if (options?.extensions && options.extensions.length > 0) {
		const ext = extensionOf(record.originalName);
		const allowed = new Set(options.extensions.map((item) => item.toLowerCase().replace(/^\./, '')));
		if (!allowed.has(ext)) {
			return false;
		}
	}
	return true;
}

/**
 * Extract a host-independent PocketBase file path (`/api/files/...`) from a
 * relative path or absolute URL. Returns `null` when the value is not a PB file.
 */
export function toRelativeCloudFilePath(value: string | null | undefined): string | null {
	if (typeof value !== 'string' || !value.trim()) {
		return null;
	}

	const trimmed = value.trim();

	if (trimmed.startsWith('/api/files/')) {
		try {
			const parsed = new URL(trimmed, 'http://pocketbase.local');
			return parsed.pathname + parsed.search;
		} catch {
			return trimmed.split(/[?#]/)[0] || null;
		}
	}

	if (!/^https?:\/\//i.test(trimmed)) {
		return null;
	}

	try {
		const parsed = new URL(trimmed);
		if (!parsed.pathname.includes('/api/files/')) {
			return null;
		}
		return parsed.pathname + parsed.search;
	} catch {
		return null;
	}
}

/** True for relative `/api/files/...` paths or absolute PocketBase file URLs. */
export function isCloudFileUrl(value: string | null | undefined): boolean {
	return toRelativeCloudFilePath(value) != null;
}

/**
 * Resolve a stored cloud file ref to an absolute URL on `baseUrl`.
 * Absolute non-PB URLs are returned unchanged.
 */
export function resolveCloudFileUrl(
	value: string,
	baseUrl: string | null | undefined
): string {
	const trimmed = value.trim();
	const relative = toRelativeCloudFilePath(trimmed);
	if (!relative || !baseUrl) {
		return trimmed;
	}

	try {
		const base = new URL(baseUrl);
		return `${base.origin}${relative.split(/[?#]/)[0]}`;
	} catch {
		const origin = baseUrl.replace(/\/$/, '');
		return `${origin}${relative.split(/[?#]/)[0]}`;
	}
}

function appendFileToken(url: string, token: string): string {
	try {
		const parsed = new URL(url);
		parsed.searchParams.set('token', token);
		return parsed.toString();
	} catch {
		const sep = url.includes('?') ? '&' : '?';
		return `${url}${sep}token=${encodeURIComponent(token)}`;
	}
}

export class UserFiles {
	#auth: Auth;
	#fileToken: string | null = null;
	#fileTokenExpiresAt = 0;

	constructor(auth: Auth) {
		this.#auth = auth;
	}

	isCloudUrl(value: string | null | undefined): boolean {
		return isCloudFileUrl(value);
	}

	/**
	 * Absolute URL for the current PocketBase host.
	 * When a cached file token is available, appends `?token=` for protected files.
	 */
	resolveUrl(value: string): string {
		const baseUrl = this.#auth.isConfigured ? this.#auth.client.baseUrl : null;
		const absolute = resolveCloudFileUrl(value, baseUrl);
		if (!isCloudFileUrl(absolute) && !isCloudFileUrl(value)) {
			return absolute;
		}
		if (this.#fileToken && Date.now() < this.#fileTokenExpiresAt) {
			return appendFileToken(absolute, this.#fileToken);
		}
		return absolute;
	}

	/** Absolute protected-file URL with a fresh (or cached) file token. */
	async resolveAuthenticatedUrl(value: string): Promise<string> {
		const baseUrl = this.#auth.isConfigured ? this.#auth.client.baseUrl : null;
		const absolute = resolveCloudFileUrl(value, baseUrl);
		if (!isCloudFileUrl(absolute) && !isCloudFileUrl(value)) {
			return absolute;
		}
		const token = await this.ensureFileToken();
		return appendFileToken(absolute, token);
	}

	/** Ensure a short-lived PocketBase file token is cached; returns it. */
	async ensureFileToken(): Promise<string> {
		const pb = this.#requireClient();
		const now = Date.now();
		if (
			this.#fileToken &&
			now < this.#fileTokenExpiresAt - FILE_TOKEN_REFRESH_MARGIN_MS
		) {
			return this.#fileToken;
		}

		const token = await pb.files.getToken();
		this.#fileToken = token;
		this.#fileTokenExpiresAt = now + FILE_TOKEN_TTL_MS;
		return token;
	}

	clearFileToken(): void {
		this.#fileToken = null;
		this.#fileTokenExpiresAt = 0;
	}

	async list(options?: UserFilesListOptions): Promise<UserFileRecord[]> {
		const pb = this.#requireClient();
		const userId = this.#requireUserId();
		await this.ensureFileToken().catch(() => undefined);

		const result = await pb.collection('user_files').getFullList({
			filter: pb.filter('user={:id}', { id: userId }),
			sort: '-createdAt',
			requestKey: null
		});

		return result
			.map((record) => this.#toRecord(record))
			.filter((record): record is UserFileRecord => record != null)
			.filter((record) => matchesListFilters(record, options));
	}

	async upload(
		file: File | Blob,
		options: UserFilesUploadOptions
	): Promise<UserFileRecord> {
		const pb = this.#requireClient();
		const userId = this.#requireUserId();

		if (!this.#auth.user?.subscription) {
			throw new Error(
				translate('An active subscription is required to upload files to the cloud.')
			);
		}

		const originalName = options.originalName.trim() || 'upload.bin';
		const allowedMime = mimeForCloudUpload(originalName);
		if (!allowedMime) {
			throw new Error(
				translate('This file type is not allowed for cloud upload.')
			);
		}

		const size = typeof file.size === 'number' ? file.size : 0;
		const quota = await this.getQuota();
		if (quota) {
			if (quota.maxFileBytes > 0 && size > quota.maxFileBytes) {
				throw new Error(
					translate('This file exceeds the maximum upload size for your plan.')
				);
			}
			if (
				quota.maxStorageBytes > 0 &&
				quota.usedBytes + size > quota.maxStorageBytes
			) {
				throw new Error(
					translate('This upload would exceed your storage quota.')
				);
			}
		}

		const mimeType =
			(typeof file.type === 'string' &&
			file.type &&
			file.type !== 'application/octet-stream'
				? file.type
				: '') || allowedMime;
		const uploadFile = new File([file], originalName, {
			type: mimeType
		});

		const body = new FormData();
		body.set('user', userId);
		body.set('file', uploadFile, originalName);

		try {
			const created = await pb.collection('user_files').create(body);
			const record = this.#toRecord(created);
			if (!record) {
				throw new Error(translate('Could not upload file.'));
			}
			await this.ensureFileToken().catch(() => undefined);
			return record;
		} catch (error) {
			throw new Error(pocketBaseErrorMessage(error, translate('Could not upload file.')));
		}
	}

	async remove(id: string): Promise<void> {
		const pb = this.#requireClient();
		this.#requireUserId();

		try {
			await pb.collection('user_files').delete(id);
		} catch (error) {
			throw new Error(pocketBaseErrorMessage(error, translate('Could not delete file.')));
		}
	}

	async getQuota(): Promise<UserFilesQuota | null> {
		if (!this.#auth.isConfigured || !this.#auth.isAuthenticated) {
			return null;
		}

		const subscription = this.#auth.user?.subscription;
		if (!subscription) {
			return null;
		}

		const pb = this.#auth.client;
		const userId = this.#auth.user?.id;
		if (!userId) {
			return null;
		}

		const files = await pb.collection('user_files').getFullList({
			filter: pb.filter('user={:id}', { id: userId }),
			fields: 'size',
			requestKey: null
		});

		let usedBytes = 0;
		for (const row of files) {
			usedBytes += typeof row.size === 'number' ? row.size : Number(row.size) || 0;
		}

		return {
			usedBytes,
			maxStorageBytes: subscription.maxStorageBytes,
			maxFileBytes: subscription.maxFileBytes,
			planKey: subscription.key,
			planName: subscription.name
		};
	}

	async fetchBlob(url: string): Promise<Blob> {
		this.#requireClient();
		if (!isCloudFileUrl(url)) {
			throw new Error(translate('Invalid cloud file URL.'));
		}

		const absolute = await this.resolveAuthenticatedUrl(url);
		const response = await fetch(absolute);
		if (!response.ok) {
			throw new Error(
				translate('Could not download cloud file ({status}).', {
					status: String(response.status)
				})
			);
		}

		return response.blob();
	}

	#requireClient() {
		if (!this.#auth.isConfigured) {
			throw new Error(
				translate('PocketBase URL is not configured. Set PUBLIC_POCKETBASE_URL.')
			);
		}
		if (!this.#auth.isAuthenticated) {
			throw new Error(translate('You must be signed in to use cloud files.'));
		}
		return this.#auth.client;
	}

	#requireUserId(): string {
		const id = this.#auth.user?.id;
		if (!id) {
			throw new Error(translate('You must be signed in to use cloud files.'));
		}
		return id;
	}

	#toRecord(record: RecordModel): UserFileRecord | null {
		const fileName = typeof record.file === 'string' ? record.file : '';
		if (!record.id || !fileName) {
			return null;
		}

		const originalName =
			typeof record.originalName === 'string' && record.originalName.trim()
				? record.originalName.trim()
				: fileName;
		const storedMime = typeof record.mimeType === 'string' ? record.mimeType.trim() : '';

		const pb = this.#auth.client;
		const absolute = pb.files.getURL(record, fileName);
		const relative = toRelativeCloudFilePath(absolute);
		if (!relative) {
			return null;
		}

		return {
			id: record.id,
			url: relative.split(/[?#]/)[0],
			size: typeof record.size === 'number' ? record.size : Number(record.size) || 0,
			mimeType: storedMime || mimeFromFileName(originalName, 'application/octet-stream'),
			originalName,
			createdAt: typeof record.createdAt === 'string' ? record.createdAt : null
		};
	}
}
