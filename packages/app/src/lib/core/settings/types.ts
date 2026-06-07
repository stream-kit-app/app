import type { SettingsContext } from './context';
import type { SettingsFieldItem } from './field';

export type { SettingsContext } from './context';
export type {
	SettingsFieldDefinition,
	SettingsFieldInstance,
	SettingsFieldItem,
	SettingsFieldSectionDefinition,
	SettingsFieldValue
} from './field';

export type SettingsSectionProps = {
	key: string;
	title: string;
	description?: string;
	fields?: SettingsFieldItem[];
	onSave?: (context: SettingsContext) => void | Promise<void>;
	onLoad?: (context: SettingsContext) => void | Promise<void>;
};
