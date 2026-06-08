import type { PluginAppApi } from '@stream-kit/app/api';

import type { YouTubePluginApi } from './youtube';

export function getYouTube(app: PluginAppApi): YouTubePluginApi {
	return app.plugins.get<YouTubePluginApi>('youtube');
}

export function tryGetYouTube(app: PluginAppApi): YouTubePluginApi | undefined {
	return app.plugins.tryGet<YouTubePluginApi>('youtube');
}
