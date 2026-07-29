/// <reference path="../../pb_data/types.d.ts" />

/**
 * Shared plugin rating aggregation for hook handlers.
 * Handlers run in isolated runtimes, so they must `require()` this module
 * instead of relying on file-level functions.
 */

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
		for (let i = 0; i < ratingCount; i++) {
			sum += Number(reviews[i].get('rating') || 0);
		}
		averageRating = Math.round((sum / ratingCount) * 100) / 100;
	}

	const plugin = app.findRecordById('plugins', pluginId);
	plugin.set('averageRating', averageRating);
	plugin.set('ratingCount', ratingCount);
	app.save(plugin);
}

module.exports = {
	recalculatePluginRating
};
