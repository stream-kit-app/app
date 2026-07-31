import type { App } from '../app.svelte';
import type { SettingsFieldValue } from '../settings/field';

import { normalizeCloudFileRefValue } from '../user-files/normalize-cloud-file-refs';
import { isCloudFileUrl } from '../user-files/user-files';

/** True when any config value is a host-independent or absolute PocketBase file URL. */
export function overlayConfigHasCloudFileRefs(config: Record<string, unknown>): boolean {
	return Object.values(config).some(
		(value) => typeof value === 'string' && isCloudFileUrl(value.trim())
	);
}

/**
 * Rewrite absolute PocketBase file URLs in overlay config to host-independent
 * `/api/files/...` paths before persisting. Local filesystem paths are kept
 * unchanged and should already be absolute when selected through the picker.
 */
export function normalizeOverlayConfigCloudFileRefs(
	config: Record<string, SettingsFieldValue>
): Record<string, SettingsFieldValue> {
	const next: Record<string, SettingsFieldValue> = { ...config };

	for (const [key, value] of Object.entries(next)) {
		if (typeof value !== 'string') {
			continue;
		}
		const result = normalizeCloudFileRefValue(value);
		if (result.changed && typeof result.value === 'string') {
			next[key] = result.value;
		}
	}

	return next;
}

/**
 * Resolve cloud file refs to authenticated absolute URLs for browser sources.
 * Non-cloud values are left unchanged. This intentionally does not use the
 * desktop offline mirror: browser sources run outside the desktop filesystem.
 * Stored DB config must keep relative cloud refs.
 */
export async function resolveOverlayConfigForClients(
	app: App,
	config: Record<string, unknown>
): Promise<Record<string, unknown>> {
	const next: Record<string, unknown> = { ...config };
	const cloudKeys = Object.entries(next).filter(
		([, value]) => typeof value === 'string' && value.trim() && app.userFiles.isCloudUrl(value)
	);

	if (cloudKeys.length === 0) {
		return next;
	}

	// One token fetch for all fields — avoids PocketBase auto-cancellation under Promise.all.
	await app.userFiles.ensureFileToken().catch(() => undefined);

	await Promise.all(
		cloudKeys.map(async ([key, value]) => {
			try {
				next[key] = await app.userFiles.resolveAuthenticatedUrl(String(value));
			} catch (error) {
				console.warn('Failed to resolve overlay cloud file setting', key, error);
			}
		})
	);

	return next;
}
