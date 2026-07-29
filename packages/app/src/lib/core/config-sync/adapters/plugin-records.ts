import type { RecordModel } from 'pocketbase';

import type { App } from '../../app.svelte';
import type { SyncAdapter } from '../adapter';
import type { PluginRecordRow } from '$db/schemas/plugin-records';

import {
	deletePluginRecordBySyncIdFromSync,
	listAllPluginRecords,
	snapshotPluginRecordToTrash,
	upsertPluginRecordFromSync
} from '$db/repositories/plugin-records';

import { readRevision, toEpochMs } from '../sync-loop';

export type RemotePluginRecord = {
	id: string;
	pluginKey: string;
	collection: string;
	payload: Record<string, unknown>;
	sortOrder: number;
	revision: number;
	clientUpdatedAt: number;
	deletedAt: number | null;
};

function parsePayload(value: unknown): Record<string, unknown> {
	if (value && typeof value === 'object' && !Array.isArray(value)) {
		return value as Record<string, unknown>;
	}
	if (typeof value === 'string') {
		try {
			const parsed = JSON.parse(value) as unknown;
			if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
				return parsed as Record<string, unknown>;
			}
		} catch {
			return {};
		}
	}
	return {};
}

export function mapRemotePluginRecord(record: RecordModel): RemotePluginRecord {
	return {
		id: record.id,
		pluginKey: typeof record.pluginKey === 'string' ? record.pluginKey : '',
		collection: typeof record.collection === 'string' ? record.collection : '',
		payload: parsePayload(record.payload),
		sortOrder: Number(record.sortOrder) || 0,
		revision: readRevision(record.revision),
		clientUpdatedAt: Number(record.clientUpdatedAt) || 0,
		deletedAt:
			record.deletedAt == null || record.deletedAt === ''
				? null
				: Number(record.deletedAt) || null
	};
}

export function createPluginRecordsAdapter(
	app: App
): SyncAdapter<PluginRecordRow, RemotePluginRecord> {
	return {
		entityType: 'plugin_record',
		collection: 'user_plugin_records',
		listLocal: () => listAllPluginRecords(),
		async listRemote(ctx) {
			const pb = app.auth.client;
			const rows = await pb.collection('user_plugin_records').getFullList({
				filter: pb.filter('user={:id}', { id: ctx.userId }),
				requestKey: null
			});
			return rows.map(mapRemotePluginRecord);
		},
		async upsertLocalFromSync(remote) {
			await upsertPluginRecordFromSync({
				syncId: remote.id,
				pluginKey: remote.pluginKey,
				collection: remote.collection,
				payload: remote.payload,
				sortOrder: remote.sortOrder,
				revision: remote.revision || 1,
				updatedAt: new Date(remote.clientUpdatedAt || Date.now())
			});
		},
		deleteLocal: deletePluginRecordBySyncIdFromSync,
		toRemotePayload(local, ctx) {
			const payload =
				typeof local.payload === 'string'
					? (JSON.parse(local.payload) as Record<string, unknown>)
					: local.payload;
			return {
				id: local.syncId,
				user: ctx.userId,
				pluginKey: local.pluginKey,
				collection: local.collection,
				payload,
				sortOrder: local.sortOrder,
				revision: local.revision,
				clientUpdatedAt: toEpochMs(local.updatedAt)
			};
		},
		toDeletePayload(syncId, tomb, local, ctx) {
			const payload = local
				? typeof local.payload === 'string'
					? (JSON.parse(local.payload) as Record<string, unknown>)
					: local.payload
				: {};
			return {
				id: syncId,
				user: ctx.userId,
				pluginKey: local?.pluginKey ?? 'unknown',
				collection: local?.collection ?? 'unknown',
				payload,
				sortOrder: local?.sortOrder ?? 0,
				revision: tomb.revision ?? (local?.revision ?? 0) + 1,
				clientUpdatedAt: toEpochMs(tomb.deletedAt),
				deletedAt: toEpochMs(tomb.deletedAt)
			};
		},
		snapshotToTrash: snapshotPluginRecordToTrash,
		async reload() {
			app.records.notifyReload();
		}
	};
}
