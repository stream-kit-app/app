import type { PluginAppApi } from '@stream-kit/plugin';

import type { StreamDeckService } from './stream-deck-service';

export type StreamDeckPluginApi = {
	streamDeck: StreamDeckService;
};

export function getStreamDeck(app: PluginAppApi): StreamDeckService {
	const api = app.plugins.get<StreamDeckPluginApi>('stream-deck');

	if (!api?.streamDeck) {
		throw new Error('Stream Deck plugin is not loaded');
	}

	return api.streamDeck;
}

export function tryGetStreamDeck(app: PluginAppApi): StreamDeckService | undefined {
	return app.plugins.tryGet<StreamDeckPluginApi>('stream-deck')?.streamDeck;
}
