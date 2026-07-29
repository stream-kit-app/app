import { createSyncId } from '$db/sync-id';
import { notifyConfigLocalChange } from '$db/config-sync-notify';
import { recordConfigSyncTombstone } from './config-sync-tombstones';
import type { PluginWidgetColumns } from '$lib/core/plugins/types';
import type { DashboardWidgetLayoutUpdate } from '$lib/core/dashboard/types';

import { asc, eq, max, sql } from 'drizzle-orm';

import { DEFAULT_DASHBOARD_LAYOUT } from '$lib/core/dashboard/types';

import { db } from '../index';
import { dashboardWidgets } from '../schemas/dashboard-widgets';

export async function getDashboardWidgets() {
	return db
		.select()
		.from(dashboardWidgets)
		.orderBy(asc(dashboardWidgets.sortOrder), asc(dashboardWidgets.id));
}

async function getNextSortOrder(): Promise<number> {
	const [row] = await db.select({ value: max(dashboardWidgets.sortOrder) }).from(dashboardWidgets);
	return (row?.value ?? -1) + 1;
}

export async function seedDefaultDashboardLayout(): Promise<void> {
	const existing = await getDashboardWidgets();
	if (existing.length > 0) {
		return;
	}

	const now = new Date();
	for (const [index, seed] of DEFAULT_DASHBOARD_LAYOUT.entries()) {
		await db.insert(dashboardWidgets).values({
			syncId: createSyncId(),
			definitionId: seed.definitionId,
			columns: seed.columns,
			sortOrder: index,
			revision: 1,
			createdAt: now,
			updatedAt: now
		});
	}
	notifyConfigLocalChange();
}

export async function addDashboardWidget(
	definitionId: string,
	columns: PluginWidgetColumns
): Promise<number> {
	const now = new Date();
	const sortOrder = await getNextSortOrder();

	const [row] = await db
		.insert(dashboardWidgets)
		.values({
			syncId: createSyncId(),
			definitionId,
			columns,
			sortOrder,
			revision: 1,
			createdAt: now,
			updatedAt: now
		})
		.returning({ id: dashboardWidgets.id });

	if (!row) {
		throw new Error('Failed to add dashboard widget');
	}

	notifyConfigLocalChange();
	return row.id;
}

export async function removeDashboardWidget(id: number): Promise<void> {
	const [existing] = await db
		.select()
		.from(dashboardWidgets)
		.where(eq(dashboardWidgets.id, id))
		.limit(1);

	await db.delete(dashboardWidgets).where(eq(dashboardWidgets.id, id));

	if (existing?.syncId) {
		await recordConfigSyncTombstone(
			'dashboard_widget',
			existing.syncId,
			new Date(),
			(existing.revision ?? 1) + 1
		);
	}
	notifyConfigLocalChange();
}

export async function updateDashboardWidgetColumns(
	id: number,
	columns: PluginWidgetColumns
): Promise<void> {
	const [existing] = await db
		.select()
		.from(dashboardWidgets)
		.where(eq(dashboardWidgets.id, id))
		.limit(1);

	await db
		.update(dashboardWidgets)
		.set({
			columns,
			revision: (existing?.revision ?? 1) + 1,
			updatedAt: new Date()
		})
		.where(eq(dashboardWidgets.id, id));
	notifyConfigLocalChange();
}

export async function reorderDashboardLayout(updates: DashboardWidgetLayoutUpdate[]): Promise<void> {
	if (updates.length === 0) {
		return;
	}

	const now = Date.now();
	const ids = updates.map((update) => update.id);
	const sortCase = sql.join(
		updates.map((update) => sql`WHEN ${update.id} THEN ${update.sortOrder}`),
		sql` `
	);
	const columnsCase = sql.join(
		updates.map((update) => sql`WHEN ${update.id} THEN ${update.columns ?? 1}`),
		sql` `
	);
	const idList = sql.join(
		ids.map((id) => sql`${id}`),
		sql`, `
	);

	await db.run(sql`
		UPDATE ${dashboardWidgets} SET
			sort_order = CASE ${dashboardWidgets.id} ${sortCase} END,
			columns = CASE ${dashboardWidgets.id} ${columnsCase} END,
			revision = revision + 1,
			updated_at = ${now}
		WHERE ${dashboardWidgets.id} IN (${idList})
	`);
	notifyConfigLocalChange();
}

export async function upsertDashboardWidgetFromSync(input: {
	syncId: string;
	definitionId: string;
	columns: number;
	sortOrder: number;
	revision: number;
	updatedAt: Date;
}): Promise<void> {
	const [existing] = await db
		.select()
		.from(dashboardWidgets)
		.where(eq(dashboardWidgets.syncId, input.syncId))
		.limit(1);

	if (existing) {
		await db
			.update(dashboardWidgets)
			.set({
				definitionId: input.definitionId,
				columns: input.columns,
				sortOrder: input.sortOrder,
				revision: input.revision,
				updatedAt: input.updatedAt
			})
			.where(eq(dashboardWidgets.id, existing.id));
		return;
	}

	await db.insert(dashboardWidgets).values({
		syncId: input.syncId,
		definitionId: input.definitionId,
		columns: input.columns,
		sortOrder: input.sortOrder,
		revision: input.revision,
		createdAt: input.updatedAt,
		updatedAt: input.updatedAt
	});
}

export async function deleteDashboardWidgetBySyncIdFromSync(syncId: string): Promise<void> {
	await db.delete(dashboardWidgets).where(eq(dashboardWidgets.syncId, syncId));
}
