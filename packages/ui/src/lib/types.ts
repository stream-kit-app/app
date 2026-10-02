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
	/** Optional help text shown next to the variable in the picker. */
	description?: string;
	/** Picker section, for example `Trigger`, `Action` or `Global`. */
	group?: string;
	/** True when the variable is only set on some execution paths (for example one IF branch). */
	maybe?: boolean;
};

export type NavItemChild = {
	path: string;
	title?: string;
	isDisabled?: boolean | (() => boolean);
	onClick?: () => void;
};

export type NavSectionLabel = {
	kind: 'label';
	path: string;
	title: string;
};

export type NavItemLink = {
	kind?: 'item';
	path: string;
	title?: string;
	icon: string;
	children?: NavItemChild[];
	isGroupOnly?: boolean;
	isDisabled?: boolean | (() => boolean);
	onClick?: () => void;
};

export type NavItem = NavSectionLabel | NavItemLink;
