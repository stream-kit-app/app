import type { PluginWidgetColumns, PluginWidgetProps } from '../plugins/types';
import type { Component } from 'svelte';

export type { PluginWidgetColumns as DashboardWidgetColumns };

export type DashboardWidgetDefinition = {
	definitionId: string;
	source: string;
	key: string;
	title: string;
	description?: string;
	icon?: string;
	defaultColumns: PluginWidgetColumns;
	component: Component<PluginWidgetProps>;
	pluginKey?: string;
};

export type BuiltinWidgetDefinition = {
	key: string;
	title: string;
	description?: string;
	icon?: string;
	columns?: PluginWidgetColumns;
	component: Component<PluginWidgetProps>;
};

export type DashboardWidgetInstance = {
	id: number;
	definitionId: string;
	columns: PluginWidgetColumns;
	sortOrder: number;
};

export type DashboardWidgetLayoutUpdate = {
	id: number;
	sortOrder: number;
	columns?: PluginWidgetColumns;
};

export type DashboardWidgetSeed = {
	definitionId: string;
	columns: PluginWidgetColumns;
};

export const DEFAULT_DASHBOARD_LAYOUT: DashboardWidgetSeed[] = [
	{ definitionId: 'app:stat-actions', columns: 1 },
	{ definitionId: 'app:stat-plugins', columns: 1 },
	{ definitionId: 'bot:commands', columns: 1 },
	{ definitionId: 'core:logs', columns: 1 },
	{ definitionId: 'app:connections', columns: 2 },
	{ definitionId: 'app:plugin-status', columns: 2 },
	{ definitionId: 'core:collections', columns: 4 }
];

export function createDefinitionId(source: string, key: string): string {
	return `${source}:${key}`;
}
