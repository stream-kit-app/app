import { PersistedState } from 'runed';

const STORAGE_KEY = 'stream-kit:command-groups-collapsed';

type CollapsedGroups = Record<string, boolean>;

const collapsedGroups = new PersistedState<CollapsedGroups>(STORAGE_KEY, {});

export function setCommandGroupCollapsed(groupId: string, collapsed: boolean): void {
	collapsedGroups.current = {
		...collapsedGroups.current,
		[groupId]: collapsed
	};
}

export { collapsedGroups };
