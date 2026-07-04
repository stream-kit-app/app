import type { App } from '../app.svelte';
import type { OverlayManifest } from './overlay-manifest';

import { translate } from '$lib/i18n';

export function missingRequiredPlugins(manifest: OverlayManifest, app: App): string[] {
	return (manifest.requiredPlugins ?? []).filter((key) => !app.plugins.find(key));
}

export function disabledRequiredPlugins(manifest: OverlayManifest, app: App): string[] {
	return (manifest.requiredPlugins ?? []).filter((key) => app.plugins.find(key)?.isEnabled === false);
}

export function canUseOverlay(manifest: OverlayManifest, app: App): boolean {
	return (
		missingRequiredPlugins(manifest, app).length === 0 &&
		disabledRequiredPlugins(manifest, app).length === 0
	);
}

export function getOverlayUnavailableReason(manifest: OverlayManifest, app: App): string | null {
	const missing = missingRequiredPlugins(manifest, app);

	if (missing.length > 0) {
		return translate('This overlay requires plugins that are not installed: {plugins}.', {
			plugins: missing.join(', ')
		});
	}

	const disabled = disabledRequiredPlugins(manifest, app);

	if (disabled.length > 0) {
		return translate('This overlay requires plugins that are disabled: {plugins}.', {
			plugins: disabled.join(', ')
		});
	}

	return null;
}

export function formatRequiredPluginLabels(app: App, pluginKeys: string[]): string {
	return pluginKeys
		.map((key) => app.plugins.find(key)?.name ?? key)
		.join(', ');
}
