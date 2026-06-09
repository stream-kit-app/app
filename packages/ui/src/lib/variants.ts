import { alertVariants } from './components/alert/alert-variants';
import { badgeVariants } from './components/badge/badge-variants';
import { buttonVariants } from './components/button/button-variants';

export const buttonVariantValues = Object.keys(
	buttonVariants.variants.variant
) as (keyof typeof buttonVariants.variants.variant)[];
export const alertVariantValues = Object.keys(
	alertVariants.variants.variant
) as (keyof typeof alertVariants.variants.variant)[];
export const badgeVariantValues = Object.keys(
	badgeVariants.variants.variant
) as (keyof typeof badgeVariants.variants.variant)[];

export { type AlertVariant as UiAlertVariant } from './components/alert/alert-variants';
export { type BadgeVariant as UiBadgeVariant } from './components/badge/badge-variants';
export { type ButtonVariant as UiButtonVariant } from './components/button/button-variants';
