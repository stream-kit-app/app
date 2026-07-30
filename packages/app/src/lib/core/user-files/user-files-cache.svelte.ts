import { appDataDir, join, sep } from '@tauri-apps/api/path';

import { translate } from '$lib/i18n';

import { BaseDirectory } from '../filesystem';
import type { Filesystem } from '../filesystem';

import type { UserFileRecord } from './types';

const CACHE_ROOT = 'user-files-cache';
const MANIFEST_PATH = `${CACHE_ROOT}/index.json`;

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
	/** Called after each file is processed during reconcile (`done` includes already-cached). */
	onProgress?: (done: number, total: number) => void;
	/** Called when reconcile finishes (success or error). */
	onComplete?: (ok: boolean) => void;
};

/** Host-independent cloud path key (lowercase, no query). Avoids importing user-files.ts. */
function normalizeManifestKey(value: string): string | null {
	const trimmed = value.trim();
	if (!trimmed) {
		return null;
	}
	if (trimmed.startsWith('/api/files/')) {
		return trimmed.split(/[?#]/)[0].toLowerCase();
	}
	if (!/^https?:\/\//i.test(trimmed)) {
		return null;
	}
	try {
		const parsed = new URL(trimmed);
		if (!parsed.pathname.includes('/api/files/')) {
			return null;
		}
		return parsed.pathname.toLowerCase();
	} catch {
		return null;
	}
}

function sanitizeFileName(name: string): string {
	const trimmed = name.trim() || 'file';
	return trimmed.replace(/[<>:"/\\|?*\u0000-\u001f]/g, '_').slice(0, 200) || 'file';
}

function parseCloudFilePath(
	relativePath: string
): { recordId: string; fileName: string } | null {
	const parts = relativePath.split('/').filter(Boolean);
	if (parts.length < 5 || parts[0] !== 'api' || parts[1] !== 'files') {
		return null;
	}
	try {
		return {
			recordId: parts[3]!,
			fileName: decodeURIComponent(parts.slice(4).join('/'))
		};
	} catch {
		return {
			recordId: parts[3]!,
			fileName: parts.slice(4).join('/')
		};
	}
}

/**
 * Local disk mirror of PocketBase `user_files` under AppData.
 * Actions keep host-independent `/api/files/...` refs; playback resolves to absolute paths.
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
	#onProgress?: (done: number, total: number) => void;
	#onComplete?: (ok: boolean) => void;
	#manifest: Manifest = {};
	#manifestLoaded = false;
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
		this.#onProgress = deps.onProgress;
		this.#onComplete = deps.onComplete;
	}

	#canSync(): boolean {
		return this.#isEnabled() && this.#hasEntitlement();
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
		void this.#ensureAppDataDir().catch(() => undefined);
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

	/** Absolute OS path to the offline cache root; creates the folder if missing. */
	async getCacheDirPath(): Promise<string> {
		await this.#fs.mkdir(CACHE_ROOT, {
			baseDir: BaseDirectory.AppData,
			recursive: true
		});
		return this.#joinAbsolute(CACHE_ROOT);
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
	 * Sync lookup of an absolute OS path when the file is already mirrored.
	 * Returns null when the cache index is not ready or the file is missing.
	 */
	getCachedPath(value: string): string | null {
		const key = normalizeManifestKey(value);
		if (!key || !this.#appDataDir) {
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
		if (!entry) {
			return null;
		}
		const exists = await this.#fs.exists(entry.relativeLocalPath, {
			baseDir: BaseDirectory.AppData
		});
		if (!exists) {
			return null;
		}
		const bytes = await this.#fs.readFile(entry.relativeLocalPath, {
			baseDir: BaseDirectory.AppData
		});
		return new Blob([Uint8Array.from(bytes)]);
	}

	async putFromBlob(record: UserFileRecord, blob: Blob | File): Promise<void> {
		await this.#loadManifest();
		const key = normalizeManifestKey(record.url);
		if (!key) {
			return;
		}
		const bytes = new Uint8Array(await blob.arrayBuffer());
		await this.#writeBytes(key, record.id, record.originalName, record.size || bytes.byteLength, bytes);
	}

	async removeByRecordId(recordId: string): Promise<void> {
		await this.#loadManifest();
		const keys = Object.keys(this.#manifest).filter(
			(key) => this.#manifest[key]?.recordId === recordId
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
		if (entry) {
			const exists = await this.#fs.exists(entry.relativeLocalPath, {
				baseDir: BaseDirectory.AppData
			});
			if (exists) {
				return this.#joinAbsolute(entry.relativeLocalPath);
			}
		}

		let record: UserFileRecord | null = null;
		try {
			const listed = await this.#list();
			record = listed.find((item) => normalizeManifestKey(item.url) === key) ?? null;
		} catch {
			record = null;
		}

		const parsed = parseCloudFilePath(key);
		const recordId = record?.id ?? entry?.recordId ?? parsed?.recordId;
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

			for (const record of work) {
				const key = normalizeManifestKey(record.url)!;
				remoteKeys.add(key);

				const existing = this.#manifest[key];
				const onDisk =
					existing &&
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
			this.status = 'idle';
			ok = true;
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
		size: number,
		bytes: Uint8Array
	): Promise<void> {
		const safeName = sanitizeFileName(originalName);
		const relativeLocalPath = `${CACHE_ROOT}/${recordId}/${safeName}`;
		const dir = `${CACHE_ROOT}/${recordId}`;

		await this.#fs.mkdir(dir, { baseDir: BaseDirectory.AppData, recursive: true });
		await this.#fs.writeFile(relativeLocalPath, bytes, {
			baseDir: BaseDirectory.AppData
		});

		this.#manifest[key] = {
			recordId,
			size,
			originalName,
			relativeLocalPath
		};
		await this.#saveManifest();
		this.#refreshCachedCount();
	}

	async #removeEntry(key: string, entry: ManifestEntry): Promise<void> {
		try {
			if (
				await this.#fs.exists(entry.relativeLocalPath, {
					baseDir: BaseDirectory.AppData
				})
			) {
				await this.#fs.remove(entry.relativeLocalPath, {
					baseDir: BaseDirectory.AppData
				});
			}
			const dir = `${CACHE_ROOT}/${entry.recordId}`;
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
		} catch (error) {
			console.warn('[user-files-cache] failed to remove cache entry', key, error);
		}
		delete this.#manifest[key];
	}

	async #loadManifest(): Promise<void> {
		if (this.#manifestLoaded) {
			return;
		}
		try {
			const exists = await this.#fs.exists(MANIFEST_PATH, {
				baseDir: BaseDirectory.AppData
			});
			if (!exists) {
				this.#manifest = {};
			} else {
				const raw = await this.#fs.readTextFile(MANIFEST_PATH, {
					baseDir: BaseDirectory.AppData
				});
				const parsed = JSON.parse(raw) as unknown;
				this.#manifest =
					parsed && typeof parsed === 'object' && !Array.isArray(parsed)
						? (parsed as Manifest)
						: {};
			}
		} catch (error) {
			console.warn('[user-files-cache] failed to load manifest', error);
			this.#manifest = {};
		}
		this.#manifestLoaded = true;
		this.#refreshCachedCount();
	}

	async #saveManifest(): Promise<void> {
		await this.#fs.mkdir(CACHE_ROOT, {
			baseDir: BaseDirectory.AppData,
			recursive: true
		});
		await this.#fs.writeTextFile(MANIFEST_PATH, JSON.stringify(this.#manifest), {
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
		this.cachedCount = Object.keys(this.#manifest).length;
	}
}
