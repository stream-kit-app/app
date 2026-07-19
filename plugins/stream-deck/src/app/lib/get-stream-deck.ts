import { streamDeck } from '../../lib/instances';
import type { StreamDeckService } from '../../lib/stream-deck-service';

export function getStreamDeckService(): StreamDeckService {
	return streamDeck;
}
