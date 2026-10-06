/// <reference path="../pb_data/types.d.ts" />

/**
 * POST /api/subscriptions/{id}/cancel
 * Cancels the caller's active membership. The grace end date is set here so
 * clients can't choose their own `endsAt` (the collection update rule is superuser-only).
 */

routerAdd(
	'POST',
	'/api/subscriptions/{id}/cancel',
	(e) => {
		const entitlement = require(`${__hooks}/shared/entitlement.js`);

		const auth = entitlement.requestAuth(e);
		if (!auth) {
			throw new UnauthorizedError('You must be signed in to cancel a subscription.');
		}

		let membership = null;
		try {
			membership = e.app.findRecordById('user_subscriptions', e.request.pathValue('id'));
		} catch (_) {
			membership = null;
		}

		if (!membership || membership.get('user') !== auth.id) {
			throw new NotFoundError('Subscription not found.');
		}

		if (membership.get('status') !== 'active') {
			throw new BadRequestError('Only an active subscription can be cancelled.');
		}

		const nowMs = Date.now();
		membership.set('status', 'cancelled');
		membership.set('cancelledAt', new Date(nowMs).toISOString());
		membership.set('endsAt', new Date(nowMs + entitlement.SUBSCRIPTION_GRACE_MS).toISOString());
		e.app.save(membership);

		return e.json(200, {
			id: membership.id,
			status: membership.get('status'),
			cancelledAt: membership.get('cancelledAt'),
			endsAt: membership.get('endsAt')
		});
	},
	$apis.requireAuth()
);
