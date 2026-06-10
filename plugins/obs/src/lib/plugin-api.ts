import type { PluginAppApi } from '@stream-kit/app/api';

import type { ObsPluginApi } from './obs';

export function getObs(app: PluginAppApi): ObsPluginApi {
	return app.plugins.get<ObsPluginApi>('obs');
}

export function tryGetObs(app: PluginAppApi): ObsPluginApi | undefined {
	return app.plugins.tryGet<ObsPluginApi>('obs');
}
