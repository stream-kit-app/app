import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
	formatEndsAtIso,
	isMembershipEntitled,
	parsePbDateToMs,
	SUBSCRIPTION_GRACE_MS
} from './subscription-entitlement.ts';

describe('parsePbDateToMs', () => {
	it('parses ISO and PocketBase datetime strings', () => {
		assert.equal(parsePbDateToMs('2026-07-26T12:00:00.000Z'), Date.parse('2026-07-26T12:00:00.000Z'));
		assert.equal(
			parsePbDateToMs('2026-07-26 12:00:00.000Z'),
			Date.parse('2026-07-26T12:00:00.000Z')
		);
	});

	it('returns null for blank/invalid', () => {
		assert.equal(parsePbDateToMs(null), null);
		assert.equal(parsePbDateToMs(''), null);
		assert.equal(parsePbDateToMs('not-a-date'), null);
	});
});

describe('formatEndsAtIso', () => {
	it('formats as PocketBase-friendly datetime', () => {
		const ms = Date.parse('2026-07-26T12:00:00.000Z');
		assert.equal(formatEndsAtIso(ms), '2026-07-26 12:00:00.000Z');
	});
});

describe('isMembershipEntitled', () => {
	const now = Date.parse('2026-07-26T12:00:00.000Z');

	it('entitles active memberships', () => {
		assert.equal(isMembershipEntitled({ status: 'active' }, now), true);
	});

	it('entitles cancelled memberships only while endsAt is in the future', () => {
		assert.equal(
			isMembershipEntitled({ status: 'cancelled', endsAt: '2026-07-27 00:00:00.000Z' }, now),
			true
		);
		assert.equal(
			isMembershipEntitled({ status: 'cancelled', endsAt: '2026-07-25T00:00:00.000Z' }, now),
			false
		);
		assert.equal(isMembershipEntitled({ status: 'cancelled' }, now), false);
	});

	it('rejects expired and unknown statuses', () => {
		assert.equal(isMembershipEntitled({ status: 'expired' }, now), false);
		assert.equal(isMembershipEntitled({}, now), false);
	});

	it('grace period constant is 30 days', () => {
		assert.equal(SUBSCRIPTION_GRACE_MS, 30 * 24 * 60 * 60 * 1000);
	});
});
