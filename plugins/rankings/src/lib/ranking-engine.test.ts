import assert from 'node:assert/strict';
import test from 'node:test';

import {
	didRankChange,
	didTierAdvance,
	orderRanks,
	resolveProgress
} from './ranking-engine.ts';
import { DEFAULT_RANKS, DEFAULT_TIERS } from './types.ts';

const ordered = orderRanks(DEFAULT_TIERS, DEFAULT_RANKS);

test('orderRanks sorts by tier then pointsRequired', () => {
	assert.equal(ordered[0]?.rank.id, 'rank-b1');
	assert.equal(ordered.at(-1)?.rank.id, 'rank-s3');
});

test('resolveProgress returns highest milestone reached', () => {
	const atZero = resolveProgress(0, ordered);
	assert.equal(atZero.rank?.id, 'rank-b1');

	const atRegular = resolveProgress(150, ordered);
	assert.equal(atRegular.rank?.id, 'rank-b2');

	const atLegend = resolveProgress(6000, ordered);
	assert.equal(atLegend.rank?.id, 'rank-s3');
});

test('didRankChange detects milestone changes', () => {
	const before = resolveProgress(90, ordered);
	const after = resolveProgress(150, ordered);

	assert.equal(didRankChange(before, after), true);
	assert.equal(didRankChange(after, after), false);
});

test('didTierAdvance detects moving into a new tier', () => {
	const before = resolveProgress(1000, ordered);
	const after = resolveProgress(1500, ordered);

	assert.equal(didTierAdvance(before, after, ordered), true);
	assert.equal(didTierAdvance(before, resolveProgress(1100, ordered), ordered), false);
});
