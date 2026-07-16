import type { Snippet } from 'svelte';

export type DataTableAlign = 'left' | 'center' | 'right';

export type DataTableColumn<T> = {
	id: string;
	header: string;
	align?: DataTableAlign;
	class?: string;
	cell: Snippet<[T]>;
};
