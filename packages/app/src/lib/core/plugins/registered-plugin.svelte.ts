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
import type { PluginMenuItemDefinition, PluginPublicApi, PluginRegistration, PluginWidgetDefinition } from './types';
import type { LazyStore } from '@tauri-apps/plugin-store';
import type { Component } from 'svelte';

import {
	createSettingsFields,
	flattenSettingsFieldItems,
	getSettingsFieldDefinition,
	getSettingsFieldSyncScope,
	getSettingsFieldValue,
	isPersistedSettingsField,
	withGeneratedSettingsKeys
} from '../settings/settings-field';
import { validateSettingsFields } from '../settings/validate-settings';
import { createPluginAppApi } from './app-api';
import { createPluginStore } from './store';

const ENABLED_KEY = '__enabled';
const SETTINGS_COLLECTION = 'settings';
/** Fixed 15-char syncId for the account-scoped settings document per plugin. */
const ACCOUNT_SETTINGS_SYNC_ID = 'accountsettings';
const SETTINGS_KEY_MIGRATION = '__settings_stable_keys_v1';
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
	private onReady?: PluginRegistration<TApi>['onReady'];
	private onEnable?: PluginRegistration<TApi>['onEnable'];
	private onDisable?: PluginRegistration<TApi>['onDisable'];
	private customViews: Record<string, Component> = {};
	private storeFacade: PluginStore;
	private legacyStores: LazyStore[];
	private hasBooted = false;
	private hasReadied = false;
	private hasLoaded = false;
	private triggers: TriggerDefinitionProps<any>[];
	private handlers: HandlerDefinitionProps[];
	private registeredTriggers: TriggerDefinition[] = [];
	private registeredHandlers: HandlerDefinition[] = [];
	private menuItems: PluginMenuItemDefinition[];
	private widgets: PluginWidgetDefinition[];
	private registeredMenuPaths: string[] = [];
	private hasRegisteredWidgets = false;

	constructor(
		key: string,
		props: PluginRegistration<TApi>,
		store: LazyStore,
		legacyStores: LazyStore[] = [],
		options: RegisterPluginOptions = {}
	) {
		this.source = options.source ?? 'installed';
		this.installPath = options.installPath;
		this.version = options.version;
		this.defaultEnabled = false;
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
		this.onReady = props.onReady;
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
		this.widgets = props.widgets ?? [];
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
			pluginKey: this.key,
			app: createPluginAppApi(app, { pluginKey: this.key }),
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

	registerWidgetDefinitions(app: App): void {
		if (!this.hasRegisteredWidgets && this.widgets.length > 0) {
			app.dashboard.registerPluginWidgets(this, this.widgets);
			this.hasRegisteredWidgets = true;
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

	removeDefinitions(app: App): void {
		for (const definition of this.registeredTriggers) {
			app.actions.triggers.remove(definition.id);
		}

		for (const definition of this.registeredHandlers) {
			app.actions.actions.remove(definition.id);
		}

		this.registeredTriggers = [];
		this.registeredHandlers = [];

		for (const path of this.registeredMenuPaths) {
			app.menu.remove(path);
		}

		this.registeredMenuPaths = [];
		app.pluginMenuPages.unregister(this.key);

		if (this.hasRegisteredWidgets) {
			app.dashboard.unregisterPlugin(this.key);
			this.hasRegisteredWidgets = false;
		}
	}

	async teardown(app: App): Promise<void> {
		if (this.hasBooted) {
			await this.onDisable?.(this.createContext(app));
			this.hasBooted = false;
			this.hasReadied = false;
		}

		app.apiServer.unregisterMethodsByOwner(this.key);
		this.removeDefinitions(app);
	}

	private isDeviceScoped(definition: SettingsFieldDefinition): boolean {
		return getSettingsFieldSyncScope(definition) === 'device';
	}

	async load(app: App): Promise<void> {
		if (this.hasLoaded) {
			return;
		}

		await this.loadEnabledState();
		await this.migrateStableSettingsKeys();

		this.registerWidgetDefinitions(app);

		if (this.isEnabled) {
			this.registerDefinitions(app);
		}

		const stored: SettingsFieldInstance[] = [];
		const accountValues = await this.loadAccountSettings(app);

		for (const definition of this.persistedDefinitions) {
			const deviceScoped = this.isDeviceScoped(definition);
			let value: SettingsFieldInstance['value'] | undefined;

			if (deviceScoped) {
				value = await this.store.get<SettingsFieldInstance['value']>(definition.key);
				if (value === undefined || value === null) {
					value = await this.getLegacyValue(definition.key);
					if (value !== undefined && value !== null) {
						await this.store.set(definition.key, value);
					}
				}
			} else {
				value = accountValues[definition.key];
				if (value === undefined || value === null) {
					value = await this.store.get<SettingsFieldInstance['value']>(definition.key);
					if (value !== undefined && value !== null) {
						accountValues[definition.key] = value;
						await this.store.delete(definition.key);
					}
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

		if (Object.keys(accountValues).length > 0) {
			await this.saveAccountSettings(app, accountValues);
		}

		this.fields = createSettingsFields(this.fieldItems, stored);
		await this.onLoad?.(this.createContext(app));
		this.hasLoaded = true;
	}

	/** Copy values from obsolete indexed keys (obs-4.host) onto stable keys (obs.host). */
	private async migrateStableSettingsKeys(): Promise<void> {
		if (await this.store.get<boolean>(SETTINGS_KEY_MIGRATION)) {
			return;
		}

		const entries = await this.storeFacade.entries();
		for (const definition of this.persistedDefinitions) {
			const stableKey = definition.key;
			const existing = await this.store.get(stableKey);
			if (existing !== undefined && existing !== null) {
				continue;
			}

			const nameSegment = stableKey.includes('.')
				? stableKey.slice(stableKey.lastIndexOf('.') + 1)
				: stableKey;

			for (const [key, value] of Object.entries(entries)) {
				if (key === ENABLED_KEY || key.startsWith('__')) {
					continue;
				}
				if (key === stableKey) {
					continue;
				}
				const legacyName = key.includes('.') ? key.slice(key.lastIndexOf('.') + 1) : key;
				if (legacyName === nameSegment && value !== undefined && value !== null) {
					await this.store.set(stableKey, value as SettingsFieldInstance['value']);
					break;
				}
			}
		}

		await this.store.set(SETTINGS_KEY_MIGRATION, true);
	}

	private async loadAccountSettings(app: App): Promise<Record<string, SettingsFieldInstance['value']>> {
		try {
			const records = app.records.open(this.key, SETTINGS_COLLECTION);
			const row = await records.get<{ values?: Record<string, SettingsFieldInstance['value']> }>(
				ACCOUNT_SETTINGS_SYNC_ID
			);
			return row?.values && typeof row.values === 'object' ? { ...row.values } : {};
		} catch {
			return {};
		}
	}

	private async saveAccountSettings(
		app: App,
		values: Record<string, SettingsFieldInstance['value']>
	): Promise<void> {
		const records = app.records.open(this.key, SETTINGS_COLLECTION);
		const existing = await records.get(ACCOUNT_SETTINGS_SYNC_ID);
		if (existing) {
			await records.update(ACCOUNT_SETTINGS_SYNC_ID, { values });
		} else {
			await records.create({ id: ACCOUNT_SETTINGS_SYNC_ID, values });
		}
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

		await this.onEnable?.(this.createContext(app));
		this.hasBooted = true;
	}

	async ready(app: App): Promise<void> {
		if (this.hasReadied || !this.canBoot(app)) {
			return;
		}

		await this.onReady?.(this.createContext(app));
		this.hasReadied = true;
	}

	async setEnabled(app: App, enabled: boolean): Promise<void> {
		this.isEnabled = enabled;
		await this.store.set(ENABLED_KEY, enabled);

		if (enabled) {
			this.registerWidgetDefinitions(app);
			this.registerDefinitions(app);
			await this.boot(app);
			await this.ready(app);
			app.overlay.notifyDependenciesChanged();
		} else {
			await this.onDisable?.(this.createContext(app));
			app.apiServer.unregisterMethodsByOwner(this.key);
			this.unregisterDefinitions(app);
			// Allow onEnable/onReady to run again the next time the plugin is enabled.
			this.hasBooted = false;
			this.hasReadied = false;
			app.overlay.notifyDependenciesChanged();
		}
	}

	async save(app: App): Promise<boolean> {
		if (!this.validate(app)) {
			return false;
		}

		await this.persistFields(app, this.fields);
		await this.onSave?.(this.createContext(app));

		return true;
	}

	async saveFieldInstances(app: App, fields: SettingsFieldInstance[]): Promise<void> {
		await this.persistFields(app, fields);
		await this.onSave?.(this.createContext(app));
	}

	private async persistFields(app: App, fields: SettingsFieldInstance[]): Promise<void> {
		const accountValues: Record<string, SettingsFieldInstance['value']> = {
			...(await this.loadAccountSettings(app))
		};

		for (const field of fields) {
			const definition = getSettingsFieldDefinition(this.fieldItems, field.key);
			if (!definition || !isPersistedSettingsField(definition)) {
				continue;
			}

			if (this.isDeviceScoped(definition)) {
				await this.store.set(field.key, field.value);
			} else {
				accountValues[field.key] = field.value;
			}
		}

		await this.saveAccountSettings(app, accountValues);
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
