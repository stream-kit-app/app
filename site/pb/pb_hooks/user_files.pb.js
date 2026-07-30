/// <reference path="../pb_data/types.d.ts" />

/**
 * Bind ownership + fill metadata / enforce plan quotas on `user_files`.
 * createRule is auth-only (multipart body `user` is brittle); ownership is forced here.
 * Note: `filesystem.File` has size / originalName / name — not `type`.
 *
 * Auth + quota must run in onRecordCreateRequest: onRecordCreate is a DB model hook
 * and does not expose `e.auth` (same pattern as user_config_sync / user_overlays).
 */

function onUserFilesCreateRequest(e) {
	const entitlement = require(`${__hooks}/shared/entitlement.js`);
	const userFiles = require(`${__hooks}/shared/user-files.js`);

	const auth = entitlement.requestAuth(e);
	if (!auth) {
		throw new BadRequestError('You must be signed in to upload files.');
	}

	e.record.set('user', auth.id);

	const files = e.record.getUnsavedFiles('file');
	if (files.length === 0) {
		throw new BadRequestError('A file is required.');
	}

	userFiles.applyFileMetadata(e.record, files[0]);

	const size = Number(e.record.get('size')) || 0;

	const membership = entitlement.findEntitledMembership(e.app, auth.id);
	if (!membership) {
		throw new BadRequestError('An active subscription is required to upload files.');
	}

	let plan = null;
	try {
		plan = e.app.findRecordById('subscriptions', membership.get('subscription'));
	} catch (_err) {
		plan = null;
	}

	if (!plan) {
		throw new BadRequestError('An active subscription is required to upload files.');
	}

	const maxFileBytes = Number(plan.get('maxFileBytes')) || 0;
	const maxStorageBytes = Number(plan.get('maxStorageBytes')) || 0;

	if (maxFileBytes > 0 && size > maxFileBytes) {
		throw new BadRequestError(
			'This file exceeds the maximum upload size for your plan (' + maxFileBytes + ' bytes).'
		);
	}

	const usedBytes = userFiles.sumUsedBytes(e.app, auth.id);

	if (maxStorageBytes > 0 && usedBytes + size > maxStorageBytes) {
		throw new BadRequestError(
			'This upload would exceed your storage quota (' + maxStorageBytes + ' bytes).'
		);
	}

	return e.next();
}

function onUserFilesUpdate(e) {
	const userFiles = require(`${__hooks}/shared/user-files.js`);

	const files = e.record.getUnsavedFiles('file');
	if (files.length > 0) {
		userFiles.applyFileMetadata(e.record, files[0]);
	}
	return e.next();
}

onRecordCreateRequest(onUserFilesCreateRequest, 'user_files');
onRecordUpdate(onUserFilesUpdate, 'user_files');
