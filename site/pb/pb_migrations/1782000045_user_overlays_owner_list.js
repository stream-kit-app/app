/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = app.findCollectionByNameOrId('user_overlays');

	// Published overlays are looked up by id via GET /api/overlays/{overlayId}/public
	// (user_overlays.pb.js); listing stays owner-only so they can't be enumerated.
	collection.listRule = '@request.auth.id != "" && user = @request.auth.id';

	return app.save(collection);
}, (app) => {
	const collection = app.findCollectionByNameOrId('user_overlays');

	collection.listRule = 'published = true || (@request.auth.id != "" && user = @request.auth.id)';

	return app.save(collection);
});
