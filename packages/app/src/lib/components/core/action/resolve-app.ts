import type { PluginAppApi } from '@stream-kit/plugin';

import { getApp, tryGetApp } from '$lib/core/registry';

export function resolveApp(prop?: PluginAppApi): PluginAppApi {
	if (prop) {
		return prop;
	}

	const app = tryGetApp();

	if (app) {
		return app as unknown as PluginAppApi;
	}

	return getApp() as unknown as PluginAppApi;
}
