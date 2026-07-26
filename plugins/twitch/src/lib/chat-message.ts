/** Twitch Helix / IRC chat message body limit. */
export const TWITCH_CHAT_MESSAGE_MAX_LENGTH = 500;

/**
 * Split a chat message into chunks that each fit Twitch's max length.
 * Prefers breaking on spaces, then `|` (leaderboard-style), otherwise hard-cuts.
 */
export function chunkTwitchChatMessages(
	message: string,
	maxLength = TWITCH_CHAT_MESSAGE_MAX_LENGTH
): string[] {
	const trimmed = message.trim();

	if (!trimmed) {
		return [];
	}

	if (trimmed.length <= maxLength) {
		return [trimmed];
	}

	const chunks: string[] = [];
	let remaining = trimmed;

	while (remaining.length > maxLength) {
		const window = remaining.slice(0, maxLength);
		const spaceAt = window.lastIndexOf(' ');
		const pipeAt = window.lastIndexOf('|');
		const minSoftBreak = Math.floor(maxLength * 0.5);
		let splitAt = maxLength;

		if (spaceAt >= minSoftBreak) {
			splitAt = spaceAt;
		} else if (pipeAt >= minSoftBreak) {
			splitAt = pipeAt + 1;
		}

		chunks.push(remaining.slice(0, splitAt).trimEnd());
		remaining = remaining.slice(splitAt).trimStart();
	}

	if (remaining) {
		chunks.push(remaining);
	}

	return chunks;
}
