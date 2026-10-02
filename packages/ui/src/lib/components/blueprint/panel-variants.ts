import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

export const panelVariants = tv({
	base: 'relative rounded-xl border border-rule',
	variants: {
		tone: {
			default: 'bg-dark-900/40',
			solid: 'bg-surface',
			flush: 'bg-transparent'
		}
	},
	defaultVariants: {
		tone: 'default'
	}
});

export type PanelTone = VariantProps<typeof panelVariants>['tone'];
