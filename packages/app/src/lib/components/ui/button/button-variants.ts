import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

export const buttonVariants = tv({
	base: [
		'inline-flex shrink-0 items-center justify-center gap-2',
		'cursor-pointer rounded-xl font-semibold whitespace-nowrap',
		'transition-[color,background-color,box-shadow,transform] duration-150',
		'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
		'disabled:pointer-events-none disabled:opacity-50',
		'active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:shrink-0'
	],
	variants: {
		variant: {
			default: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
			secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90',
			outline:
				'border border-border bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground',
			ghost: 'hover:bg-accent hover:text-accent-foreground',
			destructive:
				'bg-red-600 text-white shadow-sm hover:bg-red-600/90 focus-visible:ring-red-600 dark:bg-red-500 dark:hover:bg-red-500/90',
			link: 'text-primary underline-offset-4 hover:underline'
		},
		size: {
			xs: 'h-7 rounded-lg px-2 text-xs [&_svg:not([class*="size-"])]:size-3',
			sm: 'h-8 px-3 text-sm [&_svg:not([class*="size-"])]:size-3.5',
			default: 'h-10 px-4 text-sm [&_svg:not([class*="size-"])]:size-4',
			lg: 'h-12 px-6 text-base [&_svg:not([class*="size-"])]:size-5',
			icon: 'size-[37px] [&_svg:not([class*="size-"])]:size-4',
			'icon-sm': 'size-8 [&_svg:not([class*="size-"])]:size-3.5',
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
