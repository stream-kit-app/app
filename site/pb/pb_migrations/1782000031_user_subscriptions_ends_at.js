/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = app.findCollectionByNameOrId('pbc_8929103851');

	collection.fields.add(
		new Field({
			hidden: false,
			id: 'date8929103857',
			max: '',
			min: '',
			name: 'endsAt',
			presentable: false,
			required: false,
			system: false,
			type: 'date'
		})
	);

	return app.save(collection);
}, (app) => {
	const collection = app.findCollectionByNameOrId('pbc_8929103851');
	collection.fields.removeById('date8929103857');
	return app.save(collection);
});
