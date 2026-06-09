import { AlertVariant } from '../components/alert';
import { BadgeVariant } from '../components/badge';
import { ButtonVariant } from '../components/button';

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
	| (PageFieldBase & { type: 'slider'; min: number; max: number; step?: number })
	| {
			type: 'alert';
			name: string;
			description?: string;
			variant?: AlertVariant;
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
			variant?: AlertVariant;
	  }
	| {
			type: 'badge';
			label: string;
			variant?: BadgeVariant;
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
			variant?: ButtonVariant;
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

export type PageDefinition = {
	title?: string;
	description?: string;
	blocks: PageBlock[];
};

type PageFieldBase = {
	name: string;
	placeholder?: string;
	defaultValue?: string | boolean | number;
	required?: boolean;
};
