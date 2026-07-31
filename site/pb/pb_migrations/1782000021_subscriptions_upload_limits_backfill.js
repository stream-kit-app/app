/// <reference path="../pb_data/types.d.ts" />
/**
 * Backfill upload limits on existing subscription catalog rows, then require the fields.
 * Default / free-like: 50 MB / file, 50 MB storage. Pro: 50 MB / file, 1 GB storage.
 * (Per-file limit later raised for all plans in 1782000042 if still below 50 MB.)
 */
migrate((app) => {
	const records = app.findAllRecords('subscriptions');
	for (const record of records) {
		const key = String(record.get('key') || '');
		if (key === 'pro') {
			record.set('maxFileBytes', 50 * 1024 * 1024);
			record.set('maxStorageBytes', 1024 * 1024 * 1024);
		} else {
			record.set('maxFileBytes', 50 * 1024 * 1024);
			record.set('maxStorageBytes', 50 * 1024 * 1024);
		}
		app.save(record);
	}

	const subscriptions = app.findCollectionByNameOrId('pbc_7929103850');
	const maxFile = subscriptions.fields.getById('number8929103870');
	const maxStorage = subscriptions.fields.getById('number8929103871');
	if (maxFile) {
		maxFile.required = true;
	}
	if (maxStorage) {
		maxStorage.required = true;
	}
	return app.save(subscriptions);
}, (app) => {
	const subscriptions = app.findCollectionByNameOrId('pbc_7929103850');
	const maxFile = subscriptions.fields.getById('number8929103870');
	const maxStorage = subscriptions.fields.getById('number8929103871');
	if (maxFile) {
		maxFile.required = false;
	}
	if (maxStorage) {
		maxStorage.required = false;
	}
	return app.save(subscriptions);
});
