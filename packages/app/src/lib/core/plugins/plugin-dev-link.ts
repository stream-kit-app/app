import { invoke } from '@tauri-apps/api/core';

import { translate } from '$lib/i18n';

import { app } from '../app-init';

export async function linkWorkspaceDevPlugins(workspaceRoot?: string): Promise<void> {
	if (!workspaceRoot) {
		console.warn('Skipping workspace dev plugin linking: workspace root is not configured.');
		return;
	}

	try {
		const linked = await invoke<Array<{ key: string; name: string }>>('link_workspace_dev_plugins', {
			workspaceRoot,
			replaceExisting: true
		});

		if (linked.length === 0) {
			console.warn('No workspace dev plugins were linked. Check dev-plugins.json and plugin builds.');
		}
	} catch (error) {
		console.error('Failed to link workspace dev plugins', error);
		app.toast.create({
			title: translate('Plugin could not be loaded'),
			description:
				error instanceof Error
					? error.message
					: translate('Workspace dev plugins could not be linked.'),
			variant: 'warning'
		});
	}
}

export async function linkPluginDev(projectPath: string, replaceExisting = false): Promise<void> {
	await invoke('link_plugin_dev', {
		projectPath,
		replaceExisting
	});
}

export async function syncDevPluginEntry(pluginKey: string): Promise<void> {
	await invoke('sync_dev_plugin_entry', { pluginKey });
}
