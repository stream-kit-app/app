import { appDataDir, join, sep } from '@tauri-apps/api/path';

import { translate } from '$lib/i18n';

import { BaseDirectory } from '../filesystem';
import type { Filesystem } from '../filesystem';

import type { UserFileRecord } from './types';
import {
	isSafeCacheRelativePath,
	normalizeManifestKey,
	parseCloudFilePath,
	sanitizeFileName,
	sanitizeRecordId,
	sanitizeUserId
} from './user-files-cache-path';

export {
	isSafeCacheRelativePath,
	normalizeManifestKey,
	parseCloudFilePath,
	sanitizeFileName,
	sanitizeRecordId
} from './user-files-cache-path';

const CACHE_ROOT = 'user-files-cache';

export type UserFilesCacheStatus = 'idle' | 'syncing' | 'error';

type ManifestEntry = {
	recordId: string;
	size: number;
	originalName: string;
	relativeLocalPath: string;
};

type Manifest = Record<string, ManifestEntry>;

type UserFilesCacheDeps = {
	fs: Filesystem;
	list: () => Promise<UserFileRecord[]>;
	download: (url: string) => Promise<Blob>;
	hasEntitlement: () => boolean;
	/** Device setting: keep cloud files offline (default off). */
	isEnabled: () => boolean;
	/** Signed-in PocketBase user id (scopes cache writes / sync). */
	getUserId: () => string | null;
	/**
	 * Last account whose offline cache should stay readable while signed out
	 * (device-local; used when `getUserId()` is null).
	 */
	getLastUserId: () => string | null;
	/** Persist the active account id after a successful cache load/sync. */
	setLastUserId: (userId: string) => void;
	/** Called after each file is processed during reconcile (`done` includes already-cached). */
	onProgress?: (done: number, total: number) => void;
	/** Called when reconcile finishes (success or error). */
	onComplete?: (ok: boolean) => void;
};

/**
 * Local disk mirror of PocketBase `user_files` under AppData/{userId}.
 * Actions keep host-independent `/api/files/...` refs; playback resolves to absolute paths.
 * Cached paths stay readable after logout when offline mirror is enabled.
 */
export class UserFilesCache {
	status = $state<UserFilesCacheStatus>('idle');
	cachedCount = $state(0);
	totalCount = $state(0);
	lastError = $state<string | null>(null);

	#fs: Filesystem;
	#list: () => Promise<UserFileRecord[]>;
	#download: (url: string) => Promise<Blob>;
	#hasEntitlement: () => boolean;
	#isEnabled: () => boolean;
	#getUserId: () => string | null;
	#getLastUserId: () => string | null;
	#setLastUserId: (userId: string) => void;
	#onProgress?: (done: number, total: number) => void;
	#onComplete?: (ok: boolean) => void;
	#manifest: Manifest = {};
	/** Keys confirmed present on disk (sync-safe for getCachedPath). */
	#onDiskKeys = new Set<string>();
	#manifestLoaded = false;
	#loadedUserId: string | null = null;
	#appDataDir: string | null = null;
	#pathSep = '/';
	#reconcilePromise: Promise<void> | null = null;
	#ensurePromises = new Map<string, Promise<string>>();
	#started = false;
	#onlineHandler: (() => void) | null = null;

	constructor(deps: UserFilesCacheDeps) {
		this.#fs = deps.fs;
		this.#list = deps.list;
		this.#download = deps.download;
		this.#hasEntitlement = deps.hasEntitlement;
		this.#isEnabled = deps.isEnabled;
		this.#getUserId = deps.getUserId;
		this.#getLastUserId = deps.getLastUserId;
		this.#setLastUserId = deps.setLastUserId;
		this.#onProgress = deps.onProgress;
		this.#onComplete = deps.onComplete;
	}

	#authUserId(): string | null {
		return sanitizeUserId(this.#getUserId());
	}

	/** Account whose AppData folder is used for reads (signed-in user or last offline user). */
	#readUserId(): string | null {
		return this.#authUserId() ?? sanitizeUserId(this.#loadedUserId) ?? sanitizeUserId(this.#getLastUserId());
	}

	#canSync(): boolean {
		return this.#isEnabled() && this.#hasEntitlement() && this.#authUserId() != null;
	}

	/** Write/sync root — only the currently signed-in account. */
	#writeUserRoot(): string | null {
		const userId = this.#authUserId();
		return userId ? `${CACHE_ROOT}/${userId}` : null;
	}

	/** Read root — signed-in account, or last loaded/persisted account while logged out. */
	#readUserRoot(): string | null {
		const userId = this.#readUserId();
		return userId ? `${CACHE_ROOT}/${userId}` : null;
	}

	#manifestPathFor(userRoot: string): string {
		return `${userRoot}/index.json`;
	}

	start(): void {
		if (this.#started) {
			return;
		}
		this.#started = true;
		this.#onlineHandler = () => {
			if (this.#canSync()) {
				void this.sync();
			}
		};
		if (typeof window !== 'undefined') {
			window.addEventListener('online', this.#onlineHandler);
		}
		void this.#bootstrap();
	}

	async #bootstrap(): Promise<void> {
		await this.#ensureAppDataDir().catch(() => undefined);
		await this.#loadManifest();
		if (this.#canSync()) {
			void this.sync();
		}
	}

	stop(): void {
		if (this.#onlineHandler && typeof window !== 'undefined') {
			window.removeEventListener('online', this.#onlineHandler);
		}
		this.#onlineHandler = null;
		this.#started = false;
	}

	/** Absolute OS path to this account's offline cache root; creates the folder if missing. */
	async getCacheDirPath(): Promise<string> {
		const root = this.#writeUserRoot() ?? this.#readUserRoot();
		if (!root) {
			throw new Error(translate('You must be signed in to use cloud files.'));
		}
		await this.#fs.mkdir(root, {
			baseDir: BaseDirectory.AppData,
			recursive: true
		});
		return this.#joinAbsolute(root);
	}

	/** Background reconcile of the full cloud library. */
	sync(): Promise<void> {
		if (!this.#canSync()) {
			this.status = 'idle';
			this.totalCount = 0;
			this.#refreshCachedCount();
			return Promise.resolve();
		}
		if (this.#reconcilePromise) {
			return this.#reconcilePromise;
		}
		this.#reconcilePromise = this.#reconcile().finally(() => {
			this.#reconcilePromise = null;
		});
		return this.#reconcilePromise;
	}

	/**
	 * Sync lookup of an absolute OS path when the file is already mirrored on disk.
	 * Works while signed out when the last account's offline cache is still loaded.
	 * Returns null when the index is not ready or the file is missing.
	 */
	getCachedPath(value: string): string | null {
		if (!this.#isEnabled() || !this.#loadedUserId || !this.#appDataDir) {
			return null;
		}
		const key = normalizeManifestKey(value);
		if (!key || !this.#onDiskKeys.has(key)) {
			return null;
		}
		const entry = this.#manifest[key];
		if (!entry) {
			return null;
		}
		return this.#joinAbsoluteSync(entry.relativeLocalPath);
	}

	/** Absolute filesystem path; downloads on demand when missing. */
	async resolveLocalPath(value: string): Promise<string> {
		const trimmed = value.trim();
		const key = normalizeManifestKey(trimmed);
		if (!key) {
			return trimmed;
		}
		return this.ensureLocal(trimmed);
	}

	async ensureLocal(cloudRef: string): Promise<string> {
		const key = normalizeManifestKey(cloudRef);
		if (!key) {
			return cloudRef.trim();
		}

		const existing = this.#ensurePromises.get(key);
		if (existing) {
			return existing;
		}

		const promise = this.#ensureLocalInner(key, cloudRef).finally(() => {
			this.#ensurePromises.delete(key);
		});
		this.#ensurePromises.set(key, promise);
		return promise;
	}

	async tryReadBlob(cloudRef: string): Promise<Blob | null> {
		await this.#loadManifest();
		const key = normalizeManifestKey(cloudRef);
		if (!key) {
			return null;
		}
		const entry = this.#manifest[key];
		if (!entry || !this.#onDiskKeys.has(key)) {
			return null;
		}
		const exists = await this.#fs.exists(entry.relativeLocalPath, {
			baseDir: BaseDirectory.AppData
		});
		if (!exists) {
			this.#onDiskKeys.delete(key);
			return null;
		}
		const bytes = await this.#fs.readFile(entry.relativeLocalPath, {
			baseDir: BaseDirectory.AppData
		});
		return new Blob([Uint8Array.from(bytes)]);
	}

	async putFromBlob(record: UserFileRecord, blob: Blob | File): Promise<void> {
		if (!this.#writeUserRoot()) {
			return;
		}
		await this.#loadManifest();
		const key = normalizeManifestKey(record.url);
		if (!key) {
			return;
		}
		const bytes = new Uint8Array(await blob.arrayBuffer());
		await this.#writeBytes(
			key,
			record.id,
			record.originalName,
			record.size || bytes.byteLength,
			bytes
		);
	}

	async removeByRecordId(recordId: string): Promise<void> {
		await this.#loadManifest();
		const safeId = sanitizeRecordId(recordId);
		if (!safeId) {
			return;
		}
		const keys = Object.keys(this.#manifest).filter(
			(key) => this.#manifest[key]?.recordId === safeId
		);
		for (const key of keys) {
			const entry = this.#manifest[key];
			if (!entry) {
				continue;
			}
			await this.#removeEntry(key, entry);
		}
		await this.#saveManifest();
		this.#refreshCachedCount();
	}

	async #ensureLocalInner(key: string, cloudRef: string): Promise<string> {
		await this.#loadManifest();
		await this.#ensureAppDataDir();

		const entry = this.#manifest[key];
		if (entry && this.#onDiskKeys.has(key)) {
			const exists = await this.#fs.exists(entry.relativeLocalPath, {
				baseDir: BaseDirectory.AppData
			});
			if (exists) {
				return this.#joinAbsolute(entry.relativeLocalPath);
			}
			this.#onDiskKeys.delete(key);
		}

		// Downloads require a signed-in account; cached files above still work offline.
		if (!this.#writeUserRoot()) {
			throw new Error(translate('Could not resolve local path for cloud file.'));
		}

		let record: UserFileRecord | null = null;
		try {
			const listed = await this.#list();
			record = listed.find((item) => normalizeManifestKey(item.url) === key) ?? null;
		} catch {
			record = null;
		}

		const parsed = parseCloudFilePath(key);
		const recordId = sanitizeRecordId(
			record?.id ?? entry?.recordId ?? parsed?.recordId ?? ''
		);
		const originalName =
			record?.originalName ?? entry?.originalName ?? parsed?.fileName ?? 'file';
		const expectedSize = record?.size ?? entry?.size ?? 0;

		if (!recordId) {
			throw new Error(translate('Could not resolve local path for cloud file.'));
		}

		const blob = await this.#download(cloudRef);
		const bytes = new Uint8Array(await blob.arrayBuffer());
		await this.#writeBytes(
			key,
			recordId,
			originalName,
			expectedSize || bytes.byteLength,
			bytes
		);
		return this.#joinAbsolute(this.#manifest[key]!.relativeLocalPath);
	}

	async #reconcile(): Promise<void> {
		this.status = 'syncing';
		this.lastError = null;
		let ok = false;

		try {
			await this.#loadManifest();
			await this.#ensureAppDataDir();

			const records = await this.#list();
			const work = records.filter((record) => Boolean(normalizeManifestKey(record.url)));
			this.totalCount = work.length;

			if (work.length > 0) {
				this.#onProgress?.(0, work.length);
			}

			const remoteKeys = new Set<string>();
			let done = 0;
			let firstFileError: string | null = null;

			for (const record of work) {
				const key = normalizeManifestKey(record.url)!;
				remoteKeys.add(key);

				try {
					const existing = this.#manifest[key];
					const onDisk =
						existing &&
						this.#onDiskKeys.has(key) &&
						existing.recordId === record.id &&
						existing.size === record.size &&
						(await this.#fs.exists(existing.relativeLocalPath, {
							baseDir: BaseDirectory.AppData
						}));

					if (!onDisk) {
						const blob = await this.#download(record.url);
						const bytes = new Uint8Array(await blob.arrayBuffer());
						await this.#writeBytes(
							key,
							record.id,
							record.originalName,
							record.size || bytes.byteLength,
							bytes
						);
					}
				} catch (error) {
					const message =
						error instanceof Error
							? error.message
							: translate('Could not sync offline cloud files.');
					if (!firstFileError) {
						firstFileError = message;
					}
					console.error('[user-files-cache] failed to cache file', record.id, error);
				}

				done += 1;
				this.#onProgress?.(done, work.length);
			}

			for (const key of Object.keys(this.#manifest)) {
				if (remoteKeys.has(key)) {
					continue;
				}
				const entry = this.#manifest[key];
				if (entry) {
					await this.#removeEntry(key, entry);
				}
			}

			await this.#saveManifest();
			this.#refreshCachedCount();

			if (firstFileError && this.#onDiskKeys.size === 0 && work.length > 0) {
				this.lastError = firstFileError;
				this.status = 'error';
			} else {
				this.lastError = null;
				this.status = 'idle';
				ok = true;
			}
		} catch (error) {
			this.lastError =
				error instanceof Error
					? error.message
					: translate('Could not sync offline cloud files.');
			this.status = 'error';
			this.#refreshCachedCount();
			console.error('[user-files-cache] reconcile failed', error);
		} finally {
			this.#onComplete?.(ok);
		}
	}

	async #writeBytes(
		key: string,
		recordId: string,
		originalName: string,
		expectedSize: number,
		bytes: Uint8Array
	): Promise<void> {
		const userRoot = this.#writeUserRoot();
		if (!userRoot) {
			throw new Error(translate('You must be signed in to use cloud files.'));
		}

		const safeId = sanitizeRecordId(recordId);
		if (!safeId) {
			throw new Error(translate('Could not resolve local path for cloud file.'));
		}

		if (bytes.byteLength === 0) {
			throw new Error(translate('Cloud file download incomplete.'));
		}
		if (expectedSize > 0 && bytes.byteLength !== expectedSize) {
			throw new Error(translate('Cloud file download incomplete.'));
		}

		const safeName = sanitizeFileName(originalName);
		const relativeLocalPath = `${userRoot}/${safeId}/${safeName}`;
		const dir = `${userRoot}/${safeId}`;

		if (!isSafeCacheRelativePath(relativeLocalPath, userRoot)) {
			throw new Error(translate('Could not resolve local path for cloud file.'));
		}

		await this.#fs.mkdir(dir, { baseDir: BaseDirectory.AppData, recursive: true });
		await this.#fs.writeFile(relativeLocalPath, bytes, {
			baseDir: BaseDirectory.AppData
		});

		this.#manifest[key] = {
			recordId: safeId,
			size: bytes.byteLength,
			originalName,
			relativeLocalPath
		};
		this.#onDiskKeys.add(key);
		await this.#saveManifest();
		this.#refreshCachedCount();
	}

	async #removeEntry(key: string, entry: ManifestEntry): Promise<void> {
		const userRoot = this.#writeUserRoot() ?? this.#readUserRoot();
		try {
			if (
				userRoot &&
				isSafeCacheRelativePath(entry.relativeLocalPath, userRoot) &&
				(await this.#fs.exists(entry.relativeLocalPath, {
					baseDir: BaseDirectory.AppData
				}))
			) {
				await this.#fs.remove(entry.relativeLocalPath, {
					baseDir: BaseDirectory.AppData
				});
			}
			const safeId = sanitizeRecordId(entry.recordId);
			if (userRoot && safeId) {
				const dir = `${userRoot}/${safeId}`;
				if (await this.#fs.exists(dir, { baseDir: BaseDirectory.AppData })) {
					const remaining = await this.#fs.readDir(dir, {
						baseDir: BaseDirectory.AppData
					});
					if (remaining.length === 0) {
						await this.#fs.remove(dir, {
							baseDir: BaseDirectory.AppData,
							recursive: true
						});
					}
				}
			}
		} catch (error) {
			console.warn('[user-files-cache] failed to remove cache entry', key, error);
		}
		delete this.#manifest[key];
		this.#onDiskKeys.delete(key);
	}

	async #loadManifest(): Promise<void> {
		const authId = this.#authUserId();
		const userId =
			authId ?? sanitizeUserId(this.#loadedUserId) ?? sanitizeUserId(this.#getLastUserId());

		if (!userId) {
			this.#manifest = {};
			this.#onDiskKeys.clear();
			this.#manifestLoaded = false;
			this.#loadedUserId = null;
			this.#refreshCachedCount();
			return;
		}

		if (this.#manifestLoaded && this.#loadedUserId === userId) {
			return;
		}

		this.#manifest = {};
		this.#onDiskKeys.clear();
		this.#loadedUserId = userId;

		const userRoot = `${CACHE_ROOT}/${userId}`;
		const manifestPath = this.#manifestPathFor(userRoot);

		try {
			const exists = await this.#fs.exists(manifestPath, {
				baseDir: BaseDirectory.AppData
			});
			if (exists) {
				const raw = await this.#fs.readTextFile(manifestPath, {
					baseDir: BaseDirectory.AppData
				});
				const parsed = JSON.parse(raw) as unknown;
				if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
					this.#manifest = parsed as Manifest;
				}
			}
		} catch (error) {
			console.warn('[user-files-cache] failed to load manifest', error);
			this.#manifest = {};
		}

		await this.#pruneInvalidAndMissing(userRoot);
		this.#manifestLoaded = true;
		this.#refreshCachedCount();

		if (authId) {
			this.#setLastUserId(authId);
		}
	}

	async #pruneInvalidAndMissing(userRoot: string): Promise<void> {
		let dirty = false;
		for (const key of Object.keys(this.#manifest)) {
			const entry = this.#manifest[key];
			if (!entry) {
				continue;
			}
			const safeId = sanitizeRecordId(entry.recordId);
			if (
				!safeId ||
				!isSafeCacheRelativePath(entry.relativeLocalPath, userRoot)
			) {
				delete this.#manifest[key];
				dirty = true;
				continue;
			}
			try {
				const exists = await this.#fs.exists(entry.relativeLocalPath, {
					baseDir: BaseDirectory.AppData
				});
				if (!exists) {
					delete this.#manifest[key];
					dirty = true;
					continue;
				}
				this.#onDiskKeys.add(key);
			} catch {
				delete this.#manifest[key];
				dirty = true;
			}
		}
		if (dirty) {
			await this.#saveManifest();
		}
	}

	async #saveManifest(): Promise<void> {
		const userRoot = this.#writeUserRoot();
		if (!userRoot) {
			return;
		}
		const manifestPath = this.#manifestPathFor(userRoot);
		await this.#fs.mkdir(userRoot, {
			baseDir: BaseDirectory.AppData,
			recursive: true
		});
		await this.#fs.writeTextFile(manifestPath, JSON.stringify(this.#manifest), {
			baseDir: BaseDirectory.AppData
		});
	}

	async #ensureAppDataDir(): Promise<string> {
		if (this.#appDataDir) {
			return this.#appDataDir;
		}
		this.#appDataDir = await appDataDir();
		this.#pathSep = sep();
		return this.#appDataDir;
	}

	async #joinAbsolute(relativeLocalPath: string): Promise<string> {
		const base = await this.#ensureAppDataDir();
		return join(base, relativeLocalPath);
	}

	#joinAbsoluteSync(relativeLocalPath: string): string {
		const base = this.#appDataDir;
		if (!base) {
			return relativeLocalPath;
		}
		const pathSep = this.#pathSep;
		const normalized = relativeLocalPath.replace(/[/\\]/g, pathSep);
		const baseNormalized = base.endsWith(pathSep) ? base.slice(0, -1) : base;
		return `${baseNormalized}${pathSep}${normalized}`;
	}

	#refreshCachedCount(): void {
		this.cachedCount = this.#onDiskKeys.size;
	}
}
