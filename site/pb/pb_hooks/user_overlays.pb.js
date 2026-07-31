/// <reference path="../pb_data/types.d.ts" />

/**
 * Cloud overlay publish: entitlement + owner binding + bundle size cap.
 */

function requireOverlayEntitlement(e) {
	const entitlement = require(`${__hooks}/shared/entitlement.js`);

	const auth = entitlement.requestAuth(e);
	if (!auth) {
		throw new BadRequestError('You must be signed in to publish overlays.');
	}

	e.record.set('user', auth.id);

	if (!entitlement.hasEntitledMembership(e.app, auth.id)) {
		throw new BadRequestError('An active subscription is required to publish overlays.');
	}

	return e.next();
}

function enforceBundleSize(e) {
	const maxBundleBytes = 100 * 1024 * 1024;
	const files = e.record.getUnsavedFiles('bundle');
	if (files && files.length > 0) {
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			if (file && Number(file.size) > maxBundleBytes) {
				throw new BadRequestError('Overlay bundle exceeds the 100MB limit.');
			}
		}
	}

	return e.next();
}

onRecordCreateRequest(requireOverlayEntitlement, 'user_overlays');
onRecordUpdateRequest(requireOverlayEntitlement, 'user_overlays');
onRecordCreateRequest(enforceBundleSize, 'user_overlays');
onRecordUpdateRequest(enforceBundleSize, 'user_overlays');
