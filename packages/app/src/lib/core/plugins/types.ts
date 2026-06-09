import type { HandlerDefinitionProps } from '../action/handler';
import type { TriggerDefinitionProps } from '../action/trigger';
import type { SettingsFieldItem } from '../settings';
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

export type PluginMenuItemChildDefinition = {
	key: string;
	title: string;
	page: PluginPageDefinition;
	children?: never;
};

export type PluginMenuItemDefinition =
	| {
			key: string;
			title: string;
			icon: string;
			page: PluginPageDefinition;
			children?: never;
	  }
	| {
			key: string;
			title: string;
			icon: string;
			page?: never;
			children: PluginMenuItemChildDefinition[];
	  };

export type PluginRegistration<TApi = PluginPublicApi> = {
	key: string;
	name: string;
	description?: string;
	icon?: string;
	dependencies?: string[];
	triggers?: TriggerDefinitionProps<any>[];
	handlers?: HandlerDefinitionProps[];
	menuItems?: PluginMenuItemDefinition[];
	settings?: SettingsFieldItem[];
	api?: TApi;
	isConfigured?: (context: PluginSettingsContext) => boolean;
	onLoad?: (context: PluginSettingsContext) => void | Promise<void>;
	onSave?: (context: PluginSettingsContext) => void | Promise<void>;
	onBoot?: (context: PluginSettingsContext) => void | Promise<void>;
};
