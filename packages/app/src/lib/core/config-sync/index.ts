export { ConfigSync, type ConfigSyncStatus } from './config-sync.svelte';
export type {
	SyncAdapter,
	SyncAdapterContext,
	SyncLocalRow,
	SyncRemoteRow
} from './adapter';
export { runSyncAdapter, readRevision, toEpochMs } from './sync-loop';
export {
	decideLww,
	remoteWinsLww,
	toLwwSide,
	type LwwSide
} from './lww';
