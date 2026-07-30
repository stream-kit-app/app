import type { App } from '../app.svelte';
import type { AuthPublicUser } from '../auth/types';
import type { SyncAdapter } from './adapter';

import {
	isPocketBaseAutoCancelled,
	isPocketBaseNotFound,
	pocketBaseErrorMessage
} from '../auth/auth-utils';
import type { SyncUpsertRemoteOptions } from './adapter';
import { translate } from '$lib/i18n';
import { setConfigSyncLocalChangeHandler } from '$db/config-sync-notify';

import { createActionAdapter } from './adapters/actions';
import { createActionQueueAdapter } from './adapters/action-queues';
import { createDashboardWidgetsAdapter } from './adapters/dashboard-widgets';
import { createOverlayProjectsAdapter } from './adapters/overlays';
import { createPluginRecordsAdapter } from './adapters/plugin-records';
import { runSyncAdapter } from './sync-loop';

export type ConfigSyncStatus =
	| 'idle'
	| 'disabled'
	| 'syncing'
	| 'synced'
	| 'offline'
	| 'error'
	| 'restoring';

const SYNC_DEBOUNCE_MS = 1500;
const RETRY_BASE_MS = 1000;
const RETRY_MAX_MS = 5 * 60 * 1000;
/** Cap how long boot waits for the first cloud restore pass. */
const FIRST_SYNC_TIMEOUT_MS = 20_000;

/**
 * Offline-first sync orchestrator. Local SQLite remains the runtime store;
 * PocketBase is the cloud replica. Per-entity logic lives in SyncAdapters.
 */
export class ConfigSync {
	#app: App;
	#started = false;
	#running = false;
	#pending = false;
	#debounceTimer: ReturnType<typeof setTimeout> | null = null;
	#suppressSchedule = false;
	#retryAttempt = 0;
	#retryTimer: ReturnType<typeof setTimeout> | null = null;
	#onOnline: (() => void) | null = null;
	#adapters: SyncAdapter[] = [];
	#firstSyncResolve: (() => void) | null = null;
	#firstSyncComplete: Promise<void>;

	status = $state<ConfigSyncStatus>('idle');
	lastSyncedAt = $state<Date | null>(null);
	lastError = $state<string | null>(null);

	constructor(app: App) {
		this.#app = app;
		this.#firstSyncComplete = new Promise((resolve) => {
			this.#firstSyncResolve = resolve;
		});
	}

	/** Resolves after the first successful entitled sync (or immediately if not entitled). */
	get firstSyncComplete(): Promise<void> {
		return this.#firstSyncComplete;
	}

	registerAdapter(adapter: SyncAdapter): void {
		if (this.#adapters.some((entry) => entry.entityType === adapter.entityType)) {
			return;
		}
		this.#adapters.push(adapter);
	}

	start(): void {
		if (this.#started) {
			return;
		}
		this.#started = true;

		this.registerAdapter(createActionQueueAdapter(this.#app));
		this.registerAdapter(createActionAdapter(this.#app));
		this.registerAdapter(createPluginRecordsAdapter(this.#app));
		this.registerAdapter(createOverlayProjectsAdapter(this.#app));
		this.registerAdapter(createDashboardWidgetsAdapter(this.#app));

		setConfigSyncLocalChangeHandler(() => this.scheduleSync());

		if (typeof window !== 'undefined') {
			this.#onOnline = () => this.scheduleSync();
			window.addEventListener('online', this.#onOnline);
		}

		this.#app.auth.onChange((user) => {
			void this.#onAuthChange(user);
		});

		void this.#bootstrapFirstSync();
	}

	/**
	 * Wait for entitlement, run the first restore (or skip if not Pro), then
	 * unblock `firstSyncComplete` so plugin onLoad can continue.
	 */
	async #bootstrapFirstSync(): Promise<void> {
		const timeout = new Promise<void>((resolve) => {
			setTimeout(() => {
				if (this.#firstSyncResolve) {
					console.warn('Config sync first pass timed out; continuing boot offline-first.');
					this.#resolveFirstSync();
				}
				resolve();
			}, FIRST_SYNC_TIMEOUT_MS);
		});

		try {
			await Promise.race([this.#runFirstSyncBootstrap(), timeout]);
		} catch (error) {
			console.warn('Config sync bootstrap failed', error);
			this.#resolveFirstSync();
		}
	}

	async #runFirstSyncBootstrap(): Promise<void> {
		if (!this.#app.auth.isConfigured || !this.#app.auth.isAuthenticated) {
			this.status = 'idle';
			this.#resolveFirstSync();
			return;
		}

		await this.#app.auth.waitForEntitlement();

		if (!this.#canSync()) {
			this.status = 'disabled';
			this.#resolveFirstSync();
			return;
		}

		// Auth onChange may already have started sync when subscription arrived.
		if (this.lastSyncedAt) {
			this.#resolveFirstSync();
			return;
		}

		await this.sync();
		// If sync was already in flight, `sync()` returns early — wait for it.
		await this.#firstSyncComplete;
	}

	scheduleSync(): void {
		if (this.#suppressSchedule || !this.#canSync()) {
			return;
		}

		if (this.#debounceTimer) {
			clearTimeout(this.#debounceTimer);
		}

		this.#debounceTimer = setTimeout(() => {
			this.#debounceTimer = null;
			void this.sync();
		}, SYNC_DEBOUNCE_MS);
	}

	async sync(): Promise<void> {
		if (this.#running) {
			this.#pending = true;
			return;
		}

		if (!this.#canSync()) {
			this.status = this.#app.auth.user ? 'disabled' : 'idle';
			this.#resolveFirstSync();
			return;
		}

		this.#running = true;
		this.#pending = false;
		const previousStatus = this.status;
		const isFirst = !this.lastSyncedAt;
		this.status = isFirst ? 'restoring' : 'syncing';
		this.lastError = null;
		this.#suppressSchedule = true;

		const userId = this.#app.auth.user!.id;
		const ctx = {
			userId,
			upsertRemote: (
				collection: string,
				body: Record<string, unknown>,
				options?: SyncUpsertRemoteOptions
			) => this.#upsertRemoteRecord(collection, body, options)
		};

		try {
			for (const adapter of this.#adapters) {
				await runSyncAdapter(adapter, ctx);
			}
			this.lastSyncedAt = new Date();
			this.status = 'synced';
			this.#clearRetry();
			await this.#reloadRuntime();
			this.#resolveFirstSync();
		} catch (error) {
			if (isPocketBaseAutoCancelled(error)) {
				this.status =
					previousStatus === 'syncing' || previousStatus === 'idle' || previousStatus === 'restoring'
						? this.lastSyncedAt
							? 'synced'
							: 'idle'
						: previousStatus;
				this.#scheduleRetry();
				return;
			}

			const message =
				error instanceof Error
					? error.message
					: translate('Could not sync actions to the cloud.');
			this.lastError = message;
			this.status =
				typeof navigator !== 'undefined' && navigator.onLine === false
					? 'offline'
					: 'error';
			console.warn('Config sync failed', error);
			this.#scheduleRetry();
			// Never block app boot on a failed first restore.
			this.#resolveFirstSync();
		} finally {
			this.#running = false;
		}

		if (this.status === 'synced') {
			try {
				this.#suppressSchedule = true;
				const { migrateCloudFilesAfterSync } = await import(
					'../user-files/cloud-file-migration'
				);
				await migrateCloudFilesAfterSync(this.#app);
				void this.#app.userFiles.syncCache();
				const { syncOverlayProjectBundles } = await import('./overlay-bundle-sync');
				await syncOverlayProjectBundles(this.#app).catch((error) => {
					console.warn('Overlay bundle sync failed', error);
				});
				const {
					publishInstalledPluginsCatalog,
					restoreMissingInstalledPlugins
				} = await import('./installed-plugins-sync');
				await publishInstalledPluginsCatalog(this.#app).catch((error) => {
					console.warn('Installed plugins catalog publish failed', error);
				});
				await restoreMissingInstalledPlugins(this.#app).catch((error) => {
					console.warn('Installed plugins restore failed', error);
				});
			} finally {
				this.#suppressSchedule = false;
			}
		}

		if (this.#pending && this.#canSync()) {
			this.#pending = false;
			void this.sync();
		}
	}

	#resolveFirstSync(): void {
		if (this.#firstSyncResolve) {
			this.#firstSyncResolve();
			this.#firstSyncResolve = null;
		}
	}

	#canSync(): boolean {
		return Boolean(
			this.#app.auth.isConfigured &&
				this.#app.auth.isAuthenticated &&
				this.#app.auth.user?.subscription
		);
	}

	async #onAuthChange(user: AuthPublicUser | null): Promise<void> {
		if (!user?.subscription) {
			this.#clearRetry();
			this.status = user ? 'disabled' : 'idle';
			// Signed out: unblock waiters. Signed in without sub: wait until
			// entitlement is known (bootstrap resolves), so we don't mark "done"
			// while the subscription fetch is still in flight.
			if (!user || this.#app.auth.entitlementReady) {
				this.#resolveFirstSync();
			}
			return;
		}

		await this.sync();
	}

	async #reloadRuntime(): Promise<void> {
		// First sync runs before plugins.boot(); reloading actions that early activates
		// triggers against plugins that are not enabled yet (e.g. WebSocket).
		if (!this.#app.lifecycle.started) {
			return;
		}
		for (const adapter of this.#adapters) {
			await adapter.reload?.();
		}
	}

	#clearRetry(): void {
		if (this.#retryTimer) {
			clearTimeout(this.#retryTimer);
			this.#retryTimer = null;
		}
		this.#retryAttempt = 0;
	}

	#scheduleRetry(): void {
		if (this.#retryTimer) {
			clearTimeout(this.#retryTimer);
		}

		const delay = Math.min(RETRY_BASE_MS * 2 ** this.#retryAttempt, RETRY_MAX_MS);
		this.#retryAttempt += 1;
		this.#retryTimer = setTimeout(() => {
			this.#retryTimer = null;
			this.scheduleSync();
		}, delay);
	}

	async #upsertRemoteRecord(
		collection: string,
		body: Record<string, unknown>,
		options?: SyncUpsertRemoteOptions
	): Promise<void> {
		const pb = this.#app.auth.client;
		const authId = pb.authStore.record?.id ?? this.#app.auth.user?.id;
		if (!authId) {
			throw new Error(translate('You must be signed in to use cloud files.'));
		}

		const id = String(body.id);
		const payload = sanitizeSyncPayload({
			...body,
			user: authId
		});

		// Prefer create/update based on listRemote — never probe with getOne (404 spam).
		if (options?.exists === true) {
			try {
				await pb.collection(collection).update(id, payload, { requestKey: null });
				return;
			} catch (error) {
				if (!isPocketBaseNotFound(error)) {
					throw enrichPocketBaseError(error);
				}
			}
		}

		try {
			await pb.collection(collection).create(payload, { requestKey: null });
			return;
		} catch (createError) {
			if (!isPocketBaseRecordConflict(createError)) {
				throw enrichPocketBaseError(createError);
			}
		}

		try {
			await pb.collection(collection).update(id, payload, { requestKey: null });
		} catch (updateError) {
			throw enrichPocketBaseError(updateError);
		}
	}
}

function isPocketBaseRecordConflict(error: unknown): boolean {
	if (!error || typeof error !== 'object') {
		return false;
	}
	const status = (error as { status?: unknown }).status;
	if (status !== 400 && status !== 409) {
		return false;
	}
	const response = (error as { response?: { data?: Record<string, unknown>; message?: string } })
		.response;
	const message = String(
		response?.message ?? (error as { message?: string }).message ?? ''
	).toLowerCase();
	if (message.includes('already exists') || message.includes('duplicate')) {
		return true;
	}
	const data = response?.data;
	if (data && typeof data === 'object') {
		for (const field of Object.values(data)) {
			if (
				field &&
				typeof field === 'object' &&
				'code' in field &&
				String((field as { code?: string }).code).includes('unique')
			) {
				return true;
			}
		}
	}
	return false;
}

/** PocketBase rejects explicit `null` on most fields — omit instead. */
function sanitizeSyncPayload(body: Record<string, unknown>): Record<string, unknown> {
	const payload: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(body)) {
		if (value === null || value === undefined) {
			continue;
		}
		if (typeof value === 'string' && value === '' && key !== 'name' && key !== 'group') {
			continue;
		}
		payload[key] = value;
	}
	return payload;
}

function enrichPocketBaseError(createError: unknown): Error {
	const response =
		createError && typeof createError === 'object' && 'response' in createError
			? (createError as { response?: unknown }).response
			: undefined;
	const detail = response != null ? JSON.stringify(response) : String(createError);
	console.warn(`Config sync create failed: ${detail}`, { createError });
	const message = pocketBaseErrorMessage(
		createError,
		'Cloud sync request failed.'
	);
	if (createError instanceof Error) {
		createError.message = message;
		return createError;
	}
	return new Error(message);
}
