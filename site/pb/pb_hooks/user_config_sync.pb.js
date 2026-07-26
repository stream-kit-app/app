/// <reference path="../pb_data/types.d.ts" />

/**
 * Require an active subscription for cloud config sync collections.
 */
function requireActiveSubscription(e) {
	const auth = e.requestInfo().auth;
	if (!auth || !auth.id) {
		throw new BadRequestError('You must be signed in to sync configuration.');
	}

	e.record.set('user', auth.id);

	const memberships = e.app.findAllRecords(
		'user_subscriptions',
		$dbx.exp('user = {:user} AND status = {:status}', {
			user: auth.id,
			status: 'active'
		})
	);

	if (!memberships || memberships.length === 0) {
		throw new BadRequestError('An active subscription is required to sync configuration.');
	}

	return e.next();
}

onRecordCreate(requireActiveSubscription, 'user_action_queues');
onRecordUpdate(requireActiveSubscription, 'user_action_queues');
onRecordCreate(requireActiveSubscription, 'user_actions');
onRecordUpdate(requireActiveSubscription, 'user_actions');
