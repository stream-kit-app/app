import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

export const buttonVariants = tv({
	base: [
		'inline-flex shrink-0 items-center justify-center gap-2 border border-transparent',
		'cursor-pointer rounded-lg font-semibold whitespace-nowrap',
		'transition-[color,background-color,box-shadow,transform] duration-150',
		'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
		'disabled:pointer-events-none disabled:opacity-50',
		'active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:shrink-0'
	],
	variants: {
		variant: {
			default: 'bg-primary/15 text-primary shadow-sm hover:bg-primary/25',
			secondary: 'bg-secondary/15 text-secondary shadow-sm hover:bg-secondary/25',
			outline:
				'border border-border bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground',
			ghost: 'hover:bg-accent hover:text-accent-foreground',
			destructive:
				'bg-destructive-200/5 text-destructive-100 shadow-sm hover:bg-destructive-200/10 focus-visible:ring-destructive-700 dark:bg-destructive-500 dark:hover:bg-destructive-500/90',
			link: 'text-primary underline-offset-4 hover:underline'
		},
		size: {
			xs: 'h-7 rounded-md px-2 text-xs [&_svg:not([class*="size-"])]:size-3',
			sm: 'h-8 px-3 text-sm font-normal [&_svg:not([class*="size-"])]:size-3.5',
			badge: 'rounded-md px-2.5 py-0.5 text-xs font-semibold [&_svg:not([class*="size-"])]:size-3.5',
			default: 'h-10 px-4 text-sm [&_svg:not([class*="size-"])]:size-4',
			lg: 'h-12 px-6 text-base [&_svg:not([class*="size-"])]:size-5',
			icon: 'size-[37px] [&_svg:not([class*="size-"])]:size-4',
			'icon-sm': 'size-8 [&_svg:not([class*="size-"])]:size-3.5',
			'icon-badge': 'size-6 rounded-md [&_svg:not([class*="size-"])]:size-3.5',
			'icon-lg': 'size-12 [&_svg:not([class*="size-"])]:size-5'
		}
	},
	defaultVariants: {
		variant: 'default',
		size: 'default'
	}
});

export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
export type ButtonSize = VariantProps<typeof buttonVariants>['size'];
