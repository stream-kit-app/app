import assert from 'node:assert/strict';
import test from 'node:test';

import {
	TWITCH_CHAT_MESSAGE_MAX_LENGTH,
	chunkTwitchChatMessages
} from './chat-message.ts';

test('chunkTwitchChatMessages returns empty for blank input', () => {
	assert.deepEqual(chunkTwitchChatMessages('   '), []);
});

test('chunkTwitchChatMessages keeps short messages intact', () => {
	assert.deepEqual(chunkTwitchChatMessages('  hello chat  '), ['hello chat']);
});

test('chunkTwitchChatMessages splits on spaces near the limit', () => {
	const first = 'a'.repeat(200);
	const second = 'b'.repeat(200);
	const third = 'c'.repeat(200);
	const message = `${first} ${second} ${third}`;
	const chunks = chunkTwitchChatMessages(message);

	assert.equal(chunks.length, 2);
	assert.ok(chunks.every((chunk) => chunk.length <= TWITCH_CHAT_MESSAGE_MAX_LENGTH));
	assert.equal(chunks.join(' '), message);
});

test('chunkTwitchChatMessages prefers pipe breaks for leaderboard-style text', () => {
	const entry = '1. verylongusernamehere — 12345 pts (Legend)';
	const message = Array.from({ length: 20 }, (_, i) => entry.replace('1.', `${i + 1}.`)).join(
		' | '
	);
	const chunks = chunkTwitchChatMessages(message);

	assert.ok(chunks.length > 1);
	assert.ok(chunks.every((chunk) => chunk.length <= TWITCH_CHAT_MESSAGE_MAX_LENGTH));
	assert.ok(chunks.some((chunk) => chunk.includes('|')));
});

test('chunkTwitchChatMessages hard-cuts when there is no soft break', () => {
	const message = 'x'.repeat(TWITCH_CHAT_MESSAGE_MAX_LENGTH + 50);
	const chunks = chunkTwitchChatMessages(message);

	assert.deepEqual(chunks, [
		'x'.repeat(TWITCH_CHAT_MESSAGE_MAX_LENGTH),
		'x'.repeat(50)
	]);
});
