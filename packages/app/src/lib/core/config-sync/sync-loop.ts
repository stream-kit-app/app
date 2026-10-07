import type { SyncAdapter, SyncAdapterContext, SyncLocalRow, SyncRemoteRow } from './adapter';

import {
	deleteConfigSyncBase,
	listConfigSyncBases,
	setConfigSyncBase
} from '#db/repositories/config-sync-base.js';
import {
	clearConfigSyncTombstone,
	listConfigSyncTombstones
} from '#db/repositories/config-sync-tombstones.js';
import { writeConfigSyncTrash } from '#db/repositories/config-sync-trash.js';

import { contentOf, mergeFields } from './field-merge';
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
 *
 * @returns Whether local rows may have changed, so the runtime needs a reload.
 */
export async function runSyncAdapter<TLocal extends SyncLocalRow, TRemote extends SyncRemoteRow>(
	adapter: SyncAdapter<TLocal, TRemote>,
	ctx: SyncAdapterContext
): Promise<boolean> {
	// afterSync hooks may write local rows themselves; treat them as changing.
	let localChanged = adapter.afterSync != null;
	const localRows = await adapter.listLocal();
	const tombs = await listConfigSyncTombstones(adapter.entityType);
	const remotes = await adapter.listRemote(ctx);
	const bases = await listConfigSyncBases(adapter.entityType);
	// Only merging adapters need the content; others just need the revision to detect conflicts.
	const baseContent = (row: object): Record<string, unknown> =>
		adapter.fieldMerge ? contentOf(row as Record<string, unknown>) : {};
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

		const base = bases.get(syncId);

		if (
			local &&
			remote &&
			!tomb &&
			local.revision === remote.revision &&
			remote.deletedAt == null
		) {
			// In sync: remember this version as the common ancestor for future merges.
			if (base?.revision !== remote.revision) {
				await setConfigSyncBase(adapter.entityType, syncId, remote.revision, baseContent(remote));
			}
			continue;
		}

		// Both sides changed since the last sync: a true conflict, not just a newer version.
		const bothChanged =
			local != null &&
			remote != null &&
			!tomb &&
			remote.deletedAt == null &&
			base != null &&
			local.revision !== base.revision &&
			remote.revision !== base.revision;

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

		if (bothChanged && local && remote && base && adapter.fieldMerge) {
			const localBody = await adapter.toRemotePayload(local, ctx);
			const { merged, conflictedFields } = mergeFields(
				base.content,
				contentOf(localBody),
				contentOf(remote),
				remoteWins ? 'remote' : 'local'
			);

			if (conflictedFields.length > 0) {
				// Keep the version that lost the conflicting fields.
				if (remoteWins) {
					await adapter.snapshotToTrash?.(syncId);
				} else {
					await writeConfigSyncTrash(adapter.entityType, syncId, remote);
				}
				ctx.reportConflict?.(adapter.entityType, syncId);
			}

			const revision = Math.max(local.revision, remote.revision) + 1;
			const clientUpdatedAt = Date.now();
			const body: Record<string, unknown> = { ...localBody, revision, clientUpdatedAt };
			for (const [key, value] of Object.entries(merged)) {
				// Payloads omit empty optional fields (undefined) rather than sending null.
				body[key] = value === null && localBody[key] === undefined ? undefined : value;
			}

			await adapter.upsertLocalFromSync({
				...remote,
				...merged,
				revision,
				clientUpdatedAt,
				deletedAt: null
			});
			await ctx.upsertRemote(adapter.collection, body, { exists: true });
			await setConfigSyncBase(adapter.entityType, syncId, revision, merged);
			localChanged = true;
			continue;
		}

		if (bothChanged && local && remote) {
			// No field merge for this entity: last write wins, but keep the losing version.
			if (remoteWins) {
				await adapter.snapshotToTrash?.(syncId);
			} else {
				await writeConfigSyncTrash(adapter.entityType, syncId, remote);
			}
			ctx.reportConflict?.(adapter.entityType, syncId);
		}

		if (remoteWins && remote) {
			if (remote.deletedAt != null) {
				if (local && !adapter.shouldSkipDelete?.(local)) {
					await adapter.snapshotToTrash?.(syncId);
					await adapter.deleteLocal(syncId);
					localChanged = true;
				}
				await clearConfigSyncTombstone(adapter.entityType, syncId);
				await deleteConfigSyncBase(adapter.entityType, syncId);
			} else {
				await adapter.upsertLocalFromSync(remote);
				await clearConfigSyncTombstone(adapter.entityType, syncId);
				await setConfigSyncBase(adapter.entityType, syncId, remote.revision, baseContent(remote));
				localChanged = true;
			}
			continue;
		}

		if (tomb) {
			const body = await adapter.toDeletePayload(syncId, tomb, local, ctx);
			await ctx.upsertRemote(adapter.collection, body, { exists: remote != null });
			await clearConfigSyncTombstone(adapter.entityType, syncId);
			await deleteConfigSyncBase(adapter.entityType, syncId);
			continue;
		}

		if (local) {
			const body = await adapter.toRemotePayload(local, ctx);
			await ctx.upsertRemote(adapter.collection, body, { exists: remote != null });
			await setConfigSyncBase(adapter.entityType, syncId, local.revision, baseContent(body));
		}
	}

	await adapter.afterSync?.(ctx);

	return localChanged;
}
