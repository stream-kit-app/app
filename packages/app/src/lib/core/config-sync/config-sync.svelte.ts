import type { RecordModel } from 'pocketbase';

import type { App } from '../app.svelte';
import type { AuthPublicUser } from '../auth/types';
import type {
	StoredActionHandler,
	StoredActionTrigger
} from '../action/stored-action';

import {
	deleteActionBySyncId,
	getActions,
	upsertActionFromSync
} from '$db/repositories/actions';
import {
	getActionQueues,
	isDefaultActionQueue,
	replaceActionQueueSyncId,
	upsertActionQueueFromSync
} from '$db/repositories/action-queues';
import {
	clearConfigSyncTombstone,
	listConfigSyncTombstones
} from '$db/repositories/config-sync-tombstones';
import { DEFAULT_ACTION_QUEUE_NAME } from '../action/stored-action';
import { isPocketBaseAutoCancelled } from '../auth/auth-utils';
import { translate } from '$lib/i18n';
import { setConfigSyncLocalChangeHandler } from '$db/config-sync-notify';

export type ConfigSyncStatus =
	| 'idle'
	| 'disabled'
	| 'syncing'
	| 'synced'
	| 'offline'
	| 'error';

type RemoteQueue = {
	id: string;
	name: string;
	concurrency: number;
	maxLength: number | null;
	sortOrder: number;
	clientUpdatedAt: number;
	deletedAt: number | null;
};

type RemoteAction = {
	id: string;
	name: string;
	group: string;
	groupSortOrder: number;
	sortOrder: number;
	triggers: StoredActionTrigger[];
	handlers: StoredActionHandler[];
	enabled: boolean;
	queueSyncId: string | null;
	ownerPluginKey: string | null;
	clientUpdatedAt: number;
	deletedAt: number | null;
};

const SYNC_DEBOUNCE_MS = 1500;

function toEpochMs(value: Date | number | null | undefined): number {
	if (value instanceof Date) {
		return value.getTime();
	}
	if (typeof value === 'number' && Number.isFinite(value)) {
		return value;
	}
	return 0;
}

function parseJsonArray<T>(value: unknown, fallback: T[]): T[] {
	if (Array.isArray(value)) {
		return value as T[];
	}
	if (typeof value === 'string') {
		try {
			const parsed = JSON.parse(value) as unknown;
			return Array.isArray(parsed) ? (parsed as T[]) : fallback;
		} catch {
			return fallback;
		}
	}
	return fallback;
}

function mapRemoteQueue(record: RecordModel): RemoteQueue {
	return {
		id: record.id,
		name: typeof record.name === 'string' ? record.name : '',
		concurrency: Number(record.concurrency) || 1,
		maxLength:
			record.maxLength == null || record.maxLength === ''
				? null
				: Number(record.maxLength) || null,
		sortOrder: Number(record.sortOrder) || 0,
		clientUpdatedAt: Number(record.clientUpdatedAt) || 0,
		deletedAt:
			record.deletedAt == null || record.deletedAt === ''
				? null
				: Number(record.deletedAt) || null
	};
}

function mapRemoteAction(record: RecordModel): RemoteAction {
	return {
		id: record.id,
		name: typeof record.name === 'string' ? record.name : '',
		group: typeof record.group === 'string' ? record.group : 'default',
		groupSortOrder: Number(record.groupSortOrder) || 0,
		sortOrder: Number(record.sortOrder) || 0,
		triggers: parseJsonArray<StoredActionTrigger>(record.triggers, []),
		handlers: parseJsonArray<StoredActionHandler>(record.handlers, []),
		enabled: Boolean(record.enabled),
		queueSyncId:
			typeof record.queueSyncId === 'string' && record.queueSyncId.trim()
				? record.queueSyncId.trim()
				: null,
		ownerPluginKey:
			typeof record.ownerPluginKey === 'string' && record.ownerPluginKey.trim()
				? record.ownerPluginKey.trim()
				: null,
		clientUpdatedAt: Number(record.clientUpdatedAt) || 0,
		deletedAt:
			record.deletedAt == null || record.deletedAt === ''
				? null
				: Number(record.deletedAt) || null
	};
}

/**
 * Offline-first sync of actions + action queues to PocketBase
 * (`user_actions`, `user_action_queues`). Local SQLite remains the runtime store.
 */
export class ConfigSync {
	#app: App;
	#started = false;
	#running = false;
	#debounceTimer: ReturnType<typeof setTimeout> | null = null;
	#suppressSchedule = false;

	status = $state<ConfigSyncStatus>('idle');
	lastSyncedAt = $state<Date | null>(null);
	lastError = $state<string | null>(null);

	constructor(app: App) {
		this.#app = app;
	}

	start(): void {
		if (this.#started) {
			return;
		}
		this.#started = true;

		setConfigSyncLocalChangeHandler(() => this.scheduleSync());

		this.#app.auth.onChange((user) => {
			void this.#onAuthChange(user);
		});
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
			return;
		}

		if (!this.#canSync()) {
			this.status = this.#app.auth.user ? 'disabled' : 'idle';
			return;
		}

		this.#running = true;
		this.status = 'syncing';
		this.lastError = null;
		this.#suppressSchedule = true;

		try {
			await this.#syncQueues();
			await this.#syncActions();
			this.lastSyncedAt = new Date();
			this.status = 'synced';
			await this.#reloadRuntime();
		} catch (error) {
			if (isPocketBaseAutoCancelled(error)) {
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
		} finally {
			this.#suppressSchedule = false;
			this.#running = false;
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
			this.status = user ? 'disabled' : 'idle';
			return;
		}

		await this.sync();
	}

	async #reloadRuntime(): Promise<void> {
		await this.#app.actionQueues.load();
		await this.#app.actions.load();
	}

	async #syncQueues(): Promise<void> {
		const pb = this.#app.auth.client;
		const userId = this.#app.auth.user!.id;
		const localQueues = await getActionQueues();
		const tombs = await listConfigSyncTombstones('action_queue');
		const remoteRows = await pb.collection('user_action_queues').getFullList({
			filter: `user="${userId}"`,
			requestKey: null
		});
		const remotes = remoteRows.map(mapRemoteQueue);
		const remoteById = new Map(remotes.map((row) => [row.id, row]));
		const localById = new Map(localQueues.map((row) => [row.syncId, row]));
		const tombById = new Map(tombs.map((row) => [row.syncId, row]));

		const ids = new Set<string>([
			...localById.keys(),
			...remoteById.keys(),
			...tombById.keys()
		]);

		for (const syncId of ids) {
			const local = localById.get(syncId);
			const remote = remoteById.get(syncId);
			const tomb = tombById.get(syncId);
			const localVersion = tomb
				? toEpochMs(tomb.deletedAt)
				: local
					? toEpochMs(local.updatedAt)
					: 0;
			const remoteVersion = remote
				? remote.deletedAt != null
					? remote.deletedAt
					: remote.clientUpdatedAt
				: 0;
			const remoteWins =
				remoteVersion > localVersion ||
				(remoteVersion === localVersion && remote != null && !local && !tomb);

			if (remoteWins && remote) {
				if (remote.deletedAt != null) {
					if (local && !isDefaultActionQueue(local)) {
						const { deleteActionQueue } = await import(
							'$db/repositories/action-queues'
						);
						await deleteActionQueue(local.id);
					}
					await clearConfigSyncTombstone('action_queue', syncId);
				} else {
					await upsertActionQueueFromSync({
						syncId: remote.id,
						name: remote.name,
						concurrency: remote.concurrency,
						maxLength: remote.maxLength,
						sortOrder: remote.sortOrder,
						updatedAt: new Date(remote.clientUpdatedAt || Date.now())
					});
					await clearConfigSyncTombstone('action_queue', syncId);
				}
				continue;
			}

			if (tomb) {
				await this.#upsertRemoteQueue({
					id: syncId,
					user: userId,
					name: local?.name ?? DEFAULT_ACTION_QUEUE_NAME,
					concurrency: local?.concurrency ?? 1,
					maxLength: local?.maxLength ?? undefined,
					sortOrder: local?.sortOrder ?? 0,
					clientUpdatedAt: toEpochMs(tomb.deletedAt),
					deletedAt: toEpochMs(tomb.deletedAt)
				});
				continue;
			}

			if (local) {
				await this.#upsertRemoteQueue({
					id: local.syncId,
					user: userId,
					name: local.name,
					concurrency: local.concurrency,
					maxLength: local.maxLength ?? undefined,
					sortOrder: local.sortOrder,
					clientUpdatedAt: toEpochMs(local.updatedAt)
				});
			}
		}

		await this.#reconcileDefaultQueues(userId);
	}

	async #reconcileDefaultQueues(userId: string): Promise<void> {
		const pb = this.#app.auth.client;
		const localQueues = await getActionQueues();
		const localDefault = localQueues.find((queue) => isDefaultActionQueue(queue));
		if (!localDefault) {
			return;
		}

		const remoteRows = await pb.collection('user_action_queues').getFullList({
			filter: `user="${userId}"`,
			requestKey: null
		});
		const activeDefaults = remoteRows
			.map(mapRemoteQueue)
			.filter(
				(row) => row.deletedAt == null && row.name === DEFAULT_ACTION_QUEUE_NAME
			)
			.sort((a, b) => b.clientUpdatedAt - a.clientUpdatedAt);

		if (activeDefaults.length === 0) {
			return;
		}

		const canonical = activeDefaults[0]!;
		for (const duplicate of activeDefaults.slice(1)) {
			await this.#upsertRemoteQueue({
				id: duplicate.id,
				user: userId,
				name: duplicate.name,
				concurrency: duplicate.concurrency,
				maxLength: duplicate.maxLength,
				sortOrder: duplicate.sortOrder,
				clientUpdatedAt: Date.now(),
				deletedAt: Date.now()
			});
		}

		if (localDefault.syncId !== canonical.id) {
			const previousSyncId = localDefault.syncId;
			await replaceActionQueueSyncId(localDefault.id, canonical.id);
			await this.#upsertRemoteQueue({
				id: previousSyncId,
				user: userId,
				name: localDefault.name,
				concurrency: localDefault.concurrency,
				maxLength: localDefault.maxLength,
				sortOrder: localDefault.sortOrder,
				clientUpdatedAt: Date.now(),
				deletedAt: Date.now()
			});
			await clearConfigSyncTombstone('action_queue', previousSyncId);
		}
	}

	async #syncActions(): Promise<void> {
		const pb = this.#app.auth.client;
		const userId = this.#app.auth.user!.id;
		const localActions = await getActions();
		const queues = await getActionQueues();
		const queueIdBySyncId = new Map(queues.map((queue) => [queue.syncId, queue.id]));
		const queueSyncIdById = new Map(queues.map((queue) => [queue.id, queue.syncId]));
		const tombs = await listConfigSyncTombstones('action');
		const remoteRows = await pb.collection('user_actions').getFullList({
			filter: `user="${userId}"`,
			requestKey: null
		});
		const remotes = remoteRows.map(mapRemoteAction);
		const remoteById = new Map(remotes.map((row) => [row.id, row]));
		const localById = new Map(localActions.map((row) => [row.syncId, row]));
		const tombById = new Map(tombs.map((row) => [row.syncId, row]));

		const ids = new Set<string>([
			...localById.keys(),
			...remoteById.keys(),
			...tombById.keys()
		]);

		for (const syncId of ids) {
			const local = localById.get(syncId);
			const remote = remoteById.get(syncId);
			const tomb = tombById.get(syncId);
			const localVersion = tomb
				? toEpochMs(tomb.deletedAt)
				: local
					? toEpochMs(local.updatedAt)
					: 0;
			const remoteVersion = remote
				? remote.deletedAt != null
					? remote.deletedAt
					: remote.clientUpdatedAt
				: 0;
			const remoteWins =
				remoteVersion > localVersion ||
				(remoteVersion === localVersion && remote != null && !local && !tomb);

			if (remoteWins && remote) {
				if (remote.deletedAt != null) {
					await deleteActionBySyncId(syncId);
					await clearConfigSyncTombstone('action', syncId);
				} else {
					const queueId = remote.queueSyncId
						? (queueIdBySyncId.get(remote.queueSyncId) ?? null)
						: null;
					await upsertActionFromSync({
						syncId: remote.id,
						name: remote.name,
						group: remote.group,
						groupSortOrder: remote.groupSortOrder,
						sortOrder: remote.sortOrder,
						enabled: remote.enabled,
						queueId,
						ownerPluginKey: remote.ownerPluginKey,
						triggers: remote.triggers,
						handlers: remote.handlers,
						updatedAt: new Date(remote.clientUpdatedAt || Date.now())
					});
					await clearConfigSyncTombstone('action', syncId);
				}
				continue;
			}

			if (tomb) {
				await this.#upsertRemoteAction({
					id: syncId,
					user: userId,
					name: local?.name ?? 'Deleted action',
					group: local?.group ?? 'default',
					groupSortOrder: local?.groupSortOrder ?? 0,
					sortOrder: local?.sortOrder ?? 0,
					triggers: local?.triggers ?? [],
					handlers: local?.handlers ?? [],
					enabled: local?.enabled ?? false,
					queueSyncId:
						local?.queueId != null
							? (queueSyncIdById.get(local.queueId) ?? undefined)
							: undefined,
					ownerPluginKey: local?.ownerPluginKey ?? undefined,
					clientUpdatedAt: toEpochMs(tomb.deletedAt),
					deletedAt: toEpochMs(tomb.deletedAt)
				});
				continue;
			}

			if (local) {
				await this.#upsertRemoteAction({
					id: local.syncId,
					user: userId,
					name: local.name,
					group: local.group,
					groupSortOrder: local.groupSortOrder,
					sortOrder: local.sortOrder,
					triggers: local.triggers,
					handlers: local.handlers,
					enabled: local.enabled,
					queueSyncId:
						local.queueId != null
							? (queueSyncIdById.get(local.queueId) ?? undefined)
							: undefined,
					ownerPluginKey: local.ownerPluginKey ?? undefined,
					clientUpdatedAt: toEpochMs(local.updatedAt)
				});
			}
		}
	}

	async #upsertRemoteQueue(body: Record<string, unknown>): Promise<void> {
		const pb = this.#app.auth.client;
		const id = String(body.id);
		const payload = sanitizeSyncPayload(body);
		try {
			await pb.collection('user_action_queues').update(id, payload, { requestKey: null });
		} catch (updateError) {
			try {
				await pb.collection('user_action_queues').create(payload, { requestKey: null });
			} catch (createError) {
				throw enrichPocketBaseError(createError, updateError);
			}
		}
	}

	async #upsertRemoteAction(body: Record<string, unknown>): Promise<void> {
		const pb = this.#app.auth.client;
		const id = String(body.id);
		const payload = sanitizeSyncPayload(body);
		try {
			await pb.collection('user_actions').update(id, payload, { requestKey: null });
		} catch (updateError) {
			try {
				await pb.collection('user_actions').create(payload, { requestKey: null });
			} catch (createError) {
				throw enrichPocketBaseError(createError, updateError);
			}
		}
	}
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

function enrichPocketBaseError(createError: unknown, updateError: unknown): Error {
	const detail =
		createError && typeof createError === 'object' && 'response' in createError
			? JSON.stringify((createError as { response?: unknown }).response ?? {})
			: createError instanceof Error
				? createError.message
				: String(createError);
	const message = `Config sync create failed: ${detail}`;
	console.warn(message, { createError, updateError });
	return createError instanceof Error ? createError : new Error(message);
}
