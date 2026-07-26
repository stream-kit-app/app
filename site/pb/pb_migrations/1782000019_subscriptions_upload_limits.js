/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const subscriptions = app.findCollectionByNameOrId('pbc_7929103850');

	subscriptions.fields.add(
		new Field({
			hidden: false,
			id: 'number8929103870',
			max: null,
			min: 0,
			name: 'maxFileBytes',
			onlyInt: true,
			presentable: false,
			required: true,
			system: false,
			type: 'number'
		})
	);
	subscriptions.fields.add(
		new Field({
			hidden: false,
			id: 'number8929103871',
			max: null,
			min: 0,
			name: 'maxStorageBytes',
			onlyInt: true,
			presentable: false,
			required: true,
			system: false,
			type: 'number'
		})
	);

	return app.save(subscriptions);
}, (app) => {
	const subscriptions = app.findCollectionByNameOrId('pbc_7929103850');
	subscriptions.fields.removeById('number8929103870');
	subscriptions.fields.removeById('number8929103871');
	return app.save(subscriptions);
});
