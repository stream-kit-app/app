/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = app.findCollectionByNameOrId('pbc_7929103850');

	collection.fields.add(
		new Field({
			hidden: false,
			id: 'json7929103856',
			maxSize: 2000000,
			name: 'bullets',
			presentable: false,
			required: false,
			system: false,
			type: 'json'
		})
	);

	return app.save(collection);
}, (app) => {
	const collection = app.findCollectionByNameOrId('pbc_7929103850');
	collection.fields.removeById('json7929103856');
	return app.save(collection);
});
