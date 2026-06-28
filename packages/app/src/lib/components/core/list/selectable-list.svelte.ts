import { SvelteSet } from 'svelte/reactivity';

export type SelectableListController = {
	selectedIds: SvelteSet<number>;
	allSelected: boolean;
	hasSelection: boolean;
	setSelected: (id: number, selected: boolean) => void;
	handleSelectedChange: (id: number, selected: boolean, shiftKey: boolean) => void;
	selectAll: (selected: boolean) => void;
	subsetAllSelected: (ids: number[]) => boolean;
	subsetSelectedCount: (ids: number[]) => number;
	subsetSelectedIds: (ids: number[]) => number[];
	selectSubset: (ids: number[], selected: boolean) => void;
	clearSelection: () => void;
};

export function createSelectableList(orderedIds: () => number[]): SelectableListController {
	const selectedIds = new SvelteSet<number>();
	let anchorId: number | null = null;

	const allSelected = $derived.by(() => {
		const ids = orderedIds();

		return ids.length > 0 && ids.every((id) => selectedIds.has(id));
	});

	const hasSelection = $derived(selectedIds.size > 0);

	function setSelected(id: number, selected: boolean): void {
		if (selected) {
			selectedIds.add(id);
		} else {
			selectedIds.delete(id);
		}
	}

	function selectRange(id: number, selected: boolean): void {
		const ids = orderedIds();

		if (anchorId == null) {
			setSelected(id, selected);
			anchorId = id;
			return;
		}

		const anchorIndex = ids.indexOf(anchorId);
		const currentIndex = ids.indexOf(id);

		if (anchorIndex === -1 || currentIndex === -1) {
			setSelected(id, selected);
			anchorId = id;
			return;
		}

		const start = Math.min(anchorIndex, currentIndex);
		const end = Math.max(anchorIndex, currentIndex);

		for (let index = start; index <= end; index++) {
			if (selected) {
				selectedIds.add(ids[index]);
			} else {
				selectedIds.delete(ids[index]);
			}
		}

		anchorId = id;
	}

	return {
		get selectedIds() {
			return selectedIds;
		},
		get allSelected() {
			return allSelected;
		},
		get hasSelection() {
			return hasSelection;
		},
		setSelected,
		handleSelectedChange(id, selected, shiftKey) {
			if (shiftKey) {
				selectRange(id, selected);
				return;
			}

			setSelected(id, selected);
			anchorId = id;
		},
		selectAll(selected) {
			selectedIds.clear();
			anchorId = null;

			if (selected) {
				for (const id of orderedIds()) {
					selectedIds.add(id);
				}
			}
		},
		subsetAllSelected(ids) {
			return ids.length > 0 && ids.every((id) => selectedIds.has(id));
		},
		subsetSelectedCount(ids) {
			return ids.filter((id) => selectedIds.has(id)).length;
		},
		subsetSelectedIds(ids) {
			return ids.filter((id) => selectedIds.has(id));
		},
		selectSubset(ids, selected) {
			for (const id of ids) {
				if (selected) {
					selectedIds.add(id);
				} else {
					selectedIds.delete(id);
				}
			}
		},
		clearSelection() {
			selectedIds.clear();
			anchorId = null;
		}
	};
}
