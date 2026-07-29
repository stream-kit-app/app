/// <reference path="../pb_data/types.d.ts" />

/**
 * Add monotone `revision` to cloud sync collections for LWW.
 */
migrate((app) => {
	const actions = app.findCollectionByNameOrId('pbc_8930103860');
	actions.fields.add(
		new Field({
			hidden: false,
			id: 'number8930103880',
			max: null,
			min: 0,
			name: 'revision',
			onlyInt: true,
			presentable: false,
			required: false,
			system: false,
			type: 'number'
		})
	);
	app.save(actions);

	const queues = app.findCollectionByNameOrId('pbc_8930103850');
	queues.fields.add(
		new Field({
			hidden: false,
			id: 'number8930103881',
			max: null,
			min: 0,
			name: 'revision',
			onlyInt: true,
			presentable: false,
			required: false,
			system: false,
			type: 'number'
		})
	);
	return app.save(queues);
}, (app) => {
	const actions = app.findCollectionByNameOrId('pbc_8930103860');
	actions.fields.removeById('number8930103880');
	app.save(actions);

	const queues = app.findCollectionByNameOrId('pbc_8930103850');
	queues.fields.removeById('number8930103881');
	return app.save(queues);
});
