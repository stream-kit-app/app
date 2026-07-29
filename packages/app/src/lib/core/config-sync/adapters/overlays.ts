import type { RecordModel } from 'pocketbase';

import type { App } from '../../app.svelte';
import type { SyncAdapter } from '../adapter';
import type { OverlayRecord } from '$db/schemas/overlays';

import {
	deleteOverlayBySyncIdFromSync,
	getOverlays,
	upsertOverlayFromSync
} from '$db/repositories/overlays';
import { writeConfigSyncTrash } from '$db/repositories/config-sync-trash';

import { readRevision, toEpochMs } from '../sync-loop';

export type RemoteOverlayProject = {
	id: string;
	overlayId: string;
	name: string;
	template: string;
	config: Record<string, unknown>;
	version: number;
	expectedEvents: string[];
	requiredPlugins: string[];
	installedActionKeys: string[];
	sourceHash: string;
	revision: number;
	clientUpdatedAt: number;
	deletedAt: number | null;
};

function parseJsonArray(value: unknown): string[] {
	if (Array.isArray(value)) {
		return value.map(String);
	}
	if (typeof value === 'string') {
		try {
			const parsed = JSON.parse(value) as unknown;
			return Array.isArray(parsed) ? parsed.map(String) : [];
		} catch {
			return [];
		}
	}
	return [];
}

function parseConfig(value: unknown): Record<string, unknown> {
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

export function mapRemoteOverlayProject(record: RecordModel): RemoteOverlayProject {
	return {
		id: record.id,
		overlayId: typeof record.overlayId === 'string' ? record.overlayId : record.id,
		name: typeof record.name === 'string' ? record.name : '',
		template: typeof record.template === 'string' ? record.template : 'blank',
		config: parseConfig(record.config),
		version: Number(record.version) || 0,
		expectedEvents: parseJsonArray(record.expectedEvents),
		requiredPlugins: parseJsonArray(record.requiredPlugins),
		installedActionKeys: parseJsonArray(record.installedActionKeys),
		sourceHash: typeof record.sourceHash === 'string' ? record.sourceHash : '',
		revision: readRevision(record.revision),
		clientUpdatedAt: Number(record.clientUpdatedAt) || 0,
		deletedAt:
			record.deletedAt == null || record.deletedAt === ''
				? null
				: Number(record.deletedAt) || null
	};
}

export function createOverlayProjectsAdapter(
	app: App
): SyncAdapter<OverlayRecord, RemoteOverlayProject> {
	return {
		entityType: 'overlay',
		collection: 'user_overlay_projects',
		listLocal: () => getOverlays(),
		async listRemote(ctx) {
			const pb = app.auth.client;
			const rows = await pb.collection('user_overlay_projects').getFullList({
				filter: pb.filter('user={:id}', { id: ctx.userId }),
				requestKey: null
			});
			return rows.map(mapRemoteOverlayProject);
		},
		async upsertLocalFromSync(remote) {
			await upsertOverlayFromSync({
				id: remote.overlayId,
				syncId: remote.id,
				name: remote.name,
				template: remote.template,
				config: remote.config,
				version: remote.version,
				expectedEvents: remote.expectedEvents,
				requiredPlugins: remote.requiredPlugins,
				installedActionKeys: remote.installedActionKeys,
				sourceHash: remote.sourceHash,
				revision: remote.revision || 1,
				updatedAt: new Date(remote.clientUpdatedAt || Date.now())
			});
		},
		async deleteLocal(syncId) {
			const existing = (await getOverlays()).find((row) => row.syncId === syncId);
			if (existing) {
				const { removeOverlayProject } = await import('../../overlay/overlay-project');
				await removeOverlayProject(app.fs, existing.id).catch(() => undefined);
			}
			await deleteOverlayBySyncIdFromSync(syncId);
		},
		toRemotePayload(local, ctx) {
			const config =
				local.config && typeof local.config === 'object' && !Array.isArray(local.config)
					? local.config
					: {};
			return {
				id: local.syncId,
				user: ctx.userId,
				overlayId: local.id,
				name: local.name,
				template: local.template || 'blank',
				config,
				version: local.version,
				expectedEvents: local.expectedEvents ?? [],
				requiredPlugins: local.requiredPlugins ?? [],
				installedActionKeys: local.installedActionKeys ?? [],
				sourceHash: local.sourceHash || undefined,
				revision: local.revision,
				clientUpdatedAt: toEpochMs(local.updatedAt)
			};
		},
		toDeletePayload(syncId, tomb, local, ctx) {
			return {
				id: syncId,
				user: ctx.userId,
				overlayId: local?.id ?? syncId,
				name: local?.name ?? 'Deleted overlay',
				template: local?.template ?? 'blank',
				config: local?.config ?? {},
				version: local?.version ?? 0,
				expectedEvents: local?.expectedEvents ?? [],
				requiredPlugins: local?.requiredPlugins ?? [],
				installedActionKeys: local?.installedActionKeys ?? [],
				revision: tomb.revision ?? (local?.revision ?? 0) + 1,
				clientUpdatedAt: toEpochMs(tomb.deletedAt),
				deletedAt: toEpochMs(tomb.deletedAt)
			};
		},
		async snapshotToTrash(syncId) {
			const existing = (await getOverlays()).find((row) => row.syncId === syncId);
			if (existing) {
				await writeConfigSyncTrash('overlay', syncId, existing);
			}
		},
		async reload() {
			await app.overlay.refresh();
		}
	};
}
