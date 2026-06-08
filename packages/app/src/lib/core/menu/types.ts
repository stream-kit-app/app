import type { TranslationKey } from '$lib/i18n';

export type MenuItemChild = {
	path: string;
	title?: TranslationKey;
	isDisabled?: boolean | (() => boolean);
	onClick?: () => void;
};

export type MenuItem = {
	path: string;
	title?: TranslationKey;
	icon: string;
	children?: MenuItemChild[];
	isDisabled?: boolean | (() => boolean);
	onClick?: () => void;
};
