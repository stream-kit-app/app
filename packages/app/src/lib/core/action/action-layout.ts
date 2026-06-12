import type { Action } from './action.svelte';
import type { ActionLayoutUpdate } from './stored-action';

export type DndLayoutItem = {
	id: number;
	action: Action;
};

export type DndActionLayout = Record<string, DndLayoutItem[]>;

export function compareActionsByLayout(left: Action, right: Action): number {
	return (
		left.groupSortOrder - right.groupSortOrder ||
		left.sortOrder - right.sortOrder ||
		(left.id ?? 0) - (right.id ?? 0)
	);
}

export function buildDndLayout(actions: Action[]): DndActionLayout {
	const layout: DndActionLayout = {};

	for (const action of [...actions].filter((item) => item.id != null).sort(compareActionsByLayout)) {
		const group = action.group;

		if (!layout[group]) {
			layout[group] = [];
		}

		layout[group].push({ id: action.id!, action });
	}

	return layout;
}

export function dndLayoutToUpdates(layout: DndActionLayout): ActionLayoutUpdate[] {
	const updates: ActionLayoutUpdate[] = [];
	let groupSortOrder = 0;

	for (const [group, items] of Object.entries(layout)) {
		let sortOrder = 0;

		for (const item of items) {
			updates.push({
				id: item.id,
				group,
				groupSortOrder,
				sortOrder
			});
			sortOrder += 1;
		}

		groupSortOrder += 1;
	}

	return updates;
}

export function applyLayoutUpdates(actions: Action[], updates: ActionLayoutUpdate[]): Action[] {
	const updateById = new Map(updates.map((update) => [update.id, update]));

	for (const action of actions) {
		if (action.id == null) {
			continue;
		}

		const update = updateById.get(action.id);

		if (!update) {
			continue;
		}

		action.group = update.group;
		action.groupSortOrder = update.groupSortOrder;
		action.sortOrder = update.sortOrder;
	}

	const ordered = [...actions]
		.filter((action) => action.id != null)
		.sort(compareActionsByLayout);
	const drafts = actions.filter((action) => action.id == null);

	return [...ordered, ...drafts];
}
