/// <reference path="../pb_data/types.d.ts" />

/**
 * PocketBase "required" on number fields means nonzero. Queues legitimately use
 * concurrency=0 (unlimited) and sortOrder=0, so drop required and rely on mins.
 */
migrate((app) => {
	const collection = app.findCollectionByNameOrId('pbc_8930103850');

	const concurrency = collection.fields.getById('number8930103852');
	if (concurrency) {
		concurrency.required = false;
	}

	const sortOrder = collection.fields.getById('number8930103854');
	if (sortOrder) {
		sortOrder.required = false;
	}

	const clientUpdatedAt = collection.fields.getById('number8930103855');
	if (clientUpdatedAt) {
		clientUpdatedAt.required = false;
	}

	const deletedAt = collection.fields.getById('number8930103856');
	if (deletedAt) {
		deletedAt.required = false;
		deletedAt.min = null;
	}

	return app.save(collection);
}, (app) => {
	const collection = app.findCollectionByNameOrId('pbc_8930103850');

	const concurrency = collection.fields.getById('number8930103852');
	if (concurrency) {
		concurrency.required = true;
	}

	const sortOrder = collection.fields.getById('number8930103854');
	if (sortOrder) {
		sortOrder.required = true;
	}

	const clientUpdatedAt = collection.fields.getById('number8930103855');
	if (clientUpdatedAt) {
		clientUpdatedAt.required = true;
	}

	const deletedAt = collection.fields.getById('number8930103856');
	if (deletedAt) {
		deletedAt.min = 0;
	}

	return app.save(collection);
});
