export type SelectItem = {
	value: string;
	label: string;
	disabled?: boolean;
};

export type SelectItemsSource =
	| SelectItem[]
	| (() => SelectItem[] | Promise<SelectItem[]>);

export type HandlerFieldVariable = {
	key: string;
	label: string;
};

export type NavItemChild = {
	path: string;
	title?: string;
	isDisabled?: boolean | (() => boolean);
	onClick?: () => void;
};

export type NavItem = {
	path: string;
	title?: string;
	icon: string;
	children?: NavItemChild[];
	isGroupOnly?: boolean;
	isDisabled?: boolean | (() => boolean);
	onClick?: () => void;
};
