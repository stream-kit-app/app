import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

export const badgeVariants = tv({
	base: [
		'inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-lg border border-transparent',
		'font-semibold whitespace-nowrap transition-[color,background-color,border-color] duration-150',
		'[&_svg]:pointer-events-none [&_svg]:shrink-0'
	],
	variants: {
		variant: {
			default: 'border-primary/20 bg-primary/15 text-primary',
			secondary: 'border-secondary/20 bg-secondary/15 text-secondary',
			outline: 'border-border bg-transparent text-foreground',
			ghost: 'border-transparent bg-transparent text-muted-foreground',
			destructive: 'border-destructive-500 bg-destructive-800 text-destructive-50',
			success: 'border-success-500 bg-success-800 text-success-50',
			warning: 'border-warning-500 bg-warning-800 text-warning-50',
			link: 'border-transparent bg-transparent text-primary underline-offset-4 hover:underline'
		},
		size: {
			sm: 'px-2 py-0.5 text-xs [&_svg:not([class*="size-"])]:size-3',
			default: 'px-2.5 py-0.5 text-xs [&_svg:not([class*="size-"])]:size-3.5',
			lg: 'px-3 py-1 text-sm [&_svg:not([class*="size-"])]:size-4'
		}
	},
	defaultVariants: {
		variant: 'default',
		size: 'default'
	}
});

export type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];
export type BadgeSize = VariantProps<typeof badgeVariants>['size'];
