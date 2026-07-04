import type { Command } from './command.svelte';

import type { CommandLayoutUpdate } from './stored-command';
import { DEFAULT_COMMAND_GROUP } from './stored-command';

export type { CommandLayoutUpdate };

export type DndLayoutItem = {
	id: string;
	command: Command;
};

export type DndCommandLayout = Record<string, DndLayoutItem[]>;

export function normalizeCommandGroup(group: string | null | undefined): string {
	const trimmed = group?.trim();

	return trimmed || DEFAULT_COMMAND_GROUP;
}

export function compareCommandsByLayout(left: Command, right: Command): number {
	return (
		left.groupSortOrder - right.groupSortOrder ||
		left.sortOrder - right.sortOrder ||
		(left.id ?? '').localeCompare(right.id ?? '')
	);
}

export function buildDndLayout(commands: Command[]): DndCommandLayout {
	const layout: DndCommandLayout = {};

	for (const command of [...commands]
		.filter((item) => item.id != null)
		.sort(compareCommandsByLayout)) {
		const group = command.group;

		if (!layout[group]) {
			layout[group] = [];
		}

		layout[group].push({ id: command.id!, command });
	}

	return layout;
}

export function getGroupOrder(layout: DndCommandLayout): string[] {
	return Object.keys(layout);
}

export function dndLayoutToUpdates(
	layout: DndCommandLayout,
	groupOrder: string[] = getGroupOrder(layout)
): CommandLayoutUpdate[] {
	const updates: CommandLayoutUpdate[] = [];
	let groupSortOrder = 0;

	for (const group of groupOrder) {
		const items = layout[group];

		if (!items) {
			continue;
		}

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

export function applyLayoutUpdates(commands: Command[], updates: CommandLayoutUpdate[]): Command[] {
	const updateById = new Map(updates.map((update) => [update.id, update]));

	for (const command of commands) {
		if (command.id == null) {
			continue;
		}

		const update = updateById.get(command.id);

		if (!update) {
			continue;
		}

		command.group = update.group;
		command.groupSortOrder = update.groupSortOrder;
		command.sortOrder = update.sortOrder;
	}

	const ordered = [...commands]
		.filter((command) => command.id != null)
		.sort(compareCommandsByLayout);
	const drafts = commands.filter((command) => command.id == null);

	return [...ordered, ...drafts];
}
