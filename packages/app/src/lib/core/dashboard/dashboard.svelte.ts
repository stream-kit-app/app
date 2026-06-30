import type { PluginWidgetColumns, PluginWidgetDefinition } from '../plugins/types';
import type { RegisteredPlugin } from '../plugins/registered-plugin.svelte';
import type { App } from '../app.svelte';
import type {
	BuiltinWidgetDefinition,
	DashboardWidgetDefinition,
	DashboardWidgetInstance,
	DashboardWidgetLayoutUpdate
} from './types';

import {
	addDashboardWidget,
	getDashboardWidgets,
	removeDashboardWidget,
	reorderDashboardLayout,
	seedDefaultDashboardLayout,
	updateDashboardWidgetColumns
} from '$db/repositories/dashboard-widgets';

import { createDefinitionId } from './types';

function toInstance(record: {
	id: number;
	definitionId: string;
	columns: number;
	sortOrder: number;
}): DashboardWidgetInstance {
	return {
		id: record.id,
		definitionId: record.definitionId,
		columns: record.columns as PluginWidgetColumns,
		sortOrder: record.sortOrder
	};
}

export class Dashboard {
	definitions = $state.raw<DashboardWidgetDefinition[]>([]);
	instances = $state.raw<DashboardWidgetInstance[]>([]);

	registerBuiltin(definitions: BuiltinWidgetDefinition[]): void {
		const builtins = definitions.map((definition) => this.createBuiltinDefinition(definition));
		const withoutBuiltins = this.definitions.filter((entry) => entry.source !== 'app');

		this.definitions = [...withoutBuiltins, ...builtins];
	}

	registerPluginWidgets(plugin: RegisteredPlugin, widgets: PluginWidgetDefinition[]): void {
		const pluginDefinitions = widgets.map((widget) =>
			this.createPluginDefinition(plugin, widget)
		);
		const withoutPlugin = this.definitions.filter((entry) => entry.pluginKey !== plugin.key);

		this.definitions = [...withoutPlugin, ...pluginDefinitions];
	}

	unregisterPlugin(pluginKey: string): void {
		this.definitions = this.definitions.filter((entry) => entry.pluginKey !== pluginKey);
	}

	resolveDefinition(definitionId: string): DashboardWidgetDefinition | undefined {
		return this.definitions.find((definition) => definition.definitionId === definitionId);
	}

	isDefinitionAvailable(definition: DashboardWidgetDefinition, app: App): boolean {
		if (!definition.pluginKey) {
			return true;
		}

		return app.plugins.find(definition.pluginKey)?.isEnabled ?? false;
	}

	isDefinitionPlaced(definitionId: string): boolean {
		return this.instances.some((instance) => instance.definitionId === definitionId);
	}

	getAddableDefinitions(app: App): DashboardWidgetDefinition[] {
		return this.definitions.filter(
			(definition) =>
				this.isDefinitionAvailable(definition, app) &&
				!this.isDefinitionPlaced(definition.definitionId)
		);
	}

	get availableDefinitions(): DashboardWidgetDefinition[] {
		return this.definitions;
	}

	async load(): Promise<void> {
		await seedDefaultDashboardLayout();
		const records = await getDashboardWidgets();
		this.instances = records.map(toInstance);
	}

	async applyLayout(updates: DashboardWidgetLayoutUpdate[]): Promise<void> {
		if (updates.length === 0) {
			return;
		}

		this.instances = this.instances
			.map((instance) => {
				const update = updates.find((entry) => entry.id === instance.id);

				if (!update) {
					return instance;
				}

				return {
					...instance,
					sortOrder: update.sortOrder,
					columns: update.columns ?? instance.columns
				};
			})
			.sort((left, right) => left.sortOrder - right.sortOrder || left.id - right.id);

		await reorderDashboardLayout(updates);
	}

	async addInstance(definitionId: string): Promise<void> {
		const definition = this.resolveDefinition(definitionId);

		if (!definition) {
			throw new Error(`Unknown dashboard widget definition: ${definitionId}`);
		}

		await addDashboardWidget(definitionId, definition.defaultColumns);
		const records = await getDashboardWidgets();
		this.instances = records.map(toInstance);
	}

	async removeInstance(id: number): Promise<void> {
		await removeDashboardWidget(id);
		this.instances = this.instances.filter((instance) => instance.id !== id);
	}

	async setColumns(id: number, columns: PluginWidgetColumns): Promise<void> {
		await updateDashboardWidgetColumns(id, columns);
		this.instances = this.instances.map((instance) =>
			instance.id === id ? { ...instance, columns } : instance
		);
	}

	private createBuiltinDefinition(definition: BuiltinWidgetDefinition): DashboardWidgetDefinition {
		return {
			definitionId: createDefinitionId('app', definition.key),
			source: 'app',
			key: definition.key,
			title: definition.title,
			description: definition.description,
			icon: definition.icon,
			defaultColumns: definition.columns ?? 1,
			component: definition.component
		};
	}

	private createPluginDefinition(
		plugin: RegisteredPlugin,
		widget: PluginWidgetDefinition
	): DashboardWidgetDefinition {
		const component = plugin.getCustomView(widget.view);

		if (!component) {
			throw new Error(
				`Plugin "${plugin.key}" widget "${widget.key}" references missing custom view "${widget.view}"`
			);
		}

		return {
			definitionId: createDefinitionId(plugin.key, widget.key),
			source: plugin.key,
			key: widget.key,
			title: widget.title,
			description: widget.description,
			icon: widget.icon,
			defaultColumns: widget.columns ?? 1,
			component,
			pluginKey: plugin.key
		};
	}
}
