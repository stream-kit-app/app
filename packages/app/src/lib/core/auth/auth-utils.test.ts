import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
	isPocketBaseNotFound,
	resolvePocketBaseUrl,
	toPublicSubscription,
	toPublicSubscriptionFromMembership
} from './auth-utils.ts';
import { formatEndsAtIso, SUBSCRIPTION_GRACE_MS } from './subscription-entitlement.ts';

describe('resolvePocketBaseUrl', () => {
	it('trims and strips trailing slash', () => {
		assert.equal(resolvePocketBaseUrl(' https://pb.example/ '), 'https://pb.example');
	});

	it('returns null for blank', () => {
		assert.equal(resolvePocketBaseUrl(''), null);
		assert.equal(resolvePocketBaseUrl(null), null);
	});
});

describe('toPublicSubscription', () => {
	it('maps enabled plan fields', () => {
		assert.deepEqual(
			toPublicSubscription({
				key: 'pro',
				name: 'Pro',
				enabled: true,
				maxFileBytes: 10,
				maxStorageBytes: 100
			}),
			{ key: 'pro', name: 'Pro', maxFileBytes: 10, maxStorageBytes: 100 }
		);
	});

	it('rejects disabled plans', () => {
		assert.equal(toPublicSubscription({ key: 'pro', name: 'Pro', enabled: false }), null);
	});
});

describe('toPublicSubscriptionFromMembership', () => {
	const plan = {
		key: 'pro',
		name: 'Pro',
		enabled: true,
		maxFileBytes: 10,
		maxStorageBytes: 100
	};

	it('maps active memberships', () => {
		assert.deepEqual(
			toPublicSubscriptionFromMembership({
				status: 'active',
				expand: { subscription: plan }
			}),
			{ key: 'pro', name: 'Pro', maxFileBytes: 10, maxStorageBytes: 100 }
		);
	});

	it('maps cancelled-in-grace memberships with endsAt', () => {
		const endsAtMs = Date.now() + SUBSCRIPTION_GRACE_MS;
		const result = toPublicSubscriptionFromMembership({
			status: 'cancelled',
			endsAt: formatEndsAtIso(endsAtMs),
			expand: { subscription: plan }
		});
		assert.ok(result);
		assert.equal(result.key, 'pro');
		assert.equal(result.endsAt, new Date(endsAtMs).toISOString());
	});

	it('rejects cancelled memberships past endsAt', () => {
		assert.equal(
			toPublicSubscriptionFromMembership({
				status: 'cancelled',
				endsAt: formatEndsAtIso(Date.now() - 1),
				expand: { subscription: plan }
			}),
			null
		);
	});
});

describe('isPocketBaseNotFound', () => {
	it('detects 404-shaped errors', () => {
		assert.equal(isPocketBaseNotFound({ status: 404 }), true);
		assert.equal(isPocketBaseNotFound({ status: 403 }), false);
		assert.equal(isPocketBaseNotFound({ message: 'missing' }), false);
	});
});
