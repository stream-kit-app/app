/// <reference path="../pb_data/types.d.ts" />

/**
 * Require an active subscription for cloud config sync collections.
 * Always bind `user` to the authenticated record (createRule only checks auth).
 */
function requireActiveSubscription(e) {
	const auth = e.auth || (e.requestInfo && e.requestInfo().auth);
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

onRecordCreateRequest(requireActiveSubscription, 'user_action_queues');
onRecordUpdateRequest(requireActiveSubscription, 'user_action_queues');
onRecordCreateRequest(requireActiveSubscription, 'user_actions');
onRecordUpdateRequest(requireActiveSubscription, 'user_actions');
