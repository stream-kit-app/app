/// <reference path="../pb_data/types.d.ts" />

/**
 * Soften `user_files` createRule to auth-only.
 * Multipart uploads often omit/mis-bind `user` in `@request.body`, which made
 * `user = @request.auth.id` fail with a generic 400. Ownership is enforced in
 * `user_files.pb.js` via onRecordCreateRequest.
 */
migrate((app) => {
	const collection = app.findCollectionByNameOrId('pbc_9929103852');
	collection.createRule = '@request.auth.id != ""';
	return app.save(collection);
}, (app) => {
	const collection = app.findCollectionByNameOrId('pbc_9929103852');
	collection.createRule =
		'@request.auth.id != "" && user = @request.auth.id';
	return app.save(collection);
});
