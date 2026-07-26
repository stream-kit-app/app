import type {
	ActionLayoutUpdate,
	ActionRecord,
	StoredActionHandler,
	StoredActionTrigger
} from '../schemas/actions';
import type { SelectItem } from '$lib/core/action/trigger/condition';

import { asc, eq, inArray, max, sql } from 'drizzle-orm';

import { db } from '../index';
import { createSyncId } from '../sync-id';
import { actions, DEFAULT_ACTION_GROUP } from '../schemas/actions';
import { getDefaultActionQueueId } from './action-queues';
import { recordConfigSyncTombstone } from './config-sync-tombstones';
import { notifyConfigLocalChange } from '../config-sync-notify';

export type SaveActionInput = {
	name: string;
	group: string;
	enabled: boolean;
	queueId: number | null;
	ownerPluginKey?: string | null;
	triggers: StoredActionTrigger[];
	handlers: StoredActionHandler[];
};

export function normalizeActionGroup(group: string | null | undefined): string {
	const trimmed = group?.trim();

	return trimmed || DEFAULT_ACTION_GROUP;
}

async function getGroupSortOrder(group: string): Promise<number> {
	const [row] = await db
		.select({ groupSortOrder: actions.groupSortOrder })
		.from(actions)
		.where(eq(actions.group, group))
		.limit(1);

	if (row) {
		return row.groupSortOrder;
	}

	const [maxGroupSortOrder] = await db
		.select({ value: max(actions.groupSortOrder) })
		.from(actions);

	return (maxGroupSortOrder?.value ?? -1) + 1;
}

async function getNextSortOrder(group: string): Promise<number> {
	const [row] = await db
		.select({ value: max(actions.sortOrder) })
		.from(actions)
		.where(eq(actions.group, group));

	return (row?.value ?? -1) + 1;
}

export async function getAction(id: number): Promise<ActionRecord> {
	const [row] = await db.select().from(actions).where(eq(actions.id, id)).limit(1);

	if (!row) {
		throw new Error('Action not found');
	}

	return row;
}

export async function getActions(): Promise<ActionRecord[]> {
	return db
		.select()
		.from(actions)
		.orderBy(asc(actions.groupSortOrder), asc(actions.sortOrder), asc(actions.id));
}

export async function getActionGroups(): Promise<SelectItem[]> {
	const rows = await db
		.select({
			group: actions.group,
			groupSortOrder: actions.groupSortOrder
		})
		.from(actions)
		.groupBy(actions.group, actions.groupSortOrder)
		.orderBy(asc(actions.groupSortOrder), asc(actions.group));

	const groups = rows.map((row) => normalizeActionGroup(row.group));

	if (!groups.includes(DEFAULT_ACTION_GROUP)) {
		groups.unshift(DEFAULT_ACTION_GROUP);
	}

	return groups.map((group) => ({ value: group, label: group }));
}

export async function saveAction(
	input: SaveActionInput,
	id?: number
): Promise<ActionRecord | undefined> {
	const now = new Date();
	const group = normalizeActionGroup(input.group);

	if (id != null) {
		const existing = await getAction(id);
		const groupChanged = existing.group !== group;
		const groupSortOrder = groupChanged
			? await getGroupSortOrder(group)
			: existing.groupSortOrder;
		const sortOrder = groupChanged ? await getNextSortOrder(group) : existing.sortOrder;

		const [row] = await db
			.update(actions)
			.set({
				name: input.name,
				group,
				groupSortOrder,
				sortOrder,
				enabled: input.enabled,
				queueId: input.queueId,
				ownerPluginKey: input.ownerPluginKey ?? null,
				triggers: input.triggers,
				handlers: input.handlers,
				updatedAt: now
			})
			.where(eq(actions.id, id))
			.returning();

		notifyConfigLocalChange();
		return row;
	}

	const groupSortOrder = await getGroupSortOrder(group);
	const sortOrder = await getNextSortOrder(group);
	const queueId =
		input.queueId !== undefined ? input.queueId : await getDefaultActionQueueId();

	const [row] = await db
		.insert(actions)
		.values({
			syncId: createSyncId(),
			name: input.name,
			group,
			groupSortOrder,
			sortOrder,
			enabled: input.enabled,
			queueId,
			ownerPluginKey: input.ownerPluginKey ?? null,
			triggers: input.triggers,
			handlers: input.handlers,
			createdAt: now,
			updatedAt: now
		})
		.returning();

	notifyConfigLocalChange();
	return row;
}

export async function reorderActionsLayout(updates: ActionLayoutUpdate[]): Promise<void> {
	if (updates.length === 0) {
		return;
	}

	// tauri-plugin-sql cannot run a multi-statement transaction, so apply every
	// row update in a single atomic UPDATE ... CASE statement instead of a loop.
	const now = Date.now();
	const ids = updates.map((update) => update.id);

	const groupCase = sql.join(
		updates.map((update) => sql`WHEN ${update.id} THEN ${update.group}`),
		sql` `
	);
	const groupSortCase = sql.join(
		updates.map((update) => sql`WHEN ${update.id} THEN ${update.groupSortOrder}`),
		sql` `
	);
	const sortCase = sql.join(
		updates.map((update) => sql`WHEN ${update.id} THEN ${update.sortOrder}`),
		sql` `
	);
	const idList = sql.join(
		ids.map((id) => sql`${id}`),
		sql`, `
	);

	await db.run(sql`
		UPDATE ${actions} SET
			"group" = CASE ${actions.id} ${groupCase} END,
			group_sort_order = CASE ${actions.id} ${groupSortCase} END,
			sort_order = CASE ${actions.id} ${sortCase} END,
			updated_at = ${now}
		WHERE ${actions.id} IN (${idList})
	`);
	notifyConfigLocalChange();
}

export async function updateActionEnabled(id: number, enabled: boolean): Promise<void> {
	await updateActionsEnabled([id], enabled);
}

export async function updateActionsEnabled(ids: number[], enabled: boolean): Promise<void> {
	if (ids.length === 0) {
		return;
	}

	await db
		.update(actions)
		.set({
			enabled,
			updatedAt: new Date()
		})
		.where(inArray(actions.id, ids));
	notifyConfigLocalChange();
}

export async function updateActionsQueue(
	ids: number[],
	queueId: number | null
): Promise<void> {
	if (ids.length === 0) {
		return;
	}

	await db
		.update(actions)
		.set({
			queueId,
			updatedAt: new Date()
		})
		.where(inArray(actions.id, ids));
	notifyConfigLocalChange();
}

export async function deleteAction(id: number) {
	return deleteActions([id]);
}

export async function deleteActions(ids: number[]): Promise<void> {
	if (ids.length === 0) {
		return;
	}

	const rows = await db
		.select({ syncId: actions.syncId })
		.from(actions)
		.where(inArray(actions.id, ids));

	await db.delete(actions).where(inArray(actions.id, ids));

	const deletedAt = new Date();
	for (const row of rows) {
		if (row.syncId) {
			await recordConfigSyncTombstone('action', row.syncId, deletedAt);
		}
	}
	notifyConfigLocalChange();
}

export async function getActionBySyncId(syncId: string): Promise<ActionRecord | undefined> {
	const [row] = await db.select().from(actions).where(eq(actions.syncId, syncId)).limit(1);

	return row;
}

export async function upsertActionFromSync(input: {
	syncId: string;
	name: string;
	group: string;
	groupSortOrder: number;
	sortOrder: number;
	enabled: boolean;
	queueId: number | null;
	ownerPluginKey: string | null;
	triggers: StoredActionTrigger[];
	handlers: StoredActionHandler[];
	updatedAt: Date;
}): Promise<ActionRecord> {
	const existing = await getActionBySyncId(input.syncId);
	const group = normalizeActionGroup(input.group);

	if (existing) {
		const [row] = await db
			.update(actions)
			.set({
				name: input.name,
				group,
				groupSortOrder: input.groupSortOrder,
				sortOrder: input.sortOrder,
				enabled: input.enabled,
				queueId: input.queueId,
				ownerPluginKey: input.ownerPluginKey,
				triggers: input.triggers,
				handlers: input.handlers,
				updatedAt: input.updatedAt
			})
			.where(eq(actions.id, existing.id))
			.returning();

		if (!row) {
			throw new Error('Failed to update action from sync');
		}

		return row;
	}

	const [row] = await db
		.insert(actions)
		.values({
			syncId: input.syncId,
			name: input.name,
			group,
			groupSortOrder: input.groupSortOrder,
			sortOrder: input.sortOrder,
			enabled: input.enabled,
			queueId: input.queueId,
			ownerPluginKey: input.ownerPluginKey,
			triggers: input.triggers,
			handlers: input.handlers,
			createdAt: input.updatedAt,
			updatedAt: input.updatedAt
		})
		.returning();

	if (!row) {
		throw new Error('Failed to create action from sync');
	}

	return row;
}

export async function deleteActionBySyncId(syncId: string): Promise<void> {
	const existing = await getActionBySyncId(syncId);
	if (!existing) {
		await recordConfigSyncTombstone('action', syncId);
		return;
	}

	await deleteActions([existing.id]);
}

export async function deleteActionsByOwner(ownerPluginKey: string): Promise<number> {
	const rows = await db
		.select({ id: actions.id })
		.from(actions)
		.where(eq(actions.ownerPluginKey, ownerPluginKey));

	if (rows.length === 0) {
		return 0;
	}

	const ids = rows.map((row) => row.id);
	await deleteActions(ids);

	return ids.length;
}
