import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

export const cellGridVariants = tv({
	slots: {
		frame:
			'relative overflow-hidden rounded-xl after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:border after:border-rule',
		// Cells draw border-r/border-b; bleeding 1px past the frame clips those on the outer edges
		grid: '-me-px -mb-px grid'
	},
	variants: {
		cols: {
			1: { grid: 'grid-cols-1' },
			2: { grid: 'grid-cols-1 sm:grid-cols-2' },
			3: { grid: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' },
			4: { grid: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' }
		}
	},
	defaultVariants: {
		cols: 2
	}
});

export type CellGridCols = VariantProps<typeof cellGridVariants>['cols'];
