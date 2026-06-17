/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = app.findCollectionByNameOrId('pbc_4829103847');

	collection.fields.add(
		new Field({
			cascadeDelete: false,
			collectionId: 'pbc_5829103848',
			hidden: false,
			id: 'relation9829103853',
			maxSelect: 1,
			minSelect: 0,
			name: 'file',
			presentable: false,
			required: true,
			system: false,
			type: 'relation'
		})
	);

	collection.fields.removeByName('downloadUrl');
	collection.fields.removeByName('sha256');

	return app.save(collection);
}, (app) => {
	const collection = app.findCollectionByNameOrId('pbc_4829103847');

	collection.fields.removeByName('file');

	collection.fields.add(
		new Field({
			exceptDomains: [],
			hidden: false,
			id: 'url8392017465',
			name: 'downloadUrl',
			onlyDomains: [],
			presentable: false,
			required: false,
			system: false,
			type: 'url'
		})
	);

	collection.fields.add(
		new Field({
			autogeneratePattern: '',
			hidden: false,
			id: 'text6293847102',
			max: 64,
			min: 0,
			name: 'sha256',
			pattern: '^[a-f0-9]*$',
			presentable: false,
			required: false,
			system: false,
			type: 'text'
		})
	);

	return app.save(collection);
});
