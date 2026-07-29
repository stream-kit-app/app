/// <reference path="../../pb_data/types.d.ts" />

/**
 * Shared `user_files` helpers for hook handlers.
 * Handlers run in isolated runtimes, so they must `require()` this module
 * instead of relying on file-level functions.
 */

const MIME_BY_EXTENSION = {
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
	mov: 'video/quicktime'
};

/** Allowlisted media mime type for `name`, or `null` when not allowed. */
function mimeFromName(name) {
	const base = String(name || '').split(/[/\\]/).pop() || '';
	const dot = base.lastIndexOf('.');
	const ext = dot < 0 ? '' : base.slice(dot + 1).toLowerCase();
	return MIME_BY_EXTENSION[ext] || null;
}

function applyFileMetadata(record, file) {
	const originalName = file.originalName || file.name || 'upload.bin';
	const size = Number(file.size) || 0;
	const mime = mimeFromName(originalName);
	if (!mime) {
		throw new BadRequestError('This file type is not allowed for cloud upload.');
	}
	record.set('mimeType', mime);
	record.set('size', size);
	record.set('originalName', originalName);
}

function sumUsedBytes(app, userId) {
	try {
		const result = new DynamicModel({ total: 0 });
		app
			.db()
			.newQuery('SELECT COALESCE(SUM(size), 0) as total FROM user_files WHERE user = {:user}')
			.bind({ user: userId })
			.one(result);
		return Number(result.total) || 0;
	} catch (_err) {
		// Fallback when raw SQL / DynamicModel is unavailable in this PB build.
		const existing = app.findAllRecords('user_files', $dbx.exp('user = {:user}', { user: userId }));
		let usedBytes = 0;
		for (let i = 0; i < existing.length; i++) {
			usedBytes += Number(existing[i].get('size')) || 0;
		}
		return usedBytes;
	}
}

module.exports = {
	mimeFromName,
	applyFileMetadata,
	sumUsedBytes
};
