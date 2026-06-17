import type { PluginAppApi } from '@stream-kit/plugin';

import { getBroadcasterId } from './broadcaster';
import { getTwitch } from './plugin-api';

const badgeUrls = new Map<string, string>();

function cacheKey(setId: string, versionId: string): string {
	return `${setId}/${versionId}`;
}

export function setBadgeUrl(setId: string, versionId: string, url: string): void {
	badgeUrls.set(cacheKey(setId, versionId), url);
}

export function resolveBadgeUrl(setId: string, versionId: string): string {
	return badgeUrls.get(cacheKey(setId, versionId)) ?? '';
}

export function clearBadgeCache(): void {
	badgeUrls.clear();
}

export async function refreshBadgeCache(app: PluginAppApi): Promise<void> {
	const client = getTwitch(app).client;

	if (!client) {
		clearBadgeCache();
		return;
	}

	clearBadgeCache();

	try {
		const globalBadges = await client.chat.getGlobalBadges();

		for (const set of globalBadges) {
			for (const version of set.versions) {
				setBadgeUrl(set.id, version.id, version.getImageUrl(4));
			}
		}
	} catch (error) {
		console.error('Failed to load global Twitch badges', error);
	}

	const broadcasterId = getBroadcasterId(app);

	if (!broadcasterId) {
		return;
	}

	try {
		const channelBadges = await client.chat.getChannelBadges(broadcasterId);

		for (const set of channelBadges) {
			for (const version of set.versions) {
				setBadgeUrl(set.id, version.id, version.getImageUrl(4));
			}
		}
	} catch (error) {
		console.error('Failed to load channel Twitch badges', error);
	}
}
