import { db } from '../index';
import { executeBatch, type BatchStatement } from '../batch';
import { actionQueues } from '../schemas/action-queues';
import { actions } from '../schemas/actions';
import { dashboardWidgets } from '../schemas/dashboard-widgets';
import { overlays } from '../schemas/overlays';
import { pluginRecords } from '../schemas/plugin-records';
import { createSyncId } from '../sync-id';

/** Replaces every string that is exactly an old sync id, at any depth. */
function remapIds(value: unknown, ids: Map<string, string>): unknown {
	if (typeof value === 'string') {
		return ids.get(value) ?? value;
	}
	if (Array.isArray(value)) {
		return value.map((entry) => remapIds(entry, ids));
	}
	if (value && typeof value === 'object') {
		return Object.fromEntries(
			Object.entries(value).map(([key, entry]) => [key, remapIds(entry, ids)])
		);
	}
	return value;
}

function remapJson(value: unknown, ids: Map<string, string>): string {
	return JSON.stringify(remapIds(value, ids));
}

/**
 * Gives all local synced data new sync ids, so it can be uploaded to another account:
 * cloud record ids are unique across accounts, and the old account keeps its own copy.
 * References to old ids inside actions, overlays and plugin records are rewritten, and
 * the sync bookkeeping of the old account is dropped. Runs as one transaction.
 *
 * @param keepPluginRecordId Plugin records whose id must stay (ids derived from a key).
 */
export async function reassignSyncIdsForNewAccount(
	keepPluginRecordId: (row: { pluginKey: string; syncId: string }) => boolean
): Promise<void> {
	const actionRows = await db.select().from(actions);
	const queueRows = await db.select().from(actionQueues);
	const overlayRows = await db.select().from(overlays);
	const widgetRows = await db.select().from(dashboardWidgets);
	const recordRows = await db.select().from(pluginRecords);

	const ids = new Map<string, string>();
	const reassign = (syncId: string) => {
		ids.set(syncId, createSyncId());
	};
	actionRows.forEach((row) => reassign(row.syncId));
	queueRows.forEach((row) => reassign(row.syncId));
	overlayRows.forEach((row) => reassign(row.syncId));
	widgetRows.forEach((row) => reassign(row.syncId));
	recordRows.filter((row) => !keepPluginRecordId(row)).forEach((row) => reassign(row.syncId));

	const newId = (syncId: string) => ids.get(syncId) ?? syncId;
	const statements: BatchStatement[] = [];

	for (const row of actionRows) {
		statements.push({
			sql: 'UPDATE actions SET sync_id = ?, triggers = ?, handlers = ? WHERE id = ?',
			params: [newId(row.syncId), remapJson(row.triggers, ids), remapJson(row.handlers, ids), row.id]
		});
	}
	for (const row of queueRows) {
		statements.push({
			sql: 'UPDATE action_queues SET sync_id = ? WHERE id = ?',
			params: [newId(row.syncId), row.id]
		});
	}
	for (const row of overlayRows) {
		// An empty hash makes bundle sync upload the project to the new account.
		statements.push({
			sql: "UPDATE overlays SET sync_id = ?, config = ?, installed_action_keys = ?, source_hash = '' WHERE id = ?",
			params: [
				newId(row.syncId),
				remapJson(row.config, ids),
				remapJson(row.installedActionKeys, ids),
				row.id
			]
		});
	}
	for (const row of widgetRows) {
		statements.push({
			sql: 'UPDATE dashboard_widgets SET sync_id = ? WHERE id = ?',
			params: [newId(row.syncId), row.id]
		});
	}
	for (const row of recordRows) {
		statements.push({
			sql: 'UPDATE plugin_records SET sync_id = ?, payload = ? WHERE id = ?',
			params: [newId(row.syncId), remapJson(row.payload, ids), row.id]
		});
	}

	statements.push({ sql: 'DELETE FROM config_sync_tombstones' });
	statements.push({ sql: 'DELETE FROM config_sync_base' });

	await executeBatch(statements);
}
