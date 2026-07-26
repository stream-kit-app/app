/// <reference path="../pb_data/types.d.ts" />

/**
 * Create rule only requires auth; ownership is forced in user_config_sync.pb.js.
 * Checking `user = @request.auth.id` on create is brittle with custom ids / body shape
 * and surfaces as 400 `{ data: {}, message: "Failed to create record." }`.
 */
migrate((app) => {
	for (const collectionId of ['pbc_8930103850', 'pbc_8930103860']) {
		const collection = app.findCollectionByNameOrId(collectionId);
		collection.createRule = '@request.auth.id != ""';
		collection.updateRule = '@request.auth.id != "" && user = @request.auth.id';
		collection.deleteRule = '@request.auth.id != "" && user = @request.auth.id';
		collection.listRule = '@request.auth.id != "" && user = @request.auth.id';
		collection.viewRule = '@request.auth.id != "" && user = @request.auth.id';
		app.save(collection);
	}
}, (app) => {
	for (const collectionId of ['pbc_8930103850', 'pbc_8930103860']) {
		const collection = app.findCollectionByNameOrId(collectionId);
		collection.createRule = '@request.auth.id != "" && user = @request.auth.id';
		app.save(collection);
	}
});
