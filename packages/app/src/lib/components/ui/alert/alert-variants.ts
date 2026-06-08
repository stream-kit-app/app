import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

export const alertVariants = tv({
	base: 'flex items-start gap-3 rounded-lg border p-4 text-sm',
	variants: {
		variant: {
			default: 'border-border bg-dark-900 text-foreground',
			success: 'border-success-600 bg-success-900 text-success-50',
			error: 'border-destructive-600 bg-destructive-900 text-destructive-100',
			warning: 'border-warning-600 bg-warning-900 text-warning-100'
		}
	},
	defaultVariants: {
		variant: 'default'
	}
});

export const alertIconByVariant = {
	default: 'ri:information-fill',
	success: 'ri:checkbox-circle-fill',
	error: 'ri:error-warning-fill',
	warning: 'ri:alert-fill'
} satisfies Record<NonNullable<AlertVariant>, string>;

export const alertIconVariants = tv({
	base: 'mt-0.5 size-5 shrink-0',
	variants: {
		variant: {
			default: 'text-primary',
			success: 'text-green-500',
			error: 'text-red-500',
			warning: 'text-amber-500'
		}
	},
	defaultVariants: {
		variant: 'default'
	}
});

export type AlertVariant = VariantProps<typeof alertVariants>['variant'];
