/// <reference path="../pb_data/types.d.ts" />

/**
 * Protect `user_files.file` (token URLs required) and drop the octet-stream catch-all.
 */
migrate((app) => {
	const collection = app.findCollectionByNameOrId('pbc_9929103852');
	const fileField = collection.fields.getById('file8929103881');
	if (fileField) {
		fileField.protected = true;
		fileField.mimeTypes = [
			'audio/mpeg',
			'audio/mp3',
			'audio/wav',
			'audio/x-wav',
			'audio/ogg',
			'audio/webm',
			'audio/flac',
			'audio/aac',
			'audio/mp4',
			'image/png',
			'image/jpeg',
			'image/webp',
			'image/gif',
			'image/svg+xml',
			'video/mp4',
			'video/webm',
			'video/quicktime'
		];
	}
	return app.save(collection);
}, (app) => {
	const collection = app.findCollectionByNameOrId('pbc_9929103852');
	const fileField = collection.fields.getById('file8929103881');
	if (fileField) {
		fileField.protected = false;
		fileField.mimeTypes = [
			'audio/mpeg',
			'audio/mp3',
			'audio/wav',
			'audio/x-wav',
			'audio/ogg',
			'audio/webm',
			'audio/flac',
			'audio/aac',
			'audio/mp4',
			'image/png',
			'image/jpeg',
			'image/webp',
			'image/gif',
			'image/svg+xml',
			'video/mp4',
			'video/webm',
			'video/quicktime',
			'application/octet-stream'
		];
	}
	return app.save(collection);
});
