import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

/** User-placed dashboard widget instances. */
export const dashboardWidgets = sqliteTable('dashboard_widgets', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	definitionId: text('definition_id').notNull(),
	columns: integer('columns').notNull().default(1),
	sortOrder: integer('sort_order').notNull().default(0),
	createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull()
});

export type DashboardWidgetRecord = typeof dashboardWidgets.$inferSelect;
export type NewDashboardWidgetRecord = typeof dashboardWidgets.$inferInsert;
