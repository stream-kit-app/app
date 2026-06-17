/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = app.findCollectionByNameOrId('pbc_5829103848');
	const field = collection.fields.getByName('sha256');

	field.min = 0;

	return app.save(collection);
}, (app) => {
	const collection = app.findCollectionByNameOrId('pbc_5829103848');
	const field = collection.fields.getByName('sha256');

	field.min = 64;

	return app.save(collection);
});
