import type { RecordModel } from 'pocketbase';

import type { App } from '../../app.svelte';
import type {
	StoredActionHandler,
	StoredActionTrigger
} from '../../action/stored-action';
import type { SyncAdapter } from '../adapter';

import {
	deleteActionBySyncId,
	getActions,
	upsertActionFromSync
} from '$db/repositories/actions';
import { getActionQueues } from '$db/repositories/action-queues';
import { snapshotActionToTrash } from '$db/repositories/config-sync-trash';
import type { ActionRecord } from '$db/schemas/actions';
import { normalizeCloudFileRefsInHandlers } from '../../user-files/normalize-cloud-file-refs';

import { readRevision, toEpochMs } from '../sync-loop';

export type RemoteAction = {
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
	revision: number;
	clientUpdatedAt: number;
	deletedAt: number | null;
};

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

export function mapRemoteAction(record: RecordModel): RemoteAction {
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
		revision: readRevision(record.revision),
		clientUpdatedAt: Number(record.clientUpdatedAt) || 0,
		deletedAt:
			record.deletedAt == null || record.deletedAt === ''
				? null
				: Number(record.deletedAt) || null
	};
}

export function createActionAdapter(app: App): SyncAdapter<ActionRecord, RemoteAction> {
	return {
		entityType: 'action',
		collection: 'user_actions',
		listLocal: () => getActions(),
		async listRemote(ctx) {
			const pb = app.auth.client;
			const rows = await pb.collection('user_actions').getFullList({
				filter: pb.filter('user={:id}', { id: ctx.userId }),
				requestKey: null
			});
			return rows.map(mapRemoteAction);
		},
		async upsertLocalFromSync(remote) {
			const queues = await getActionQueues();
			const queueIdBySyncId = new Map(queues.map((queue) => [queue.syncId, queue.id]));
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
				handlers: normalizeCloudFileRefsInHandlers(remote.handlers).handlers,
				revision: remote.revision || 1,
				updatedAt: new Date(remote.clientUpdatedAt || Date.now())
			});
		},
		deleteLocal: deleteActionBySyncId,
		async toRemotePayload(local, ctx) {
			const queues = await getActionQueues();
			const queueSyncIdById = new Map(queues.map((queue) => [queue.id, queue.syncId]));
			const handlers = normalizeCloudFileRefsInHandlers(
				Array.isArray(local.handlers) ? local.handlers : []
			).handlers;
			return {
				id: local.syncId,
				user: ctx.userId,
				name: local.name,
				group: local.group,
				groupSortOrder: local.groupSortOrder,
				sortOrder: local.sortOrder,
				triggers: Array.isArray(local.triggers) ? local.triggers : [],
				handlers,
				enabled: local.enabled,
				queueSyncId:
					local.queueId != null
						? (queueSyncIdById.get(local.queueId) ?? undefined)
						: undefined,
				ownerPluginKey: local.ownerPluginKey ?? undefined,
				revision: local.revision,
				clientUpdatedAt: toEpochMs(local.updatedAt)
			};
		},
		async toDeletePayload(syncId, tomb, local, ctx) {
			const queues = await getActionQueues();
			const queueSyncIdById = new Map(queues.map((queue) => [queue.id, queue.syncId]));
			return {
				id: syncId,
				user: ctx.userId,
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
				revision: tomb.revision ?? (local?.revision ?? 0) + 1,
				clientUpdatedAt: toEpochMs(tomb.deletedAt),
				deletedAt: toEpochMs(tomb.deletedAt)
			};
		},
		snapshotToTrash: snapshotActionToTrash,
		async reload() {
			if (app.actionQueues.hasBusyQueues()) {
				console.warn('Skipping config sync runtime reload: action queues are busy');
				return;
			}
			await app.actions.load();
		}
	};
}
