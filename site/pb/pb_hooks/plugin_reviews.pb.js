/// <reference path="../pb_data/types.d.ts" />

function onPluginReviewChange(e) {
	e.next();

	require(`${__hooks}/shared/plugin-ratings.js`).recalculatePluginRating(
		e.app,
		e.record.get('plugin')
	);
}

function onPluginReviewDelete(e) {
	const pluginId = e.record.get('plugin');
	e.next();
	require(`${__hooks}/shared/plugin-ratings.js`).recalculatePluginRating(e.app, pluginId);
}

onRecordAfterCreateSuccess(onPluginReviewChange, 'plugin_reviews');
onRecordAfterUpdateSuccess(onPluginReviewChange, 'plugin_reviews');
onRecordAfterDeleteSuccess(onPluginReviewDelete, 'plugin_reviews');
