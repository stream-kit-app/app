/// <reference path="../pb_data/types.d.ts" />

function onFilesRecordChange(e) {
	const files = e.record.getUnsavedFiles('file');

	if (files.length > 0) {
		const file = files[0];
		e.record.set('mimeType', file.type || 'application/zip');
		e.record.set('size', file.size);
		e.record.set('originalName', file.originalName || file.name);

		const reader = file.reader.open();
		try {
			e.record.set('sha256', $security.sha256(toString(reader)));
		} finally {
			reader.close();
		}
	} else if (!e.record.get('file')) {
		e.record.set('mimeType', '');
		e.record.set('size', 0);
		e.record.set('sha256', '');
		e.record.set('originalName', '');
	}

	return e.next();
}

onRecordCreate(onFilesRecordChange, 'files');
onRecordUpdate(onFilesRecordChange, 'files');
