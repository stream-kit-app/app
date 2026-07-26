/// <reference path="../pb_data/types.d.ts" />

function recalculatePluginRating(app, pluginId) {
	if (!pluginId) {
		return;
	}

	const reviews = app.findAllRecords(
		'plugin_reviews',
		$dbx.exp('plugin = {:plugin}', { plugin: pluginId })
	);

	let averageRating = 0;
	const ratingCount = reviews.length;

	if (ratingCount > 0) {
		let sum = 0;
		for (const review of reviews) {
			sum += Number(review.get('rating') || 0);
		}
		averageRating = Math.round((sum / ratingCount) * 100) / 100;
	}

	const plugin = app.findRecordById('plugins', pluginId);
	plugin.set('averageRating', averageRating);
	plugin.set('ratingCount', ratingCount);
	app.save(plugin);
}

function onPluginReviewChange(e) {
	e.next();

	const pluginId = e.record.get('plugin');
	recalculatePluginRating(e.app, pluginId);
}

function onPluginReviewDelete(e) {
	const pluginId = e.record.get('plugin');
	e.next();
	recalculatePluginRating(e.app, pluginId);
}

onRecordAfterCreateSuccess(onPluginReviewChange, 'plugin_reviews');
onRecordAfterUpdateSuccess(onPluginReviewChange, 'plugin_reviews');
onRecordAfterDeleteSuccess(onPluginReviewDelete, 'plugin_reviews');
