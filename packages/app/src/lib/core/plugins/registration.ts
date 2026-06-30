import type { PluginRegistration } from './types';

import { z } from 'zod';

const widgetColumnsSchema = z.union([
	z.literal(1),
	z.literal(2),
	z.literal(3),
	z.literal(4)
]);

const widgetSchema = z
	.object({
		key: z.string(),
		title: z.string(),
		description: z.string().optional(),
		icon: z.string().optional(),
		columns: widgetColumnsSchema.optional(),
		view: z.string()
	})
	.loose();

const menuChildSchema = z
	.object({
		title: z.string(),
		page: z.unknown()
	})
	.loose()
	.refine((item) => !('children' in item), 'Plugin menu children cannot define children');

const menuItemSchema = z
	.object({
		title: z.string(),
		icon: z.string(),
		page: z.unknown().optional(),
		children: z.array(menuChildSchema).optional()
	})
	.loose()
	.refine((item) => {
		const hasChildren = (item.children?.length ?? 0) > 0;
		return hasChildren ? item.page === undefined : item.page !== undefined;
	}, 'Plugin menu items must define either a page or one level of children');

const registrationSchema = z
	.object({
		name: z.string(),
		description: z.string().optional(),
		icon: z.string().optional(),
		dependencies: z.array(z.string()).optional(),
		triggers: z.array(z.unknown()).optional(),
		handlers: z.array(z.unknown()).optional(),
		menuItems: z.array(menuItemSchema).optional(),
		widgets: z.array(widgetSchema).optional(),
		settings: z.array(z.unknown()).optional(),
		api: z.unknown().optional(),
		isConfigured: z.function().optional(),
		onLoad: z.function().optional(),
		onSave: z.function().optional(),
		onReady: z.function().optional(),
		onEnable: z.function().optional(),
		onDisable: z.function().optional(),
		customViews: z.record(z.string(), z.unknown()).optional()
	})
	.loose();

export function parsePluginRegistration<TApi = unknown>(
	value: unknown
): PluginRegistration<TApi> | null {
	const result = registrationSchema.safeParse(value);

	if (!result.success) {
		return null;
	}

	const registration = result.data as PluginRegistration<TApi>;

	for (const widget of registration.widgets ?? []) {
		if (!registration.customViews?.[widget.view]) {
			console.warn(
				`Plugin "${registration.name}" widget "${widget.key}" references unknown custom view "${widget.view}"`
			);
			return null;
		}
	}

	return registration;
}
