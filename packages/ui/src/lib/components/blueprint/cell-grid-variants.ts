import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

export const cellGridVariants = tv({
	base: 'grid border-t border-l border-rule',
	variants: {
		cols: {
			1: 'grid-cols-1',
			2: 'grid-cols-1 sm:grid-cols-2',
			3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
			4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
		}
	},
	defaultVariants: {
		cols: 2
	}
});

export type CellGridCols = VariantProps<typeof cellGridVariants>['cols'];
