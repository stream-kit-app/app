import type { StoredActionHandler, StoredActionTrigger } from '../schemas/actions';
import type { SelectItem } from '$lib/core/action/trigger/condition';

import { asc, eq } from 'drizzle-orm';

import { db } from '../index';
import { actions, DEFAULT_ACTION_GROUP } from '../schemas/actions';

export type SaveActionInput = {
	name: string;
	group: string;
	triggers: StoredActionTrigger[];
	handlers: StoredActionHandler[];
};

export function normalizeActionGroup(group: string | null | undefined): string {
	const trimmed = group?.trim();

	return trimmed || DEFAULT_ACTION_GROUP;
}

export async function getAction(id: number) {
	const [row] = await db.select().from(actions).where(eq(actions.id, id)).limit(1);

	if (!row) {
		throw new Error('Action not found');
	}

	return row;
}

export async function getActions() {
	return db.select().from(actions);
}

export async function getActionGroups(): Promise<SelectItem[]> {
	const rows = await db
		.selectDistinct({ group: actions.group })
		.from(actions)
		.orderBy(asc(actions.group));

	const groups = rows.map((row) => normalizeActionGroup(row.group));

	if (!groups.includes(DEFAULT_ACTION_GROUP)) {
		groups.unshift(DEFAULT_ACTION_GROUP);
	}

	return groups.map((group) => ({ value: group, label: group }));
}

export async function saveAction(input: SaveActionInput, id?: number) {
	const now = new Date();
	const group = normalizeActionGroup(input.group);

	if (id != null) {
		const [row] = await db
			.update(actions)
			.set({
				name: input.name,
				group,
				triggers: input.triggers,
				handlers: input.handlers,
				updatedAt: now
			})
			.where(eq(actions.id, id))
			.returning();

		return row;
	}

	const [row] = await db
		.insert(actions)
		.values({
			name: input.name,
			group,
			triggers: input.triggers,
			handlers: input.handlers,
			createdAt: now,
			updatedAt: now
		})
		.returning();

	return row;
}

export async function deleteAction(id: number) {
	return db.delete(actions).where(eq(actions.id, id));
}
