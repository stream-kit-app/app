/// <reference path="../../pb_data/types.d.ts" />

/**
 * Shared membership entitlement helpers for hook handlers.
 * Handlers run in isolated runtimes, so they must `require()` this module
 * instead of relying on file-level functions.
 */

function parsePbDateToMs(value) {
	if (value == null || value === '') {
		return null;
	}
	if (typeof value === 'number' && isFinite(value)) {
		return value;
	}
	const str = String(value).trim();
	if (!str) {
		return null;
	}
	const normalized = str.indexOf('T') >= 0 ? str : str.replace(' ', 'T');
	const ms = Date.parse(normalized);
	return isFinite(ms) ? ms : null;
}

function isMembershipEntitled(membership, nowMs) {
	nowMs = nowMs || Date.now();
	const status = membership.get('status');
	if (status === 'active') {
		return true;
	}
	if (status === 'cancelled') {
		const endsAtMs = parsePbDateToMs(membership.get('endsAt'));
		return endsAtMs != null && endsAtMs > nowMs;
	}
	return false;
}

/** Most recently purchased entitled membership, or `null`. */
function findEntitledMembership(app, userId) {
	const memberships = app.findAllRecords(
		'user_subscriptions',
		$dbx.exp('user = {:user} AND (status = {:active} OR status = {:cancelled})', {
			user: userId,
			active: 'active',
			cancelled: 'cancelled'
		})
	);
	if (!memberships || memberships.length === 0) {
		return null;
	}

	memberships.sort(function (a, b) {
		const aMs = parsePbDateToMs(a.get('purchasedAt')) || 0;
		const bMs = parsePbDateToMs(b.get('purchasedAt')) || 0;
		return bMs - aMs;
	});

	for (let i = 0; i < memberships.length; i++) {
		if (isMembershipEntitled(memberships[i])) {
			return memberships[i];
		}
	}
	return null;
}

function hasEntitledMembership(app, userId) {
	return findEntitledMembership(app, userId) !== null;
}

/** Auth record of the current request, or `null` when unauthenticated. */
function requestAuth(e) {
	const auth = e.auth || (e.requestInfo && e.requestInfo().auth);
	return auth && auth.id ? auth : null;
}

module.exports = {
	parsePbDateToMs,
	isMembershipEntitled,
	findEntitledMembership,
	hasEntitledMembership,
	requestAuth
};
