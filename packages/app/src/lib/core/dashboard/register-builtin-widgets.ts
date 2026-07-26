import type { BuiltinWidgetDefinition } from './types';

import ConnectionsWidget from '$lib/components/core/dashboard/widgets/connections-widget.svelte';
import PluginStatusWidget from '$lib/components/core/dashboard/widgets/plugin-status-widget.svelte';
import RunningActionsWidget from '$lib/components/core/dashboard/widgets/running-actions-widget.svelte';
import StatActionsWidget from '$lib/components/core/dashboard/widgets/stat-actions-widget.svelte';
import StatPluginsWidget from '$lib/components/core/dashboard/widgets/stat-plugins-widget.svelte';

import { getApp } from '../registry';

const builtinDashboardWidgets: BuiltinWidgetDefinition[] = [
	{
		key: 'stat-actions',
		title: 'Actions',
		icon: 'carbon:trigger',
		columns: 1,
		component: StatActionsWidget
	},
	{
		key: 'running-actions',
		title: 'Running actions',
		description: 'Actions currently executing with live progress',
		icon: 'ri:play-circle-line',
		columns: 2,
		component: RunningActionsWidget
	},
	{
		key: 'stat-plugins',
		title: 'Plugins',
		icon: 'ri:plug-line',
		columns: 1,
		component: StatPluginsWidget
	},
	{
		key: 'connections',
		title: 'Connections',
		icon: 'ri:links-line',
		columns: 2,
		component: ConnectionsWidget
	},
	{
		key: 'plugin-status',
		title: 'Plugin status',
		icon: 'ri:plug-line',
		columns: 2,
		component: PluginStatusWidget
	}
];

export function registerBuiltinDashboardWidgets(): void {
	getApp().dashboard.registerBuiltin(builtinDashboardWidgets);
}
