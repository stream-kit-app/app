import type { SyncAdapter, SyncAdapterContext, SyncLocalRow, SyncRemoteRow } from './adapter';

import {
	clearConfigSyncTombstone,
	listConfigSyncTombstones
} from '$db/repositories/config-sync-tombstones';

import { remoteWinsLww, toLwwSide } from './lww';

export function toEpochMs(value: Date | number | null | undefined): number {
	if (value instanceof Date) {
		return value.getTime();
	}
	if (typeof value === 'number' && Number.isFinite(value)) {
		return value;
	}
	return 0;
}

/** Missing remote revision → 1 to match SQLite DEFAULT 1 (avoid upgrade skew). */
export function readRevision(value: unknown): number {
	if (value == null || value === '') {
		return 1;
	}
	const n = Number(value);
	return Number.isFinite(n) ? n : 1;
}

/**
 * Shared LWW pass for one SyncAdapter: union of local / remote / tombstone ids,
 * apply remote wins, push local wins and tombstones.
 */
export async function runSyncAdapter<TLocal extends SyncLocalRow, TRemote extends SyncRemoteRow>(
	adapter: SyncAdapter<TLocal, TRemote>,
	ctx: SyncAdapterContext
): Promise<void> {
	const localRows = await adapter.listLocal();
	const tombs = await listConfigSyncTombstones(adapter.entityType);
	const remotes = await adapter.listRemote(ctx);
	const remoteById = new Map(remotes.map((row) => [row.id, row]));
	const localById = new Map(localRows.map((row) => [row.syncId, row]));
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

		if (
			local &&
			remote &&
			!tomb &&
			local.revision === remote.revision &&
			remote.deletedAt == null
		) {
			continue;
		}

		const localSide = tomb
			? toLwwSide({
					revision: tomb.revision,
					clientUpdatedAt: toEpochMs(tomb.deletedAt),
					present: false
				})
			: local
				? toLwwSide({
						revision: local.revision,
						clientUpdatedAt: toEpochMs(local.updatedAt),
						present: true
					})
				: toLwwSide({ revision: 0, clientUpdatedAt: 0, present: false });

		const remoteSide = remote
			? toLwwSide({
					revision: remote.revision,
					clientUpdatedAt: remote.clientUpdatedAt,
					present: remote.deletedAt == null
				})
			: toLwwSide({ revision: 0, clientUpdatedAt: 0, present: false });

		const remoteWins = remoteWinsLww(localSide, remoteSide);

		if (remoteWins && remote) {
			if (remote.deletedAt != null) {
				if (local && !adapter.shouldSkipDelete?.(local)) {
					await adapter.snapshotToTrash?.(syncId);
					await adapter.deleteLocal(syncId);
				}
				await clearConfigSyncTombstone(adapter.entityType, syncId);
			} else {
				await adapter.upsertLocalFromSync(remote);
				await clearConfigSyncTombstone(adapter.entityType, syncId);
			}
			continue;
		}

		if (tomb) {
			const body = await adapter.toDeletePayload(syncId, tomb, local, ctx);
			await ctx.upsertRemote(adapter.collection, body, { exists: remote != null });
			await clearConfigSyncTombstone(adapter.entityType, syncId);
			continue;
		}

		if (local) {
			const body = await adapter.toRemotePayload(local, ctx);
			await ctx.upsertRemote(adapter.collection, body, { exists: remote != null });
		}
	}

	await adapter.afterSync?.(ctx);
}
