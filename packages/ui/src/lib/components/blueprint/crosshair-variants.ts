import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

export const crosshairVariants = tv({
	base: 'pointer-events-none absolute z-10 text-muted-foreground/70 select-none',
	variants: {
		size: {
			sm: 'text-[10px] leading-none',
			md: 'text-xs leading-none',
			lg: 'text-sm leading-none'
		},
		position: {
			'top-left': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
			'top-right': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
			'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
			'bottom-right': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
			center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
		}
	},
	defaultVariants: {
		size: 'md',
		position: 'top-left'
	}
});

export type CrosshairSize = VariantProps<typeof crosshairVariants>['size'];
export type CrosshairPosition = VariantProps<typeof crosshairVariants>['position'];
