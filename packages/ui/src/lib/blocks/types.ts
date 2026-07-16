export type PageAlertVariant = 'default' | 'success' | 'error' | 'warning';
export type PageBadgeVariant =
	| 'default'
	| 'secondary'
	| 'outline'
	| 'ghost'
	| 'destructive'
	| 'success'
	| 'warning'
	| 'link';
export type PageButtonVariant =
	| 'default'
	| 'secondary'
	| 'outline'
	| 'ghost'
	| 'destructive'
	| 'link';

export type PageButtonClickHandler = () => void | Promise<void>;

export type PageSelectItem = {
	value: string;
	label: string;
	disabled?: boolean;
};

export type PageFormField =
	| (PageFieldBase & {
			type: 'text';
			inputType?: 'text' | 'password';
	  })
	| (PageFieldBase & { type: 'switch' })
	| (PageFieldBase & { type: 'checkbox' })
	| (PageFieldBase & {
			type: 'select';
			items: PageSelectItem[];
			loadingPlaceholder?: string;
	  })
	| (PageFieldBase & {
			type: 'combobox';
			items: PageSelectItem[];
			loadingPlaceholder?: string;
	  })
	| (PageFieldBase & {
			type: 'slider';
			min: number;
			max: number;
			step?: number;
			/** Unit shown next to the value (e.g. `%`, `px`). Empty string for no unit. Defaults to `%`. */
			unit?: string;
	  })
	| (PageFieldBase & { type: 'color' })
	| {
			type: 'alert';
			name: string;
			description?: string;
			variant?: PageAlertVariant;
	  };

export type PageFormSection = {
	type: 'section';
	title?: string;
	description?: string;
	fields: PageFormField[];
};

export type PageFormItem = PageFormField | PageFormSection;

export type PageBlock =
	| {
			type: 'heading';
			title: string;
			subtitle?: string;
			level?: 1 | 2 | 3 | 4 | 5 | 6;
	  }
	| {
			type: 'text';
			text: string;
	  }
	| {
			type: 'alert';
			title?: string;
			description?: string;
			variant?: PageAlertVariant;
	  }
	| {
			type: 'badge';
			label: string;
			variant?: PageBadgeVariant;
	  }
	| {
			type: 'card';
			title?: string;
			description?: string;
			blocks: PageBlock[];
	  }
	| {
			type: 'stack';
			blocks: PageBlock[];
	  }
	| {
			type: 'grid';
			columns?: 1 | 2 | 3;
			blocks: PageBlock[];
	  }
	| {
			type: 'button';
			label: string;
			variant?: PageButtonVariant;
			onClick: PageButtonClickHandler;
	  }
	| PageFormBlock;

export type PageFormBlock = {
	type: 'form';
	title?: string;
	description?: string;
	fields: PageFormItem[];
	submitLabel?: string;
	successMessage?: string;
};

export type PageCustomView =
	| 'commands'
	| 'connections'
	| 'overview'
	| 'timers'
	| 'moderation'
	| 'roles';

export type PageBlocksDefinition = {
	title?: string;
	description?: string;
	blocks: PageBlock[];
	customView?: never;
};

export type PageCustomViewDefinition = {
	title?: string;
	description?: string;
	customView: PageCustomView;
	blocks?: never;
};

export type PageDefinition = PageBlocksDefinition | PageCustomViewDefinition;

type PageFieldBase = {
	name: string;
	placeholder?: string;
	defaultValue?: string | boolean | number;
	required?: boolean;
};
