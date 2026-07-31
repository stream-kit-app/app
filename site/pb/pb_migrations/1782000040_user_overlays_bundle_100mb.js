/// <reference path="../pb_data/types.d.ts" />

/**
 * Raise published overlay bundle cap from 25MB to 100MB.
 */
migrate(
	(app) => {
		const collection = app.findCollectionByNameOrId('user_overlays');
		const bundle = collection.fields.getByName('bundle');
		if (bundle) {
			bundle.maxSize = 104857600;
			app.save(collection);
		}
	},
	(app) => {
		const collection = app.findCollectionByNameOrId('user_overlays');
		const bundle = collection.fields.getByName('bundle');
		if (bundle) {
			bundle.maxSize = 26214400;
			app.save(collection);
		}
	}
);
