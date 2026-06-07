export type MenuItemChild = {
	path: string;
	title: string;
	isDisabled?: boolean | (() => boolean);
	onClick?: () => void;
};

export type MenuItem = {
	path: string;
	title: string;
	icon: string;
	children?: MenuItemChild[];
	isDisabled?: boolean | (() => boolean);
	onClick?: () => void;
};
