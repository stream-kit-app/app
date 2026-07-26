/// <reference path="../pb_data/types.d.ts" />

/**
 * Fill metadata and enforce plan upload quotas on `user_files` creates.
 * Note: `filesystem.File` has size / originalName / name — not `type`.
 */
function mimeFromName(name) {
	const base = String(name || '').split(/[/\\]/).pop() || '';
	const dot = base.lastIndexOf('.');
	const ext = dot < 0 ? '' : base.slice(dot + 1).toLowerCase();
	const map = {
		mp3: 'audio/mpeg',
		mpeg: 'audio/mpeg',
		wav: 'audio/wav',
		ogg: 'audio/ogg',
		webm: 'audio/webm',
		flac: 'audio/flac',
		aac: 'audio/aac',
		m4a: 'audio/mp4',
		png: 'image/png',
		jpg: 'image/jpeg',
		jpeg: 'image/jpeg',
		webp: 'image/webp',
		gif: 'image/gif',
		svg: 'image/svg+xml',
		mp4: 'video/mp4',
		mov: 'video/quicktime',
		zip: 'application/zip'
	};
	return map[ext] || 'application/octet-stream';
}

function applyFileMetadata(record, file) {
	const originalName = file.originalName || file.name || 'upload.bin';
	const size = Number(file.size) || 0;
	record.set('mimeType', mimeFromName(originalName));
	record.set('size', size);
	record.set('originalName', originalName);
}

function onUserFilesCreate(e) {
	const auth = e.requestInfo().auth;
	if (!auth || !auth.id) {
		throw new BadRequestError('You must be signed in to upload files.');
	}

	const files = e.record.getUnsavedFiles('file');
	if (files.length === 0) {
		throw new BadRequestError('A file is required.');
	}

	const file = files[0];
	applyFileMetadata(e.record, file);
	e.record.set('user', auth.id);

	const size = Number(e.record.get('size')) || 0;

	const memberships = e.app.findAllRecords(
		'user_subscriptions',
		$dbx.exp('user = {:user} AND status = {:status}', {
			user: auth.id,
			status: 'active'
		})
	);

	if (!memberships || memberships.length === 0) {
		throw new BadRequestError('An active subscription is required to upload files.');
	}

	let plan = null;
	for (const membership of memberships) {
		try {
			plan = e.app.findRecordById('subscriptions', membership.get('subscription'));
			if (plan) {
				break;
			}
		} catch (_err) {
			// try next membership
		}
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

	const existing = e.app.findAllRecords(
		'user_files',
		$dbx.exp('user = {:user}', { user: auth.id })
	);
	let usedBytes = 0;
	for (const row of existing) {
		usedBytes += Number(row.get('size')) || 0;
	}

	if (maxStorageBytes > 0 && usedBytes + size > maxStorageBytes) {
		throw new BadRequestError(
			'This upload would exceed your storage quota (' + maxStorageBytes + ' bytes).'
		);
	}

	return e.next();
}

function onUserFilesUpdate(e) {
	const files = e.record.getUnsavedFiles('file');
	if (files.length > 0) {
		applyFileMetadata(e.record, files[0]);
	}
	return e.next();
}

onRecordCreate(onUserFilesCreate, 'user_files');
onRecordUpdate(onUserFilesUpdate, 'user_files');
