import type { DashboardWidgetInstance, DashboardWidgetLayoutUpdate } from '$lib/core/dashboard/types';

export type DndWidgetItem = {
	id: string;
	instance: DashboardWidgetInstance;
};

export function toDndWidgetItems(instances: DashboardWidgetInstance[]): DndWidgetItem[] {
	return instances.map((instance) => ({ id: String(instance.id), instance }));
}

export function instancesFromDndItems(items: DndWidgetItem[]): DashboardWidgetInstance[] {
	return items.map((item) => item.instance);
}

export function buildLayoutUpdates(
	instances: DashboardWidgetInstance[]
): DashboardWidgetLayoutUpdate[] {
	return instances.map((instance, index) => ({
		id: instance.id,
		sortOrder: index,
		columns: instance.columns
	}));
}

export function compareLayoutUpdates(
	left: DashboardWidgetLayoutUpdate[],
	right: DashboardWidgetLayoutUpdate[]
): boolean {
	return JSON.stringify(left) === JSON.stringify(right);
}
