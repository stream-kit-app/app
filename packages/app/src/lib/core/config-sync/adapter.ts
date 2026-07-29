import type { ConfigSyncEntityType } from '$db/schemas/config-sync-tombstones';

/** Minimal local row shape the LWW loop needs. */
export type SyncLocalRow = {
	syncId: string;
	revision: number;
	updatedAt: Date | number;
};

/** Minimal remote row shape the LWW loop needs. */
export type SyncRemoteRow = {
	id: string;
	revision: number;
	clientUpdatedAt: number;
	deletedAt: number | null;
};

export type SyncUpsertRemoteOptions = {
	/** When known from listRemote — avoids a probing getOne that floods the console with 404s. */
	exists?: boolean;
};

export type SyncAdapterContext = {
	userId: string;
	upsertRemote: (
		collection: string,
		body: Record<string, unknown>,
		options?: SyncUpsertRemoteOptions
	) => Promise<void>;
};

/**
 * Per-entity sync adapter. The ConfigSync engine runs the shared LWW loop;
 * adapters supply local/remote I/O and payload mapping.
 */
export type SyncAdapter<TLocal extends SyncLocalRow = SyncLocalRow, TRemote extends SyncRemoteRow = SyncRemoteRow> = {
	entityType: ConfigSyncEntityType;
	/** PocketBase collection name. */
	collection: string;
	listLocal(): Promise<TLocal[]>;
	listRemote(ctx: SyncAdapterContext): Promise<TRemote[]>;
	/** Apply a non-deleted remote row to local storage (no notify). */
	upsertLocalFromSync(remote: TRemote): Promise<void>;
	/** Hard-delete local row after remote soft-delete wins (no notify / no tombstone). */
	deleteLocal(syncId: string): Promise<void>;
	/** Build PB create/update body for a present local row. */
	toRemotePayload(local: TLocal, ctx: SyncAdapterContext): Record<string, unknown> | Promise<Record<string, unknown>>;
	/** Build PB body that soft-deletes a remote row from a local tombstone. */
	toDeletePayload(
		syncId: string,
		tomb: { revision: number | null; deletedAt: Date },
		local: TLocal | undefined,
		ctx: SyncAdapterContext
	): Record<string, unknown> | Promise<Record<string, unknown>>;
	/** Optional trash snapshot before local hard-delete. */
	snapshotToTrash?(syncId: string): Promise<void>;
	/** Skip local hard-delete when remote soft-delete wins (e.g. default queue). */
	shouldSkipDelete?(local: TLocal): boolean;
	/** Hook after the per-id LWW pass (e.g. reconcile default queues). */
	afterSync?(ctx: SyncAdapterContext): Promise<void>;
	/** Reload in-memory runtime after a successful sync pass. */
	reload?(): Promise<void>;
};
