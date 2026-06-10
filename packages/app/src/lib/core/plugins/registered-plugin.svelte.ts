import type { HandlerDefinition, HandlerDefinitionProps } from '../action/handler';
import type { TriggerDefinition, TriggerDefinitionProps } from '../action/trigger';
import type { App } from '../app.svelte';
import type {
	SettingsFieldDefinition,
	SettingsFieldInstance,
	SettingsFieldItem
} from '../settings';
import type { SettingsFormErrors } from '../settings/validate-settings';
import type { PluginSettingsContext } from './context';
import type { PluginSource, RegisterPluginOptions } from './installed-plugin';
import type { PluginStore } from './store';
import type { PluginMenuItemDefinition, PluginPublicApi, PluginRegistration } from './types';
import type { LazyStore } from '@tauri-apps/plugin-store';
import type { Component } from 'svelte';

import {
	createSettingsFields,
	flattenSettingsFieldItems,
	getSettingsFieldDefinition,
	getSettingsFieldValue,
	isPersistedSettingsField,
	withGeneratedSettingsKeys
} from '../settings/settings-field';
import { validateSettingsFields } from '../settings/validate-settings';
import { createPluginAppApi } from './app-api';
import { createPluginStore } from './store';

const ENABLED_KEY = '__enabled';

export class RegisteredPlugin<TApi = PluginPublicApi> {
	key: string;
	name: string;
	description?: string;
	icon?: string;
	version?: string;
	source: PluginSource;
	installPath?: string;
	dependencies: string[];
	fieldItems: SettingsFieldItem[];
	fields: SettingsFieldInstance[] = $state([]);
	formErrors: SettingsFormErrors | null = $state(null);
	isEnabled: boolean = $state(true);
	api?: TApi;
	private defaultEnabled: boolean;

	private store: LazyStore;
	private isConfiguredResolver?: PluginRegistration<TApi>['isConfigured'];
	private onLoad?: PluginRegistration<TApi>['onLoad'];
	private onSave?: PluginRegistration<TApi>['onSave'];
	private onBoot?: PluginRegistration<TApi>['onBoot'];
	private onEnable?: PluginRegistration<TApi>['onEnable'];
	private onDisable?: PluginRegistration<TApi>['onDisable'];
	private customViews: Record<string, Component> = {};
	private storeFacade: PluginStore;
	private legacyStores: LazyStore[];
	private hasBooted = false;
	private hasLoaded = false;
	private triggers: TriggerDefinitionProps<any>[];
	private handlers: HandlerDefinitionProps[];
	private registeredTriggers: TriggerDefinition[] = [];
	private registeredHandlers: HandlerDefinition[] = [];
	private menuItems: PluginMenuItemDefinition[];
	private registeredMenuPaths: string[] = [];

	constructor(
		key: string,
		props: PluginRegistration<TApi>,
		store: LazyStore,
		legacyStores: LazyStore[] = [],
		options: RegisterPluginOptions = {}
	) {
		this.source = options.source ?? 'builtin';
		this.installPath = options.installPath;
		this.version = options.version;
		this.defaultEnabled = this.source === 'builtin';
		this.isEnabled = this.defaultEnabled;
		this.key = key;
		this.name = props.name;
		this.description = props.description;
		this.icon = props.icon;
		this.dependencies = props.dependencies ?? [];
		this.fieldItems = withGeneratedSettingsKeys(props.settings, this.key);
		this.api = props.api;
		this.isConfiguredResolver = props.isConfigured;
		this.onLoad = props.onLoad;
		this.onSave = props.onSave;
		this.onBoot = props.onBoot;
		this.onEnable = props.onEnable;
		this.onDisable = props.onDisable;
		this.customViews = props.customViews ?? {};
		this.store = store;
		this.legacyStores = legacyStores;
		this.storeFacade = createPluginStore(store);
		this.fields = createSettingsFields(this.fieldItems);
		this.triggers = props.triggers ?? [];
		this.handlers = props.handlers ?? [];
		this.menuItems = props.menuItems ?? [];
	}

	get hasSettings(): boolean {
		return this.fieldItems.length > 0;
	}

	get persistedDefinitions(): SettingsFieldDefinition[] {
		return flattenSettingsFieldItems(this.fieldItems).filter(isPersistedSettingsField);
	}

	isConfigured(app: App): boolean {
		try {
			return this.isConfiguredResolver?.(this.createContext(app)) ?? false;
		} catch (error) {
			console.warn(`Failed to resolve plugin configured state for ${this.key}`, error);
			return false;
		}
	}

	getField(key: string): SettingsFieldInstance | undefined {
		return this.fields.find((field) => field.key === key);
	}

	getFieldDefinition(key: string): SettingsFieldDefinition | undefined {
		return getSettingsFieldDefinition(this.fieldItems, key);
	}

	getFieldError(fieldId: string, errors?: SettingsFormErrors | null): string | undefined {
		return errors?.fieldErrors[fieldId];
	}

	getCustomView(key: string): Component | undefined {
		return this.customViews[key];
	}

	createContext(app: App): PluginSettingsContext {
		return {
			app: createPluginAppApi(app),
			store: this.storeFacade,
			settings: this.storeFacade,
			getValue: (key) => getSettingsFieldValue(this.fields, key)
		};
	}

	registerDefinitions(app: App): void {
		if (this.registeredTriggers.length === 0) {
			this.registeredTriggers = this.triggers.map((trigger) =>
				app.actions.triggers.add(trigger, { idScope: this.key })
			);
		}

		for (const definition of this.registeredTriggers) {
			definition.setPluginName(this.name);
			definition.setAvailable(true);
		}

		if (this.registeredHandlers.length === 0) {
			this.registeredHandlers = this.handlers.map((handler) =>
				app.actions.actions.add(handler, { idScope: this.key })
			);
		}

		for (const definition of this.registeredHandlers) {
			definition.setAvailable(true);
		}

		if (this.registeredMenuPaths.length === 0 && this.menuItems.length > 0) {
			const menuItems = app.pluginMenuPages.register(this, this.menuItems);

			for (const item of menuItems) {
				app.menu.addPlugin(item);
				this.registeredMenuPaths.push(item.path);
			}
		}
	}

	unregisterDefinitions(app: App): void {
		for (const definition of this.registeredTriggers) {
			definition.setAvailable(false);
		}

		for (const definition of this.registeredHandlers) {
			definition.setAvailable(false);
		}

		for (const path of this.registeredMenuPaths) {
			app.menu.remove(path);
		}

		this.registeredMenuPaths = [];
		app.pluginMenuPages.unregister(this.key);
	}

	async load(app: App): Promise<void> {
		if (this.hasLoaded) {
			return;
		}

		await this.loadEnabledState();

		if (this.isEnabled) {
			this.registerDefinitions(app);
		}

		const stored: SettingsFieldInstance[] = [];

		for (const definition of this.persistedDefinitions) {
			let value = await this.store.get<SettingsFieldInstance['value']>(definition.key);

			if (value === undefined || value === null) {
				value = await this.getLegacyValue(definition.key);

				if (value !== undefined && value !== null) {
					await this.store.set(definition.key, value);
				}
			}

			if (value !== undefined && value !== null) {
				stored.push({
					id: crypto.randomUUID(),
					key: definition.key,
					value
				});
			}
		}

		this.fields = createSettingsFields(this.fieldItems, stored);
		await this.onLoad?.(this.createContext(app));
		this.hasLoaded = true;
	}

	async loadEnabledState(): Promise<void> {
		this.isEnabled = (await this.store.get<boolean>(ENABLED_KEY)) ?? this.defaultEnabled;
	}

	private async getLegacyValue(key: string): Promise<SettingsFieldInstance['value'] | undefined> {
		for (const legacyStore of this.legacyStores) {
			const value = await legacyStore.get<SettingsFieldInstance['value']>(key);

			if (value !== undefined && value !== null) {
				return value;
			}
		}
	}

	missingDependencies(app: App): string[] {
		return this.dependencies.filter((key) => !app.plugins.find(key));
	}

	disabledDependencies(app: App): string[] {
		return this.dependencies.filter((key) => app.plugins.find(key)?.isEnabled === false);
	}

	canBoot(app: App): boolean {
		return (
			this.isEnabled &&
			this.missingDependencies(app).length === 0 &&
			this.disabledDependencies(app).length === 0
		);
	}

	async boot(app: App): Promise<void> {
		await this.loadEnabledState();

		if (this.hasBooted || !this.canBoot(app)) {
			if (!this.canBoot(app)) {
				this.unregisterDefinitions(app);
			}

			return;
		}

		await this.onBoot?.(this.createContext(app));
		this.hasBooted = true;
	}

	async setEnabled(app: App, enabled: boolean): Promise<void> {
		this.isEnabled = enabled;
		await this.store.set(ENABLED_KEY, enabled);

		if (enabled) {
			this.registerDefinitions(app);
			await this.boot(app);
			await this.onEnable?.(this.createContext(app));
		} else {
			await this.onDisable?.(this.createContext(app));
			this.unregisterDefinitions(app);
		}
	}

	async save(app: App): Promise<boolean> {
		if (!this.validate(app)) {
			return false;
		}

		for (const field of this.fields) {
			await this.store.set(field.key, field.value);
		}

		await this.onSave?.(this.createContext(app));

		return true;
	}

	async saveFieldInstances(app: App, fields: SettingsFieldInstance[]): Promise<void> {
		for (const field of fields) {
			await this.store.set(field.key, field.value);
		}

		await this.onSave?.(this.createContext(app));
	}

	validate(app: App): boolean {
		this.formErrors = validateSettingsFields(
			this.fields,
			this.fieldItems,
			this.createContext(app)
		);

		return this.formErrors === null;
	}
}
