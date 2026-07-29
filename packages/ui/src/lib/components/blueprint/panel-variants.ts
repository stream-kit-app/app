import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

export const panelVariants = tv({
	base: 'relative rounded-none border border-rule',
	variants: {
		tone: {
			default: 'bg-dark-900/40',
			solid: 'bg-dark-800',
			flush: 'bg-transparent'
		}
	},
	defaultVariants: {
		tone: 'default'
	}
});

export type PanelTone = VariantProps<typeof panelVariants>['tone'];
