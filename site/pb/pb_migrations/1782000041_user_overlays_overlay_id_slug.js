/// <reference path="../pb_data/types.d.ts" />

/**
 * Local overlay ids may be UUIDs or short slugs (imports / older projects).
 * Align published `user_overlays.overlayId` with `user_overlay_projects`.
 */
migrate(
	(app) => {
		const collection = app.findCollectionByNameOrId('user_overlays');
		const overlayId = collection.fields.getByName('overlayId');
		if (overlayId) {
			overlayId.min = 1;
			overlayId.max = 64;
			overlayId.pattern = '';
			app.save(collection);
		}
	},
	(app) => {
		const collection = app.findCollectionByNameOrId('user_overlays');
		const overlayId = collection.fields.getByName('overlayId');
		if (overlayId) {
			overlayId.min = 36;
			overlayId.max = 36;
			overlayId.pattern =
				'^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$';
			app.save(collection);
		}
	}
);
