/// <reference path="../pb_data/types.d.ts" />

/**
 * Require an entitled subscription for cloud config sync collections.
 * Active plans and cancelled plans still within endsAt are allowed.
 * Always bind `user` to the authenticated record (createRule only checks auth).
 */

function requireActiveSubscription(e) {
	const entitlement = require(`${__hooks}/shared/entitlement.js`);

	const auth = entitlement.requestAuth(e);
	if (!auth) {
		throw new BadRequestError('You must be signed in to sync configuration.');
	}

	e.record.set('user', auth.id);

	if (!entitlement.hasEntitledMembership(e.app, auth.id)) {
		throw new BadRequestError('An active subscription is required to sync configuration.');
	}

	return e.next();
}

onRecordCreateRequest(requireActiveSubscription, 'user_action_queues');
onRecordUpdateRequest(requireActiveSubscription, 'user_action_queues');
onRecordCreateRequest(requireActiveSubscription, 'user_actions');
onRecordUpdateRequest(requireActiveSubscription, 'user_actions');
onRecordCreateRequest(requireActiveSubscription, 'user_plugin_records');
onRecordUpdateRequest(requireActiveSubscription, 'user_plugin_records');
onRecordCreateRequest(requireActiveSubscription, 'user_overlay_projects');
onRecordUpdateRequest(requireActiveSubscription, 'user_overlay_projects');
onRecordCreateRequest(requireActiveSubscription, 'user_dashboard_widgets');
onRecordUpdateRequest(requireActiveSubscription, 'user_dashboard_widgets');
