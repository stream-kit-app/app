import type { RecordModel } from 'pocketbase';

import type { App } from '../../app.svelte';
import type { SyncAdapter } from '../adapter';
import type { DashboardWidgetRecord } from '$db/schemas/dashboard-widgets';

import {
	deleteDashboardWidgetBySyncIdFromSync,
	getDashboardWidgets,
	upsertDashboardWidgetFromSync
} from '$db/repositories/dashboard-widgets';
import { writeConfigSyncTrash } from '$db/repositories/config-sync-trash';

import { readRevision, toEpochMs } from '../sync-loop';

export type RemoteDashboardWidget = {
	id: string;
	definitionId: string;
	columns: number;
	sortOrder: number;
	revision: number;
	clientUpdatedAt: number;
	deletedAt: number | null;
};

export function mapRemoteDashboardWidget(record: RecordModel): RemoteDashboardWidget {
	return {
		id: record.id,
		definitionId: typeof record.definitionId === 'string' ? record.definitionId : '',
		columns: Number(record.columns) || 1,
		sortOrder: Number(record.sortOrder) || 0,
		revision: readRevision(record.revision),
		clientUpdatedAt: Number(record.clientUpdatedAt) || 0,
		deletedAt:
			record.deletedAt == null || record.deletedAt === ''
				? null
				: Number(record.deletedAt) || null
	};
}

export function createDashboardWidgetsAdapter(
	app: App
): SyncAdapter<DashboardWidgetRecord, RemoteDashboardWidget> {
	return {
		entityType: 'dashboard_widget',
		collection: 'user_dashboard_widgets',
		listLocal: () => getDashboardWidgets(),
		async listRemote(ctx) {
			const pb = app.auth.client;
			const rows = await pb.collection('user_dashboard_widgets').getFullList({
				filter: pb.filter('user={:id}', { id: ctx.userId }),
				requestKey: null
			});
			return rows.map(mapRemoteDashboardWidget);
		},
		async upsertLocalFromSync(remote) {
			await upsertDashboardWidgetFromSync({
				syncId: remote.id,
				definitionId: remote.definitionId,
				columns: remote.columns,
				sortOrder: remote.sortOrder,
				revision: remote.revision || 1,
				updatedAt: new Date(remote.clientUpdatedAt || Date.now())
			});
		},
		deleteLocal: deleteDashboardWidgetBySyncIdFromSync,
		toRemotePayload(local, ctx) {
			return {
				id: local.syncId,
				user: ctx.userId,
				definitionId: local.definitionId,
				columns: local.columns,
				sortOrder: local.sortOrder,
				revision: local.revision,
				clientUpdatedAt: toEpochMs(local.updatedAt)
			};
		},
		toDeletePayload(syncId, tomb, local, ctx) {
			return {
				id: syncId,
				user: ctx.userId,
				definitionId: local?.definitionId ?? 'unknown',
				columns: local?.columns ?? 1,
				sortOrder: local?.sortOrder ?? 0,
				revision: tomb.revision ?? (local?.revision ?? 0) + 1,
				clientUpdatedAt: toEpochMs(tomb.deletedAt),
				deletedAt: toEpochMs(tomb.deletedAt)
			};
		},
		async snapshotToTrash(syncId) {
			const existing = (await getDashboardWidgets()).find((row) => row.syncId === syncId);
			if (existing) {
				await writeConfigSyncTrash('dashboard_widget', syncId, existing);
			}
		},
		async reload() {
			await app.dashboard.load?.();
		}
	};
}
