import type { SelectItem } from '../action/trigger/condition';
import type { SettingsContext } from './context';

export type SettingsSelectItemsSource =
	| SelectItem[]
	| ((context: SettingsContext) => SelectItem[] | Promise<SelectItem[]>);

export type SettingsFieldValue = string | boolean | number;

export type SettingsButtonVariant =
	| 'default'
	| 'secondary'
	| 'outline'
	| 'ghost'
	| 'destructive'
	| 'link';

export type SettingsAlertVariant = 'default' | 'success' | 'error' | 'warning';

export type SettingsTableRow = Record<string, string>;

export type SettingsTableRowsSource =
	| SettingsTableRow[]
	| ((context: SettingsContext) => SettingsTableRow[] | Promise<SettingsTableRow[]>);

export type SettingsTableColumnDefinition = {
	key: string;
	header: string;
	mono?: boolean;
	class?: string;
};

export type SettingsTableActionDefinition = {
	type: 'copy';
	key: string;
	columnKey: string;
	icon?: string;
	ariaLabel?: string;
	onCopy?: (
		context: SettingsContext,
		row: SettingsTableRow,
		value: string
	) => void | Promise<void>;
};

export type SettingsFieldDefinition =
	| (SettingsFieldBase & {
			type: 'text';
			inputType?: 'text' | 'password';
	  })
	| (SettingsFieldBase & { type: 'switch' })
	| (SettingsFieldBase & { type: 'checkbox' })
	| (SettingsFieldBase & {
			type: 'select';
			items: SettingsSelectItemsSource;
			itemsReload?: (context: SettingsContext) => unknown;
			loadingPlaceholder?: string;
	  })
	| (SettingsFieldBase & {
			type: 'combobox';
			items: SettingsSelectItemsSource;
			itemsReload?: (context: SettingsContext) => unknown;
			loadingPlaceholder?: string;
	  })
	| (SettingsFieldBase & {
			type: 'slider';
			min: number;
			max: number;
			step?: number;
			/** Unit shown next to the value (e.g. `%`, `px`). Empty string for no unit. Defaults to `%`. */
			unit?: string;
	  })
	| (SettingsFieldBase & { type: 'color' })
	| (SettingsFieldBase & {
			type: 'select-file-or-folder';
			/** Pick a file or folder. */
			mode: 'file' | 'folder';
			filters?: { name: string; extensions: string[] }[];
			/**
			 * Where selected files are stored.
			 * - `cloud` (default for `mode: 'file'`): upload/browse `user_files`, value is a URL
			 * - `local`: keep an absolute filesystem path (programs, folders)
			 */
			storage?: 'cloud' | 'local';
	  })
	| {
			type: 'button';
			key: string;
			name: string;
			variant?: SettingsButtonVariant;
			visible?: (context: SettingsContext) => boolean;
			onClick: (context: SettingsContext) => void | Promise<void>;
	  }
	| {
			type: 'alert';
			key: string;
			name: string;
			description?: string;
			variant?: SettingsAlertVariant;
			visible?: (context: SettingsContext) => boolean;
	  }
	| {
			type: 'select-values';
			key: string;
			name: string;
			description?: string;
			buttonLabel?: string;
			dialogTitle?: string;
			searchPlaceholder?: string;
			loadingPlaceholder?: string;
			emptySelectedLabel?: string;
			visible?: (context: SettingsContext) => boolean;
			items: SettingsSelectItemsSource;
			itemsReload?: (context: SettingsContext) => unknown;
			selectedItems?: SettingsSelectItemsSource;
			selectedReload?: (context: SettingsContext) => unknown;
			isChecked?: (context: SettingsContext, value: string) => boolean;
			onCheck: (context: SettingsContext, value: string) => void | Promise<void>;
			onUncheck?: (context: SettingsContext, value: string) => void | Promise<void>;
	  }
	| {
			type: 'table';
			key: string;
			name: string;
			description?: string;
			searchable?: boolean;
			searchPlaceholder?: string;
			loadingPlaceholder?: string;
			emptyLabel?: string;
			rowKey?: string;
			visible?: (context: SettingsContext) => boolean;
			columns: SettingsTableColumnDefinition[];
			actions?: SettingsTableActionDefinition[];
			rows: SettingsTableRowsSource;
			rowsReload?: (context: SettingsContext) => unknown;
			searchKeys?: string[];
	  };

export type SettingsFieldSectionDefinition = {
	type: 'section';
	title?: string;
	description?: string;
	visible?: (context: SettingsContext) => boolean;
	fields: SettingsFieldDefinition[];
};

export type SettingsFieldItem = SettingsFieldDefinition | SettingsFieldSectionDefinition;

export type SettingsFieldInstance = {
	id: string;
	key: string;
	value: SettingsFieldValue;
};

type SettingsFieldBase = {
	/** Stable storage key. Prefer an explicit key; otherwise derived from `name` (no index). */
	key: string;
	name: string;
	placeholder?: string;
	defaultValue?: SettingsFieldValue;
	required?: boolean;
	visible?: (context: SettingsContext) => boolean;
	/**
	 * Where the value is stored for multi-PC sync.
	 * - `account` (default): synced via plugin records
	 * - `device`: stays in the local PluginStore (host/port, local paths, …)
	 * Password fields default to `device` + `secret`.
	 */
	sync?: 'account' | 'device';
	/** Never sync; always device-local. Implied by `inputType: 'password'`. */
	secret?: boolean;
};
