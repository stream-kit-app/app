/// <reference path="../pb_data/types.d.ts" />
/**
 * Raise per-file cloud upload limit to 50 MB on all subscription plans.
 * (Previous free/default backfill used 5 MB, which blocked typical overlay videos.)
 */
migrate((app) => {
	const target = 50 * 1024 * 1024;
	const records = app.findAllRecords('subscriptions');
	for (const record of records) {
		const current = Number(record.get('maxFileBytes')) || 0;
		if (current < target) {
			record.set('maxFileBytes', target);
			app.save(record);
		}
	}
}, (app) => {
	const records = app.findAllRecords('subscriptions');
	for (const record of records) {
		const key = String(record.get('key') || '');
		if (key !== 'pro') {
			record.set('maxFileBytes', 5 * 1024 * 1024);
			app.save(record);
		}
	}
});
