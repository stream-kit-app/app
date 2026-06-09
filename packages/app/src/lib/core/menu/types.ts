import type { TranslationKey } from '$lib/i18n';

export type MenuItemChild = {
	path: string;
	title?: TranslationKey | string;
	isDisabled?: boolean | (() => boolean);
	onClick?: () => void;
};

export type MenuItem = {
	path: string;
	title?: TranslationKey | string;
	icon: string;
	children?: MenuItemChild[];
	isGroupOnly?: boolean;
	isDisabled?: boolean | (() => boolean);
	onClick?: () => void;
	fromPlugin?: boolean;
};
