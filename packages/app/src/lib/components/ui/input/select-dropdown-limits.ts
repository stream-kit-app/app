import type { SelectItem } from '$lib/core/action/trigger';

export const DROPDOWN_ITEM_HEIGHT_PX = 36;
export const DROPDOWN_VIEWPORT_HEIGHT_PX = 200;
export const DROPDOWN_OVERSCAN_ITEMS = 6;
export const DROPDOWN_VIRTUALIZE_THRESHOLD = 50;

export function filterSelectItems(items: SelectItem[], query: string): SelectItem[] {
	const normalizedQuery = query.trim().toLowerCase();

	if (!normalizedQuery) {
		return items;
	}

	return items.filter(
		(item) =>
			item.label.toLowerCase().includes(normalizedQuery) ||
			item.value.toLowerCase().includes(normalizedQuery)
	);
}

export type VirtualListSlice = {
	items: SelectItem[];
	startIndex: number;
	totalHeight: number;
	offsetY: number;
};

export function getVirtualListSlice(
	items: SelectItem[],
	scrollTop: number,
	viewportHeight = DROPDOWN_VIEWPORT_HEIGHT_PX,
	itemHeight = DROPDOWN_ITEM_HEIGHT_PX,
	overscan = DROPDOWN_OVERSCAN_ITEMS
): VirtualListSlice {
	const totalHeight = items.length * itemHeight;
	const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
	const visibleCount = Math.ceil(viewportHeight / itemHeight) + overscan * 2;
	const endIndex = Math.min(items.length, startIndex + visibleCount);

	return {
		items: items.slice(startIndex, endIndex),
		startIndex,
		totalHeight,
		offsetY: startIndex * itemHeight
	};
}

export function shouldVirtualizeList(itemCount: number): boolean {
	return itemCount > DROPDOWN_VIRTUALIZE_THRESHOLD;
}

export function getScrollTopForIndex(index: number, itemHeight = DROPDOWN_ITEM_HEIGHT_PX): number {
	return Math.max(0, index * itemHeight);
}
