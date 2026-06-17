import { PersistedState } from 'runed';

const STORAGE_KEY = 'stream-kit:action-groups-collapsed';

type CollapsedGroups = Record<string, boolean>;

const collapsedGroups = new PersistedState<CollapsedGroups>(STORAGE_KEY, {});

export function setActionGroupCollapsed(groupId: string, collapsed: boolean): void {
	collapsedGroups.current = {
		...collapsedGroups.current,
		[groupId]: collapsed
	};
}

export { collapsedGroups };
