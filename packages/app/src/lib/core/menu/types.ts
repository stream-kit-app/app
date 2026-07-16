import type { TranslationKey } from '$lib/i18n';

export type MenuItemChild = {
	path: string;
	title?: TranslationKey | string;
	isDisabled?: boolean | (() => boolean);
	onClick?: () => void;
};

export type MenuSectionLabel = {
	kind: 'label';
	path: string;
	title: TranslationKey | string;
};

export type MenuItemLink = {
	kind?: 'item';
	path: string;
	title?: TranslationKey | string;
	icon: string;
	children?: MenuItemChild[];
	isGroupOnly?: boolean;
	isDisabled?: boolean | (() => boolean);
	onClick?: () => void;
	fromPlugin?: boolean;
};

export type MenuItem = MenuSectionLabel | MenuItemLink;

export function isMenuSectionLabel(item: MenuItem): item is MenuSectionLabel {
	return item.kind === 'label';
}

export function isMenuItemLink(item: MenuItem): item is MenuItemLink {
	return item.kind !== 'label';
}
