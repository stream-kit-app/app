import type { RegisteredPlugin } from '$lib/core/plugins';
import type { TranslationKey } from '$lib/i18n';

import { getApp } from '$lib/core/registry';
import { uninstallInstalledPlugin } from '$lib/core/plugins/plugin-loader';
import { canApplyPluginUpdates } from '$lib/core/plugins/plugin-update';
import { pluginUpdates } from '$lib/core/plugins/plugin-updates.svelte';
import { translate } from '$lib/i18n';

export type PluginStatus = 'disabled' | 'unavailable' | 'configured' | 'not-configured';

export const pluginStatusLabels: Record<PluginStatus, TranslationKey> = {
	disabled: 'Disabled',
	unavailable: 'Unavailable',
	configured: 'Configured',
	'not-configured': 'Not configured'
};

export const pluginStatusDotClasses: Record<PluginStatus, string> = {
	disabled: 'bg-dark-400',
	unavailable: 'bg-destructive-200',
	configured: 'bg-success-200',
	'not-configured': 'bg-warning-200'
};

export function resolvePluginStatus(plugin: RegisteredPlugin): PluginStatus {
	const app = getApp();

	if (!plugin.isEnabled) {
		return 'disabled';
	}

	if (plugin.missingDependencies(app).length > 0 || plugin.disabledDependencies(app).length > 0) {
		return 'unavailable';
	}

	return plugin.isConfigured(app) ? 'configured' : 'not-configured';
}

export async function setPluginEnabled(plugin: RegisteredPlugin, enabled: boolean): Promise<void> {
	const app = getApp();

	await plugin.setEnabled(app, enabled);

	app.toast.create({
		title: enabled ? translate('Plugin enabled') : translate('Plugin disabled'),
		description: enabled
			? translate('{name} has been enabled.', { name: plugin.name })
			: translate('{name} has been disabled.', { name: plugin.name }),
		variant: 'success'
	});
}

/** Asks for confirmation, then removes the plugin. Resolves `true` when it was removed. */
export async function uninstallPlugin(plugin: RegisteredPlugin): Promise<boolean> {
	const app = getApp();
	const confirmed = await app.confirm.ask({
		title: translate('Remove plugin?'),
		description: translate(
			'Are you sure you want to remove {name}? This action cannot be undone.',
			{ name: plugin.name }
		),
		confirmLabel: translate('Delete'),
		cancelLabel: translate('Cancel')
	});

	if (!confirmed) {
		return false;
	}

	try {
		await uninstallInstalledPlugin(app, plugin.key);
		app.toast.create({
			title: translate('Plugin removed'),
			description: translate('{name} has been removed.', { name: plugin.name }),
			variant: 'success'
		});

		return true;
	} catch (error) {
		app.toast.create({
			title: translate('Plugin could not be removed'),
			description: error instanceof Error ? error.message : translate('Unknown error.'),
			variant: 'error'
		});

		return false;
	}
}

/** Asks for confirmation, then applies the pending update for the plugin. */
export async function updatePlugin(plugin: RegisteredPlugin): Promise<void> {
	const app = getApp();
	const pendingUpdate = pluginUpdates.getUpdate(plugin.key);

	if (!pendingUpdate || !canApplyPluginUpdates()) {
		return;
	}

	const confirmed = await app.confirm.ask({
		title: translate('Update plugin?'),
		description: translate(
			'Update {name} from v{current} to v{next}? Installed plugins run with full access to Stream Kit and your system. Only update plugins from sources you trust.',
			{
				name: plugin.name,
				current: pendingUpdate.installedVersion,
				next: pendingUpdate.availableVersion
			}
		),
		confirmLabel: translate('Update'),
		cancelLabel: translate('Cancel')
	});

	if (!confirmed) {
		return;
	}

	const nextVersion = pendingUpdate.availableVersion;

	try {
		await pluginUpdates.apply(plugin.key);
		app.toast.create({
			title: translate('Plugin updated'),
			description: translate('{name} has been updated to v{version}.', {
				name: plugin.name,
				version: nextVersion
			}),
			variant: 'success'
		});
	} catch (error) {
		app.toast.create({
			title: translate('Plugin could not be updated'),
			description: error instanceof Error ? error.message : translate('Unknown error.'),
			variant: 'error'
		});
	}
}

export function pluginDetailPath(plugin: RegisteredPlugin): string {
	return `/plugins/${encodeURIComponent(plugin.key)}`;
}
