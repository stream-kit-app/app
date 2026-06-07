import type { SettingsContext } from './context';
import type { SettingsFieldItem } from './field';

export type { SettingsContext, SettingsVisibilityContext } from './context';
export type {
	SettingsButtonVariant,
	SettingsFieldDefinition,
	SettingsFieldInstance,
	SettingsFieldItem,
	SettingsFieldSectionDefinition,
	SettingsFieldValue,
	SettingsSelectItemsSource
} from './field';

export type SettingsSectionProps = {
	key: string;
	title: string;
	description?: string;
	fields?: SettingsFieldItem[];
	onSave?: (context: SettingsContext) => void | Promise<void>;
	onLoad?: (context: SettingsContext) => void | Promise<void>;
};
