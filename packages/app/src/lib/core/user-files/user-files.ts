import type { RecordModel } from 'pocketbase';

import { translate } from '$lib/i18n';

import type { Auth } from '../auth/auth.svelte';
import { pocketBaseErrorMessage } from '../auth/auth-utils';

import { extensionOf, mimeFromFileName } from './mime-from-name';
import type {
	UserFileRecord,
	UserFilesListOptions,
	UserFilesQuota,
	UserFilesUploadOptions
} from './types';

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

export function isCloudFileUrl(value: string | null | undefined): boolean {
	if (typeof value !== 'string' || !value.trim()) {
		return false;
	}
	return /^https?:\/\//i.test(value.trim());
}

export class UserFiles {
	#auth: Auth;

	constructor(auth: Auth) {
		this.#auth = auth;
	}

	isCloudUrl(value: string | null | undefined): boolean {
		return isCloudFileUrl(value);
	}

	async list(options?: UserFilesListOptions): Promise<UserFileRecord[]> {
		const pb = this.#requireClient();
		const userId = this.#requireUserId();

		const result = await pb.collection('user_files').getFullList({
			filter: `user="${userId}"`,
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
		const body = new FormData();
		body.set('user', userId);
		body.set('file', file, originalName);

		try {
			const created = await pb.collection('user_files').create(body);
			const record = this.#toRecord(created);
			if (!record) {
				throw new Error(translate('Could not upload file.'));
			}
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
			filter: `user="${userId}"`,
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
		const pb = this.#requireClient();
		const trimmed = url.trim();
		if (!isCloudFileUrl(trimmed)) {
			throw new Error(translate('Invalid cloud file URL.'));
		}

		const headers: HeadersInit = {};
		if (pb.authStore.token) {
			headers.Authorization = pb.authStore.token;
		}

		const response = await fetch(trimmed, { headers });
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
		return {
			id: record.id,
			url: pb.files.getURL(record, fileName),
			size: typeof record.size === 'number' ? record.size : Number(record.size) || 0,
			mimeType: storedMime || mimeFromFileName(originalName),
			originalName,
			createdAt: typeof record.createdAt === 'string' ? record.createdAt : null
		};
	}
}
