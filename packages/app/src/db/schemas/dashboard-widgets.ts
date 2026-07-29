import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

/** User-placed dashboard widget instances. */
export const dashboardWidgets = sqliteTable('dashboard_widgets', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	/** Stable id shared with PocketBase (15-char [a-z0-9]). */
	syncId: text('sync_id').notNull().unique(),
	definitionId: text('definition_id').notNull(),
	columns: integer('columns').notNull().default(1),
	sortOrder: integer('sort_order').notNull().default(0),
	revision: integer('revision').notNull().default(1),
	createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull()
});

export type DashboardWidgetRecord = typeof dashboardWidgets.$inferSelect;
export type NewDashboardWidgetRecord = typeof dashboardWidgets.$inferInsert;
