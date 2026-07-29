import type { RecordModel } from 'pocketbase';

import type { App } from '../../app.svelte';
import type { SyncAdapter, SyncAdapterContext } from '../adapter';

import {
	getActionQueues,
	isDefaultActionQueue,
	replaceActionQueueSyncId,
	upsertActionQueueFromSync,
	type ActionQueueRecord
} from '$db/repositories/action-queues';
import { clearConfigSyncTombstone } from '$db/repositories/config-sync-tombstones';
import { snapshotActionQueueToTrash } from '$db/repositories/config-sync-trash';
import { DEFAULT_ACTION_QUEUE_NAME } from '../../action/stored-action';

import { readRevision, toEpochMs } from '../sync-loop';

export type RemoteQueue = {
	id: string;
	name: string;
	concurrency: number;
	maxLength: number | null;
	sortOrder: number;
	revision: number;
	clientUpdatedAt: number;
	deletedAt: number | null;
};

export function mapRemoteQueue(record: RecordModel): RemoteQueue {
	return {
		id: record.id,
		name: typeof record.name === 'string' ? record.name : '',
		concurrency: Number(record.concurrency) || 1,
		maxLength:
			record.maxLength == null || record.maxLength === ''
				? null
				: Number(record.maxLength) || null,
		sortOrder: Number(record.sortOrder) || 0,
		revision: readRevision(record.revision),
		clientUpdatedAt: Number(record.clientUpdatedAt) || 0,
		deletedAt:
			record.deletedAt == null || record.deletedAt === ''
				? null
				: Number(record.deletedAt) || null
	};
}

export function createActionQueueAdapter(app: App): SyncAdapter<ActionQueueRecord, RemoteQueue> {
	return {
		entityType: 'action_queue',
		collection: 'user_action_queues',
		listLocal: () => getActionQueues(),
		async listRemote(ctx) {
			const pb = app.auth.client;
			const rows = await pb.collection('user_action_queues').getFullList({
				filter: pb.filter('user={:id}', { id: ctx.userId }),
				requestKey: null
			});
			return rows.map(mapRemoteQueue);
		},
		async upsertLocalFromSync(remote) {
			await upsertActionQueueFromSync({
				syncId: remote.id,
				name: remote.name,
				concurrency: remote.concurrency,
				maxLength: remote.maxLength,
				sortOrder: remote.sortOrder,
				revision: remote.revision || 1,
				updatedAt: new Date(remote.clientUpdatedAt || Date.now())
			});
		},
		async deleteLocal(syncId) {
			const queues = await getActionQueues();
			const local = queues.find((queue) => queue.syncId === syncId);
			if (!local || isDefaultActionQueue(local)) {
				return;
			}
			const { deleteActionQueue } = await import('$db/repositories/action-queues');
			await deleteActionQueue(local.id);
		},
		toRemotePayload(local, ctx) {
			return {
				id: local.syncId,
				user: ctx.userId,
				name: local.name,
				concurrency: local.concurrency,
				maxLength: local.maxLength ?? undefined,
				sortOrder: local.sortOrder,
				revision: local.revision,
				clientUpdatedAt: toEpochMs(local.updatedAt)
			};
		},
		toDeletePayload(syncId, tomb, local, ctx) {
			return {
				id: syncId,
				user: ctx.userId,
				name: local?.name ?? DEFAULT_ACTION_QUEUE_NAME,
				concurrency: local?.concurrency ?? 1,
				maxLength: local?.maxLength ?? undefined,
				sortOrder: local?.sortOrder ?? 0,
				revision: tomb.revision ?? (local?.revision ?? 0) + 1,
				clientUpdatedAt: toEpochMs(tomb.deletedAt),
				deletedAt: toEpochMs(tomb.deletedAt)
			};
		},
		snapshotToTrash: snapshotActionQueueToTrash,
		shouldSkipDelete: (local) => isDefaultActionQueue(local),
		async afterSync(ctx) {
			await reconcileDefaultQueues(app, ctx);
		},
		async reload() {
			if (app.actionQueues.hasBusyQueues()) {
				console.warn('Skipping config sync runtime reload: action queues are busy');
				return;
			}
			await app.actionQueues.load();
		}
	};
}

async function reconcileDefaultQueues(app: App, ctx: SyncAdapterContext): Promise<void> {
	const pb = app.auth.client;
	const localQueues = await getActionQueues();
	const localDefault = localQueues.find((queue) => isDefaultActionQueue(queue));
	if (!localDefault) {
		return;
	}

	const remoteRows = await pb.collection('user_action_queues').getFullList({
		filter: pb.filter('user={:id}', { id: ctx.userId }),
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
		await ctx.upsertRemote('user_action_queues', {
			id: duplicate.id,
			user: ctx.userId,
			name: duplicate.name,
			concurrency: duplicate.concurrency,
			maxLength: duplicate.maxLength,
			sortOrder: duplicate.sortOrder,
			revision: (duplicate.revision || 0) + 1,
			clientUpdatedAt: Date.now(),
			deletedAt: Date.now()
		});
	}

	if (localDefault.syncId !== canonical.id) {
		const previousSyncId = localDefault.syncId;
		await replaceActionQueueSyncId(localDefault.id, canonical.id);
		await ctx.upsertRemote('user_action_queues', {
			id: previousSyncId,
			user: ctx.userId,
			name: localDefault.name,
			concurrency: localDefault.concurrency,
			maxLength: localDefault.maxLength,
			sortOrder: localDefault.sortOrder,
			revision: (localDefault.revision || 0) + 1,
			clientUpdatedAt: Date.now(),
			deletedAt: Date.now()
		});
		await clearConfigSyncTombstone('action_queue', previousSyncId);
	}
}
