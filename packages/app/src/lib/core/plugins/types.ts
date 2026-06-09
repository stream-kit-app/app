import type { HandlerDefinitionProps } from '../action/handler';
import type { TriggerDefinitionProps } from '../action/trigger';
import type {
	SettingsFieldDefinition,
	SettingsFieldSectionDefinition
} from '../settings';
import type { PluginAppApi } from './app-api';
import type { PluginSettingsContext } from './context';
import type {
	PageBlock,
	PageButtonClickHandler,
	PageDefinition,
	PageFormBlock,
	PageFormField,
	PageFormItem,
	PageFormSection
} from '@stream-kit/ui/blocks/types';

export type PluginPublicApi = unknown;

export type Plugin = (
	app: PluginAppApi
) => PluginRegistration | Promise<PluginRegistration>;

export type PluginPageBlock = PageBlock;
export type PluginPageDefinition = PageDefinition;
export type PluginPageFormBlock = PageFormBlock;
export type PluginPageFormField = PageFormField;
export type PluginPageFormItem = PageFormItem;
export type PluginPageFormSection = PageFormSection;
export type PluginPageButtonClickHandler = PageButtonClickHandler;
export type PluginSettingsFieldDefinition = SettingsFieldDefinition extends infer Field
	? Field extends { key: string }
		? Omit<Field, 'key'>
		: Field
	: never;
export type PluginSettingsFieldSectionDefinition = Omit<
	SettingsFieldSectionDefinition,
	'fields'
> & {
	fields: PluginSettingsFieldDefinition[];
};
export type PluginSettingsFieldItem =
	| PluginSettingsFieldDefinition
	| PluginSettingsFieldSectionDefinition;

export type PluginMenuItemChildDefinition = {
	title: string;
	page: PluginPageDefinition;
	children?: never;
};

export type PluginMenuItemDefinition =
	| {
			title: string;
			icon: string;
			page: PluginPageDefinition;
			children?: never;
	  }
	| {
			title: string;
			icon: string;
			page?: never;
			children: PluginMenuItemChildDefinition[];
	  };

export type PluginRegistration<TApi = PluginPublicApi> = {
	name: string;
	description?: string;
	icon?: string;
	dependencies?: string[];
	triggers?: TriggerDefinitionProps<any>[];
	handlers?: HandlerDefinitionProps[];
	menuItems?: PluginMenuItemDefinition[];
	settings?: PluginSettingsFieldItem[];
	api?: TApi;
	isConfigured?: (context: PluginSettingsContext) => boolean;
	onLoad?: (context: PluginSettingsContext) => void | Promise<void>;
	onSave?: (context: PluginSettingsContext) => void | Promise<void>;
	onBoot?: (context: PluginSettingsContext) => void | Promise<void>;
};
