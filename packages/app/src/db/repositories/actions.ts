import type {
	ActionLayoutUpdate,
	ActionRecord,
	StoredActionHandler,
	StoredActionTrigger
} from '../schemas/actions';
import type { SelectItem } from '$lib/core/action/trigger/condition';

import { asc, eq, inArray, max } from 'drizzle-orm';

import { db } from '../index';
import { actions, DEFAULT_ACTION_GROUP } from '../schemas/actions';

export type SaveActionInput = {
	name: string;
	group: string;
	enabled: boolean;
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

export async function saveAction(input: SaveActionInput, id?: number): Promise<ActionRecord> {
	const now = new Date();
	const group = normalizeActionGroup(input.group);

	if (id != null) {
		const existing = await getAction(id);
		const groupChanged = existing.group !== group;
		const groupSortOrder = groupChanged ? await getGroupSortOrder(group) : existing.groupSortOrder;
		const sortOrder = groupChanged ? await getNextSortOrder(group) : existing.sortOrder;

		const [row] = await db
			.update(actions)
			.set({
				name: input.name,
				group,
				groupSortOrder,
				sortOrder,
				enabled: input.enabled,
				triggers: input.triggers,
				handlers: input.handlers,
				updatedAt: now
			})
			.where(eq(actions.id, id))
			.returning();

		return row;
	}

	const groupSortOrder = await getGroupSortOrder(group);
	const sortOrder = await getNextSortOrder(group);

	const [row] = await db
		.insert(actions)
		.values({
			name: input.name,
			group,
			groupSortOrder,
			sortOrder,
			enabled: input.enabled,
			triggers: input.triggers,
			handlers: input.handlers,
			createdAt: now,
			updatedAt: now
		})
		.returning();

	return row;
}

export async function reorderActionsLayout(updates: ActionLayoutUpdate[]): Promise<void> {
	if (updates.length === 0) {
		return;
	}

	const now = new Date();

	for (const update of updates) {
		await db
			.update(actions)
			.set({
				group: update.group,
				groupSortOrder: update.groupSortOrder,
				sortOrder: update.sortOrder,
				updatedAt: now
			})
			.where(eq(actions.id, update.id));
	}
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
}

export async function deleteAction(id: number) {
	return deleteActions([id]);
}

export async function deleteActions(ids: number[]): Promise<void> {
	if (ids.length === 0) {
		return;
	}

	await db.delete(actions).where(inArray(actions.id, ids));
}
