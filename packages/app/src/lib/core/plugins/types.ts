import type { HandlerDefinitionProps } from '../action/handler';
import type { TriggerDefinitionProps } from '../action/trigger';
import type { SettingsFieldItem } from '../settings';
import type { PluginAppApi } from './app-api';
import type { PluginSettingsContext } from './context';

export type PluginPublicApi = unknown;

export type Plugin = (
	app: PluginAppApi
) => PluginRegistration | Promise<PluginRegistration>;

export type PluginRegistration<TApi = PluginPublicApi> = {
	key: string;
	name: string;
	description?: string;
	icon?: string;
	dependencies?: string[];
	triggers?: TriggerDefinitionProps<any>[];
	handlers?: HandlerDefinitionProps[];
	settings?: SettingsFieldItem[];
	api?: TApi;
	isConfigured?: (context: PluginSettingsContext) => boolean;
	onLoad?: (context: PluginSettingsContext) => void | Promise<void>;
	onSave?: (context: PluginSettingsContext) => void | Promise<void>;
	onBoot?: (context: PluginSettingsContext) => void | Promise<void>;
};
