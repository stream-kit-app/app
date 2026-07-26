/// <reference path="../pb_data/types.d.ts" />

/**
 * Same as queues: required number fields reject 0 in PocketBase.
 */
migrate((app) => {
	const collection = app.findCollectionByNameOrId('pbc_8930103860');

	for (const fieldId of [
		'number8930103863', // groupSortOrder
		'number8930103864', // sortOrder
		'number8930103870' // clientUpdatedAt
	]) {
		const field = collection.fields.getById(fieldId);
		if (field) {
			field.required = false;
		}
	}

	const deletedAt = collection.fields.getById('number8930103871');
	if (deletedAt) {
		deletedAt.min = null;
	}

	return app.save(collection);
}, (app) => {
	const collection = app.findCollectionByNameOrId('pbc_8930103860');

	for (const fieldId of [
		'number8930103863',
		'number8930103864',
		'number8930103870'
	]) {
		const field = collection.fields.getById(fieldId);
		if (field) {
			field.required = true;
		}
	}

	const deletedAt = collection.fields.getById('number8930103871');
	if (deletedAt) {
		deletedAt.min = 0;
	}

	return app.save(collection);
});
