import type { Attachment } from 'svelte/attachments';

export type MasonryItemOptions = {
	/** Height of one implicit grid row in px — must match the grid's `grid-auto-rows`. */
	rowHeight?: number;
	/** Vertical gap between items in px (the grid itself uses `row-gap: 0`). */
	gap?: number;
};

type ResolvedOptions = Required<MasonryItemOptions>;

const itemOptions = new WeakMap<Element, ResolvedOptions>();

let observer: ResizeObserver | undefined;

function applySpan(element: HTMLElement, height: number, options: ResolvedOptions): void {
	const span = Math.max(1, Math.ceil((height + options.gap) / options.rowHeight));

	element.style.gridRowEnd = `span ${span}`;
}

function getObserver(): ResizeObserver {
	observer ??= new ResizeObserver((entries) => {
		for (const entry of entries) {
			const options = itemOptions.get(entry.target);

			if (!options) {
				continue;
			}

			const height =
				entry.borderBoxSize?.[0]?.blockSize ?? entry.target.getBoundingClientRect().height;

			applySpan(entry.target as HTMLElement, height, options);
		}
	});

	return observer;
}

/**
 * Masonry item for a CSS grid with tiny `grid-auto-rows` and `row-gap: 0`.
 * Measures the item and spans enough rows to fit its content plus `gap`,
 * so items of different heights pack vertically in DOM order.
 */
export function masonryItem(options: MasonryItemOptions = {}): Attachment<HTMLElement> {
	return (element) => {
		const resolved: ResolvedOptions = {
			rowHeight: options.rowHeight ?? 4,
			gap: options.gap ?? 16
		};

		// Without `start` the item stretches to its row span and the measurement feeds back on itself.
		element.style.alignSelf = 'start';
		itemOptions.set(element, resolved);
		applySpan(element, element.getBoundingClientRect().height, resolved);

		const resizeObserver = getObserver();

		resizeObserver.observe(element);

		return () => {
			resizeObserver.unobserve(element);
			itemOptions.delete(element);
			element.style.gridRowEnd = '';
			element.style.alignSelf = '';
		};
	};
}
