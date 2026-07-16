import assert from 'node:assert/strict';
import test from 'node:test';

import {
	findUserByIdentity,
	formatPlatformUserId,
	isNumericPlatformUserId,
	shouldRebindUserId
} from './extract-user.ts';
import type { UserRankingRecord } from './types.ts';

const users: UserRankingRecord[] = [
	{
		userId: 'twitch:fknoobscoh',
		username: 'fknoobscoh',
		platform: 'twitch',
		totalPoints: 200,
		watchTimeSeconds: 0,
		updatedAt: '2026-01-01T00:00:00.000Z'
	}
];

test('findUserByIdentity matches stored username-based Twitch ids from chat ids', () => {
	const user = findUserByIdentity(users, {
		userId: 'twitch:123456789',
		username: 'fknoobscoh',
		platform: 'twitch'
	});

	assert.equal(user?.userId, 'twitch:fknoobscoh');
	assert.equal(user?.totalPoints, 200);
});

test('shouldRebindUserId upgrades username keys to numeric Twitch ids', () => {
	assert.equal(
		shouldRebindUserId(users[0]!, {
			userId: 'twitch:123456789',
			username: 'fknoobscoh',
			platform: 'twitch'
		}),
		true
	);
});

test('shouldRebindUserId does not downgrade numeric ids to username keys', () => {
	const numericUser: UserRankingRecord = {
		...users[0]!,
		userId: 'twitch:123456789'
	};

	assert.equal(
		shouldRebindUserId(numericUser, {
			userId: 'twitch:fknoobscoh',
			username: 'fknoobscoh',
			platform: 'twitch'
		}),
		false
	);
});

test('formatPlatformUserId does not double-prefix ids', () => {
	assert.equal(formatPlatformUserId('twitch', '123456789'), 'twitch:123456789');
	assert.equal(formatPlatformUserId('twitch', 'twitch:123456789'), 'twitch:123456789');
	assert.equal(isNumericPlatformUserId('twitch:123456789'), true);
	assert.equal(isNumericPlatformUserId('twitch:fknoobscoh'), false);
});
