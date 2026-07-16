import assert from 'node:assert/strict';
import test from 'node:test';

import {
	appendPointHistoryEntry,
	getUserPointHistory,
	trimPointHistory,
	WATCH_TIME_AGGREGATE_MS
} from './point-history.ts';
import type { PointHistoryEntry } from './types.ts';

function createEntry(
	overrides: Partial<PointHistoryEntry> & Pick<PointHistoryEntry, 'userId'>
): PointHistoryEntry {
	return {
		id: crypto.randomUUID(),
		userId: overrides.userId,
		amount: overrides.amount ?? 1,
		balanceAfter: overrides.balanceAfter ?? 1,
		source: overrides.source ?? 'watch-time',
		kind: overrides.kind ?? 'watch-time',
		createdAt: overrides.createdAt ?? new Date().toISOString(),
		updatedAt: overrides.updatedAt
	};
}

test('aggregates watch-time entries within one hour', () => {
	const base = new Date('2026-01-01T12:00:00.000Z');
	const first = appendPointHistoryEntry([], {
		userId: 'twitch:viewer',
		amount: 1,
		balanceAfter: 1,
		source: 'watch-time',
		kind: 'watch-time',
		now: base
	});

	const second = appendPointHistoryEntry(first, {
		userId: 'twitch:viewer',
		amount: 1,
		balanceAfter: 2,
		source: 'watch-time',
		kind: 'watch-time',
		now: new Date(base.getTime() + 15 * 60 * 1000)
	});

	assert.equal(second.length, 1);
	assert.equal(second[0]?.amount, 2);
	assert.equal(second[0]?.balanceAfter, 2);
	assert.equal(second[0]?.updatedAt, new Date(base.getTime() + 15 * 60 * 1000).toISOString());
});

test('creates a new watch-time entry after one hour', () => {
	const base = new Date('2026-01-01T12:00:00.000Z');
	const first = appendPointHistoryEntry([], {
		userId: 'twitch:viewer',
		amount: 1,
		balanceAfter: 1,
		source: 'watch-time',
		kind: 'watch-time',
		now: base
	});

	const second = appendPointHistoryEntry(first, {
		userId: 'twitch:viewer',
		amount: 1,
		balanceAfter: 2,
		source: 'watch-time',
		kind: 'watch-time',
		now: new Date(base.getTime() + WATCH_TIME_AGGREGATE_MS + 1)
	});

	assert.equal(second.length, 2);
});

test('logs set mutations as separate entries', () => {
	const history = appendPointHistoryEntry([], {
		userId: 'twitch:viewer',
		amount: 50,
		balanceAfter: 150,
		source: 'manual',
		kind: 'set',
		now: new Date('2026-01-01T12:00:00.000Z')
	});

	assert.equal(history.length, 1);
	assert.equal(history[0]?.kind, 'set');
	assert.equal(history[0]?.amount, 50);
	assert.equal(history[0]?.balanceAfter, 150);
});

test('getUserPointHistory returns newest entries first', () => {
	const older = createEntry({
		userId: 'twitch:viewer',
		createdAt: '2026-01-01T10:00:00.000Z',
		amount: 10,
		source: 'follow',
		kind: 'add'
	});
	const newer = createEntry({
		userId: 'twitch:viewer',
		createdAt: '2026-01-01T12:00:00.000Z',
		amount: 5,
		source: 'manual',
		kind: 'add'
	});
	const otherUser = createEntry({
		userId: 'twitch:other',
		createdAt: '2026-01-01T13:00:00.000Z'
	});

	const history = getUserPointHistory([older, newer, otherUser], 'twitch:viewer');

	assert.deepEqual(history.map((entry) => entry.id), [newer.id, older.id]);
});

test('trimPointHistory keeps only the newest 500 entries per user', () => {
	const entries: PointHistoryEntry[] = [];

	for (let index = 0; index < 505; index += 1) {
		entries.push(
			createEntry({
				userId: 'twitch:viewer',
				createdAt: new Date(Date.UTC(2026, 0, 1, 0, 0, index)).toISOString(),
				amount: 1,
				source: 'manual',
				kind: 'add'
			})
		);
	}

	const trimmed = trimPointHistory(entries);

	assert.equal(trimmed.length, 500);
	assert.equal(trimmed[0]?.createdAt, entries.at(-1)?.createdAt);
});
