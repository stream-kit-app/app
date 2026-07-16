export type ToggleGroupItem<T extends string = string> = {
	value: T;
	label: string;
	icon?: string;
	disabled?: boolean;
};

export type ToggleGroupSize = 'default' | 'sm';
