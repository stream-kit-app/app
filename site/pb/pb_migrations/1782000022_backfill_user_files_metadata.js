/// <reference path="../pb_data/types.d.ts" />

/**
 * Backfill empty `user_files` metadata from storage attrs + file size.
 * Earlier uploads often stored the file but left mimeType/size/originalName empty
 * (hook used non-existent `file.type`, or ran before the hook was loaded).
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

migrate((app) => {
	const records = app.findAllRecords('user_files');
	const storageRoot = $filepath.join(__hooks, '../pb_data/storage');

	for (const record of records) {
		const fileName = String(record.get('file') || '');
		if (!fileName) {
			continue;
		}

		const currentMime = String(record.get('mimeType') || '');
		const currentName = String(record.get('originalName') || '');
		const currentSize = Number(record.get('size')) || 0;
		if (currentMime && currentName && currentSize > 0) {
			continue;
		}

		const filePath = $filepath.join(storageRoot, record.baseFilesPath(), fileName);
		let size = currentSize;
		let originalName = currentName;
		let mimeType = currentMime;

		try {
			const stat = $os.stat(filePath);
			if (stat && Number(stat.size) > 0) {
				size = Number(stat.size);
			}
		} catch (_err) {
			// keep existing size
		}

		try {
			const attrsRaw = toString($os.readFile(filePath + '.attrs'));
			const attrs = JSON.parse(attrsRaw);
			if (!mimeType && attrs && attrs['user.content_type']) {
				mimeType = String(attrs['user.content_type']);
			}
			const metaName =
				attrs && attrs['user.metadata'] && attrs['user.metadata']['original-filename'];
			if (!originalName && metaName) {
				originalName = String(metaName);
			}
		} catch (_err) {
			// attrs optional
		}

		if (!originalName) {
			originalName = fileName;
		}
		if (!mimeType) {
			mimeType = mimeFromName(originalName || fileName);
		}

		record.set('mimeType', mimeType);
		record.set('originalName', originalName);
		record.set('size', size);
		app.save(record);
	}
}, (app) => {
	// irreversible metadata repair
});
